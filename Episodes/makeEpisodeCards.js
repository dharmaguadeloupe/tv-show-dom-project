export default function makeEpisodeCards (array) {
  const renderArea = document.getElementById("main");
  let allEpisodes = [];
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