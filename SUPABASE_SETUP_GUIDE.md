# Supabase Authentication Setup Guide

## 🔧 Step-by-Step Setup

### 1. **Enable Email Authentication**
1. Go to your Supabase Dashboard: https://supabase.com
2. Open your project: `[YOUR_PROJECT_ID]`
3. Navigate to **Authentication** → **Settings**
4. Under "Auth Providers", make sure **Email** is enabled
5. **Turn OFF** "Enable email confirmations" (for easier setup)
6. Click **Save**

### 2. **Create Admin User**
1. In your Supabase Dashboard, go to **Authentication** → **Users**
2. Click **"Add User"** button
3. Fill in the details:
   - **Email**: `[YOUR_ADMIN_EMAIL]`
   - **Password**: `[YOUR_SECURE_PASSWORD]`
   - **Auto Confirm User**: Toggle this **ON** (important!)
4. Click **"Create User"**

### 3. **Verify Settings**
1. Go to **Authentication** → **Settings**
2. Check these settings:
   - **Site URL**: Should be your domain (e.g., `https://yoursite.netlify.app`)
   - **Redirect URLs**: Add your domains:
     - `https://yoursite.netlify.app/**`
     - `https://your-project.vercel.app/**`
     - `http://localhost:5173/**` (for local development)

### 4. **Test Authentication**
1. Go to your site's `/admin` page
2. Try logging in with your admin credentials

## 🚨 Common Issues & Solutions

### "Invalid login credentials"
- **Cause**: User doesn't exist in Supabase
- **Solution**: Follow Step 2 above to create the user

### "Database error finding user"
- **Cause**: Authentication not properly configured
- **Solution**: Check Step 1 - ensure Email auth is enabled

### "Email not confirmed"
- **Cause**: Email confirmation is required
- **Solution**: In Step 2, make sure "Auto Confirm User" is ON

### Login works but redirects to wrong page
- **Cause**: Redirect URLs not configured
- **Solution**: Check Step 3 - add your domains to redirect URLs

## 📝 Alternative: SQL Method

If the dashboard method doesn't work, you can also create the user via SQL:

```sql
-- Run this in Supabase SQL Editor
INSERT INTO auth.users (
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  '[YOUR_ADMIN_EMAIL]',
  crypt('[YOUR_SECURE_PASSWORD]', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now()
);
```

## ✅ Security Notes

- Admin credentials are only stored in Supabase (encrypted)
- No credentials are exposed in your frontend code
- User sessions are managed securely by Supabase
- You can change the password anytime in the Supabase dashboard

### 🔒 About Supabase Credentials

**Public Credentials (Safe to expose):**
- Supabase URL and Anonymous Key in `supabaseClient.ts` are public-facing
- These only allow access according to your Row Level Security (RLS) policies
- They're designed to be used in frontend applications

**Private Credentials (Keep secure):**
- Admin email and password
- Service role keys (if used)
- Database connection strings

## 🔗 Useful Links

- **Your Supabase Dashboard**: https://supabase.com/dashboard/project/[YOUR_PROJECT_ID]
- **Authentication Settings**: https://supabase.com/dashboard/project/[YOUR_PROJECT_ID]/auth/settings
- **User Management**: https://supabase.com/dashboard/project/[YOUR_PROJECT_ID]/auth/users 