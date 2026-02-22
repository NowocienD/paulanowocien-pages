// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu after clicking a link (mobile)
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    const clickedInside = nav.contains(e.target) || toggle.contains(e.target);
    if (!clickedInside && nav.classList.contains('open')) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mailto form (no backend)
const form = document.querySelector('[data-mailto-form]');
const statusEl = document.getElementById('formStatus');

if (form && statusEl) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = (data.get('name') || '').toString().trim();
    const email = (data.get('email') || '').toString().trim();
    const message = (data.get('message') || '').toString().trim();

    if (!email || !message) {
      statusEl.textContent = 'Uzupełnij e-mail i wiadomość.';
      return;
    }

    const to = 'lekarz.obesitolog@gmail.com';
    const subject = '[PAULA-LEAD][WWW] Wiadomość z formularza';
    const body =
      `Imię: ${name || '-'}\n` +
      `E-mail: ${email}\n\n` +
      `Wiadomość:\n${message}\n\n` +
      `---\n` +
      `Źródło: strona (GitHub Pages)\n` +
      `Data: ${new Date().toISOString()}\n`;

    const mailto =
      `mailto:${encodeURIComponent(to)}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    statusEl.textContent = 'Otwieram klienta poczty z gotową wiadomością…';
  });
}
