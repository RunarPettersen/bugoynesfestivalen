export async function loadArtists(jsonPath, container) {
    try {
        const response = await fetch(jsonPath);
        const artists = await response.json();

        // Determine the base path for images (absolute paths to the project root)
        const baseImagePath = window.location.origin + '/';

        // Base path for links (relative paths to the current page)
        const linkBasePath = window.location.pathname.endsWith('/')
            ? './' // Ends in / (e.g., program/index.html)
            : '../'; // Nested pages (e.g., subfolder/index.html)

        artists.forEach(artist => {
            const artistCard = document.createElement('div');
            artistCard.classList.add('artist');

            artistCard.innerHTML = `
                <a href="${linkBasePath}artist.html?name=${encodeURIComponent(artist.name)}">
                    <img src="${baseImagePath}${artist.image}" alt="${artist.name}">
                    <p>${artist.name}</p>
                </a>
            `;

            container.appendChild(artistCard);
        });
    } catch (error) {
        console.error('Error loading artists:', error);
    }
}
