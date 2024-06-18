let api_key = "8bb8e0732ca8a50831f911686c164855";
let popularMoviesContainer = document.querySelector(".latest .box");
let upcomingMoviesContainer = document.querySelector(".upcoming .box");
let tvShowContainer = document.querySelector(".show .box");
let swiperContainer = document.querySelector(".swiper .swiper-wrapper");

async function fetchPopularMovies() {
    let api = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`;
    try {
        let response = await fetch(api);
        let data = await response.json();
        return data.results;
    } catch (error) {
        console.log("Error fetching popular movies:", error);
        return [];
    }
}

async function fetchUpcomingMovies() {
    let api = `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}`;
    try {
        let response = await fetch(api);
        let data = await response.json();
        return data.results;
    } catch (error) {
        console.log("Error fetching upcoming movies:", error);
        return [];
    }
}

async function fetchTvShows() {
    let api = `https://api.themoviedb.org/3/tv/popular?api_key=${api_key}`;
    try {
        let response = await fetch(api);
        let data = await response.json();
        return data.results;
    } catch (error) {
        console.log("Error fetching TV shows:", error);
        return [];
    }
}

async function fetchGenres() {
    let api = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`;
    try {
        let response = await fetch(api);
        let data = await response.json();
        return data.genres;
    } catch (error) {
        console.log("Error fetching genres:", error);
        return [];
    }
}

function getGenreNames(genreIds, genres) {
    return genreIds.map(id => {
        let genre = genres.find(g => g.id === id);
        return genre ? genre.name : "Unknown";
    });
}

function createMovieCard(movie, genres) {
    let card = document.createElement("div");
    card.classList.add("card");

    let details = document.createElement("div");
    details.classList.add("details");

    let left = document.createElement("div");
    left.classList.add("left");

    let name = document.createElement("p");
    name.classList.add("name");
    name.textContent = movie.title || movie.name;

    let dateQuality = document.createElement("div");
    dateQuality.classList.add("date_quality");

    let quality = document.createElement("p");
    quality.classList.add("quality");
    quality.textContent = "HD";

    let date = document.createElement("p");
    date.classList.add("date");
    date.textContent = movie.release_date ? movie.release_date.substring(0, 4) : "-";

    let category = document.createElement("p");
    category.classList.add("category");
    category.textContent = getGenreNames(movie.genre_ids, genres).join(", ");

    let info = document.createElement("div");
    info.classList.add("info");

    let rate = document.createElement("div");
    rate.classList.add("rate");
    let starIcon = document.createElement("i");
    starIcon.classList.add("fa-solid", "fa-star");
    let rating = document.createElement("p");
    rating.textContent = movie.vote_average.toFixed(1);

    let time = document.createElement("div");
    time.classList.add("time");
    let clockIcon = document.createElement("i");
    clockIcon.classList.add("fa-regular", "fa-clock");
    let duration = document.createElement("p");
    duration.textContent = "120 min"; // Replace with actual duration data if available

    time.appendChild(clockIcon);
    time.appendChild(duration);

    rate.appendChild(starIcon);
    rate.appendChild(rating);

    dateQuality.appendChild(quality);
    dateQuality.appendChild(date);

    left.appendChild(name);
    left.appendChild(dateQuality);
    left.appendChild(category); // Implement logic to add genres

    info.appendChild(rate);
    info.appendChild(time);

    details.appendChild(left);
    details.appendChild(info);

    let right = document.createElement("div");
    right.classList.add("right");

    let playIcon = document.createElement("i");
    playIcon.classList.add("fa-solid", "fa-play");

    right.appendChild(playIcon);

    details.appendChild(right);

    card.appendChild(details);

    let image = document.createElement("img");
    image.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    card.appendChild(image);

    return card;
}

async function displayPopularMovies(genres) {
    try {
        let movies = await fetchPopularMovies();
        popularMoviesContainer.innerHTML = ""; // Clear existing content
        movies.forEach(movie => {
            let card = createMovieCard(movie, genres);
            popularMoviesContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Error displaying popular movies:", error);
    }
}

async function displayUpcomingMovies(genres) {
    try {
        let movies = await fetchUpcomingMovies();
        upcomingMoviesContainer.innerHTML = ""; // Clear existing content
        movies.forEach(movie => {
            let card = createMovieCard(movie, genres);
            upcomingMoviesContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Error displaying upcoming movies:", error);
    }
}

async function displayTvShows(genres) {
    try {
        let shows = await fetchTvShows();
        tvShowContainer.innerHTML = ""; // Clear existing content
        shows.forEach(show => {
            let card = createMovieCard(show, genres);
            tvShowContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Error displaying TV shows:", error);
    }
}

async function fetchSearchResults(query) {
    let api = `https://api.themoviedb.org/3/search/multi?api_key=${api_key}&query=${query}`;
    try {
        let response = await fetch(api);
        let data = await response.json();
        return data.results;
    } catch (error) {
        console.log("Error fetching search results:", error);
        return [];
    }
}

function createSwiperSlide(item, genres) {
    let slide = document.createElement("div");
    slide.classList.add("swiper-slide");

    let imageContainer = document.createElement("div");
    imageContainer.classList.add("image");

    let blackOverlay = document.createElement("div");
    blackOverlay.classList.add("black");

    let title = document.createElement("h1");
    title.textContent = item.title || item.name;

    let description = document.createElement("p");
    description.textContent = item.overview;

    let genreContainer = document.createElement("div");
    genreContainer.classList.add("genre");

    getGenreNames(item.genre_ids, genres).forEach(genreName => {
        let genre = document.createElement("a");
        genre.classList.add("category");
        genre.textContent = genreName;
        genreContainer.appendChild(genre);
    });

    let quality = document.createElement("a");
    quality.classList.add("category");
    let qualitySpan = document.createElement("span");
    qualitySpan.textContent = "4K";
    quality.appendChild(qualitySpan);
    genreContainer.appendChild(quality);

    let watchTrailer = document.createElement("div");
    watchTrailer.classList.add("watch");

    let playIcon = document.createElement("i");
    playIcon.classList.add("fa-solid", "fa-play");

    let watchText = document.createElement("p");
    watchText.textContent = "watch the trailer";

    watchTrailer.appendChild(playIcon);
    watchTrailer.appendChild(watchText);

    blackOverlay.appendChild(title);
    blackOverlay.appendChild(description);
    blackOverlay.appendChild(genreContainer);
    blackOverlay.appendChild(watchTrailer);

    let image = document.createElement("img");
    image.src = `https://image.tmdb.org/t/p/w500${item.poster_path}`;

    imageContainer.appendChild(blackOverlay);
    imageContainer.appendChild(image);

    slide.appendChild(imageContainer);

    return slide;
}

async function displaySearchResults(query, genres) {
    try {
        let results = await fetchSearchResults(query);
        swiperContainer.innerHTML = ""; // Clear existing content
        results.forEach(item => {
            let slide = createSwiperSlide(item, genres);
            swiperContainer.appendChild(slide);
        });
    } catch (error) {
        console.error("Error displaying search results:", error);
    }
}

document.getElementById("searchButton").addEventListener("click", async () => {
    let query = document.getElementById("searchInput").value;
    if (query.trim()) {
        let genres = await fetchGenres();
        displaySearchResults(query, genres);
    }
});

async function initialize() {
    let genres = await fetchGenres();
    displayPopularMovies(genres);
    displayUpcomingMovies(genres);
    displayTvShows(genres);
}

initialize();
