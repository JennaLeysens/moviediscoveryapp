import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

export default function DiscoverMoviesPage() {
  //   const [searchText, set_searchText] = useState("");
  const [searchState, setSearchState] = useState({ status: "idle" });
  console.log("search", searchState);
  const history = useHistory();
  const params = useParams();
  console.log("what is this", params);

  const navigateToSearch = (searchText) => {
    const routeParam = encodeURIComponent(searchText);
    history.push(`/discover/${routeParam}`);
  };
  console.log("sigh", searchState);

  useEffect(() => {
    async function searchMovie() {
      if (params.searchtext === undefined) {
        return;
      } else {
        const search = await fetch(
          `https://omdbapi.com/?apikey=fc6b182f&s=${params.searchtext}`
        ).then((r) => r.json());
        setSearchState({ status: "done", data: search });
      }
    }
    searchMovie();
  }, [params.searchtext]);

  return (
    <div className="container">
      <h1>Discover some movies!</h1>
      <input
        value={params.searchtext}
        onChange={(e) => navigateToSearch(e.target.value)}
      />
      {/* <button onClick={setSearchState}>Search</button> */}
      <div className="row">
        {searchState.status === "done" && searchState.data.Search ? (
          searchState.data.Search.map((movie) => {
            return (
              <div className="col-md-3">
                <h6>
                  {
                    <Link to={`/movie/${movie.imdbID}`}>
                      {movie.Title} {movie.Year}
                      <div>{movie.imdbID} </div>
                    </Link>
                  }
                </h6>{" "}
                <img src={movie.Poster} width="300px" height="400px" />
              </div>
            );
          })
        ) : searchState.status === "searching" ? (
          <div className="container">Searching...</div>
        ) : null}
      </div>
    </div>
  );
}
