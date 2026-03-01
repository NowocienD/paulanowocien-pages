/**
 * Mobile navigation and toggle menu handler.
 */
export function initNavigation() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');

    if (!toggle || !nav) return;

    // Toggle menu
    toggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu after clicking a link (mobile)
    nav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            if (nav.classList.contains('open')) {
                closeMenu(nav, toggle);
            }
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        const clickedInside = nav.contains(e.target) || toggle.contains(e.target);
        if (!clickedInside && nav.classList.contains('open')) {
            closeMenu(nav, toggle);
        }
    });
}

function closeMenu(nav, toggle) {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
}
