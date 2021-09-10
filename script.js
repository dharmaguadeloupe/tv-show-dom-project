//You can edit ALL of the code here
let allEpisodes = [];

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  episodeCard(allEpisodes);
  searchOptions(allEpisodes);
}

function episodeCard(allEpisodes) {
  const card = document.createElement("ul");
  card.className =  "main";

    allEpisodes.forEach(episode => {
      const list = card.appendChild(document.createElement("li"));
      list.className = "card";

    //title, season, episode number
    const episodeTitle = episode.name;
    const season = episode.season.toString().padStart(2, "0");
    const episodeNumber = episode.number.toString().padStart(2, "0");

    const cardTitle = document.createElement("h2");
    cardTitle.className = "cardTitle";
    cardTitle.textContent = `${episodeTitle} - S${season}E${episodeNumber}`;

    //image
    const imgCtn = list.appendChild(document.createElement("div"));
    imgCtn.className = "imgCtn";
    const image = imgCtn.appendChild(document.createElement("img"));
    image.src = episode.image.medium;
    image.alt = "screenshot from episode";

    //summary
    const summary = list.appendChild(document.createElement("p"));
    summary.className = "summary";
    summary.innerText = episode.summary;
  });

  const rootElem = document.getElementById("root");
  rootElem.appendChild(card);
}

function searchOptions(allEpisodes) {
  const selectOption = document.querySelector("select");

  allEpisodes.forEach((episode) => {
    const option = document.createElement("option");
    option.value = `${episode.season.toString().padStart(3, "S0")}
    ${episode.number.toString().padStart(3, "E0")}`;

    option.innerText = option.value;

    selectOption.appendChild(option);
  });
}

function makePageForEpisodes() {
  const rootElem = document.getElementById("root");

  //header
  let header = document.createElement("header");
  header.setAttribute("class", "header");
  document.body.prepend(header);

  //logo
  const headerImg = document.createElement("img");
  headerImg.src = "/images/td2.png";
  header.alt = "tellydharma logo";
  header.appendChild(headerImg);
  
  //searchBar
  const searchBarCtn = document.createElement("div");
  const displayEpisode = document.createElement("p");
  displayEpisode.setAttribute("id", "display");

  const searchBar = document.createElement("input");
  searchBar.setAttribute("type", "text");
  searchBar.placeholder = "Search";

  searchBarCtn.setAttribute("id", "inputs");
  searchBarCtn.append(searchBar, displayEpisode);

  document.body.insertBefore(searchBarCtn, rootElem);

  //select option
  const select = document.createElement("select");
  select.setAttribute("class", "select");

  const selectCtn = document.createElement("div");
  selectCtn.setAttribute("class", "selection");
  const searchBtn = document.createElement("button");
  searchBtn.setAttribute("class", "btn");
  searchBtn.innerText = "Show all episodes";

  selectCtn.append(select,searchBtn);
  document.body.insertBefore(selectCtn, searchBarCtn);

  //footer
  const footer = document.createElement("footer");
  const website = footer.appendChild(document.createElement("p"));
  website.textContent = "This content is from ";

  const link = footer.appendChild(document.createElement("a"));
  link.id = "linkId";
  link.href = "https://www.tvmaze.com";
  link.target = "_blank";
  link.innerText = "TVMaze.com";

  document.body.appendChild(footer);

  searchBtn.addEventListener("click", () => {
    const tag = document.getElementById("linkId");
    tag.href = "index.html";
    tag.target = "_self";
    tag.click();
  });
  searchBarCtn.addEventListener("input", searchList);
  select.addEventListener("click", selectList);
}

function searchList(e) {
  let page = document.getElementById("root");
  let episodeList = document.querySelector(".main");
  page.removeChild(episodeList);

  const displayEpisode = document.getElementById("display");
  let options = document.querySelector(".select");
  removeAllChildNodes(options);

  allEpisodes = getAllEpisodes();
  let userInput = e.target.value.toLowercase();
  let searches = allEpisodes.filter(episode => {
    if(episode.name.toLowercase().includes(userInput)
    || episode.summary.toLowercase().includes(userInput)) 
      return episode;
  });
  displayEpisode.textContent = `Displaying ${searches.length} of ${searches.length}`;
  episodeCard(searches);
  searchOptions(searches);
}

function selectList(e) {
  const button = document.querySelector(".searchBtn");
  button.style.display = "flex";
  allEpisodes = getAllEpisodes();
  let selected = allEpisodes.filter((episode) => {
    if(
      e.target.value === 
        `${episode.name} - ${episode.season.toString().padStart(3, "S0")}
    ${episode.number.toString().padStart(3, "E0")}`
    ) {
      return episode;
    }
  });
  let page = document.getElementById("root");
  let episodeList = document.querySelector(".main");
  page.removeChild(episodeList);
  episodeCard(selected);
}


window.onload = setup;
