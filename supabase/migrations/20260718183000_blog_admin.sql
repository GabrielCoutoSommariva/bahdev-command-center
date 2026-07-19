create extension if not exists pgcrypto;

create table if not exists public.blog_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  category text not null,
  tags text[] not null default '{}',
  author text not null default 'Equipe Bahdev',
  read_time text not null default '5 min de leitura',
  featured boolean not null default false,
  cover_key text,
  cover_url text,
  cover_alt text not null,
  seo_title text not null,
  seo_description text not null,
  content jsonb not null default '[]'::jsonb,
  status text not null default 'draft',
  published_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint blog_posts_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  constraint blog_posts_status_check check (status in ('draft', 'published')),
  constraint blog_posts_content_array check (jsonb_typeof(content) = 'array'),
  constraint blog_posts_cover_check check (cover_key is not null or cover_url is not null),
  constraint blog_posts_cover_key_check check (
    cover_key is null or cover_key in ('omnichannel', 'portal', 'treinamento', 'dashboards')
  )
);

create index if not exists blog_posts_status_published_at_idx
  on public.blog_posts (status, published_at desc);

create index if not exists blog_posts_category_idx
  on public.blog_posts (category);

create or replace function public.is_blog_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.blog_admins
    where user_id = auth.uid()
  );
$$;

revoke all on function public.is_blog_admin() from public;
grant execute on function public.is_blog_admin() to authenticated, service_role;

create or replace function public.has_blog_admin_access()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    public.is_blog_admin()
    and coalesce(auth.jwt()->>'aal', 'aal1') = 'aal2';
$$;

revoke all on function public.has_blog_admin_access() from public;
grant execute on function public.has_blog_admin_access() to authenticated, service_role;

create or replace function public.set_blog_post_audit_fields()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = now();

  if auth.uid() is not null then
    new.updated_by = auth.uid();

    if tg_op = 'INSERT' and new.created_by is null then
      new.created_by = auth.uid();
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists set_blog_post_audit_fields on public.blog_posts;
create trigger set_blog_post_audit_fields
before insert or update on public.blog_posts
for each row execute function public.set_blog_post_audit_fields();

alter table public.blog_admins enable row level security;
alter table public.blog_posts enable row level security;

drop policy if exists "blog_admins_view_own_access" on public.blog_admins;
create policy "blog_admins_view_own_access"
on public.blog_admins
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "published_blog_posts_are_public" on public.blog_posts;
create policy "published_blog_posts_are_public"
on public.blog_posts
for select
to anon, authenticated
using (
  status = 'published'
  and coalesce(published_at, created_at) <= now()
);

drop policy if exists "blog_admins_read_all_posts" on public.blog_posts;
create policy "blog_admins_read_all_posts"
on public.blog_posts
for select
to authenticated
using (public.has_blog_admin_access());

drop policy if exists "blog_admins_create_posts" on public.blog_posts;
create policy "blog_admins_create_posts"
on public.blog_posts
for insert
to authenticated
with check (public.has_blog_admin_access());

drop policy if exists "blog_admins_update_posts" on public.blog_posts;
create policy "blog_admins_update_posts"
on public.blog_posts
for update
to authenticated
using (public.has_blog_admin_access())
with check (public.has_blog_admin_access());

drop policy if exists "blog_admins_delete_posts" on public.blog_posts;
create policy "blog_admins_delete_posts"
on public.blog_posts
for delete
to authenticated
using (public.has_blog_admin_access());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'blog-images',
  'blog-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "blog_images_public_read" on storage.objects;
create policy "blog_images_public_read"
on storage.objects
for select
using (bucket_id = 'blog-images');

drop policy if exists "blog_admins_upload_images" on storage.objects;
create policy "blog_admins_upload_images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'blog-images'
  and public.has_blog_admin_access()
);

drop policy if exists "blog_admins_update_images" on storage.objects;
create policy "blog_admins_update_images"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'blog-images'
  and public.has_blog_admin_access()
)
with check (
  bucket_id = 'blog-images'
  and public.has_blog_admin_access()
);

drop policy if exists "blog_admins_delete_images" on storage.objects;
create policy "blog_admins_delete_images"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'blog-images'
  and public.has_blog_admin_access()
);
