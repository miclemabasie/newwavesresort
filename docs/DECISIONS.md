# Architectural Decision Records (ADRs)

Concise records of major architectural choices and trade-offs made for New Waves Resort.

---

## ADR-001: Strict Loose Coupling Between Resort Website & In-House RMS
- **Date**: 2026-11-19
- **Status**: Accepted
- **Context**: An in-house hospital/resort management system (RMS) exists separately. Tightly sharing its database schema or requiring real-time two-way coupling would cause RMS changes to break the public marketing and booking site.
- **Decision**: Keep the website and its Supabase backend 100% standalone. Expose only generic optional sync columns (`external_ref`, `external_sync_status`, `external_reference`, `external_synced_at`) and an optional API-key-protected REST Edge Function (`pms-api`). Zero website page depends on the external RMS being online.
- **Consequences**: Independent deployments and schema evolution on both sides; external software can pull/push at any cadence or be replaced at any time.

## ADR-002: Hybrid WhatsApp Booking Flow Over Paid Immediate Messaging
- **Date**: 2026-11-19
- **Status**: Accepted
- **Context**: Reception and guests in Limbe/Cameroon rely heavily on WhatsApp, yet paid Meta Cloud / Twilio onboarding is not guaranteed at launch and anonymous database reads must remain blocked.
- **Decision**: Guests submit booking requests through the `SECURITY DEFINER` RPC `create_booking_request`, receiving a unique reference (`WEB-YYYYMMDD-XXXX`) and a one-click pre-filled `wa.me` chat button. Simultaneously, provide `notify-booking` Edge Function configurable via `WHATSAPP_PROVIDER = none | meta_cloud | twilio` when automated server alerts are desired later.
- **Consequences**: Zero upfront messaging API costs, full booking tracking inside Supabase `/admin/bookings` & `/booking-status`, and an easy upgrade path to automated push notifications.

## ADR-003: Split Culinary Master Catalog & Drag-and-Drop Daily Menu (`Africa/Douala`)
- **Date**: 2026-11-19
- **Status**: Accepted
- **Context**: Chefs need to maintain an evergreen catalog of organic Cameroonian dishes and rapidly compose today's menu every morning by dragging items, reordering, toggling Sold Out, or copying yesterday's menu.
- **Decision**: Separate `menu_items` (evergreen catalog + `menu_item_internal_meta` for kitchen cost/station notes) from `daily_menus` + `daily_menu_entries` keyed by `service_date` in `Africa/Douala`. Implement `/admin/daily-menu` with `@dnd-kit` and provide `clone_daily_menu` RPC.
- **Consequences**: Public `/services/dining` defaults cleanly to today's published daily menu (falling back to the latest published daily menu if today's is still a draft), while chefs keep internal notes private.

## ADR-004: Supabase Storage Photography + Zero-Key YouTube Gallery Integration
- **Date**: 2026-11-19
- **Status**: Accepted
- **Context**: Videos are uploaded to the resort's YouTube channel rather than stored raw in database buckets, while photography should live online in Supabase Storage.
- **Decision**: Store resort photos in Supabase Storage (`resort-gallery`, `resort-units`, `resort-menu`) and store YouTube video references (`youtube_video_id`, `youtube_url`, `youtube_duration`) in `gallery_media`, rendered via `youtube-nocookie.com`. Provide `youtube-channel-feed` Edge Function using public oEmbed + YouTube's public Atom RSS feed (`youtube.com/feeds/videos.xml?channel_id=UC...`).
- **Consequences**: Avoids video egress costs and Google Data API quota setup while letting managers publish videos via paste or channel-feed import inside `/admin/gallery`.

## ADR-005: Keep Vite React SPA with Build-Time Sitemap & Route HTML Prerendering
- **Date**: 2026-11-19
- **Status**: Accepted
- **Context**: The project is already built on React 19 + Vite 7 and targets straightforward static hosting (Vercel / Netlify / Nginx), yet needs strong SEO metadata for suites, dining, gallery, and heritage pages.
- **Decision**: Retain the lightweight Vite SPA architecture while adding in-app React `<SEO />` metadata + JSON-LD (`Resort`, `HotelRoom`, `Restaurant`, `ImageGallery`, `VideoObject`, `BreadcrumbList`) AND build-time scripts (`generate-sitemap.mjs`, `prerender.mjs`) producing `dist/sitemap.xml` and static per-route `index.html` head metadata.
- **Consequences**: Crawlers receive complete meta/OG/JSON-LD tags at each route URL with zero SSR server overhead. Lazy-loading `/admin` keeps `@dnd-kit` and staff screens out of the initial public bundle.

## ADR-006: Canonical XAF (FCFA) Rates with Display-Only Multi-Currency & EN/FR Localization
- **Date**: 2026-11-19
- **Status**: Accepted
- **Context**: Resort operations in Limbe price rooms and dishes in Central African CFA Francs (`XAF`/`FCFA`), while international guests compare rates in `USD` and `EUR`, and visitors browse in both English and French.
- **Decision**: Store all suite prices, dish prices, and booking estimates canonically in `XAF`. Offer `CurrencySwitcher` (`XAF` / `USD` / `EUR`) configured from `site_settings.display_exchange_rates`, and standardize bilingual EN/FR columns (`*_en`, `*_fr`) plus `i18next` locale JSON files.
- **Consequences**: Eliminates currency rounding drift in accounting/bookings while giving international visitors familiar currency display.

## ADR-007: Non-Destructive Handling of Unrelated Supabase Projects
- **Date**: 2026-11-19
- **Status**: Accepted
- **Context**: The connected Supabase workspace already holds unrelated projects (`holipanel`, `techwithmiclem.com`).
- **Decision**: Never deploy schema migrations, buckets, or functions onto existing unrelated projects or auto-create billable cloud projects without explicit owner instruction. Deliver all SQL, Edge Functions, and fallback frontend data cleanly inside the repo first.
- **Consequences**: Zero risk of accidental data alteration on existing projects; provisioning `newwavesresort` becomes a deliberate, repeatable step (`OPERATIONS.md`).
