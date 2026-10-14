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
- [ ] **Definir el/los número(s) de WhatsApp**: ¿uno solo del estudio, o los dos socios
      (José Luis 0221 15 463-6769 / Kevin 0221 15 620-5669)? ¿Mensaje pre-armado al abrir el chat
      (ej. "Hola, vengo de la web y quería consultar por...")?

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
- [ ] **Aprobar el criterio de armonización de imágenes con IA** sobre una muestra antes de
      aplicarlo a todo (cuánto se puede retocar una foto de obra real sin que deje de ser fiel).
- [ ] **Validar los datos de los 15 proyectos** (año, estado "en desarrollo / en obra /
      entregado", textos de concepto y descripción).
- [ ] **Pedir permiso para mostrar nombres de clientes** en las fichas: hoy aparecen "Jorge y
      Nora", "Vanesa y Gustavo", "Natalia y Ariel", "Lorena y Javier", "Amparo y Gastón" y
      "Andrea Jalo". Si alguno no quiere, se reemplaza por barrio/lote.
- [ ] **Elegir logo definitivo del Navbar**: isotipo actual (`logo-bg1.png`) o el wordmark
      minimalista guardado (`logo-bg2.png`).
- [x] Aprobar el nuevo estilo visual — aprobado (2026-10-14) salvo las tipografías.

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
- [ ] **Contacto por WhatsApp sin burbuja flotante.** Propuesta: sumarlo como opción dentro del
      panel de contacto ya existente ("Escribinos por WhatsApp" junto al formulario), en el menú
      desplegable y en el Footer, con el ícono de línea fino del resto del sitio y link
      `https://wa.me/549221...` con mensaje pre-armado. Mostrar 1-2 variantes antes de aplicar.
      Depende de que Facundo defina el/los número(s).
- [ ] **Conectar el formulario al mail oficial** (`estudioarq.bg@gmail.com`): si hay Access Key
      nueva, cargarla en `.env.local` y en Vercel, redeploy y probar un envío real.
- [ ] **Portada del inicio con animación de scroll tipo video** (scroll-scrubbing: el avance de
      la "película" sigue al scroll). Instalar/evaluar la skill de scroll que se elija, armar la
      secuencia de frames o video, versión estática para "reducir movimiento" y mobile liviano.
      Ojo con convivir con el patrón actual (la intro de las fichas ya usa scroll-jacking).
- [ ] **Armonizar imágenes de obras con IA** (color, exposición, balance de blancos, cielo
      parejo). Hacer primero una prueba con 1-2 proyectos para aprobar, guardar los originales
      sin tocar y recién después aplicar a todo y re-optimizar.
- [x] Listar obras con pocas imágenes — hecho (tabla en "Material que falta").
- [ ] Cargar las fotos nuevas cuando lleguen (optimizar + dimensiones reales en `projects.ts`).

### Otros pendientes
- [ ] **Cambiar las tipografías.** La combinación Cormorant Garamond (títulos) + Geist (texto) no
      convence a Facundo. Mostrar 2-3 opciones lado a lado antes de aplicar. El cambio está
      concentrado en `.font-display` / `--font-display` (`globals.css`) y en `layout.tsx`.
- [ ] Actualizar `SITE_URL` en `src/data/site.ts` cuando haya dominio.
- [ ] **Filtro por estado en /proyectos** (Entregado / En obra / En desarrollo), además del de
      tipología — el informe lo pide explícitamente.
- [ ] **Centralizar datos de contacto**: email y teléfonos están escritos a mano en Navbar,
      Footer y ContactForm; pasarlos a `siteInfo` (`src/data/site.ts`). Conviene hacerlo junto
      con lo de WhatsApp.
- [ ] **Protección anti-spam del formulario** (campo honeypot `botcheck` de Web3Forms).
- [ ] **Imagen Open Graph** para Proyectos y Servicios (hoy no definen una propia).
- [ ] Servir imágenes en **AVIF** además de WebP (`images.formats` en `next.config.ts`).
- [ ] Auditoría Lighthouse (performance, accesibilidad, SEO) sobre el sitio publicado.
- [ ] Borrar `public/projects/placeholder/` (carpeta vacía sin uso).
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
