import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders, errorResponse, jsonResponse } from "../_shared/cors.ts";

/**
 * Webhook-ready Edge Function triggered on `booking_requests` INSERT.
 * Supports WHATSAPP_PROVIDER = "none" | "meta_cloud" | "twilio".
 * When left as "none" (default), cleanly exits 200 OK so hybrid wa.me chat handles WhatsApp without API cost.
 */

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

async function sendMetaCloudMessage(text: string): Promise<boolean> {
  const token = Deno.env.get("META_WHATSAPP_TOKEN");
  const phoneId = Deno.env.get("META_WHATSAPP_PHONE_ID");
  const recipient = Deno.env.get("RESORT_ALERT_WHATSAPP");
  if (!token || !phoneId || !recipient) return false;

  const res = await fetch(`https://graph.facebook.com/v20.0/${phoneId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: recipient.replace(/\D/g, ""),
      type: "text",
      text: { body: text },
    }),
  });
  return res.ok;
}

async function sendTwilioMessage(text: string): Promise<boolean> {
  const sid = Deno.env.get("TWILIO_ACCOUNT_SID");
  const authToken = Deno.env.get("TWILIO_AUTH_TOKEN");
  const from = Deno.env.get("TWILIO_WHATSAPP_FROM");
  const to = Deno.env.get("RESORT_ALERT_WHATSAPP");
  if (!sid || !authToken || !from || !to) return false;

  const params = new URLSearchParams({
    From: from.startsWith("whatsapp:") ? from : `whatsapp:${from}`,
    To: to.startsWith("whatsapp:") ? to : `whatsapp:${to}`,
    Body: text,
  });

  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`${sid}:${authToken}`)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    },
  );
  return res.ok;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const webhookSecret = Deno.env.get("BOOKING_WEBHOOK_SECRET");
    if (webhookSecret) {
      const provided = req.headers.get("x-webhook-secret");
      if (provided !== webhookSecret) {
        return errorResponse("Invalid webhook secret", 401);
      }
    }

    const payload = await req.json();
    const record = payload?.record ?? payload;
    if (!record?.id || !record?.reference_code) {
      return errorResponse("Invalid booking payload", 400);
    }

    const provider = (Deno.env.get("WHATSAPP_PROVIDER") || "none").toLowerCase();
    if (provider === "none") {
      return jsonResponse({ notified: false, provider: "none", reference_code: record.reference_code });
    }

    const summary = [
      `New Waves Resort Booking Request`,
      `Ref: ${record.reference_code}`,
      `Guest: ${record.guest_first_name} ${record.guest_last_name} (${record.guest_phone})`,
      `Suite: ${record.room_type_name_snapshot} x${record.rooms_requested || 1}`,
      `Dates: ${record.check_in_date} -> ${record.check_out_date}`,
      `Est. Total: ${Number(record.estimated_total || 0).toLocaleString()} ${record.currency || "XAF"}`,
    ].join("\n");

    let sent = false;
    if (provider === "meta_cloud") {
      sent = await sendMetaCloudMessage(summary);
    } else if (provider === "twilio") {
      sent = await sendTwilioMessage(summary);
    }

    if (sent) {
      const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
        auth: { persistSession: false, autoRefreshToken: false },
      });
      await admin
        .from("booking_requests")
        .update({ whatsapp_notified: true })
        .eq("id", record.id);
    }

    return jsonResponse({ notified: sent, provider, reference_code: record.reference_code });
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Notification error", 500);
  }
});
