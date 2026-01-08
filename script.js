/* ==========================================================================
   ARCHIVO MAESTRO DE SCRIPTS: SCRIPT.JS
   PROYECTO: LA LUZ Y LA ESPERANZA QUE NECESITO
   VERSION: 2.1 (Corregido)
   ========================================================================== */

/* [1] INTERFAZ DE USUARIO */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('.main-nav');
    const links = document.querySelectorAll('.main-nav a');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
}

function initSmoothScroll() {
    const headerHeight = 80;
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
}

/* [2] EFECTOS VISUALES */
/*
function initSnow() {
    const container = document.getElementById('snow-container');
    if (!container) return;

    const count = 50;
    for (let i = 0; i < count; i++) {
        const flake = document.createElement('div');
        flake.classList.add('snowflake');
        flake.innerHTML = '❄';

        // Ajustes aleatorios para naturalidad
        const left = Math.random() * 100;
        const animDuration = Math.random() * 5 + 5;
        const animDelay = Math.random() * 5;
        const size = Math.random() * 15 + 10;
        const opacity = Math.random() * 0.5 + 0.3;

        flake.style.left = left + '%';
        flake.style.animationDuration = animDuration + 's';
        flake.style.animationDelay = animDelay + 's';
        flake.style.fontSize = size + 'px';
        flake.style.opacity = opacity;

        container.appendChild(flake);
    }
}
*/

/* [3] COMPONENTES (MODAL POSADA - CORREGIDO) */
function initPopup() {
    console.log("🛠️ Intentando iniciar el Modal de Posada...");
    
    const modal = document.getElementById('modal-posada');
    const closeBtn = document.getElementById('close-modal-btn');

    // Validación de existencia
    if (!modal || !closeBtn) {
        console.error("❌ Error: No se encontró el modal o el botón de cierre en el HTML.");
        return;
    }

    // 1. Mostrar automáticamente después de 1.5 segundos
    setTimeout(() => {
        console.log("✅ Abriendo Modal ahora.");
        modal.classList.add('active');
    }, 1500);

    // 2. Función Cerrar
    const closeModal = () => {
        console.log("🔒 Cerrando modal.");
        modal.classList.remove('active');
    };

    // 3. Eventos de Cierre
    closeBtn.addEventListener('click', closeModal);

    // Cerrar al dar clic fuera de la imagen (Overlay)
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
}

/* [4] FORMULARIOS */
function initContactForm() {
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
                    statusMsg.innerHTML = '<i class="fas fa-check-circle"></i> ¡Gracias! Hemos recibido tu mensaje.';
                    statusMsg.className = "status-msg success";
                    form.reset();
                } else {
                    const errorData = await response.json();
                    if (Object.hasOwn(errorData, 'errors')) {
                        statusMsg.innerHTML = errorData.errors.map(error => error["message"]).join(", ");
                    } else {
                        statusMsg.innerHTML = '<i class="fas fa-exclamation-circle"></i> Ocurrió un error. Intenta de nuevo.';
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
    }
}

/* [5] EJECUCIÓN PRINCIPAL */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Sistema Iniciado. Versión 2.1');
    
    // Ejecución segura de módulos
    try { initMobileMenu(); } catch (e) { console.error("Error en Menu:", e); }
    try { initSmoothScroll(); } catch (e) { console.error("Error en Scroll:", e); }
   // try { initSnow(); } catch (e) { console.error("Error en Nieve:", e); }
    try { initContactForm(); } catch (e) { console.error("Error en Formulario:", e); }
    
    // El modal es la prioridad ahora
    try { initPopup(); } catch (e) { console.error("Error Crítico en Modal:", e); }
});