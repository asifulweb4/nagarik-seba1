-- ==========================================
-- SUPABASE PHONE LOGIN SETUP SCRIPT
-- ==========================================
-- Please run this SQL in your Supabase SQL Editor:
-- Go to https://supabase.com/dashboard/project/caywpqndemoaicjgtbma/sql/new

-- Create a secure function that allows the frontend to look up an email address using a phone number.
-- We use 'security definer' so it can read from the auth.users table even if the user isn't logged in.
create or replace function get_email_by_phone(p_phone text)
returns text
language plpgsql
security definer
as $$
declare
  v_email text;
begin
  select email into v_email
  from auth.users
  where raw_user_meta_data->>'phone' = p_phone
  limit 1;
  
  return v_email;
end;
$$;
