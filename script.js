import makeEpisodeCard from './Episodes/episodeCard.js';
import makeShowCard from './Shows/showCard.js'; 
// Declare variables

//const renderArea = document.getElementById("main");
const api = "https://api.tvmaze.com/shows/82/episodes";
let allShows = [];
let allEpisodes = [];
let url = "";



// Initialize Page
function init() {
 /*  makeShowCard();
 let getShows = getAllShows(); */
  fetchEpisodes();
  fetchShows();
  console.log(getEpisodeList(82));
};

/*fetch Episode Data*/
function fetchEpisodes() {
  fetch(api)
    .then((response) => response.json())
    .then((episodeData) => {
      allEpisodes = episodeData;
      makeEpisodeCard(episodeData);
      episodeSelector(episodeData);
    });
}

function fetchShows() {
  const url = "https://api.tvmaze.com/shows";
  fetch(url)
    .then((response) => response.json())
    .then((showData) => {
      allShows = showData;
      populateShowSelector(showData);
      makeShowCard(showData, selectShow);
    });
}  

function getShowInfo(id) {
  const url = "https://api.tvmaze.com/shows/" + id;
  fetch(url)
    .then((response) => response.json())
    .then((showInfo) => {
      console.info(showInfo);
    });
}

function getEpisodeList(showId) {
  const url = "https://api.tvmaze.com/shows/" + showId + "/episodes";
  return fetch(url)
    .then((response) => response.json())
    .then((episodeInfo) => {
      return episodeInfo;
    });
}

function selectShow(showId) {
  getEpisodeList(showId)
    .then((episodes) => {
      makeEpisodeCard(episodes);
    });
}


/*Episode Code*/
function episodeCode(episode) {
  const episodeName = episode.name;
  const season = episode.season.toString().padStart(2, "0");
  const episodeNumber = episode.number.toString().padStart(2, "0");
  return [episodeName, season, episodeNumber];
};

/*Search bar*/
const searchBar = document.getElementById("searchField");
searchBar.addEventListener("input", filterSearch);

/*Filter search for episodes*/
function filterSearch(event) {
  event.preventDefault();
  let userInput = event.target.value.toLowerCase();
  let filteredResults = allEpisodes.filter((episode) => {
    return (
      episode.name.toLowerCase().includes(userInput) ||
      episode.summary.toLowerCase().includes(userInput)
    );
  });
  makeEpisodeCard(filteredResults);
}

/*Search for episode*/
const searchBox = document.getElementById("searchForm");
const select = searchBox.appendChild(document.createElement("select"));
select.setAttribute("id", "selectorDropdown");

/*Event listener for episode select*/
select.addEventListener("change", filterSelect);

/*Episode selector*/
function episodeSelector(episodeList) {
  const defaultValue = select.appendChild(document.createElement("option"));
  defaultValue.setAttribute("value", "DEFAULT");
  defaultValue.innerText = "Show all episodes";
  episodeList.forEach((episode) => {

    const [episodeName, season, episodeNumber] = episodeCode(episode);
    const episodeOption = select.appendChild(document.createElement("option"));
    episodeOption.setAttribute("value", `${episodeName}`);
    episodeOption.innerText =`S${season}E${episodeNumber} - ${episodeName}`;
  });
}

/*Filter select for episodes*/
function filterSelect() {
  const userValue = document.querySelector("select");
  let selectedValue = userValue.value;
  if(selectedValue === "DEFAULT") {
    return makeEpisodeCard(allEpisodes);
  }
  const filterUserInputValue = allEpisodes.filter((episode) => {
    return episode.name.includes(selectedValue);
  });
  makeEpisodeCard(filterUserInputValue);
}

/*Search for Show*/
const searchShowBar = document.getElementById("searchForm");
const showSelectBar = searchShowBar.appendChild(document.createElement("select"));
showSelectBar.setAttribute("id", "showSelectorDropdown");

 /*Show selector*/
function populateShowSelector(showData) {
  const defaultShowValue = showSelectBar.appendChild(document.createElement("option"));
  defaultShowValue.setAttribute("value", "DEFAULT");
  defaultShowValue.innerText = "Select Show";

  showData.forEach(show => {
    const showValue = showSelectBar.appendChild(document.createElement("option"));
    showValue.setAttribute("value", show.id);
    showValue.innerText = show.name;
  });
};


showSelectBar.addEventListener("change", (event) => {
 selectShow(event.target.value);
});

// When the page loads, start the script.
// --------------------------------------

window.onload = init;
