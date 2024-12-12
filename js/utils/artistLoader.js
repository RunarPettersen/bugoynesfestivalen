export async function loadArtists(jsonPath, container) {
    try {
        const response = await fetch(jsonPath);
        const artists = await response.json();

        // Resolve the base path for images relative to the current page
        const basePath = window.location.pathname.includes('/')
            ? '../' // Adjust path if in a subfolder
            : './'; // Use current folder if in the root

        artists.forEach(artist => {
            const artistCard = document.createElement('div');
            artistCard.classList.add('artist');

            artistCard.innerHTML = `
                <a href="${basePath}artist.html?name=${encodeURIComponent(artist.name)}">
                    <img src="${basePath}${artist.image}" alt="${artist.name}">
                    <p>${artist.name}</p>
                </a>
            `;

            container.appendChild(artistCard);
        });
    } catch (error) {
        console.error('Error loading artists:', error);
    }
}