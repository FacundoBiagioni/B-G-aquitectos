@AGENTS.md
@informe-estudio-bg.md

# Estudio B+G — sitio web

Sitio institucional/portfolio para Estudio B+G Arquitectura (La Plata, Argentina — arquitectos
José Luis Biagioni y Kevin Gershanik). El informe importado arriba (`informe-estudio-bg.md`) es
la fuente de verdad sobre el negocio: identidad, perfil profesional, los 15 proyectos del
portfolio, lineamientos de SEO y de diseño/UX. Este archivo cubre el estado técnico del
proyecto Next.js — lo que ya existe, cómo está armado, y qué falta.

Si el contenido de `informe-estudio-bg.md` cambia, no dupliques su contenido acá: este archivo
solo agrega contexto de implementación.

## Stack

- Next.js 16.3.4 (App Router, Turbopack), React 19.2, TypeScript, Tailwind CSS v4, ESLint 9.
- Sin base de datos ni backend propio — todo el contenido de proyectos vive hardcodeado en
  `src/data/projects.ts`. Decisión explícita del usuario (2026-09-10): no sumar backend ni para
  el formulario (Web3Forms, cliente-only) ni para un futuro mapa de ubicación (iframe de Google
  Maps o Mapbox/Leaflet con key pública, también cliente-only).
- `npm run dev` / `npm run build` / `npm run lint` / `npm run start` (server de producción real,
  útil para probar headers/CSP que `next dev` no aplica igual).
- `node scripts/optimize-images.mjs` — recomprime/redimensiona en el lugar todo lo que haya en
  `public/projects`, `public/team` y `public/portada` (máx. 2200px de ancho, JPEG q80 / PNG q80,
  solo si el resultado da más chico). Correrlo cada vez que se agreguen fotos nuevas pesadas —
  la primera corrida bajó `public/` de ~473MB a ~35MB sin pérdida visible.
- Dependencias: mantenerlas al día. El 2026-09-10 `npm audit` encontró una vulnerabilidad
  **crítica** en Next.js (RCE no autenticado en servidores Windows, entre otras) resuelta con
  `npm audit fix --force` (bump a 16.3.4) + alinear `eslint-config-next` a la misma versión.

## Estructura

