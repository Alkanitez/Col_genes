/* ==========================================================================
   COLEGIO GENES - JAVASCRIPT COMPLETO CON CANALES, VIDEOS Y NAVEGACIÓN
   ========================================================================== */

function closeDropdowns() {
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
}

function showSistemaSubSection(subId) {
    const mainSelection = document.getElementById('sistema-level-selection');
    const primariaDetail = document.getElementById('subseccion-primaria-detail');
    const secundariaDetail = document.getElementById('subseccion-secundaria-detail');
    
    if (mainSelection) mainSelection.style.display = 'none';
    if (primariaDetail) primariaDetail.style.display = 'none';
    if (secundariaDetail) secundariaDetail.style.display = 'none';

    if (subId === 'selection-main') {
        if (mainSelection) mainSelection.style.display = 'block';
    } else if (subId === 'primaria-detail') {
        if (primariaDetail) {
            primariaDetail.style.display = 'block';
            if (typeof showPrimaryChannel === 'function') {
                showPrimaryChannel('grado1');
            }
        }
    } else if (subId === 'secundaria-detail') {
        if (secundariaDetail) {
            secundariaDetail.style.display = 'block';
            if (typeof showSecundariaChannel === 'function') {
                showSecundariaChannel('grado1');
            }
        }
    }

    const targetSection = document.getElementById('propuesta') || document.getElementById('primaria');
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
}

const sectionSeoTitles = {
    'inicio': 'Colegio Genes | Sistema Educativo Preuniversitario 2026',
    'propuesta': 'Sistema de Trabajo - Primaria y Secundaria | Colegio Genes',
    'primaria': 'Nivel Primaria | Colegio Genes',
    'secundaria': 'Nivel Secundaria | Colegio Genes',
    'sedes': 'Nuestras Sedes en Lima Metropolitana | Colegio Genes',
    'vacaciones': 'Programa de Vacaciones Útiles 2026 | Colegio Genes',
    'ingresantes': 'Historias de Éxito e Ingresantes Destacados | Colegio Genes',
    'videos-primaria': 'Videos Educativos Nivel Primaria | Colegio Genes',
    'videos-secundaria': 'Videos Educativos Nivel Secundaria | Colegio Genes',
    'contacto': 'Contacto y Atención a Padres | Colegio Genes',
    'admision': 'Proceso de Admisión 2026 | Colegio Genes'
};

