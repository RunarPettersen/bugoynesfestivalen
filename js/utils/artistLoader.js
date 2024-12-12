export async function loadArtists(jsonPath, container) {
    try {
        const response = await fetch(jsonPath);
        const artists = await response.json();

        // Detect if the site is running on GitHub Pages or localhost
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const baseRepoPath = isLocal
            ? '' // No prefix for localhost
            : '/bugoynesfestivalen/'; // Prefix for GitHub Pages (update to your repo name)

        artists.forEach(artist => {
            const artistCard = document.createElement('div');
            artistCard.classList.add('artist');

            artistCard.innerHTML = `
                <a href="${baseRepoPath}artist.html?name=${encodeURIComponent(artist.name)}">
                    <img src="${baseRepoPath}${artist.image}" alt="${artist.name}">
                    <p>${artist.name}</p>
                </a>
            `;

            container.appendChild(artistCard);
        });
    } catch (error) {
        console.error('Error loading artists:', error);
    }
}