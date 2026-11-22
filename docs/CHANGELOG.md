# Changelog

All notable changes to the **New Waves Resort** website, Supabase backend, staff portal, and optional integration layer are recorded here.

---

## [Unreleased]

### Planned / Upcoming
- Create the initial Admin account directly in the website at `/admin/login` (and add Chefs, Front Desk & Managers in `/admin/staff`).
- Optionally upload starter resort photography via `scripts/seed-storage.mjs` (`SUPABASE_SERVICE_ROLE_KEY` required) or upload photos directly inside `/admin/units` and `/admin/gallery`.
- Replace placeholder WhatsApp number, YouTube Channel ID (`UC...`), Saker Landing photo in `/admin/integrations`, and set production hosting env vars (`VITE_SITE_URL`).

### Added
- **Interactive Menu Ordering, Direct WhatsApp Kitchen Handoff & Live Online Order Ticket (`2026-11-21`)**:
  - Applied live Supabase migrations `0005_menu_orders.sql` & `0006_fix_create_menu_order_record.sql`: added `public.menu_orders` (`ORD-YYYYMMDD-XXXX` + unguessable `view_token`, `dine_in` / `room_service` / `takeaway` fulfillment) and `public.menu_order_items` (dish snapshots, dietary/allergen metadata, `item_notes`), indexed foreign keys/queues, added `public.menu_orders` to `supabase_realtime`, seeded `kitchen_whatsapp_number` in `site_settings`, enforced staff-only table RLS, and added public RPCs `create_menu_order(...)` (server-side pricing & sold-out checks) and `get_menu_order_by_token(...)` (masking staff notes & prep stations for unauthenticated guests).
  - Created `MenuCartContext` (`menuCartHelpers.js`) persisting guest selections in `sessionStorage` (`nwr_menu_cart_v1`) and added `+ Add to Order` / `- qty +` steppers on both `/` (`Cultinary.jsx` `#daily-menu` + smart `Place Order` Action Bar) and `/services/dining` (`Dining.jsx` + floating sticky tray bar, plus `/menu` redirect).
  - Created `MenuOrderModal.jsx` with itemized quantity & preparation-note editing, fulfillment/location/preferred-time inputs, verified backend saving, and a single primary emerald **"Proceed to WhatsApp"** button pre-filled with the complete Chef order breakdown and clickable direct online ticket URL (`/order/ORD-YYYYMMDD-XXXX?t=...`).
  - Created `OrderDetail.jsx` (`/order/:referenceCode`) rendering a live 4-step kitchen preparation tracker, visual itemized dish list with allergen alerts and preparation notes, guest WhatsApp kitchen re-contact CTA, print styling, and strictly role-gated (`admin`, `manager`, `chef`, `front_desk`) Chef controls (`Confirm`, `Start Preparing`, `Mark Ready`, `Complete`, `Cancel`, internal kitchen notes, `WhatsApp Guest`, `Print Ticket`, and `/admin/orders` link).
  - Added Staff Portal **Menu Orders Inbox** (`MenuOrdersAdmin.jsx` at `/admin/orders`) with `supabase_realtime` updates, updated `AdminLayout.jsx` navigation, added live active/total order counts & Realtime subscription to `AdminDashboard.jsx`, and added optional `kitchen_whatsapp_number` configuration in `IntegrationsAdmin.jsx`.
- **Home Redesign, Live Home Daily Menu, Booking-to-WhatsApp Order Flow & Private Admin Route (`2026-11-21`)**:
  - Upgraded `Hero.jsx` into a full-bleed luxury coastal hero featuring `Cormorant Garamond` display typography, dark midnight overlays, a smooth anchor CTA to `#daily-menu`, and a **Floating Quick-Availability Bar** forwarding check-in/check-out/adult parameters to `/rooms`.
  - Added a **4-Pillar Coastal Signature Strip** (`Home.jsx`), upgraded `Suites.jsx` with direct **Book Now** modal triggers on Home cards, redesigned `GalleryPreview.jsx` as an editorial 5-tile bento showcase, polished `ImpactSection.jsx` (overlapping stat callout), `Facilities.jsx`, `VideoExperience.jsx`, `OceanSide.jsx`, and balanced alternating ivory/sand/midnight/ocean bands across `Home.jsx`.
  - Replaced the static 3-item summary in `Cultinary.jsx` with a dedicated live **Today's Daily Menu** showcase (`#daily-menu`) featuring Meal Period tabs, `Africa/Douala` live date & Chef's Daily Note, dietary tags, highlight badges, live Sold Out indicators, and direct **Reserve Table / Order on WhatsApp** CTA (`buildDiningWhatsAppUrl`).
  - Enhanced `whatsapp.js` (`buildBookingWhatsAppMessage`, `buildDiningWhatsAppUrl`) and `BookingModal.jsx` so guests immediately receive a structured **Send Booking Order to WhatsApp** Front Desk button plus a **Copy Order Details** action after placing a booking request.
