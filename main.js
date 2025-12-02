/**
 * MAIN.JS
 * Lógica del Centro de Rehabilitación:
 * 1. Menú Móvil (Hamburguesa).
 * 2. Efecto Nieve (Navidad).
 * 3. Formulario de Contacto (AJAX con Formspree).
 * 4. Scroll Suave (Corrección de altura del menú).
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSnow();
    initContactForm();
    initSmoothScroll();
});

/* =========================================
   1. MENÚ MÓVIL (HAMBURGUESA)
   ========================================= */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('.main-nav');
    const links = document.querySelectorAll('.main-nav a');

    if (hamburger && nav) {
        // Abrir/Cerrar menú al tocar el icono
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
            
            // Cambiar icono de barras a equis (X)
            const icon = hamburger.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Cerrar menú automáticamente al hacer clic en un enlace
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

/* =========================================
   2. EFECTO NIEVE (NAVIDAD)
   ========================================= */
function initSnow() {
    const container = document.getElementById('snow-container');
    if (!container) return;

    // Cantidad de copos de nieve (ajustable)
    const count = 50; 

    for (let i = 0; i < count; i++) {
        const flake = document.createElement('div');
        flake.classList.add('snowflake');
        flake.innerHTML = '❄'; // Carácter Unicode de nieve

        // Aleatoriedad para que se vea natural
        const left = Math.random() * 100; // Posición horizontal (0-100%)
        const animDuration = Math.random() * 5 + 5; // Duración caída (5 a 10s)
        const animDelay = Math.random() * 5; // Retraso inicial
        const size = Math.random() * 15 + 10; // Tamaño (10px a 25px)
        const opacity = Math.random() * 0.5 + 0.3; // Transparencia

        // Aplicar estilos
        flake.style.left = left + '%';
        flake.style.animationDuration = animDuration + 's';
        flake.style.animationDelay = animDelay + 's';
        flake.style.fontSize = size + 'px';
        flake.style.opacity = opacity;

        container.appendChild(flake);
    }
}

/* =========================================
   3. FORMULARIO AJAX (SIN RECARGAR PÁGINA)
   ========================================= */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const statusMsg = document.getElementById('form-status');

    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault(); // IMPORTANTE: Evita que la página se recargue

            const btn = form.querySelector('button[type="submit"]');
            const data = new FormData(event.target);

            // Feedback visual: Cambiar botón a "Enviando..."
            const originalText = btn.textContent;
            btn.disabled = true;
            btn.innerHTML = 'Enviando... <i class="fas fa-spinner fa-spin"></i>';

            try {
                // Enviar datos a Formspree
                const response = await fetch(event.target.action, {
                    method: form.method,
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    // ÉXITO
                    statusMsg.innerHTML = '<i class="fas fa-check-circle"></i> ¡Gracias! Hemos recibido tu mensaje correctamente.';
                    statusMsg.className = "status-msg success";
                    form.reset(); // Limpiar campos
                } else {
                    // ERROR DE VALIDACIÓN
                    const errorData = await response.json();
                    if (Object.hasOwn(errorData, 'errors')) {
                        statusMsg.innerHTML = errorData.errors.map(error => error["message"]).join(", ");
                    } else {
                        statusMsg.innerHTML = '<i class="fas fa-exclamation-circle"></i> Ocurrió un error al enviar. Intenta de nuevo.';
                    }
                    statusMsg.className = "status-msg error";
                }
            } catch (error) {
                // ERROR DE RED
                statusMsg.innerHTML = '<i class="fas fa-wifi"></i> Error de conexión. Verifica tu internet.';
                statusMsg.className = "status-msg error";
            } finally {
                // Restaurar botón
                btn.disabled = false;
                btn.textContent = originalText;
            }
        });
    }
}

/* =========================================
   4. SCROLL SUAVE Y OFFSET DEL HEADER
   ========================================= */
function initSmoothScroll() {
    // Esto asegura que al dar clic en el menú, el título de la sección
    // no quede escondido detrás de la barra fija del header.
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