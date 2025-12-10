const input = document.querySelector(".movie-input")
const searchBtn = document.querySelector(".search-btn")
const movieContainer = document.querySelector(".movie-container")

searchBtn.addEventListener("click", getMovieData)

function appendMovieCard(movieData) {
    const movieDiv = document.createElement("div")
    movieDiv.classList.add("movie-card")
    
    movieDiv.innerHTML = `
        <img src="${movieData.Poster}" alt="${movieData.title}" />
        <div>
            <div class="card-row">
                <h3 class="movie-title">${movieData.Title}</h3>
                <i class="fa-solid fa-star"></i>
                <span class="movie-rating">${movieData.imdbRating}</span>
            </div>
            <div class="card-row">
                <p class="movie-runtime">${movieData.Runtime}</p>
                <p class="movie-genre">${movieData.Genre}</p>
                <a class="movie-watchlist">
                    <i class="fa-solid fa-circle-plus"></i>
                    <span>My Watchlist</span>
                </a>
            </div>
            <p class="movie-plot">${movieData.Plot}</p>
        </div>
    `

        movieContainer.appendChild(movieDiv)
}

function getMovieData() {
    const movieTitle = input.value.trim()
    const searchUrl = `http://www.omdbapi.com/?apikey=e08693bc&s=${movieTitle}`
    movieContainer.innerHTML = ""

    fetch(searchUrl)
        .then(res => res.json())
        .then(data => {
            if (data.Response === "True" && data.Search) {
                data.Search.forEach(movieSummary => {
                    fetchMovieDetails(movieSummary.imdbID)
                })
            } else {
                movieContainer.textContent = "Unable to find what you're looking for. Please try another search."
            }
        })
        .catch(error => console.error("Search fetch error", error))
}

function fetchMovieDetails(imdbID) {
    const detailsUrl = `http://www.omdbapi.com/?apikey=e08693bc&i=${imdbID}`

    fetch(detailsUrl) 
        .then(res => res.json())
        .then(movieDetails => {
            console.log(movieDetails)
            if (movieDetails.Response === "True") {
                appendMovieCard(movieDetails)
            }
        })
}