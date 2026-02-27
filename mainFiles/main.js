// Configuration for external links
const CONFIG = {
  bookingUrl: 'https://rejestracja.medfile.pl/register/office_registration/?uuid=8e59c455-601f-3319-85f5-71ed60af9902',
  instagramUrl: 'https://instagram.com/doktor_paula'
};

// Apply links globally
function applyGlobalLinks() {
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

// Form submission using Formspree
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');

if (form && statusEl) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const email = (data.get('email') || '').toString().trim();
    const message = (data.get('message') || '').toString().trim();

    if (!email || !message) {
      statusEl.textContent = 'Uzupełnij e-mail i wiadomość.';
      statusEl.style.color = 'var(--accent)';
      return;
    }

    statusEl.textContent = 'Wysyłanie...';
    statusEl.style.color = 'var(--text-muted)';

    try {
      const response = await fetch('https://formspree.io/f/mpqjnrnq', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        statusEl.textContent = 'Wiadomość wysłana!';
        statusEl.style.color = 'var(--brand)';
        form.reset();
      } else {
        const result = await response.json();
        if (Object.hasOwn(result, 'errors')) {
          statusEl.textContent = result.errors.map(error => error.message).join(", ");
        } else {
          statusEl.textContent = 'Błąd wysyłki.';
        }
        statusEl.style.color = 'var(--accent)';
      }
    } catch (error) {
      statusEl.textContent = 'Błąd połączenia.';
      statusEl.style.color = 'var(--accent)';
    }
  });
}

// Initial application of links
document.addEventListener('DOMContentLoaded', applyGlobalLinks);
