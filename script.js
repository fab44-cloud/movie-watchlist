const input = document.querySelector(".movie-input")
const searchBtn = document.querySelector(".search-btn")
const movieContainer = document.querySelector(".movie-container")
const mainTextContainer = document.querySelector(".main-text-container")
let movieDataCache = {}

function saveMovieToLocalStorage(movieObject) {
    const existingWatchlist = JSON.parse(localStorage.getItem("movieWatchlist")) || []

    const isAlreadyinList = existingWatchlist.some(movie => movie.imdbID === movieObject.imdbID)

    if (!isAlreadyinList) {
        existingWatchlist.unshift(movieObject)
        console.log(existingWatchlist)

        localStorage.setItem("movieWatchlist", JSON.stringify(existingWatchlist))

        console.log(`Saved ${movieObject.Title} to watchlist.`)
    }
}

searchBtn.addEventListener("click", getMovieData)

input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        e.preventDefault()
        getMovieData()
    }
})

movieContainer.addEventListener("click", function(e) {
    const watchlistBtn = e.target.closest(".movie-watchlist")

    if (watchlistBtn) {
        const movieCard = watchlistBtn.closest(".movie-card")
        const imdbID = movieCard.dataset.imdbid
        const movieDataToSave = movieDataCache[imdbID]
        saveMovieToLocalStorage(movieDataToSave)
    }
})

function appendMovieCard(movieData) {
    const movieDiv = document.createElement("div")
    movieDiv.classList.add("movie-card")

    movieDiv.dataset.imdbid = movieData.imdbID
    
    movieDiv.innerHTML = `
        <img src="${movieData.Poster}" alt="${movieData.Title}" />
        <div>
            <div class="card-row">
                <h3 class="movie-title">${movieData.Title}</h3>
                <i class="fa-solid fa-star"></i>
                <span class="movie-rating">${movieData.imdbRating}</span>
            </div>
            <div class="card-row">
                <p class="movie-runtime">${movieData.Runtime}</p>
                <p class="movie-genre">${movieData.Genre}</p>
                <div class="movie-watchlist">
                    <i class="fa-solid fa-circle-plus"></i>
                    <span>Watchlist</span>
                </div>
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
    mainTextContainer.textContent = ""

    fetch(searchUrl)
        .then(res => res.json())
        .then(data => {
            if (data.Response === "True" && data.Search) {
                data.Search.forEach(movieSummary => {
                    fetchMovieDetails(movieSummary.imdbID)
                })
            } else {
                mainTextContainer.textContent = "Unable to find what you're looking for. Please try another search."
            }
        })
        .catch(error => console.error("Search fetch error", error))
}

function fetchMovieDetails(imdbID) {
    const detailsUrl = `http://www.omdbapi.com/?apikey=e08693bc&i=${imdbID}`

    fetch(detailsUrl) 
        .then(res => res.json())
        .then(movieDetails => {
            if (movieDetails.Response === "True") {
                movieDataCache[imdbID] = movieDetails
                appendMovieCard(movieDetails)
            }
        })
}