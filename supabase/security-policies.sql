-- ============================================================================
-- Roca de la Esperanza — Row Level Security hardening
-- Run once in Supabase Dashboard → SQL Editor (project jzgxtokewmodjcviwlxh).
-- Idempotent: drops every existing policy on the site tables and on
-- storage.objects, then recreates a minimal explicit set.
--
-- Mistakes in the current policies that this fixes:
--   * registrate / conectate_submision: anonymous visitors could SELECT and
--     UPDATE registrations and contact submissions (names, emails, phones).
--   * services / events / conectate_submision: ANY signed-in user (not only
--     admins) could insert, read and update rows ("authenticated ... true").
--   * storage event-images: any signed-in user could upload / replace files.
--
-- After running:
--   * Public (anon key): read non-deleted content, insert into the two forms.
--   * Admins (rows in public.admins): read submissions, write everything.
-- ============================================================================

-- The helper lives in a private schema so it is usable in RLS policies but not
-- callable through the public REST API (/rest/v1/rpc).
create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to anon, authenticated;

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

revoke all on function private.is_admin() from public;
grant execute on function private.is_admin() to anon, authenticated;

-- Drop every existing policy on the managed tables and on storage.objects
do $$
declare p record;
begin
  for p in
    select schemaname, tablename, policyname
    from pg_policies
    where (schemaname = 'public' and tablename in (
            'admins','registrate','conectate_submision','services','events',
            'team_members','ministries','society_pages','page_images','site_settings'))
       or (schemaname = 'storage' and tablename = 'objects')
  loop
    execute format('drop policy if exists %I on %I.%I', p.policyname, p.schemaname, p.tablename);
  end loop;
end $$;

-- admins: see only your own row
alter table public.admins enable row level security;
create policy "admins_select_own" on public.admins
  for select to authenticated using (user_id = auth.uid());

-- registrate: public insert, admin read/update/delete
alter table public.registrate enable row level security;
create policy "registrate_public_insert" on public.registrate
  for insert to anon, authenticated
  with check (coalesce(archived,false) = false and coalesce(deleted,false) = false);
create policy "registrate_admin_select" on public.registrate
  for select to authenticated using (private.is_admin());
create policy "registrate_admin_update" on public.registrate
  for update to authenticated using (private.is_admin()) with check (private.is_admin());
create policy "registrate_admin_delete" on public.registrate
  for delete to authenticated using (private.is_admin());

-- conectate_submision: public insert, admin read/update/delete
alter table public.conectate_submision enable row level security;
create policy "conectate_public_insert" on public.conectate_submision
  for insert to anon, authenticated
  with check (coalesce(read,false) = false and coalesce(deleted,false) = false);
create policy "conectate_admin_select" on public.conectate_submision
  for select to authenticated using (private.is_admin());
create policy "conectate_admin_update" on public.conectate_submision
  for update to authenticated using (private.is_admin()) with check (private.is_admin());
create policy "conectate_admin_delete" on public.conectate_submision
  for delete to authenticated using (private.is_admin());

-- Content tables with a "deleted" flag: public reads non-deleted rows, admins do everything
do $$
declare t text;
begin
  foreach t in array array['services','events','team_members','ministries','society_pages','page_images']
  loop
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy %I on public.%I for select to anon, authenticated using (coalesce(deleted,false) = false or private.is_admin())', t || '_public_select', t);
    execute format('create policy %I on public.%I for insert to authenticated with check (private.is_admin())', t || '_admin_insert', t);
    execute format('create policy %I on public.%I for update to authenticated using (private.is_admin()) with check (private.is_admin())', t || '_admin_update', t);
    execute format('create policy %I on public.%I for delete to authenticated using (private.is_admin())', t || '_admin_delete', t);
  end loop;
end $$;

-- site_settings: public read, admin write
alter table public.site_settings enable row level security;
create policy "site_settings_public_select" on public.site_settings
  for select to anon, authenticated using (true);
create policy "site_settings_admin_insert" on public.site_settings
  for insert to authenticated with check (private.is_admin());
create policy "site_settings_admin_update" on public.site_settings
  for update to authenticated using (private.is_admin()) with check (private.is_admin());
create policy "site_settings_admin_delete" on public.site_settings
  for delete to authenticated using (private.is_admin());

-- Storage: public read of the site buckets, admin-only upload/replace/delete
create policy "site_buckets_public_read" on storage.objects
  for select to anon, authenticated
  using (bucket_id in ('event-images','site-images','team-photos','site-videos'));
create policy "site_buckets_admin_insert" on storage.objects
  for insert to authenticated
  with check (bucket_id in ('event-images','site-images','team-photos','site-videos') and private.is_admin());
create policy "site_buckets_admin_update" on storage.objects
  for update to authenticated
  using (bucket_id in ('event-images','site-images','team-photos','site-videos') and private.is_admin())
  with check (bucket_id in ('event-images','site-images','team-photos','site-videos') and private.is_admin());
create policy "site_buckets_admin_delete" on storage.objects
  for delete to authenticated
  using (bucket_id in ('event-images','site-images','team-photos','site-videos') and private.is_admin());

-- Verify afterwards (should return 0 rows / no data for the anon key):
--   select count(*) from pg_policies where schemaname='public' and tablename='registrate' and 'anon' = any(roles) and cmd <> 'INSERT';
