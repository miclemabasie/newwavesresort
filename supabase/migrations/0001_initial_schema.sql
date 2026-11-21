-- New Waves Resort (Ngeme, Limbe) — Initial Schema, RLS & RPCs
-- Strictly self-contained website & resort data platform; external integrations are optional.

CREATE SCHEMA IF NOT EXISTS private;

-- Updated-at trigger helper
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ============================================================================
-- 1. Staff Profiles & Role Helper
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.staff_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'manager', 'front_desk', 'chef')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER trg_staff_profiles_updated_at
  BEFORE UPDATE ON public.staff_profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION private.get_staff_role()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT role
  FROM public.staff_profiles
  WHERE id = (SELECT auth.uid())
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION private.get_staff_role() FROM PUBLIC;
GRANT USAGE ON SCHEMA private TO authenticated;
GRANT EXECUTE ON FUNCTION private.get_staff_role() TO authenticated;

-- ============================================================================
-- 2. Public & Internal Site Settings
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.site_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_public boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER trg_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================================
-- 3. Room Types & Optional Date Unavailability
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.room_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  external_ref text UNIQUE,
  suite_category text NOT NULL DEFAULT '1-bedroom'
    CHECK (suite_category IN ('1-bedroom', '2-bedroom', '3-bedroom', 'studio', 'villa', 'conference')),
  name_en text NOT NULL,
  name_fr text NOT NULL,
  short_description_en text DEFAULT '',
  short_description_fr text DEFAULT '',
  description_en text DEFAULT '',
  description_fr text DEFAULT '',
  base_price numeric(12,2) NOT NULL DEFAULT 0 CHECK (base_price >= 0),
  currency text NOT NULL DEFAULT 'XAF',
  bedrooms integer NOT NULL DEFAULT 1 CHECK (bedrooms >= 0),
  max_adults integer NOT NULL DEFAULT 2 CHECK (max_adults >= 1),
  max_children integer NOT NULL DEFAULT 0 CHECK (max_children >= 0),
  bed_configuration text NOT NULL DEFAULT 'king'
    CHECK (bed_configuration IN ('single', 'twin', 'double', 'queen', 'king', 'super_king', 'sofa_bed', 'bunk')),
  number_of_beds integer NOT NULL DEFAULT 1 CHECK (number_of_beds >= 1),
  size_sqm integer CHECK (size_sqm IS NULL OR size_sqm > 0),
  view_type text NOT NULL DEFAULT 'sea'
    CHECK (view_type IN ('none', 'garden', 'city', 'pool', 'sea', 'mountain', 'courtyard')),
  amenities jsonb NOT NULL DEFAULT '[]'::jsonb,
  cover_image_url text DEFAULT '',
  gallery_images jsonb NOT NULL DEFAULT '[]'::jsonb,
  total_units integer NOT NULL DEFAULT 1 CHECK (total_units >= 1),
  availability_status text NOT NULL DEFAULT 'available'
    CHECK (availability_status IN ('available', 'limited', 'booked', 'maintenance')),
  is_featured boolean NOT NULL DEFAULT false,
  is_published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_room_types_published_sort
  ON public.room_types (is_published, sort_order, suite_category);

CREATE TRIGGER trg_room_types_updated_at
  BEFORE UPDATE ON public.room_types
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE IF NOT EXISTS public.room_unavailability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_type_id uuid NOT NULL REFERENCES public.room_types(id) ON DELETE CASCADE,
  start_date date NOT NULL,
  end_date date NOT NULL,
  units_blocked integer NOT NULL DEFAULT 1 CHECK (units_blocked >= 1),
  reason text NOT NULL DEFAULT 'booked',
  external_ref text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (end_date > start_date)
);

