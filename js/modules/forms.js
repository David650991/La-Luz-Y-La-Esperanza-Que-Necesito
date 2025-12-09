/* MÓDULO: FORMULARIOS */
export function initContactForm() {
    const form = document.getElementById('contactForm');
    const statusMsg = document.getElementById('form-status');

    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const data = new FormData(event.target);
            const originalText = btn.textContent;

            btn.disabled = true;
            btn.innerHTML = 'Enviando... <i class="fas fa-spinner fa-spin"></i>';

            try {
                const response = await fetch(event.target.action, {
                    method: form.method,
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    statusMsg.innerHTML = '<i class="fas fa-check-circle"></i> ¡Gracias! Hemos recibido tu mensaje correctamente.';
                    statusMsg.className = "status-msg success";
                    form.reset();
                } else {
                    const errorData = await response.json();
                    if (Object.hasOwn(errorData, 'errors')) {
                        statusMsg.innerHTML = errorData.errors.map(error => error["message"]).join(", ");
                    } else {
                        // CORRECCIÓN: El texto debe estar en una sola línea
                        statusMsg.innerHTML = '<i class="fas fa-exclamation-circle"></i> Ocurrió un error al enviar. Intenta de nuevo.';
                    }
                    statusMsg.className = "status-msg error";
                }
            } catch (error) {
                // CORRECCIÓN: El texto debe estar en una sola línea
                statusMsg.innerHTML = '<i class="fas fa-wifi"></i> Error de conexión. Verifica tu internet.';
                statusMsg.className = "status-msg error";
            } finally {
                btn.disabled = false;
                btn.textContent = originalText;
            }
        });
    }
}