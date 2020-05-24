import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function MoviePage() {
  const [movieData, set_movieData] = useState({ state: "fetchingMovieData" });
  const params = useParams();
  const url = `/movie/${params.imdb_id}`;

  useEffect(() => {
    async function fetchData() {
      const moviePage = await fetch(
        `http://www.omdbapi.com/?apikey=fc6b182f&s&i=${params.imdb_id}`
      ).then((r) => r.json());
      console.log("hello", moviePage);
      set_movieData({ state: "fetched", data: moviePage });
    }

    fetchData();
  }, [params.imdb_id]);
  console.log("help", movieData);
  console.log("who?", params);
  return (
    <div className="container">
      {movieData.state === "fetched" ? (
        <div>
          {" "}
          <h2>{movieData.data.Title}</h2>{" "}
          <h6>IMDB RATING: {movieData.data.imdbRating}</h6>
          <h6>GENRE: {movieData.data.Genre}</h6>
          <h6>PLOT: {movieData.data.Plot}</h6>
          <img src={movieData.data.Poster} width="300px" height="400px" />
        </div>
      ) : null}
    </div>
  );
}
