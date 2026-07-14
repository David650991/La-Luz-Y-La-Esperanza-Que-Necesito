/* ========================================================================== 
   MEDICIÓN DE CONVERSIONES SIN DATOS PERSONALES
   Expone eventos para Google Tag Manager, GA4 u otra plataforma cuando se
   configure posteriormente. Este módulo no envía información por sí solo.
   ========================================================================== */

window.initConversionTracking = function initConversionTracking() {
    if (document.documentElement.dataset.conversionTracking === 'ready') return;
    document.documentElement.dataset.conversionTracking = 'ready';

    const getSection = (element) => element.closest('section')?.id || 'global';

    window.trackSiteConversion = function trackSiteConversion(eventName, parameters = {}) {
        const eventData = {
            event: eventName,
            event_category: 'conversion',
            ...parameters
        };

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(eventData);
        window.dispatchEvent(new CustomEvent('site:conversion', { detail: eventData }));
    };

    document.addEventListener('click', (event) => {
        const link = event.target.closest('a[href]');
        if (!link) return;

        const href = link.getAttribute('href') || '';
        const location = getSection(link);

        if (href.startsWith('tel:')) {
            window.trackSiteConversion('contact_phone_click', { conversion_location: location });
        } else if (href.includes('wa.me/')) {
            window.trackSiteConversion('contact_whatsapp_click', { conversion_location: location });
        } else if (href.includes('FUXk3V7PI30')) {
            window.trackSiteConversion('podcast_watch_click', { conversion_location: location });
        } else if (href.includes('youtube.com') && href.includes('sub_confirmation=1')) {
            window.trackSiteConversion('podcast_subscribe_click', { conversion_location: location });
        }
    });

    document.querySelectorAll('[data-current-year]').forEach((element) => {
        element.textContent = String(new Date().getFullYear());
    });
};
