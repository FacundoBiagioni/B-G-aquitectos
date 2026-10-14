# Pendientes — sitio Estudio B+G

Última actualización: 2026-10-14 (después de la reunión con los clientes). Todo lo que falta para
dar el sitio por terminado, separado entre lo que puede hacer Claude y lo que solo puede hacer
Facundo (cuentas, material que no está en el repo, decisiones con los clientes).

Sitio publicado (preview, sin dominio propio todavía): https://arquitectosbg.vercel.app

---

## Pedidos de la reunión con los clientes (2026-10-14)

Resumen de lo que salió de la reunión. Cada punto está repetido abajo, en la lista de quien lo
tiene que hacer.

1. Página de error 404 propia.
2. Contacto por WhatsApp, cómodo y estético — **nada de la burbuja verde flotante** típica.
3. En el menú desplegable, invertir Servicios y Nosotros: Inicio, Proyectos, **Nosotros**,
   **Servicios**, Contacto.
4. Armonizar visualmente con IA todas las imágenes de las obras.
5. Sumar más imágenes a las obras que no tienen o tienen muy pocas.
6. Portada del inicio con animación atada al scroll, que se sienta como un video
   (posiblemente con una skill de scroll).
7. Conectar el formulario de contacto al mail oficial del estudio.

---

## Lo que tiene que hacer Facundo (sí o sí)

### Para el formulario y WhatsApp
- [x] Mail oficial confirmado: **`estudioarq.bg@gmail.com`**.
- [ ] **Asegurar que la Access Key de Web3Forms entregue en ese mail.** La key se crea atada a un
      mail; si la actual se generó con otro (por ejemplo el personal de Facundo), los mensajes
      llegan ahí. Desde web3forms.com: o cambiar el mail de la key actual, o generar una nueva
      con `estudioarq.bg@gmail.com` (llega a esa casilla) y pasármela.
- [x] WhatsApp: se usan los dos socios, con mensaje pre-armado (aprobado 2026-10-14).

### Material que falta
- [ ] **Fotos para las obras con pocas o ninguna imagen.** Fotos de galería hoy (sin contar la
      portada), de menor a mayor — prioridad las 4 primeras:

      | Obra | Fotos |
      |---|---|
      | CDKOT | 0 |
      | LABCA | 1 |
      | Casa 4F (Las Huertas) | 3 |
      | Fincas de Duggan 15b | 3 |
      | Casa L19 (Pueblo) | 5 |
      | Edificio E14 | 5 |
      | Casa Campos de Roca, Casa JUZE, Duggan 2 — 305, DX Castells Village | 6 c/u |
      | Benoit 51 | 7 |
      | Casa Andrea Jalo, Edificio HIARQ E25 | 8 c/u |
      | Casa Miralagos | 9 |
      | Casa Jorge y Nora | 11 |
- [ ] **Material para la portada animada**: si es un video real, el `.mp4` (por ejemplo los de
      obra de E25 del pendrive); si es una secuencia generada, decidir sobre qué proyecto/imagen.
- [ ] (Opcional) **Retratos individuales** de José Luis y Kevin para la página Nosotros.
- [ ] (Opcional) Testimonios de clientes, si quieren sumar una sección de reseñas.

### Con los clientes
- [ ] (Si se quiere IA generativa para las fotos) **cargar créditos en Higgsfield**: hoy la
      cuenta está en plan gratis con 0 créditos.
- [ ] **Aprobar el criterio de armonización de imágenes con IA** sobre una muestra antes de
      aplicarlo a todo (cuánto se puede retocar una foto de obra real sin que deje de ser fiel).
