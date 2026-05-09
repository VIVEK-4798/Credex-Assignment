create extension if not exists pgcrypto;

create table if not exists public.audits (
  id uuid primary key default gen_random_uuid(),
  public_id text not null unique,
  results_json jsonb not null,
  total_monthly_savings numeric not null default 0,
  total_annual_savings numeric not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  audit_id uuid references public.audits(id) on delete set null,
  email text not null,
  company text,
  role text,
  team_size integer,
  created_at timestamptz not null default now()
);

create index if not exists audits_public_id_idx on public.audits(public_id);
create index if not exists leads_audit_id_idx on public.leads(audit_id);
