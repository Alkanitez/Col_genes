# Colegio Genes - Plataforma Web e Intranet Institucional

Plataforma web institucional multipágina y adaptativa para el **Colegio Genes**, diseñada con estándares modernos de UX/UI para destacar la excelencia académica, el sistema preuniversitario, sedes en Lima Metropolitana, compendios académicos bimestrales, talleres de vacaciones útiles e historias de éxito de alumnos ingresantes.

🌐 **Sitio Web en Vivo (Vercel)**: [https://colegio-genes.vercel.app](https://colegio-genes.vercel.app)  
🚀 **Dashboard en Vercel**: [https://vercel.com/sturnz/colegio-genes](https://vercel.com/sturnz/colegio-genes)

---

## 🚀 Características Principales

- **Arquitectura Multipágina SEO-Friendly (10 Rutas Dedicadas)**:
  - Cada sección principal cuenta con su propio archivo HTML, `<title>`, `<meta name="description">`, `canonical` y etiquetas Open Graph independientes, con compatibilidad de URLs limpias en **cPanel** (`.htaccess`) y **Vercel** (`cleanUrls: true`), además de redirección automática desde enlaces `#` antiguos.
- **Captura de Prospectos Institucional Completa**: Formularios homologados al 100% con los requerimientos de matrícula escolar peruana:
  - Nombres del Apoderado y DNI (validado a 8 dígitos numéricos).
  - Teléfono / WhatsApp y Correo Electrónico.
  - Nombres y Apellidos del Estudiante.
  - Colegio de Procedencia.
  - Sede de Interés (Los Olivos, Comas, SMP, Puente Piedra, Gamarra).
  - **Selector Dinámico de Grado**: Opciones dependientes del nivel educativo (Primaria: 1.° a 6.° / Secundaria: 1.° a 5.°).
- **Backend Institucional Serverless (Google Sheets & Apps Script)**:
  - Sincronización de leads en tiempo real con Google Sheets para el equipo comercial de admisiones.
  - Despacho automático de alerta por correo con tarjeta visual HTML y confirmación al apoderado.
  - Respaldo con derivación directa al canal de WhatsApp Oficial con mensaje precargado (y preselección automática de sede vía `admision.html?sede=...`).
- **SEO On-Page Avanzado & Schema.org (Perú)**:
  - OpenGraph optimizado (`og:image`, `og:title`, `og:description`, `og:url`), Twitter Cards, `sitemap.xml` y `robots.txt`.
  - Datos Estructurados JSON-LD (`School`, `EducationalOrganization` y `FAQPage`) con las 8 sedes oficiales en Comas, Los Olivos, San Martín de Porres y Puente Piedra.
- **Sección Sedes con Precarga Rápida de Google Maps**:
  - Filtro interactivo por distrito (`Todas`, `Comas`, `San Martín de Porres`, `Los Olivos`, `Puente Piedra`).
  - Precarga anticipada para apertura instantánea de mapas en modal, ruta directa en Google Maps y botón `"Postular a esta Sede"`.
- **Analítica de Visitas e Interacciones en Tiempo Real**:
  - Contador de visitas en el pie de página y modal interactivo de métricas (`#analytics-modal`).
- **Seguridad y Cabeceras HTTP (`.htaccess` y `vercel.json`)**:
  - Sanitización contra XSS (`escapeHtml`), campos honeypot anti-bots (`_gotcha`), rate-limiting de envíos, `Options -Indexes` en cPanel y cabeceras HTTP de seguridad.
- **CSS Limpio sin `!important` (`0` ocurrencias) y Activos 100% Locales**:
  - Logotipos, imágenes de las 8 sedes, portadas de compendios, talleres, afiches y horarios alojados internamente en `assets/images/`.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend Core**: HTML5 Semántico Multipágina, CSS3 Puro (Vanilla CSS con Custom Properties, 0 `!important`), JavaScript (ES6+ Asíncrono).
- **Backend / Webhook**: Google Apps Script (Web App REST) integrado con Google Sheets.
- **Librerías UI**: SweetAlert2 Local (`js/sweetalert2.min.js`), FontAwesome 6, Google Fonts (`Montserrat` y `Cinzel`).

---

## 📁 Estructura de Archivos del Proyecto

```text
colegio-genes/
├── assets/
│   └── images/
│       ├── logo.png / logo.svg          # Logotipos oficiales Colegio Genes
│       ├── favicon.png / og_preview.jpg # Ícono del navegador y vista previa WhatsApp/FB
│       ├── hero_*.webp / hero_*.png     # Banners del carrusel principal (Desktop y Móvil)
│       ├── compendios/                  # Portadas oficiales de compendios (1° a 4° Bimestre)
│       ├── sedes/                       # Fotos de las 8 sedes (alborada, losolivos, etc.)
│       ├── vacaciones/                  # Horarios y tarjetas de beneficios de Vacaciones Útiles
│       ├── canales/                     # Avatares de canales de YouTube por grado
│       ├── oficiales/                   # Talleres de primaria, proyectos y logos de universidades
│       ├── testimonios/                 # Fotos de alumnos egresados/ingresantes
│       └── ingresantes_*.webp           # Afiches oficiales por universidad (UNMSM, UNI, PUCP, UNAC)
├── backend/
│   └── GoogleAppsScript_Genes.js        # Script para conectar con Google Sheets y correo
├── css/
│   └── styles.css                       # Hoja de estilos única y responsive (NO editar para subir fotos)
├── js/
│   ├── config.js                        # Configuración del frontend (Webhook URL, WhatsApp)
│   ├── main.js                          # Lógica interactiva, videos, datos de sedes y rutas
│   └── sweetalert2.min.js               # Alertas modales en local
├── index.html                           # Ruta principal (Inicio / Hero / Pilares / Testimonios)
├── propuesta.html                       # Ruta /propuesta (Sistema de Trabajo Primaria y Secundaria)
├── sedes.html                           # Ruta /sedes (8 Sedes y mapa modal)
├── vacaciones.html                      # Ruta /vacaciones (Vacaciones Útiles y horarios)
├── videos-primaria.html                 # Ruta /videos-primaria (Videos educativos Primaria)
├── videos-secundaria.html               # Ruta /videos-secundaria (Videos educativos Secundaria)
├── canales-virtuales.html               # Ruta /canales-virtuales (Canales de YouTube por grado)
├── ingresantes.html                     # Ruta /ingresantes (Afiches de ingresantes por universidad)
├── contacto.html                        # Ruta /contacto (Atención a padres y formulario)
├── admision.html                        # Ruta /admision (Admisión 2026 y postulación)
├── .htaccess                            # Seguridad, WebP, GZIP, caché y URLs limpias para cPanel
├── vercel.json                          # Cabeceras de seguridad, cleanUrls y caché para Vercel
├── sitemap.xml                          # Mapa del sitio para Google Search Console
├── robots.txt                           # Reglas de rastreo para buscadores
└── README.md                            # Documentación y guía de actualización
```

---

## 🖼️ Guía Rápida para Publicaciones (Cómo Actualizar Imágenes y Enlaces sin Romper el Diseño)

> **Regla de Oro para el equipo de publicaciones:**  
> Para cambiar fotos, horarios, afiches o enlaces **NO necesitas tocar `css/styles.css`**. Todos los HTML tienen comentarios `<!-- [PUBLICACIONES] ... -->` señalando exactamente dónde cambiar cada recurso.

### 1. ¿Dónde está cada imagen y qué archivo editar?

| Lo que deseas actualizar | Carpeta / Archivo de imagen en `assets/images/` | Archivo donde se enlaza |
| :--- | :--- | :--- |
| **Banners principales (Hero)** | `hero_classroom_whiteboard.webp`, `hero_students.webp`, `hero_virtual_learning.webp`, `hero_mobile_slide1.webp`..`3.webp` | [`index.html`](index.html) |
| **Testimonios de ingresantes** | `testimonios/*.jpg` | [`js/main.js`](js/main.js) (`testimoniosIngresantes`) |
| **Fotos Primaria / Secundaria y Talleres** | `primaria_*.webp`, `secundaria_*.webp`, `oficiales/primaria/*` | [`propuesta.html`](propuesta.html) |
| **Compendios (1° a 4° Bimestre)** | `compendios/compendio_bimestre1.webp`..`4.webp` | [`propuesta.html`](propuesta.html) |
| **Fotos de las 8 Sedes** | `sedes/alborada.webp`, `losolivos.webp`, `smp.webp`, `norte.webp`, `primavera.webp`, `genes2.webp`, `gamarra.webp`, `pinar.webp` | [`sedes.html`](sedes.html) *(teléfonos y mapas en `js/main.js` → `sedesData`)* |
| **Horarios y Beneficios de Vacaciones** | `vacaciones/horario_primaria_nuevo.webp`, `horario_secundaria_nuevo.webp`, `beneficio_*.webp` | [`vacaciones.html`](vacaciones.html) |
| **Avatares y links de Canales YouTube** | `canales/*.svg` / `*.jpg` / `*.webp` | [`canales-virtuales.html`](canales-virtuales.html) |
| **Videos de Clases (links YouTube)** | *(Se obtienen directo de YouTube)* | [`js/main.js`](js/main.js) (`videosPrimariaData` / `videosSecundariaData`) |
| **Afiches de Ingresantes (UNMSM, UNI, PUCP, UNAC)** | `ingresantes_sanmarcos.webp`, `ingresantes_uni.webp`, `ingresantes_pucp.webp`, `ingresantes_callao.webp` | [`ingresantes.html`](ingresantes.html) |
| **Ilustración de Contacto** | `contacto_ilustracion.webp` | [`contacto.html`](contacto.html) |
| **Imagen al compartir por WhatsApp** | `og_preview.jpg` (`1200x630 px`) | Meta `og:image` en los `.html` |

---

### 2. Dos formas de actualizar una imagen en cPanel

#### Opción A: Reemplazar con el **mismo nombre** (más rápido, sin editar HTML)
1. Convierte la imagen nueva a **`.webp`** (recomendado para que cargue rápido) con el **mismo nombre exacto** del archivo actual (ejemplo: `horario_primaria_nuevo.webp`).
2. Entra a **cPanel → Administrador de archivos → `public_html/assets/images/vacaciones/`**.
3. Sube el archivo y acepta **Sobrescribir**.
4. **Importante (Caché)**: Como [`.htaccess`](.htaccess) guarda caché de imágenes por 1 año, los visitantes antiguos podrían ver la foto vieja por un tiempo. Si quieres que **todos la vean al instante**, usa la Opción B.

#### Opción B: Subir con **nombre nuevo** (recomendado para campañas nuevas)
1. Sube la imagen nueva a su carpeta en `assets/images/` con un nombre claro sin espacios ni tildes (ej. `horario_primaria_2027.webp`).
2. Abre el archivo HTML de esa sección (por ejemplo [`vacaciones.html`](vacaciones.html)) y busca el comentario `<!-- [PUBLICACIONES] ... -->`.
3. Cambia solo el texto dentro de `src="..."` (y en el horario también dentro de `openIngresanteModal('...', '...')`) por la nueva ruta:
   ```html
   <img src="assets/images/vacaciones/horario_primaria_2027.webp" alt="Horario Primaria 2027">
   ```
4. Guarda el archivo. Todos verán la imagen nueva de inmediato.

---

### 3. Buenas prácticas rápidas al preparar imágenes
- **Formato**: Usar **`.webp`** (pesa entre 60% y 80% menos que PNG/JPG).
- **Nombres de archivo**: Solo minúsculas, números y guion bajo `_` (sin espacios, tildes ni `ñ`). Ejemplo correcto: `afiche_san_marcos_2027.webp`.
- **Peso máximo recomendado**:
  - Banners Hero / Afiches / Horarios: menos de `250 KB`.
  - Tarjetas pequeñas (sedes, talleres, testimonios): menos de `100 KB`.
- **Número de WhatsApp general**: Se cambia en [`js/config.js`](js/config.js) (`whatsappPhone`) y en los enlaces `https://wa.me/51...` marcados en los HTML.

---

## 🌐 Checklist al Pasar al Dominio Oficial en cPanel

1. Subir todo el contenido de la carpeta raíz a `public_html/` (incluyendo el archivo oculto `.htaccess`).
2. Reemplazar `https://colegio-genes.vercel.app/` por `https://colegiogenes.edu.pe/` en los archivos `.html`, [`sitemap.xml`](sitemap.xml) y [`robots.txt`](robots.txt).
3. Enviar el nuevo `https://colegiogenes.edu.pe/sitemap.xml` en **Google Search Console**.

---

## ⚙️ Configuración del Backend con Google Sheets

1. Abre [Google Sheets](https://sheets.new) y crea una hoja nueva (ej: `Leads Colegio Genes 2026`).
2. En el menú superior, ve a **Extensiones** > **Apps Script**.
3. Copia y pega el código de [`backend/GoogleAppsScript_Genes.js`](backend/GoogleAppsScript_Genes.js).
4. Edita el correo de destino en la variable `ADMIN_EMAIL` (por defecto: `admisiones@colegiogenes.edu.pe`).
5. Haz clic en **Implementar** > **Nueva implementación** (**Aplicación web**, ejecutar como **Yo**, acceso **Cualquier persona**).
6. Copia la URL generada (`https://script.google.com/macros/s/.../exec`) y pégala en [`js/config.js`](js/config.js):
   ```javascript
   window.GENES_CONFIG = {
       googleAppsScriptUrl: 'TU_URL_DE_APPS_SCRIPT_AQUI',
       whatsappPhone: '51933840074'
   };
   ```

---

## 🔧 Ejecución Local para Desarrollo

```bash
cd colegio-genes
python -m http.server 5500
```
Acceder en el navegador a: `http://localhost:5500`

---

## 📝 Convención de Commits

Este proyecto sigue la norma de **Conventional Commits**:
- `feat:` Nuevas características.
- `fix:` Corrección de errores.
- `style:` Cambios de diseño/CSS sin afectar la funcionalidad.
- `docs:` Cambios en documentación.
- `chore:` Tareas generales y mantenimiento.
