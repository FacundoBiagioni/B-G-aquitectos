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
  el formulario (Web3Forms, cliente-only) ni para el mapa de ubicación (Leaflet, cliente-only,
  ver `LocationMap.tsx` abajo).
- `leaflet` (+ `@types/leaflet`) — mapa de ubicación en Nosotros. Tiles: OpenStreetMap estándar
  (`tile.openstreetmap.org`, sin API key ni cuenta) con un filtro CSS (`.map-dark` en
  `globals.css`) para oscurecerlos y que combinen con el tema del sitio — CARTO, que antes
  ofrecía tiles oscuros gratis sin key, ahora la exige, así que se optó por este approach en vez
  de pedirle al usuario que gestione una cuenta/API key. Si en algún momento se consigue una key
  de CARTO o Mapbox, se puede volver a un tile server nativamente oscuro y sacar el filtro.
- `npm run dev` / `npm run build` / `npm run lint` / `npm run start` (server de producción real,
  útil para probar headers/CSP que `next dev` no aplica igual).
- `node scripts/optimize-images.mjs` — recomprime/redimensiona en el lugar todo lo que haya en
  `public/projects`, `public/team`, `public/portada` y `public/inicio` (máx. 2200px de ancho,
  JPEG q80 / PNG q80, solo si el resultado da más chico). Correrlo cada vez que se agreguen fotos
  nuevas pesadas — la primera corrida bajó `public/` de ~473MB a ~35MB sin pérdida visible.
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
                       `/logo-bg1.png` (isotipo, elegido por el usuario 2026-09-10 en
                       reemplazo del wordmark minimalista que tenía antes ese mismo nombre —
                       ver `public/logo-bg2.png` en la nota de abajo) con un drop-shadow sutil
                       para que resalte un poco sobre fondos claros; el ícono de hamburguesa/X
                       usa el mismo tratamiento (líneas h-0.5, no h-px).
  Footer.tsx           Usa `/logo-bg.png` (wordmark completo con "ARQUITECTOS" — el logo
                       original del estudio, distinto del isotipo del Navbar).
  ProjectCard.tsx      Card de proyecto (usada en home, listado y "también en..."). Prop
                       `dimmed` (usada solo en "también en...", ficha de proyecto): aplica
                       `brightness-50` a la imagen para diferenciarla de la galería de arriba,
                       que hoy ocupa un tamaño de tile parecido.
  ProjectImage.tsx     Wrapper de next/image que hace fallback a /placeholder.svg en onError.
                       `draggable={false}` en el `<img>` (2026-09-11) — el arrastre nativo del
                       navegador para imágenes (activado por default) le ganaba la mano al drag
                       manual del carrusel justo cuando agarrabas la foto en sí: funcionaba bien
                       en las zonas vacías entre cards pero no arrastrando desde la imagen. Como
                       todas las imágenes de contenido pasan por este componente, el fix aplica
                       en todo el sitio de una — no hay ningún lugar donde convenga el arrastre
                       nativo de imágenes. **Esto solo no alcanzó**: el `<a>` de `ProjectCard.tsx`
                       que envuelve la imagen TAMBIÉN es arrastrable por defecto (los links con
                       `href` lo son, igual que las imágenes) — el navegador, al encontrar que el
                       `<img>` ya no es arrastrable, sube al ancestro más cercano que sí lo sea y
                       usa ESE como fuente del drag nativo. Hubo que agregar `draggable={false}`
                       también en el `<Link>` de ProjectCard para que el arrastre nativo no
                       aparezca en ningún nivel dentro del carrusel. Moraleja para la próxima vez
                       que algo similar pase: `draggable` no es heredable ni cascadea — cada
                       elemento de tipo `<img>`/`<a href>` en la cadena de ancestros hay que
                       desactivarlo por separado.
  ProjectsCarousel.tsx Carrusel horizontal de TODOS los proyectos en Home: autoplay continuo
                       (rebota entre extremos) que se pausa con hover/drag/flechas y se detiene
                       del todo (sin rAF) cuando el carrusel sale del viewport. Sin scroll-snap
                       — se probó y pelea con el autoplay (el navegador reajusta el scroll solo).
  ScrollReveal.tsx     Wrapper de fade+translateY on-scroll basado en IntersectionObserver (sin
                       librería de animación). Usado en el contenido de todas las páginas menos
                       en los paneles deslizables (Navbar/ContactPanel) — eso fue pedido
                       explícito: "el menú desplegable claramente ahí no van los movimientos".
                       Prop `immediate`: anima al montar en vez de esperar el IntersectionObserver
                       — usarlo para contenido ya visible sin scroll (ej. el hero de Home), porque
                       el `rootMargin` recorta el 10% inferior de la pantalla y un elemento pegado
                       abajo del todo (como los botones del hero) puede no disparar nunca sin él.
                       Prop `style`: se mergea con el `transform`/`transitionDelay` que el
                       componente ya setea — usado por la galería "large" de ProjectGallery para
                       pasarle `flexGrow` a cada tile (ver ProjectGallery.tsx abajo).
  BackToTop.tsx        Botón fijo (flecha ↑) que sube al principio de la página con scroll suave.
                       Aparece/desaparece según el % de recorrido de scroll de la página, no un
                       valor fijo en px — con dos umbrales distintos (aparece al 30%, desaparece
                       al 50%) para que no titile justo en un solo punto. Montado una vez en
                       layout.tsx, así que aplica a todas las páginas.
  ProjectGallery.tsx   Galería en la ficha de proyecto, a todo el ancho de la página (no solo las
                       2/3 partes donde vive el texto — ver `proyectos/[slug]/page.tsx`, la
                       galería vive fuera del grid de texto+sidebar, después de que cierra).
                       Arma filas con `lib/galleryLayout.ts` → `groupIntoRows`: cada fila tiene 1,
                       2 o 3 fotos según un patrón fijo (`ROW_SIZE_PATTERN`, no aleatorio — mismo
                       input siempre da el mismo layout), y dentro de una fila multi-foto cada
                       imagen es un flex item con `flexGrow = width/height` (su propio aspect
                       ratio) y `flexBasis: 0`, así el ancho de cada una es proporcional a su
                       forma real en vez de partir la fila en mitades iguales — se eligió este
                       approach en vez de un grid de columnas fijas porque el usuario pidió
                       explícitamente que no se viera "tan perfectito", como una cuadrícula.
                       Lightbox propio: click en un tile lo abre grande (`object-contain`, no
                       recortado) con flechas prev/next, contador y cierre con
                       Escape/click afuera/botón — todo con `position: fixed` + `z-[100]` (por
                       encima del Navbar en z-50 y de los paneles deslizables en z-30/z-40). El
                       hover de cada tile muestra un ícono de "ampliar" (`ExpandIcon` en
                       `icons.tsx`) + cursor `zoom-in`, para que quede claro que son clickeables.

                       Se probó primero solo en casa-l19-pueblo (2026-09-11) antes de aplicarlo a
                       los 15 proyectos ese mismo día — en esa vuelta también se sacó la variante
                       de grid de columnas fijas (`size="default"`/`"large"`, `getGalleryTiles`)
                       que existía antes, porque ya no la usaba ninguna página.
  AnimatedProjectHero.tsx   Portada de ficha de proyecto con intro a pantalla completa que se
                       achica hasta el tamaño normal del hero (h-[70vh]) y luego queda "fijada"
                       (React state `locked`, one-way — nunca vuelve a `false`): a partir de ahí
                       se renderiza como el hero estático de siempre, así que si volvés a subir el
                       scroll NO se repite la intro (si recargás la página sí vuelve a arrancar en
                       pantalla completa). Recibe el resto de la página como `children` y NO los
                       monta hasta que `locked` es true — nada de lo que está abajo existe en el
                       DOM durante la intro, así no hay manera de que "se filtre" antes de tiempo.
                       Es el hero de las 15 fichas de proyecto — ya no hay una variante estática
                       separada en `page.tsx`, se sacó cuando esto pasó de prueba a definitivo.

                       Reescrito por completo (2026-09-11) porque la primera versión se sentía
                       "bugueada": esa versión ataba el progreso a `window.scrollY` real y
                       manejaba todo con `useState` en cada evento de scroll — el scroll real de
                       la página y el alto del spacer se retroalimentaban entre sí (el spacer
                       encogía la altura total del documento mientras vos estabas parado adentro
                       de ese mismo tramo), lo cual causaba saltos y el efecto de "ya veo el
                       contenido de abajo antes de tiempo". La versión actual hace scroll-jacking
                       de verdad: mientras no está `locked`, pone `overflow: hidden` en
                       `<html>` y escucha `wheel`/`touchmove`/flechas del teclado directamente
                       (con `preventDefault`) para acumular un progreso propio en un `ref` — el
                       scroll real de la página quedó bloqueado y en 0 todo ese tiempo. Los
                       estilos (alto del hero, font-size del texto) se escriben directo al DOM vía
                       refs dentro de un rAF, sin pasar por `setState` en cada frame — solo se
                       llama a `setState` una vez, al llegar a `locked = true`.

                       Dos bugs de esa primera reescritura, ya arreglados (2026-09-11):
                       1. Como el hero (fixed, cubre toda la pantalla) se va achicando en alto, el
                          hueco que queda abajo dejaba ver el Footer real (que vive en
                          `layout.tsx`, siempre montado, y quedaba pegado justo después de este
                          componente en el flujo del documento) — se veía "aparecer y desaparecer"
                          el footer apenas arrancabas a bajar. Se agregó un backdrop fijo
                          (`fixed inset-0 bg-[var(--bg)]`) SIEMPRE a 100vh detrás del hero, así el
                          hueco muestra el color de fondo, nunca contenido real.
                       2. El texto (eyebrow + título + subtítulo) escalaba con
                          `transform: scale()`, lo cual el navegador rasteriza al tamaño chico y
                          después estira — se ve borroso. Ahora se anima el `font-size` real de
                          cada uno por separado (medido de un clon invisible con las mismas clases
                          que el hero estático final, así el tamaño de destino siempre coincide
                          exacto con el breakpoint real — no un valor en px adivinado).

                       Además (mismo día): el progreso ya no salta directo al valor crudo del
                       input — un mouse wheel llega en pocos "notches" grandes, no como un flujo
                       continuo, así que saltar al valor exacto se sentía trabado/con pasos. Ahora
                       hay un `targetProgress` (el input crudo) y un `visualProgress` (lo que
                       realmente se dibuja), y cada frame de un loop de rAF continuo el visual se
                       acerca al target con un lerp (`EASE = 0.16`) — mismo truco que usan las
                       librerías de smooth-scroll. El "lock" final espera a que el visual también
                       haya convergido (`LOCK_EPSILON`), no solo el target, para no cortar en seco.

                       Probado primero solo en casa-l19-pueblo (vía un `ANIMATED_HERO_SLUGS` que
                       ya no existe) antes de aplicarse a los 15 proyectos el mismo día
                       (2026-09-11), una vez que el usuario confirmó que le gustaba el resultado.
  LocationMap.tsx      Mapa de Leaflet (Nosotros) con la ubicación del estudio — ver Stack arriba
                       para el detalle de tiles/CSP. Import dinámico de `leaflet` dentro de un
                       useEffect (no en el top del módulo) porque la librería toca `window` en el
                       import y rompería el SSR/build si no. Marcador y popup con divIcon/HTML
                       propios (nada de los íconos PNG default de Leaflet). `scrollWheelZoom`
                       arranca deshabilitado y se habilita recién con foco/click, para no atrapar
                       el scroll de la página al pasar el mouse por encima.
  JsonLd.tsx           `<script type="application/ld+json">` genérico para datos estructurados.
  PanelProvider.tsx    Contexto compartido (`usePanel()`) que controla cuál de los dos paneles
                       deslizables de la derecha está abierto: "menu" | "contact" | null.
  RightPanel.tsx       Shell genérico del panel deslizable (backdrop + panel w-full sm:w-[420px],
                       misma transición para ambos). Lo usan tanto el menú de Navbar como
                       ContactPanel — así quedan garantizadas las mismas proporciones. Prop
                       `scrollable` (default true, disponible para casos futuros que sí necesiten
                       desactivarla). ContactPanel la pasó a `false` brevemente (2026-09-10, tras
                       sacarle los datos de contacto de abajo, asumiendo que ya no necesitaba
                       scrollear) pero eso rompía el formulario en pantallas bajas — con teclado
                       en pantalla o simplemente un celular con poca altura, el botón "Enviar
                       mensaje" quedaba cortado y sin forma de alcanzarlo. Revertido (2026-09-11)
                       a scrollable por defecto; en desktop/pantallas donde el contenido entra
                       igual no tiene ningún efecto visual.
  ContactPanel.tsx     Panel de contacto — encabezado + `ContactForm` únicamente. Antes tenía
                       también email/teléfono/dirección/Instagram, pero se sacó (2026-09-10) por
                       ser contenido repetido con el Footer y con lo que se sumó a Nosotros
                       (ver `LocationMap.tsx`); los íconos que usaba esa sección siguen en
                       `icons.tsx` sin usar, por si se reutilizan más adelante.
  ContactForm.tsx      Envía el formulario a Web3Forms (ver sección de abajo).
  ConsultanosButton.tsx   Botón que llama a `openContact()` del contexto — reemplaza cualquier
                       `<Link href="/contacto">` en Home, Servicios, Nosotros, ficha de proyecto
                       y Footer.
