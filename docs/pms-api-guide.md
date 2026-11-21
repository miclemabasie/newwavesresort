# New Waves Resort — Optional Facility Integration Guide (`pms-api`)

The New Waves Resort website is **100% standalone**. Nothing in the website depends on an external Property Management System (PMS) being online, and changes to your in-house software schema will never break the website.

For convenience, the `pms-api` Supabase Edge Function provides a lightweight, API-key-protected REST layer so your in-house facility software (or any manager script) can optionally pull website booking requests and push updates.

---

## Authentication

Generate a scoped API key in the website's **Admin Portal → Integrations (`/admin/integrations`)**. Pass it on every request via the `x-api-key` header:

```bash
export API_BASE="https://<your-project-ref>.supabase.co/functions/v1/pms-api"
export API_KEY="nwr_live_..."
```

Available scopes: `bookings:read`, `bookings:write`, `rooms:read`, `rooms:write`, `menu:read`, `menu:write`, `gallery:read`, `gallery:write` (or `*`).

---

## Common Workflows

### 1. Pull New Website Booking Requests
```bash
curl -s "$API_BASE/bookings?sync_status=pending" \
  -H "x-api-key: $API_KEY"
```

After your facility tool imports a booking request into its own reservation table, mark it as `synced` and optionally attach your internal reservation reference (`RSV-...`) so guests can track it on `/booking-status`:

```bash
curl -s -X PATCH "$API_BASE/bookings/<booking_id>" \
  -H "x-api-key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "confirmed",
    "external_sync_status": "synced",
    "external_reference": "RSV-2026-00042"
  }'
```

Or batch-acknowledge pulled IDs:
```bash
curl -s -X POST "$API_BASE/bookings/ack" \
  -H "x-api-key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"ids": ["<uuid-1>", "<uuid-2>"], "sync_status": "pulled"}'
```

### 2. Update Room Availability or Pricing
```bash
curl -s -X PATCH "$API_BASE/rooms/<room_type_id>" \
  -H "x-api-key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "base_price": 210000,
    "availability_status": "available",
    "total_units": 3
  }'
```

Or push date blocks (half-open `[start_date, end_date)` ranges):
```bash
curl -s -X PUT "$API_BASE/rooms/<room_type_id>/unavailability" \
  -H "x-api-key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "external_ref": "inhouse-pms",
    "blocks": [
      {"start_date": "2026-12-20", "end_date": "2026-12-26", "units_blocked": 1, "reason": "booked"}
    ]
  }'
```

### 3. Publish a YouTube Video or Photo to Gallery Without Opening the Website
```bash
curl -s -X POST "$API_BASE/gallery" \
  -H "x-api-key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "media_type": "youtube",
    "title_en": "Evening Coastal Dialogue",
    "title_fr": "Dialogue Côtier du Soir",
    "category": "talks",
    "youtube_video_id": "5Aa9Mc1VqKE",
    "youtube_url": "https://www.youtube.com/watch?v=5Aa9Mc1VqKE",
    "is_published": true
  }'
```
