
CREATE POLICY "printer_images_auth_all" ON storage.objects FOR ALL TO authenticated
USING (bucket_id = 'printer-images') WITH CHECK (bucket_id = 'printer-images');