CREATE INDEX IF NOT EXISTS idx_room_unavailability_room_dates
  ON public.room_unavailability (room_type_id, start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_room_unavailability_external_ref
  ON public.room_unavailability (external_ref) WHERE external_ref IS NOT NULL;

-- ============================================================================
-- 4. Booking Requests (Loosely-coupled pull queue + WhatsApp handoff)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.booking_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_code text UNIQUE NOT NULL,
  room_type_id uuid REFERENCES public.room_types(id) ON DELETE SET NULL,
  room_type_name_snapshot text NOT NULL,
  external_room_ref text,
  rooms_requested integer NOT NULL DEFAULT 1 CHECK (rooms_requested >= 1),
  guest_first_name text NOT NULL,
  guest_last_name text NOT NULL,
  guest_email text NOT NULL,
  guest_phone text NOT NULL,
  guest_whatsapp text DEFAULT '',
  guest_nationality text DEFAULT '',
  guest_company_name text DEFAULT '',
  guest_type text NOT NULL DEFAULT 'individual'
    CHECK (guest_type IN ('individual', 'corporate', 'group')),
  preferred_language text NOT NULL DEFAULT 'en'
    CHECK (preferred_language IN ('en', 'fr')),
  check_in_date date NOT NULL,
  check_out_date date NOT NULL,
  adults integer NOT NULL DEFAULT 1 CHECK (adults >= 1),
  children integer NOT NULL DEFAULT 0 CHECK (children >= 0),
  rate_per_night_snapshot numeric(12,2) NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'XAF',
  estimated_total numeric(12,2) NOT NULL DEFAULT 0,
  special_requests text DEFAULT '',
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'confirmed', 'declined', 'checked_in', 'checked_out', 'cancelled', 'no_show')),
  source text NOT NULL DEFAULT 'website'
    CHECK (source IN ('website', 'whatsapp', 'external_api')),
  whatsapp_notified boolean NOT NULL DEFAULT false,
  external_sync_status text NOT NULL DEFAULT 'pending'
    CHECK (external_sync_status IN ('pending', 'pulled', 'synced', 'ignored')),
  external_reference text,
  external_synced_at timestamptz,
  internal_notes text DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (check_out_date > check_in_date)
);

CREATE INDEX IF NOT EXISTS idx_booking_requests_room_type_id
  ON public.booking_requests (room_type_id);
