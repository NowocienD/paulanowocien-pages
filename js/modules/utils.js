import { CONFIG } from './config.js';

/**
 * Initializes global links (booking, instagram) based on config.
 */
export function initGlobalLinks() {
    const bookingLinks = document.querySelectorAll('.js-booking-link');
    const instagramLinks = document.querySelectorAll('.js-instagram-link');

    bookingLinks.forEach(link => {
        link.href = CONFIG.bookingUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
    });

    instagramLinks.forEach(link => {
        link.href = CONFIG.instagramUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
    });
}

/**
 * Updates the footer with the current year.
 */
export function initFooterYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear().toString();
    }
}
