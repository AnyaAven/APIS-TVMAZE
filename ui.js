import { getShowsByTerm, getEpisodesOfShow } from "./tvmaze.js";

const $showsList = document.querySelector("#showsList");
const $episodesArea = document.querySelector("#episodesArea");
const $searchForm = document.querySelector("#searchForm");
const episodesBtn = "Show-getEpisodes";

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
             <button class="btn btn-outline-light btn-sm ${episodesBtn}">
               Episodes
             </button>
           </div>
         </div>
      `;


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


  // TODO: make sure to add eventlistener and call showepisodes


  /** Write a clear docstring for this function... */

  // function displayEpisodes(episodes) { }

  // add other functions that will be useful / match our structure & design
  // and udpate start as necessary


  /** Attach event listeners to show search form and show list  */ // TODO:
  // append to #episodesArea

  function start() {
    $searchForm.addEventListener("submit", async function handleSearchForm(evt) {
      evt.preventDefault();
      await searchShowsAndDisplay();
    });

  }


  export {
    displayShows,
    searchShowsAndDisplay,
    start,
  };