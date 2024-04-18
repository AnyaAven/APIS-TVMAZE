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
  const showsAndScoreList = await showAndScoreListJSON.json();

  const formattedShows =
    showsAndScoreList.map((showAndScore) => {

      const imgFromShow = showAndScore.show.image; //I don't think we need image.original
      const img = imgFromShow ? imgFromShow.medium : DEFAULT_IMG_URL; //Medium, original takes much longer to load

      //TODO:desctructing for singleshow.show {id, name, summary, image}

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

async function getEpisodesOfShow(id) {
  console.log("getEpisodesOfShow", id);

  const episodesURL = TVMAZE_BASE_URL.concat(`shows/${id}/episodes`);

  const episodesListJSON = await fetch(episodesURL);
  const episodesList = await episodesListJSON.json();

  console.log("completed episodes list", episodesList);
  const formattedEpisodes = episodesList.map((episode) => {
    const { id, name, season, number } = {
      id: episode.id,
      name: episode.name,
      season: episode.season,
      number: episode.number
    };

    return { id, name, season, number };
  });

  console.log("completed episodes list", formattedEpisodes);

  return formattedEpisodes;
}


// ADD: other functions that will be useful for getting episode/show data

export { getShowsByTerm, getEpisodesOfShow };