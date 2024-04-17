const TVMAZE_BASE_URL = `https://api.tvmaze.com/`;
const DEFAULT_IMG_URL = "https://tinyurl.com/tv-missing";


/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(term) {
  console.log("initializing getShowsByTerm");

  const paramTerm = new URLSearchParams({ q: term });
  const tvShowsURL = TVMAZE_BASE_URL.concat(`search/shows/?${paramTerm}`);

  const showAndScoreListJSON = await fetch(tvShowsURL);
  const showAndScoreList = await showAndScoreListJSON.json();


  const formattedShows =
    showAndScoreList.map((showAndScore) => {

      const imgFromShow = showAndScore.show.image;
      const img = imgFromShow ? imgFromShow.medium : DEFAULT_IMG_URL;

      //TODO: desctructing for singleshow.show {id, name, summary, image}

      return {
        id: showAndScore.show.id,
        name: showAndScore.show.name,
        summary: showAndScore.show.summary,
        image: img
      };
    });

  console.log("our final input for show info: ", formattedShows);
  return formattedShows;
}

/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id) {  // called on Episodes button click, which will pass id
  console.log("initialization getEpisodesOfShow()");

  const episodesURL = TVMAZE_BASE_URL.concat(`${id}/episodes`);

  const episodesJSON = await fetch(episodesURL);
  const episodesList = await episodesJSON.json();

  const formattedEpisodes = episodesList.map((episode) => {
    return (
      {
        id: episode.id,
        name: episode.name,
        season: episode.season,
        number: episode.number
      }
    );

  });

  console.log("episodes parsed json",
    formattedEpisodes
  );

}


// ADD: other functions that will be useful for getting episode/show data

export { getShowsByTerm, getEpisodesOfShow };