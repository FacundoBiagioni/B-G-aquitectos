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

- Next.js 16.2.9 (App Router), React 19.2, TypeScript, Tailwind CSS v4, ESLint 9.
- Sin base de datos ni backend propio — todo el contenido de proyectos vive hardcodeado en
  `src/data/projects.ts`.
- `npm run dev` / `npm run build` / `npm run lint`.

## Estructura

```
src/app/
  page.tsx              Home (hero, destacados, manifiesto, servicios, CTA)
  proyectos/page.tsx     Listado con filtro por tipología (ProyectosClient.tsx, client component)
  proyectos/[slug]/page.tsx   Ficha de proyecto (generateStaticParams + generateMetadata)
  nosotros/page.tsx      Equipo, formación, antecedentes institucionales
  servicios/page.tsx
  contacto/page.tsx      Ya NO es una página propia — renderiza <HomePage /> + <AutoOpenContact />
                         (abre el panel de contacto por efecto al montar). Existe solo para que
                         /contacto no rompa; ver sección "Panel de contacto" abajo.
src/components/
  Navbar.tsx           Fixed header, siempre transparente (sin fondo/borde en ningún estado),
                       se oculta al bajar scroll y reaparece al subir. El logo se demora un poco
                       más que el botón de menú al ocultarse (transition-delay).
  Footer.tsx
  ProjectCard.tsx      Card de proyecto (usada en home, listado y "también en...")
  ProjectImage.tsx     Wrapper de next/image que hace fallback a /placeholder.svg en onError
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
src/data/
  projects.ts   Modelo Project + array de los 15 proyectos + helpers (getProjectBySlug,
                getFeaturedProjects, getProjectsByTypology, typologyLabels, statusLabels)
  site.ts       Config suelta del sitio (por ahora solo homeCover)
public/projects/[slug]/   Imágenes reales copiadas del pendrive, un directorio por proyecto
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
  que cada entorno/deploy necesita la suya). Si el formulario devuelve error "no pudimos enviar
  el mensaje", lo primero a chequear es si esa variable está seteada.

## Convenciones de diseño

- Tema oscuro fijo, tokens CSS en `globals.css` (`--bg`, `--bg-surface`, `--bg-elevated`,
  `--border`, `--text-primary/secondary/muted`, `--accent` dorado `#c8a96e`). Se consumen como
  `var(--nombre)` directo en clases Tailwind (`bg-[var(--bg)]`), no como utilidades `bg-bg`.
- Tipografía Geist (`next/font/google`), pesos 300–600. Títulos en `font-light`, tracking amplio
  en labels/eyebrows (`tracking-[0.2em]` a `[0.3em]`, uppercase, texto chico).
- Layout: `max-w-[1400px] mx-auto px-6 md:px-10`. Grids de proyectos usan el truco de gap con
  `gap-px bg-[var(--border)]` + celdas `bg-[var(--bg)]` para simular separadores finos.
- Todas las imágenes de contenido (hero, galería, cards) van envueltas en `ProjectImage`, no en
  `next/image` directo, para tener el fallback a placeholder. El logo en Navbar sí usa
  `next/image` directo con `unoptimized`.

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
2. ~~Foto de equipo rota~~ — resuelto. `public/team/equipo.jpg` existe (el usuario la agregó).
3. **`public/projects/placeholder/`** existe pero está vacía — no se está usando.
4. **Formulario de contacto conectado a Web3Forms, pero falta la Access Key real.** Ver sección
   "Panel de contacto" más arriba. Sin `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` en `.env.local`, el
   formulario cae siempre en el estado de error ("no pudimos enviar el mensaje"). El usuario
   tiene que crear la cuenta gratuita en web3forms.com y pasar la key.
5. **Dominio sin confirmar.** `layout.tsx` tiene `openGraph.url: "https://estudioarqbg.com"`
   como placeholder — no está verificado que sea el dominio real que se va a usar.
6. **Sin `sitemap.ts` ni `robots.ts`** en `src/app/` todavía, pese a que el informe los pide.
7. **Sin JSON-LD** (`LocalBusiness`, `Person`) todavía, pese a que el informe lo pide para Home
   y Nosotros.
8. **Videos de obra sin incorporar** (el informe menciona `.mp4` de la carpeta de E25 como
   candidato para el hero).
9. ~~Logo vectorial~~ — resuelto, ya está en uso en Navbar/Footer.

## Notas de sesión

Este CLAUDE.md fue reconstruido el 2026-08-12 después de que el usuario perdiera el original y
el historial de chat de esta sesión en VS Code. Se reconstruyó leyendo `informe-estudio-bg.md`
(que el usuario volvió a pegar en el repo) y auditando el estado real del código y de
`public/`. Si aparecen inconsistencias entre lo que dice este archivo y el código, confiar en el
código y corregir este archivo.
