
function getRandomPages() {
    let randomNumber = Math.random() * (10 - 1) + 1;
    return `&page=${randomNumber}`
}



//Gets Movies from API, shows cover image and shows list of movies
async function loadTopRatedMovies() {
    let result = await callApi(`https://api.themoviedb.org/3/movie/top_rated?api_key=a4380dc0f85c95514a33d78be6cb9392?language=en-US/${getRandomPages()}`);
    let movies = result.data.results;
    let container = document.getElementById("top-rated-moviesContainer")
    movies.map(movie => {
        let image = document.createElement("img");
        image.setAttribute("src", `https://image.tmdb.org/t/p/original${movie.poster_path}`)
        image.setAttribute("class", "row_poster  zoom hover");
        image.addEventListener('click', function () {
            showTrailer(movie.id);
        });
        container.appendChild(image);
    })
}

async function loadPopularMovies() {
    let popularResult = await callApi(`https://api.themoviedb.org/3/movie/popular?api_key=a4380dc0f85c95514a33d78be6cb9392?language=en-US/${getRandomPages()}`);
    let popularMovies = popularResult.data.results;
    let popularMoviesContainer = document.getElementById("popular-moviesContainer");
    popularMovies.map(movie => {
        let image = document.createElement("img");
        image.setAttribute("src", `https://image.tmdb.org/t/p/original${movie.poster_path}`)
        image.setAttribute("class", "row_poster zoom hover")
        image.addEventListener('click', function () {
            creatHighlight(movie)
        });
        popularMoviesContainer.appendChild(image);
    })
}

async function loadUpComingMovies() {
    let upcomingResult = await callApi("https://api.themoviedb.org/3/movie/upcoming?api_key=a4380dc0f85c95514a33d78be6cb9392?language=en-US/&page=1");
    let upcomingMovies = upcomingResult.data.results;
    let upcomingMoviesContainer = document.getElementById("upcoming-moviesContainer");
    upcomingMovies.map(movie => {
        let image = document.createElement("img");
        image.setAttribute("src", `https://image.tmdb.org/t/p/original${movie.poster_path}`)
        image.setAttribute("class", "row_poster zoom hover")
        image.addEventListener('click', function () {
            creatHighlight(movie)
        });
        upcomingMoviesContainer.appendChild(image);
    })
}

async function loadNowPlayingMovies() {
    let nowplayingResult = await callApi("https://api.themoviedb.org/3/movie/now_playing?api_key=a4380dc0f85c95514a33d78be6cb9392?language=en-US/&page=2");
    let nowplayingMovies = nowplayingResult.data.results;
    let nowplayingMoviesContainer = document.getElementById("nowplaying-MoviesContainer");
    nowplayingMovies.map(movie => {
        let image = document.createElement("img");
        image.setAttribute("src", `https://image.tmdb.org/t/p/original${movie.poster_path}`)
        image.setAttribute("class", "row_poster zoom hover")
        image.addEventListener('click', function () {
            creatHighlight(movie)
        });
        nowplayingMoviesContainer.appendChild(image);
    })
}
async function loadTrailers(id) {
    let trailersResult = await callApi(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=a4380dc0f85c95514a33d78be6cb9392?language=en-US`);
    let trailerVideos = trailersResult.data.results;

    console.log(trailerVideos);
    return trailerVideos;

}

function setUpPage() {
    let logocontainer = document.getElementById("logo");
    logocontainer.setAttribute("src", "./Netflix.png")
    let avatar1container = document.getElementById("avatar1");
    avatar1container.setAttribute("src", "./search.png")

    let avatar2container = document.getElementById("avatar2");
    avatar2container.setAttribute("src", "./notification.png")

    let avatar3container = document.getElementById("avatar3");
    avatar3container.setAttribute("src", "./user.png")
}



function creatHighlight(movie) {
    console.log(movie)
    document.getElementById("highLight").style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.poster_path})`;
    document.getElementById("highlight-text").innerText = movie.title;


}
async function showTrailer(id) {
    let trailers = await loadTrailers(id);
    console.log(trailers)
    let movieTrailer = trailers[0];
    let keysource = movieTrailer.key
    let highlightcontainer = document.getElementById("highLight");
    highlightcontainer.innerHTML = "";
    let iframe = document.createElement("iframe");
    iframe.setAttribute('id', 'trailer');
    iframe.setAttribute('width', '2971'); // Set the width of the video player
    iframe.setAttribute('height', '750'); // Set the height of the video player    iframe.setAttribute('frameborder', '0'); // Disable the border
    iframe.setAttribute('allowfullscreen', 'true');
    // iframe.setAttribute = ('src', `https://www.youtube.com/embed/${keysource}`);
    iframe.src = `https://www.youtube.com/embed/${keysource}?autoplay=1&mute=1`;
    highlightcontainer.appendChild(iframe);
}


async function callApi(url) {
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDM4MGRjMGY4NWM5NTUxNGEzM2Q3OGJlNmNiOTM5MiIsInN1YiI6IjY1N2EwZTM5N2EzYzUyMDBjYTdhYTU2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RGB9jqt2rFI32wJFw7mjn_UeogbNvb_-bspat3LGylk";
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    }

    let response = await axios.get(url, { headers: headers }).then(response => { return response }).catch(error => console.log(error));
    return response;
}







// let coverImage = document.createElement("img");
// coverImage.setAttribute("src", `https://image.tmdb.org/t/p/original${movies[0
// ].poster_path}`)
// covercontainer.appendChild(coverImage);