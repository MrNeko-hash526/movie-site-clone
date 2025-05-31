import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const TMDB_API_KEY = "YOUR_API_KEY_HERE";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery().get("query") || "";
  const [randomMovie, setRandomMovie] = useState(null);

  useEffect(() => {
    if (query) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
          query
        )}`
      )
        .then((res) => res.json())
        .then((data) => {
          const results = data.results || [];
          if (results.length > 0) {
            const randomIndex = Math.floor(Math.random() * results.length);
            setRandomMovie(results[randomIndex]);
          } else {
            setRandomMovie(null);
          }
        });
    } else {
      setRandomMovie(null);
    }
  }, [query]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>
        {randomMovie
          ? `Random Movie for "${query}"`
          : `No results found for "${query}"`}
      </h2>
      {randomMovie ? (
        <div style={{ width: 220 }}>
          <img
            src={
              randomMovie.poster_path
                ? `https://image.tmdb.org/t/p/w300${randomMovie.poster_path}`
                : "https://via.placeholder.com/220x330?text=No+Image"
            }
            alt={randomMovie.title}
            style={{ width: "100%", borderRadius: 8 }}
          />
          <div style={{ color: "#fff", marginTop: 8, fontWeight: "bold" }}>
            {randomMovie.title}
          </div>
          <div style={{ color: "#ccc", marginTop: 4, fontSize: "0.95rem" }}>
            {randomMovie.release_date}
          </div>
          <div style={{ color: "#aaa", marginTop: 8, fontSize: "0.95rem" }}>
            {randomMovie.overview}
          </div>
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;