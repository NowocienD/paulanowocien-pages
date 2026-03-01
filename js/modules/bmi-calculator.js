import { CONFIG } from './config.js';

/**
 * Logic for BMI calculator and qualification.
 */
export function initBMICalculator() {
    const bmiInputWeight = document.getElementById('bmi-weight');
    const bmiInputHeight = document.getElementById('bmi-height');
    const bmiCheckboxes = document.querySelectorAll('.bmi-checkbox');
    const bmiCounter = document.getElementById('bmi-comorbidities-counter');
    const bmiValueDisplay = document.getElementById('bmi-value');
    const bmiInterpretationDisplay = document.getElementById('bmi-interpretation');
    const bmiQualificationDisplay = document.getElementById('bmi-qualification-text');
    const bmiQualificationBox = document.getElementById('bmi-qualification-box');
    const bmiCalculateBtn = document.getElementById('bmi-calculate-btn');
    const bmiResultSection = document.getElementById('bmi-result-section');
    const bmiPlaceholder = document.getElementById('bmi-placeholder');

    const bmiActions = document.getElementById('bmi-actions');
    const bmiBookingBtn = document.getElementById('bmi-booking-btn');
    const bmiContactBtn = document.getElementById('bmi-contact-btn');

    const bmiNameInput = document.getElementById('bmi-name');
    const bmiEmailInput = document.getElementById('bmi-email');
    const bmiPhoneInput = document.getElementById('bmi-phone');

    const bmiMedType = document.getElementById('bmi-med-type');
    const bmiMedStatus = document.getElementsByName('med-status');

    if (!bmiInputWeight || !bmiInputHeight) return;

    function updateCounter() {
        const checked = document.querySelectorAll('.bmi-checkbox:checked').length;
        if (bmiCounter) bmiCounter.textContent = `Zaznaczono: ${checked}/5`;
        return checked;
    }

    function getInterpretation(bmi) {
        if (bmi < 18.5) return 'Niedowaga';
        if (bmi < 25) return 'Waga prawidłowa';
        if (bmi < 30) return 'Nadwaga';
        if (bmi < 35) return 'Otyłość I stopnia';
        if (bmi < 40) return 'Otyłość II stopnia';
        return 'Otyłość III stopnia';
    }

    function checkEligibility(bmi, comorbiditiesCount) {
        if (bmi >= 30) return { eligible: true };
        if (bmi >= 27 && comorbiditiesCount >= 1) return { eligible: true };
        return { eligible: false };
    }

    function calculate() {
        const weightInput = bmiInputWeight.value.replace(',', '.');
        const heightInput = bmiInputHeight.value.replace(',', '.');
        const weight = parseFloat(weightInput);
        const height = parseFloat(heightInput) / 100;

        const errorWeight = document.getElementById('error-weight');
        const errorHeight = document.getElementById('error-height');

        let hasError = false;

        if (weightInput && (isNaN(weight) || weight < 20 || weight > 400)) {
            if (errorWeight) errorWeight.style.display = 'block';
            hasError = true;
        } else {
            if (errorWeight) errorWeight.style.display = 'none';
        }

        if (heightInput && (isNaN(height) || height < 1.2 || height > 2.3)) {
            if (errorHeight) errorHeight.style.display = 'block';
            hasError = true;
        } else {
            if (errorHeight) errorHeight.style.display = 'none';
        }

        if (hasError || !weightInput || !heightInput) {
            if (bmiPlaceholder) bmiPlaceholder.style.display = 'block';
            if (bmiResultSection) bmiResultSection.style.display = 'none';
            return;
        }

        const bmi = weight / (height * height);
        const bmiRounded = bmi.toFixed(1);
        const comorbiditiesCount = Array.from(bmiCheckboxes).filter(cb => cb.checked).length;
        const eligibility = checkEligibility(bmi, comorbiditiesCount);

        if (bmiPlaceholder) bmiPlaceholder.style.display = 'none';
        if (bmiResultSection) bmiResultSection.style.display = 'block';

        if (bmiValueDisplay) {
            bmiValueDisplay.textContent = bmiRounded;
            bmiValueDisplay.setAttribute('aria-label', `Twoje BMI wynosi ${bmiRounded}`);
        }
        if (bmiInterpretationDisplay) bmiInterpretationDisplay.textContent = getInterpretation(bmi);

        if (bmiQualificationBox && bmiQualificationDisplay) {
            if (eligibility.eligible) {
                bmiQualificationBox.className = 'bmi-qualification eligible';
                bmiQualificationDisplay.textContent = 'Kwalifikujesz się do leczenia otyłości.';
                if (bmiBookingBtn) bmiBookingBtn.textContent = 'Umów konsultację';
                if (bmiContactBtn) bmiContactBtn.textContent = 'Napisz wiadomość';
            } else {
                bmiQualificationBox.className = 'bmi-qualification not-eligible';
                bmiQualificationDisplay.textContent = 'Nie spełniasz kryteriów refundacji/wstępnej kwalifikacji wg tych kryteriów.';
                if (bmiBookingBtn) bmiBookingBtn.textContent = 'Skonsultuj mimo to';
                if (bmiContactBtn) bmiContactBtn.textContent = 'Zadaj pytanie';
            }
        }

        if (bmiActions) bmiActions.style.display = 'flex';
    }

    function fillContactForm() {
        const weight = bmiInputWeight.value;
        const height = bmiInputHeight.value;
        const bmi = bmiValueDisplay ? bmiValueDisplay.textContent : '';
        const interpretation = bmiInterpretationDisplay ? bmiInterpretationDisplay.textContent : '';
        const isEligible = bmiQualificationBox ? bmiQualificationBox.classList.contains('eligible') : false;

        const selectedDiseases = [];
        bmiCheckboxes.forEach(cb => {
            if (cb.checked) {
                selectedDiseases.push(cb.parentElement.textContent.trim().split(' – ')[0].split(' (')[0]);
            }
        });

        const name = bmiNameInput ? bmiNameInput.value.trim() : '';
        const email = bmiEmailInput ? bmiEmailInput.value.trim() : '';
        const phone = bmiPhoneInput ? bmiPhoneInput.value.trim() : '';

        const medType = bmiMedType ? bmiMedType.options[bmiMedType.selectedIndex].text : '';
        const medStatusValue = Array.from(bmiMedStatus).find(r => r.checked)?.value;
        const medStatusLabel = medStatusValue === 'new' ? 'Pierwszy raz' : 'Kontynuacja';

        let messageBody = `Dzień dobry,\n\nChciałbym/Chciałabym skonsultować wyniki z kalkulatora BMI.\n`;
        messageBody += `Dane: Waga: ${weight} kg, Wzrost: ${height} cm, BMI: ${bmi} (${interpretation}).\n`;
        
        if (bmiMedType && bmiMedType.value !== 'none') {
            messageBody += `Rozważany lek: ${medType} (${medStatusLabel}).\n`;
        }

        messageBody += selectedDiseases.length > 0 ? `Choroby współistniejące: ${selectedDiseases.join(', ')}.\n` : `Brak chorób współistniejących.\n`;
        messageBody += `Kwalifikacja: ${isEligible ? 'Spełniam kryteria' : 'Nie spełniam kryteriów'}.\n\n`;

        if (name) messageBody += `Imię i nazwisko: ${name}\n`;
        if (phone) messageBody += `Telefon: ${phone}\n`;
        if (email) messageBody += `E-mail: ${email}\n`;

        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            const messageArea = contactForm.querySelector('textarea[name="message"]');
            const emailInput = contactForm.querySelector('input[name="email"]');
            const nameInput = contactForm.querySelector('input[name="name"]');

            if (messageArea) messageArea.value = messageBody;
            if (email && emailInput) emailInput.value = email;
            if (name && nameInput) nameInput.value = name;

            contactForm.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Event listeners
    [bmiInputWeight, bmiInputHeight].forEach(input => {
        input.addEventListener('input', calculate);
    });

    bmiCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            updateCounter();
            calculate();
        });
    });

    if (bmiCalculateBtn) {
        bmiCalculateBtn.addEventListener('click', (e) => {
            e.preventDefault();
            calculate();
        });
    }

    if (bmiContactBtn) {
        bmiContactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            fillContactForm();
        });
    }

    // Initialize Medfile booking link for the BMI section
    if (bmiBookingBtn) {
        bmiBookingBtn.href = CONFIG.bookingUrl;
        bmiBookingBtn.target = '_blank';
    }

    // Initial counter setup
    updateCounter();
}
