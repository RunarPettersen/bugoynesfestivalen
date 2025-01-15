document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const artistName = params.get('name');

    if (!artistName) {
        document.body.innerHTML = '<p>Artist not found.</p>';
        return;
    }

    try {
        // ✅ Adjusting the path for both local server and GitHub Pages
        const isEnglish = window.location.pathname.includes('/en/');
        const basePath = isEnglish
            ? window.location.pathname.includes('/en/artist.html')
                ? '../json/artists.json'  
                : '../../json/artists.json'  
            : window.location.pathname.includes('/artist.html')
                ? '../json/artists.json'   
                : './json/artists.json';   

        const response = await fetch(basePath);
        if (!response.ok) {
            throw new Error(`Failed to fetch artist data from: ${basePath}`);
        }

        const artists = await response.json();
        const artist = artists.find(a => a.name === decodeURIComponent(artistName));

        if (!artist) {
            document.body.innerHTML = '<p>Artist not found.</p>';
            return;
        }

        // ✅ Detect language and use the correct information
        const artistInfo = isEnglish ? artist.info_en : artist.info_no;

        // ✅ Dynamically update the page title and meta description
        document.title = `${artist.name} - Bugøynesfestivalen`;
        const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        metaDescription.setAttribute('content', artistInfo.replace(/<[^>]*>/g, '').substring(0, 150) + '...');
        if (!document.querySelector('meta[name="description"]')) {
            document.head.appendChild(metaDescription);
        }

        // ✅ Display artist details
        const artistDetails = document.getElementById('artist-details');
        artistDetails.innerHTML = `
            <h1>${artist.name}</h1>
            <img src="${artist.image.startsWith('images') ? '../' + artist.image : artist.image}" alt="${artist.name}">
            <div>${artistInfo || '<p>No additional information available.</p>'}</div>
            <a href="${artist.homepage}" target="_blank">Visit Homepage</a>
        `;

        // ✅ Embed YouTube video if available
        if (artist.youtube) {
            const youtubeEmbed = `
                <div class="youtube-video">
                    <iframe
                        width="560"
                        height="315"
                        src="${artist.youtube.replace('watch?v=', 'embed/')}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
            `;
            artistDetails.innerHTML += youtubeEmbed;
        }
    } catch (error) {
        console.error('Error loading artist details:', error);
        document.body.innerHTML = `<p>Unable to load artist details. Please try again later.</p>`;
    }
});