```
src/app/
  page.tsx              Home (hero, carrusel de proyectos, manifiesto, sección "El proceso",
                         servicios, CTA). Lleva el JSON-LD de LocalBusiness.
  proyectos/page.tsx     Listado con filtro por tipología (ProyectosClient.tsx, client component),
                         grid mosaico 2-anchas/3-angostas (ver gridSpans.ts)
  proyectos/[slug]/page.tsx   Ficha de proyecto (generateStaticParams + generateMetadata con
                         OG image propia por proyecto)
  nosotros/page.tsx      Equipo, formación, antecedentes institucionales. Lleva el JSON-LD de
                         Person (uno por socio).
  servicios/page.tsx
  contacto/page.tsx      Ya NO es una página propia — renderiza <HomePage /> + <AutoOpenContact />
                         (abre el panel de contacto por efecto al montar). Existe solo para que
                         /contacto no rompa; ver sección "Panel de contacto" abajo. Canonical
                         apunta a "/" (mismo contenido que Home, para no duplicar en buscadores).
  sitemap.ts / robots.ts   Nativos de Next (MetadataRoute). Usan SITE_URL de data/site.ts.
src/components/
  Navbar.tsx           Fixed header, siempre transparente (sin fondo/borde en ningún estado),
                       se oculta al bajar scroll y reaparece al subir. El logo se demora un poco
                       más que el botón de menú al ocultarse (transition-delay). Logo:
                       `/logo-bg1.png` (versión sin "ARQUITECTOS", más minimalista) con un
                       drop-shadow sutil para que resalte un poco sobre fondos claros; el ícono
                       de hamburguesa/X usa el mismo tratamiento (líneas h-0.5, no h-px).
  Footer.tsx           Usa el mismo `/logo-bg1.png`.
  ProjectCard.tsx      Card de proyecto (usada en home, listado y "también en...")
  ProjectImage.tsx     Wrapper de next/image que hace fallback a /placeholder.svg en onError
  ProjectsCarousel.tsx Carrusel horizontal de TODOS los proyectos en Home: autoplay continuo
                       (rebota entre extremos) que se pausa con hover/drag/flechas y se detiene
                       del todo (sin rAF) cuando el carrusel sale del viewport. Sin scroll-snap
                       — se probó y pelea con el autoplay (el navegador reajusta el scroll solo).
  ScrollReveal.tsx     Wrapper de fade+translateY on-scroll basado en IntersectionObserver (sin
                       librería de animación). Usado en el contenido de todas las páginas menos
                       en los paneles deslizables (Navbar/ContactPanel) — eso fue pedido
                       explícito: "el menú desplegable claramente ahí no van los movimientos".
  JsonLd.tsx           `<script type="application/ld+json">` genérico para datos estructurados.
  PanelProvider.tsx    Contexto compartido (`usePanel()`) que controla cuál de los dos paneles
                       deslizables de la derecha está abierto: "menu" | "contact" | null.
  RightPanel.tsx       Shell genérico del panel deslizable (backdrop + panel w-full sm:w-[420px],
                       misma transición para ambos). Lo usan tanto el menú de Navbar como
                       ContactPanel — así quedan garantizadas las mismas proporciones.
  ContactPanel.tsx     Panel de contacto (formulario + datos), montado una vez en layout.tsx.
  ContactForm.tsx      Envía el formulario a Web3Forms (ver sección de abajo).
  ConsultanosButton.tsx   Botón que llama a `openContact()` del contexto — reemplaza cualquier
                       `<Link href="/contacto">` en Home, Servicios, Nosotros, ficha de proyecto
                       y Footer.
src/lib/
  gridSpans.ts         `getMosaicSpanClass(index)` — patrón 2-anchas/3-angostas del grid de
                       /proyectos en un contenedor de 6 columnas, cíclico por índice.
src/data/
  projects.ts   Modelo Project + array de los 15 proyectos + helpers (getProjectBySlug,
                getFeaturedProjects, getProjectsByTypology, typologyLabels, statusLabels)
  site.ts       `homeCover`, `SITE_URL` (placeholder hasta comprar dominio real — un solo lugar
                para cambiarlo, ver gap #5) y `siteInfo` (datos de contacto para JSON-LD).
scripts/
  optimize-images.mjs   Ver sección Stack arriba.
public/projects/[slug]/   Imágenes reales copiadas del pendrive, un directorio por proyecto
                          (ya optimizadas — no volver a copiar un original de 20-30MB sin correr
                          el script antes).
```

## Panel de contacto (reemplaza la página /contacto)

Por decisión explícita del usuario (2026-09-07) ya no hay una página de contacto tradicional.
En su lugar:

- Un solo `<ContactPanel />` vive montado en `layout.tsx`, dentro de `<PanelProvider>`. Se abre
  llamando a `openContact()` desde cualquier componente vía `usePanel()`.
- El menú de navegación (`Navbar.tsx`) y el panel de contacto comparten el mismo slot visual de
  la derecha (mismo `RightPanel`) y son mutuamente excluyentes: abrir uno cierra el otro. El botón
  hamburguesa/X del header controla "el panel que esté abierto, sea cual sea".
- Cualquier CTA de "Consultanos"/"Contacto" en el sitio usa `<ConsultanosButton>` en vez de
  `<Link href="/contacto">`. Si agregás un nuevo CTA de contacto en cualquier página, usá ese
  componente — nunca un link a `/contacto`.
- La ruta `/contacto` se mantiene (por pedido explícito: "que no redirija a ningún lado") pero
  `src/app/contacto/page.tsx` solo renderiza `<HomePage />` + `<AutoOpenContact />` (un client
  component que llama `openContact()` en un `useEffect` de montaje). Esto evita un 404 para
  links viejos sin usar `redirect()`.
