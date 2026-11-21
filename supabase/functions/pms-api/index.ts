import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders, errorResponse, jsonResponse } from "../_shared/cors.ts";

/**
 * Loosely-coupled convenience REST API (`pms-api`) for external facility tools.
 * Authenticated via `x-api-key` header (SHA-256 matched against public.api_keys).
 * The website never depends on any external system; this endpoint simply offers
 * clean pull/push conveniences for bookings, room types, unavailability, daily menus, and gallery.
 */

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

async function sha256Hex(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function getRouteParts(urlStr: string): string[] {
  const url = new URL(urlStr);
  const raw = url.pathname.replace(/^\/+/, "");
  const parts = raw.split("/").filter(Boolean);
  const fnIdx = parts.indexOf("pms-api");
  return fnIdx >= 0 ? parts.slice(fnIdx + 1) : parts;
}

function hasScope(scopes: string[], required: string): boolean {
  if (!Array.isArray(scopes)) return false;
  if (scopes.includes("*") || scopes.includes(required)) return true;
  const [prefix] = required.split(":");
  return scopes.includes(`${prefix}:*`);
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const rawKey = req.headers.get("x-api-key")?.trim();
  if (!rawKey) {
    return errorResponse("Missing x-api-key header", 401);
  }

  const keyHash = await sha256Hex(rawKey);
  const { data: apiKey, error: keyErr } = await admin
    .from("api_keys")
    .select("id, scopes, is_active")
    .eq("key_hash", keyHash)
    .maybeSingle();

  if (keyErr || !apiKey || !apiKey.is_active) {
    return errorResponse("Invalid or inactive API key", 401);
  }

  // Record last_used_at asynchronously without blocking request
  admin
    .from("api_keys")
    .update({ last_used_at: new Date().toISOString() })
    .eq("id", apiKey.id)
    .then(() => {});

  const parts = getRouteParts(req.url);
  const resource = parts[0] || "";
  const idOrParam = parts[1] || "";
  const subResource = parts[2] || "";
  const url = new URL(req.url);

  try {
    // ------------------------------------------------------------------
    // BOOKINGS: /bookings, /bookings/ack, /bookings/:id
    // ------------------------------------------------------------------
    if (resource === "bookings") {
      if (req.method === "GET" && !idOrParam) {
        if (!hasScope(apiKey.scopes, "bookings:read")) {
          return errorResponse("Missing scope bookings:read", 403);
        }
        const status = url.searchParams.get("status");
        const syncStatus = url.searchParams.get("sync_status");
        const since = url.searchParams.get("since");
        const limit = Math.min(200, Math.max(1, Number(url.searchParams.get("limit") || 50)));

        let query = admin
          .from("booking_requests")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(limit);

        if (status) query = query.eq("status", status);
        if (syncStatus) query = query.eq("external_sync_status", syncStatus);
        if (since) query = query.gte("updated_at", since);

        const { data, error } = await query;
        if (error) return errorResponse(error.message, 500);
        return jsonResponse({ data, count: data?.length ?? 0 });
      }

      if (req.method === "POST" && idOrParam === "ack") {
        if (!hasScope(apiKey.scopes, "bookings:write")) {
          return errorResponse("Missing scope bookings:write", 403);
        }
        const body = await req.json();
        const ids = Array.isArray(body?.ids) ? body.ids : [];
        const syncStatus = body?.sync_status || "pulled";
        if (ids.length === 0) {
          return errorResponse("Provide non-empty ids array", 400);
        }
        const { data, error } = await admin
          .from("booking_requests")
          .update({
            external_sync_status: syncStatus,
            external_synced_at: new Date().toISOString(),
          })
          .in("id", ids)
          .select("id, reference_code, external_sync_status, external_synced_at");

        if (error) return errorResponse(error.message, 400);
        return jsonResponse({ updated: data?.length ?? 0, data });
      }

      if (req.method === "PATCH" && idOrParam) {
        if (!hasScope(apiKey.scopes, "bookings:write")) {
          return errorResponse("Missing scope bookings:write", 403);
        }
        const body = await req.json();
        const allowedFields: Record<string, unknown> = {};
        for (const field of [
          "status",
          "external_sync_status",
          "external_reference",
          "internal_notes",
        ]) {
          if (body?.[field] !== undefined) allowedFields[field] = body[field];
        }
        if (Object.keys(allowedFields).length === 0) {
          return errorResponse("No updatable fields provided", 400);
        }
        allowedFields.external_synced_at = new Date().toISOString();

        const { data, error } = await admin
          .from("booking_requests")
          .update(allowedFields)
          .eq("id", idOrParam)
          .select("*")
          .maybeSingle();

        if (error) return errorResponse(error.message, 400);
        if (!data) return errorResponse("Booking request not found", 404);
        return jsonResponse({ data });
      }
    }

    // ------------------------------------------------------------------
    // ROOMS: /rooms, /rooms/:id, /rooms/:id/unavailability
    // ------------------------------------------------------------------
    if (resource === "rooms") {
      if (req.method === "GET" && !idOrParam) {
        if (!hasScope(apiKey.scopes, "rooms:read")) {
          return errorResponse("Missing scope rooms:read", 403);
        }
        const { data, error } = await admin
          .from("room_types")
          .select("*")
          .order("sort_order", { ascending: true });
        if (error) return errorResponse(error.message, 500);
        return jsonResponse({ data });
      }

      if (req.method === "POST" && !idOrParam) {
        if (!hasScope(apiKey.scopes, "rooms:write")) {
          return errorResponse("Missing scope rooms:write", 403);
        }
        const body = await req.json();
        const { data, error } = await admin
          .from("room_types")
          .upsert(body, { onConflict: body?.external_ref ? "external_ref" : "slug" })
          .select("*")
          .single();
        if (error) return errorResponse(error.message, 400);
        return jsonResponse({ data }, 201);
      }

      if (req.method === "PATCH" && idOrParam && !subResource) {
        if (!hasScope(apiKey.scopes, "rooms:write")) {
          return errorResponse("Missing scope rooms:write", 403);
        }
        const body = await req.json();
        const { data, error } = await admin
          .from("room_types")
          .update(body)
          .eq("id", idOrParam)
          .select("*")
          .maybeSingle();
        if (error) return errorResponse(error.message, 400);
        if (!data) return errorResponse("Room type not found", 404);
        return jsonResponse({ data });
      }

      if (req.method === "PUT" && idOrParam && subResource === "unavailability") {
        if (!hasScope(apiKey.scopes, "rooms:write")) {
          return errorResponse("Missing scope rooms:write", 403);
        }
        const body = await req.json();
        const blocks = Array.isArray(body?.blocks) ? body.blocks : [];
        const externalRef = body?.external_ref || null;

        if (externalRef) {
          await admin
            .from("room_unavailability")
            .delete()
            .eq("room_type_id", idOrParam)
            .eq("external_ref", externalRef);
        } else if (body?.replace_all === true) {
          await admin.from("room_unavailability").delete().eq("room_type_id", idOrParam);
        }

        if (blocks.length === 0) {
          return jsonResponse({ room_type_id: idOrParam, inserted: 0, data: [] });
        }

        const rows = blocks.map((b: Record<string, unknown>) => ({
          room_type_id: idOrParam,
          start_date: b.start_date,
          end_date: b.end_date,
          units_blocked: b.units_blocked ?? 1,
          reason: b.reason ?? "booked",
          external_ref: b.external_ref ?? externalRef,
        }));

        const { data, error } = await admin
          .from("room_unavailability")
          .insert(rows)
          .select("*");
        if (error) return errorResponse(error.message, 400);
        return jsonResponse({ room_type_id: idOrParam, inserted: data?.length ?? 0, data });
      }
    }

    // ------------------------------------------------------------------
    // MENU CATALOG: /menu, /menu/:id
    // ------------------------------------------------------------------
    if (resource === "menu") {
      if (req.method === "GET") {
        if (!hasScope(apiKey.scopes, "menu:read")) {
          return errorResponse("Missing scope menu:read", 403);
        }
        const { data, error } = await admin
          .from("menu_items")
          .select("*")
          .order("category", { ascending: true })
          .order("name_en", { ascending: true });
        if (error) return errorResponse(error.message, 500);
        return jsonResponse({ data });
      }

      if (req.method === "POST") {
        if (!hasScope(apiKey.scopes, "menu:write")) {
          return errorResponse("Missing scope menu:write", 403);
        }
        const body = await req.json();
        const { data, error } = await admin
          .from("menu_items")
          .upsert(body, { onConflict: "slug" })
          .select("*")
          .single();
        if (error) return errorResponse(error.message, 400);
        return jsonResponse({ data }, 201);
      }

      if (req.method === "PATCH" && idOrParam) {
        if (!hasScope(apiKey.scopes, "menu:write")) {
          return errorResponse("Missing scope menu:write", 403);
        }
        const body = await req.json();
        const { data, error } = await admin
          .from("menu_items")
          .update(body)
          .eq("id", idOrParam)
          .select("*")
          .maybeSingle();
        if (error) return errorResponse(error.message, 400);
        if (!data) return errorResponse("Menu item not found", 404);
        return jsonResponse({ data });
      }
    }

    // ------------------------------------------------------------------
    // DAILY MENU: /daily-menu, /daily-menu/:date
    // ------------------------------------------------------------------
    if (resource === "daily-menu") {
      if (req.method === "GET") {
        if (!hasScope(apiKey.scopes, "menu:read")) {
          return errorResponse("Missing scope menu:read", 403);
        }
        const dateParam = idOrParam || url.searchParams.get("date");
        let query = admin
          .from("daily_menus")
          .select("*, daily_menu_entries(*, menu_items(*))");
        if (dateParam) {
          query = query.eq("service_date", dateParam);
        } else {
          query = query.order("service_date", { ascending: false }).limit(7);
        }
        const { data, error } = await query;
        if (error) return errorResponse(error.message, 500);
        return jsonResponse({ data });
      }

      if (req.method === "PUT" && idOrParam) {
        if (!hasScope(apiKey.scopes, "menu:write")) {
          return errorResponse("Missing scope menu:write", 403);
        }
        const body = await req.json();
        const statusVal = body?.status || "published";
        const { data: menuRow, error: menuErr } = await admin
          .from("daily_menus")
          .upsert(
            {
              service_date: idOrParam,
              title_en: body?.title_en ?? "",
              title_fr: body?.title_fr ?? "",
              chef_note_en: body?.chef_note_en ?? "",
              chef_note_fr: body?.chef_note_fr ?? "",
              status: statusVal,
              published_at: statusVal === "published" ? new Date().toISOString() : null,
            },
            { onConflict: "service_date" },
          )
          .select("*")
          .single();

        if (menuErr) return errorResponse(menuErr.message, 400);

        if (Array.isArray(body?.entries)) {
          await admin.from("daily_menu_entries").delete().eq("daily_menu_id", menuRow.id);
          if (body.entries.length > 0) {
            const entriesPayload = body.entries.map((e: Record<string, unknown>, idx: number) => ({
              daily_menu_id: menuRow.id,
              menu_item_id: e.menu_item_id,
              meal_period: e.meal_period ?? "all_day",
              display_order: e.display_order ?? idx,
              daily_price_override: e.daily_price_override ?? null,
              is_available: e.is_available ?? true,
              highlight_badge: e.highlight_badge ?? "",
            }));
            const { error: entriesErr } = await admin
              .from("daily_menu_entries")
              .insert(entriesPayload);
            if (entriesErr) return errorResponse(entriesErr.message, 400);
          }
        }

        const { data: hydrated } = await admin
          .from("daily_menus")
          .select("*, daily_menu_entries(*, menu_items(*))")
          .eq("id", menuRow.id)
          .single();

        return jsonResponse({ data: hydrated });
      }
    }

    // ------------------------------------------------------------------
    // GALLERY: /gallery, /gallery/:id
    // ------------------------------------------------------------------
    if (resource === "gallery") {
      if (req.method === "GET") {
        if (!hasScope(apiKey.scopes, "gallery:read")) {
          return errorResponse("Missing scope gallery:read", 403);
        }
        const { data, error } = await admin
          .from("gallery_media")
          .select("*")
          .order("display_order", { ascending: true })
          .order("created_at", { ascending: false });
        if (error) return errorResponse(error.message, 500);
        return jsonResponse({ data });
      }

      if (req.method === "POST") {
        if (!hasScope(apiKey.scopes, "gallery:write")) {
          return errorResponse("Missing scope gallery:write", 403);
        }
        const body = await req.json();
        const { data, error } = await admin
          .from("gallery_media")
          .insert(body)
          .select("*")
          .single();
        if (error) return errorResponse(error.message, 400);
        return jsonResponse({ data }, 201);
      }

      if (req.method === "DELETE" && idOrParam) {
        if (!hasScope(apiKey.scopes, "gallery:write")) {
          return errorResponse("Missing scope gallery:write", 403);
        }
        const { error } = await admin.from("gallery_media").delete().eq("id", idOrParam);
        if (error) return errorResponse(error.message, 400);
        return jsonResponse({ deleted: true, id: idOrParam });
      }
    }

    return errorResponse(`Route not found: ${req.method} /${parts.join("/")}`, 404);
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Internal server error", 500);
  }
});