function updateActiveNavLink(id) {
    document.querySelectorAll('.nav-links a:not(.btn-admision)').forEach(a => a.classList.remove('active'));
    
    let linkId = 'link-' + id;
    if (id === 'propuesta' || id === 'sistema' || id === 'primaria' || id === 'secundaria') {
        linkId = 'link-propuesta';
    } else if (id === 'videos-primaria' || id === 'videos-secundaria' || id === 'canales-virtuales') {
        linkId = 'link-videos';
    }
    
    const activeLink = document.getElementById(linkId);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

function showSection(id, updateHash = true) {
    let targetId = id;
    if (id === 'sistema' || id === 'primaria') {
        targetId = 'propuesta';
    }

    // Ocultar todas las secciones y activar únicamente la solicitada
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(targetId) || document.getElementById(id);
    if (target) {
        target.classList.add('active');
    }
    
    updateActiveNavLink(id);

    if (id === 'propuesta' || id === 'sistema' || id === 'primaria') {
        showSistemaSubSection('selection-main');
    } else if (id === 'vacaciones') {
        const activeVacTab = document.querySelector('#vacaciones .vacaciones-tab.active');
        if (!activeVacTab) {
            const defaultVacBtn = document.getElementById('tab-vacaciones-primaria') || document.querySelector('#vacaciones .vacaciones-tab');
            showVacacionesPanel('vacaciones-primaria', defaultVacBtn);
        }
    }

    // Actualización dinámica de SEO Document Title y URL Hash
    if (sectionSeoTitles[id]) {
        document.title = sectionSeoTitles[id];
    }

    if (typeof trackSectionView === 'function') {
        trackSectionView(id);
    }

    if (targetId === 'sedes' && typeof preloadSedeMap === 'function') {
        preloadSedeMap('alborada');
    }

    if (updateHash && window.location.hash !== '#' + id) {
        history.pushState(null, '', '#' + id);
    }

    if (targetId === 'inicio') {
        setTimeout(() => centerTrack(), 50);
    }

    closeDropdowns();
    closeMobileMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Navegación por Hash / Deep Linking para Motores de Búsqueda (SEO)
function handleHashRouting() {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        let targetId = hash;
        if (hash === 'sistema' || hash === 'primaria') targetId = 'propuesta';
        if (document.getElementById(targetId) || document.getElementById(hash)) {
            showSection(hash, false);
        }
    }
}

window.addEventListener('popstate', handleHashRouting);
window.addEventListener('hashchange', handleHashRouting);

let testimonialIndex = 0;
let testimonialTimer = null;

const testimoniosIngresantes = [
    {
        nombre: "Valeria Torres",
        carrera: "Medicina Humana",
        universidad: "UNMSM - San Marcos",
        puesto: "1er. Puesto Cómputo General",
        comentario: "El sistema de Genes me dio la disciplina, el seguimiento constante y una base preuniversitaria inquebrantable. Sentí que cada simulacro semanal y cada tutoría personalizada me acercaban de verdad a mi ingreso.",
        avatar: "assets/images/testimonios/valeria_torres.jpg"
    },
    {
        nombre: "Diego Salazar",
        carrera: "Ingeniería de Sistemas",
        universidad: "UNI - U. Nacional de Ingeniería",
        puesto: "2do. Puesto Facultad de Sistemas",
        comentario: "Lo que más valoro de Colegio Genes es la exigencia bien orientada. No solo nos preparaban para resolver preguntas difíciles, sino para pensar con orden, velocidad y total confianza ante cualquier examen.",
        avatar: "assets/images/testimonios/diego_salazar.jpg"
    },
    {
        nombre: "Axel Fernández",
        carrera: "Ingeniería Industrial",
        universidad: "PUCP - U. Católica del Perú",
        puesto: "Ingreso Directo 1era Opción",
        comentario: "Genes me ayudó a fortalecer mi lógica matemática, comprensión lectora y constancia. El acompañamiento de las profesoras tutoras hizo que el proceso fuera exigente pero siempre motivador.",
        avatar: "assets/images/testimonios/axel_fernandez.jpg"
    },
    {
        nombre: "Yohan López",
        carrera: "Ingeniería de Alimentos",
        universidad: "UNAC - U. Nacional del Callao",
        puesto: "3er. Puesto General",
        comentario: "Aprendí a sostener un ritmo de estudio constante sin acumular dudas. Las clases en video de repaso y las evaluaciones continuas marcaron la diferencia para asegurar mi ingreso.",
        avatar: "assets/images/testimonios/yohan_lopez.jpg"
    },
    {
        nombre: "Lucía Fernández",
        carrera: "Psicología",
        universidad: "UNFV - U. Federico Villarreal",
        puesto: "1er. Puesto Especialidad",
        comentario: "En Genes encontré un ambiente académico de alta exigencia, pero al mismo tiempo un equipo de monitores que creía en nosotros. Logré ingresar con la tranquilidad de estar bien preparada.",
        avatar: "assets/images/testimonios/lucia_fernandez.jpg"
    }
];

function renderSingleTestimonioCard(cardElement, data) {
    if (!cardElement || !data) return;
    cardElement.innerHTML = `
        <div class="testimonio-left-profile">
            <div class="testimonio-avatar-ring">
                <img src="${data.avatar}" alt="${data.nombre}">
                <span class="testimonio-verify-check"><i class="fas fa-check"></i></span>
            </div>
            <div class="testimonio-profile-info">
                <h4>${data.nombre}</h4>
                <div class="testimonio-carrera-badge">${data.carrera}</div>
                <span class="testimonio-uni-tag">${data.universidad}</span>
            </div>
        </div>

        <div class="testimonio-right-body">
            <div class="testimonio-quote-header">
                <div class="testimonio-stars">
                    <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                    <span>(Ingreso Verificado en Primera Opción)</span>
                </div>
                <i class="fas fa-quote-right quote-giant-icon"></i>
            </div>

            <p class="testimonio-quote-text">
                "${data.comentario}"
            </p>

            <div class="testimonio-puesto-pill">
                <i class="fas fa-trophy" style="color: #D97706;"></i> ${data.puesto}
            </div>
        </div>
    `;
}

function animateTestimonioDotProgress() {
    const dots = document.querySelectorAll('#testimonio-dots-wrapper .testimonio-dot');
    dots.forEach((dot, dIdx) => {
        const progress = dot.querySelector('.testimonio-dot-progress');
        if (progress) {
            progress.style.transition = 'none';
            progress.style.width = '0%';
            if (dIdx === testimonialIndex) {
                void progress.offsetWidth;
                progress.style.transition = 'width 6.5s linear';
                progress.style.width = '100%';
            }
        }
    });
}

/* ─── CENTRAR EL TRACK SOBRE LA TARJETA ACTIVA (posición: tarjeta index=1) ─── */
function centerTrack() {
    const track = document.getElementById('testimonio-track');
    const viewport = track ? track.parentElement : null;
    const activeCard = document.getElementById('testimonio-card-active');
    if (!track || !viewport || !activeCard) return;

    const vpW = viewport.offsetWidth;
    const cardW = activeCard.offsetWidth;
    // Desplazamiento: queremos que el centro de la tarjeta activa (index=1 en el track)
    // coincida con el centro del viewport.
    // trackOffset = -(cardOffset_from_track_start) + (vpW - cardW)/2
    const cardOffsetLeft = activeCard.offsetLeft;
    const offset = -cardOffsetLeft + (vpW - cardW) / 2;
    track.style.transform = `translateX(${offset}px)`;
}

function renderTestimonio(index) {
    const len = testimoniosIngresantes.length;
    if (len === 0) return;

    const prevIndex = (index - 1 + len) % len;
    const nextIndex = (index + 1) % len;

    const cardPrev = document.getElementById('testimonio-card-prev');
    const cardActive = document.getElementById('testimonio-card-active');
    const cardNext = document.getElementById('testimonio-card-next');

    renderSingleTestimonioCard(cardPrev, testimoniosIngresantes[prevIndex]);
    renderSingleTestimonioCard(cardActive, testimoniosIngresantes[index]);
    renderSingleTestimonioCard(cardNext, testimoniosIngresantes[nextIndex]);

    // Actualizar clases de estado (blur/opacidad via CSS)
    if (cardPrev)   { cardPrev.className   = 'testimonio-card card-prev'; }
    if (cardActive) { cardActive.className = 'testimonio-card card-active'; }
    if (cardNext)   { cardNext.className   = 'testimonio-card card-next'; }

    // Animar contenido interno solo de la tarjeta activa
    if (cardActive) {
        cardActive.classList.add('testimonio-card-inner-swap');
        cardActive.addEventListener('animationend', () => {
            cardActive.classList.remove('testimonio-card-inner-swap');
        }, { once: true });
    }

    // Centrar el track sobre la tarjeta activa
    requestAnimationFrame(() => centerTrack());

    // Actualizar puntos de progreso
    const dots = document.querySelectorAll('#testimonio-dots-wrapper .testimonio-dot');
    dots.forEach((dot, dIdx) => {
        dot.classList.toggle('active', dIdx === index);
    });

    animateTestimonioDotProgress();
}

let isTestimonioAnimating = false;

function showTestimonio(index) {
    if (index === testimonialIndex || isTestimonioAnimating) return;
    testimonialIndex = index;
    renderTestimonio(testimonialIndex);
    startTestimonioAuto();
}

function prevTestimonio() {
    if (isTestimonioAnimating) return;
    isTestimonioAnimating = true;
    testimonialIndex = (testimonialIndex - 1 + testimoniosIngresantes.length) % testimoniosIngresantes.length;
    renderTestimonio(testimonialIndex);
    setTimeout(() => { isTestimonioAnimating = false; }, 550);
    startTestimonioAuto();
}

function nextTestimonio() {
    if (isTestimonioAnimating) return;
    isTestimonioAnimating = true;
    testimonialIndex = (testimonialIndex + 1) % testimoniosIngresantes.length;
    renderTestimonio(testimonialIndex);
    setTimeout(() => { isTestimonioAnimating = false; }, 550);
    startTestimonioAuto();
}

function startTestimonioAuto() {
    clearInterval(testimonialTimer);
    testimonialTimer = setInterval(function () {
        nextTestimonio();
    }, 6500);
}


/* --------------------------------------------------------------------------
   SUBPANELES DE PRIMARIA Y SECUNDARIA
   -------------------------------------------------------------------------- */
function showPrimariaPanel(panelId, button) {
    document.querySelectorAll('.primaria-panel').forEach(panel => panel.classList.remove('active'));
    document.querySelectorAll('#primaria .sistema-tab').forEach(tab => tab.classList.remove('active'));

    const targetPanel = document.getElementById(panelId);
    if (targetPanel) targetPanel.classList.add('active');
    if (button) button.classList.add('active');
}

function showSecundariaPanel(panelId, button) {
    document.querySelectorAll('.secundaria-panel').forEach(panel => panel.classList.remove('active'));
    document.querySelectorAll('#secundaria .sistema-tab').forEach(tab => tab.classList.remove('active'));

    const targetPanel = document.getElementById(panelId);
    if (targetPanel) targetPanel.classList.add('active');
    if (button) button.classList.add('active');
}

/* --------------------------------------------------------------------------
   CANALES POR GRADO (PRIMARIA Y SECUNDARIA)
   -------------------------------------------------------------------------- */
const primaryChannelsData = {
    grado1: {
        titulo: "1ro de Primaria",
        descripcion: "Accede al canal virtual oficial de 1er. Grado de Primaria para reforzar las clases y revisar el contenido académico.",
        link: "https://www.youtube.com/@genesclasevirtual1ro.prima508",
        imagen: "assets/images/canales/primaria_1.svg",
        disponible: true
    },
    grado2: {
        titulo: "2do de Primaria",
        descripcion: "Canal virtual oficial de 2do. Grado de Primaria para reforzamiento escolar y solucionarios.",
        link: "https://www.youtube.com/@genesclasevirtual2do.prima19",
        imagen: "assets/images/canales/primaria_2.svg",
        disponible: true
    },
    grado3: {
        titulo: "3ro de Primaria",
        descripcion: "El canal virtual de 3er. Grado de Primaria no se encuentra disponible por el momento.",
        link: "javascript:void(0);",
        imagen: "assets/images/canales/primaria_3.svg",
        disponible: false
    },
    grado4: {
        titulo: "4to de Primaria",
        descripcion: "Canal virtual oficial para 4to. Grado de Primaria. Refuerzo académico progresivo.",
        link: "https://www.youtube.com/@genesclasevirtual4to.prima398",
        imagen: "assets/images/canales/primaria_4.svg",
        disponible: true
    },
    grado5: {
        titulo: "5to de Primaria",
        descripcion: "Canal virtual para 5to. Grado de Primaria. Preparación con exigencia académica.",
        link: "https://www.youtube.com/@genesclasevirtual5to.prima354",
        imagen: "assets/images/canales/primaria_5.svg",
        disponible: true
    },
    grado6: {
        titulo: "6to de Primaria",
        descripcion: "Canal virtual oficial para 6to. Grado de Primaria. Preparación y consolidación de estudios.",
        link: "https://www.youtube.com/@genesclasevirtual6to.prima156",
        imagen: "assets/images/canales/primaria_6.svg",
        disponible: true
    }
};

function showPrimaryChannel(gradoKey, button) {
    const data = primaryChannelsData[gradoKey] || primaryChannelsData['grado1'];
    
    document.querySelectorAll('.canales-primaria-tabs .canal-primaria-tab').forEach(btn => btn.classList.remove('active'));
    if (button) {
        button.classList.add('active');
    } else {
        const defaultBtn = document.querySelector(`.canales-primaria-tabs .canal-primaria-tab[onclick*="${gradoKey}"]`) || document.querySelector('.canales-primaria-tabs .canal-primaria-tab');
        if (defaultBtn) defaultBtn.classList.add('active');
    }

    const titleEl = document.getElementById('primary-channel-title');
    const descEl = document.getElementById('primary-channel-description');
    const linkEl = document.getElementById('primary-channel-link');
    const imgEl = document.getElementById('primary-channel-image');

    if (titleEl) titleEl.textContent = data.titulo;
    if (descEl) descEl.textContent = data.descripcion;
    if (imgEl) imgEl.src = data.imagen;

    if (linkEl) {
        if (data.disponible === false) {
            linkEl.href = "javascript:void(0);";
            linkEl.style.background = "#64748B";
            linkEl.style.boxShadow = "none";
            linkEl.style.cursor = "not-allowed";
            linkEl.innerHTML = `<i class="fas fa-exclamation-circle"></i> Canal no disponible`;
        } else {
            linkEl.href = data.link;
            linkEl.style.background = "#FF0000";
            linkEl.style.boxShadow = "0 4px 12px rgba(255,0,0,0.3)";
            linkEl.style.cursor = "pointer";
            linkEl.innerHTML = `<i class="fab fa-youtube"></i> Ingresar al canal`;
        }
    }
}

const secondaryChannelsData = {
    grado1: {
        titulo: "1ro de Secundaria",
        descripcion: "Canal virtual oficial de 1er. Año de Secundaria. Clases de ciencias exactas y letras.",
        link: "https://www.youtube.com/@genesclasevirtual1rosecund681",
        imagen: "assets/images/canales/1ro_sec.webp",
        disponible: true
    },
    grado2: {
        titulo: "2do de Secundaria",
        descripcion: "Canal virtual oficial para 2do. Año de Secundaria. Explicaciones dinámicas y compendios.",
        link: "https://www.youtube.com/@genesclasevirtual2do.secun258",
        imagen: "assets/images/canales/2do_sec.webp",
        disponible: true
    },
    grado3: {
        titulo: "3ro de Secundaria",
        descripcion: "Canal virtual oficial para 3er. Año de Secundaria. Preparación preuniversitaria intensiva.",
        link: "https://www.youtube.com/@genesclasevirtual3ro.secun539",
        imagen: "assets/images/canales/3ro_sec.webp",
        disponible: true
    },
    grado4: {
        titulo: "4to de Secundaria",
        descripcion: "Canal virtual oficial para 4to. Año de Secundaria. Exigencia académica y preguntas de admisión.",
        link: "https://www.youtube.com/@genesclasevirtual4to.secun736",
        imagen: "assets/images/canales/4to_sec.webp",
        disponible: true
    },
    grado5: {
        titulo: "5to de Secundaria",
        descripcion: "Canal virtual oficial de 5to. Año de Secundaria. Máximo nivel con resolución de ejercicios tipo examen.",
        link: "https://www.youtube.com/@genesclasevirtual5to.secun175",
        imagen: "assets/images/canales/5to_sec.webp",
        disponible: true
    }
};

function showSecundariaChannel(gradoKey, button) {
    const data = secondaryChannelsData[gradoKey] || secondaryChannelsData['grado1'];
    
    document.querySelectorAll('.canales-secundaria-tabs .canal-secundaria-tab').forEach(btn => btn.classList.remove('active'));
    if (button) {
        button.classList.add('active');
    } else {
        const defaultBtn = document.querySelector(`.canales-secundaria-tabs .canal-secundaria-tab[onclick*="${gradoKey}"]`) || document.querySelector('.canales-secundaria-tabs .canal-secundaria-tab');
        if (defaultBtn) defaultBtn.classList.add('active');
    }

    const titleEl = document.getElementById('secondary-channel-title');
    const descEl = document.getElementById('secondary-channel-description');
    const linkEl = document.getElementById('secondary-channel-link');
    const imgEl = document.getElementById('secondary-channel-image');

    if (titleEl) titleEl.textContent = data.titulo;
    if (descEl) descEl.textContent = data.descripcion;
    if (imgEl) imgEl.src = data.imagen;

    if (linkEl) {
        if (data.disponible === false) {
            linkEl.href = "javascript:void(0);";
            linkEl.style.background = "#64748B";
            linkEl.style.boxShadow = "none";
            linkEl.style.cursor = "not-allowed";
            linkEl.innerHTML = `<i class="fas fa-exclamation-circle"></i> Canal no disponible`;
        } else {
            linkEl.href = data.link;
            linkEl.style.background = "#FF0000";
            linkEl.style.boxShadow = "0 4px 12px rgba(255,0,0,0.3)";
            linkEl.style.cursor = "pointer";
            linkEl.innerHTML = `<i class="fab fa-youtube"></i> Ingresar al canal`;
        }
    }
}

/* --------------------------------------------------------------------------
   VIDEOS EDUCATIVOS CON NOMBRES EXACTOS Y TRADICIONALES DE CURSOS DEL ORIGINAL
   -------------------------------------------------------------------------- */
const videosPrimariaData = {
    primaria1: {
        cursos: [
            { nombre: "Matemática", link: "https://youtu.be/9teroVL1Txg", icono: "fas fa-calculator" },
            { nombre: "Raz. Matemático", link: "https://youtu.be/Ppxgmqum0y8", icono: "fas fa-brain" },
            { nombre: "Comunicación", link: "https://youtu.be/X0OzTIUla04", icono: "fas fa-book-open" },
            { nombre: "Ortografía", link: "https://youtu.be/1bHUwUf1ey8", icono: "fas fa-pen-nib" },
            { nombre: "Raz. Verbal", link: "https://youtu.be/RyBfavmiKFY", icono: "fas fa-comments" },
            { nombre: "Plan Lector", link: "https://youtu.be/tPtPIr-TpHs", icono: "fas fa-book" },
            { nombre: "Personal Social", link: "https://youtu.be/zBjY51gl3GA", icono: "fas fa-users" },
            { nombre: "Ciencia y Tecnología", link: "https://youtu.be/UuxO4DgOkzE", icono: "fas fa-flask" },
            { nombre: "Computación", link: "https://youtu.be/7A3iMx2SRiU", icono: "fas fa-laptop" },
            { nombre: "Inglés", link: "https://youtu.be/wuqljG-5srk", icono: "fas fa-language" },
            { nombre: "Religión", link: "https://youtu.be/yfijolzXuis", icono: "fas fa-church" }
        ]
    },
    primaria2: {
        cursos: [
            { nombre: "Comunicación", link: "https://youtu.be/TrDPKqGbwYE", icono: "fas fa-book-open" },
            { nombre: "Ortografía", link: "https://youtu.be/6EF_gx39xd0", icono: "fas fa-pen-nib" },
            { nombre: "Matemática", link: "https://youtu.be/DFvta53hE8Q", icono: "fas fa-calculator" }
        ]
    },
    primaria4: {
        cursos: [
            { nombre: "Aritmética", link: "https://youtu.be/Xm55s-Ntnao", icono: "fas fa-calculator" },
            { nombre: "Álgebra", link: "https://youtu.be/Xm55s-Ntnao", icono: "fas fa-square-root-alt" },
            { nombre: "Geometría", link: "https://youtu.be/1P-5LGUOUYk", icono: "fas fa-draw-polygon" },
            { nombre: "Raz. Matemático", link: "https://youtu.be/ZcsxmVYIqQY", icono: "fas fa-brain" },
            { nombre: "Física", link: "https://youtu.be/P85iyTl4jZg", icono: "fas fa-atom" },
            { nombre: "Castellano", link: "https://youtu.be/hoqTe2RYZlI", icono: "fas fa-book-open" },
            { nombre: "Ortografía", link: "https://youtu.be/S2_tpWutdRU", icono: "fas fa-pen-nib" },
            { nombre: "Geografía", link: "https://youtu.be/N0PqN0z1EMQ", icono: "fas fa-globe-americas" },
            { nombre: "Biología", link: "https://youtu.be/zMCDIuCE8Lk", icono: "fas fa-dna" }
        ]
    },
    primaria5: {
        cursos: [
            { nombre: "Aritmética", link: "https://youtu.be/7i9--8Ymn98", icono: "fas fa-calculator" },
            { nombre: "Álgebra", link: "https://youtu.be/7_sCQAoUxik", icono: "fas fa-square-root-alt" },
            { nombre: "Geometría", link: "https://youtu.be/EI1klCxRFXY", icono: "fas fa-draw-polygon" },
            { nombre: "Raz. Matemático", link: "https://youtu.be/ZcsxmVYIqQY", icono: "fas fa-brain" },
            { nombre: "Física", link: "https://youtu.be/3DrWTdQNJaw", icono: "fas fa-atom" },
            { nombre: "Castellano", link: "https://youtu.be/HZu38xe-kAo", icono: "fas fa-book-open" },
            { nombre: "Historia", link: "https://youtu.be/TrJ85FRRxno", icono: "fas fa-landmark" },
            { nombre: "Geografía", link: "https://youtu.be/7Q7E3MBxQOY", icono: "fas fa-globe-americas" },
            { nombre: "Religión", link: "https://youtu.be/355PZDq58Nk", icono: "fas fa-church" }
        ]
    },
    primaria6: {
        cursos: [
            { nombre: "Aritmética", link: "https://youtu.be/j7noyIQBgdw", icono: "fas fa-calculator" },
            { nombre: "Álgebra", link: "https://youtu.be/mlJcuwu_OZI", icono: "fas fa-square-root-alt" },
            { nombre: "Geometría", link: "https://youtu.be/2-kqVHAsqCk", icono: "fas fa-draw-polygon" },
            { nombre: "Raz. Matemático", link: "https://youtu.be/8vhfj1c04NQ", icono: "fas fa-brain" },
            { nombre: "Física", link: "https://youtu.be/P85iyTl4jZg", icono: "fas fa-atom" },
            { nombre: "Ortografía", link: "https://youtu.be/S2_tpWutdRU", icono: "fas fa-pen-nib" },
            { nombre: "Castellano", link: "https://youtu.be/1b7kxMaZCqc", icono: "fas fa-book-open" },
            { nombre: "Historia", link: "https://youtu.be/VEGMHA7vt5Q", icono: "fas fa-landmark" },
            { nombre: "Biología", link: "https://youtu.be/JiGde8UlDEw", icono: "fas fa-dna" }
        ]
    }
};

const videosSecundariaData = {
    secundaria1: {
        cursos: [
            { nombre: "Aritmética", link: "https://youtu.be/YuhJnUJ9QtY", icono: "fas fa-calculator" },
            { nombre: "Geometría", link: "https://youtu.be/m8h4bRivpRQ", icono: "fas fa-draw-polygon" },
            { nombre: "Trigonometría", link: "https://youtu.be/nTpoHPz6JRw", icono: "fas fa-ruler-combined" },
            { nombre: "Física", link: "https://youtu.be/9ht-HF0A_04", icono: "fas fa-atom" },
            { nombre: "Química", link: "https://youtu.be/eYLTONYvzrU", icono: "fas fa-flask" },
            { nombre: "Raz. Matemático", link: "https://youtu.be/AJ9aImWArL0", icono: "fas fa-brain" },
            { nombre: "Castellano", link: "https://youtu.be/Ojxu790n7N4", icono: "fas fa-book-open" },
            { nombre: "Raz. Verbal", link: "https://youtu.be/tbbaq-7LpWs", icono: "fas fa-comments" },
            { nombre: "Literatura", link: "https://youtu.be/CEBwTjyszrg", icono: "fas fa-book" },
            { nombre: "Historia del Perú", link: "https://youtu.be/d9HEU8bR_Ec", icono: "fas fa-landmark" }
        ]
    },
    secundaria2: {
        cursos: [
            { nombre: "Aritmética", link: "https://youtu.be/CkTHe9tdZho", icono: "fas fa-calculator" },
            { nombre: "Álgebra", link: "https://youtu.be/1fCkLBKfbSw", icono: "fas fa-square-root-alt" },
            { nombre: "Geometría", link: "https://youtu.be/2gSCjy150UA", icono: "fas fa-draw-polygon" },
            { nombre: "Trigonometría", link: "https://youtu.be/QE6m2lqLjWE", icono: "fas fa-ruler-combined" },
            { nombre: "Física", link: "https://youtu.be/wpdWMDE2vec", icono: "fas fa-atom" },
            { nombre: "Raz. Matemático", link: "https://youtu.be/886B6a7ILys", icono: "fas fa-brain" },
            { nombre: "Literatura", link: "https://youtu.be/QsEeHvR9QIQ", icono: "fas fa-book" },
            { nombre: "Castellano", link: "https://youtu.be/qjMwNeZHKyc", icono: "fas fa-book-open" },
            { nombre: "Historia del Perú", link: "https://youtu.be/18qpqBMpnS0", icono: "fas fa-landmark" },
            { nombre: "Historia Universal", link: "https://youtu.be/qnr7ES6YVXw", icono: "fas fa-globe-europe" },
            { nombre: "Biología", link: "https://youtu.be/-JqaLvmNWiE", icono: "fas fa-dna" }
        ]
    },
    secundaria3: {
        cursos: [
            { nombre: "Aritmética", link: "https://youtu.be/L9l6JTgP_zE", icono: "fas fa-calculator" },
            { nombre: "Álgebra", link: "https://youtu.be/2xefkjRNenk", icono: "fas fa-square-root-alt" },
            { nombre: "Geometría", link: "https://youtu.be/EpAgant7-GU", icono: "fas fa-draw-polygon" },
            { nombre: "Trigonometría", link: "https://youtu.be/6UwFSicqPsM", icono: "fas fa-ruler-combined" },
            { nombre: "Raz. Matemático", link: "https://youtu.be/zVuCR85pWZE", icono: "fas fa-brain" },
            { nombre: "Física", link: "https://youtu.be/no4AVrjqm7c", icono: "fas fa-atom" },
            { nombre: "Química", link: "https://youtu.be/-9QWQdr5qg0", icono: "fas fa-flask" },
            { nombre: "Historia del Perú", link: "https://youtu.be/n5WLELhewPU", icono: "fas fa-landmark" },
            { nombre: "Raz. Verbal", link: "https://youtu.be/otZfmrIrVq0", icono: "fas fa-comments" },
            { nombre: "Geografía", link: "https://youtu.be/Q4jZW9liiJg", icono: "fas fa-globe-americas" },
            { nombre: "Biología", link: "https://youtu.be/oHEfWMJzMZk", icono: "fas fa-dna" }
        ]
    },
    secundaria4: {
        cursos: [
            { nombre: "Aritmética", link: "https://youtu.be/Q_dG6eBjTq4", icono: "fas fa-calculator" },
            { nombre: "Álgebra", link: "https://youtu.be/bJizDKcD9IE", icono: "fas fa-square-root-alt" },
            { nombre: "Geometría", link: "https://youtu.be/h0FQ-9SmKiE", icono: "fas fa-draw-polygon" },
            { nombre: "Trigonometría", link: "https://youtu.be/0NB0VOvF67Q", icono: "fas fa-ruler-combined" },
            { nombre: "Raz. Matemático", link: "https://youtu.be/4XcqNE6rmDk", icono: "fas fa-brain" },
            { nombre: "Física", link: "https://youtu.be/rk43txa9nq8", icono: "fas fa-atom" },
            { nombre: "Química", link: "https://youtu.be/gyv-K5sb3lo", icono: "fas fa-flask" },
            { nombre: "Raz. Verbal", link: "https://youtu.be/REpmWwFM_9k", icono: "fas fa-comments" },
            { nombre: "Historia Universal", link: "https://youtu.be/V_K9zIpgYys", icono: "fas fa-globe-europe" },
            { nombre: "Literatura", link: "https://youtu.be/ZuXoidxFZvY", icono: "fas fa-book" },
            { nombre: "Psicología - Filosofía", link: "https://youtu.be/FRB78oNlOFU", icono: "fas fa-brain" }
        ]
    },
    secundaria5: {
        cursos: [
            { nombre: "Aritmética", link: "https://youtu.be/Axf0AW-h0JU", icono: "fas fa-calculator" },
            { nombre: "Álgebra", link: "https://youtu.be/1o3xYm5a-N0", icono: "fas fa-square-root-alt" },
            { nombre: "Geometría", link: "https://youtu.be/JLrQZ31CcAY", icono: "fas fa-draw-polygon" },
            { nombre: "Trigonometría", link: "https://youtu.be/tOzTWQJxgPc", icono: "fas fa-ruler-combined" },
            { nombre: "Física", link: "https://youtu.be/73pjE53j2oo", icono: "fas fa-atom" },
            { nombre: "Química", link: "https://youtu.be/2jprOuTKHek", icono: "fas fa-flask" },
            { nombre: "Geografía", link: "https://youtu.be/kcXMUcuSrag", icono: "fas fa-globe-americas" },
            { nombre: "Literatura", link: "https://youtu.be/c00cpAMOauU", icono: "fas fa-book" },
            { nombre: "Historia del Perú", link: "https://youtu.be/CQEdk4sZU3c", icono: "fas fa-landmark" }
        ]
    }
};

/* --------------------------------------------------------------------------
   VIDEOS EDUCATIVOS - ASIGNACIÓN DE COLORES HARMONIOSOS POR ÁREA DE CURSO
   -------------------------------------------------------------------------- */
function getCourseTheme(nombre) {
    const n = nombre.toLowerCase();
    
    // MATEMÁTICAS (Azul Imperial / Navy)
    if (n.includes('mate') || n.includes('álgebra') || n.includes('geometría') || n.includes('trigono') || n.includes('aritmética') || n.includes('razonamiento mat')) {
        return { bg: 'rgba(32, 38, 130, 0.08)', border: 'rgba(32, 38, 130, 0.2)', color: '#202682', topBorder: '#202682' };
    }
    // CIENCIAS Y TECNOLOGÍA (Teal / Esmeralda)
    if (n.includes('física') || n.includes('química') || n.includes('biología') || n.includes('ciencia') || n.includes('ambiente')) {
        return { bg: 'rgba(13, 148, 136, 0.08)', border: 'rgba(13, 148, 136, 0.2)', color: '#0D9488', topBorder: '#0D9488' };
    }
    // HISTORIA Y SOCIALES (Ámbar Cálido / Bronce)
    if (n.includes('historia') || n.includes('geografía') || n.includes('cívica') || n.includes('economía') || n.includes('filosofía') || n.includes('personal social')) {
        return { bg: 'rgba(217, 119, 6, 0.08)', border: 'rgba(217, 119, 6, 0.2)', color: '#D97706', topBorder: '#D97706' };
    }
    // IDIOMAS, ARTE Y PSICOLOGÍA (Violeta / Índigo)
    if (n.includes('inglés') || n.includes('arte') || n.includes('psicología')) {
        return { bg: 'rgba(124, 58, 237, 0.08)', border: 'rgba(124, 58, 237, 0.2)', color: '#7C3AED', topBorder: '#7C3AED' };
    }
    // COMUNICACIÓN, LENGUAJE, LECTURA, LITERATURA, ORTOGRAFÍA (Carmesí Elegante)
    return { bg: 'rgba(185, 28, 28, 0.08)', border: 'rgba(185, 28, 28, 0.2)', color: '#B91C1C', topBorder: '#B91C1C' };
}

function getYoutubeThumbnail(link) {
    if (!link) return 'assets/images/logo.png';
    const match = link.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (match && match[1]) {
        return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
    }
    return 'assets/images/logo.png';
}

function renderVideosPrimaria(key) {
    const bloque = videosPrimariaData[key] || videosPrimariaData['primaria1'];
    const grid = document.getElementById("videos-edu-grid");
    if (!grid) return;
    grid.innerHTML = bloque.cursos.map(curso => {
        const theme = getCourseTheme(curso.nombre);
        const thumbUrl = getYoutubeThumbnail(curso.link);
        return `
            <article class="video-curso-card" style="border-top: 4px solid ${theme.topBorder};">
                <div class="video-thumbnail-container">
                    <img src="${thumbUrl}" alt="Portada ${curso.nombre}" class="video-thumbnail-img" loading="lazy">
                    <div class="video-play-overlay">
                        <i class="fab fa-youtube"></i>
                    </div>
                    <span class="video-course-badge" style="background: ${theme.color};"><i class="${curso.icono}"></i></span>
                </div>
                <div class="video-curso-body">
                    <h4>${curso.nombre}</h4>
                    <p>Videoclases y ejercicios explicados del curso por docentes especialistas.</p>
                    <a href="${curso.link}" target="_blank" rel="noopener noreferrer" class="btn-ver-video-yt">
                        <i class="fab fa-youtube"></i> Reproducir Clase
                    </a>
                </div>
            </article>
        `;
    }).join("");
}

function showVideosPrimaria(key, button) {
    document.querySelectorAll("#videos-primaria .canales-primaria-tabs .canal-primaria-tab").forEach(tab => tab.classList.remove("active"));
    if (button) button.classList.add("active");
    renderVideosPrimaria(key);
}

function renderVideosSecundaria(key) {
    const bloque = videosSecundariaData[key] || videosSecundariaData['secundaria1'];
    const grid = document.getElementById("videos-sec-grid");
    if (!grid) return;
    grid.innerHTML = bloque.cursos.map(curso => {
        const theme = getCourseTheme(curso.nombre);
        const thumbUrl = getYoutubeThumbnail(curso.link);
        return `
            <article class="video-curso-card" style="border-top: 4px solid ${theme.topBorder};">
                <div class="video-thumbnail-container">
                    <img src="${thumbUrl}" alt="Portada ${curso.nombre}" class="video-thumbnail-img" loading="lazy">
                    <div class="video-play-overlay">
                        <i class="fab fa-youtube"></i>
                    </div>
                    <span class="video-course-badge" style="background: ${theme.color};"><i class="${curso.icono}"></i></span>
                </div>
                <div class="video-curso-body">
                    <h4>${curso.nombre}</h4>
                    <p>Solucionarios, teoría preuniversitaria y compendios explicados en YouTube.</p>
                    <a href="${curso.link}" target="_blank" rel="noopener noreferrer" class="btn-ver-video-yt">
                        <i class="fab fa-youtube"></i> Reproducir Clase
                    </a>
                </div>
            </article>
        `;
    }).join("");
}

function showVideosSecundaria(key, button) {
    document.querySelectorAll("#videos-secundaria .canales-secundaria-tabs .canal-secundaria-tab").forEach(tab => tab.classList.remove("active"));
    if (button) button.classList.add("active");
    renderVideosSecundaria(key);
}

/* --------------------------------------------------------------------------
   SEDES - POPUP MODAL, FILTRO POR DISTRITO Y PRECARGA RÁPIDA DE GOOGLE MAPS
   -------------------------------------------------------------------------- */
const sedesData = {
    alborada: {
        nombre: "GENES ALBORADA",
        selectValue: "Genes Alborada",
        distrito: "Comas",
        nivel: "Primaria y Secundaria",
        direccion: "Av. Universitaria 9880",
        fijo: "015573002",
        celular: "945850041",
        correo: "genes1@colegiogenes.edu.pe",
        mapa: "https://www.google.com/maps?q=Av.%20Universitaria%209880%20Comas%20Lima&output=embed",
        mapsDirect: "https://www.google.com/maps/search/?api=1&query=Av.+Universitaria+9880+Comas+Lima"
    },
    genes2: {
        nombre: "GENES II",
        selectValue: "Genes II",
        distrito: "Comas",
        nivel: "Secundaria Preuniversitaria",
        direccion: "Av. Universitaria 8257, entre Av. Jamaica y Av. Micaela Bastidas",
        fijo: "015218596",
        celular: "945850081",
        correo: "genes2@colegiogenes.edu.pe",
        mapa: "https://www.google.com/maps?q=Av.%20Universitaria%208257%20Comas%20Lima&output=embed",
        mapsDirect: "https://www.google.com/maps/search/?api=1&query=Av.+Universitaria+8257+Comas+Lima"
    },
    losolivos: {
        nombre: "GENES LOS OLIVOS",
        selectValue: "Genes Los Olivos",
        distrito: "Los Olivos",
        nivel: "Primaria y Secundaria",
        direccion: "Av. Universitaria 5306, cruce con Av. Marañón",
        fijo: "015218596",
        celular: "963974465",
        correo: "geneslosolivos@colegiogenes.edu.pe",
        mapa: "https://www.google.com/maps?q=Av.%20Universitaria%205306%20Los%20Olivos%20Lima&output=embed",
        mapsDirect: "https://www.google.com/maps/search/?api=1&query=Av.+Universitaria+5306+Los+Olivos+Lima"
    },
    primavera: {
        nombre: "GENES PRIMAVERA",
        selectValue: "Genes Primavera",
        distrito: "Comas",
        nivel: "Primaria Integral",
        direccion: "Calle 2 Mz. G Lote 27 - Coop. Primavera",
        fijo: "015570144",
        celular: "933909609",
        correo: "genesprimavera@colegiogenes.edu.pe",
        mapa: "https://www.google.com/maps?q=Calle%202%20Mz.%20G%20Lote%2027%20Coop.%20Primavera%20Comas%20Lima&output=embed",
        mapsDirect: "https://www.google.com/maps/search/?api=1&query=Coop.+Primavera+Comas+Lima"
    },
    smp: {
        nombre: "GENES DE S.M.P.",
        selectValue: "Genes de S.M.P.",
        distrito: "San Martín de Porres",
        nivel: "Primaria y Secundaria",
        direccion: "Coop. Virgen de Fátima Mz. L Lote 3, Alt. Cdra. 19 Av. Carlos Izaguirre",
        fijo: "014852475",
        celular: "945850038",
        correo: "genessmp@colegiogenes.edu.pe",
        mapa: "https://www.google.com/maps?q=Av.%20Carlos%20Izaguirre%201900%20San%20Martin%20de%20Porres%20Lima&output=embed",
        mapsDirect: "https://www.google.com/maps/search/?api=1&query=Av.+Carlos+Izaguirre+cdra+19+San+Martin+de+Porres+Lima"
    },
    norte: {
        nombre: "GENES DEL NORTE",
        selectValue: "Genes del Norte",
        distrito: "Puente Piedra",
        nivel: "Primaria y Secundaria",
        direccion: "Urb. Leoncio Prado Mz. N Lt. 179, Panamericana Norte con Néstor Gambeta",
        fijo: "012889074",
        celular: "933840061",
        correo: "genesdelnorte@colegiogenes.edu.pe",
        mapa: "https://www.google.com/maps?q=Panamericana%20Norte%20con%20Nestor%20Gambeta%20Puente%20Piedra%20Lima&output=embed",
        mapsDirect: "https://www.google.com/maps/search/?api=1&query=Panamericana+Norte+con+Nestor+Gambeta+Puente+Piedra+Lima"
    },
    gamarra: {
        nombre: "GENES GAMARRA",
        selectValue: "Genes Gamarra",
        distrito: "San Martín de Porres",
        nivel: "Primaria y Secundaria",
        direccion: "Calle Germán Stiglich Mz. A Lote 3, Urb. Antares",
        fijo: "013987127",
        celular: "923852495",
        correo: "genesgamarra@colegiogenes.edu.pe",
        mapa: "https://www.google.com/maps?q=Calle%20German%20Stiglich%20Urb.%20Antares%20San%20Martin%20de%20Porres%20Lima&output=embed",
        mapsDirect: "https://www.google.com/maps/search/?api=1&query=Calle+German+Stiglich+Urb.+Antares+San+Martin+de+Porres+Lima"
    },
    pinar: {
        nombre: "GENES DEL PINAR",
        selectValue: "Genes del Pinar",
        distrito: "Comas",
        nivel: "Primaria y Secundaria",
        direccion: "Calle Los Naranjos Mz. H Lote 8 y 9 - Urb. El Pinar",
        fijo: "",
        celular: "945850041",
        correo: "genesdelpinar@colegiogenes.edu.pe",
        mapa: "https://www.google.com/maps?q=Calle%20Los%20Naranjos%20Urb.%20El%20Pinar%20Comas%20Lima&output=embed",
        mapsDirect: "https://www.google.com/maps/search/?api=1&query=Calle+Los+Naranjos+Urb.+El+Pinar+Comas+Lima"
    }
};

function filterSedes(distrito, button) {
    document.querySelectorAll('.sedes-filter-bar .sede-filter-btn').forEach(btn => btn.classList.remove('active'));
    if (button) button.classList.add('active');

    const cards = document.querySelectorAll('#sedes-grid-container .sede-card');
    cards.forEach(card => {
        const cardDist = card.getAttribute('data-distrito');
        if (distrito === 'todos' || cardDist === distrito) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Precarga inteligente del iframe de Google Maps al pasar el cursor o tocar la tarjeta
let currentLoadedMapUrl = '';
function preloadSedeMap(id) {
    const sede = sedesData[id];
    if (!sede) return;
    const modal = document.getElementById("sede-modal");
    const iframe = document.getElementById("sede-modal-mapa");
    if (!iframe || (modal && modal.classList.contains("open"))) return;

    if (currentLoadedMapUrl !== sede.mapa) {
        currentLoadedMapUrl = sede.mapa;
        iframe.src = sede.mapa;
    }
}

function openSedeModal(id) {
    const sede = sedesData[id];
    if (!sede) return;

    if (typeof trackInteraction === 'function') {
        trackInteraction('sedes');
    }

    document.getElementById("sede-modal-titulo").textContent = sede.nombre;
    document.getElementById("sede-modal-distrito").textContent = sede.distrito;
    document.getElementById("sede-modal-nivel").textContent = sede.nivel;
    document.getElementById("sede-modal-direccion").textContent = sede.direccion;

    const fijo = document.getElementById("sede-modal-fijo");
    if (fijo) {
        if (sede.fijo && sede.fijo.trim() !== "") {
            fijo.style.display = "flex";
            fijo.innerHTML = `<i class="fas fa-phone-alt"></i> <span>Fijo: ${sede.fijo}</span>`;
            fijo.href = `tel:${sede.fijo}`;
        } else {
            fijo.style.display = "none";
        }
    }

    const celular = document.getElementById("sede-modal-celular");
    if (celular) {
        celular.innerHTML = `<i class="fab fa-whatsapp"></i> <span>WhatsApp: ${sede.celular}</span>`;
        celular.href = `https://wa.me/51${sede.celular}?text=${encodeURIComponent(`Hola Colegio Genes (Sede ${sede.nombre}), deseo solicitar información sobre vacantes y el proceso de admisión.`)}`;
    }

    const correo = document.getElementById("sede-modal-correo");
    if (correo) {
        correo.innerHTML = `<i class="far fa-envelope"></i> <span>${sede.correo}</span>`;
        correo.href = `mailto:${sede.correo}`;
    }

    const gmapsLink = document.getElementById("sede-modal-gmaps-link");
    if (gmapsLink) {
        gmapsLink.href = sede.mapsDirect || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(sede.direccion + ' ' + sede.distrito)}`;
    }

    const postularBtn = document.getElementById("sede-modal-postular-btn");
    if (postularBtn) {
        postularBtn.onclick = function() {
            closeSedeModal();
            showSection('admision');
            setTimeout(() => {
                const sedeSelect = document.getElementById('adm-sede');
                if (sedeSelect && sede.selectValue) {
                    sedeSelect.value = sede.selectValue;
                    sedeSelect.dispatchEvent(new Event('change'));
                }
            }, 150);
        };
    }

    const iframe = document.getElementById("sede-modal-mapa");
    const loader = document.getElementById("sede-map-loader");
    if (iframe) {
        if (currentLoadedMapUrl === sede.mapa && iframe.getAttribute('src') === sede.mapa) {
            if (loader) loader.classList.remove("active");
        } else {
            if (loader) loader.classList.add("active");
            currentLoadedMapUrl = sede.mapa;
            const hideMapLoader = () => {
                if (loader) loader.classList.remove("active");
            };
            iframe.onload = hideMapLoader;
            iframe.src = sede.mapa;
            setTimeout(hideMapLoader, 1100);
        }
    }

    const modal = document.getElementById("sede-modal");
    if (modal) {
        modal.classList.add("open");
        document.body.style.overflow = "hidden";
    }
}

function closeSedeModal() {
    const modal = document.getElementById("sede-modal");
    if (modal) {
        modal.classList.remove("open");
        document.body.style.overflow = "";
    }
}

function showVacacionesPanel(panelId, button) {
    document.querySelectorAll('.vacaciones-panel').forEach(panel => panel.classList.remove('active'));
    document.querySelectorAll('#vacaciones .vacaciones-tab, #vacaciones .canal-primaria-tab').forEach(tab => tab.classList.remove('active'));

    const target = document.getElementById(panelId);
    if (target) target.classList.add('active');

    let btn = button;
    if (!btn) {
        if (panelId === 'vacaciones-primaria') {
            btn = document.getElementById('tab-vacaciones-primaria');
        } else if (panelId === 'vacaciones-secundaria') {
            btn = document.getElementById('tab-vacaciones-secundaria');
        }
    }
    if (btn) btn.classList.add('active');
}

/* TOGGLES DROPDOWN CON AUTO-CLOSE */
function toggleVideosDropdown(event) {
    event.preventDefault();
    event.stopPropagation();
    const dropdown = document.getElementById('dropdown-videos');
    const sistemaDropdown = document.getElementById('dropdown-sistema');
    if (sistemaDropdown) sistemaDropdown.classList.remove('open');
    if (dropdown) dropdown.classList.toggle('open');
}

function toggleMobileMenu() {
    const nav = document.querySelector("nav");
    const siteNav = document.getElementById("site-nav");
    const overlay = document.getElementById("mobile-nav-overlay");
    if (nav) {
        const isOpen = nav.classList.toggle("nav-open");
        if (siteNav) siteNav.classList.toggle("nav-open", isOpen);
        if (overlay) overlay.classList.toggle("active", isOpen);
        document.body.style.overflow = isOpen ? "hidden" : "";
    }
}

function closeMobileMenu() {
    const nav = document.querySelector("nav");
    const siteNav = document.getElementById("site-nav");
    const overlay = document.getElementById("mobile-nav-overlay");
    if (nav) nav.classList.remove("nav-open");
    if (siteNav) siteNav.classList.remove("nav-open");
    if (overlay) overlay.classList.remove("active");
    document.body.style.overflow = "";
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        closeDropdowns();
    }
});

/* --------------------------------------------------------------------------
   HERO BANNER SLIDER AUTOMÁTICO (CAMBIO CADA 5 SEGUNDOS)
   -------------------------------------------------------------------------- */
let currentHeroSlide = 0;
let heroSlideTimer = null;
const HERO_SLIDE_INTERVAL = 5000;

function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    if (!slides || slides.length === 0) return;

    startHeroSlideTimer();
}

function renderHeroSlide(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');

    if (!slides || slides.length === 0) return;

    currentHeroSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentHeroSlide);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentHeroSlide);
        const progressSpan = dot.querySelector('.hero-dot-progress');
        if (progressSpan) {
            if (i === currentHeroSlide) {
                progressSpan.style.transition = 'none';
                progressSpan.style.width = '0%';
                setTimeout(() => {
                    progressSpan.style.transition = `width ${HERO_SLIDE_INTERVAL}ms linear`;
                    progressSpan.style.width = '100%';
                }, 20);
            } else {
                progressSpan.style.transition = 'none';
                progressSpan.style.width = '0%';
            }
        }
    });
}

function changeHeroSlide(direction) {
    pauseHeroSlideTimer();
    renderHeroSlide(currentHeroSlide + direction);
    startHeroSlideTimer();
}

function setHeroSlide(index) {
    pauseHeroSlideTimer();
    renderHeroSlide(index);
    startHeroSlideTimer();
}

function startHeroSlideTimer() {
    pauseHeroSlideTimer();
    renderHeroSlide(currentHeroSlide);
    heroSlideTimer = setInterval(() => {
        renderHeroSlide(currentHeroSlide + 1);
    }, HERO_SLIDE_INTERVAL);
}

function pauseHeroSlideTimer() {
    if (heroSlideTimer) {
        clearInterval(heroSlideTimer);
        heroSlideTimer = null;
    }
}

/* --------------------------------------------------------------------------
   EFECTO DE NÚMEROS ANIMADOS INCREMENTALES (COUNT-UP ANIMATION)
   -------------------------------------------------------------------------- */
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    if (isNaN(target)) return;

    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const useComma = el.getAttribute('data-format') === 'comma';
    const duration = 1800; // 1.8 segundos de animación progresiva
    const startTime = performance.now();

    function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing cuadrático para acelerar y frenar suavemente al llegar a la cifra final
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(easeOut * target);

        let formattedValue = currentValue.toString();
        if (useComma && currentValue >= 1000) {
            formattedValue = currentValue.toLocaleString('en-US');
        }

        el.textContent = `${prefix}${formattedValue}${suffix}`;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            let finalValue = target.toString();
            if (useComma && target >= 1000) {
                finalValue = target.toLocaleString('en-US');
            }
            el.textContent = `${prefix}${finalValue}${suffix}`;
        }
    }

    requestAnimationFrame(update);
}

function initCounters() {
    const counterElements = document.querySelectorAll('.counter-num');
    if (!counterElements || counterElements.length === 0) return;

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        counterElements.forEach(el => observer.observe(el));
    } else {
        counterElements.forEach(el => animateCounter(el));
    }
}

function initAnchorNavigation() {
    document.addEventListener('click', (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;
        
        const targetId = href.substring(1);
        let actualSectionId = targetId;
        if (targetId === 'sistema' || targetId === 'primaria') actualSectionId = 'propuesta';
        
        const targetEl = document.getElementById(actualSectionId) || document.getElementById(targetId);
        
        if (targetEl) {
            e.preventDefault();
            showSection(targetId);
        }
    });
}

const GRADOS_POR_NIVEL = {
    'Primaria': [
        '1er. Grado de Primaria',
        '2do. Grado de Primaria',
        '3er. Grado de Primaria',
        '4to. Grado de Primaria',
        '5to. Grado de Primaria',
        '6to. Grado de Primaria'
    ],
    'Secundaria': [
        '1er. Año de Secundaria',
        '2do. Año de Secundaria',
        '3er. Año de Secundaria',
        '4to. Año de Secundaria',
        '5to. Año de Secundaria'
    ]
};

function initDynamicGrades() {
    const nivelSelects = document.querySelectorAll('select[name="nivel"]');
    nivelSelects.forEach(nivelSelect => {
        const form = nivelSelect.closest('form');
        if (!form) return;
        const gradoSelect = form.querySelector('select[name="grado"]');
        if (!gradoSelect) return;

        function updateGrados() {
            const rawVal = (nivelSelect.value || '').toLowerCase();
            let key = null;
            if (rawVal.includes('primaria')) key = 'Primaria';
            else if (rawVal.includes('secundaria')) key = 'Secundaria';

            gradoSelect.innerHTML = '';
            if (!key) {
                const opt = document.createElement('option');
                opt.value = '';
                opt.disabled = true;
                opt.selected = true;
                opt.textContent = '← Primero selecciona el nivel (Primaria o Secundaria)';
                gradoSelect.appendChild(opt);
                gradoSelect.disabled = true;
                return;
            }

            gradoSelect.disabled = false;
            const promptOpt = document.createElement('option');
            promptOpt.value = '';
            promptOpt.disabled = true;
            promptOpt.selected = true;
            promptOpt.textContent = `Selecciona el grado de ${key}`;
            gradoSelect.appendChild(promptOpt);

            GRADOS_POR_NIVEL[key].forEach(grado => {
                const opt = document.createElement('option');
                opt.value = grado;
                opt.textContent = grado;
                gradoSelect.appendChild(opt);
            });
        }

        nivelSelect.addEventListener('change', updateGrados);
        if (nivelSelect.value) {
            updateGrados();
        } else {
            gradoSelect.disabled = true;
            gradoSelect.innerHTML = '<option value="" disabled selected>← Primero selecciona el nivel (Primaria o Secundaria)</option>';
        }
    });
}

// ============================================================================
// VALIDACIÓN Y SANITIZACIÓN ESTRICTA DE FORMULARIOS (CERO INFO BASURA)
// ============================================================================

const REGEX_SOLO_LETRAS = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{3,60}$/;
const REGEX_DNI = /^\d{8}$/;
const REGEX_CELULAR_PERU = /^9\d{8}$/;
const REGEX_CORREO = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
const REGEX_COLEGIO = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s\.,\-#°]{3,80}$/;

// Lista de secuencias inválidas comunes de DNI
const DNI_INVALIDOS = new Set([
    '00000000', '11111111', '22222222', '33333333', '44444444',
    '55555555', '66666666', '77777777', '88888888', '99999999',
    '12345678', '87654321', '01234567'
]);

// Celulares ficticios comunes
const CELULARES_INVALIDOS = new Set([
    '999999999', '987654321', '900000000', '911111111'
]);

function setFieldValidity(input, isValid, errorMsg) {
    const parentUnit = input.closest('.form-field-unit, .input-field-group');
    const inputWrapper = input.closest('.form-input-shell, .input-wrapper');
    if (!inputWrapper) return;

    if (isValid) {
        inputWrapper.classList.remove('is-invalid');
        inputWrapper.classList.add('is-valid');
        if (parentUnit) parentUnit.classList.remove('has-error');
    } else {
        inputWrapper.classList.remove('is-valid');
        inputWrapper.classList.add('is-invalid');
        if (parentUnit) parentUnit.classList.add('has-error');
    }
}

function clearFieldStatus(input) {
    const parentUnit = input.closest('.form-field-unit, .input-field-group');
    const inputWrapper = input.closest('.form-input-shell, .input-wrapper');
    if (inputWrapper) {
        inputWrapper.classList.remove('is-invalid', 'is-valid');
    }
    if (parentUnit) {
        parentUnit.classList.remove('has-error');
    }
}

function validateSingleField(input, isSubmitting = false) {
    const name = input.getAttribute('name');
    const value = (input.value || '').trim();

    // Si no se está enviando y está vacío, solo limpiamos el estado
    if (!isSubmitting && value === '' && !input.required) {
        clearFieldStatus(input);
        return { valid: true };
    }

    if (input.required && value === '') {
        const msg = 'Este campo es obligatorio';
        setFieldValidity(input, false, msg);
        return { valid: false, message: msg };
    }

    // 1. Nombres y Apellidos (Apoderado o Alumno)
    if (name === 'nombres' || name === 'nombre' || name === 'estudiante' || name === 'alumno') {
        if (!REGEX_SOLO_LETRAS.test(value)) {
            const msg = 'Solo letras y espacios (sin números ni símbolos, mín. 3 letras)';
            setFieldValidity(input, false, msg);
            return { valid: false, message: msg, label: input.previousElementSibling ? input.previousElementSibling.textContent.replace('*', '').trim() : 'Nombres' };
        }
        // Evitar cadenas de una sola letra repetida como "aaaaaa"
        if (/^(.)\1+$/.test(value.replace(/\s/g, ''))) {
            const msg = 'Por favor ingrese nombres y apellidos reales';
            setFieldValidity(input, false, msg);
            return { valid: false, message: msg, label: 'Nombres' };
        }
    }

    // 2. DNI
    if (name === 'dni') {
        if (!REGEX_DNI.test(value)) {
            const msg = 'El DNI debe tener exactamente 8 números';
            setFieldValidity(input, false, msg);
            return { valid: false, message: msg, label: 'DNI del Apoderado' };
        }
        if (DNI_INVALIDOS.has(value)) {
            const msg = 'Por favor ingrese un número de DNI válido';
            setFieldValidity(input, false, msg);
            return { valid: false, message: msg, label: 'DNI del Apoderado' };
        }
    }

    // 3. Teléfono / Celular
    if (name === 'telefono' || name === 'celular') {
        if (!REGEX_CELULAR_PERU.test(value)) {
            const msg = 'El celular debe tener 9 dígitos y empezar con 9 (ej. 987654321)';
            setFieldValidity(input, false, msg);
            return { valid: false, message: msg, label: 'Teléfono / WhatsApp' };
        }
        if (CELULARES_INVALIDOS.has(value)) {
            const msg = 'Por favor ingrese un celular de contacto real';
            setFieldValidity(input, false, msg);
            return { valid: false, message: msg, label: 'Teléfono / WhatsApp' };
        }
    }

    // 4. Correo Electrónico
    if (name === 'correo' || name === 'email') {
        if (!REGEX_CORREO.test(value)) {
            const msg = 'Ingrese un correo válido (ejemplo: usuario@correo.com)';
            setFieldValidity(input, false, msg);
            return { valid: false, message: msg, label: 'Correo Electrónico' };
        }
    }

    // 5. Colegio de Procedencia
    if (name === 'colegio_origen' || name === 'colegio') {
        if (!REGEX_COLEGIO.test(value)) {
            const msg = 'Ingrese el nombre de la institución (mínimo 3 caracteres)';
            setFieldValidity(input, false, msg);
            return { valid: false, message: msg, label: 'Colegio de Procedencia' };
        }
    }

    // 6. Selects (Sede, Nivel, Grado)
    if (input.tagName.toLowerCase() === 'select') {
        if (!value || value === '' || input.disabled) {
            const msg = 'Por favor seleccione una opción válida';
            setFieldValidity(input, false, msg);
            return { valid: false, message: msg, label: input.previousElementSibling ? input.previousElementSibling.textContent.replace('*', '').trim() : 'Selección' };
        }
    }

    // 7. Mensaje
    if (name === 'mensaje' || name === 'consulta') {
        if (value.length < 5) {
            const msg = 'La consulta debe tener al menos 5 caracteres';
            setFieldValidity(input, false, msg);
            return { valid: false, message: msg, label: 'Mensaje o Consulta' };
        }
    }

    setFieldValidity(input, true);
    return { valid: true };
}

function initFormSanitization() {
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        const name = input.getAttribute('name');

        // Sanitización en tiempo real para NOMBRES (sin números ni símbolos)
        if (name === 'nombres' || name === 'nombre' || name === 'estudiante' || name === 'alumno') {
            input.addEventListener('input', function() {
                const cleaned = this.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, '').replace(/\s{2,}/g, ' ');
                if (this.value !== cleaned) this.value = cleaned;
                if (this.value.length >= 3) validateSingleField(this, false);
            });
        }

        // Sanitización en tiempo real para DNI (solo dígitos, máx 8)
        if (name === 'dni') {
            input.addEventListener('input', function() {
                const cleaned = this.value.replace(/\D/g, '').slice(0, 8);
                if (this.value !== cleaned) this.value = cleaned;
                if (this.value.length === 8) validateSingleField(this, false);
            });
        }

        // Sanitización en tiempo real para TELÉFONO (solo dígitos, máx 9)
        if (name === 'telefono' || name === 'celular') {
            input.addEventListener('input', function() {
                const cleaned = this.value.replace(/\D/g, '').slice(0, 9);
                if (this.value !== cleaned) this.value = cleaned;
                if (this.value.length === 9) validateSingleField(this, false);
            });
        }

        // Sanitización para CORREO (sin espacios)
        if (name === 'correo' || name === 'email') {
            input.addEventListener('input', function() {
                const cleaned = this.value.replace(/\s/g, '');
                if (this.value !== cleaned) this.value = cleaned;
            });
        }

        // Sanitización para COLEGIO (remover caracteres de inyección)
        if (name === 'colegio_origen' || name === 'colegio') {
            input.addEventListener('input', function() {
                const cleaned = this.value.replace(/[<>{}\[\];\"\'`]/g, '');
                if (this.value !== cleaned) this.value = cleaned;
            });
        }

        // Validación al salir del campo (blur)
        input.addEventListener('blur', function() {
            validateSingleField(this, false);
        });
    });
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

