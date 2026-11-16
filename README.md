# Colegio Genes - Plataforma Web e Intranet Institucional

Plataforma web institucional y landing page adaptativa para el **Colegio Genes**, diseñada con estándares modernos de UX/UI para destacar la excelencia académica, el sistema preuniversitario, sedes en Lima Metropolitana, compendios académicos bimestrales, talleres de vacaciones útiles e historias de éxito de alumnos ingresantes.

🌐 **Sitio Web en Vivo (Vercel)**: [https://colegio-genes.vercel.app](https://colegio-genes.vercel.app)  
🚀 **Dashboard en Vercel**: [https://vercel.com/sturnz/colegio-genes](https://vercel.com/sturnz/colegio-genes)

---

## 🚀 Características Principales

- **Captura de Prospectos Institucional Completa**: Formularios homologados al 100% con los requerimientos de matrícula escolar peruana:
  - Nombres del Apoderado y DNI (validado a 8 dígitos numéricos).
  - Teléfono / WhatsApp y Correo Electrónico.
  - Nombres y Apellidos del Estudiante.
  - Colegio de Procedencia.
  - Sede de Interés (Los Olivos, Comas, SMP, Puente Piedra, Gamarra).
  - **Selector Dinámico de Grado**: Opciones dependientes del nivel educativo (Primaria: 1.° a 6.° / Secundaria: 1.° a 5.°).
- **Backend Institucional Serverless (Google Sheets & Apps Script)**:
  - Sincronización de leads en tiempo real con Google Sheets para el equipo comercial de admisiones.
  - Despacho automático de alerta por correo con tarjeta visual HTML.
  - Confirmación inmediata al apoderado vía correo electrónico.
  - Respaldo con derivación directa al canal de WhatsApp Oficial con mensaje precargado.
- **SEO On-Page Avanzado & Schema.org (Perú)**:
  - OpenGraph optimizado (`og:image`, `og:title`, `og:description`, `og:url`) y Twitter Cards para vistas previas en WhatsApp y redes sociales.
  - Datos Estructurados JSON-LD (`School`, `EducationalOrganization` y `FAQPage`) con las 8 sedes oficiales en Comas, Los Olivos, San Martín de Porres y Puente Piedra.
- **Sección Sedes con Precarga Rápida de Google Maps**:
  - Filtro interactivo por distrito (`Todas`, `Comas`, `San Martín de Porres`, `Los Olivos`, `Puente Piedra`).
  - Precarga anticipada (`preconnect` + precarga al pasar el cursor/tocar la tarjeta) para apertura instantánea de mapas en el modal, ruta directa en Google Maps y botón `"Postular a esta Sede"` con autoselección en el formulario de Admisión.
- **Analítica de Visitas e Interacciones en Tiempo Real**:
  - Contador de visitas en el pie de página y modal interactivo de métricas (`#analytics-modal`) con el ranking de secciones más vistas (`Admisión`, `Sistema de Trabajo`, `Sedes`, `Ingresantes`, etc.) e interacciones más frecuentes (`WhatsApp`, `Mapas de Sedes`, `Videos`, `Afiches`, `Formularios`).
- **Seguridad y Cabeceras HTTP (`vercel.json`)**:
  - Sanitización contra XSS (`escapeHtml`), campos honeypot anti-bots (`_gotcha`), rate-limiting de envíos, protección `noopener,noreferrer` y cabeceras HTTP de seguridad (`Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`).
- **Diseño 100% Adaptativo (Responsive `100dvh` + `clamp()`)**: Optimización fluida para dispositivos móviles (adaptable a barras de navegación superiores e inferiores), tablets y escritorio.
- **Activos 100% Locales en WebP/SVG**: Logotipos, imágenes de las 8 sedes, portadas de compendios y horarios alojados internamente en `assets/images/`.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend Core**: HTML5 Semántico, CSS3 Puro (Vanilla CSS con Custom Properties), JavaScript (ES6+ Asíncrono).
- **Backend / Webhook**: Google Apps Script (Web App REST) integrado con Google Sheets.
- **Librerías UI**: SweetAlert2 (Notificaciones modales interactivas), FontAwesome 6, Google Fonts (`Montserrat` y `Cinzel`).

---

## 📁 Estructura de Archivos del Proyecto

```text
colegio-genes/
├── assets/
│   └── images/
│       ├── logo.png                # Logotipo oficial Colegio Genes
│       ├── compendios/             # Portadas oficiales de compendios (1° a 4° Bimestre)
│       ├── sedes/                  # Imágenes oficiales de las 8 sedes de Lima
│       ├── vacaciones/             # Horarios oficiales del programa Vacaciones Útiles
│       ├── canales/                # Avatares oficiales de canales por grado
│       ├── hero_*.jpg              # Banners principales del carrusel
│       └── ingresantes_*.png       # Afiches de alumnos ingresantes
├── backend/
│   └── GoogleAppsScript_Genes.js   # Script para conectar con Google Sheets y correo
├── css/
│   └── styles.css                  # Hoja de estilos principal y responsive
├── js/
│   ├── config.js                   # Configuración del frontend (Webhook URL, WhatsApp)
│   └── main.js                     # Lógica interactiva y envío asíncrono
├── index.html                      # Landing page principal
└── README.md                       # Documentación del proyecto
```

---

## ⚙️ Configuración del Backend con Google Sheets

1. Abre [Google Sheets](https://sheets.new) y crea una hoja nueva (ej: `Leads Colegio Genes 2026`).
2. En el menú superior, ve a **Extensiones** > **Apps Script**.
3. Copia y pega el código de [`backend/GoogleAppsScript_Genes.js`](backend/GoogleAppsScript_Genes.js).
4. Edita el correo de destino en la variable `ADMIN_EMAIL` (por defecto: `admisiones@colegiogenes.edu.pe`).
5. Haz clic en **Implementar** > **Nueva implementación**:
   - **Tipo:** Aplicación web.
   - **Ejecutar como:** Yo (tu cuenta de Google).
   - **Quién tiene acceso:** Cualquier persona (*Anyone*).
6. Copia la URL generada (`https://script.google.com/macros/s/.../exec`).
7. Abre el archivo [`js/config.js`](js/config.js) y pega la URL en:
   ```javascript
   window.GENES_CONFIG = {
       googleAppsScriptUrl: 'TU_URL_DE_APPS_SCRIPT_AQUI',
       whatsappPhone: '51933840074'
   };
   ```

---

## 🔧 Ejecución Local para Desarrollo

```bash
# 1. Navegar a la carpeta del proyecto
cd colegio-genes

# 2. Iniciar servidor local HTTP en puerto 5500
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
