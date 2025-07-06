-- Create storage bucket for uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'uploads',
  'uploads',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
);

-- Set up RLS policies for the uploads bucket
CREATE POLICY "Allow authenticated users to upload images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'uploads');

CREATE POLICY "Allow public access to view images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'uploads');

CREATE POLICY "Allow authenticated users to delete their own images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'uploads');

-- Note: You can also create these policies through the Supabase Dashboard:
-- 1. Go to Storage -> Settings -> Policies
-- 2. Create the bucket named 'uploads' with public access
-- 3. Set file size limit to 5MB
-- 4. Add allowed MIME types: image/jpeg, image/png, image/gif, image/webp 