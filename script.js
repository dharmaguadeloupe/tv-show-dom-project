const allEpisodes = getAllEpisodes();
console.log(allEpisodes);
//You can edit ALL of the code here
function setup() {
  makePageForEpisodes(allEpisodes);
  episodeSelector(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const main = document.getElementById("main");
  main.innerHTML = "";
  const total = document.getElementById("totalNumOfEps");
  total.innerText = `Displaying ${episodeList.length}/${allEpisodes.length} episode(s)`;
  episodeList.forEach((episode) => {

    /*Create Episode Card*/
    const episodeCard = createEpisodeCard(episode);
    main.appendChild(episodeCard);
  });
};

function createEpisodeCard(episode) {
  const episodesCard = document.createElement("div");
  episodesCard.setAttribute("class", "episodeCard");
  
  /*Episode Title*/
  const episodeTitle = episodesCard.appendChild(document.createElement("h3"));
  episodeTitle.setAttribute("class", "episodeTitle");
  const [episodeName, season, episodeNumber] = episodeCode(episode);
  episodeTitle.textContent = `${episodeName} - S${season}E${episodeNumber}`; 

  /*Episode Image*/
  const image = episodesCard.appendChild(document.createElement("img"));
  image.setAttribute("class", "episodeImg");
  image.src = `${episode.image.medium}`;
  
  /*Episode Summary*/
  const summaryCtn = episodesCard.appendChild(document.createElement("div"));
  summaryCtn.innerHTML = `${episode.summary}`;

  return episodesCard;
}

/*Episode Code*/
function episodeCode(episode) {
  const episodeName = episode.name;
  const season = episode.season.toString().padStart(2, "0");
  const episodeNumber = episode.number.toString().padStart(2, "0");
  return [episodeName, season, episodeNumber];
};

/*Search bar*/
const searchBar = document.getElementById("searchBar");
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
  console.log(filteredResults);
  makePageForEpisodes(filteredResults);
}

const searchBox = document.getElementById("searchBox");
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

function filterSelect() {
  const userValue = document.querySelector("select");
  let selectedValue = userValue.value;
  if(selectedValue === "DEFAULT") {
    return makePageForEpisodes(allEpisodes);
  }
  const filterUserInputValue = allEpisodes.filter((episode) => {
    return episode.name.includes(selectedValue);
  });
  makePageForEpisodes(filterUserInputValue);
}
window.onload = setup;

/* <!-- Pseudo Code
Add a "live" search input:
Only episodes whose summary OR name contains the search term should be displayed
The search should be case-insensitive
The display should update immediately after each keystroke changes the input.
Display how many episodes match the current search
If the search box is cleared, all episodes should be shown. --> */