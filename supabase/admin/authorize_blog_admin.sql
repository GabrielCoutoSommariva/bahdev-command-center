-- Run this after creating the Auth user in Supabase Authentication > Users.
-- This file intentionally does not create or store the user's password.

insert into public.blog_admins (user_id)
select id
from auth.users
where email = 'gabriel.couto@bahdev.com.br'
on conflict (user_id) do nothing;

select a.user_id, u.email, a.created_at
from public.blog_admins a
join auth.users u on u.id = a.user_id
where u.email = 'gabriel.couto@bahdev.com.br';
