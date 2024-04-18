import { getShowsByTerm, getEpisodesOfShow } from "./tvmaze.js";

const $showsList = document.querySelector("#showsList");
const $episodesArea = document.querySelector("#episodesArea");
const $searchForm = document.querySelector("#searchForm");

const EPISODE_BTN_CLASS = "Show-getEpisodes";


/** Given list of shows, create markup for each and append to DOM.
 *
 * A show is {id, name, summary, image}
 *
 * */

function displayShows(shows) {
  $showsList.innerHTML = '';

  for (const show of shows) {
    const $show = document.createElement("div");
    $show.dataset.showId = show.id;
    $show.className = "Show col-md-12 col-lg-6 mb-4";

    $show.innerHTML = `
         <div class="media">
           <img
              src=${show.image}
              alt=${show.name}
              class="w-25 me-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm ${EPISODE_BTN_CLASS}"
             data-showid="${show.id}">
               Episodes
             </button>
           </div>
         </div>
      `;

    $showsList.appendChild($show);
  }
}

/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchShowsAndDisplay() {
  const term = document.querySelector("#searchForm-term").value;
  const shows = await getShowsByTerm(term);

  $episodesArea.style.display = "none";
  displayShows(shows);
}


/** Get episodes from show from API and display in episode area
 *
 * episodes: { id, name, season, number }
*/

function displayEpisodes(episodes) {

  for (const episode of episodes) {
    const $episode = document.createElement("div");
    $episode.dataset.showId = episode.id;
    $episode.className = "Show col-md-12 col-lg-6 mb-4";

    $episode.innerHTML = `
         <div class="media">
           <div class="media-body">
             <h5 class="text-primary">${episode.name}</h5>
             <div><small>Season ${episode.season}, episode ${episode.number}</small>
             </div>
           </div>
         </div>
      `;

    $episodesArea.appendChild($episode);
  }
}

/**
 * Handle episode button: get episodes from API and display.
 *
 */
async function searchEpisodesAndDisplay(id){
  $episodesArea.style.display = "block";

  const episodes = await getEpisodesOfShow(id);
  displayEpisodes(episodes);
}

/** Attach event listeners to show search form and show list  */

function start() {
  $searchForm.addEventListener("submit", async function handleSearchForm(evt) {
    evt.preventDefault();

    await searchShowsAndDisplay();
  });

  $showsList.addEventListener("click", async function handleEpisodesClick(evt) {
    evt.preventDefault();

    // event delegation
    if (evt.target.matches(`button.${EPISODE_BTN_CLASS}`)) {
      const id = evt.target.dataset.showid;
      await searchEpisodesAndDisplay(id);
    }

  });
}



export {
  displayShows,
  searchShowsAndDisplay,
  start,
};