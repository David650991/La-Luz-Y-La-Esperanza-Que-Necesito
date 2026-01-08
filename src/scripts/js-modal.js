/* =========================================
   MÓDULO: MODAL / POPUP
   ========================================= */
window.initPopup = function() {
    console.log("🛠️ Intentando iniciar el Modal...");
    
    const modal = document.getElementById('modal-posada');
    const closeBtn = document.getElementById('close-modal-btn');

    if (!modal || !closeBtn) {
        console.warn("⚠️ Aviso: No se encontró el modal en el HTML actual.");
        return;
    }

    // 1. Mostrar automáticamente
    setTimeout(() => {
        modal.classList.add('active');
    }, 1500);

    // 2. Función Cerrar
    const closeModal = () => {
        modal.classList.remove('active');
    };

    // 3. Eventos
    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    console.log("✅ Módulo Modal cargado.");
};