src/lib/
  gridSpans.ts         `getMosaicSpanClass(index)` — patrón 2-anchas/3-angostas del grid de
                       /proyectos en un contenedor de 6 columnas, cíclico por índice.
  galleryLayout.ts     `getGalleryTiles(images)` — usado en la galería de la ficha de proyecto
                       (`proyectos/[slug]/page.tsx`). A cada imagen le asigna un tamaño de grid
                       (col-span/row-span) según su orientación REAL (aspect ratio de
                       `width`/`height`, no adivinado): horizontal → tile ancho, vertical → tile
                       alto, con un patrón fijo (cada 3ra imagen de cada orientación se agranda a
                       2x2) para que se vea variado sin ser aleatorio de verdad — mismo input
                       siempre da el mismo layout. Pedido explícito del usuario (2026-09-10): la
                       galería anterior era "sosa", todas las imágenes apretadas en una sola
                       columna con el mismo recorte forzado (aspect-video). El grid contenedor usa
                       `auto-rows-[Npx]` fijo + `grid-flow-row-dense` para que los tiles chicos
                       rellenen los huecos que dejan los grandes.
src/data/
  projects.ts   Modelo Project + array de los 15 proyectos + helpers (getProjectBySlug,
                getFeaturedProjects, getProjectsByTypology, typologyLabels, statusLabels).
                `gallery` es `GalleryImage[]` (`{ src, width, height }`), no `string[]` — el
                width/height real de cada foto es lo que alimenta `galleryLayout.ts`. Si se agrega
                una foto nueva a un proyecto, hay que poner sus dimensiones reales ahí (con
                `sharp` o cualquier lector de metadata), no inventarlas.
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
  `connect-src`/`form-action` incluyen `https://api.web3forms.com` explícitamente; `img-src`
  incluye `https://tile.openstreetmap.org` para los tiles del mapa de Nosotros.