- **Envío real de mail:** el formulario (`ContactForm.tsx`) postea directo desde el cliente a
  `https://api.web3forms.com/submit` (sin backend propio), usando
  `process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`. Esa key es pública por diseño de Web3Forms
  (no es un secreto) y vive en `.env.local` (gitignoreado por el `.env*` del `.gitignore`, así
  que cada entorno/deploy necesita la suya). Probado y confirmado funcionando por el usuario
  (2026-09-09). Si el formulario devuelve error "no pudimos enviar el mensaje", lo primero a
  chequear es si esa variable está seteada — y si estás probando con un navegador automatizado,
  ojo: Cloudflare le devuelve 403 al preflight OPTIONS de herramientas tipo Playwright contra
  `api.web3forms.com`, eso no es un bug nuestro (confirmado: no aparece como violación de CSP en
  consola, y el usuario probó manualmente y le llegó el mail).

## SEO

- `SITE_URL` en `src/data/site.ts` es la fuente única para `metadataBase`, sitemap, robots,
  canonical y Open Graph — hoy apunta al dominio placeholder `estudioarqbg.com` (gap #5). Se
  puede overridear con la env var `NEXT_PUBLIC_SITE_URL` sin tocar código.
- `src/app/sitemap.ts` y `robots.ts` — nativos de Next, incluyen todas las rutas estáticas + cada
  proyecto.
- JSON-LD: `LocalBusiness` en Home, `Person` (x2, uno por socio) en Nosotros, vía `<JsonLd>`.
- Cada página tiene `alternates.canonical` + `openGraph` propio (título/descripción/imagen)
  además del `metadata` de siempre — `/contacto` es la excepción, canonicaliza a `/` porque
  renderiza literalmente el mismo contenido que Home.
- La ficha de cada proyecto usa su `heroImage` como OG image (`og:type: article`).

## Seguridad

`next.config.ts` define headers globales (`async headers()`), pensados como "lo mínimo
indispensable" para un sitio sin backend/auth/datos de usuario propios (así lo pidió el
usuario explícitamente — no hay nada "hackeable" más allá de lo que cualquier sitio estático
merece por defecto):

- `Content-Security-Policy` — variante "sin nonces" de la guía oficial de Next
  (`node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md`): `script-src` y
  `style-src` con `'unsafe-inline'` (Next/RSC inyecta scripts inline para la hidratación —
  bloquearlos requeriría nonces + forzar render dinámico en todo el sitio, no vale la pena para
  un sitio 100% estático); `'unsafe-eval'` solo en dev (lo necesita React para los stack traces).
  `connect-src`/`form-action` incluyen `https://api.web3forms.com` explícitamente.
- `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy:
  strict-origin-when-cross-origin`, `Permissions-Policy` (camera/microphone/geolocation
  deshabilitados — el sitio no los usa).
- Probado en dev, en `next build` y en `next start` (servidor de producción real) sin errores de
  consola ni violaciones de CSP, incluyendo el submit del formulario de contacto.
- Si en algún momento se agrega un script de terceros (analytics, mapa embebido, etc.), hay que
  sumar su dominio a `script-src`/`connect-src`/`frame-src` según corresponda — chequear la guía
  de Next antes de tocar el CSP.

## Convenciones de diseño

- Tema oscuro fijo, tokens CSS en `globals.css` (`--bg`, `--bg-surface`, `--bg-elevated`,
  `--border`, `--text-primary/secondary/muted`, `--accent` dorado `#c8a96e`). Se consumen como
  `var(--nombre)` directo en clases Tailwind (`bg-[var(--bg)]`), no como utilidades `bg-bg`.
- Tipografía Geist (`next/font/google`), pesos 300–600. Títulos en `font-light`, tracking amplio
  en labels/eyebrows (`tracking-[0.2em]` a `[0.3em]`, uppercase, texto chico — estas SÍ se dejan
  chicas a propósito, son decorativas).
- **Tamaños de texto (2026-09-10):** el público del estudio incluye gente mayor, así que todo
  texto de lectura real (párrafos, descripciones, datos de contacto, ítems de listas) usa
  `text-base` como mínimo, nunca `text-sm`/`text-xs`. Las etiquetas uppercase tipo "PORTFOLIO" o
  "EDIFICIOS — EN PROYECTO" quedan chicas porque son decorativas, no texto a leer — esa
  distinción es la que hay que mantener si se agrega texto nuevo.
