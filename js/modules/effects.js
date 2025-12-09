/* MÓDULO: EFECTOS VISUALES */
export function initSnow() {
    const container = document.getElementById('snow-container');
    if (!container) return;

    const count = 50;
    for (let i = 0; i < count; i++) {
        const flake = document.createElement('div');
        flake.classList.add('snowflake');
        flake.innerHTML = '❄';

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