/* ========================================================================== 
   CONSENTIMIENTO DE MEDICION - GOOGLE CONSENT MODE
   ========================================================================== */

(function initializeConsentManagement() {
    'use strict';

    const STORAGE_KEY = 'site_consent_v1';
    const banner = document.getElementById('consent-banner');

    if (!banner) return;

    const acceptButton = banner.querySelector('[data-consent-accept]');
    const rejectButton = banner.querySelector('[data-consent-reject]');

    const readPreference = () => {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (error) {
            return null;
        }
    };

    const storePreference = (preference) => {
        try {
            localStorage.setItem(STORAGE_KEY, preference);
        } catch (error) {
            // Consent Mode sigue funcionando durante la sesión actual.
        }
    };

    const updateGoogleConsent = (preference) => {
        const consentValue = preference === 'accepted' ? 'granted' : 'denied';

        if (typeof window.gtag === 'function') {
            window.gtag('consent', 'update', {
                ad_storage: consentValue,
                analytics_storage: consentValue,
                ad_user_data: consentValue,
                ad_personalization: consentValue
            });
        }

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'site_consent_update',
            consent_status: preference
        });
    };

    const saveChoice = (preference) => {
        storePreference(preference);
        updateGoogleConsent(preference);
        banner.hidden = true;
    };

    const openPreferences = () => {
        banner.hidden = false;
        const preferredButton = readPreference() === 'accepted' ? acceptButton : rejectButton;
        preferredButton?.focus();
    };

    acceptButton?.addEventListener('click', () => saveChoice('accepted'));
    rejectButton?.addEventListener('click', () => saveChoice('rejected'));

    document.addEventListener('click', (event) => {
        if (event.target.closest('[data-consent-settings]')) {
            openPreferences();
        }
    });

    if (!readPreference()) {
        banner.hidden = false;
    }
})();
