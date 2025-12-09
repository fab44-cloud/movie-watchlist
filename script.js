const input = document.querySelector(".movie-input")
const searchBtn = document.querySelector(".search-btn")
const movieContainer = document.querySelector(".movie-container")

searchBtn.addEventListener("click", getMovieData)

function displayMovies(movie) {
    const movieDiv = document.createElement("div")
    
    movieDiv.innerHTML = `
        <img src="${movie.Poster}" />
        <div>
            <h3>${movie.Title}</h3>
            <p>${movie.Runtime}<p>
        </div>
    `

        movieContainer.appendChild(movieDiv)
}

function getMovieData() {
    const movieTitle = input.value.trim()
    const searchUrl = `http://www.omdbapi.com/?apikey=e08693bc&s=${movieTitle}`
    console.log("Fetching url", searchUrl)
    movieContainer.innerHTML = ""

    fetch(searchUrl)
        .then(res => res.json())
        .then(data => {
            if (data.Response === "True" && data.Search) {
                data.Search.forEach(movieSummary => {
                    console.log(movieSummary.imdbID)
                    fetchMovieDetails(movieSummary.imdbID)
                })
            } else {
                movieContainer.textContent = "Unable to find what you're looking for. Please try another search."
            }
            console.log(data)
            // displayMovies(data.Search)
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
                console.log(movieDetails)
                displayMovies(movieDetails)
            }
        })
}