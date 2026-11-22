-- New Waves Resort - Interactive Menu Orders & Live Online Kitchen Ticket Schema
-- Migration: 0005_menu_orders.sql

-- ============================================================================
-- 1. TABLES
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.menu_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_code text NOT NULL UNIQUE,
  view_token text NOT NULL,
  daily_menu_id uuid REFERENCES public.daily_menus(id) ON DELETE SET NULL,
  service_date date NOT NULL DEFAULT ((now() AT TIME ZONE 'Africa/Douala')::date),
  fulfillment_type text NOT NULL DEFAULT 'dine_in'
    CHECK (fulfillment_type IN ('dine_in', 'room_service', 'takeaway')),
  location_label text,
  preferred_time text,
  guests_count integer NOT NULL DEFAULT 1
    CHECK (guests_count >= 1 AND guests_count <= 40),
  guest_name text NOT NULL,
  guest_phone text NOT NULL,
  guest_email text,
  special_instructions text,
  internal_notes text,
  total_xaf numeric(12, 2) NOT NULL DEFAULT 0
    CHECK (total_xaf >= 0),
  currency_code text NOT NULL DEFAULT 'XAF',
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled')),
  source text NOT NULL DEFAULT 'website',
  confirmed_at timestamptz,
  ready_at timestamptz,
  completed_at timestamptz,
  cancelled_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.menu_order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_order_id uuid NOT NULL REFERENCES public.menu_orders(id) ON DELETE CASCADE,
  menu_item_id uuid REFERENCES public.menu_items(id) ON DELETE SET NULL,
  daily_menu_entry_id uuid REFERENCES public.daily_menu_entries(id) ON DELETE SET NULL,
  slug_snapshot text,
  name_en_snapshot text NOT NULL,
  name_fr_snapshot text,
  category_snapshot text,
  meal_period_snapshot text,
  prep_station_snapshot text,
  image_url_snapshot text,
  dietary_tags_snapshot text[] NOT NULL DEFAULT '{}'::text[],
  allergens_snapshot text[] NOT NULL DEFAULT '{}'::text[],
  unit_price_xaf numeric(12, 2) NOT NULL CHECK (unit_price_xaf >= 0),
  quantity integer NOT NULL CHECK (quantity >= 1 AND quantity <= 50),
  line_total_xaf numeric(12, 2) NOT NULL CHECK (line_total_xaf >= 0),
  item_notes text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================================================
