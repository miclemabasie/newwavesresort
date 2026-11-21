import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders, errorResponse, jsonResponse } from "../_shared/cors.ts";

/**
 * Self-contained Staff Management Edge Function for New Waves Resort.
 * - status / bootstrap: lets the resort owner create the very first admin inside the website UI
 *   when zero staff profiles exist (automatically locks once the first admin exists).
 * - list / create / update_role / reset_password / delete: admin-only team management
 *   for adding Chefs, Front Desk, Managers, and fellow Admins without visiting Supabase Dashboard.
 */

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const VALID_ROLES = new Set(["admin", "manager", "front_desk", "chef"]);

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    let body: Record<string, unknown> = {};
    if (req.method !== "GET" && req.method !== "HEAD") {
      try {
        body = (await req.json()) ?? {};
      } catch {
        body = {};
      }
    }

    const action = req.method === "GET" ? "status" : String(body?.action || "").trim();

    // ------------------------------------------------------------------
    // PUBLIC: Check if first-time admin bootstrap is needed (no PII returned)
    // ------------------------------------------------------------------
    if (action === "status") {
      const { count, error } = await admin
        .from("staff_profiles")
        .select("id", { count: "exact", head: true });
      if (error) return errorResponse(error.message, 500);
      return jsonResponse({ hasStaff: (count ?? 0) > 0 });
    }

    // ------------------------------------------------------------------
    // ONE-TIME BOOTSTRAP: Create the very first Admin account
    // ------------------------------------------------------------------
    if (action === "bootstrap") {
      const { count, error: countErr } = await admin
        .from("staff_profiles")
        .select("id", { count: "exact", head: true });
      if (countErr) return errorResponse(countErr.message, 500);
      if ((count ?? 0) > 0) {
        return errorResponse("Initial admin setup is already complete. Please sign in.", 403);
      }

      const fullName = String(body?.full_name || "").trim();
      const email = String(body?.email || "").trim().toLowerCase();
      const password = String(body?.password || "");

      if (!fullName) {
        return errorResponse("Full name is required.", 400);
      }
      if (!email || !email.includes("@")) {
        return errorResponse("A valid email address is required.", 400);
      }
      if (password.length < 8) {
        return errorResponse("Password must be at least 8 characters.", 400);
      }

      const { data: created, error: createErr } = await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: fullName },
      });

      if (createErr || !created?.user) {
        return errorResponse(createErr?.message || "Could not create admin user.", 400);
      }

      const { error: profErr } = await admin.from("staff_profiles").insert({
        id: created.user.id,
        full_name: fullName,
        role: "admin",
      });

      if (profErr) {
        await admin.auth.admin.deleteUser(created.user.id);
        return errorResponse(`Failed to create admin profile: ${profErr.message}`, 500);
      }

      return jsonResponse(
        {
          user: {
            id: created.user.id,
            email,
            full_name: fullName,
            role: "admin",
          },
        },
        201,
      );
    }

    // ------------------------------------------------------------------
    // ADMIN-ONLY ACTIONS: require verified JWT + role === 'admin'
    // ------------------------------------------------------------------
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return errorResponse("Authorization required", 401);
    }

    const token = authHeader.replace("Bearer ", "").trim();
    const { data: callerData, error: callerErr } = await admin.auth.getUser(token);
    if (callerErr || !callerData?.user) {
      return errorResponse("Invalid user session", 401);
    }

    const callerId = callerData.user.id;
    const { data: callerProfile } = await admin
      .from("staff_profiles")
      .select("role")
      .eq("id", callerId)
      .maybeSingle();

    if (!callerProfile || callerProfile.role !== "admin") {
      return errorResponse("Administrator privileges required", 403);
    }

    if (action === "list") {
      const [{ data: profiles, error: profErr }, { data: authUsersData, error: usersErr }] =
        await Promise.all([
          admin.from("staff_profiles").select("*").order("created_at", { ascending: true }),
          admin.auth.admin.listUsers({ page: 1, perPage: 200 }),
        ]);

      if (profErr) return errorResponse(profErr.message, 500);
      if (usersErr) return errorResponse(usersErr.message, 500);

      const userMap = new Map<string, { email?: string; last_sign_in_at?: string }>();
      for (const u of authUsersData?.users || []) {
        userMap.set(u.id, {
          email: u.email,
          last_sign_in_at: u.last_sign_in_at,
        });
      }

      const staff = (profiles || []).map((p) => {
        const authInfo = userMap.get(p.id);
        return {
          ...p,
          email: authInfo?.email || "",
          last_sign_in_at: authInfo?.last_sign_in_at || null,
        };
      });

      return jsonResponse({ staff });
    }

    if (action === "create") {
      const fullName = String(body?.full_name || "").trim();
      const email = String(body?.email || "").trim().toLowerCase();
      const password = String(body?.password || "");
      const role = String(body?.role || "").trim();

      if (!fullName) return errorResponse("Full name is required.", 400);
      if (!email || !email.includes("@")) return errorResponse("Valid email is required.", 400);
      if (password.length < 8) {
        return errorResponse("Password must be at least 8 characters.", 400);
      }
      if (!VALID_ROLES.has(role)) {
        return errorResponse("Role must be admin, manager, front_desk, or chef.", 400);
      }

      const { data: created, error: createErr } = await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: fullName },
      });

      if (createErr || !created?.user) {
        return errorResponse(createErr?.message || "Failed to create staff user.", 400);
      }

      const { data: profile, error: profErr } = await admin
        .from("staff_profiles")
        .insert({
          id: created.user.id,
          full_name: fullName,
          role,
        })
        .select("*")
        .single();

      if (profErr) {
        await admin.auth.admin.deleteUser(created.user.id);
        return errorResponse(`Failed to create staff profile: ${profErr.message}`, 500);
      }

      return jsonResponse(
        {
          member: {
            ...profile,
            email,
            last_sign_in_at: null,
          },
        },
        201,
      );
    }

    if (action === "update_role") {
      const userId = String(body?.user_id || "").trim();
      const role = String(body?.role || "").trim();
      const fullName = body?.full_name !== undefined ? String(body.full_name).trim() : undefined;

      if (!userId) return errorResponse("user_id is required.", 400);
      if (!VALID_ROLES.has(role)) {
        return errorResponse("Invalid role.", 400);
      }

      const { data: target } = await admin
        .from("staff_profiles")
        .select("id, role")
        .eq("id", userId)
        .maybeSingle();

      if (!target) return errorResponse("Staff member not found.", 404);

      if (target.role === "admin" && role !== "admin") {
        const { count: adminCount } = await admin
          .from("staff_profiles")
          .select("id", { count: "exact", head: true })
          .eq("role", "admin");
        if ((adminCount ?? 0) < 2) {
          return errorResponse("Cannot demote the last remaining administrator.", 400);
        }
      }

      const updates: Record<string, unknown> = { role };
      if (fullName) updates.full_name = fullName;

      const { data: updated, error: updErr } = await admin
        .from("staff_profiles")
        .update(updates)
        .eq("id", userId)
        .select("*")
        .single();

      if (updErr) return errorResponse(updErr.message, 400);
      return jsonResponse({ member: updated });
    }

    if (action === "reset_password") {
      const userId = String(body?.user_id || "").trim();
      const password = String(body?.password || "");

      if (!userId) return errorResponse("user_id is required.", 400);
      if (password.length < 8) {
        return errorResponse("New password must be at least 8 characters.", 400);
      }

      const { error: updErr } = await admin.auth.admin.updateUserById(userId, { password });
      if (updErr) return errorResponse(updErr.message, 400);
      return jsonResponse({ updated: true, user_id: userId });
    }

    if (action === "delete") {
      const userId = String(body?.user_id || "").trim();
      if (!userId) return errorResponse("user_id is required.", 400);
      if (userId === callerId) {
        return errorResponse("You cannot delete your own administrator account.", 400);
      }

      const { data: target } = await admin
        .from("staff_profiles")
        .select("id, role")
        .eq("id", userId)
        .maybeSingle();

      if (!target) return errorResponse("Staff member not found.", 404);

      if (target.role === "admin") {
        const { count: adminCount } = await admin
          .from("staff_profiles")
          .select("id", { count: "exact", head: true })
          .eq("role", "admin");
        if ((adminCount ?? 0) < 2) {
          return errorResponse("Cannot delete the last remaining administrator.", 400);
        }
      }

      const { error: delErr } = await admin.auth.admin.deleteUser(userId);
      if (delErr) return errorResponse(delErr.message, 400);
      return jsonResponse({ deleted: true, user_id: userId });
    }

    return errorResponse(`Unsupported action: ${action || "(empty)"}`, 400);
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Staff management error", 500);
  }
});
