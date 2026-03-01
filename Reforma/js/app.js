document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#nav');
  const header = document.querySelector('.site-header');

  // Mobilna nawigacja
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      
      // Dodaj ikonę hamburgera/krzyżyka, jeśli nie ma jej w HTML
      navToggle.innerHTML = isOpen ? '&times;' : '&#9776;';
    });

    // Inicjalizacja ikony
    navToggle.innerHTML = '&#9776;';
    navToggle.style.fontSize = '24px';
    navToggle.style.display = 'none'; // Domyślnie ukryte, CSS pokaże na mobile

    // Zamknij menu po kliknięciu w link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        navToggle.innerHTML = '&#9776;';
      });
    });
  }

  // Efekt scrollowania dla headera
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = 'var(--shadow-sm)';
      header.style.padding = '8px 0';
    } else {
      header.style.boxShadow = 'none';
      header.style.padding = '16px 0';
    }
  });

  // Obsługa płynnego przewijania dla linków wewnętrznych
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = header.offsetHeight;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Dodanie prostego efektu wejścia dla elementów (Reveal on scroll)
  const revealElements = document.querySelectorAll('.card, .forma-item, .approach-box');
  const revealOnScroll = () => {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const isVisible = (rect.top <= window.innerHeight * 0.9);
      if (isVisible) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  };

  // Ustawienie początkowe dla efektu
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
  });

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Uruchom raz na starcie
});
