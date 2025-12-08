const input = document.querySelector(".movie-input")
const searchBtn = document.querySelector(".search-btn")

searchBtn.addEventListener("click", getMovieData)

function getMovieData() {
    const movieTitle = input.value.trim()
    const url = `http://www.omdbapi.com/?apikey=e08693bc&s=${movieTitle}`
    console.log(movieTitle)
    console.log("Fetching url", url)

    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data))
}