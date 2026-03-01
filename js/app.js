import { initNavigation } from './modules/navigation.js';
import { initContactForm } from './modules/form-handler.js';
import { initGlobalLinks, initFooterYear } from './modules/utils.js';
import { initBMICalculator } from './modules/bmi-calculator.js';

/**
 * Main application entry point.
 * Initializes all modules when DOM is ready.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Basic UI elements
    initNavigation();
    initFooterYear();
    initGlobalLinks();

    // Features
    initContactForm();
    initBMICalculator();
    
    console.log('App initialized');
});
