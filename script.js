const input = document.querySelector(".movie-input")
const searchBtn = document.querySelector(".search-btn")

searchBtn.addEventListener("click", getMovieData)

function displayMovies(movies) {
    const movieContainer = document.querySelector(".movie-container")
    movieContainer.innerHTML = ""

    movies.forEach((movie) => {

        const movieDiv = document.createElement("div")

        movieDiv.innerHTML = `
            <img src="${movie.Poster}" />
            <div>
                <h3>${movie.Title}</h3>
            </div>
        `

        movieContainer.appendChild(movieDiv)
    })
}

function getMovieData() {
    const movieTitle = input.value.trim()
    const url = `http://www.omdbapi.com/?apikey=e08693bc&s=${movieTitle}`
    console.log("Fetching url", url)

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data.Search)
            displayMovies(data.Search)
        })
}