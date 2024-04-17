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
  const showFetchURL = TVMAZE_BASE_URL.concat(`?${paramTerm}`);
  console.log(showFetchURL);

  const fetchResponse = await fetch(showFetchURL);
  const parsedFetchResponse = await fetchResponse.json();
  console.log("parsed API response:", parsedFetchResponse);

  const formattedShows =
    parsedFetchResponse.map((singleShow) => {
      return {
        id: singleShow.show.id,
        name: singleShow.show.name,
        summary: singleShow.show.summary,
        image: singleShow.show.image.original
      };
    });

  console.log("our final input for show info: ", formattedShows);
  return formattedShows;
}


// ADD: other functions that will be useful for getting episode/show data

export { getShowsByTerm };