import "../component/movie-list.js";
import "../component/search-bar.js";
import endpoint from "../data/api-config";
import DataSource from "../data/data-source.js";

const main = () => {
    const searchElement = document.querySelector("search-bar");
    const movieListElement = document.querySelector("movie-list");

    const getMovieList = (endpoint) => {
        DataSource.getMovieList(endpoint).then(renderResult).catch(fallbackResult);
    };

    const onButtonSearchClicked = async () => {
        try {
            const result = await DataSource.searchMovie(searchElement.value);
            renderResult(result);
        } catch (message) {
            fallbackResult(message);
        }
    };

    const renderResult = (results) => {
        movieListElement.movies = results;
    };

    const fallbackResult = (message) => {
        movieListElement.renderError(message);
    };

    getMovieList(endpoint.nowPlaying);
    searchElement.clickEvent = onButtonSearchClicked;
};

export default main;