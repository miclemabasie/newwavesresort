#!/usr/bin/env node
/**
 * One-time helper script to upload local resort photos from
 * `frontend/public/assets/general/` into Supabase Storage buckets
 * (`resort-units`, `resort-gallery`) and update seeded database records.
 *
 * Usage:
 *   SUPABASE_URL=https://xxx.supabase.co SUPABASE_SERVICE_ROLE_KEY=xxx node scripts/seed-storage.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "../frontend/node_modules/@supabase/supabase-js/dist/index.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const assetsDir = path.join(rootDir, "frontend", "public", "assets", "general");

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function uploadFile(bucket, localFilename, destPath) {
  const filePath = path.join(assetsDir, localFilename);
  if (!fs.existsSync(filePath)) {
    console.warn(`Skipping missing file: ${filePath}`);
    return null;
  }
  const buffer = fs.readFileSync(filePath);
  const ext = path.extname(localFilename).toLowerCase();
  const contentType = ext === ".png" ? "image/png" : "image/jpeg";

  const { error } = await supabase.storage.from(bucket).upload(destPath, buffer, {
    contentType,
    upsert: true,
  });
  if (error) {
    throw new Error(`Upload failed (${bucket}/${destPath}): ${error.message}`);
  }
  const { data } = supabase.storage.from(bucket).getPublicUrl(destPath);
  return { publicUrl: data.publicUrl, storagePath: destPath };
}

async function main() {
  console.log("Uploading starter suite photography to resort-units...");
  const suiteMappings = [
    { slug: "nomad-one-bedroom-suite", file: "image14.jpeg" },
    { slug: "garden-two-bedroom-suite", file: "image15.jpeg" },
    { slug: "atlantic-horizon-two-bedroom-suite", file: "image11.jpeg" },
    { slug: "executive-founders-three-bedroom-suite", file: "image3.jpeg" },
  ];

  for (const item of suiteMappings) {
    const uploaded = await uploadFile("resort-units", item.file, `suites/${item.file}`);
    if (!uploaded) continue;
    await supabase
      .from("room_types")
      .update({
        cover_image_url: uploaded.publicUrl,
        gallery_images: [{ url: uploaded.publicUrl, storage_path: uploaded.storagePath, is_cover: true, display_order: 0 }],
      })
      .eq("slug", item.slug);
    console.log(`  Linked ${item.slug} -> ${uploaded.publicUrl}`);
  }

  console.log("Uploading gallery photography to resort-gallery...");
  const galleryFiles = [
    "image1.jpeg",
    "image2.jpeg",
    "image3.jpeg",
    "image5.jpeg",
    "image11.jpeg",
    "image15.jpeg",
  ];

  for (const file of galleryFiles) {
    const uploaded = await uploadFile("resort-gallery", file, `seed/${file}`);
    if (!uploaded) continue;
    await supabase
      .from("gallery_media")
      .update({
        image_url: uploaded.publicUrl,
        storage_path: uploaded.storagePath,
      })
      .eq("image_url", `/assets/general/${file}`);
    console.log(`  Updated gallery references for ${file}`);
  }

  console.log("Done seeding Supabase Storage!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
