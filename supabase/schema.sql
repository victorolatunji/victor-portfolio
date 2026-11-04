-- Run this once in Supabase: Dashboard → SQL Editor → New query → paste → Run.
-- The site talks to these tables from the server only (service role key),
-- so RLS stays ON with no public policies: nobody can read/write them from the browser.

create table if not exists public.guestbook (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 40),
  message text not null check (char_length(message) between 3 and 240),
  hidden boolean not null default false, -- set true in the Table Editor to remove a note
  created_at timestamptz not null default now()
);

create table if not exists public.visits (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now()
);

create table if not exists public.piece_views (
  slug text primary key,
  views integer not null default 0
);

alter table public.guestbook enable row level security;
alter table public.visits enable row level security;
alter table public.piece_views enable row level security;

create index if not exists visits_created_at_idx on public.visits (created_at);
create index if not exists guestbook_created_at_idx on public.guestbook (created_at desc);

-- Atomic "+1 view" for a project.
create or replace function public.bump_piece_view(p_slug text)
returns void
language sql
security definer
set search_path = public
as $$
  insert into piece_views (slug, views) values (p_slug, 1)
  on conflict (slug) do update set views = piece_views.views + 1;
$$;

revoke all on function public.bump_piece_view(text) from public, anon, authenticated;
