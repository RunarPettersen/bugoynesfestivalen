export async function loadArtists(jsonPath, container) {
    try {
        const isEnglish = window.location.pathname.includes('/en/');

        const adjustedJsonPath = isEnglish
            ? window.location.pathname.includes('/en/program/') || window.location.pathname.includes('/en/tickets/')
                ? '../../json/artists.json'  
                : '../json/artists.json'      
            : window.location.pathname.includes('/program/') || window.location.pathname.includes('/tickets/')
                ? '../json/artists.json'      
                : './json/artists.json';   

        const response = await fetch(adjustedJsonPath);
        if (!response.ok) {
            throw new Error(`Failed to fetch artists from: ${adjustedJsonPath}`);
        }

        const artists = await response.json();

        artists.forEach(artist => {
            const artistCard = document.createElement('div');
            artistCard.classList.add('artist');

            const artistPagePath = isEnglish
                ? window.location.pathname.includes('/en/program/') || window.location.pathname.includes('/en/tickets/')
                    ? '../artist.html?name=' + encodeURIComponent(artist.name)
                    : './artist.html?name=' + encodeURIComponent(artist.name)
                : window.location.pathname.includes('/program/') || window.location.pathname.includes('/tickets/')
                    ? '../artist.html?name=' + encodeURIComponent(artist.name)
                    : './artist.html?name=' + encodeURIComponent(artist.name);

            const artistImagePath = isEnglish
                ? window.location.pathname.includes('/en/program/') || window.location.pathname.includes('/en/tickets/')
                    ? `../../${artist.image}`  
                    : `../${artist.image}`     
                : window.location.pathname.includes('/program/') || window.location.pathname.includes('/tickets/')
                    ? `../${artist.image}`     
                    : `${artist.image}`;        

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