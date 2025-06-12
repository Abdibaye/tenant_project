-- Drop existing tables if they exist
drop table if exists admin_users;
drop table if exists application_settings;

-- Create the admin_users table
create table admin_users (
  id uuid default uuid_generate_v4() primary key,
  username text unique not null,
  password text not null,
  user_id uuid references auth.users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create the application_settings table
create table application_settings (
  id uuid default uuid_generate_v4() primary key,
  tour_date_note text,
  zelle_email text,
  zelle_name text,
  cash_app_tag text,
  tour_date_description text,
  payment_instructions jsonb default '{
    "zelle": {
      "email": "",
      "name": ""
    },
    "cashApp": {
      "cashtag": ""
    },
    "applicationFee": 0,
    "refundAmount": 0
  }'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS on both tables
alter table admin_users enable row level security;
alter table application_settings enable row level security;

-- Admin Users Policies
create policy "Enable read access for all users"
  on admin_users for select
  using (true);

create policy "Enable insert for authenticated users only"
  on admin_users for insert
  with check (auth.role() = 'authenticated');

create policy "Enable update for users based on user_id"
  on admin_users for update
  using (auth.uid() = user_id);

-- Application Settings Policies
create policy "Enable read access for all users"
  on application_settings for select
  using (true);

create policy "Enable insert for authenticated users only"
  on application_settings for insert
  with check (auth.role() = 'authenticated');

create policy "Enable update for authenticated users only"
  on application_settings for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Create updated_at trigger function
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create triggers for both tables
create trigger update_admin_users_updated_at
  before update on admin_users
  for each row
  execute function update_updated_at_column();

create trigger update_application_settings_updated_at
  before update on application_settings
  for each row
  execute function update_updated_at_column();

-- Insert default admin user if not exists
insert into admin_users (username, password, user_id)
select 'admin', 'admin123', null
where not exists (
  select 1 from admin_users where username = 'admin'
); 