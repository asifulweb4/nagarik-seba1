-- ==========================================
-- SUPABASE DATABASE SETUP SCRIPT
-- ==========================================
-- Please run this SQL in your Supabase SQL Editor:
-- Go to https://supabase.com/dashboard/project/caywpqndemoaicjgtbma/sql/new

-- 1. Create custom users table
create table public.users (
  id uuid references auth.users on delete cascade not null primary key,
  name text,
  phone text,
  balance numeric default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security (RLS) for users
alter table public.users enable row level security;

-- 3. Users can only view and update their own profiles
create policy "Users can view own profile" on users for select using ( auth.uid() = id );
create policy "Users can update own profile" on users for update using ( auth.uid() = id );

-- 4. Create function to automatically insert profile when a new user signs up
create function public.handle_new_user()
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
    new.raw_user_meta_data->>'balance'::numeric -- If passed during signup, though default is 0
  );
  return new;
end;
$$;

-- 5. Create Trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 6. Create Orders Table
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  service_name text not null,
  service_price numeric not null,
  details text not null,
  status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. Enable Row Level Security (RLS) for orders
alter table public.orders enable row level security;

-- 8. Users can only see and insert their own orders
create policy "Users can view own orders" on orders for select using ( auth.uid() = user_id );
create policy "Users can insert own orders" on orders for insert with check ( auth.uid() = user_id );

-- IMPORTANT: As admin, you can see everyone's output in the Table Editor, no matter the RLS policies.
