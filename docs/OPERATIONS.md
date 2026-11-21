# Operations & Setup Runbook

Guide for local development, verification, Supabase deployment, and daily staff operations.

---

## 1. Local Development (`frontend/`)

When `frontend/.env` is not yet configured, the site automatically serves preview data from `frontend/src/lib/fallbackData.js`.

```bash
cd frontend
npm install
cp .env.example .env
# Optional for local preview; required for live DB/Auth:
# VITE_SUPABASE_URL=https://<project-ref>.supabase.co
# VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
# VITE_SITE_URL=https://newwavesresort.com
# VITE_DEFAULT_WHATSAPP=2376XXXXXXXX
npm run dev
```

### Verification Commands (Run After Code or Content Edits)

```bash
npm run --prefix frontend lint
npm run --prefix frontend build
npm run --prefix frontend verify
```

Expected passing checks:
- `lint`: `0` errors and `0` warnings.
- `build`: Generates `frontend/dist/sitemap.xml` and prerenders 14 route HTML files.
- `verify`: Prints `All helper, i18n, schema, and SEO build assertions passed!`.

---

## 2. Live Supabase Provisioning Checklist

> **Important**: Create a dedicated project for New Waves Resort (`newwavesresort`). Do **not** target unrelated projects in your Supabase organization.

1. **Link Project & Push Migrations + Storage Policies**
   ```bash
   supabase link --project-ref <your-project-ref>
   supabase db push
   ```
   This applies:
   - `supabase/migrations/0001_initial_schema.sql`
   - `supabase/migrations/0002_storage_buckets.sql`
   - `supabase/migrations/0003_seed_data.sql`

2. **Upload Starter Images to Supabase Storage (Optional)**
   ```bash
   SUPABASE_URL="https://<your-project-ref>.supabase.co" \
   SUPABASE_SERVICE_ROLE_KEY="<service-role-key>" \
   node scripts/seed-storage.mjs
   ```

3. **Deploy Edge Functions**
   ```bash
   supabase functions deploy pms-api
   supabase functions deploy notify-booking
   supabase functions deploy youtube-channel-feed
   supabase functions deploy staff-management
   ```

4. **Optional Automated WhatsApp Notification Secrets (`notify-booking`)**
   Only set these if moving beyond click-to-chat `wa.me` to automated webhook alerts, and configure a Supabase Database Webhook on `public.booking_requests` (`INSERT`) pointing to `notify-booking`:
   - `WHATSAPP_PROVIDER`: `none` (default), `meta_cloud`, or `twilio`
   - `BOOKING_WEBHOOK_SECRET`: matching `x-webhook-secret` header
   - `RESORT_ALERT_WHATSAPP`: recipient WhatsApp number
   - Provider secrets: `META_WHATSAPP_TOKEN` + `META_WHATSAPP_PHONE_ID` **or** `TWILIO_ACCOUNT_SID` + `TWILIO_AUTH_TOKEN` + `TWILIO_WHATSAPP_FROM`

5. **Create First Admin & Team Logins Directly Inside Website UI**
   - Click **Staff Portal** in the top navigation bar (or `/admin/login`).
   - On a fresh database, `/admin/login` automatically renders **Create Resort Admin Account** — enter name, email, and password (min 8 chars) to initialize your Admin account without visiting Supabase Dashboard.
   - Sign in, open **Staff & Roles (`/admin/staff`)**, and create accounts for **Chefs** (`chef`), **Front Desk** (`front_desk`), **Managers** (`manager`), or additional **Admins** (`admin`).

6. **Configure Initial Site Settings in `/admin/integrations`**
   - Open **Resort Settings (`/admin/integrations`)**.
   - Set **WhatsApp Concierge Number** (digits with country code, e.g. `2376XXXXXXXX`), public phone/email, **YouTube Channel ID** (`UC...`), and upload the **Saker Landing Heritage Photo** for `/story`.

---

## 3. Staff Operations Guide (`/admin`)

- **All Staff (`admin`, `manager`, `front_desk`, `chef`)**:
  - Click **Staff Portal** in the top header or footer link, sign in, and start on **Overview (`/admin/overview`)** showing live metrics and quick cards tailored to your role.
- **Chefs (`chef`, `manager`, `admin`)**:
  - Add/edit recipes in **Dish Catalog (`/admin/menu-catalog`)** with EN/FR names, FCFA prices, dietary tags, allergens, prep station, and Storage photos.
  - Every morning in **Daily Menu (`/admin/daily-menu`)**, pick the service date (`Africa/Douala`), drag dishes from the left palette into `All Day`, `Breakfast`, `Lunch`, or `Dinner` (or click **Copy Yesterday**), toggle **Available / Sold Out**, add a Chef's Note, and click **Save & Publish**.
- **Front Desk (`front_desk`, `manager`, `admin`)**:
  - Open **Booking Requests (`/admin/bookings`)** (updates in real time when guests submit requests).
  - Confirm requests, record external reservation codes, or click **WA** to open WhatsApp directly with the guest pre-filled with their reference (`WEB-YYYYMMDD-XXXX`).
  - Review and respond to contact messages in **Inquiries & Mailing (`/admin/inquiries`)**.
- **Managers (`manager`, `admin`)**:
  - Manage 1-/2-/3-bedroom suites, rates (`XAF`), multiple Storage photos, and manual date blocks in **Suites & Units (`/admin/units`)**.
  - Upload photography batches to `resort-gallery`, paste new YouTube URLs, or click **Load Feed** on your YouTube Channel ID to import recent videos in **Gallery & YouTube (`/admin/gallery`)**.
- **Admins (`admin`)**:
  - Create, promote/demote, reset passwords for, or remove staff users in **Staff & Roles (`/admin/staff`)**.
  - Manage resort contact/WhatsApp/YouTube settings and (only if connecting an external RMS tool) optional SHA-256 API keys in **Resort Settings (`/admin/integrations`)** (see [pms-api-guide.md](./pms-api-guide.md)).
