/* ========================================================================== 
   CONTADORES INFORMATIVOS CON FIREBASE REALTIME DATABASE
   No almacena nombres, correos, teléfonos, ubicación ni información clínica.
   ========================================================================== */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js';
import { getAuth, signInAnonymously } from 'https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js';
import {
    getDatabase,
    onDisconnect,
    onValue,
    ref,
    runTransaction,
    set
} from 'https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js';

const firebaseConfig = {
    apiKey: 'AIzaSyBvrXaGFpfzLxC_MqDzOdSgHrzpBPF5sj4',
    authDomain: 'la-luz-esperanza-contadores.firebaseapp.com',
    databaseURL: 'https://la-luz-esperanza-contadores-default-rtdb.firebaseio.com',
    projectId: 'la-luz-esperanza-contadores',
    storageBucket: 'la-luz-esperanza-contadores.firebasestorage.app',
    messagingSenderId: '1070988412240',
    appId: '1:1070988412240:web:89306029bb387e40f7d855'
};

const SESSION_KEY = 'visitor_stats_counted_2026_07_16';
const panel = document.querySelector('[data-visitor-stats]');

if (panel) {
    const onlineCount = panel.querySelector('[data-online-count]');
    const totalVisits = panel.querySelector('[data-total-visits]');
    const status = panel.querySelector('[data-visitor-stats-status]');
    const numberFormat = new Intl.NumberFormat('es-MX');

    const setReady = () => {
        panel.classList.remove('is-loading', 'has-error');
        status.textContent = 'Contadores actualizados en tiempo real.';
    };

    const setUnavailable = () => {
        panel.classList.remove('is-loading');
        panel.classList.add('has-error');
        onlineCount.textContent = '—';
        totalVisits.textContent = '—';
        status.textContent = 'Los contadores no están disponibles temporalmente.';
    };

    const wasCountedInSession = () => {
        try {
            return sessionStorage.getItem(SESSION_KEY) === 'true';
        } catch (error) {
            return false;
        }
    };

    const markSessionAsCounted = () => {
        try {
            sessionStorage.setItem(SESSION_KEY, 'true');
        } catch (error) {
            // Si el navegador bloquea sessionStorage, el contador sigue siendo funcional.
        }
    };

    try {
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const database = getDatabase(app);
        const credential = await signInAnonymously(auth);
        const presenceRef = ref(database, `presence/${credential.user.uid}`);
        const connectedRef = ref(database, '.info/connected');
        const presenceRootRef = ref(database, 'presence');
        const totalVisitsRef = ref(database, 'metrics/totalVisits');

        onValue(totalVisitsRef, (snapshot) => {
            const value = snapshot.val();
            totalVisits.textContent = numberFormat.format(Number.isSafeInteger(value) ? value : 0);
            setReady();
        }, setUnavailable);

        onValue(presenceRootRef, (snapshot) => {
            onlineCount.textContent = numberFormat.format(snapshot.numChildren());
            setReady();
        }, setUnavailable);

        onValue(connectedRef, async (snapshot) => {
            if (snapshot.val() !== true) return;

            try {
                await onDisconnect(presenceRef).remove();
                await set(presenceRef, true);
            } catch (error) {
                setUnavailable();
            }
        });

        if (!wasCountedInSession()) {
            const result = await runTransaction(
                totalVisitsRef,
                (currentValue) => (Number.isSafeInteger(currentValue) ? currentValue : 0) + 1,
                { applyLocally: false }
            );

            if (result.committed) markSessionAsCounted();
        }
    } catch (error) {
        console.error('No fue posible inicializar los contadores informativos.', error);
        setUnavailable();
    }
}
