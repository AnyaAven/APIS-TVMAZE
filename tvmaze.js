const TVMAZE_BASE_URL = `https://api.tvmaze.com/search/shows/`; //FIXME: remove /search/shows

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(term) {
  console.log("initializing getShowsByTerm");

  const paramTerm = new URLSearchParams({ q: term });
  const tvShowsURL = TVMAZE_BASE_URL.concat(`?${paramTerm}`); //FIXME: add /search/shows/

  const fetchResponse = await fetch(tvShowsURL);
  const parsedFetchResponse = await fetchResponse.json(); //TODO: use a better name, idk the context, is it a string, idk! Give plural , list, etc.

  const defaultImgUrl = "https://tinyurl.com/tv-missing"; //FIXME: Make into global const

  const formattedShows =
    parsedFetchResponse.map((singleShow) => { //FIXME: showAndScore

      const imgFromShow = singleShow.show.image; //I don't think we need image.original
      const img = imgFromShow ? imgFromShow.original : defaultImgUrl; //Medium, original takes much longer to load

      //desctructing for singleshow.show {id, name, summary, image}

      return {
        id: singleShow.show.id,
        name: singleShow.show.name,
        summary: singleShow.show.summary,
        image: img //TODO: question, should we use just image
      };
    });

  console.log("our final input for show info: ", formattedShows);
  return formattedShows;
}


// ADD: other functions that will be useful for getting episode/show data

export { getShowsByTerm };