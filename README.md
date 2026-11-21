# New Waves Resort, Ngeme Limbe

Official website and Supabase-powered hospitality platform for **New Waves Resort** in Ngeme, Limbe (South-West Region, Cameroon), developed in partnership with the **Fisiy Foundation and Leadership Center (FFLC)**.

---

## Key Capabilities

- **Standalone Supabase Architecture**: Strictly self-contained — works independently of any external Property Management System (PMS), with an optional `pms-api` Edge Function for convenience syncing.
- **Rooms, Availability & Hybrid WhatsApp Booking**:
  - 1-, 2-, and 3-bedroom suites stored in `room_types` with Supabase Storage photo galleries and SEO-friendly `/rooms/:slug` pages.
  - Guests check date-range availability, submit booking requests (`WEB-YYYYMMDD-XXXX` reference codes), confirm instantly via a pre-filled WhatsApp chat (`wa.me`), and check confirmation status at `/booking-status`.
  - Optional `notify-booking` Edge Function supports automated Meta WhatsApp Cloud API / Twilio alerts when configured.
- **Chef's Dynamic Drag-and-Drop Daily Menu**:
  - Master Dish Catalog (`/admin/menu-catalog`) + interactive `@dnd-kit` Daily Menu Builder (`/admin/daily-menu`) with Meal Periods (`All Day`, `Breakfast`, `Lunch`, `Dinner`), live `Sold Out` toggles, and one-click `Copy Yesterday`.
  - Visitors view Today's Menu (`Africa/Douala` local date) on `/services/dining`.
- **Online Photo & YouTube Video Gallery**:
  - Photos hosted in Supabase Storage (`resort-gallery`) alongside YouTube video embeds (`youtube-nocookie.com`).
  - Managers can add any YouTube URL or import recent uploads directly from a YouTube Channel feed inside `/admin/gallery`.
- **Bilingual (EN / FR) & Multi-Currency Display**:
  - Canonical rates stored in `XAF` (`FCFA`) with optional `USD` / `EUR` display conversion.
- **SEO Ready**:
  - Per-route `<title>`, `<meta description>`, canonical URLs, `hreflang`, OpenGraph, JSON-LD (`Resort`, `HotelRoom`, `Restaurant`, `ImageGallery`, `VideoObject`), `robots.txt`, build-time `sitemap.xml`, and static route HTML prerendering.

---

## Local Development (`frontend/`)

```bash
cd frontend
npm install
cp .env.example .env
# Fill in VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY (optional: local fallback data works without them)
npm run dev
```

Build & verify SEO pipeline:

```bash
npm run lint
npm run build
npm run verify
```

---

## Supabase Setup (`supabase/`)

1. Link your Supabase project and push database migrations + storage buckets:
   ```bash
   supabase link --project-ref <your-project-ref>
   supabase db push
   ```
2. Optionally upload starter images from `frontend/public/assets/general/` into Supabase Storage:
   ```bash
   SUPABASE_URL=https://<ref>.supabase.co SUPABASE_SERVICE_ROLE_KEY=<key> node scripts/seed-storage.mjs
   ```
3. Deploy Edge Functions:
   ```bash
   supabase functions deploy pms-api
   supabase functions deploy notify-booking
   supabase functions deploy youtube-channel-feed
   ```
4. Bootstrap your first staff account in Supabase SQL Editor after creating a user in **Auth → Users**:
   ```sql
   INSERT INTO public.staff_profiles (id, full_name, role)
   VALUES ('<auth-user-uuid>', 'Resort Admin', 'admin');
   -- Allowed roles: 'admin', 'manager', 'front_desk', 'chef'
   ```

---

## Documentation (`docs/`)

Ongoing changes, architectural records, and operational guides live in [`docs/`](docs/README.md):

- [docs/README.md](docs/README.md) — Documentation index & changelog workflow
- [docs/CHANGELOG.md](docs/CHANGELOG.md) — Chronological record of all changes implemented and upcoming
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — System architecture, database tables, RLS policies, RPCs & route map
- [docs/DECISIONS.md](docs/DECISIONS.md) — Architectural Decision Records (ADR-001 to ADR-007)
- [docs/OPERATIONS.md](docs/OPERATIONS.md) — Local dev, verification, Supabase setup & staff `/admin` guides
- [docs/ROADMAP.md](docs/ROADMAP.md) — Launch checklist & future backlog
- [docs/pms-api-guide.md](docs/pms-api-guide.md) & [docs/pms-api.openapi.yaml](docs/pms-api.openapi.yaml) — Scoped `x-api-key` REST API for optional external facility tool integration
