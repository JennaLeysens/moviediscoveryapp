import React, { useState, useEffect, Link } from "react";

export default function DiscoverMoviesPage() {
  const [searchText, set_searchText] = useState("");
  const [searchState, setSearchState] = useState({ status: "idle" });
  console.log(searchState);
  const search = async () => {
    console.log("Start searching for:", searchText);

    const queryParam = encodeURIComponent(searchText);

    setSearchState({ status: "searching" });

    const data = await fetch(
      `https://omdbapi.com/?apikey=fc6b182f&s=${queryParam}`
    ).then((r) => r.json());

    setSearchState({ status: "done", data: data });

    console.log("Success!", data);
  };

  return (
    <div className="container">
      <h1>Discover some movies!</h1>

      <input
        value={searchText}
        onChange={(e) => set_searchText(e.target.value)}
      />
      <button onClick={search}>Search</button>
      <div className="row">
        {searchState.status === "done" ? (
          searchState.data.Search.map((movie) => {
            return (
              <div className="col-md-3">
                <h6>
                  {movie.Title} {movie.Year}
                </h6>{" "}
                <Link to="/discover/:imdb_id">{movie.imdbID} </Link>
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
