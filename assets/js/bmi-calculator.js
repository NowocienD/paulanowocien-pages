(function() {
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

    function updateCounter() {
        const checked = document.querySelectorAll('.bmi-checkbox:checked').length;
        bmiCounter.textContent = `Zaznaczono: ${checked}/5`;
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
        if (bmi >= 30) return { eligible: true, reason: 'BMI >= 30.0' };
        if (bmi >= 27 && comorbiditiesCount >= 1) return { eligible: true, reason: 'BMI >= 27.0 + choroby współistniejące' };
        return { eligible: false };
    }

    function calculate() {
        const weightInput = bmiInputWeight.value.replace(',', '.');
        const heightInput = bmiInputHeight.value.replace(',', '.');
        const weight = parseFloat(weightInput);
        const height = parseFloat(heightInput) / 100; // cm to m
        
        const errorWeight = document.getElementById('error-weight');
        const errorHeight = document.getElementById('error-height');

        let hasError = false;

        if (weightInput && (isNaN(weight) || weight < 20 || weight > 400)) {
            errorWeight.style.display = 'block';
            hasError = true;
        } else {
            errorWeight.style.display = 'none';
        }

        if (heightInput && (isNaN(height) || height < 1.2 || height > 2.3)) {
            errorHeight.style.display = 'block';
            hasError = true;
        } else {
            errorHeight.style.display = 'none';
        }

        if (hasError || !weightInput || !heightInput) {
            bmiPlaceholder.style.display = 'block';
            bmiResultSection.style.display = 'none';
            return;
        }

        const bmi = weight / (height * height);
        const bmiRounded = bmi.toFixed(1);
        const comorbiditiesCount = updateCounter();
        const eligibility = checkEligibility(bmi, comorbiditiesCount);

        // Update UI
        bmiPlaceholder.style.display = 'none';
        bmiResultSection.style.display = 'block';
        
        bmiValueDisplay.textContent = bmiRounded;
        bmiInterpretationDisplay.textContent = getInterpretation(bmi);
        
        if (eligibility.eligible) {
            bmiQualificationBox.className = 'bmi-qualification eligible';
            bmiQualificationDisplay.textContent = 'Kwalifikujesz się do leczenia otyłości.';
            bmiBookingBtn.textContent = 'Umów konsultację';
            bmiContactBtn.textContent = 'Napisz wiadomość';
        } else {
            bmiQualificationBox.className = 'bmi-qualification not-eligible';
            bmiQualificationDisplay.textContent = 'Nie spełniasz kryteriów refundacji/wstępnej kwalifikacji wg tych kryteriów.';
            bmiBookingBtn.textContent = 'Skonsultuj mimo to';
            bmiContactBtn.textContent = 'Zadaj pytanie';
        }
        
        bmiActions.style.display = 'flex';
        
        // Aria live update
        bmiValueDisplay.setAttribute('aria-label', `Twoje BMI wynosi ${bmiRounded}`);
    }

    function fillContactForm() {
        const weight = bmiInputWeight.value;
        const height = bmiInputHeight.value;
        const bmi = bmiValueDisplay.textContent;
        const interpretation = bmiInterpretationDisplay.textContent;
        const isEligible = bmiQualificationBox.classList.contains('eligible');
        
        const selectedDiseases = [];
        bmiCheckboxes.forEach(cb => {
            if (cb.checked) {
                selectedDiseases.push(cb.parentElement.textContent.trim().split(' – ')[0].split(' (')[0]);
            }
        });

        const name = bmiNameInput.value.trim();
        const email = bmiEmailInput.value.trim();
        const phone = bmiPhoneInput.value.trim();

        let messageBody = `Dzień dobry,\n\nChciałbym/Chciałabym skonsultować wyniki z kalkulatora BMI.\n`;
        messageBody += `Dane: Waga: ${weight} kg, Wzrost: ${height} cm, BMI: ${bmi} (${interpretation}).\n`;
        
        if (selectedDiseases.length > 0) {
            messageBody += `Choroby współistniejące: ${selectedDiseases.join(', ')}.\n`;
        } else {
            messageBody += `Brak chorób współistniejących.\n`;
        }

        messageBody += `Kwalifikacja: ${isEligible ? 'Spełniam kryteria' : 'Nie spełniam kryteriów'}.\n\n`;
        
        if (name) messageBody += `Imię i nazwisko: ${name}\n`;
        if (phone) messageBody += `Telefon: ${phone}\n`;
        if (email) messageBody += `E-mail: ${email}\n`;

        const contactForm = document.getElementById('contactForm');
        const messageArea = contactForm.querySelector('textarea[name="message"]');
        const emailInput = contactForm.querySelector('input[name="email"]');
        const nameInput = contactForm.querySelector('input[name="name"]');

        if (messageArea) messageArea.value = messageBody;
        if (email && emailInput) emailInput.value = email;
        if (name && nameInput) nameInput.value = name;

        contactForm.scrollIntoView({ behavior: 'smooth' });
    }

    // Listeners
    [bmiInputWeight, bmiInputHeight].forEach(input => {
        input.addEventListener('input', calculate);
    });

    bmiCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            updateCounter();
            calculate();
        });
    });

    bmiCalculateBtn.addEventListener('click', (e) => {
        e.preventDefault();
        calculate();
    });

    bmiContactBtn.addEventListener('click', (e) => {
        e.preventDefault();
        fillContactForm();
    });

    // Medfile booking link
    if (typeof CONFIG !== 'undefined' && CONFIG.bookingUrl) {
        bmiBookingBtn.href = CONFIG.bookingUrl;
        bmiBookingBtn.target = '_blank';
    } else {
        // Fallback or wait for main.js to load
        document.addEventListener('DOMContentLoaded', () => {
            if (typeof CONFIG !== 'undefined' && CONFIG.bookingUrl) {
                bmiBookingBtn.href = CONFIG.bookingUrl;
                bmiBookingBtn.target = '_blank';
            }
        });
    }

    // Initial counter
    updateCounter();

})();
