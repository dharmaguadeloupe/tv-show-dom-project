export default function makeShowCards (array, onShowClick) {
  const renderArea = document.getElementById("main");
  let allShows = [];
  renderArea.innerHTML = "";

  array.forEach((show) => {
    
    let { name, rating, genres, image, summary, status, runtime } = show;
   
    let showCard = document.createElement("div");
    showCard.addEventListener("click", () => {
      onShowClick(show.id);
    });

    showCard.innerHTML = `
        <div class="movieData">
          <div class="movieInfo">
              <h2>${name}</h2>
              </div>
            <img
              src="${image.medium}"
              alt="${name}"
            />
            <div class="showInfo">
              <p>Rating: ${rating.average} <br/> <p/>
              <p>Genres: ${genres}<br/> </p>
              <p>Status: ${status}<br/></p>
              <p>Runtime: ${runtime}<br/></p>
            </div>
         <div class="movieSummary">
              <h2>Episode Summary</h2>
              <p>${summary}</p>
         </div>
       </div>

        `;
    renderArea.appendChild(showCard);
  });
};