CREATE INDEX IF NOT EXISTS idx_booking_requests_status_created
  ON public.booking_requests (status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_booking_requests_sync_created
  ON public.booking_requests (external_sync_status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_booking_requests_lookup
  ON public.booking_requests (lower(reference_code), lower(guest_email));

CREATE TRIGGER trg_booking_requests_updated_at
  BEFORE UPDATE ON public.booking_requests
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================================
-- 5. Dynamic Culinary Catalog & Drag-and-Drop Daily Menu
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name_en text NOT NULL,
  name_fr text NOT NULL,
  description_en text DEFAULT '',
  description_fr text DEFAULT '',
  category text NOT NULL DEFAULT 'main'
    CHECK (category IN ('appetizer', 'main', 'side', 'dessert', 'beverage', 'cocktail', 'wine', 'spirit', 'other')),
  price_xaf numeric(12,2) NOT NULL DEFAULT 0 CHECK (price_xaf >= 0),
  price_label_en text DEFAULT '',
  price_label_fr text DEFAULT '',
  dietary_tags text[] NOT NULL DEFAULT '{}',
  allergens text[] NOT NULL DEFAULT '{}',
  preparation_minutes integer DEFAULT 15,
  wine_pairing text DEFAULT '',
  image_url text DEFAULT '',
  storage_path text DEFAULT '',
  is_signature boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_menu_items_active_category
  ON public.menu_items (is_active, category);
CREATE INDEX IF NOT EXISTS idx_menu_items_created_by
  ON public.menu_items (created_by);

CREATE TRIGGER trg_menu_items_updated_at
  BEFORE UPDATE ON public.menu_items
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE IF NOT EXISTS public.menu_item_internal_meta (
  menu_item_id uuid PRIMARY KEY REFERENCES public.menu_items(id) ON DELETE CASCADE,
  cost_xaf numeric(12,2),
  plating_notes text DEFAULT '',
  prep_station text NOT NULL DEFAULT ''
    CHECK (prep_station IN ('', 'grill', 'saute', 'fry', 'pastry', 'bar', 'cold')),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER trg_menu_item_internal_meta_updated_at
  BEFORE UPDATE ON public.menu_item_internal_meta
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE IF NOT EXISTS public.daily_menus (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_date date UNIQUE NOT NULL,
  title_en text DEFAULT '',
  title_fr text DEFAULT '',
  chef_note_en text DEFAULT '',
  chef_note_fr text DEFAULT '',
  status text NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'published', 'archived')),
  published_at timestamptz,
  updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_daily_menus_date_status
  ON public.daily_menus (service_date DESC, status);
CREATE INDEX IF NOT EXISTS idx_daily_menus_updated_by
  ON public.daily_menus (updated_by);

CREATE TRIGGER trg_daily_menus_updated_at
  BEFORE UPDATE ON public.daily_menus
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE IF NOT EXISTS public.daily_menu_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  daily_menu_id uuid NOT NULL REFERENCES public.daily_menus(id) ON DELETE CASCADE,
  menu_item_id uuid NOT NULL REFERENCES public.menu_items(id) ON DELETE CASCADE,
  meal_period text NOT NULL DEFAULT 'all_day'
    CHECK (meal_period IN ('breakfast', 'lunch', 'dinner', 'all_day')),
  display_order integer NOT NULL DEFAULT 0,
  daily_price_override numeric(12,2) CHECK (daily_price_override IS NULL OR daily_price_override >= 0),
  is_available boolean NOT NULL DEFAULT true,
  highlight_badge text DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (daily_menu_id, menu_item_id, meal_period)
);

CREATE INDEX IF NOT EXISTS idx_daily_menu_entries_menu_period_order
  ON public.daily_menu_entries (daily_menu_id, meal_period, display_order);
CREATE INDEX IF NOT EXISTS idx_daily_menu_entries_item_id
  ON public.daily_menu_entries (menu_item_id);

-- ============================================================================
-- 6. Online Gallery (Supabase Storage Photos + YouTube Videos)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.gallery_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  media_type text NOT NULL CHECK (media_type IN ('image', 'youtube')),
  title_en text NOT NULL,
  title_fr text NOT NULL,
  description_en text DEFAULT '',
  description_fr text DEFAULT '',
  category text NOT NULL DEFAULT 'architecture'
    CHECK (category IN ('architecture', 'interiors', 'leisure', 'dining', 'professional', 'events', 'nature', 'talks')),
  image_url text DEFAULT '',
  storage_path text DEFAULT '',
  youtube_video_id text DEFAULT '',
  youtube_url text DEFAULT '',
  youtube_duration text DEFAULT '',
  youtube_published_at timestamptz,
  is_featured_home boolean NOT NULL DEFAULT false,
  is_published boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL DEFAULT 0,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_gallery_media_published_order
  ON public.gallery_media (is_published, display_order, category);
CREATE INDEX IF NOT EXISTS idx_gallery_media_featured
  ON public.gallery_media (is_published, is_featured_home, display_order);
CREATE INDEX IF NOT EXISTS idx_gallery_media_youtube_id
  ON public.gallery_media (youtube_video_id) WHERE youtube_video_id IS NOT NULL AND youtube_video_id <> '';

CREATE TRIGGER trg_gallery_media_updated_at
  BEFORE UPDATE ON public.gallery_media
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================================
-- 7. Contact Inquiries, Newsletter & API Keys
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  inquiry_type text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contact_inquiries_status_created
  ON public.contact_inquiries (status, created_at DESC);

CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  language text NOT NULL DEFAULT 'en',
  subscribed_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.api_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  key_prefix text NOT NULL,
  key_hash text UNIQUE NOT NULL,
  scopes text[] NOT NULL DEFAULT ARRAY['bookings:read', 'bookings:write', 'rooms:read', 'rooms:write'],
  is_active boolean NOT NULL DEFAULT true,
  last_used_at timestamptz,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_api_keys_created_by
  ON public.api_keys (created_by);

-- ============================================================================
-- 8. Row Level Security Policies
-- ============================================================================
ALTER TABLE public.staff_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_unavailability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_item_internal_meta ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_menu_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;

-- Table grants for PostgREST Data API
GRANT USAGE ON SCHEMA public TO anon, authenticated;

GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;

GRANT SELECT ON public.room_types TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.room_types TO authenticated;

GRANT SELECT ON public.room_unavailability TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.room_unavailability TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.booking_requests TO authenticated;
-- Deliberately NO grants on booking_requests for anon; public creates bookings via RPC only.

GRANT SELECT ON public.menu_items TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.menu_items TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.menu_item_internal_meta TO authenticated;

GRANT SELECT ON public.daily_menus TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.daily_menus TO authenticated;

GRANT SELECT ON public.daily_menu_entries TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.daily_menu_entries TO authenticated;

GRANT SELECT ON public.gallery_media TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.gallery_media TO authenticated;

GRANT INSERT ON public.contact_inquiries TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.contact_inquiries TO authenticated;

GRANT INSERT ON public.newsletter_subscribers TO anon, authenticated;
GRANT SELECT, DELETE ON public.newsletter_subscribers TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.staff_profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.api_keys TO authenticated;

-- staff_profiles policies
CREATE POLICY "staff_read_own_profile" ON public.staff_profiles
  FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = id OR private.get_staff_role() = 'admin');

