import { setupScrollEffect } from './utils/scrollEffect.js';
import { setupCountdown } from './utils/countdown.js';

document.addEventListener('DOMContentLoaded', () => {


    // Setup scroll effect
    setupScrollEffect();

    // Setup countdown
    setupCountdown('2025-07-25');
});