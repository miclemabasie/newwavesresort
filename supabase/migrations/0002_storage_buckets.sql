-- Storage buckets & RLS policies for New Waves Resort
-- Upserts require SELECT + INSERT + UPDATE permissions.

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('resort-units', 'resort-units', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('resort-menu', 'resort-menu', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('resort-gallery', 'resort-gallery', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Public read access for all three public media buckets
CREATE POLICY "public_read_resort_media"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id IN ('resort-units', 'resort-menu', 'resort-gallery'));

-- resort-units: admin & manager full CRUD
CREATE POLICY "manager_insert_resort_units"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'resort-units'
    AND private.get_staff_role() IN ('admin', 'manager')
  );

CREATE POLICY "manager_update_resort_units"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'resort-units'
    AND private.get_staff_role() IN ('admin', 'manager')
  )
  WITH CHECK (
    bucket_id = 'resort-units'
    AND private.get_staff_role() IN ('admin', 'manager')
  );

CREATE POLICY "manager_delete_resort_units"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'resort-units'
    AND private.get_staff_role() IN ('admin', 'manager')
  );

-- resort-menu: chef, manager, admin full CRUD
CREATE POLICY "culinary_insert_resort_menu"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'resort-menu'
    AND private.get_staff_role() IN ('admin', 'manager', 'chef')
  );

CREATE POLICY "culinary_update_resort_menu"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'resort-menu'
    AND private.get_staff_role() IN ('admin', 'manager', 'chef')
  )
  WITH CHECK (
    bucket_id = 'resort-menu'
    AND private.get_staff_role() IN ('admin', 'manager', 'chef')
  );

CREATE POLICY "culinary_delete_resort_menu"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'resort-menu'
    AND private.get_staff_role() IN ('admin', 'manager', 'chef')
  );

-- resort-gallery: admin & manager full CRUD
CREATE POLICY "manager_insert_resort_gallery"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'resort-gallery'
    AND private.get_staff_role() IN ('admin', 'manager')
  );

CREATE POLICY "manager_update_resort_gallery"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'resort-gallery'
    AND private.get_staff_role() IN ('admin', 'manager')
  )
  WITH CHECK (
    bucket_id = 'resort-gallery'
    AND private.get_staff_role() IN ('admin', 'manager')
  );

CREATE POLICY "manager_delete_resort_gallery"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'resort-gallery'
    AND private.get_staff_role() IN ('admin', 'manager')
  );
