create extension if not exists pgcrypto;

create table if not exists public.career_employers (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  industry text,
  type text not null check (type in ('greenhouse', 'lever', 'ashby', 'smartrecruiters', 'workday')),
  identifier text not null,
  enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (type, identifier)
);

-- Run this block if the table was created before Workday support was added.
do $$
begin
  alter table public.career_employers drop constraint if exists career_employers_type_check;
  alter table public.career_employers add constraint career_employers_type_check
    check (type in ('greenhouse', 'lever', 'ashby', 'smartrecruiters', 'workday'));
exception when duplicate_object then null;
end $$;

alter table public.career_employers enable row level security;

-- No public policies are intentionally created.
-- The application accesses this table only with the server-side Supabase service-role key.
create index if not exists career_employers_enabled_idx on public.career_employers (enabled);
create index if not exists career_employers_industry_idx on public.career_employers (industry);
