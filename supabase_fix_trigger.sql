-- ==========================================
-- SUPABASE TRIGGER FIX SCRIPT
-- ==========================================
-- Please run this SQL in your Supabase SQL Editor:
-- Go to https://supabase.com/dashboard/project/caywpqndemoaicjgtbma/sql/new

-- There was a casting error in the previous trigger function. This will fix it!
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, name, phone, balance)
  values (
    new.id,
    new.raw_user_meta_data->>'name',
    new.raw_user_meta_data->>'phone',
    coalesce((new.raw_user_meta_data->>'balance')::numeric, 0)
  );
  return new;
end;
$$;
