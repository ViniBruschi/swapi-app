import { useEffect, useState } from "react";

export default function DetailsPanel({ item, onSeeMovie, onBack }) {
  const props = item.properties;
  const [movies, setMovies] = useState([]);
  const [moviesLoading, setMoviesLoading] = useState(true);

  const extractId = (url) => url.split("/").filter(Boolean).pop();

  useEffect(() => {
    const fetchMovies = async () => {
      if (!props.films || props.films.length === 0) {
        setMovies([]);
        setMoviesLoading(false);
        return;
      }

      try {
        const moviesWithTitles = await Promise.all(
          props.films.map(async (filmUrl) => {
            const id = extractId(filmUrl);
            try {
              const res = await fetch(`/api/swapi/films/${id}`);
              if (!res.ok) throw new Error("Failed to fetch film");
              const data = await res.json();
              return {
                id,
                title: data.title || `Film ${id}`,
              };
            } catch (err) {
              console.error(err);
              return {
                id,
                title: `Film ${id}`,
              };
            }
          })
        );

        setMovies(moviesWithTitles);
      } catch (err) {
        console.error(err);
        setMovies([]);
      } finally {
        setMoviesLoading(false);
      }
    };

    setMoviesLoading(true);
    fetchMovies();
  }, [props.films]);

  return (
    <div>
      <h2>{props.name}</h2>

      <section>
        <h3>Details</h3>
        <ul>
          <li>Birth Year: {props.birth_year}</li>
          <li>Gender: {props.gender}</li>
          <li>Hair Color: {props.hair_color}</li>
          <li>Eye Color: {props.eye_color}</li>
          <li>Height: {props.height}</li>
          <li>Mass: {props.mass}</li>
        </ul>
      </section>

      {moviesLoading && <p>Loading movies...</p>}

      {!moviesLoading && movies.length > 0 && (
        <section>
          <h3>Movies</h3>
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>
                <button
                  className="link"
                  onClick={() => onSeeMovie(movie.id)}
                >
                  {movie.title}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <button onClick={onBack} style={{ marginTop: 20 }}>
        BACK TO SEARCH
      </button>
    </div>
  );
}