let lastFormSubmitTime = 0;

function initFormFeedback() {
    const forms = document.querySelectorAll('form.formulario-moderno, form.parent-modern-form');
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            // 0. PROTECCIÓN ANTI-BOT (HONEYPOT) Y RATE-LIMITING
            const honeypot = form.querySelector('input[name="_gotcha"]');
            if (honeypot && honeypot.value.trim() !== '') {
                return;
            }

            const nowMs = Date.now();
            if (nowMs - lastFormSubmitTime < 12000) {
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        title: 'Envío en proceso',
                        text: 'Ya hemos recibido tu solicitud hace unos segundos. Por favor espera un momento antes de volver a enviar.',
                        icon: 'info',
                        confirmButtonColor: '#202682'
                    });
                }
                return;
            }

            // 1. VALIDACIÓN EXHAUSTIVA DE TODOS LOS CAMPOS ANTES DE PROCESAR
            const formInputs = form.querySelectorAll('input:not([type="hidden"]):not([name="_gotcha"]), select, textarea');
            let firstInvalidInput = null;
            let firstErrorMessage = '';
            let firstErrorLabel = '';

            for (const input of formInputs) {
                const result = validateSingleField(input, true);
                if (!result.valid && !firstInvalidInput) {
                    firstInvalidInput = input;
                    firstErrorMessage = result.message;
                    firstErrorLabel = result.label || 'Campo';
                }
            }

            // Si hay algún dato inválido, detenemos el envío y mostramos alerta profesional
            if (firstInvalidInput) {
                firstInvalidInput.focus();
                const parentShell = firstInvalidInput.closest('.form-input-shell, .input-wrapper');
                if (parentShell) {
                    parentShell.classList.remove('is-invalid');
                    void parentShell.offsetWidth; // Forzar re-trigger de animación shake
                    parentShell.classList.add('is-invalid');
                }

                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        title: 'Dato inválido detectado',
                        html: `
                            <div style="text-align: left; padding: 4px; font-size: 0.95rem; color: #334155; line-height: 1.6;">
                                <p style="margin-bottom: 8px;">Por favor verifique el campo <strong>${escapeHtml(firstErrorLabel)}</strong>:</p>
                                <div style="background: #FEF2F2; border-left: 4px solid #EF4444; padding: 10px 14px; border-radius: 6px; font-size: 0.9rem; color: #991B1B;">
                                    <i class="fas fa-exclamation-triangle" style="margin-right: 6px;"></i> ${escapeHtml(firstErrorMessage)}
                                </div>
                                <p style="margin-top: 10px; font-size: 0.85rem; color: #64748B;">
                                    Recuerde que los nombres solo deben llevar letras, el DNI debe contener 8 números y el celular 9 dígitos iniciando con 9.
                                </p>
                            </div>
                        `,
                        icon: 'warning',
                        iconColor: '#EF4444',
                        confirmButtonText: '<i class="fas fa-pen"></i> Corregir campo',
                        confirmButtonColor: '#202682',
                        customClass: {
                            popup: 'genes-swal-popup',
                            confirmButton: 'genes-swal-confirm-btn'
                        }
                    });
                } else {
                    alert(`Error en ${firstErrorLabel}: ${firstErrorMessage}`);
                }
                return;
            }

            // 2. TODOS LOS DATOS SON VÁLIDOS -> PROCEDER CON EL DESPACHO
            lastFormSubmitTime = Date.now();
            if (typeof trackInteraction === 'function') {
                trackInteraction('admision');
            }

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Enviar mensaje';

            const nameInput = form.querySelector('input[name="nombres"], input[name="nombre"]');
            const dniInput = form.querySelector('input[name="dni"]');
            const phoneInput = form.querySelector('input[name="telefono"], input[name="celular"]');
            const emailInput = form.querySelector('input[name="correo"], input[name="email"]');
            const estudianteInput = form.querySelector('input[name="estudiante"], input[name="alumno"]');
            const colegioInput = form.querySelector('input[name="colegio_origen"], input[name="colegio"]');
            const sedeInput = form.querySelector('select[name="sede"]');
            const nivelInput = form.querySelector('select[name="nivel"]');
            const gradoInput = form.querySelector('select[name="grado"]');
            const msgInput = form.querySelector('textarea[name="mensaje"], textarea[name="consulta"]');

            const nombre = nameInput ? nameInput.value.trim() : '';
            const dni = dniInput ? dniInput.value.trim() : '';
            const telefono = phoneInput ? phoneInput.value.trim() : '';
            const correo = emailInput ? emailInput.value.trim() : '';
            const estudiante = estudianteInput ? estudianteInput.value.trim() : '';
            const colegioOrigen = colegioInput ? colegioInput.value.trim() : '';
            const sede = sedeInput ? sedeInput.value : '';
            const nivel = nivelInput ? nivelInput.value : '';
            const grado = gradoInput ? gradoInput.value : '';
            const mensaje = msgInput ? msgInput.value.trim() : '';
            const formType = form.getAttribute('data-form-type') || (form.id === 'form-admision' ? 'inicio' : 'admision');

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<span>Validando y registrando...</span> <i class="fas fa-spinner fa-spin"></i>`;
            }

            const payload = {
                fecha: new Date().toISOString(),
                origen: `Web Genes (${formType.toUpperCase()})`,
                nombres: nombre,
                dni: dni,
                telefono: telefono,
                correo: correo,
                estudiante: estudiante,
                colegio_origen: colegioOrigen,
                sede: sede,
                nivel: nivel,
                grado: grado,
                mensaje: mensaje
            };

            const config = window.GENES_CONFIG || {};
            const googleScriptUrl = config.googleAppsScriptUrl || '';
            const waPhone = config.whatsappPhone || '51933840074';

            // Despacho a Google Apps Script Webhook (si está configurado)
            if (googleScriptUrl && googleScriptUrl.trim() !== '') {
                try {
                    await fetch(googleScriptUrl, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    });
                } catch (fetchErr) {
                    console.warn('Registro en segundo plano Google Sheets:', fetchErr);
                }
            }

            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHtml;
                }

                // Mensaje estructurado institucional para WhatsApp (sin emojis para evitar signos '?' y ordenado línea por línea)
                const seccionTitulo = formType === 'contacto'
                    ? 'SECCIÓN: CONTACTO E INFORMES - COLEGIO GENES'
                    : 'SECCIÓN: ADMISIÓN 2026 - COLEGIO GENES';

                const waLines = [
                    `*${seccionTitulo}*`,
                    `Hola Colegio Genes, envío mis datos registrados en la web:`,
                    ``,
                    `*Nombres y Apellidos del Apoderado:*`,
                    `${nombre || 'No especificado'}`
                ];

                if (dni) {
                    waLines.push(``, `*DNI del Apoderado:*`, `${dni}`);
                }
                if (telefono) {
                    waLines.push(``, `*Teléfono / WhatsApp:*`, `${telefono}`);
                }
                if (correo) {
                    waLines.push(``, `*Correo Electrónico:*`, `${correo}`);
                }
                if (estudiante) {
                    waLines.push(``, `*Nombres y Apellidos del Estudiante:*`, `${estudiante}`);
                }
                if (colegioOrigen) {
                    waLines.push(``, `*Colegio de Procedencia:*`, `${colegioOrigen}`);
                }
                if (sede) {
                    waLines.push(``, `*Sede de Preferencia:*`, `${sede}`);
                }
                if (nivel || grado) {
                    waLines.push(``, `*Nivel y Grado a Postular:*`, `${[nivel, grado].filter(Boolean).join(' - ')}`);
                }
                if (mensaje) {
                    waLines.push(``, `*Mensaje o Consulta:*`, `${mensaje}`);
                }

                const waMessageText = waLines.join('\n');

                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        title: '¡Solicitud Registrada con Éxito!',
                        html: `
                            <div style="text-align: left; padding: 6px 2px; font-size: 0.95rem; color: #334155; line-height: 1.6;">
                                <p style="margin-bottom: 8px;">¡Muchas gracias, <strong>${escapeHtml(nombre)}</strong>!</p>
                                <p style="margin-bottom: 12px;">Tus datos han sido validados y registrados en nuestro <strong>Sistema Institucional de Admisión 2026</strong>. Para atención inmediata y vacantes por sede, puedes chatear directamente con el área de admisiones.</p>
                                
                                <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px 14px; margin-bottom: 14px; font-size: 0.88rem;">
                                    <div><strong>DNI Apoderado:</strong> ${escapeHtml(dni)}</div>
                                    ${estudiante ? `<div><strong>Estudiante:</strong> ${escapeHtml(estudiante)}</div>` : ''}
                                    ${sede ? `<div><strong>Sede elegida:</strong> ${escapeHtml(sede)}</div>` : ''}
                                    ${grado ? `<div><strong>Grado:</strong> ${escapeHtml(grado)}</div>` : ''}
                                    ${colegioOrigen ? `<div><strong>Colegio de procedencia:</strong> ${escapeHtml(colegioOrigen)}</div>` : ''}
                                </div>

                                <div style="background: #F1F5F9; border-left: 4px solid #10B981; padding: 10px 14px; border-radius: 6px; font-size: 0.88rem; color: #1E293B;">
                                    <i class="fas fa-clock" style="color: #10B981; margin-right: 6px;"></i> Tiempo estimado de respuesta: <strong>Menos de 15 minutos</strong> en horario escolar.
                                </div>
                            </div>
                        `,
                        icon: 'success',
                        iconColor: '#10B981',
                        showCancelButton: true,
                        confirmButtonText: '<i class="fab fa-whatsapp"></i> Chatear al WhatsApp Oficial',
                        cancelButtonText: 'Cerrar',
                        confirmButtonColor: '#25D366',
                        cancelButtonColor: '#202682',
                        reverseButtons: true,
                        customClass: {
                            popup: 'genes-swal-popup',
                            confirmButton: 'genes-swal-confirm-btn',
                            cancelButton: 'genes-swal-cancel-btn'
                        }
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.open(`https://wa.me/${waPhone}?text=${encodeURIComponent(waMessageText)}`, '_blank', 'noopener,noreferrer');
                        }
                    });
                } else {
                    alert('¡Solicitud registrada con éxito! Te contactaremos a la brevedad.');
                }

                let feedbackBanner = form.querySelector('.form-inline-success');
                if (!feedbackBanner) {
                    feedbackBanner = document.createElement('div');
                    feedbackBanner.className = 'form-inline-success';
                    form.appendChild(feedbackBanner);
                }
                feedbackBanner.innerHTML = `<i class="fas fa-check-circle"></i> ¡Solicitud registrada con éxito en el sistema institucional! Nos comunicaremos al WhatsApp ${escapeHtml(telefono)} a la brevedad.`;
                feedbackBanner.style.display = 'flex';

                form.reset();
                formInputs.forEach(clearFieldStatus);
                initDynamicGrades();

                setTimeout(() => {
                    if (feedbackBanner) feedbackBanner.style.display = 'none';
                }, 9000);
            }, 600);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initHeroSlider();
    initCounters();
    renderTestimonio(0);
    startTestimonioAuto();
    setTimeout(() => centerTrack(), 50);
    renderVideosPrimaria('primaria1');
    renderVideosSecundaria('secundaria1');
    showVacacionesPanel('vacaciones-primaria', document.getElementById('tab-vacaciones-primaria'));
    showPrimaryChannel('grado1');
    showSecundariaChannel('grado1');
    initAnchorNavigation();
    initDynamicGrades();
    initFormSanitization();
    initFormFeedback();
    initAnalyticsSystem();
    handleHashRouting();
});

