/* =========================================
   MÓDULO: MODAL / POPUP (CON REINTENTO)
   ========================================= */
window.initPopup = function() {
    console.log("🛠️ Buscando modal...");

    // Intervalo para buscar el modal si el HTML tarda en inyectarse
    const checkExist = setInterval(() => {
        const modal = document.getElementById('modal-posada');
        const closeBtn = document.getElementById('close-modal-btn');

        if (modal && closeBtn) {
            console.log("✅ Modal encontrado. Activando lógica.");
            clearInterval(checkExist); // Dejar de buscar

            // 1. Mostrar automáticamente tras 2 segundos
            setTimeout(() => {
                modal.classList.add('active');
            }, 2000);

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
        }
    }, 500); // Revisa cada medio segundo

    // Seguridad: Dejar de buscar después de 10 segundos
    setTimeout(() => { clearInterval(checkExist); }, 10000);
};