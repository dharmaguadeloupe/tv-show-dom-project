import makeEpisodeCards from "./Episodes/makeEpisodeCards.js";
import makeShowCards from "./Shows/makeShowCards.js";

// Declare variables
let allShows = [];
let allEpisodes = [];
let url = "";
//const api = "https://api.tvmaze.com/shows/82/episodes"
// Initialize Page
function init() {
  fetchEpisodes();
  fetchShows();
  
};

/*fetch Episode Data*/
function fetchEpisodes(showId) {
  fetch("https://api.tvmaze.com/shows/82/episodes", showId)
    .then((response) => response.json())
    .then((episodeData) => {
      allEpisodes = episodeData;
      makeEpisodeCards(episodeData);
      episodeSelector(episodeData);
      //getShowInfo(episodeData);
    });
}

/*Fetching shows*/
function fetchShows() {
  const url = "https://api.tvmaze.com/shows";
  fetch(url)
    .then((response) => response.json())
    .then((showData) => {
      allShows = showData;
      populateShowSelector(showData);
      makeShowCards(showData, selectShow);
    });
}  

function getShowInfo(id) {
  const url = "https://api.tvmaze.com/shows/" + id;
  fetch(url)
    .then((response) => response.json())
    .then((showInfo) => {
      updateSelectShowMenu(showInfo);
    });
}

async function getEpisodeList(showId) {
  const url = "https://api.tvmaze.com/shows/" + showId + "/episodes";
  return fetch(url)
    .then((response) => response.json())
    .then((episodeInfo) => {
      return episodeInfo;
    });
}
/*Show dropdown selector menu*/
function selectShow(showId) {
  getEpisodeList(showId)
    .then((episodes) => {
      makeEpisodeCards(episodes);
      allEpisodes = episodes;
      episodeSelector(episodes);
    });
}

/*Episode Code*/
function episodeCode(episode) {
  const episodeName = episode.name;
  const season = episode.season.toString().padStart(2, "0");
  const episodeNumber = episode.number.toString().padStart(2, "0");
  return [episodeName, season, episodeNumber ] ;
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
      episode.summary.toLowerCase().includes(userInput) ||
      episode.genres.toLowerCase().includes(userInput)
    );
  });
  makeEpisodeCards(filteredResults);
}

/*Search for episode*/
const searchBox = document.getElementById("searchForm");
const select = searchBox.appendChild(document.createElement("select"));
select.setAttribute("id", "selectorDropdown");

/*Event listener for episode select*/
select.addEventListener("change", filterSelect);

/*Episode selector*/
function episodeSelector(episodeList) {
  console.log("data: " + episodeList);
  select.innerHTML = "";
  const defaultValue = select.appendChild(document.createElement("option"));
  defaultValue.setAttribute("value", "DEFAULT");
  defaultValue.innerText = "Show all episodes";
  episodeList.forEach((episode) => {

    const [episodeName, season, episodeNumber] = episodeCode(episode);
    const episodeOption = select.appendChild(document.createElement("option"));
    /* episodeOption.value = `https://api.tvmaze.com/shows/${episode.url}/episodes`;
    episodeOption.url = episode.url; */
    episodeOption.setAttribute("value", `${episodeName}`);
    episodeOption.innerText =`S${season}E${episodeNumber} - ${episodeName}`;
  });
}

/*Filter select for episodes*/
function filterSelect() {
  const userValue = document.querySelector("select");
  let selectedValue = userValue.value;
  if(selectedValue === "DEFAULT") {
    return makeEpisodeCards(allEpisodes);
  }
  const filterUserInputValue = allEpisodes.filter((episode) => {
    return episode.name.includes(selectedValue);
  });
  makeEpisodeCards(filterUserInputValue);
}

function updateSelectShowMenu(showId) {
  const option = document.getElementById(showId);
  option.setAttribute("selected", true);
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

  const alphabeticalShowList = showData.sort((a, b) => 
  a.name.localeCompare(b.name));

  alphabeticalShowList.forEach(show => {
    const showValue = showSelectBar.appendChild(document.createElement("option"));
    /* showValue.value = `https://api.tvmaze.com/shows/${show.id}/episodes`;
    showValue.id = `${show.id}`; */
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
