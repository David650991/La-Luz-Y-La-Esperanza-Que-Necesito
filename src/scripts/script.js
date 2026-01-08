/* ==========================================================================
   ORQUESTADOR DE SCRIPTS (CARGADOR DINÁMICO)
   UBICACIÓN: src/scripts/script.js
   VERSION: Modular 3.0
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

document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Iniciando carga de módulos JS desde src/scripts/...');

    // LISTA DE MÓDULOS ACTUALIZADA CON LA NUEVA RUTA
    const modules = [
        'src/scripts/js-menu.js',
        'src/scripts/js-scroll.js',
        'src/scripts/js-modal.js',
        'src/scripts/js-form.js',
        'src/scripts/js-snow.js' 
    ];

    try {
        // 1. Cargar todos los archivos JS
        await Promise.all(modules.map(loadModule));
        console.log('📦 Todos los módulos importados correctamente.');

        // 2. Ejecutar las funciones una vez cargadas
        if (typeof window.initMobileMenu === 'function') window.initMobileMenu();
        if (typeof window.initSmoothScroll === 'function') window.initSmoothScroll();
        if (typeof window.initPopup === 'function') window.initPopup();
        if (typeof window.initContactForm === 'function') window.initContactForm();
        
        // La nieve es opcional
        // if (typeof window.initSnow === 'function') window.initSnow();

    } catch (error) {
        console.error('❌ Error crítico cargando módulos:', error);
    }
});