- `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy:
  strict-origin-when-cross-origin`, `Permissions-Policy` (camera/microphone/geolocation
  deshabilitados — el sitio no los usa).
- Probado en dev, en `next build` y en `next start` (servidor de producción real) sin errores de
  consola ni violaciones de CSP, incluyendo el submit del formulario de contacto.
- Si en algún momento se agrega un script de terceros (analytics, mapa embebido, etc.), hay que
  sumar su dominio a `script-src`/`connect-src`/`frame-src` según corresponda — chequear la guía
  de Next antes de tocar el CSP.

## Sistema visual (2026-10-14, pasada con la skill `ui-ux-pro-max`)

Pasada de mejoras visuales en todo el sitio, hecha con la skill `ui-ux-pro-max` (instalada en
`~/.claude/skills/`). Su sistema de diseño sugería negro puro con acento blanco; se descartó
para mantener el dorado de marca, y de la skill se tomaron las reglas de contraste,
accesibilidad, motion y tipografía. **Pendiente de aprobación del cliente** (ver `PENDIENTES.md`).

- **Tipografía display:** Cormorant Garamond (`next/font`, variable `--font-display-serif`) vía
  la clase `.font-display`, solo para títulos grandes, citas, números y títulos de cards. Geist
  sigue para todo lo demás. Las palabras destacadas van en `<em>` dorado (itálica serif).
  Para volver a sans alcanza con sacar `.font-display` de los títulos o apuntar
  `--font-display` a Geist en `globals.css`.
