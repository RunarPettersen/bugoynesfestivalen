export async function loadArtists(jsonPath, container) {
    try {
        // Determine the base path for both Norwegian and English pages
        const isEnglish = window.location.pathname.includes('/en/');
        
        // Adjust the JSON path based on language and folder depth
        const adjustedJsonPath = isEnglish
            ? window.location.pathname.includes('/en/program/') || window.location.pathname.includes('/en/tickets/')
                ? '../../json/artists.json'  // If deeper in folders under 'en/'
                : '../json/artists.json'      // If in 'en/' root
            : window.location.pathname.includes('/program/') || window.location.pathname.includes('/tickets/')
                ? '../json/artists.json'      // If deeper in Norwegian folders
                : './json/artists.json';      // If in the root

        const response = await fetch(adjustedJsonPath);
        if (!response.ok) {
            throw new Error(`Failed to fetch artists from: ${adjustedJsonPath}`);
        }

        const artists = await response.json();

        artists.forEach(artist => {
            const artistCard = document.createElement('div');
            artistCard.classList.add('artist');

            // Correct the artist page link with the right language context
            const artistPagePath = isEnglish
                ? `/en/artist.html?name=${encodeURIComponent(artist.name)}`
                : `/artist.html?name=${encodeURIComponent(artist.name)}`;

            artistCard.innerHTML = `
                <a href="${artistPagePath}">
                    <img src="/${artist.image}" alt="${artist.name}">
                    <p>${artist.name}</p>
                </a>
            `;

            container.appendChild(artistCard);
        });
    } catch (error) {
        console.error('Error loading artists:', error);
        container.innerHTML = `<p>Unable to load artists. Please try again later.</p>`;
    }
}