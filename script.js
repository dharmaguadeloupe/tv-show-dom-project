// Declare variables
const renderArea = document.getElementById("main");
const api = "https://api.tvmaze.com/shows/82/episodes";
var allEpisodes = [];

// Initialize Page
function init(){
  fetch(api)
    .then((response) => response.json())
    .then((allEpisodes) => makeEpisodeCard(allEpisodes));
	episodeSelector(allEpisodes);
}

// Generate DIV's containing the episode data
// ------------------------------------------
// Parse through the full episode list using a forEach loop; splitting the data per 'episode' into a new array.
// Then, for each of those episodes, we pull out the data we need, construct a HTML div (the card) and dynamically insert the data into it.
// Finally, we draw each of those 'cards' to the screen and let the CSS styling handle their appearance.

const makeEpisodeCard = (array) => {
  renderArea.innerHTML = "";

	const wrapperCtn = document.getElementById("wrapper");

  const total = wrapperCtn.appendChild(document.getElementById("totalNumOfEps"));
  total.innerText = `Displaying ${array.length}/${allEpisodes.length} episode(s)`;

  array.forEach((episode) => {

    let { name, number, season, image, summary } = episode;
    number < 10 ? (number = `0${number}`) : (number = `${number}`);
    season < 10 ? (season = `0${season}`) : (season = `${season}`);

    let episodeCard = document.createElement("div");
    episodeCard.innerHTML = `
        <div class="movieData">
          <div class="episodeInfo">SEASON: ${season}  -  EPISODE: ${number}</div>
            <img
              src="${image.medium}"
              alt="${name}"
            />
         <div class="movieInfo">
              <h2>${name}</h2>
              </div>
         <div class="movieSummary">
              <h2>Episode Summary</h2>
              <p>${summary}</p>
         </div>
       </div>

        `;
    renderArea.appendChild(episodeCard);
  });
};

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

/*Filter*/
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

const searchBox = document.getElementById("searchForm");
const select = searchBox.appendChild(document.createElement("select"));
select.setAttribute("id", "selectorDropdown");

/*Function for episode*/
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
/*Filter */
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

// When the page loads, start the script.
// --------------------------------------

window.onload = init;