- **Contraste:** `--text-secondary` #888 → #a6a6a6 y `--text-muted` #444 → #7c7c7c (el muted
  daba ~2:1, por debajo del 4.5:1 mínimo para texto).
- **Clases compartidas en `globals.css` (`@layer components`):** `.btn-primary`, `.btn-ghost`
  (mín. 48px de alto), `.link-arrow` (+ `.is-accent`, `.is-back`; subrayado que se dibuja al
  hover), `.eyebrow` (etiqueta uppercase con línea previa). Usarlas en cualquier CTA nuevo en
  vez de repetir strings largos de Tailwind. Flechas: `ArrowRightIcon`/`ArrowLeftIcon` de
  `icons.tsx`, no el carácter "→".
- **Motion:** easing `cubic-bezier(0.16,1,0.3,1)` en ScrollReveal y hovers; deriva lenta de la
  foto del hero de Home (`.hero-drift`); indicador de scroll con línea animada (`.scroll-line`,
  también en la intro de las fichas). `prefers-reduced-motion` respetado en CSS global,
  `ScrollReveal` (muestra el estado final directo) y `AnimatedProjectHero` (saltea la intro con
  scroll-jacking y monta el hero fijo).
- **Foco visible** global (`:focus-visible` con outline dorado) y `cursor: pointer` en botones
  (Tailwind v4 lo sacó del preflight).
