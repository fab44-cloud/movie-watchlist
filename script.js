const input = document.querySelector(".movie-input")
const searchBtn = document.querySelector(".search-btn")
const movieContainer = document.querySelector(".movie-container")

searchBtn.addEventListener("click", getMovieData)

function appendMovieCard(movieData) {
    const movieDiv = document.createElement("div")
    
    movieDiv.innerHTML = `
        <img src="${movieData.Poster}" />
        <div>
            <h3>${movieData.Title}</h3>
            <p>${movieData.Runtime}<p>
            <p>${movieData.Genre}<p>
            <p>${movieData.Plot}<p>
            <hr/>
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
            if (movieDetails.Response === "True") {
                appendMovieCard(movieDetails)
            }
        })
}