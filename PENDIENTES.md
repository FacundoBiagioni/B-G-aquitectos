# Pendientes — sitio Estudio B+G

Última actualización: 2026-10-14. Todo lo que falta para dar el sitio por terminado y publicado,
separado entre lo que puede hacer Claude y lo que solo puede hacer Facundo (cuentas, pagos,
material que no está en el repo, decisiones con los clientes).

---

## Lo que tiene que hacer Facundo (sí o sí)

### Para publicar
- [ ] **Revisar las mejoras visuales en `localhost:3000`** y decidir si se suben a Vercel.
- [ ] **Comprar el dominio** y pasarme cuál es. Hoy `SITE_URL` apunta al placeholder
      `https://estudioarqbg.com` (sitemap, robots, canonical y
      Open Graph dependen de ese valor).
- [ ] **Cuenta de Vercel** (o acceso a la del estudio) y conectar el repo.
- [ ] **Cargar `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` en las variables de entorno de Vercel.**
      Vive solo en `.env.local` (no se sube a git): sin esto el formulario de contacto no envía en
      producción.
- [ ] Apuntar los DNS del dominio a Vercel (Vercel da las instrucciones al agregar el dominio).

### Con los clientes
- [ ] **Validar los datos de los 15 proyectos** (año, estado "en desarrollo / en obra /
      entregado", textos de concepto y descripción). Salieron del pendrive y del informe; hay que
      confirmar que estén al día.
- [ ] **Pedir permiso para mostrar nombres de clientes** en las fichas: hoy aparecen "Jorge y
      Nora", "Vanesa y Gustavo", "Natalia y Ariel", "Lorena y Javier", "Amparo y Gastón" y
      "Andrea Jalo". Si alguno no quiere, se reemplaza por barrio/lote.
- [x] **Aprobar el nuevo estilo visual** — aprobado por Facundo (2026-10-14) salvo las
      tipografías, que quedan para cambiar (ver pendientes de Claude).
- [ ] **Elegir logo definitivo del Navbar**: isotipo actual (`logo-bg1.png`) o el wordmark
      minimalista guardado (`logo-bg2.png`).

### Material que falta
- [ ] **Videos de obra (`.mp4`) de la carpeta de E25** del pendrive, para evaluar usarlos de
      fondo en el hero de la Home o en la ficha de E25.
- [ ] **Fotos para CDKOT**: hoy solo tiene la portada, la galería está vacía.
- [ ] (Opcional) **Retratos individuales** de José Luis y Kevin para la página Nosotros.
- [ ] (Opcional) Testimonios de clientes, si quieren sumar una sección de reseñas.

### Fuera del sitio (SEO local)
- [ ] **Google Business Profile**: crear o reclamar "Estudio B+G Arquitectura", categoría
      Arquitecto, dirección Cno. Centenario 2744 Gonnet, subir 10+ fotos de proyectos.
- [ ] **Pedir reseñas en Google** a clientes con obra terminada.
- [ ] **Google Search Console**: verificar el dominio y enviar `/sitemap.xml` (una vez publicado).
- [ ] Poner el link del sitio en la bio de Instagram `@estudioarq.bg`.
- [ ] (Opcional) Email con el dominio propio (ej. `contacto@dominio`) en vez de Gmail.

---

## Lo que puede hacer Claude

### Apenas Facundo lo habilite
- [ ] Actualizar `SITE_URL` en `src/data/site.ts` con el dominio real.
- [ ] Deploy a Vercel (cuando se apruebe) y probar en producción: formulario, headers/CSP, mapa.
- [ ] Integrar los videos de E25 (comprimirlos, `<video autoPlay muted loop playsInline>` con
      poster y respetando "reducir movimiento").
- [ ] Cargar fotos nuevas que lleguen (optimizar con `scripts/optimize-images.mjs`, medir
      dimensiones reales para `projects.ts`).
- [ ] Ajustar textos/estados/nombres de proyectos según lo que respondan los clientes.

### Se puede hacer ya
- [ ] **Cambiar las tipografías.** El resto del rediseño quedó aprobado (2026-10-14), pero la
      combinación Cormorant Garamond (títulos) + Geist (texto) no convence a Facundo. Proponer
      alternativas (idealmente mostrando 2-3 opciones lado a lado antes de aplicar). El cambio
      está concentrado en `.font-display` / `--font-display` (`globals.css`) y la carga de la
      fuente en `layout.tsx`.
- [ ] **Página 404 propia** (`src/app/not-found.tsx`) con el estilo del sitio; hoy sale la
      genérica de Next.
- [ ] **Filtro por estado en /proyectos** (Entregado / En obra / En desarrollo), además del de
      tipología — el informe lo pide explícitamente.
- [ ] **Centralizar datos de contacto**: email y teléfonos están escritos a mano en Navbar,
      Footer y ContactForm; pasarlos todos a `siteInfo` (`src/data/site.ts`).
- [ ] **Protección anti-spam del formulario** (campo honeypot `botcheck` que soporta Web3Forms).
- [ ] **Imagen Open Graph** para Proyectos y Servicios (hoy no definen una propia).
- [ ] Servir imágenes en **AVIF** además de WebP (`images.formats` en `next.config.ts`).
- [ ] Auditoría Lighthouse (performance, accesibilidad, SEO) sobre el sitio ya publicado.
- [ ] Borrar `public/projects/placeholder/` (carpeta vacía sin uso).
- [ ] (Opcional) Analytics (Vercel Analytics o similar) — requiere sumar dominios al CSP.

---

## Hecho en esta sesión (2026-10-14)
- Instalada la skill `ui-ux-pro-max` (en `~/.claude/skills/`).
- Pasada de mejoras visuales en todo el sitio — ver detalle en `CLAUDE.md`, sección
  "Sistema visual".