- Home: franja de datos (solo hechos del informe, nada inventado), manifiesto como cita grande,
  servicios numerados que linkean a /servicios. ProjectCard: etiqueta de estado sobre la foto,
  velo + "Ver proyecto" al hover. Ficha: sidebar `lg:sticky`, navegación anterior/siguiente
  entre proyectos al final. Formulario: `<label htmlFor>` asociados, inputs `text-base` (evita
  el zoom de iOS), flecha propia en el select, spinner al enviar, error con `aria-live`.

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
- **Responsive (2026-09-11):** auditado a mano en 320px, 375px y 768px de ancho (sin overflow
  horizontal en ninguna página) después de que el usuario reportara que faltaba pulir mobile.
  Bugs reales encontrados y arreglados:
  - Portada de Nosotros (`fachada-bg.png`) usaba una altura fija (`min-h-[500px]`) en todos los
    tamaños — en una pantalla angosta eso fuerza un `object-cover` a recortar casi todo el ancho
    de la imagen (zoom excesivo, el cartel "B+G ARQUITECTOS" quedaba cortado). Ahora la altura es
    responsive (`h-[50vh] sm:h-[60vh] md:h-[70vh]` + min-heights a juego).
  - Lightbox de ProjectGallery: las flechas prev/next no tenían `z-index`, así que en pantallas
    angostas la imagen (que ocupa 90vw) las tapaba — les falta margen a los costados cuando el
    viewport es chico. Se les agregó `z-10` + `bg-black/40` (además sirve para verlas mejor
    encima de cualquier foto, no solo en mobile).
  - ProjectGallery en filas: el contenedor de cada fila tenía una altura FIJA en todos los
    breakpoints (`h-[320px] sm:h-[420px]...`), y las imágenes usaban `flex-grow` proporcional a
    su aspect ratio para repartirse el ANCHO en una fila horizontal. Por debajo de `sm:` las
    filas son `flex-col` (apiladas) — ahí ese mismo `flex-grow` reparte ALTURA en vez de ancho,
    así que una foto vertical en una fila con otras fotos quedaba aplastada a una tira finita.
    Fix: la altura fija del contenedor ahora es solo `sm:`+; por debajo, cada imagen usa
    `aspect-(--ar)` (variable CSS con su propio aspect ratio real) para altura propia, y el
    `flex-grow`/`flex-basis:0` proporcional solo se activa en `sm:` (`sm:grow-(--ar)
    sm:basis-0 sm:aspect-auto`) — mismo patrón: CSS custom property + utilidad arbitraria de
    Tailwind con el prefijo de breakpoint.

  Segunda ronda (mismo día, feedback después de probar lo de arriba) — **estos dos son
  deliberadamente mobile-only, no tocar el aspecto desktop sin que el usuario lo pida**:
  - Logo del Navbar corrido del margen izquierdo en mobile, no simétrico con el ícono de
    hamburguesa. Causa: `logo-bg1.png` tiene ~19px de relleno transparente incorporado a la
    izquierda de la marca visible (a la altura `h-9` que usa el Navbar) — el ícono de
    hamburguesa es puro CSS, sin ese relleno, así que con el mismo padding de contenedor
    terminaban asimétricos. En vez de recortar el PNG (eso cambiaría también el desktop, que el
    usuario dijo que ya está perfecto), se le agregó al link del logo un margen negativo que
    cancela ese relleno SOLO por debajo de `md:` (`-ml-[19px] md:ml-0`), mismo breakpoint que ya
    usa el header para su padding (`px-6 md:px-10`).
  - Footer en mobile: pasó de `grid-cols-1` (todo apilado en una columna) a `grid-cols-2` con la
    marca (logo/tagline/Instagram) en `col-span-2` (su propia fila arriba) y Navegación/Contacto
    como las dos columnas de abajo — "dos hileras verticales", pedido explícito del usuario.
    Texto de links/contacto bajado a `text-sm` (de `text-base`) en mobile únicamente
    (`text-sm md:text-base` en todos lados) para que entre cómodo en columnas más angostas — el
    email lleva `break-all` porque puede llegar a no entrar en una columna de mobile sin cortarse
    a la mitad de una palabra. De `md:` para arriba el grid vuelve a 3 columnas iguales
    (`md:grid-cols-3 md:col-span-1`) y el texto vuelve a `text-base`, sin cambios visuales ahí.

