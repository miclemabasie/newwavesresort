-- Fix public SELECT RLS policies so anon never evaluates private.get_staff_role()
-- (Staff read/manage access to unpublished/draft/non-public rows is already granted by *_manage_* policies.)

ALTER POLICY "public_read_site_settings" ON public.site_settings
  USING (is_public = true);

ALTER POLICY "public_read_published_room_types" ON public.room_types
  USING (is_published = true);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'room_types'
      AND policyname = 'front_desk_read_all_room_types'
  ) THEN
    CREATE POLICY "front_desk_read_all_room_types" ON public.room_types
      FOR SELECT TO authenticated
      USING ((SELECT private.get_staff_role()) IN ('admin', 'manager', 'front_desk'));
  END IF;
END
$$;

ALTER POLICY "public_read_active_menu_items" ON public.menu_items
  USING (is_active = true);

ALTER POLICY "public_read_published_daily_menus" ON public.daily_menus
  USING (status = 'published');

ALTER POLICY "public_read_published_daily_menu_entries" ON public.daily_menu_entries
  USING (
    EXISTS (
      SELECT 1 FROM public.daily_menus dm
      WHERE dm.id = daily_menu_id AND dm.status = 'published'
    )
  );

ALTER POLICY "public_read_published_gallery_media" ON public.gallery_media
  USING (is_published = true);
