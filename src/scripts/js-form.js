/* =========================================
   MÓDULO: FORMULARIO DE CONTACTO (DELEGACIÓN DE EVENTOS)
   ========================================= */
window.initContactForm = function() {
    console.log("📨 Inicializando escucha del formulario...");

    // Usamos delegación: Escuchamos en el 'document' porque el formulario 
    // se inyecta dinámicamente y puede no existir al cargar la página inicialmente.
    document.addEventListener("submit", async function (event) {
        
        // Verificamos si el evento viene de NUESTRO formulario
        if (event.target && event.target.id === 'contactForm') {
            event.preventDefault(); // <--- ESTO EVITA LA REDIRECCIÓN
            
            const form = event.target;
            const btn = form.querySelector('button[type="submit"]');
            const statusMsg = document.getElementById('form-status');
            const data = new FormData(form);
            const originalText = btn.textContent;

            // UI: Estado de carga
            btn.disabled = true;
            btn.innerHTML = 'Enviando... <i class="fas fa-spinner fa-spin"></i>';

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    statusMsg.innerHTML = '<i class="fas fa-check-circle"></i> ¡Gracias! Hemos recibido tu mensaje.';
                    statusMsg.className = "status-msg success";
                    if (typeof window.trackSiteConversion === 'function') {
                        window.trackSiteConversion('contact_form_success', { conversion_location: 'contacto' });
                    }
                    form.reset();
                } else {
                    const errorData = await response.json();
                    if (errorData && errorData.errors) {
                        statusMsg.innerHTML = errorData.errors.map(error => error["message"]).join(", ");
                    } else {
                        statusMsg.innerHTML = '<i class="fas fa-exclamation-circle"></i> Ocurrió un error.';
                    }
                    statusMsg.className = "status-msg error";
                }
            } catch (error) {
                statusMsg.innerHTML = '<i class="fas fa-wifi"></i> Error de conexión.';
                statusMsg.className = "status-msg error";
                console.error(error);
            } finally {
                btn.disabled = false;
                btn.textContent = originalText;
            }
        }
    });
    
    console.log("✅ Módulo Formulario listo (Modo Delegado).");
};
