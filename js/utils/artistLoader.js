export async function loadArtists(jsonPath, container) {
    try {
        const response = await fetch(jsonPath);
        const artists = await response.json();

        // Detect if the site is running on GitHub Pages
        const isGitHubPages = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';

        // Set the base path for the repository
        const repoBasePath = isGitHubPages ? '/bugoynesfestivalen/' : '/'; // Update to your repository name if needed

        artists.forEach(artist => {
            const artistCard = document.createElement('div');
            artistCard.classList.add('artist');

            artistCard.innerHTML = `
                <a href="${repoBasePath}artist.html?name=${encodeURIComponent(artist.name)}">
                    <img src="${repoBasePath}${artist.image}" alt="${artist.name}">
                    <p>${artist.name}</p>
                </a>
            `;

            container.appendChild(artistCard);
        });
    } catch (error) {
        console.error('Error loading artists:', error);
    }
}
