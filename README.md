# Cabra Austral · web

Web pública de la cafetería. Next.js 14 (App Router, carpeta `src`) + Tailwind CSS 3, lista para Vercel.
Es un proyecto **aparte** del POS: repositorio y proyecto de Vercel propios. Solo comparte las dos variables de Supabase.

---

## Puesta en marcha (una sola vez)

### 1. Supabase: la función del menú
1. Entrá a tu proyecto de Supabase → **SQL Editor** → **New query**.
2. Pegá todo el contenido de `supabase/get_public_menu.sql` y tocá **Run**.
3. Para probar, corré `select * from public.get_public_menu();`: tiene que listar categorías y productos, **sin precios ni costos**.

La tabla `products` no se toca: sus permisos quedan como están.

### 2. GitHub: el repositorio
1. En GitHub, creá un repositorio nuevo llamado `cabra-austral-web` (puede ser privado). Sin README.
2. Subí el contenido de esta carpeta respetando la estructura de carpetas.
   - Desde el iPad: descomprimí el .zip en la app Archivos y arrastrá el contenido de la carpeta a **Add file → Upload files** del repositorio.
   - O, más simple: conectá tu cuenta de GitHub a Claude y pedile que lo suba por vos.

### 3. Vercel: publicar
1. En Vercel → **Add New… → Project** → importá `cabra-austral-web`. Vercel detecta Next.js solo.
2. Antes de **Deploy**, abrí **Environment Variables** y cargá:
   - `NEXT_PUBLIC_SUPABASE_URL` → el mismo valor que en el proyecto del POS
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → el mismo valor que en el proyecto del POS
   - `NEXT_PUBLIC_SITE_URL` → la dirección de la web (al principio, la que te da Vercel, ej. `https://cabra-austral-web.vercel.app`)
3. **Deploy**. Cada vez que cambies algo en GitHub, Vercel vuelve a publicar solo.

---

## Uso diario

| Quiero… | Cómo |
|---|---|
| Ver si la web lee bien el menú del POS | Abrí `/estado-menu` (ej. `https://cabra-austral-web.vercel.app/estado-menu`): dice qué falla y cómo arreglarlo. |
| Cambiar las promos de la semana | En el POS, activá o desactivá productos de la categoría **Promos**. La web lo muestra en la próxima visita (lee el POS cada vez). Si no hay ninguna activa, la sección desaparece. |
| Sumar o sacar productos del menú | En el POS. Solo se muestran los activos, sin precios. |
| Cambiar el orden de las categorías | Con el `sort_order` de cada categoría en el POS. Los productos van en orden alfabético. |
| Subir fotos | Ver `FOTOS.md`. Subilas a `public/fotos/` desde GitHub (**Add file → Upload files**) con el nombre exacto. |
| Cambiar mates y accesorios | `src/data/archivo.ts` |
| Cambiar los pies de foto | `src/data/menu-fotos.ts` (cinta del menú) y `src/data/momentos.ts` (Momentos) |
| Sacar del menú una categoría que es de venta | `src/lib/menu.ts`, lista `FUERA_DEL_MENU` |
| Cambiar horarios | `src/lib/horarios.ts` (horarios, texto y datos para Google están juntos) |
| Cambiar teléfono, Instagram o dirección | `src/lib/negocio.ts` |
| Cambiar textos de portada o manifiesto | `src/components/Hero.tsx` y `src/components/Manifiesto.tsx` |

### Dominio propio (más adelante)
1. Vercel → proyecto → **Settings → Domains** → agregá el dominio y seguí los pasos de DNS.
2. Cambiá `NEXT_PUBLIC_SITE_URL` por el dominio nuevo y volvé a publicar (**Deployments → Redeploy**).

---

## Mapa de archivos

```
cabra-austral-web/
├─ package.json              dependencias y comandos
├─ next.config.mjs           configuración; detecta qué fotos subiste
├─ tailwind.config.ts        colores y tipografías de la marca
├─ postcss.config.js
├─ tsconfig.json
├─ .gitignore
├─ .env.example              modelo de variables de entorno
├─ README.md                 este archivo
├─ FOTOS.md                  qué fotos sacar y cómo nombrarlas
├─ supabase/
│  └─ get_public_menu.sql    función segura del menú (se corre en Supabase)
├─ public/
│  ├─ marca/                 logo en SVG (completo, solo la cabra, solo el texto)
│  └─ fotos/                 acá van las fotos (y fotos/archivo/ para los mates)
└─ src/
   ├─ app/
   │  ├─ layout.tsx          tipografías, título y descripción para Google
   │  ├─ page.tsx            arma la página con todas las secciones
   │  ├─ globals.css         estilos generales y la animación del manifiesto
   │  ├─ icon.svg            ícono de la pestaña (la cabra)
   │  ├─ robots.ts           permiso para buscadores
   │  ├─ sitemap.ts          mapa del sitio para Google
   │  └─ fonts/              Roboto Serif condensada y Manrope (servidas desde la web)
   ├─ components/
   │  ├─ Header.tsx          navegación fija: logo, Menú, Mates, Visítanos
   │  ├─ Hero.tsx            portada
   │  ├─ Manifiesto.tsx      el momento protagonista (dibujos de la carta + palabras)
   │  ├─ Menu.tsx            menú en vivo por categorías
   │  ├─ Promos.tsx          promos de la semana
   │  ├─ Archivo.tsx         galería de mates y accesorios con cambio de foto
   │  ├─ Momentos.tsx        carrusel de fotos
   │  ├─ Visitanos.tsx       dirección, horarios, mapa
   │  ├─ EstadoAbierto.tsx   "Abierto ahora / Cerrado" en hora de Perito Moreno
   │  ├─ Footer.tsx          pie con redes, WhatsApp y horarios
   │  ├─ Foto.tsx            foto optimizada o recuadro de marcador
   │  ├─ Logo.tsx            logo vectorial
   │  ├─ Dibujo.tsx          un dibujo de la carta (medialuna, taza, grano, alfajores, torta)
   │  ├─ Reveal.tsx          apariciones suaves al hacer scroll
   │  └─ JsonLd.tsx          datos estructurados de cafetería para Google
   ├─ data/
   │  ├─ archivo.ts          piezas de la galería
   │  ├─ dibujos.ts          dibujos de la carta en vector (no editar a mano)
   │  ├─ menu-fotos.ts       fotos y pies de la cinta del menú
   │  ├─ momentos.ts         fotos y pies del carrusel
   │  └─ menu-respaldo.ts    menú que se muestra solo si Supabase no responde
   └─ lib/
      ├─ negocio.ts          datos del negocio y links
      ├─ horarios.ts         horarios y cálculo de abierto/cerrado
      ├─ menu.ts             lectura del menú desde Supabase
      ├─ fotos.ts            busca las fotos subidas
      └─ logo-paths.ts       trazos del logo (no editar)
```

## Accesibilidad
- Contraste AA con la paleta: pizarra sobre marfil 5,5:1; gris #6B675F sobre marfil 4,9:1; marfil sobre #222D35 12:1.
- Foco visible en todos los links y botones, enlace "Saltar al contenido", pestañas del menú manejables con flechas.
- Con "reducir movimiento" activado en el teléfono, el manifiesto aparece completo y sin animación, y se desactivan las transiciones.
