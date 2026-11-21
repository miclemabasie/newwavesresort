# Changelog

All notable changes to the **New Waves Resort** website, Supabase backend, staff portal, and optional integration layer are recorded here.

---

## [Unreleased]

### Planned / Upcoming
- Create the initial Admin account directly in the website at `/admin/login` (and add Chefs, Front Desk & Managers in `/admin/staff`).
- Optionally upload starter resort photography via `scripts/seed-storage.mjs` (`SUPABASE_SERVICE_ROLE_KEY` required) or upload photos directly inside `/admin/units` and `/admin/gallery`.
- Replace placeholder WhatsApp number, YouTube Channel ID (`UC...`), Saker Landing photo in `/admin/integrations`, and set production hosting env vars (`VITE_SITE_URL`).

### Added
- **Self-Contained Website Staff Portal & First-Time Setup (`2026-11-19`)**:
  - Added prominent **Staff Portal** (`Staff Portal` / `Espace Staff`) and **Dashboard** (`Dashboard` / `Gestion`) links in [Navbar.jsx](../frontend/src/components/Navbar.jsx) (desktop + mobile drawer) and upgraded the [Footer.jsx](../frontend/src/components/sections/Footer.jsx) link so staff can access `/admin/login` or `/admin` directly from any page.
  - Created & deployed `staff-management` Edge Function (`supabase/functions/staff-management/index.ts`, `verify_jwt = false`) providing public zero-PII setup status check (`status`), one-time first-admin creation (`bootstrap` — automatically locks once an admin exists), and admin-only team management (`list`, `create`, `update_role`, `reset_password`, `delete`).
  - Added First-Time Admin Setup flow inside `/admin/login` (`AdminLogin.jsx`) so the owner can create the very first Admin account directly from the website UI with zero external tools.
  - Added role-tailored Overview Dashboard (`AdminDashboard.jsx` at `/admin/overview`), Contact Inquiries & Newsletter Manager (`InquiriesAdmin.jsx` at `/admin/inquiries`), and Staff & Role Manager (`StaffAdmin.jsx` at `/admin/staff`).
