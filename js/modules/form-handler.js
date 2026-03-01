import { CONFIG } from './config.js';

/**
 * Handles contact form submission with Formspree.
 */
export function initContactForm() {
    const form = document.getElementById('contactForm');
    const statusEl = document.getElementById('formStatus');

    if (!form || !statusEl) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = new FormData(form);
        const email = (data.get('email') || '').toString().trim();
        const message = (data.get('message') || '').toString().trim();

        if (!email || !message) {
            updateStatus(statusEl, 'Uzupełnij e-mail i wiadomość.', 'var(--accent)');
            return;
        }

        updateStatus(statusEl, 'Wysyłanie...', 'var(--text-muted)');

        try {
            const response = await fetch(CONFIG.formspreeUrl, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                updateStatus(statusEl, 'Wiadomość wysłana!', 'var(--brand)');
                form.reset();
            } else {
                const result = await response.json();
                const errorMessage = result.errors ? result.errors.map(err => err.message).join(", ") : 'Błąd wysyłki.';
                updateStatus(statusEl, errorMessage, 'var(--accent)');
            }
        } catch (error) {
            updateStatus(statusEl, 'Błąd połączenia.', 'var(--accent)');
        }
    });
}

function updateStatus(el, message, color) {
    el.textContent = message;
    el.style.color = color;
}