CREATE POLICY "admin_manage_staff_profiles" ON public.staff_profiles
  FOR ALL TO authenticated
  USING (private.get_staff_role() = 'admin')
  WITH CHECK (private.get_staff_role() = 'admin');

-- site_settings policies
CREATE POLICY "public_read_site_settings" ON public.site_settings
  FOR SELECT TO anon, authenticated
  USING (is_public = true OR private.get_staff_role() IN ('admin', 'manager'));

CREATE POLICY "staff_manage_site_settings" ON public.site_settings
  FOR ALL TO authenticated
  USING (private.get_staff_role() IN ('admin', 'manager'))
  WITH CHECK (private.get_staff_role() IN ('admin', 'manager'));

-- room_types policies
CREATE POLICY "public_read_published_room_types" ON public.room_types
  FOR SELECT TO anon, authenticated
  USING (is_published = true OR private.get_staff_role() IN ('admin', 'manager', 'front_desk'));

CREATE POLICY "manager_manage_room_types" ON public.room_types
  FOR ALL TO authenticated
  USING (private.get_staff_role() IN ('admin', 'manager'))
  WITH CHECK (private.get_staff_role() IN ('admin', 'manager'));

-- room_unavailability policies
CREATE POLICY "public_read_room_unavailability" ON public.room_unavailability
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "staff_manage_room_unavailability" ON public.room_unavailability
  FOR ALL TO authenticated
  USING (private.get_staff_role() IN ('admin', 'manager', 'front_desk'))
  WITH CHECK (private.get_staff_role() IN ('admin', 'manager', 'front_desk'));

-- booking_requests policies (staff only; no anon SELECT/INSERT)
CREATE POLICY "staff_read_booking_requests" ON public.booking_requests
  FOR SELECT TO authenticated
  USING (private.get_staff_role() IN ('admin', 'manager', 'front_desk'));

CREATE POLICY "staff_insert_booking_requests" ON public.booking_requests
  FOR INSERT TO authenticated
  WITH CHECK (private.get_staff_role() IN ('admin', 'manager', 'front_desk'));

CREATE POLICY "staff_update_booking_requests" ON public.booking_requests
  FOR UPDATE TO authenticated
  USING (private.get_staff_role() IN ('admin', 'manager', 'front_desk'))
  WITH CHECK (private.get_staff_role() IN ('admin', 'manager', 'front_desk'));

CREATE POLICY "admin_delete_booking_requests" ON public.booking_requests
  FOR DELETE TO authenticated
  USING (private.get_staff_role() = 'admin');

-- menu_items policies
CREATE POLICY "public_read_active_menu_items" ON public.menu_items
  FOR SELECT TO anon, authenticated
  USING (is_active = true OR private.get_staff_role() IN ('admin', 'manager', 'chef'));

