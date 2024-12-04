document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const artistName = params.get('name');

    if (!artistName) {
        document.body.innerHTML = '<p>Artist not found.</p>';
        return;
    }

    try {
        const response = await fetch('./json/artists.json');
        const artists = await response.json();
        const artist = artists.find(a => a.name === artistName);

        if (!artist) {
            document.body.innerHTML = '<p>Artist not found.</p>';
            return;
        }

        const artistDetails = document.getElementById('artist-details');
        artistDetails.innerHTML = `
            <h1>${artist.name}</h1>
            <img src="${artist.image}" alt="${artist.name}">
            <p>${artist.info}</p>
            <a href="${artist.homepage}" target="_blank">Besøk Hjemmeside</a>
        `;
    } catch (error) {
        console.error('Error loading artist details:', error);
        document.body.innerHTML = '<p>Unable to load artist details.</p>';
    }
});