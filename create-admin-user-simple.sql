
SELECT auth.signup(
  'YOUR_EMAIL@example.com',
  'YOUR_PASSWORD',
  '{"full_name": "Admin User"}'::jsonb
);



-- Verify the user was created
SELECT id, email, created_at, email_confirmed_at 
FROM auth.users 
WHERE email = 'YOUR_EMAIL@example.com';