CREATE POLICY "culinary_manage_menu_items" ON public.menu_items
  FOR ALL TO authenticated
  USING (private.get_staff_role() IN ('admin', 'manager', 'chef'))
  WITH CHECK (private.get_staff_role() IN ('admin', 'manager', 'chef'));

-- menu_item_internal_meta policies
CREATE POLICY "culinary_manage_menu_item_meta" ON public.menu_item_internal_meta
  FOR ALL TO authenticated
  USING (private.get_staff_role() IN ('admin', 'manager', 'chef'))
  WITH CHECK (private.get_staff_role() IN ('admin', 'manager', 'chef'));

-- daily_menus policies
CREATE POLICY "public_read_published_daily_menus" ON public.daily_menus
  FOR SELECT TO anon, authenticated
  USING (status = 'published' OR private.get_staff_role() IN ('admin', 'manager', 'chef'));

CREATE POLICY "culinary_manage_daily_menus" ON public.daily_menus
  FOR ALL TO authenticated
  USING (private.get_staff_role() IN ('admin', 'manager', 'chef'))
  WITH CHECK (private.get_staff_role() IN ('admin', 'manager', 'chef'));

-- daily_menu_entries policies
CREATE POLICY "public_read_published_daily_menu_entries" ON public.daily_menu_entries
  FOR SELECT TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.daily_menus dm
      WHERE dm.id = daily_menu_id AND dm.status = 'published'
    )
    OR private.get_staff_role() IN ('admin', 'manager', 'chef')
  );

CREATE POLICY "culinary_manage_daily_menu_entries" ON public.daily_menu_entries
  FOR ALL TO authenticated
  USING (private.get_staff_role() IN ('admin', 'manager', 'chef'))
  WITH CHECK (private.get_staff_role() IN ('admin', 'manager', 'chef'));

-- gallery_media policies
CREATE POLICY "public_read_published_gallery_media" ON public.gallery_media
  FOR SELECT TO anon, authenticated
  USING (is_published = true OR private.get_staff_role() IN ('admin', 'manager'));

CREATE POLICY "manager_manage_gallery_media" ON public.gallery_media
  FOR ALL TO authenticated
  USING (private.get_staff_role() IN ('admin', 'manager'))
  WITH CHECK (private.get_staff_role() IN ('admin', 'manager'));

-- contact_inquiries policies
CREATE POLICY "public_insert_contact_inquiries" ON public.contact_inquiries
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(trim(full_name)) > 0
    AND length(trim(email)) > 2
    AND length(trim(message)) > 0
  );

CREATE POLICY "staff_read_update_contact_inquiries" ON public.contact_inquiries
  FOR SELECT TO authenticated
  USING (private.get_staff_role() IN ('admin', 'manager', 'front_desk'));

CREATE POLICY "staff_update_contact_inquiries" ON public.contact_inquiries
  FOR UPDATE TO authenticated
  USING (private.get_staff_role() IN ('admin', 'manager', 'front_desk'))
  WITH CHECK (private.get_staff_role() IN ('admin', 'manager', 'front_desk'));

-- newsletter_subscribers policies
CREATE POLICY "public_insert_newsletter" ON public.newsletter_subscribers
  FOR INSERT TO anon, authenticated
  WITH CHECK (length(trim(email)) > 3);

CREATE POLICY "staff_manage_newsletter" ON public.newsletter_subscribers
  FOR SELECT TO authenticated
  USING (private.get_staff_role() IN ('admin', 'manager'));

CREATE POLICY "admin_delete_newsletter" ON public.newsletter_subscribers
  FOR DELETE TO authenticated
  USING (private.get_staff_role() IN ('admin', 'manager'));

-- api_keys policies (admin only)
CREATE POLICY "admin_manage_api_keys" ON public.api_keys
  FOR ALL TO authenticated
  USING (private.get_staff_role() = 'admin')
  WITH CHECK (private.get_staff_role() = 'admin');

-- ============================================================================
-- 9. Public & Staff RPC Functions
-- ============================================================================

