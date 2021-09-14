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
  const season = episode.season.toString().padStart(2, "0");
  const episodeNumber = episode.number.toString().padStart(2, "0");
  episodeTitle.textContent = `${episode.name} - S${season}E${episodeNumber}`; 

  /*Episode Image*/
  const image = episodesCard.appendChild(document.createElement("img"));
  image.setAttribute("class", "episodeImg");
  image.src = `${episode.image.medium}`;
  
  /*Episode Summary*/
  const summaryCtn = episodesCard.appendChild(document.createElement("div"));
  summaryCtn.innerHTML = `${episode.summary}`;
  });
};

window.onload = setup;
