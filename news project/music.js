const tokenUrl = "https://accounts.spotify.com/api/token";
const clientId = "f8f29b7cde654f559ea2e96572914b1a";
const clientSecret = "6ff532328d484167a05196ff920df64b";
let MainParent = document.getElementById("main");
MainParent.classList.add("articles-grid");

async function getAccessToken() {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
    });

    if (response.ok) {
        const data = await response.json();
        return data.access_token;
    } else {
        throw new Error('Failed to fetch access token');
    }
}

async function fetchSpotifyData(query) {
    try {
        const token = await getAccessToken();
        console.log("Access Token:", token);

        let endpoint = 'https://api.spotify.com/v1/search?type=album&q=' + encodeURIComponent(query);
        const response = await fetch(endpoint, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        const data = await response.json();
        console.log(data);
        displayAlbums(data.albums.items);

    } catch (error) {
        console.error("Error fetching music:", error);
    }
}

function displayAlbums(albums) {
    MainParent.innerHTML = ""; // Clear previous albums
    albums.forEach(album => {
        const albumDiv = document.createElement('div');
        albumDiv.classList.add('album');

        const albumCover = document.createElement('img');
        albumCover.src = album.images[0].url;
        albumCover.alt = album.name;
        albumCover.width = 400; // Adjust the width as needed
        albumCover.height = 400; // Adjust the height as needed
        
        

        const albumName = document.createElement('h3');
        albumName.textContent = album.name;

        const artistName = document.createElement('p');
        artistName.textContent = album.artists.map(artist => artist.name).join(', ');

        const releaseDate = document.createElement('p');
        releaseDate.textContent = `Release Date: ${album.release_date}`;

        albumDiv.appendChild(albumCover);
        albumDiv.appendChild(albumName);
        albumDiv.appendChild(artistName);
        albumDiv.appendChild(releaseDate);

        MainParent.appendChild(albumDiv);
    });
}

// Initial fetch (optional)
fetchSpotifyData("something");

const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");

searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
        await fetchSpotifyData(query);
    }
});

searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchSpotifyData(query);
    }
});
