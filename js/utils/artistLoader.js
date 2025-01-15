export async function loadArtists(jsonPath, container) {
    try {
        // Check if the current language is English
        const isEnglish = window.location.pathname.includes('/en/');

        // Determine the correct path for the JSON file based on language and folder depth
        const adjustedJsonPath = isEnglish
            ? window.location.pathname.includes('/en/program/') || window.location.pathname.includes('/en/tickets/')
                ? '../../json/artists.json'  // If in a subfolder under 'en/'
                : '../json/artists.json'      // If directly under 'en/'
            : window.location.pathname.includes('/program/') || window.location.pathname.includes('/tickets/')
                ? '../json/artists.json'      // If in a subfolder under the root
                : './json/artists.json';      // If in the root

        const response = await fetch(adjustedJsonPath);
        if (!response.ok) {
            throw new Error(`Failed to fetch artists from: ${adjustedJsonPath}`);
        }

        const artists = await response.json();

        // Dynamically set the correct link and image paths based on language
        artists.forEach(artist => {
            const artistCard = document.createElement('div');
            artistCard.classList.add('artist');

            // Correct the artist page link and image paths
            const artistPagePath = isEnglish
                ? `/en/artist.html?name=${encodeURIComponent(artist.name)}`
                : `/artist.html?name=${encodeURIComponent(artist.name)}`;

            const artistImagePath = isEnglish
                ? window.location.pathname.includes('/en/program/') || window.location.pathname.includes('/en/tickets/')
                    ? `../../${artist.image}`  // If deeper in folders under 'en/'
                    : `../${artist.image}`     // If in 'en/' root
                : window.location.pathname.includes('/program/') || window.location.pathname.includes('/tickets/')
                    ? `../${artist.image}`      // If deeper in Norwegian folders
                    : `${artist.image}`;        // If in the root

            // Generate the artist card HTML
            artistCard.innerHTML = `
                <a href="${artistPagePath}">
                    <img src="${artistImagePath}" alt="${artist.name}">
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