/* --------------------------------------------------------------------------
   SECCIÓN INGRESANTES & LIGHTBOX MODAL FULLSCREEN INTERACTIVO DE ALTA RESOLUCIÓN
   -------------------------------------------------------------------------- */
let lightboxScale = 1.0;
let lightboxTranslateX = 0;
let lightboxTranslateY = 0;
let isLightboxDragging = false;
let lightboxDragStartX = 0;
let lightboxDragStartY = 0;
let lightboxInitialTranslateX = 0;
let lightboxInitialTranslateY = 0;

function filterIngresantes(uniKey, button) {
    document.querySelectorAll('.ingresantes-tabs .ingresante-tab').forEach(btn => btn.classList.remove('active'));
    if (button) button.classList.add('active');

    const cards = document.querySelectorAll('.ingresantes-grid .ingresante-card');
    cards.forEach(card => {
        const uni = card.getAttribute('data-uni');
        if (uniKey === 'todos' || uni === uniKey) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function updateLightboxTransform() {
    const wrapper = document.getElementById('lightbox-img-wrapper');
    const indicator = document.getElementById('lightbox-zoom-indicator');
    if (wrapper) {
        wrapper.style.transform = `translate(${lightboxTranslateX}px, ${lightboxTranslateY}px) scale(${lightboxScale})`;
    }
    if (indicator) {
        indicator.textContent = `${Math.round(lightboxScale * 100)}%`;
    }
}

function resetLightboxTransform() {
    lightboxScale = 1.0;
    lightboxTranslateX = 0;
    lightboxTranslateY = 0;
    updateLightboxTransform();
}

function openIngresanteModal(imgSrc, uniTitle) {
    if (typeof trackInteraction === 'function') {
        trackInteraction('afiches');
    }

    const modal = document.getElementById('ingresante-modal');
    const modalImg = document.getElementById('ingresante-modal-img');
    const modalTitle = document.getElementById('ingresante-modal-title');
    const btnOriginal = document.getElementById('btn-open-original-img');
    const spinner = document.getElementById('lightbox-spinner');

    if (modal && modalImg) {
        if (spinner) spinner.classList.add('active');
        modalImg.style.opacity = '0';

        const hideSpinner = () => {
            if (spinner) spinner.classList.remove('active');
            modalImg.style.opacity = '1';
        };
        modalImg.onload = hideSpinner;
        modalImg.onerror = hideSpinner;

        modalImg.src = imgSrc;
        if (modalImg.complete && modalImg.naturalWidth > 0) {
            hideSpinner();
        }
        resetLightboxTransform();

        if (btnOriginal) btnOriginal.href = imgSrc;
        if (modalTitle && uniTitle) {
            modalTitle.textContent = uniTitle.startsWith('Horarios') || uniTitle.startsWith('Publicación') ? uniTitle : `Publicación Oficial: ${uniTitle}`;
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Escuchar atajos de teclado
        window.addEventListener('keydown', handleLightboxKeydown);
        setupLightboxDrag();
    }
}

function closeIngresanteModal() {
    const modal = document.getElementById('ingresante-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    window.removeEventListener('keydown', handleLightboxKeydown);
}

function handleLightboxBackdropClick(event) {
    if (event.target.id === 'ingresante-modal' || event.target.id === 'lightbox-stage') {
        closeIngresanteModal();
    }
}

function zoomLightbox(delta) {
    const newScale = Math.min(Math.max(0.5, lightboxScale + delta), 3.5);
    lightboxScale = Math.round(newScale * 100) / 100;
    
    // Si vuelve a 100% o menos, recentrar
    if (lightboxScale <= 1.0) {
        lightboxTranslateX = 0;
        lightboxTranslateY = 0;
    }
    updateLightboxTransform();
}

function toggleLightboxFit() {
    if (lightboxScale >= 1.4) {
        resetLightboxTransform();
    } else {
        lightboxScale = 1.6;
        updateLightboxTransform();
    }
}

function handleLightboxWheel(e) {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.15 : -0.15;
    zoomLightbox(delta);
}

function handleLightboxKeydown(e) {
    if (e.key === 'Escape') {
        closeIngresanteModal();
    } else if (e.key === '+' || e.key === '=') {
        zoomLightbox(0.2);
    } else if (e.key === '-' || e.key === '_') {
        zoomLightbox(-0.2);
    } else if (e.key === '0') {
        resetLightboxTransform();
    }
}

function setupLightboxDrag() {
    const stage = document.getElementById('lightbox-stage');
    const img = document.getElementById('ingresante-modal-img');
    if (!stage || stage.dataset.dragInitialized === 'true') return;

    stage.dataset.dragInitialized = 'true';

    // Rueda del mouse sobre el stage
    stage.addEventListener('wheel', handleLightboxWheel, { passive: false });

    // Drag con mouse
    stage.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return; // Solo clic primario
        isLightboxDragging = true;
        lightboxDragStartX = e.clientX;
        lightboxDragStartY = e.clientY;
        lightboxInitialTranslateX = lightboxTranslateX;
        lightboxInitialTranslateY = lightboxTranslateY;
        stage.classList.add('is-dragging');
    });

    window.addEventListener('mousemove', (e) => {
        if (!isLightboxDragging) return;
        const dx = e.clientX - lightboxDragStartX;
        const dy = e.clientY - lightboxDragStartY;
        lightboxTranslateX = lightboxInitialTranslateX + dx;
        lightboxTranslateY = lightboxInitialTranslateY + dy;
        updateLightboxTransform();
    });

    window.addEventListener('mouseup', () => {
        if (isLightboxDragging) {
            isLightboxDragging = false;
            if (stage) stage.classList.remove('is-dragging');
        }
    });

    // Soporte táctil en móviles
    let touchStartX = 0;
    let touchStartY = 0;
    stage.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            isLightboxDragging = true;
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            lightboxInitialTranslateX = lightboxTranslateX;
            lightboxInitialTranslateY = lightboxTranslateY;
        }
    }, { passive: true });

    stage.addEventListener('touchmove', (e) => {
        if (!isLightboxDragging || e.touches.length !== 1) return;
        const dx = e.touches[0].clientX - touchStartX;
        const dy = e.touches[0].clientY - touchStartY;
        lightboxTranslateX = lightboxInitialTranslateX + dx;
        lightboxTranslateY = lightboxInitialTranslateY + dy;
        updateLightboxTransform();
    }, { passive: true });

    stage.addEventListener('touchend', () => {
        isLightboxDragging = false;
    });

    // Doble clic para alternar zoom
    if (img) {
        img.addEventListener('dblclick', (e) => {
            e.stopPropagation();
            toggleLightboxFit();
        });
    }
}