- **Self-Contained Website Staff Portal & First-Time Setup (`2026-11-19`)**:
  - Created & deployed `staff-management` Edge Function (`supabase/functions/staff-management/index.ts`, `verify_jwt = false`) providing public zero-PII setup status check (`status`), one-time first-admin creation (`bootstrap` — automatically locks once an admin exists), and admin-only team management (`list`, `create`, `update_role`, `reset_password`, `delete`).
  - Added First-Time Admin Setup flow inside `/admin/login` (`AdminLogin.jsx`) so the owner can create the very first Admin account directly from the website UI with zero external tools.
  - Added role-tailored Overview Dashboard (`AdminDashboard.jsx` at `/admin/overview`), Contact Inquiries & Newsletter Manager (`InquiriesAdmin.jsx` at `/admin/inquiries`), and Staff & Role Manager (`StaffAdmin.jsx` at `/admin/staff`).
- **Live Supabase Provisioning (`2026-11-19`)**:
  - Provisioned dedicated `newwavesresort` project (`xuggbcfuvxvabatumtoj`) in org **Blizton**, region `eu-west-1` (`ACTIVE_HEALTHY`, URL `https://xuggbcfuvxvabatumtoj.supabase.co`).
  - Applied core schema (`initial_schema_core`), storage buckets (`storage_buckets`), and seed data (`seed_data`).
  - Deployed all 4 Edge Functions as `ACTIVE`: `pms-api` (`verify_jwt: false`), `notify-booking` (`verify_jwt: false`), `youtube-channel-feed` (`verify_jwt: true`), and `staff-management` (`verify_jwt: false`).
  - Configured gitignored `frontend/.env` with live `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.

### Changed
- Removed all public-facing **Staff Portal** / **Dashboard** links and buttons from `Navbar.jsx` and `Footer.jsx` while keeping `/admin` and `/admin/login` active by direct URL so public visitors see zero staff/admin UI entry points.
- Loaded `Cormorant Garamond` and `Plus Jakarta Sans` Google Fonts in `frontend/index.html` and added `--color-midnight`, `--color-ivory`, `--shadow-luxury`, and `.no-scrollbar` tokens in `frontend/src/App.css`.
- Wired `Accomodations.jsx` to read `checkIn`, `checkOut`, and `adults` URL search parameters from the Hero Quick-Availability Bar.
- Replaced `clone_daily_menu` RPC call in `DailyMenuBuilder.jsx` (`Copy Yesterday`) with native direct Supabase queries loading the previous date's menu and dishes cleanly in the browser UI (removing any manual SQL step).
- Updated `getDefaultAdminRoute` (`authHelpers.js`) and `AdminLayout.jsx` sidebar to land all staff roles on `/admin/overview` with unified navigation and clear `"Resort Settings"` / optional external API framing in `IntegrationsAdmin.jsx`.
- Connected local Vite frontend configuration (`frontend/.env`) to the live `xuggbcfuvxvabatumtoj` Supabase backend.

### Fixed
- **Public Anon RLS Permissions & Reliable Booking Persistence (`2026-11-21`)**:
  - Added migration `supabase/migrations/0004_fix_anon_rls_policies.sql` (applied live to `xuggbcfuvxvabatumtoj`) removing `private.get_staff_role()` from the 6 public `SELECT` RLS policies (`site_settings`, `room_types`, `menu_items`, `daily_menus`, `daily_menu_entries`, `gallery_media`) while preserving `authenticated` staff access via `front_desk_read_all_room_types` and `*_manage_*` policies. Eliminated the `42501: permission denied for function get_staff_role` HTTP `401` errors seen by unauthenticated visitors.
  - Updated `useRoomTypes.js` and `Suites.jsx` so suites do not pre-populate with `fallback-*` IDs while Supabase is still loading.
  - Updated `BookingModal.jsx` and `Contact.jsx` so live orders strictly persist to Supabase (`room.slug` UUID resolution safety net, inline validation/server error banner, never faking local confirmation when Supabase is configured).
  - Updated `AdminDashboard.jsx` to display both pending and total booking counts (`X pending • Y total`) with a `supabase_realtime` listener on `public.booking_requests`.
- **Streamlined Booking UX & Direct "Proceed to WhatsApp" Handoff (`2026-11-21`)**:
  - Redesigned `BookingModal.jsx` into scannable **Stay Details** + **Guest Contact** blocks (+ mobile summary header, single Phone/WhatsApp input, automatic check-out date advance, and collapsible optional notes).
  - Removed the manual "Copy Order Details" step from `BookingModal.jsx` and replaced it with one prominent **Proceed to WhatsApp** button (`Continuer sur WhatsApp` in French) opening WhatsApp pre-filled with the formatted order so guests only need to press Send.
  - Added a matching **Proceed to WhatsApp** handoff on `Contact.jsx` inquiry confirmation (`buildInquiryWhatsAppUrl`).
- **Site-Wide Button Visibility & Contrast Audit (`2026-11-21`)**:
  - Removed unused Vite boilerplate `frontend/src/index.css` and added `:root` fallback definitions for `--color-midnight` and `--color-ivory` plus explicit `hover:text-white` safeguards in `App.css`.
  - Standardized button/CTA contrast across public & admin components (`Hero`, `Navbar`, `Suites`, `Cultinary`, `ImpactSection`, `OceanSide`, `Partnerships`, `Footer`, `Accomodations`, `UnitDetail`, `Dining`, `BookingStatus`, `Contact`, `Section`, service subpages, and all `/admin/*` views), replacing white-on-amber and faint-green button pairings with crisp high-contrast tokens and fixing dining badge overlap on cards.

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
