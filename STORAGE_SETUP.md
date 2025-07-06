# Supabase Storage Setup for Image Uploads

This guide explains how to set up Supabase Storage to enable image uploads in your admin panel.

## Method 1: Using Supabase Dashboard (Recommended)

1. **Go to your Supabase project dashboard**
   - Navigate to https://supabase.com/dashboard
   - Select your project

2. **Create Storage Bucket**
   - Go to Storage → Buckets
   - Click "Create bucket"
   - Name: `uploads`
   - ✅ Public bucket (checked)
   - File size limit: `5 MB`
   - Allowed MIME types: `image/jpeg, image/png, image/gif, image/webp`

3. **Set up RLS Policies**
   - Go to Storage → Policies
   - Click "Create policy" for the uploads bucket
   - Create these policies:

   **Policy 1: Allow authenticated users to upload**
   - Policy name: `Allow authenticated users to upload images`
   - Allowed operation: `INSERT`
   - Target roles: `authenticated`
   - USING expression: `bucket_id = 'uploads'`

   **Policy 2: Allow public access to view**
   - Policy name: `Allow public access to view images`
   - Allowed operation: `SELECT`
   - Target roles: `public`
   - USING expression: `bucket_id = 'uploads'`

   **Policy 3: Allow users to delete their uploads**
   - Policy name: `Allow authenticated users to delete images`
   - Allowed operation: `DELETE`
   - Target roles: `authenticated`
   - USING expression: `bucket_id = 'uploads'`

## Method 2: Using SQL (Alternative)

If you prefer to use SQL, run the commands in `setup-storage.sql` in your Supabase SQL editor.

## Testing the Setup

1. **Login to your admin panel**
   - Go to your admin panel at `/admin`
   - Login with your credentials

2. **Test image upload**
   - Create a new event or blog post
   - Try uploading an image using the image upload component
   - The image should upload successfully and display a preview

3. **Verify storage**
   - Go to Storage → uploads in your Supabase dashboard
   - You should see the uploaded images

## Features

- **Drag & Drop**: Drag images directly onto the upload area
- **File Selection**: Click to browse and select files
- **Image Preview**: See uploaded images immediately
- **URL Fallback**: Can still manually enter image URLs
- **File Validation**: Only accepts image files under 5MB
- **Organized Storage**: Separate folders for events and blog images

## Troubleshooting

**Upload fails with "Failed to upload image"**
- Check that the storage bucket exists and is named `uploads`
- Verify RLS policies are set up correctly
- Ensure the user is authenticated

**Images don't display**
- Check that the bucket is set to public
- Verify the "Allow public access to view images" policy exists

**File size errors**
- Default limit is 5MB, adjust in bucket settings if needed
- Large images will be rejected with an error message

## Security Notes

- Only authenticated users can upload images
- File size is limited to 5MB
- Only image MIME types are allowed
- All uploaded images are publicly accessible (suitable for web display)
- Users can only delete their own uploads 