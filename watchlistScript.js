document.addEventListener("DOMContentLoaded", () => {
    const storedWatchlistString = localStorage.getItem("movieWatchlist")

    if (storedWatchlistString) {
        const watchlistMovies = JSON.parse(storedWatchlistString)
        console.log(typeof(watchlistMovies))

        if (watchlistMovies > 0) {
            watchlistMovies.forEach(movieData => {
                displayWatchlistItem(movieData)
            })
        }
    }
})