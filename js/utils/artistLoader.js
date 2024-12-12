export async function loadArtists(jsonPath, container) {
    try {
        const response = await fetch(jsonPath);
        const artists = await response.json();

        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const baseUrl = isLocal
            ? '/'
            : `${window.location.origin}${window.location.pathname.split('/').slice(0, -1).join('/')}/`;

        artists.forEach(artist => {
            const artistCard = document.createElement('div');
            artistCard.classList.add('artist');

            artistCard.innerHTML = `
                <a href="${baseUrl}artist.html?name=${encodeURIComponent(artist.name)}">
                    <img src="${baseUrl}${artist.image}" alt="${artist.name}">
                    <p>${artist.name}</p>
                </a>
            `;

            container.appendChild(artistCard);
        });
    } catch (error) {
        console.error('Error loading artists:', error);
    }
}