# Paula Nowocień - Wizytówka Lekarska

Nowoczesna, responsywna strona wizytówka dla lekarza endokrynologa i dietetyka.

## Struktura Projektu (Modułowa)

Projekt został zrefaktoryzowany zgodnie z zasadami modułowości, co pozwala na łatwe reużycie fragmentów kodu (np. kalkulatora BMI) w innych projektach.

### JavaScript (`js/`)
Używamy natywnych modułów ES (ES Modules).
- `js/app.js`: Główny punkt wejścia aplikacji.
- `js/modules/config.js`: Wszystkie stałe i adresy URL (np. link do rezerwacji, Instagrama).
- `js/modules/bmi-calculator.js`: Logika kalkulatora BMI oraz kwalifikacji medycznej.
- `js/modules/navigation.js`: Obsługa menu mobilnego.
- `js/modules/form-handler.js`: Integracja formularza kontaktowego z Formspree.
- `js/modules/utils.js`: Funkcje pomocnicze (np. aktualizacja roku w stopce).

### CSS (`css/`)
Style zostały podzielone na logiczne bloki:
- `styles.css`: Główny plik importujący moduły.
- `css/modules/variables.css`: Zmienne CSS (kolory, cienie, promienie).
- `css/modules/base.css`: Reset, typografia i style bazowe.
- `css/modules/components.css`: Reużywalne komponenty (przyciski, karty, akordeony).
- `css/modules/layout.css`: Układ sekcji, header, footer oraz responsywność.

## Jak edytować?

1. **Zmiana linków (Medfile, Instagram)**: Edytuj `js/modules/config.js`.
2. **Zmiana kolorów**: Edytuj `css/modules/variables.css`.
3. **Zmiana treści**: Edytuj bezpośrednio `index.html`.

## Technologie
- HTML5 (semantyczny)
- CSS3 (Custom Properties, Flexbox, Grid)
- Vanilla JS (ES Modules)
