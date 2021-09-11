  let allEpisodes = [];
//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function episodeCard(allEpisodes) {
  allEpisodes.forEach(episode =>{

  });
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  
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