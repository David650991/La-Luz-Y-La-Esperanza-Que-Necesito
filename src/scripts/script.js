/* ==========================================================================
   ORQUESTADOR DE SCRIPTS (CARGADOR DINÁMICO)
   UBICACIÓN: src/scripts/script.js
   VERSION: Modular 3.4
   ========================================================================== */

// Función auxiliar para cargar scripts externos
function loadModule(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(src);
        script.onerror = () => reject(new Error(`Error al cargar ${src}`));
        document.body.appendChild(script);
    });
}

// Lógica principal de inicialización
const initApplication = async () => {
    console.log('🚀 Iniciando carga de módulos JS desde src/scripts/...');

    const modules = [
        'src/scripts/js-menu.js',
        'src/scripts/js-scroll.js',
        'src/scripts/js-modal.js',
        'src/scripts/js-form.js',
        'src/scripts/js-testimonials.js?v=1.1',
        'src/scripts/js-podcast.js?v=1.3',
        'src/scripts/js-conversions.js?v=1.0',
        'src/scripts/js-snow.js' 
    ];

    try {
        // 1. Cargar todos los archivos JS en paralelo
        await Promise.all(modules.map(loadModule));
        console.log('📦 Todos los módulos importados correctamente.');

        // 2. Ejecutar las funciones INMEDIATAMENTE
        // Esto soluciona que el modal y el formulario no reaccionaran antes
        if (typeof window.initMobileMenu === 'function') window.initMobileMenu();
        if (typeof window.initSmoothScroll === 'function') window.initSmoothScroll();
        if (typeof window.initPopup === 'function') window.initPopup();
        if (typeof window.initContactForm === 'function') window.initContactForm();
        if (typeof window.initTestimonialsCarousel === 'function') window.initTestimonialsCarousel();
        if (typeof window.initPodcast === 'function') window.initPodcast();
        if (typeof window.initConversionTracking === 'function') window.initConversionTracking();
        
        // Efecto de nieve (Opcional, descomentar si es temporada)
        // if (typeof window.initSnow === 'function') window.initSnow();

    } catch (error) {
        console.error('❌ Error crítico cargando módulos:', error);
    }
};

// COMPROBACIÓN DE ESTADO DEL DOM (CORRECCIÓN CRÍTICA)
// Si el script carga después del DOMContentLoaded, ejecutamos directamente.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApplication);
} else {
    initApplication();
}
