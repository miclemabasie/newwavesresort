import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders, errorResponse, jsonResponse } from "../_shared/cors.ts";

/**
 * Staff-authenticated Edge Function to inspect a YouTube video URL (via oEmbed)
 * or fetch recent uploads from a YouTube Channel (via public Atom XML feed — no API key needed).
 */

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

function decodeXmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function extractTag(block: string, tag: string): string {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  return match ? decodeXmlEntities(match[1].trim()) : "";
}

function parseAtomFeed(xml: string) {
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/gi) || [];
  return entries
    .map((entry) => {
      const videoId = extractTag(entry, "yt:videoId");
      const title = extractTag(entry, "title");
      const publishedAt = extractTag(entry, "published");
      const description = extractTag(entry, "media:description");
      if (!videoId) return null;
      return {
        youtube_video_id: videoId,
        youtube_url: `https://www.youtube.com/watch?v=${videoId}`,
        title,
        description,
        published_at: publishedAt || null,
        thumbnail_url: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      };
    })
    .filter(Boolean);
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return errorResponse("Authorization required", 401);
    }

    const token = authHeader.replace("Bearer ", "").trim();
    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: userData, error: userErr } = await admin.auth.getUser(token);
    if (userErr || !userData?.user) {
      return errorResponse("Invalid user session", 401);
    }

    const { data: profile } = await admin
      .from("staff_profiles")
      .select("role")
      .eq("id", userData.user.id)
      .maybeSingle();

    if (!profile || !["admin", "manager"].includes(profile.role)) {
      return errorResponse("Manager or Admin role required", 403);
    }

    const url = new URL(req.url);
    let body: Record<string, unknown> = {};
    if (req.method !== "GET" && req.method !== "HEAD") {
      try {
        body = (await req.json()) ?? {};
      } catch {
        body = {};
      }
    }
    const channelId = (url.searchParams.get("channel_id") || body?.channel_id || "").toString().trim();
    const videoUrl = (url.searchParams.get("url") || body?.url || "").toString().trim();

    if (videoUrl) {
      const oembedRes = await fetch(
        `https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`,
      );
      if (!oembedRes.ok) {
        return errorResponse("Unable to resolve YouTube video metadata", 404);
      }
      const meta = await oembedRes.json();
      return jsonResponse({
        video: {
          title: meta.title || "",
          author_name: meta.author_name || "",
          thumbnail_url: meta.thumbnail_url || "",
          youtube_url: videoUrl,
        },
      });
    }

    if (channelId) {
      if (!/^[A-Za-z0-9_-]{10,40}$/.test(channelId)) {
        return errorResponse("Invalid YouTube Channel ID format (expected UC...)", 400);
      }
      const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(channelId)}`;
      const feedRes = await fetch(feedUrl);
      if (!feedRes.ok) {
        return errorResponse("Could not load YouTube channel feed. Verify the Channel ID.", 404);
      }
      const xml = await feedRes.text();
      const videos = parseAtomFeed(xml);
      return jsonResponse({ channel_id: channelId, videos });
    }

    return errorResponse("Provide either channel_id or url", 400);
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Failed to inspect YouTube feed", 500);
  }
});
