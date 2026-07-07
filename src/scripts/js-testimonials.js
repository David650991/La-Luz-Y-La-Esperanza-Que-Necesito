(function () {
  function initTestimonialsCarousel() {
    const carousels = document.querySelectorAll('[data-testimonials-carousel]');

    if (!carousels.length) return;

    carousels.forEach((carousel) => {
      const track = carousel.querySelector('[data-testimonials-track]');
      const prevButton = carousel.querySelector('[data-testimonials-prev]');
      const nextButton = carousel.querySelector('[data-testimonials-next]');
      const dotsContainer = carousel.querySelector('.testimonials-dots');

      if (!track || !dotsContainer) return;

      const testimonials = [
        {
          name: 'M. S.',
          label: 'Familiar',
          text: '"Encontré un acompañamiento serio y humano. Mi familia volvió a tener calma y una guía clara para seguir adelante."',
        },
        {
          name: 'J. P.',
          label: 'Egresado',
          text: '"El proceso me ayudó a recuperar disciplina, hábitos sanos y una rutina que pude sostener al salir."',
        },
        {
          name: 'C. R.',
          label: 'Estudiante',
          text: '"Aquí tuve apoyo para continuar mis estudios mientras avanzaba en mi recuperación. Eso cambió mi panorama por completo."',
        },
        {
          name: 'A. L.',
          label: 'Paciente',
          text: '"La atención fue constante y respetuosa. Me sentí acompañado en cada etapa del proceso."',
        },
        {
          name: 'D. M.',
          label: 'Familiar',
          text: '"Vi un cambio real en la actitud y en la manera de afrontar los problemas del día a día."',
        },
        {
          name: 'R. T.',
          label: 'Egresado',
          text: '"Aprendí a pedir ayuda a tiempo y a confiar de nuevo en un plan de vida más estable."',
        },
        {
          name: 'S. G.',
          label: 'Paciente',
          text: '"La combinación de disciplina, escucha y seguimiento marcó una diferencia importante para mí."',
        },
        {
          name: 'L. H.',
          label: 'Familiar',
          text: '"La comunicación con el equipo fue clara y eso nos dio confianza durante todo el proceso."',
        },
        {
          name: 'P. C.',
          label: 'Egresado',
          text: '"Me ayudaron a reorganizar mi vida paso a paso, sin presiones innecesarias y con objetivos concretos."',
        },
        {
          name: 'V. N.',
          label: 'Paciente',
          text: '"Encontré un espacio para pensar, corregir hábitos y empezar de nuevo con mayor estabilidad."',
        },
        {
          name: 'F. A.',
          label: 'Familiar',
          text: '"El acompañamiento espiritual y emocional fue clave para sostener el avance de la persona que apoyamos."',
        },
        {
          name: 'T. B.',
          label: 'Egresado',
          text: '"Salí con herramientas reales para enfrentar la ansiedad, la presión social y los malos hábitos."',
        },
        {
          name: 'H. S.',
          label: 'Paciente',
          text: '"La atención fue cercana y ordenada; eso facilitó mucho el proceso de adaptación y cambio."',
        },
        {
          name: 'N. E.',
          label: 'Familiar',
          text: '"Ver ese avance en la conducta y en la constancia nos devolvió la esperanza como familia."',
        },
        {
          name: 'O. R.',
          label: 'Egresado',
          text: '"Hoy puedo mantener una rutina estable y sostener mis responsabilidades con más claridad."',
        },
      ];

      const groupSize = 3;
      const groups = [];

      for (let index = 0; index < testimonials.length; index += groupSize) {
        groups.push(testimonials.slice(index, index + groupSize));
      }

      track.innerHTML = groups
        .map((group) => {
          const cards = group
            .map(
              (item) => `
                <div class="testimonial-card">
                  <div class="user-icon"><i class="fas fa-user-circle"></i></div>
                  <p class="testimonio-text">${item.text}</p>
                  <div class="stars">★★★★★</div>
                  <cite>— ${item.name} <span class="rehab-time">(${item.label})</span></cite>
                </div>
              `
            )
            .join('');

          return `<div class="testimonial-slide"><div class="testimonial-grid">${cards}</div></div>`;
        })
        .join('');

      const slides = Array.from(carousel.querySelectorAll('.testimonial-slide'));

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let currentIndex = 0;
      let autoplayTimer = null;

      const dots = slides.map((_, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'testimonials-dot';
        button.setAttribute('aria-label', `Ir al testimonio ${index + 1}`);
        button.addEventListener('click', () => {
          goToSlide(index);
          restartAutoplay();
        });
        dotsContainer.appendChild(button);
        return button;
      });

      function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, index) => {
          dot.classList.toggle('is-active', index === currentIndex);
          dot.setAttribute('aria-current', index === currentIndex ? 'true' : 'false');
        });
      }

      function goToSlide(index) {
        currentIndex = (index + slides.length) % slides.length;
        updateCarousel();
      }

      function stopAutoplay() {
        if (autoplayTimer) {
          window.clearInterval(autoplayTimer);
          autoplayTimer = null;
        }
      }

      function startAutoplay() {
        if (prefersReducedMotion || slides.length < 2) return;
        stopAutoplay();
        autoplayTimer = window.setInterval(() => {
          goToSlide(currentIndex + 1);
        }, 5000);
      }

      function restartAutoplay() {
        stopAutoplay();
        startAutoplay();
      }

      if (prevButton) {
        prevButton.addEventListener('click', () => {
          goToSlide(currentIndex - 1);
          restartAutoplay();
        });
      }

      if (nextButton) {
        nextButton.addEventListener('click', () => {
          goToSlide(currentIndex + 1);
          restartAutoplay();
        });
      }

      carousel.addEventListener('mouseenter', () => {
        carousel.classList.add('is-paused');
        stopAutoplay();
      });

      carousel.addEventListener('mouseleave', () => {
        carousel.classList.remove('is-paused');
        startAutoplay();
      });

      carousel.addEventListener('focusin', () => {
        stopAutoplay();
      });

      carousel.addEventListener('focusout', () => {
        startAutoplay();
      });

      updateCarousel();
      startAutoplay();
    });
  }

  window.initTestimonialsCarousel = initTestimonialsCarousel;
})();