import { setupScrollEffect } from './utils/scrollEffect.js';
import { setupCountdown } from './utils/countdown.js';

document.addEventListener('DOMContentLoaded', () => {

    setupScrollEffect();

    setupCountdown('2025-07-24');
});