- **Live Supabase Provisioning (`2026-11-19`)**:
  - Provisioned dedicated `newwavesresort` project (`xuggbcfuvxvabatumtoj`) in org **Blizton**, region `eu-west-1` (`ACTIVE_HEALTHY`, URL `https://xuggbcfuvxvabatumtoj.supabase.co`).
  - Applied core schema (`initial_schema_core`), storage buckets (`storage_buckets`), and seed data (`seed_data`).
  - Deployed all 4 Edge Functions as `ACTIVE`: `pms-api` (`verify_jwt: false`), `notify-booking` (`verify_jwt: false`), `youtube-channel-feed` (`verify_jwt: true`), and `staff-management` (`verify_jwt: false`).
  - Configured gitignored `frontend/.env` with live `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.

### Changed
- Replaced `clone_daily_menu` RPC call in `DailyMenuBuilder.jsx` (`Copy Yesterday`) with native direct Supabase queries loading the previous date's menu and dishes cleanly in the browser UI (removing any manual SQL step).
- Updated `getDefaultAdminRoute` (`authHelpers.js`) and `AdminLayout.jsx` sidebar to land all staff roles on `/admin/overview` with unified navigation and clear `"Resort Settings"` / optional external API framing in `IntegrationsAdmin.jsx`.
- Connected local Vite frontend configuration (`frontend/.env`) to the live `xuggbcfuvxvabatumtoj` Supabase backend.

### Fixed
- *(Add bug fixes here as work progresses)*

---

## [2026-11-19] — Supabase Platform Transformation, Dynamic Menu, Online Gallery, Staff Portal & SEO Overhaul

### Added — Supabase Backend & Tooling (`supabase/`, `scripts/`, `docs/`)
- `supabase/config.toml` — Supabase CLI project config (`project_id = "newwavesresort"`, Edge Function JWT settings for `pms-api`, `notify-booking`, and `youtube-channel-feed`).
- `supabase/migrations/0001_initial_schema.sql`:
  - `private` schema with `private.get_staff_role()` (`SECURITY DEFINER`, `SET search_path = ''`, restricted execute privileges).
  - 13 RLS-enabled tables in `public`: `staff_profiles`, `site_settings`, `room_types`, `room_unavailability`, `booking_requests`, `menu_items`, `menu_item_internal_meta`, `daily_menus`, `daily_menu_entries`, `gallery_media`, `contact_inquiries`, `newsletter_subscribers`, `api_keys`.
  - Policies strictly using `TO anon` / `TO authenticated`, `(SELECT auth.uid())`, and matching `USING` + `WITH CHECK` on `UPDATE` policies.
  - B-tree indexes covering query and FK lookup paths plus `supabase_realtime` publication enabled for `public.booking_requests`.
  - 4 RPCs: `get_available_room_types`, `create_booking_request` (`WEB-YYYYMMDD-XXXX` generator), `lookup_booking_status`, and `clone_daily_menu`.
- `supabase/migrations/0002_storage_buckets.sql` — Public storage buckets `resort-units` (10 MB), `resort-menu` (5 MB), and `resort-gallery` (10 MB) with role-scoped `SELECT` / `INSERT` / `UPDATE` / `DELETE` policies.
- `supabase/migrations/0003_seed_data.sql` — Idempotent seed data in `XAF` (`FCFA`) and `Africa/Douala` date context (resort settings, 4 suite categories across 1/2/3 bedrooms, 8 Cameroonian dishes, today's published daily menu, starter gallery + YouTube video reference).
- `scripts/seed-storage.mjs` — One-time helper script to upload `frontend/public/assets/general/` photos to Supabase Storage and link public URLs.
- Edge Functions:
  - `supabase/functions/_shared/cors.ts` — Shared CORS headers and JSON/error response helpers.
  - `supabase/functions/pms-api/index.ts` — Scoped `x-api-key` (SHA-256) REST API for external facility tools (`/bookings`, `/bookings/ack`, `/bookings/:id`, `/rooms`, `/rooms/:id`, `/rooms/:id/unavailability`, `/menu`, `/menu/:id`, `/daily-menu`, `/daily-menu/:date`, `/gallery`).
  - `supabase/functions/notify-booking/index.ts` — Webhook-ready booking alert handler supporting `WHATSAPP_PROVIDER = "none" | "meta_cloud" | "twilio"`.
  - `supabase/functions/youtube-channel-feed/index.ts` — Staff-authenticated (`admin`/`manager`) YouTube oEmbed metadata lookup & Channel Atom XML feed parser (`UC...`, zero API key needed), supporting both query params and JSON POST bodies.
- Integration documentation: `docs/pms-api.openapi.yaml` and `docs/pms-api-guide.md`.

### Added — Public Frontend, Booking Flow & Multi-Currency (`frontend/src/`)
- Utilities (`frontend/src/lib/`): `supabase.js`, `constants.js`, `currency.js` (XAF/USD/EUR + `Africa/Douala` today ISO), `whatsapp.js` (`wa.me` bilingual templates), `youtube.js` (`youtube-nocookie.com` & thumbnail helpers), `storage.js`, `fallbackData.js` (zero-config offline preview data), and `seoSchemas.js`.
- Contexts & Hooks: `AuthContext.jsx`, `authHelpers.js`, `CurrencyContext.jsx`, `currencyHelpers.js`, `useSiteSettings.js`, `useRoomTypes.js`, `useDailyMenu.js`, `useGallery.js`.
- Components: `SEO.jsx` (per-route `<title>`, meta, canonical, `hreflang`, OG/Twitter, JSON-LD), `ScrollToTop.jsx`, `CurrencySwitcher.jsx`, and `components/booking/BookingModal.jsx` (live date validation + Supabase RPC booking + instant WhatsApp handoff).
- New Public Pages: `UnitDetail.jsx` (`/rooms/:slug`), `BookingStatus.jsx` (`/booking-status`), and `NotFound.jsx` (`*`).
- Upgraded Dynamic Pages:
  - `Accomodations.jsx` — Date-range availability search via `get_available_room_types`, 1/2/3-bedroom filters, XAF/USD/EUR pricing, and booking modal integration.
  - `Dining.jsx` — Today's published daily menu (`Africa/Douala`) with meal periods (`All Day`, `Breakfast`, `Lunch`, `Dinner`), dietary/allergen filters, Sold Out badges, highlight badges, and full catalog toggle.
  - `GalleryPage.jsx` & `Lightbox.jsx` — Unified Supabase Storage photo + YouTube video embeds with media-type (`All` / `Photos` / `YouTube Videos`) and category filters.

### Added — Lazy-Loaded Staff Portal (`/admin`, `frontend/src/pages/admin/`)
- Installed `@supabase/supabase-js`, `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`, and `react-hot-toast`.
- Lazy-loaded behind `React.lazy` in `App.jsx` so public pages do not download admin or `@dnd-kit` bundles:
  - `AdminLogin.jsx` & `AdminLayout.jsx` (role-aware navigation).
  - `DailyMenuBuilder.jsx` (`chef`, `manager`, `admin`) — `@dnd-kit` drag-and-drop dish palette -> Meal Period drop zones, price overrides, highlight badges, live Sold Out toggle, and `Copy Yesterday`.
  - `MenuCatalogAdmin.jsx` (`chef`, `manager`, `admin`) — Master dish catalog CRUD + `resort-menu` uploader + internal prep station/cost notes.
  - `BookingsAdmin.jsx` (`front_desk`, `manager`, `admin`) — Realtime booking inbox, status/sync/external-ref management, and 1-click guest WhatsApp launch.
  - `UnitsAdmin.jsx` (`manager`, `admin`) — Suite CRUD + multi-photo `resort-units` uploader + blocked date manager.
  - `GalleryAdmin.jsx` (`manager`, `admin`) — Bulk Storage photo uploader, YouTube URL publisher, and YouTube Channel Atom feed importer.
  - `IntegrationsAdmin.jsx` (`admin`) — Site settings manager (WhatsApp number, YouTube Channel ID, Saker Landing heritage photo uploader) and scoped SHA-256 `api_keys` generator/revoker.

### Added — SEO Pipeline & Hosting Configuration
- Updated `frontend/index.html` with default OG/meta tags, `logo1.png` favicon, and `i.ytimg.com` preconnect.
- Build scripts in `frontend/scripts/`:
  - `generate-sitemap.mjs` — Generates `dist/sitemap.xml` (queries published `room_types` if env vars are present or uses starter slugs; excludes `/admin`).
  - `prerender.mjs` — Injects route-specific canonical, OG, Twitter, and JSON-LD tags into 14 static HTML entrypoints under `dist/`.
  - `verify-helpers.mjs` — Automated verification of YouTube URL parsing, currency formatting, WhatsApp link generation, JSON-LD builders, EN/FR translation JSONs, sitemap exclusions, and prerendered HTML files.
- Hosting & environment files: `frontend/public/robots.txt`, `frontend/public/_redirects`, `frontend/vercel.json`, `frontend/.env.example`, `.gitignore` updates, and rewritten root `README.md`.

### Changed & Fixed
- **Code Bugs Fixed**:
  - Removed stray `` `1` `` token and sensitive-looking comment in `App.jsx`.
  - Restored desktop 3-column grid in `Testimonials.jsx` (previously commented out).
  - Changed `Principles.jsx` icon mapping from title strings to index order so icons render in French as well as English.
  - Repaired malformed chevron path in `Hero.jsx` and broken navigation/button targets across `Navbar.jsx`, `ServiceGrid.jsx`, `Infrastructure.jsx`, `Cultinary.jsx`, and service subpages.
  - Updated `src/i18n.js` to use `import.meta.env.DEV` instead of Node-only `process.env.NODE_ENV`.
  - Completed EN/FR localization across `GalleryPage.jsx`, `ComingSoon.jsx`, `VolcanicExpeditions.jsx`, and all new booking/menu/status views (`frontend/public/locales/{en,fr}/translation.json`).
  - Wired `Contact.jsx` inquiries (`contact_inquiries`) and `Footer.jsx` subscriptions (`newsletter_subscribers`) to Supabase.
- **`notes.md` Updates Applied**:
  - Updated Navbar branding to use `logo1.png`, `"New Waves Resort, Ngeme Limbe"`, and `"A Resort Designed by & for Professionals"`.
  - Unified `logo1.png` across Navbar, Footer, ComingSoon, AdminLogin/AdminLayout, and favicon.
  - Added configurable Saker Landing heritage photo block in `OurStory.jsx` (driven by `site_settings.saker_landing_image_url`).
- **Post-Review Hardening**:
  - Enabled `supabase_realtime` publication on `public.booking_requests` in `0001_initial_schema.sql`.
  - Added JSON POST body support alongside query params in `youtube-channel-feed/index.ts` and simplified `GalleryAdmin.jsx` invocations.
  - Added explicit `{ error }` checks and toast reporting across admin mutations (`GalleryAdmin`, `DailyMenuBuilder`, `MenuCatalogAdmin`, `UnitsAdmin`, `IntegrationsAdmin`).

### Removed
- Cleaned up legacy/stray repository files: `rec.html`, `frontend/project_code.md`, `frontend/dist.zip`, `frontend/code_generation.py`, `frontend/src/code_generator.py`.

### Verification Baseline (2026-11-19)
- `npm run --prefix frontend lint` -> Passed (`0` errors, `0` warnings).
- `npm run --prefix frontend build` -> Passed (`dist/sitemap.xml` generated with 18 routes; 14 static HTML routes prerendered; `@dnd-kit` and admin modules split out of main bundle).
- `npm run --prefix frontend verify` -> Passed (`All helper, i18n, schema, and SEO build assertions passed!`).
- SQL RLS & Realtime check -> Confirmed `0` occurrences of `auth.role()`, RLS enabled on all 13 `public` tables, and `supabase_realtime` block present.
