# Project Roadmap & Next Steps

Living tracker of completed milestones, launch prerequisites, and optional enhancements.

---

## Phase 1 — Platform & SEO Foundation (Completed — 2026-11-19)
- [x] Remove legacy clutter (`rec.html`, `frontend/project_code.md`, `frontend/dist.zip`, code generator scripts)
- [x] Design loosely-coupled 13-table Postgres schema + private role helper + RLS + 4 RPCs + Realtime (`0001_initial_schema.sql`)
- [x] Configure Storage buckets (`resort-units`, `resort-menu`, `resort-gallery`) with role-based CRUD policies (`0002_storage_buckets.sql`)
- [x] Create idempotent starter seed data (`0003_seed_data.sql`) + Storage upload script (`scripts/seed-storage.mjs`)
- [x] Implement Edge Functions: `pms-api`, `notify-booking`, `youtube-channel-feed` + OpenAPI/guide docs
- [x] Build public suite discovery, date availability check, booking modal (`WEB-YYYYMMDD-XXXX`), WhatsApp handoff, and `/booking-status` tracker
- [x] Build dynamic Daily Menu public page (`/services/dining`) and Chef's Catalog + `@dnd-kit` Daily Menu Builder (`/admin/daily-menu`)
- [x] Build Online Gallery + YouTube video embed experience (`/gallery` & `/admin/gallery`)
- [x] Build SEO pipeline (`SEO.jsx`, JSON-LD schemas, `robots.txt`, `generate-sitemap.mjs`, `prerender.mjs`, `verify-helpers.mjs`)
- [x] Apply `notes.md` updates (navbar `logo1.png` + brand title/tagline, Saker Landing image slot, content fixes) & fix pre-existing UI/i18n/link bugs
- [x] Establish `docs/` living documentation suite (`README.md`, `CHANGELOG.md`, `ARCHITECTURE.md`, `DECISIONS.md`, `OPERATIONS.md`, `ROADMAP.md`)

---

## Phase 2 — Live Provisioning & Content Finalization (In Progress)
- [x] Create dedicated `newwavesresort` Supabase project (`xuggbcfuvxvabatumtoj`, org `Blizton`, region `eu-west-1`, leaving existing unrelated org projects untouched)
- [x] Apply core schema (`initial_schema_core`), storage buckets (`storage_buckets`), seed data (`seed_data`), and deploy all 4 Edge Functions (`pms-api`, `notify-booking`, `youtube-channel-feed`, `staff-management`)
- [x] Build self-contained in-app Staff Portal entry points (`Navbar` + `Footer`), first-time Admin setup (`/admin/login`), Staff & Role Manager (`/admin/staff`), Overview Dashboard (`/admin/overview`), Inquiries Manager (`/admin/inquiries`), and native `Copy Yesterday` menu loader
- [x] Configure local `frontend/.env` with live Supabase URL (`https://xuggbcfuvxvabatumtoj.supabase.co`) and publishable key
- [ ] Create your first Admin account inside the website at `/admin/login` and add Chefs/Managers/Front Desk via `/admin/staff`
- [ ] Optionally run `scripts/seed-storage.mjs` with `SUPABASE_SERVICE_ROLE_KEY` to mirror `frontend/public/assets/general/` starter images into Supabase Storage
- [ ] Configure hosting provider env vars (Vercel / Netlify) with live Supabase credentials & production `VITE_SITE_URL`
- [ ] Update production WhatsApp number, resort email/phone, and YouTube Channel ID (`UC...`) in `/admin/integrations`
- [ ] Upload actual Saker Landing historical photo (in `/admin/integrations`) and any updated founder portrait / shortened bio text once finalized per `notes.md`
- [x] Run `npm run build` with live Supabase env vars (`frontend/.env` loaded during build & verify)

---

## Phase 3 — Optional Enhancements & Integrations (Backlog)
- [ ] Connect external in-house facility software to `pms-api` using a scoped key generated in `/admin/integrations` (optional convenience sync)
- [ ] Configure `notify-booking` Database Webhook + Meta Cloud API or Twilio secrets for automated server-side WhatsApp alerts to reception
- [ ] Replace Unsplash stock starter dish photos with in-house resort kitchen photography uploaded via `/admin/menu-catalog`
- [ ] Add multi-language metadata translations or rich gallery video categories as channel content grows
- [ ] Add automated E2E browser smoke tests (Playwright) against a local Supabase instance for CI
