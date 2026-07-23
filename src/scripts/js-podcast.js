/* Contador y acciones del podcast. */
window.initPodcast = function initPodcast() {
    const countdown = document.querySelector('[data-live-countdown]');

    if (countdown && countdown.dataset.initialized !== 'true') {
        countdown.dataset.initialized = 'true';

        const liveAt = new Date(countdown.dataset.liveAt).getTime();
        const fields = {
            days: countdown.querySelector('[data-countdown-days]'),
            hours: countdown.querySelector('[data-countdown-hours]'),
            minutes: countdown.querySelector('[data-countdown-minutes]'),
            seconds: countdown.querySelector('[data-countdown-seconds]')
        };

        const pad = (value) => String(value).padStart(2, '0');

        const updateCountdown = () => {
            const remaining = liveAt - Date.now();

            if (remaining <= 0) {
                countdown.classList.add('is-live');
                countdown.querySelector('.podcast-countdown__label').textContent = 'La transmisión ya comenzó';
                countdown.querySelector('.podcast-countdown__date').textContent = 'Conéctate ahora para ver el episodio en vivo.';
                return false;
            }

            fields.days.textContent = pad(Math.floor(remaining / 86400000));
            fields.hours.textContent = pad(Math.floor((remaining % 86400000) / 3600000));
            fields.minutes.textContent = pad(Math.floor((remaining % 3600000) / 60000));
            fields.seconds.textContent = pad(Math.floor((remaining % 60000) / 1000));
            return true;
        };

        updateCountdown();
        const timer = window.setInterval(() => {
            if (!updateCountdown()) window.clearInterval(timer);
        }, 1000);
    }

    const shareButton = document.querySelector('[data-podcast-share]');

    if (shareButton && shareButton.dataset.initialized !== 'true') {
        shareButton.dataset.initialized = 'true';

        shareButton.addEventListener('click', async () => {
            const shareData = {
                title: 'La herida de abandono y la droga como anestesia',
                text: 'Acompáñanos en este nuevo episodio de El Origen De La Luz Y La Esperanza Que Necesito.',
                url: `${window.location.origin}${window.location.pathname}#podcast`
            };

            try {
                if (navigator.share) {
                    await navigator.share(shareData);
                    if (typeof window.trackSiteConversion === 'function') {
                        window.trackSiteConversion('podcast_share', { share_method: 'native' });
                    }
                    return;
                }

                await navigator.clipboard.writeText(shareData.url);
                if (typeof window.trackSiteConversion === 'function') {
                    window.trackSiteConversion('podcast_share', { share_method: 'clipboard' });
                }
                const label = shareButton.querySelector('[data-share-label]');
                label.textContent = 'Enlace copiado';
                window.setTimeout(() => { label.textContent = 'Compartir'; }, 2500);
            } catch (error) {
                if (error.name !== 'AbortError') console.error('No se pudo compartir el podcast:', error);
            }
        });
    }
};
