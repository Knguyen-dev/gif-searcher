const DomModule = (() => {
    // Get search related elements
    const searchGifForm = document.querySelector("#search-gif-form");
    const inputSearchEl = document.querySelector("#input-search-el");

    // Get elements for main-content section
    const searchOutputMessageEl = document.querySelector(
        "#search-output-message-el"
    );

    const searchOutputImgContainer = document.querySelector(
        "#output-img-container"
    );
    const searchOutputImg = document.querySelector("#search-output-img");

    // Relevant footer elements
    const footerInfoEl = document.querySelector("#footer-info-el");
    const dateEl = document.querySelector("#date-el");

    // Event listener for dealing with the submission of search queries
    searchGifForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const searchTerm = inputSearchEl.value;
        const requestURL = createRequestURL(searchTerm);
        requestGif(requestURL);
    });

    return {
        searchGifForm,
        inputSearchEl,
        searchOutputMessageEl,
        searchOutputImgContainer,
        searchOutputImg,
        footerInfoEl,
        dateEl,
    };
})();

// loads footer date
function loadFooterDate() {
    const currentYear = new Date().getFullYear();
    DomModule.dateEl.textContent = currentYear;
}

// loads initial or starter page
function loadInitialPage() {
    DomModule.searchOutputMessageEl.textContent =
        "Try searching for something!"; // load initial text
    DomModule.searchOutputImg.src = "./assets/start_search.jpg"; // load initial image
}

// Loads/render text and image indicating that the user's search didn't work
function loadSearchError(error) {
    DomModule.searchOutputMessageEl.textContent = `Sorry, we ran into a problem while searching!`;
    DomModule.searchOutputImg.src = "./assets/search_not_found.jpg";
    console.log(`Couldn't load picture: ${error}`);
}

// Loads image and text for a successful search
function loadSuccessfulSearch(imgURL) {
    DomModule.searchOutputImg.src = imgURL;
    DomModule.searchOutputMessageEl.textContent = "Here's what we found!";
}

// Creates the url for doing the http request
function createRequestURL(searchTerm) {
    const apiKey = "NEs7tmX6Z6Up0BlOyfGtmFbMHoe2fTKh"; // free api key
    const baseURL = `https://api.giphy.com/v1/gifs/translate?`;
    // Build the url for the http request and reutrn it
    let requestURL = `${baseURL}api_key=${apiKey}&s=${searchTerm}`;
    return requestURL;
}

// Requests and loads a gif; also does err rhandling responsible for that as well.
function requestGif(requestURL) {
    const requestPromise = fetch(requestURL, { mode: "cors" });
    requestPromise
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            return response.json();
        })
        .then((result) => {
            loadSuccessfulSearch(result.data.images.original.url);
        })
        .catch(loadSearchError(error));
}

window.addEventListener("DOMContentLoaded", () => {
    loadFooterDate();
    loadInitialPage();
});
