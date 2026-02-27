
// ========================================
// CENTRALNA KONFIGURACJA LINKÓW
// edytujesz tylko tutaj w przyszłości
// ========================================

const LINKS = {

  edm: '/edm1',

  instagram: '/instagram'

};


// automatyczne ustawienie href dla wszystkich data-link

document.querySelectorAll('[data-link]').forEach(element => {

  const key = element.dataset.link;

  if (LINKS[key]) {

    element.href = LINKS[key];

  }

});



// ========================================
// MENU MOBILNE
// ========================================

const navToggle = document.querySelector('.nav-toggle');

const nav = document.querySelector('.nav');


if (navToggle && nav) {

  navToggle.addEventListener('click', () => {

    const isOpen = nav.classList.toggle('open');

    navToggle.setAttribute('aria-expanded', isOpen);

  });


  // zamknij po kliknięciu linku

  nav.querySelectorAll('a').forEach(link => {

    link.addEventListener('click', () => {

      nav.classList.remove('open');

      navToggle.setAttribute('aria-expanded', false);

    });

  });


  // zamknij po kliknięciu poza menu

  document.addEventListener('click', (event) => {

    const clickedInside =

      nav.contains(event.target) ||

      navToggle.contains(event.target);


    if (!clickedInside) {

      nav.classList.remove('open');

      navToggle.setAttribute('aria-expanded', false);

    }

  });

}



// ========================================
// ROK W STOPCE
// ========================================

const yearElement = document.getElementById('year');

if (yearElement) {

  yearElement.textContent = new Date().getFullYear();

}



// ========================================
// FORMULARZ → MAILTO
// ========================================

const form = document.querySelector('[data-mailto-form]');

const formStatus = document.getElementById('formStatus');


if (form && formStatus) {

  form.addEventListener('submit', (event) => {

    event.preventDefault();


    const formData = new FormData(form);


    const name = (formData.get('name') || '').trim();

    const email = (formData.get('email') || '').trim();

    const message = (formData.get('message') || '').trim();


    if (!email || !message) {

      formStatus.textContent = 'Uzupełnij e-mail i wiadomość.';

      return;

    }


    const subject =

      '[PAULA-LEAD][WWW] Wiadomość z formularza';


    const body =

`Imię: ${name || '-'}
E-mail: ${email}

Wiadomość:
${message}

---
Strona: paulanowocien.pl
Data: ${new Date().toLocaleString()}
`;


    const mailtoLink =

      'mailto:lekarz.obesitolog@gmail.com'

      + '?subject=' + encodeURIComponent(subject)

      + '&body=' + encodeURIComponent(body);


    window.location.href = mailtoLink;


    formStatus.textContent =

      'Otwieram klienta poczty...';

  });

}
