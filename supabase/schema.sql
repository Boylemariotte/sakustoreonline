-- SAKU store — Supabase schema
-- Run this once in your project's SQL editor (https://app.supabase.com -> SQL Editor -> New query).
-- Safe to re-run: every statement is idempotent (create-if-not-exists / drop-then-create for policies).

-- ── products ──────────────────────────────────────────────────────────────
-- Mirrors the shape already used by src/data/products.js so the storefront
-- can eventually read from here instead of the hardcoded catalog.
create table if not exists products (
  id             text primary key,               -- e.g. 'w1', 'x2' (matches current catalog ids)
  group_name     text not null check (group_name in ('Mujer', 'Hombre', 'Niños', 'Exclusivos')),
  name           text not null,
  price          numeric(10,2) not null,          -- base unit, same convention as cop() in utils/format.js
  was            numeric(10,2),                   -- optional "before" price for discounts
  cat            text not null,                   -- subcategory label, e.g. "Mujer · Camisas"
  tag            text,                             -- small badge, e.g. "Nuevo", "Exclusivo"
  fabric         text,
  description    text,
  exclusive_until timestamptz,                    -- only set for Exclusivos items
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- ── product_images ───────────────────────────────────────────────────────
-- One row per uploaded photo. `storage_path` is the object path inside the
-- 'product-images' Storage bucket (created further down), not a full URL —
-- build the public URL client-side with supabase.storage.from(...).getPublicUrl().
create table if not exists product_images (
  id           uuid primary key default gen_random_uuid(),
  product_id   text not null references products(id) on delete cascade,
  storage_path text not null,
  position     int not null default 0,            -- gallery order, 0 = cover photo
  created_at   timestamptz not null default now()
);

create index if not exists product_images_product_id_idx on product_images(product_id);

-- keep updated_at current on edits
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_set_updated_at on products;
create trigger products_set_updated_at
  before update on products
  for each row execute function set_updated_at();

-- ── row-level security ───────────────────────────────────────────────────
-- The anon key ships in the client bundle, so it MUST NOT be able to write.
-- Public (anon) can only read. Writes require a signed-in Supabase Auth user
-- (i.e. the future admin login) — wire that up before building the upload UI.
alter table products enable row level security;
alter table product_images enable row level security;

drop policy if exists "public read products" on products;
create policy "public read products" on products
  for select using (true);

drop policy if exists "authenticated write products" on products;
create policy "authenticated write products" on products
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "public read product_images" on product_images;
create policy "public read product_images" on product_images
  for select using (true);

drop policy if exists "authenticated write product_images" on product_images;
create policy "authenticated write product_images" on product_images
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ── storage bucket for the actual image files ───────────────────────────
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "public read product-images bucket" on storage.objects;
create policy "public read product-images bucket" on storage.objects
  for select using (bucket_id = 'product-images');

drop policy if exists "authenticated upload product-images bucket" on storage.objects;
create policy "authenticated upload product-images bucket" on storage.objects
  for insert with check (bucket_id = 'product-images' and auth.role() = 'authenticated');

drop policy if exists "authenticated manage product-images bucket" on storage.objects;
create policy "authenticated manage product-images bucket" on storage.objects
  for update using (bucket_id = 'product-images' and auth.role() = 'authenticated');

drop policy if exists "authenticated delete product-images bucket" on storage.objects;
create policy "authenticated delete product-images bucket" on storage.objects
  for delete using (bucket_id = 'product-images' and auth.role() = 'authenticated');
