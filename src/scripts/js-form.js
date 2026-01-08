/* =========================================
   MÓDULO: FORMULARIO DE CONTACTO
   ========================================= */
window.initContactForm = function() {
    const form = document.getElementById('contactForm');
    const statusMsg = document.getElementById('form-status');

    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const data = new FormData(event.target);
            const originalText = btn.textContent;

            // Estado de carga
            btn.disabled = true;
            btn.innerHTML = 'Enviando... <i class="fas fa-spinner fa-spin"></i>';

            try {
                const response = await fetch(event.target.action, {
                    method: form.method,
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    statusMsg.innerHTML = '<i class="fas fa-check-circle"></i> ¡Gracias! Hemos recibido tu mensaje.';
                    statusMsg.className = "status-msg success";
                    form.reset();
                } else {
                    const errorData = await response.json();
                    if (Object.hasOwn(errorData, 'errors')) {
                        statusMsg.innerHTML = errorData.errors.map(error => error["message"]).join(", ");
                    } else {
                        statusMsg.innerHTML = '<i class="fas fa-exclamation-circle"></i> Ocurrió un error.';
                    }
                    statusMsg.className = "status-msg error";
                }
            } catch (error) {
                statusMsg.innerHTML = '<i class="fas fa-wifi"></i> Error de conexión.';
                statusMsg.className = "status-msg error";
            } finally {
                btn.disabled = false;
                btn.textContent = originalText;
            }
        });
        console.log("✅ Módulo Formulario cargado.");
    }
};