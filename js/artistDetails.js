document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const artistName = params.get('name');

    if (!artistName) {
        document.body.innerHTML = '<p>Artist not found.</p>';
        return;
    }

    try {
        // Use a consistent absolute path for both language versions
        const basePath = '../json/artists.json'; 
        const response = await fetch(basePath);

        if (!response.ok) {
            throw new Error('Failed to fetch artist data.');
        }

        const artists = await response.json();
        const artist = artists.find(a => a.name === decodeURIComponent(artistName));

        if (!artist) {
            document.body.innerHTML = '<p>Artist not found.</p>';
            return;
        }

        // **Detect the current language based on the URL path**
        const isEnglish = window.location.pathname.includes('/en/');
        const artistInfo = isEnglish ? artist.info_en : artist.info_no;

        // **Update page title and meta description dynamically (language-aware)**
        document.title = `${artist.name} - Bugøynesfestivalen`;
        const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        metaDescription.setAttribute('content', artistInfo.replace(/<[^>]*>/g, '').substring(0, 150) + '...');
        if (!document.querySelector('meta[name="description"]')) {
            document.head.appendChild(metaDescription);
        }

        // **Display artist details with language selection**
        const artistDetails = document.getElementById('artist-details');
        artistDetails.innerHTML = `
            <h1>${artist.name}</h1>
            <img src="/${artist.image}" alt="${artist.name}">
            <div>${artistInfo || '<p>No additional information available.</p>'}</div>
            <a href="${artist.homepage}" target="_blank">Visit Homepage</a>
        `;

        // **YouTube Video Embedding (if available)**
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
        document.body.innerHTML = '<p>Unable to load artist details.</p>';
    }
});