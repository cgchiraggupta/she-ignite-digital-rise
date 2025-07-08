-- Run this SQL in your Supabase SQL Editor to create the admin user
-- This will create a user with email: [YOUR_ADMIN_EMAIL] and password: [YOUR_SECURE_PASSWORD]

-- First, enable the auth extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- First, let's create the user in the auth.users table
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  invited_at,
  confirmation_token,
  confirmation_sent_at,
  recovery_token,
  recovery_sent_at,
  email_change_token_new,
  email_change,
  email_change_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  created_at,
  updated_at,
  phone,
  phone_confirmed_at,
  phone_change,
  phone_change_token,
  phone_change_sent_at,
  email_change_token_current,
  email_change_confirm_status,
  banned_until,
  reauthentication_token,
  reauthentication_sent_at,
  is_sso_user,
  deleted_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  '[YOUR_ADMIN_EMAIL]',
  crypt('[YOUR_SECURE_PASSWORD]', gen_salt('bf')),
  now(),
  NULL,
  '',
  NULL,
  '',
  NULL,
  '',
  '',
  NULL,
  NULL,
  '{"provider":"email","providers":["email"]}',
  '{}',
  NULL,
  now(),
  now(),
  NULL,
  NULL,
  '',
  '',
  NULL,
  '',
  0,
  NULL,
  '',
  NULL,
  false,
  NULL
);

-- Then, let's create the identity record
INSERT INTO auth.identities (
  provider_id,
  user_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at,
  email
) VALUES (
  '[YOUR_ADMIN_EMAIL]',
  (SELECT id FROM auth.users WHERE email = '[YOUR_ADMIN_EMAIL]'),
  '{"sub":"' || (SELECT id FROM auth.users WHERE email = '[YOUR_ADMIN_EMAIL]') || '","email":"[YOUR_ADMIN_EMAIL]","email_verified":true,"phone_verified":false}',
  'email',
  now(),
  now(),
  now(),
  '[YOUR_ADMIN_EMAIL]'
);

-- Verify the user was created
SELECT id, email, created_at, email_confirmed_at FROM auth.users WHERE email = '[YOUR_ADMIN_EMAIL]';

-- Login credentials:
-- Email: [YOUR_ADMIN_EMAIL]
-- Password: [YOUR_SECURE_PASSWORD]

-- Note: After running this script, you should be able to login with:
-- Email: [YOUR_ADMIN_EMAIL]
-- Password: [YOUR_SECURE_PASSWORD] 