const TVMAZE_BASE_URL = `https://api.tvmaze.com/search/shows/`;

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(term) {
  console.log("initializing getShowsByTerm");

  const paramTerm = new URLSearchParams({ q: term });
  const fetchURL = TVMAZE_BASE_URL.concat(`?${paramTerm}`);

  const fetchResponse = await fetch(fetchURL);
  const parsedFetchResponse = await fetchResponse.json();

  const defaultImgUrl = "https://tinyurl.com/tv-missing";

  const formattedShows =
    parsedFetchResponse.map((singleShow) => {

      const imgFromShow = singleShow.show.image.original;
      const img = imgFromShow ? imgFromShow : defaultImgUrl;

      return {
        id: singleShow.show.id,
        name: singleShow.show.name,
        summary: singleShow.show.summary,
        image: img
      };
    });

  console.log("our final input for show info: ", formattedShows);
  return formattedShows;
}


// ADD: other functions that will be useful for getting episode/show data

export { getShowsByTerm };