-- 2. INDEXES & TRIGGERS
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_menu_orders_status_created
  ON public.menu_orders(status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_menu_orders_service_date
  ON public.menu_orders(service_date DESC, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_menu_orders_daily_menu_id
  ON public.menu_orders(daily_menu_id);

CREATE INDEX IF NOT EXISTS idx_menu_order_items_order_id
  ON public.menu_order_items(menu_order_id, sort_order ASC, created_at ASC);

CREATE INDEX IF NOT EXISTS idx_menu_order_items_menu_item_id
  ON public.menu_order_items(menu_item_id);

CREATE INDEX IF NOT EXISTS idx_menu_order_items_entry_id
  ON public.menu_order_items(daily_menu_entry_id);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_trigger
    WHERE tgname = 'trg_menu_orders_updated_at'
      AND tgrelid = 'public.menu_orders'::regclass
  ) THEN
    CREATE TRIGGER trg_menu_orders_updated_at
      BEFORE UPDATE ON public.menu_orders
      FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
  END IF;
END $$;

-- ============================================================================
-- 3. REALTIME PUBLICATION & OPTIONAL SETTINGS SEED
-- ============================================================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'menu_orders'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.menu_orders;
  END IF;
END $$;

INSERT INTO public.site_settings (key, value, is_public)
VALUES ('kitchen_whatsapp_number', '""'::jsonb, true)
ON CONFLICT (key) DO NOTHING;

-- ============================================================================
-- 4. ROW LEVEL SECURITY & GRANTS
-- ============================================================================
ALTER TABLE public.menu_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_order_items ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.menu_orders FROM anon, authenticated;
REVOKE ALL ON TABLE public.menu_order_items FROM anon, authenticated;

GRANT SELECT, UPDATE ON TABLE public.menu_orders TO authenticated;
GRANT SELECT ON TABLE public.menu_order_items TO authenticated;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'menu_orders' AND policyname = 'Staff can read menu orders'
  ) THEN
    CREATE POLICY "Staff can read menu orders"
      ON public.menu_orders FOR SELECT
      TO authenticated
      USING (private.get_staff_role() IN ('admin', 'manager', 'chef', 'front_desk'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'menu_orders' AND policyname = 'Staff can update menu orders'
  ) THEN
    CREATE POLICY "Staff can update menu orders"
      ON public.menu_orders FOR UPDATE
      TO authenticated
      USING (private.get_staff_role() IN ('admin', 'manager', 'chef', 'front_desk'))
      WITH CHECK (private.get_staff_role() IN ('admin', 'manager', 'chef', 'front_desk'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'menu_order_items' AND policyname = 'Staff can read menu order items'
  ) THEN
    CREATE POLICY "Staff can read menu order items"
      ON public.menu_order_items FOR SELECT
      TO authenticated
      USING (private.get_staff_role() IN ('admin', 'manager', 'chef', 'front_desk'));
  END IF;
END $$;

-- ============================================================================
-- 5. PUBLIC & GUEST RPCs
-- ============================================================================
CREATE OR REPLACE FUNCTION public.create_menu_order(
  p_daily_menu_id uuid DEFAULT NULL,
  p_fulfillment_type text DEFAULT 'dine_in',
  p_location_label text DEFAULT NULL,
  p_preferred_time text DEFAULT NULL,
  p_guests_count integer DEFAULT 1,
  p_guest_name text DEFAULT '',
  p_guest_phone text DEFAULT '',
  p_guest_email text DEFAULT NULL,
  p_special_instructions text DEFAULT NULL,
  p_items jsonb DEFAULT '[]'::jsonb
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, private, pg_temp
AS $$
DECLARE
  v_fulfillment text;
  v_guest_name text;
  v_guest_phone text;
  v_guest_email text;
  v_location text;
  v_preferred_time text;
  v_instructions text;
  v_guests_count integer;
  v_daily_menu_id uuid := NULL;
  v_service_date date;
  v_order_id uuid;
  v_ref text;
  v_view_token text;
  v_total_xaf numeric(12, 2) := 0;
  v_created_at timestamptz;
  v_elem record;
  v_item_id_text text;
  v_entry_id_text text;
  v_menu_item_id uuid;
  v_entry_id uuid;
  v_qty integer;
  v_item_notes text;
  v_req_period text;
  v_dish public.menu_items%ROWTYPE;
  v_dish_prep_station text;
  v_resolved_entry_id uuid;
  v_entry_meal_period text;
  v_entry_price_override numeric(12, 2);
  v_entry_available boolean;
  v_unit_price numeric(12, 2);
  v_line_total numeric(12, 2);
  v_attempt integer := 0;
  v_items_json jsonb := '[]'::jsonb;
BEGIN
  v_fulfillment := lower(coalesce(nullif(trim(p_fulfillment_type), ''), 'dine_in'));
  IF v_fulfillment NOT IN ('dine_in', 'room_service', 'takeaway') THEN
    RAISE EXCEPTION 'Invalid fulfillment type: %', p_fulfillment_type;
  END IF;

  v_guest_name := left(nullif(trim(p_guest_name), ''), 120);
  v_guest_phone := left(nullif(trim(p_guest_phone), ''), 40);
  v_guest_email := left(nullif(trim(p_guest_email), ''), 160);
  v_location := left(nullif(trim(p_location_label), ''), 120);
  v_preferred_time := left(nullif(trim(p_preferred_time), ''), 60);
  v_instructions := left(nullif(trim(p_special_instructions), ''), 800);
  v_guests_count := greatest(1, least(coalesce(p_guests_count, 1), 40));

  IF v_guest_name IS NULL THEN
    RAISE EXCEPTION 'Guest name is required';
  END IF;

  IF v_guest_phone IS NULL THEN
    RAISE EXCEPTION 'Guest phone or WhatsApp number is required';
  END IF;

  IF p_items IS NULL OR jsonb_typeof(p_items) <> 'array' OR jsonb_array_length(p_items) = 0 THEN
    RAISE EXCEPTION 'Please select at least one dish to place an order';
  END IF;

  v_service_date := (now() AT TIME ZONE 'Africa/Douala')::date;

  IF p_daily_menu_id IS NOT NULL THEN
    SELECT id, service_date INTO v_daily_menu_id, v_service_date
    FROM public.daily_menus
    WHERE id = p_daily_menu_id;

    IF v_daily_menu_id IS NULL THEN
      v_service_date := (now() AT TIME ZONE 'Africa/Douala')::date;
    END IF;
  END IF;

  v_view_token := replace(gen_random_uuid()::text, '-', '');

  LOOP
    v_attempt := v_attempt + 1;
    v_ref := 'ORD-' || to_char(now() AT TIME ZONE 'Africa/Douala', 'YYYYMMDD') || '-' ||
             upper(substring(replace(gen_random_uuid()::text, '-', '') from 1 for 4));

    BEGIN
      INSERT INTO public.menu_orders (
        reference_code,
        view_token,
        daily_menu_id,
        service_date,
        fulfillment_type,
        location_label,
        preferred_time,
        guests_count,
        guest_name,
        guest_phone,
        guest_email,
        special_instructions,
        total_xaf,
        currency_code,
        status,
        source
      ) VALUES (
        v_ref,
        v_view_token,
        v_daily_menu_id,
        v_service_date,
        v_fulfillment,
        v_location,
        v_preferred_time,
        v_guests_count,
        v_guest_name,
        v_guest_phone,
        v_guest_email,
        v_instructions,
        0,
        'XAF',
        'pending',
        'website'
      )
      RETURNING id, created_at INTO v_order_id, v_created_at;

      EXIT;
    EXCEPTION
      WHEN unique_violation THEN
        IF v_attempt >= 5 THEN
          RAISE;
        END IF;
    END;
  END LOOP;

  FOR v_elem IN
    SELECT item, idx
    FROM jsonb_array_elements(p_items) WITH ORDINALITY AS t(item, idx)
  LOOP
    v_item_id_text := nullif(trim(v_elem.item->>'menu_item_id'), '');
    v_entry_id_text := nullif(trim(v_elem.item->>'daily_menu_entry_id'), '');

    IF v_item_id_text IS NULL OR v_item_id_text !~ '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$' THEN
      RAISE EXCEPTION 'Invalid dish reference';
    END IF;
    v_menu_item_id := v_item_id_text::uuid;

    IF v_entry_id_text IS NOT NULL AND v_entry_id_text ~ '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$' THEN
      v_entry_id := v_entry_id_text::uuid;
    ELSE
      v_entry_id := NULL;
    END IF;

    BEGIN
      v_qty := (v_elem.item->>'quantity')::integer;
    EXCEPTION
      WHEN OTHERS THEN
        v_qty := 0;
    END;

    IF v_qty IS NULL OR v_qty < 1 OR v_qty > 50 THEN
      RAISE EXCEPTION 'Dish quantity must be between 1 and 50';
    END IF;

    v_item_notes := left(nullif(trim(v_elem.item->>'notes'), ''), 300);
    v_req_period := left(nullif(trim(v_elem.item->>'meal_period'), ''), 40);

    v_dish := NULL;
    v_dish_prep_station := NULL;
    v_resolved_entry_id := NULL;
    v_entry_meal_period := NULL;
    v_entry_price_override := NULL;
    v_entry_available := NULL;

    SELECT *
    INTO v_dish
    FROM public.menu_items
    WHERE id = v_menu_item_id
      AND is_active = true;

    IF v_dish.id IS NULL THEN
      RAISE EXCEPTION 'One of the selected dishes is unavailable';
    END IF;

    SELECT meta.prep_station
    INTO v_dish_prep_station
    FROM public.menu_item_internal_meta meta
    WHERE meta.menu_item_id = v_dish.id;

    IF v_entry_id IS NOT NULL THEN
      SELECT id, meal_period, daily_price_override, is_available
      INTO v_resolved_entry_id, v_entry_meal_period, v_entry_price_override, v_entry_available
      FROM public.daily_menu_entries
      WHERE id = v_entry_id
        AND menu_item_id = v_menu_item_id;
    ELSIF v_daily_menu_id IS NOT NULL THEN
      SELECT id, meal_period, daily_price_override, is_available
      INTO v_resolved_entry_id, v_entry_meal_period, v_entry_price_override, v_entry_available
      FROM public.daily_menu_entries
      WHERE daily_menu_id = v_daily_menu_id
        AND menu_item_id = v_menu_item_id
      ORDER BY display_order ASC
      LIMIT 1;
    END IF;

    IF v_resolved_entry_id IS NOT NULL AND v_entry_available = false THEN
      RAISE EXCEPTION 'Selected dish (%) is currently sold out', v_dish.name_en;
    END IF;

    v_unit_price := round(coalesce(v_entry_price_override, v_dish.price_xaf, 0), 2);
    v_line_total := round(v_unit_price * v_qty, 2);

    INSERT INTO public.menu_order_items (
      menu_order_id,
      menu_item_id,
      daily_menu_entry_id,
      slug_snapshot,
      name_en_snapshot,
      name_fr_snapshot,
      category_snapshot,
      meal_period_snapshot,
      prep_station_snapshot,
      image_url_snapshot,
      dietary_tags_snapshot,
      allergens_snapshot,
      unit_price_xaf,
      quantity,
      line_total_xaf,
      item_notes,
      sort_order
    ) VALUES (
      v_order_id,
      v_dish.id,
      v_resolved_entry_id,
      v_dish.slug,
      v_dish.name_en,
      v_dish.name_fr,
      v_dish.category,
      coalesce(v_entry_meal_period, v_req_period),
      v_dish_prep_station,
      v_dish.image_url,
      coalesce(v_dish.dietary_tags, '{}'::text[]),
      coalesce(v_dish.allergens, '{}'::text[]),
      v_unit_price,
      v_qty,
      v_line_total,
      v_item_notes,
      (v_elem.idx - 1)::integer
    );

    v_total_xaf := v_total_xaf + v_line_total;
    v_items_json := v_items_json || jsonb_build_array(jsonb_build_object(
      'menu_item_id', v_dish.id,
      'daily_menu_entry_id', v_resolved_entry_id,
      'slug', v_dish.slug,
      'name_en', v_dish.name_en,
      'name_fr', v_dish.name_fr,
      'category', v_dish.category,
      'meal_period', coalesce(v_entry_meal_period, v_req_period),
      'image_url', v_dish.image_url,
      'dietary_tags', coalesce(v_dish.dietary_tags, '{}'::text[]),
      'allergens', coalesce(v_dish.allergens, '{}'::text[]),
      'unit_price_xaf', v_unit_price,
      'quantity', v_qty,
      'line_total_xaf', v_line_total,
      'item_notes', v_item_notes
    ));
  END LOOP;

  UPDATE public.menu_orders
  SET total_xaf = round(v_total_xaf, 2)
  WHERE id = v_order_id;

  RETURN jsonb_build_object(
    'id', v_order_id,
    'reference_code', v_ref,
    'view_token', v_view_token,
    'daily_menu_id', v_daily_menu_id,
    'service_date', v_service_date,
    'fulfillment_type', v_fulfillment,
    'location_label', v_location,
    'preferred_time', v_preferred_time,
    'guests_count', v_guests_count,
    'guest_name', v_guest_name,
    'guest_phone', v_guest_phone,
    'guest_email', v_guest_email,
    'special_instructions', v_instructions,
    'total_xaf', round(v_total_xaf, 2),
    'currency_code', 'XAF',
    'status', 'pending',
    'created_at', v_created_at,
    'items', v_items_json
  );
END;
$$;

REVOKE ALL ON FUNCTION public.create_menu_order(uuid, text, text, text, integer, text, text, text, text, jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.create_menu_order(uuid, text, text, text, integer, text, text, text, text, jsonb) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.get_menu_order_by_token(
  p_reference_code text,
  p_token text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public, private, pg_temp
AS $$
DECLARE
  v_is_staff boolean := false;
  v_clean_ref text;
  v_clean_token text;
  v_order public.menu_orders%ROWTYPE;
  v_items jsonb;
BEGIN
  v_clean_ref := upper(nullif(trim(p_reference_code), ''));
  v_clean_token := nullif(trim(p_token), '');

  IF v_clean_ref IS NULL THEN
    RETURN NULL;
  END IF;

  v_is_staff := coalesce(private.get_staff_role() IN ('admin', 'manager', 'chef', 'front_desk'), false);

  SELECT *
  INTO v_order
  FROM public.menu_orders
  WHERE upper(reference_code) = v_clean_ref
    AND (
      v_is_staff
      OR (v_clean_token IS NOT NULL AND view_token = v_clean_token)
    )
  LIMIT 1;

  IF v_order.id IS NULL THEN
    RETURN NULL;
  END IF;

  SELECT coalesce(
    jsonb_agg(
      jsonb_build_object(
        'id', i.id,
        'menu_item_id', i.menu_item_id,
        'daily_menu_entry_id', i.daily_menu_entry_id,
        'slug', i.slug_snapshot,
        'name_en', i.name_en_snapshot,
        'name_fr', i.name_fr_snapshot,
        'category', i.category_snapshot,
        'meal_period', i.meal_period_snapshot,
        'prep_station', CASE WHEN v_is_staff THEN i.prep_station_snapshot ELSE NULL END,
        'image_url', i.image_url_snapshot,
        'dietary_tags', coalesce(i.dietary_tags_snapshot, '{}'::text[]),
        'allergens', coalesce(i.allergens_snapshot, '{}'::text[]),
        'unit_price_xaf', i.unit_price_xaf,
        'quantity', i.quantity,
        'line_total_xaf', i.line_total_xaf,
        'item_notes', i.item_notes,
        'sort_order', i.sort_order
      )
      ORDER BY i.sort_order ASC, i.created_at ASC
    ),
    '[]'::jsonb
  )
  INTO v_items
  FROM public.menu_order_items i
  WHERE i.menu_order_id = v_order.id;

  RETURN jsonb_build_object(
    'id', v_order.id,
    'reference_code', v_order.reference_code,
    'view_token', CASE WHEN v_is_staff OR v_clean_token IS NOT NULL THEN v_order.view_token ELSE NULL END,
    'daily_menu_id', v_order.daily_menu_id,
    'service_date', v_order.service_date,
    'fulfillment_type', v_order.fulfillment_type,
    'location_label', v_order.location_label,
    'preferred_time', v_order.preferred_time,
    'guests_count', v_order.guests_count,
    'guest_name', v_order.guest_name,
    'guest_phone', v_order.guest_phone,
    'guest_email', v_order.guest_email,
    'special_instructions', v_order.special_instructions,
    'internal_notes', CASE WHEN v_is_staff THEN v_order.internal_notes ELSE NULL END,
    'total_xaf', v_order.total_xaf,
    'currency_code', v_order.currency_code,
    'status', v_order.status,
    'source', v_order.source,
    'confirmed_at', v_order.confirmed_at,
    'ready_at', v_order.ready_at,
    'completed_at', v_order.completed_at,
    'cancelled_at', v_order.cancelled_at,
    'created_at', v_order.created_at,
    'updated_at', v_order.updated_at,
    'items', v_items
  );
END;
$$;

REVOKE ALL ON FUNCTION public.get_menu_order_by_token(text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_menu_order_by_token(text, text) TO anon, authenticated;
