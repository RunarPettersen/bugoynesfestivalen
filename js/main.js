import { loadArtists } from './utils/artistLoader.js';
import { setupScrollEffect } from './utils/scrollEffect.js';
import { setupCountdown } from './utils/countdown.js';

document.addEventListener('DOMContentLoaded', () => {
    const artistGrid = document.getElementById('artist-grid');

    loadArtists('./json/artists.json', artistGrid);

    setupScrollEffect();

    setupCountdown('2025-07-24');
});