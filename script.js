//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();
const rootElem = document.getElementById("root");
//const cards = rootElem.appendChild(document.createElement("div"));
//const cardCtn = cards.appendChild(document.createElement("div"));


function setup() {
  makePageForEpisodes(allEpisodes);
}

/* const navItems = [
  {href: }
]

function createNavbar() {
  const navElem = document.appendChild(document.createElement("nav"));
  nav.className = "navbar";
} */

/* function episodeCard() {
  allEpisodes.forEach(episode => {
    //const cards = rootElem.appendChild(document.createElement("div"));
    cards.setAttribute("class", "card"); 
    const cards = rootElem.appendChild(document.createElement("div"));
    cards.setAttribute("class", "card");
    const cardCtn = cards.appendChild(document.createElement("div"));
    cardCtn.setAttribute("class", "cardCtn");
    const image = document.createElement("img");
    image.src = episode.image.medium;
    cardCtn.appendChild(image);
  });
}
episodeCard(episodeData);

function episodeTitle() {
  allEpisodes.forEach(episode => {
    const list = cards.appendChild(document.createElement("ul"));
    const episodeList = list.appendChild(document.createElement("li"));
    const season = episode.season.toString().padStart(2, "0");
    const episodeNumber = episode.number.toString().padStart(2, "0");
    episodeList.textContent = `${episode.name} - S${season}E${episodeNumber}`;
  });
} */

function makePageForEpisodes() {
  
  allEpisodes.forEach(episode => {
    const cards = rootElem.appendChild(document.createElement("div"));
    cards.setAttribute("class", "card"); 

    const titleCtn = cards.appendChild(document.createElement("div"));
    titleCtn.setAttribute("class", "titleCtn");

    const list = titleCtn.appendChild(document.createElement("ul"));
    const episodeList = list.appendChild(document.createElement("li"));
    const season = episode.season.toString().padStart(2, "0");
    const episodeNumber = episode.number.toString().padStart(2, "0");
    episodeList.textContent = `${episode.name} - S${season}E${episodeNumber}`;

    const cardCtn = episodeList.appendChild(document.createElement("div"));
    cardCtn.setAttribute("class", "cardContainer");
    const image = document.createElement("img");
    image.src = episode.image.medium;
    titleCtn.appendChild(image);
    
    const summaryData = document.createElement("p");
    summaryData.textContent = episode.summary;
    
  });
  //rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  
}


window.onload = setup;


//*PSEUDO CODE
/* For each episode, AT LEAST following must be displayed:
  //the episode's name
  //the season number
  //the episode number
  //the episode's medium-sized image
  the episode's summary text */