-- Check available room types for half-open [p_check_in, p_check_out) range
CREATE OR REPLACE FUNCTION public.get_available_room_types(
  p_check_in date,
  p_check_out date,
  p_adults integer DEFAULT 1,
  p_children integer DEFAULT 0
)
RETURNS TABLE (
  room_type_id uuid,
  available_units integer,
  nights integer,
  estimated_total numeric
)
LANGUAGE plpgsql
STABLE
SECURITY INVOKER
SET search_path = ''
AS $$
DECLARE
  v_nights integer;
BEGIN
  IF p_check_in IS NULL OR p_check_out IS NULL OR p_check_out <= p_check_in THEN
    RAISE EXCEPTION 'Check-out date must be after check-in date.';
  END IF;

  v_nights := (p_check_out - p_check_in);

  RETURN QUERY
  SELECT
    rt.id AS room_type_id,
    GREATEST(
      0,
      CASE
        WHEN rt.availability_status IN ('booked', 'maintenance') THEN 0
        ELSE rt.total_units - COALESCE((
          SELECT SUM(ru.units_blocked)::integer
          FROM public.room_unavailability ru
          WHERE ru.room_type_id = rt.id
            AND ru.start_date < p_check_out
            AND ru.end_date > p_check_in
        ), 0)
      END
    ) AS available_units,
    v_nights AS nights,
    (rt.base_price * v_nights)::numeric(12,2) AS estimated_total
  FROM public.room_types rt
  WHERE rt.is_published = true
    AND rt.max_adults >= COALESCE(p_adults, 1)
    AND (rt.max_adults + rt.max_children) >= (COALESCE(p_adults, 1) + COALESCE(p_children, 0))
  ORDER BY rt.sort_order ASC, rt.base_price ASC;
END;
$$;

