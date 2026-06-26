create extension if not exists pgcrypto;

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  destination text,
  travelers integer not null default 2,
  travel_from date,
  travel_to date,
  notes text,
  created_at timestamptz not null default now(),

  constraint bookings_full_name_len check (char_length(full_name) between 2 and 120),
  constraint bookings_email_len check (char_length(email) between 3 and 255),
  constraint bookings_phone_len check (char_length(phone) between 5 and 30),
  constraint bookings_destination_len check (destination is null or char_length(destination) <= 120),
  constraint bookings_travelers_range check (travelers between 1 and 50),
  constraint bookings_notes_len check (notes is null or char_length(notes) <= 2000),
  constraint bookings_date_order check (
    travel_from is null or travel_to is null or travel_to >= travel_from
  )
);

create index if not exists bookings_created_at_idx
  on public.bookings (created_at desc);

alter table public.bookings enable row level security;

grant usage on schema public to anon, authenticated, service_role;
grant insert on table public.bookings to anon, authenticated;
grant all on table public.bookings to service_role;

drop policy if exists "Anyone can submit a booking inquiry" on public.bookings;

create policy "Anyone can submit a booking inquiry"
  on public.bookings
  for insert
  to anon, authenticated
  with check (
    char_length(full_name) between 2 and 120
    and char_length(email) between 3 and 255
    and char_length(phone) between 5 and 30
    and (destination is null or char_length(destination) <= 120)
    and travelers between 1 and 50
    and (notes is null or char_length(notes) <= 2000)
    and (travel_from is null or travel_to is null or travel_to >= travel_from)
  );
