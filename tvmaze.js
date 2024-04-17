const TVMAZE_BASE_URL = `https://api.tvmaze.com/search/shows/`;

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(term) {
  console.log("initializing getShowsByTerm");
  // ADD: Remove placeholder & make request to TVMaze search shows API.

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

//  [
//   {
//     id: 1767,
//     name: "The Bletchley Circle",
//     summary:
//       `< p > <b>The Bletchley Circle</b> follows the journey of four ordinary;
//            women with extraordinary skills that helped to end World War II.</p>
//          <p>Set in 1952, Susan, Millie, Lucy and Jean have returned to their
//            normal lives, modestly setting aside the part they played in
//            producing crucial intelligence, which helped the Allies to victory
//            and shortened the war. When Susan discovers a hidden code behind an
//            unsolved murder she is met by skepticism from the police. She
//            quickly realises she can only begin to crack the murders and bring
//            the culprit to justice with her former friends.</p>`,
//     image:
//       "http://static.tvmaze.com/uploads/images/medium_portrait/147/369403.jpg"
//   }
// ];



// ADD: other functions that will be useful for getting episode/show data

export { getShowsByTerm };