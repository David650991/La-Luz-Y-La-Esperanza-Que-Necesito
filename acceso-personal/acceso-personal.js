'use strict';

const URL_GENERADOR_PROTEGIDO = 'https://generador-expedientes-podcast.pages.dev/index.html';

class AccesoPersonal {
  constructor() {
    this.botonGoogle = document.querySelector('[data-acceso-google]');
    this.estado = document.querySelector('[data-estado-acceso]');
  }

  iniciar() {
    this.botonGoogle?.addEventListener('click', () => this.abrirGeneradorProtegido());
  }

  abrirGeneradorProtegido() {
    if (this.botonGoogle) this.botonGoogle.disabled = true;
    if (this.estado) this.estado.textContent = 'Abriendo el acceso seguro con Google…';
    window.location.assign(URL_GENERADOR_PROTEGIDO);
  }
}

document.addEventListener('DOMContentLoaded', () => new AccesoPersonal().iniciar());
