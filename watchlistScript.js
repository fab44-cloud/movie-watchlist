const movieContainer = document.querySelector(".movie-container")
const mainTextContainer = document.querySelector(".main-text-container")

// Functions
function displayEmptyMessage() {
    movieContainer.innerHTML = ""
    mainTextContainer.innerHTML = `
        <h2>Your watchlist is looking a little empty...</h2>
        <a href="index.html" class="add-movies">
            <i class="fa-solid fa-circle-plus"></i>
            <span>Let's add some movies!<span>
        </a>
    `
}

function displayWatchlistItem(movieData) {
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
                <div class="movie-watchlist remove-btn" data-imdbid="${movieData.imdbID}">
                    <i class="fa-solid fa-circle-minus"></i>
                    <span>Remove</span>
                </div>
            </div>
            <p class="movie-plot">${movieData.Plot}</p>
        </div>
    `

    movieContainer.appendChild(movieDiv)
}

function removeMovieFromLocalStorage(imdbID) {
    const existingWatchlist = JSON.parse(localStorage.getItem("movieWatchlist")) || []
    console.log("My existing watchlist:", existingWatchlist)

    const updatedWatchlist = existingWatchlist.filter(movieData => movieData.imdbID !== imdbID)
    console.log("My updated watchlist:", updatedWatchlist)

    localStorage.setItem("movieWatchlist", JSON.stringify(updatedWatchlist))
    console.log(`Removed ${imdbID} from watchlist.`)

    if (updatedWatchlist.length === 0) {
        displayEmptyMessage()
    }
}

function loadAndDisplayWatchlist() {
    const storedWatchlistString = localStorage.getItem("movieWatchlist")
    const watchlistMovies = storedWatchlistString ? JSON.parse(storedWatchlistString) : []
    
    if (watchlistMovies.length > 0) {
        mainTextContainer.textContent = ""
        watchlistMovies.forEach(movieData => {
            displayWatchlistItem(movieData)
        })
    } else {
        displayEmptyMessage()
    }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    loadAndDisplayWatchlist()
})

movieContainer.addEventListener("click", function(e) {
    const removeBtn = e.target.closest(".remove-btn")

    if (removeBtn) {
        const imdbIDToRemove = removeBtn.dataset.imdbid
        removeMovieFromLocalStorage(imdbIDToRemove)
        removeBtn.closest(".movie-card").remove()
    }
})