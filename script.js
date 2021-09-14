const allEpisodes = getAllEpisodes();
 
//You can edit ALL of the code here
function setup() {
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const main = document.getElementById("main");
  const total = document.getElementById("totalNumOfEps");
  total.innerText = `Displaying ${episodeList.length}/${allEpisodes.length} episode(s)`;
  episodeList.forEach((episode) => {

  /*Create Episode Card*/
  const episodesCard = main.appendChild(document.createElement("div"));
  episodesCard.setAttribute("class", "episodeCard");
  
  /*Episode Title*/
  const episodeTitle = episodesCard.appendChild(document.createElement("h3"));
  episodeTitle.setAttribute("class", "episodeTitle");
  const episodeName = episode.name;
  const season = episode.season.toString().padStart(2, "0");
  const episodeNumber = episode.number.toString().padStart(2, "0");
  episodeTitle.textContent = `${episodeName} - S${season}E${episodeNumber}`; 

  /*Episode Image*/
  const image = episodesCard.appendChild(document.createElement("img"));
  image.setAttribute("class", "episodeImg");
  image.src = `${episode.image.medium}`;
  
  /*Episode Summary*/
  const summaryCtn = episodesCard.appendChild(document.createElement("div"));
  summaryCtn.innerHTML = `${episode.summary}`;
  });
};

/*Search bar*/
const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("input", filterSearch);

/*Filter*/
function filterSearch(e) {
  e.preventDefault();
  let userInput = e.target.value.toLowercase();
  let filteredResults = allEpisodes.filter((episode) => {
    return (
      episode.name.toLowercase().includes(userInput) ||
      episode.summary.toLowercase().includes(userInput)
    );
  });
  makePageForEpisodes(filteredResults);
}
window.onload = setup;

/* <!-- Pseudo Code
Add a "live" search input:
Only episodes whose summary OR name contains the search term should be displayed
The search should be case-insensitive
The display should update immediately after each keystroke changes the input.
Display how many episodes match the current search
If the search box is cleared, all episodes should be shown. --> */