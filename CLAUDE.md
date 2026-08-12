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
  contacto/page.tsx + ContactForm.tsx (client component)
src/components/
  Navbar.tsx    Fixed header, transparente sobre el hero de home, sólido en el resto
  Footer.tsx
  ProjectCard.tsx    Card de proyecto (usada en home, listado y "también en...")
  ProjectImage.tsx   Wrapper de next/image que hace fallback a /placeholder.svg en onError
src/data/
  projects.ts   Modelo Project + array de los 15 proyectos + helpers (getProjectBySlug,
                getFeaturedProjects, getProjectsByTypology, typologyLabels, statusLabels)
  site.ts       Config suelta del sitio (por ahora solo homeCover)
public/projects/[slug]/   Imágenes reales copiadas del pendrive, un directorio por proyecto
```

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
2. **Foto de equipo rota.** `nosotros/page.tsx` referencia `/team/equipo.jpg`; `public/team/`
   está vacía. Falta pedir/copiar esa foto (el informe menciona 6 fotos en la carpeta `Equipo\`
   del pendrive original).
3. **`public/projects/placeholder/`** existe pero está vacía — no se está usando.
4. **Formulario de contacto no envía nada.** `ContactForm.tsx` simula el envío con un
   `setTimeout`; hay un comentario explícito para integrar un servicio real (Resend, Formspree,
   etc.). No está conectado a ningún backend.
5. **Dominio sin confirmar.** `layout.tsx` tiene `openGraph.url: "https://estudioarqbg.com"`
   como placeholder — no está verificado que sea el dominio real que se va a usar.
6. **Sin `sitemap.ts` ni `robots.ts`** en `src/app/` todavía, pese a que el informe los pide.
7. **Sin JSON-LD** (`LocalBusiness`, `Person`) todavía, pese a que el informe lo pide para Home
   y Nosotros.
8. **Videos de obra sin incorporar** (el informe menciona `.mp4` de la carpeta de E25 como
   candidato para el hero).
9. **Logo:** hay `logo-bg.png`, `logo-bg.svg` y `B+G ARQUITECTOS-blanco.png` en `public/` ya
   cargados y en uso en el Navbar — este punto del informe (que decía que no había vector
   fácil) ya está resuelto.
10. **Un solo commit en el repo** ("Initial commit from Create Next App"): todo lo demás
    (páginas, componentes, datos, imágenes) está sin commitear. Confirmar con el usuario antes
    de armar commits grandes — puede preferir revisarlo por partes.

## Notas de sesión

Este CLAUDE.md fue reconstruido el 2026-08-12 después de que el usuario perdiera el original y
el historial de chat de esta sesión en VS Code. Se reconstruyó leyendo `informe-estudio-bg.md`
(que el usuario volvió a pegar en el repo) y auditando el estado real del código y de
`public/`. Si aparecen inconsistencias entre lo que dice este archivo y el código, confiar en el
código y corregir este archivo.
