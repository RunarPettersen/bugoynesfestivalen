import { loadArtists } from './utils/artistLoader.js';
import { setupScrollEffect } from './utils/scrollEffect.js';
import { setupCountdown } from './utils/countdown.js';

document.addEventListener('DOMContentLoaded', () => {
    const artistGrid = document.getElementById('artist-grid');

    // Load artists dynamically
    loadArtists('./json/artists.json', artistGrid);

    // Setup scroll effect
    setupScrollEffect();

    // Setup countdown
    setupCountdown('2025-07-25');
});