- **Animaciones (2026-09-10):** todo el contenido de página (Home, Nosotros, Servicios,
  Proyectos y fichas de proyecto) usa `<ScrollReveal>` para entrar con fade+rise al hacer scroll.
  Los paneles deslizables (menú de Navbar, ContactPanel) NO llevan esto — su animación es la
  del propio panel (slide-in), pedido explícito del usuario de no mezclarlas.
- Layout: `max-w-[1400px] mx-auto px-6 md:px-10`. Grids de proyectos usan el truco de gap con
  `gap-px bg-[var(--border)]` + celdas `bg-[var(--bg)]` para simular separadores finos (excepto
  el grid de /proyectos y el de destacados en Home, que usan gap real — ver `gridSpans.ts`).
- Todas las imágenes de contenido (hero, galería, cards) van envueltas en `ProjectImage`, no en
  `next/image` directo, para tener el fallback a placeholder. El logo en Navbar/Footer sí usa
  `next/image` directo con `unoptimized` (son PNGs chicos, no necesitan pasar por el optimizador).

## Estado real vs. datos — gaps conocidos

Esto se armó en sesiones previas y quedó sin terminar en algunos puntos. Antes de asumir que
algo "ya está", verificar:

1. **Galerías de proyectos rotas.** `src/data/projects.ts` referencia archivos como
   `/projects/[slug]/render-01.jpg` o `foto-01.jpg` en el array `gallery`, pero los archivos
   reales en `public/projects/[slug]/` tienen nombres arbitrarios (`hero1.jpg`, `WhatsApp Image
   ....jpeg`, nombres de export tipo UUID, etc. — ver el listado real con `ls public/projects/<slug>/`
   antes de tocar un proyecto). Hoy esas imágenes caen al placeholder por el `onError` de
   `ProjectImage`. Para arreglar un proyecto: mirar qué archivos hay realmente en su carpeta y
   actualizar `heroImage`/`gallery` en `projects.ts` para que apunten a los nombres reales.
2. ~~Foto de equipo rota~~ — resuelto.
3. **`public/projects/placeholder/`** existe pero está vacía — no se está usando.
4. ~~Formulario de contacto sin Access Key~~ — resuelto, Web3Forms conectado y probado.
5. **Dominio sin confirmar.** `SITE_URL` en `src/data/site.ts` sigue siendo el placeholder
   `https://estudioarqbg.com` — actualizar ese único valor (o `NEXT_PUBLIC_SITE_URL`) cuando se
   compre el dominio real; sitemap/robots/canonical/OG lo toman de ahí automáticamente.
6. ~~Sin sitemap.ts ni robots.ts~~ — resuelto.
7. ~~Sin JSON-LD~~ — resuelto (LocalBusiness + Person).
8. **Videos de obra sin incorporar** (el informe menciona `.mp4` de la carpeta de E25 como
   candidato para el hero).
9. ~~Logo vectorial~~ — resuelto, ya está en uso en Navbar/Footer (ahora `/logo-bg1.png`).
10. **Sin mapa de ubicación.** El usuario quiere sumarlo a futuro (2026-09-10) — sin backend,
    con un iframe de Google Maps o Mapbox/Leaflet client-side.

## Notas de sesión

Este CLAUDE.md fue reconstruido el 2026-08-12 después de que el usuario perdiera el original y
el historial de chat de esta sesión en VS Code. Se reconstruyó leyendo `informe-estudio-bg.md`
(que el usuario volvió a pegar en el repo) y auditando el estado real del código y de
`public/`. Si aparecen inconsistencias entre lo que dice este archivo y el código, confiar en el
código y corregir este archivo.

El 2026-09-10 se hizo una pasada grande de pulido general (pedida antes de una demo al cliente):
animaciones de scroll en todo el sitio, carrusel de proyectos con autoplay, tamaños de texto más
grandes, optimización de imágenes (471MB→35MB), actualización de Next.js por una vulnerabilidad
crítica, y SEO/seguridad básica. Ver el resto de este archivo para el detalle de cada cosa.