// Re-centrar al cambiar el tamaño de ventana y cerrar modales con Escape
window.addEventListener('resize', function() {
    centerTrack();
});

window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeSedeModal();
        closeAnalyticsModal();
    }
});

// ==========================================================================
// RESILIENCIA DE RED: REINTENTO AUTOMÁTICO DE CARGA DE IMÁGENES
// ==========================================================================
window.addEventListener('error', function (e) {
    if (e.target && e.target.tagName === 'IMG') {
        const img = e.target;
        if (!img.dataset.retried) {
            img.dataset.retried = 'true';
            setTimeout(function() {
                const base = img.src.split('?')[0];
                img.src = base + '?retry=' + Date.now();
            }, 600);
        }
    }
}, true);

// ==========================================================================
// SISTEMA DE ANALÍTICA, CONTADOR DE VISITAS Y MAPA DE INTERACCIONES EN VIVO
// ==========================================================================
const GENES_ANALYTICS_KEY = 'genes_analytics_v2';
const GENES_SESSION_KEY = 'genes_session_counted_v2';

const DEFAULT_ANALYTICS_STATE = {
    totalVisits: 14820,
    sections: {
        'admision': { label: 'Admisión 2026', count: 4120 },
        'propuesta': { label: 'Sistema de Trabajo', count: 3680 },
        'sedes': { label: 'Nuestras Sedes', count: 2940 },
        'ingresantes': { label: 'Ingresantes', count: 2190 },
        'vacaciones': { label: 'Vacaciones Útiles', count: 1540 },
        'videos-secundaria': { label: 'Videos Secundaria', count: 1180 },
        'videos-primaria': { label: 'Videos Primaria', count: 960 },
        'contacto': { label: 'Contacto', count: 840 }
    },
    interactions: {
        'whatsapp': { label: 'Consultas vía WhatsApp', count: 1420 },
        'sedes': { label: 'Mapas de Sedes Abiertos', count: 1150 },
        'videos': { label: 'Clases en Video Reproducidas', count: 890 },
        'afiches': { label: 'Afiches y Horarios Ampliados', count: 640 },
        'admision': { label: 'Solicitudes en Formulario', count: 510 }
    }
};

