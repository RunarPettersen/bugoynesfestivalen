export async function loadArtists(jsonPath, container) {
    try {
        const response = await fetch(jsonPath);
        const artists = await response.json();

        const baseUrl = `${window.location.origin}${window.location.pathname.split('/').slice(0, -1).join('/')}/`;

        artists.forEach(artist => {
            const artistCard = document.createElement('div');
            artistCard.classList.add('artist');

            artistCard.innerHTML = `
                <a href="${baseUrl}artist.html?name=${encodeURIComponent(artist.name)}">
                    <img src="${window.location.origin}/${artist.image}" alt="${artist.name}">
                    <p>${artist.name}</p>
                </a>
            `;

            container.appendChild(artistCard);
        });
    } catch (error) {
        console.error('Error loading artists:', error);
    }
}