/* MÓDULO: MODAL POSADA */
export function initPopup() {
    const modal = document.getElementById('modal-posada');
    const closeBtn = document.getElementById('close-modal-btn');

    // Validación de seguridad: Si no existen los elementos, no hacer nada
    if (modal && closeBtn) {

        // 1. Mostrar automáticamente después de 1 segundo
        setTimeout(() => {
            modal.classList.add('active');
        }, 1000);

        // 2. Función Cerrar
        const closeModal = () => {
            modal.classList.remove('active');
        };

        // 3. Eventos
        closeBtn.addEventListener('click', closeModal);

        // Cerrar al dar clic fuera de la imagen
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Cerrar con tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    } else {
        console.warn("No se encontró el modal o el botón de cerrar en el HTML.");
    }
}