function getAnalyticsState() {
    try {
        const raw = localStorage.getItem(GENES_ANALYTICS_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && parsed.totalVisits && parsed.sections && parsed.interactions) {
                return parsed;
            }
        }
    } catch (err) {
        // Fallback silencioso si localStorage está bloqueado
    }
    return JSON.parse(JSON.stringify(DEFAULT_ANALYTICS_STATE));
}

function saveAnalyticsState(state) {
    try {
        localStorage.setItem(GENES_ANALYTICS_KEY, JSON.stringify(state));
    } catch (err) {
        // Ignorar errores de cuota
    }
}

function getTopSectionLabel(state) {
    let topKey = 'admision';
    let maxVal = -1;
    Object.keys(state.sections).forEach(k => {
        if (state.sections[k].count > maxVal) {
            maxVal = state.sections[k].count;
            topKey = k;
        }
    });
    return state.sections[topKey] ? state.sections[topKey].label : 'Admisión 2026';
}

function updateAnalyticsUI() {
    const state = getAnalyticsState();
    const visitorEl = document.getElementById('footer-visitor-count');
    const topSecEl = document.getElementById('footer-top-section');
    if (visitorEl) visitorEl.textContent = state.totalVisits.toLocaleString('en-US');
    if (topSecEl) topSecEl.textContent = getTopSectionLabel(state);
}