## Estado real vs. datos — gaps conocidos

Esto se armó en sesiones previas y quedó sin terminar en algunos puntos. Antes de asumir que
algo "ya está", verificar:

1. ~~Galerías de proyectos rotas~~ — resuelto (2026-09-10). El array `gallery` de cada proyecto
   en `src/data/projects.ts` apuntaba a nombres inventados (`render-01.jpg`, `foto-01.jpg`) que no
   existían; se reemplazó por los nombres reales de cada carpeta `public/projects/[slug]/`
   (`hero1.jpg`, `WhatsApp Image ... .jpeg`, nombres de export como `1_24 - Photo.jpg`, etc. —
   varios tienen espacios y paréntesis literales en el nombre, ya confirmado que funcionan bien
   con `next/image`, ver `team/fachada-bg.png` abajo: un `+` en el nombre SÍ rompe el optimizador). `cdkot` no tiene ninguna imagen
   más allá de `hero.jpg`, así que su `gallery` quedó en `[]` a propósito — no hay nada que
   mostrar, no es un bug. Verificado con un script que confirma que las 99 rutas (`heroImage` +
   `gallery` de los 15 proyectos) existen en disco con el mismo casing exacto (Windows no
   distingue mayúsculas/minúsculas en paths, pero un host Linux sí). Si se agregan fotos nuevas a
   un proyecto, listar la carpeta real (`ls public/projects/<slug>/`) antes de escribir el path
   en `projects.ts` — no asumir un patrón de nombres.
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
9. ~~Logo vectorial~~ — resuelto, en uso en Navbar (`/logo-bg1.png`) y Footer (`/logo-bg.png`).
10. ~~Sin mapa de ubicación~~ — resuelto (2026-09-10), `LocationMap.tsx` en Nosotros. Coordenadas
    confirmadas por el usuario vía Plus Code de Google Maps (no geocodificadas a ciegas — la
    geocodificación automática por dirección no daba precisión de altura/puerta).
11. **`public/logo-bg2.png` no se usa en ningún componente — a propósito, no borrar.** Es el
    wordmark minimalista que antes vivía en `logo-bg1.png`; el usuario lo reemplazó por un
    isotipo (2026-09-10) pero pidió explícitamente conservar el wordmark por si el cliente
    termina prefiriendo esa opción. Tres logos conviven hoy: `logo-bg.png` (wordmark completo
    "ARQUITECTOS", Footer), `logo-bg1.png` (isotipo, Navbar), `logo-bg2.png` (wordmark
    minimalista, sin usar, en reserva).

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
