-- ============================================================
-- Menú público para la web de Cabra Austral
-- Pegar completo en Supabase → SQL Editor → New query → Run.
-- Se puede correr más de una vez sin problema. Tiene que terminar con "Success".
--
-- Qué hace:
--   • Devuelve SOLO categoría, orden de la categoría y nombre de los productos activos.
--   • NO devuelve precios ni costos, y NO abre la tabla products al público:
--     las políticas (RLS) de products quedan exactamente como están.
--   • "security definer" hace que la función lea las tablas con los permisos de su dueño,
--     y solo devuelve las columnas de abajo.
-- ============================================================

-- Si existía una versión anterior (por ejemplo, con precios), se reemplaza.
drop function if exists public.get_public_menu();

create function public.get_public_menu()
returns table (
  category       text,
  category_order integer,
  name           text
)
language sql
stable
security definer
set search_path = public
as $$
  select
    coalesce(c.name::text, 'Otros') as category,
    c.sort_order::integer           as category_order,
    p.name::text                    as name
  from public.products p
  left join public.categories c on c.id = p.category_id
  -- activo = true, o sin dato cargado (por ejemplo, productos importados de la app anterior)
  where coalesce(p.is_active, true) = true
  order by c.sort_order nulls last, c.name nulls last, p.name;
$$;

-- Nadie la puede ejecutar por defecto…
revoke all on function public.get_public_menu() from public;
-- …salvo los visitantes anónimos de la web y los usuarios del POS.
grant execute on function public.get_public_menu() to anon, authenticated;

-- Avisa a la API de Supabase que hay una función nueva (si no, puede tardar en aparecer).
notify pgrst, 'reload schema';

-- Prueba rápida (debería listar categorías y productos, sin precios):
-- select * from public.get_public_menu();