REVOKE ALL ON FUNCTION public.get_available_room_types(date, date, integer, integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_available_room_types(date, date, integer, integer) TO anon, authenticated;

-- Create public booking request without exposing booking_requests SELECT to anon
CREATE OR REPLACE FUNCTION public.create_booking_request(
  p_room_type_id uuid,
  p_guest_first_name text,
  p_guest_last_name text,
  p_guest_email text,
  p_guest_phone text,
  p_check_in date,
  p_check_out date,
  p_adults integer DEFAULT 1,
  p_children integer DEFAULT 0,
  p_rooms_requested integer DEFAULT 1,
  p_guest_whatsapp text DEFAULT '',
  p_guest_nationality text DEFAULT '',
  p_guest_company_name text DEFAULT '',
  p_guest_type text DEFAULT 'individual',
  p_preferred_language text DEFAULT 'en',
  p_special_requests text DEFAULT '',
  p_source text DEFAULT 'website'
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_room public.room_types%ROWTYPE;
  v_nights integer;
  v_blocked integer;
  v_total numeric(12,2);
  v_ref text;
  v_id uuid;
  v_lang text;
  v_source text;
  v_gtype text;
  v_attempt integer := 0;
BEGIN
  IF p_check_in IS NULL OR p_check_out IS NULL OR p_check_out <= p_check_in THEN
    RAISE EXCEPTION 'Check-out date must be after check-in date.';
  END IF;

  IF length(trim(COALESCE(p_guest_first_name, ''))) = 0
     OR length(trim(COALESCE(p_guest_last_name, ''))) = 0
     OR length(trim(COALESCE(p_guest_email, ''))) < 3
     OR length(trim(COALESCE(p_guest_phone, ''))) < 5 THEN
    RAISE EXCEPTION 'First name, last name, valid email, and phone number are required.';
  END IF;

  SELECT * INTO v_room
  FROM public.room_types
  WHERE id = p_room_type_id AND is_published = true;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Selected suite is not available for booking.';
  END IF;

  IF v_room.availability_status IN ('booked', 'maintenance') THEN
    RAISE EXCEPTION 'Selected suite is currently unavailable.';
  END IF;

  SELECT COALESCE(SUM(ru.units_blocked), 0)::integer INTO v_blocked
  FROM public.room_unavailability ru
  WHERE ru.room_type_id = v_room.id
    AND ru.start_date < p_check_out
    AND ru.end_date > p_check_in;

  IF (v_room.total_units - v_blocked) < GREATEST(1, COALESCE(p_rooms_requested, 1)) THEN
    RAISE EXCEPTION 'Not enough units available for the selected dates.';
  END IF;

  v_nights := (p_check_out - p_check_in);
  v_total := (v_room.base_price * v_nights * GREATEST(1, COALESCE(p_rooms_requested, 1)))::numeric(12,2);
  v_lang := CASE WHEN lower(COALESCE(p_preferred_language, 'en')) = 'fr' THEN 'fr' ELSE 'en' END;
  v_source := CASE WHEN p_source IN ('website', 'whatsapp', 'external_api') THEN p_source ELSE 'website' END;
  v_gtype := CASE WHEN p_guest_type IN ('individual', 'corporate', 'group') THEN p_guest_type ELSE 'individual' END;

  LOOP
    v_attempt := v_attempt + 1;
    v_ref := 'WEB-' || to_char(CURRENT_DATE, 'YYYYMMDD') || '-' || lpad((floor(random() * 9000 + 1000))::int::text, 4, '0');
    BEGIN
      INSERT INTO public.booking_requests (
        reference_code,
        room_type_id,
        room_type_name_snapshot,
        external_room_ref,
        rooms_requested,
        guest_first_name,
        guest_last_name,
        guest_email,
        guest_phone,
        guest_whatsapp,
        guest_nationality,
        guest_company_name,
        guest_type,
        preferred_language,
        check_in_date,
        check_out_date,
        adults,
        children,
        rate_per_night_snapshot,
        currency,
        estimated_total,
        special_requests,
        status,
        source
      ) VALUES (
        v_ref,
        v_room.id,
        CASE WHEN v_lang = 'fr' THEN v_room.name_fr ELSE v_room.name_en END,
        v_room.external_ref,
        GREATEST(1, COALESCE(p_rooms_requested, 1)),
        trim(p_guest_first_name),
        trim(p_guest_last_name),
        lower(trim(p_guest_email)),
        trim(p_guest_phone),
        COALESCE(NULLIF(trim(p_guest_whatsapp), ''), trim(p_guest_phone)),
        COALESCE(trim(p_guest_nationality), ''),
        COALESCE(trim(p_guest_company_name), ''),
        v_gtype,
        v_lang,
        p_check_in,
        p_check_out,
        GREATEST(1, COALESCE(p_adults, 1)),
        GREATEST(0, COALESCE(p_children, 0)),
        v_room.base_price,
        v_room.currency,
        v_total,
        COALESCE(trim(p_special_requests), ''),
        'pending',
        v_source
      )
      RETURNING id INTO v_id;
      EXIT;
    EXCEPTION WHEN unique_violation THEN
      IF v_attempt >= 5 THEN
        RAISE EXCEPTION 'Could not generate unique booking reference. Please retry.';
      END IF;
    END;
  END LOOP;

  RETURN jsonb_build_object(
    'id', v_id,
    'reference_code', v_ref,
    'room_type_id', v_room.id,
    'room_type_name', CASE WHEN v_lang = 'fr' THEN v_room.name_fr ELSE v_room.name_en END,
    'check_in_date', p_check_in,
    'check_out_date', p_check_out,
    'nights', v_nights,
    'rooms_requested', GREATEST(1, COALESCE(p_rooms_requested, 1)),
    'adults', GREATEST(1, COALESCE(p_adults, 1)),
    'children', GREATEST(0, COALESCE(p_children, 0)),
    'rate_per_night', v_room.base_price,
    'estimated_total', v_total,
    'currency', v_room.currency,
    'status', 'pending'
  );
END;
$$;

REVOKE ALL ON FUNCTION public.create_booking_request(uuid, text, text, text, text, date, date, integer, integer, integer, text, text, text, text, text, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.create_booking_request(uuid, text, text, text, text, date, date, integer, integer, integer, text, text, text, text, text, text, text) TO anon, authenticated;

-- Guest-safe booking status tracker (requires matching reference_code + email)
CREATE OR REPLACE FUNCTION public.lookup_booking_status(
  p_reference_code text,
  p_email text
)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_row public.booking_requests%ROWTYPE;
BEGIN
  IF length(trim(COALESCE(p_reference_code, ''))) = 0
     OR length(trim(COALESCE(p_email, ''))) = 0 THEN
    RETURN NULL;
  END IF;

  SELECT * INTO v_row
  FROM public.booking_requests
  WHERE lower(reference_code) = lower(trim(p_reference_code))
    AND lower(guest_email) = lower(trim(p_email))
  LIMIT 1;

  IF NOT FOUND THEN
    RETURN NULL;
  END IF;

  RETURN jsonb_build_object(
    'reference_code', v_row.reference_code,
    'room_type_name', v_row.room_type_name_snapshot,
    'check_in_date', v_row.check_in_date,
    'check_out_date', v_row.check_out_date,
    'rooms_requested', v_row.rooms_requested,
    'adults', v_row.adults,
    'children', v_row.children,
    'estimated_total', v_row.estimated_total,
    'currency', v_row.currency,
    'status', v_row.status,
    'external_reference', v_row.external_reference,
    'created_at', v_row.created_at
  );
END;
$$;

REVOKE ALL ON FUNCTION public.lookup_booking_status(text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.lookup_booking_status(text, text) TO anon, authenticated;

-- Clone a daily menu into another date as draft
CREATE OR REPLACE FUNCTION public.clone_daily_menu(
  p_source_date date,
  p_target_date date
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
DECLARE
  v_role text;
  v_source public.daily_menus%ROWTYPE;
  v_target_id uuid;
BEGIN
  v_role := private.get_staff_role();
  IF v_role NOT IN ('admin', 'manager', 'chef') THEN
    RAISE EXCEPTION 'Unauthorized: culinary staff role required.';
  END IF;

  SELECT * INTO v_source
  FROM public.daily_menus
  WHERE service_date = p_source_date;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'No menu found for source date %', p_source_date;
  END IF;

  INSERT INTO public.daily_menus (
    service_date,
    title_en,
    title_fr,
    chef_note_en,
    chef_note_fr,
    status,
    updated_by
  ) VALUES (
    p_target_date,
    v_source.title_en,
    v_source.title_fr,
    v_source.chef_note_en,
    v_source.chef_note_fr,
    'draft',
    (SELECT auth.uid())
  )
  ON CONFLICT (service_date) DO UPDATE SET
    title_en = EXCLUDED.title_en,
    title_fr = EXCLUDED.title_fr,
    chef_note_en = EXCLUDED.chef_note_en,
    chef_note_fr = EXCLUDED.chef_note_fr,
    updated_by = (SELECT auth.uid()),
    updated_at = now()
  RETURNING id INTO v_target_id;

  DELETE FROM public.daily_menu_entries WHERE daily_menu_id = v_target_id;

  INSERT INTO public.daily_menu_entries (
    daily_menu_id,
    menu_item_id,
    meal_period,
    display_order,
    daily_price_override,
    is_available,
    highlight_badge
  )
  SELECT
    v_target_id,
    e.menu_item_id,
    e.meal_period,
    e.display_order,
    e.daily_price_override,
    true,
    e.highlight_badge
  FROM public.daily_menu_entries e
  WHERE e.daily_menu_id = v_source.id;

  RETURN v_target_id;
END;
$$;

REVOKE ALL ON FUNCTION public.clone_daily_menu(date, date) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.clone_daily_menu(date, date) TO authenticated;

-- Enable Realtime notifications for staff booking inbox (idempotent)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime')
     AND NOT EXISTS (
       SELECT 1
       FROM pg_publication_tables
       WHERE pubname = 'supabase_realtime'
         AND schemaname = 'public'
         AND tablename = 'booking_requests'
     ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.booking_requests;
  END IF;
END $$;
