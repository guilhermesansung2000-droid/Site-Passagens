// alerts.js - Módulo para gerenciar alertas de e-mail e push
// Importe no script.js com: import { setupAlerts } from './alerts.js'; (se usar ES6 modules)

export function setupAlerts() {
    const alertForm = document.getElementById('alert-form');
    const pushAlertBtn = document.getElementById('push-alert');

    // Alerta de e-mail
    alertForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('alert-email').value;
        const price = document.getElementById('alert-price').value;
        emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", { to_email: email, target_price: price })
            .then(() => alert('Alerta configurado!'))
            .catch(err => console.error('Erro no e-mail:', err));
    });

    // Notificações push
    pushAlertBtn.addEventListener('click', () => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            navigator.serviceWorker.register('sw.js').then(reg => {
                reg.showNotification('Alerta Ativado', { body: 'Você será notificado de quedas de preço.' });
            });
        } else {
            alert('Notificações push não suportadas.');
        }
    });
}