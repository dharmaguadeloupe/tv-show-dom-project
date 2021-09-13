const allEpisodes = getAllEpisodes();
  
//You can edit ALL of the code here
function setup() {
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const main = document.getElementById("root");

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

  
  });
  
}

window.onload = setup;

/* Pseudo Code
1.All episodes must be shown
2.For each episode, AT LEAST following must be displayed:
  the episode's name
  the season number
  the episode number
  the episode's medium-sized image
  the episode's summary text
3.You should combine season number and episode number into an episode code:
  Each part should be zero-padded to two digits.
  Example: S02E07 would be the code for the 7th episode of the 2nd season. S2E7 would be incorrect.
4.Your page should state somewhere that the data has (originally) come from TVMaze.com, and link back to that site (or the specific episode on that site). See tvmaze.com/api#licensing. */