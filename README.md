# Movie-watchlist

## Description

Find movies from the open movie database on the search page and add them to your watchlist.
On the watchlist page, you will have a running list of movies that have been added and you can remove the items that you no longer want listed.

# Movie Watchlist 🎬

This app allows users to search the **OMDb API** to find films and save them to a persistent personal watchlist.

## 🚀 Live Demo

[View Live Site](https://fab44-cloud.github.io/movie-watchlist/)

## ✨ Features

- **Search Functionality**: Real-time search using the OMDb API to fetch movie titles, posters, and ratings.
- **Two-Page Layout**: Dedicated Search page (`index.html`) and Watchlist page (`watchlist.html`).
- **Persistent Storage**: Uses `localStorage` to ensure your watchlist is saved even after refreshing the browser.
- **Interactive UI**: Add or remove movies from your list with a single click.

## 🛠️ Tech Stack

- **Languages**: HTML5, CSS3, Vanilla JavaScript
- **API**: [OMDb API](https://www.omdbapi.com/)
- **Design**: Based on Scrimba's professional Figma design spec
- **Storage**: Web Storage API (localStorage)

## 📝 What I Learned

- **Asynchronous JS**: Implementing `fetch()` and handling JSON responses.
- **Async/Await**: Managing multiple API calls to gather detailed movie info.
- **Data Persistence**: Storing and retrieving complex arrays of objects from local storage.
- **UI States**: Managing "Empty Watchlist" and "No Results" states for a better user experience.