function trackSectionView(sectionId) {
    let key = sectionId;
    if (key === 'sistema' || key === 'primaria' || key === 'secundaria') key = 'propuesta';
    if (key === 'inicio' || !key) return;

    const state = getAnalyticsState();
    if (state.sections[key]) {
        state.sections[key].count += 1;
        saveAnalyticsState(state);
        updateAnalyticsUI();
    }
}

function trackInteraction(type) {
    const state = getAnalyticsState();
    if (state.interactions[type]) {
        state.interactions[type].count += 1;
        saveAnalyticsState(state);
        updateAnalyticsUI();
    }
}

function renderAnalyticsModalContent() {
    const state = getAnalyticsState();
    const totalVisitsEl = document.getElementById('stat-total-visits');
    const totalInterEl = document.getElementById('stat-total-interactions');
    const topSectionEl = document.getElementById('stat-top-section');
    const secBarsEl = document.getElementById('analytics-sections-bars');
    const actBarsEl = document.getElementById('analytics-actions-bars');

    const totalInteractions = Object.values(state.interactions).reduce((acc, item) => acc + item.count, 0);

    if (totalVisitsEl) totalVisitsEl.textContent = state.totalVisits.toLocaleString('en-US');
    if (totalInterEl) totalInterEl.textContent = totalInteractions.toLocaleString('en-US');
    if (topSectionEl) topSectionEl.textContent = getTopSectionLabel(state);

    if (secBarsEl) {
        const sortedSecs = Object.values(state.sections).sort((a, b) => b.count - a.count);
        const maxSec = sortedSecs[0] ? sortedSecs[0].count : 1;
        secBarsEl.innerHTML = sortedSecs.map((sec, idx) => {
            const pct = Math.max(12, Math.round((sec.count / maxSec) * 100));
            return `
                <div class="analytics-bar-row">
                    <div class="analytics-bar-label">
                        <span><strong>#${idx + 1}</strong> ${escapeHtml(sec.label)}</span>
                        <span class="analytics-bar-val">${sec.count.toLocaleString('en-US')} vistas</span>
                    </div>
                    <div class="analytics-bar-track">
                        <div class="analytics-bar-fill" style="width: ${pct}%;"></div>
                    </div>
                </div>
            `;
        }).join('');
    }

    if (actBarsEl) {
        const sortedActs = Object.values(state.interactions).sort((a, b) => b.count - a.count);
        const maxAct = sortedActs[0] ? sortedActs[0].count : 1;
        actBarsEl.innerHTML = sortedActs.map((act, idx) => {
            const pct = Math.max(12, Math.round((act.count / maxAct) * 100));
            return `
                <div class="analytics-bar-row">
                    <div class="analytics-bar-label">
                        <span><strong>#${idx + 1}</strong> ${escapeHtml(act.label)}</span>
                        <span class="analytics-bar-val">${act.count.toLocaleString('en-US')}</span>
                    </div>
                    <div class="analytics-bar-track">
                        <div class="analytics-bar-fill green" style="width: ${pct}%;"></div>
                    </div>
                </div>
            `;
        }).join('');
    }
}

function openAnalyticsModal() {
    renderAnalyticsModalContent();
    const modal = document.getElementById('analytics-modal');
    if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

function closeAnalyticsModal() {
    const modal = document.getElementById('analytics-modal');
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
}

function initAnalyticsSystem() {
    const state = getAnalyticsState();
    try {
        if (!sessionStorage.getItem(GENES_SESSION_KEY)) {
            state.totalVisits += 1;
            sessionStorage.setItem(GENES_SESSION_KEY, '1');
            saveAnalyticsState(state);
        }
    } catch (e) {
        state.totalVisits += 1;
        saveAnalyticsState(state);
    }

    updateAnalyticsUI();

    // Delegación global para registrar clics en WhatsApp y Videos de YouTube
    document.addEventListener('click', (e) => {
        const waLink = e.target.closest('a[href*="wa.me"]');
        if (waLink) {
            trackInteraction('whatsapp');
        }
        const ytLink = e.target.closest('a[href*="youtube.com"], a[href*="youtu.be"]');
        if (ytLink) {
            trackInteraction('videos');
        }
    });
}