- [ ] **Validar los datos de los 15 proyectos** (año, estado "en desarrollo / en obra /
      entregado", textos de concepto y descripción).
- [ ] **Pedir permiso para mostrar nombres de clientes** en las fichas: hoy aparecen "Jorge y
      Nora", "Vanesa y Gustavo", "Natalia y Ariel", "Lorena y Javier", "Amparo y Gastón" y
      "Andrea Jalo". Si alguno no quiere, se reemplaza por barrio/lote.
- [ ] **Elegir logo definitivo del Navbar**: isotipo actual (`logo-bg1.png`) o el wordmark
      minimalista guardado (`logo-bg2.png`).
- [x] Aprobar el nuevo estilo visual y las tipografías (opción C) — aprobado (2026-10-14).

### Dominio y publicación
- [ ] **Comprar el dominio** y pasarme cuál es. Hoy `SITE_URL` apunta al placeholder
      `https://estudioarqbg.com` (sitemap, robots, canonical y Open Graph dependen de ese valor).
- [ ] Apuntar los DNS del dominio a Vercel (Vercel da las instrucciones al agregar el dominio).
- [x] Cuenta de Vercel y variable `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` cargada (proyecto
      `arquitectosbg`).

### Fuera del sitio (SEO local)
- [ ] **Google Business Profile**: crear o reclamar "Estudio B+G Arquitectura", categoría
      Arquitecto, dirección Cno. Centenario 2744 Gonnet, subir 10+ fotos de proyectos.
- [ ] **Pedir reseñas en Google** a clientes con obra terminada.
- [ ] **Google Search Console**: verificar el dominio y enviar `/sitemap.xml`.
- [ ] Poner el link del sitio en la bio de Instagram `@estudioarq.bg`.
- [ ] (Opcional) Email con el dominio propio (ej. `contacto@dominio`) en vez de Gmail.

---

## Lo que puede hacer Claude

### Pedidos de la reunión
- [x] **Página 404 propia** (`src/app/not-found.tsx`) — hecha.
- [x] **Orden del menú**: Servicios 3.º y Nosotros 4.º (menú y Footer) — hecho.
- [x] **Contacto por WhatsApp sin burbuja flotante** — hecho: tarjetas por socio en el panel
      de contacto, link en el menú e ícono junto a cada teléfono del Footer (`WhatsAppContact.tsx`,
      datos en `whatsappContacts` de `src/data/site.ts`).
- [ ] **Conectar el formulario al mail oficial** (`estudioarq.bg@gmail.com`): si hay Access Key
      nueva, cargarla en `.env.local` y en Vercel, redeploy y probar un envío real.
- [ ] **Portada del inicio con animación de scroll tipo video** (scroll-scrubbing: el avance de
      la "película" sigue al scroll). Instalar/evaluar la skill de scroll que se elija, armar la
      secuencia de frames o video, versión estática para "reducir movimiento" y mobile liviano.
      Ojo con convivir con el patrón actual (la intro de las fichas ya usa scroll-jacking).
- [ ] **Armonizar imágenes de obras.** Prueba hecha (2026-10-14) con Casa Jorge y Nora y
      Edificio E14: retoque de color automático no generativo (balance de blancos, niveles,
      contraste y un tono cálido común), con `pruebas-armonizacion/armonizar.mjs`. Las
      comparaciones antes/después están en `pruebas-armonizacion/<obra>/comparacion.jpg`
      (no se suben a git). Los originales en `public/` no se tocaron. Falta: que los clientes lo
      aprueben, y recién ahí aplicarlo a todo y re-optimizar. Una versión con IA generativa
      (Higgsfield) necesita créditos: la cuenta tiene 0.
- [x] Listar obras con pocas imágenes — hecho (tabla en "Material que falta").
- [ ] Cargar las fotos nuevas cuando lleguen (optimizar + dimensiones reales en `projects.ts`).

### Otros pendientes
- [x] **Tipografías**: opción C (Outfit + Work Sans) aplicada en todo el sitio; página de
      comparación `/tipografias` borrada.
- [ ] Actualizar `SITE_URL` en `src/data/site.ts` cuando haya dominio.
- [ ] **Filtro por estado en /proyectos** (Entregado / En obra / En desarrollo), además del de
      tipología. En pausa: a Facundo no le interesa tanto por ahora.
- [x] Centralizar datos de contacto en `siteInfo` / `whatsappContacts` (`src/data/site.ts`).
- [x] Protección anti-spam del formulario (honeypot `botcheck` de Web3Forms).
- [x] Imagen Open Graph para Proyectos y Servicios.
- [x] Imágenes en AVIF con WebP de respaldo.
- [x] Auditoría Lighthouse (celular, build de producción local). Resultado: accesibilidad,
      buenas prácticas y SEO 100; rendimiento Home 78 → 87-88. Arreglado en el camino: logos
      sin optimizar (277 KB → 1,5 KB), entrada del hero que esperaba al JS, paneles cerrados
      alcanzables con Tab (`inert`), marcador del mapa sin nombre accesible. Repetir sobre el
      dominio real cuando esté.
- [x] Borrada `public/projects/placeholder/`.
- [ ] (Opcional) Analytics (Vercel Analytics o similar) — requiere sumar dominios al CSP.

---

## Hecho (2026-10-14)
- Instalada la skill `ui-ux-pro-max` (en `~/.claude/skills/`).
- Pasada de mejoras visuales en todo el sitio — detalle en `CLAUDE.md`, sección "Sistema visual".
- Arreglada la foto de portada de Nosotros (el `+` en el nombre rompía el optimizador).
- El mapa de Nosotros ya no se superpone al menú/panel de contacto.
- Deploy a producción en Vercel (proyecto `arquitectosbg`).
- Página 404 propia.
- Menú y Footer: Servicios antes que Nosotros.
- Contacto por WhatsApp (panel, menú y Footer).
- Anti-spam, datos de contacto centralizados, OG images, AVIF, auditoría Lighthouse.
- Tipografías nuevas: Outfit + Work Sans.
