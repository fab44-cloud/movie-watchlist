const movieContainer = document.querySelector(".movie-container")

document.addEventListener("DOMContentLoaded", () => {
    const storedWatchlistString = localStorage.getItem("movieWatchlist")

    if (storedWatchlistString) {
        const watchlistMovies = JSON.parse(storedWatchlistString)

        if (watchlistMovies.length > 0) {
            watchlistMovies.forEach(movieData => {
                displayWatchlistItem(movieData)
            })
        } 
    }
})

function displayWatchlistItem(movieData) {
    const movieDiv = document.createElement("div")
    movieDiv.classList.add("movie-card")
    
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

movieContainer.addEventListener("click", function(e) {
    const removeBtn = e.target.closest(".remove-btn")

    if (removeBtn) {
        const imdbIDToRemove = removeBtn.dataset.imdbid
        // removeMovieFromLocalStorage(imdbIDToRemove)
        removeBtn.closest(".movie-card").remove()
    }
})