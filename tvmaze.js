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

  const showInfo = await parsedFetchResponse[0];
  console.log("accessing index 0", showInfo);

  const formattedShowInfo = [
    {
      id: showInfo.show.id,
      name: showInfo.show.name,
      summary: showInfo.show.summary,
      image: showInfo.show.image.original
    }
  ];

  console.log("our final input for show info: ", formattedShowInfo);
  return formattedShowInfo;
}


// ADD: other functions that will be useful for getting episode/show data

export { getShowsByTerm };