-- =================================================================================================== Avatars
create policy "User uploads are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'user_uploads' );

CREATE POLICY "Give users access to upload avatars" ON storage.objects FOR INSERT TO public WITH CHECK (
	bucket_id = 'user_uploads' 
	AND auth.uid()::text = (storage.foldername(name))[1]
);
CREATE POLICY "Users can update their own uploads" ON storage.objects FOR UPDATE TO public USING (
	bucket_id = 'user_uploads' 
	AND auth.uid()::text = (storage.foldername(name))[1]
);

-- =================================================================================================== Public
create policy "Public bucket is publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'public' );

CREATE POLICY "Give authenticated users access to public bucket3" ON storage.objects FOR INSERT TO public WITH CHECK (
  	bucket_id = 'public'
	AND auth.role() = 'authenticated'
);
CREATE POLICY "Give users access to update their uuploads" ON storage.objects FOR UPDATE TO public USING (
	bucket_id = 'public' 
	AND auth.role() = 'authenticated'
);
