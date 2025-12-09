/**
 * MAIN.JS - CONTROLADOR PRINCIPAL
 * Corrección: Ejecución directa para módulos ES6
 */
import { initMobileMenu, initSmoothScroll } from './modules/ui.js';
import { initSnow } from './modules/effects.js';
import { initContactForm } from './modules/forms.js';
import { initPopup } from './modules/modal.js';

// Mensaje de depuración para confirmar que el archivo cargó
console.log('Sistema Modular Iniciando (Ejecución Directa)...');

// Ejecutamos las funciones directamente
// Ya no esperamos a DOMContentLoaded porque 'type="module"' ya lo garantiza.
initMobileMenu();
initSmoothScroll();
initSnow();
initContactForm();
initPopup();