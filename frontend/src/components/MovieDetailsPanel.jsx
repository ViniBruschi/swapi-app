import { useEffect, useState } from "react";

export default function MovieDetailsPanel({ movieId, onBack, showCharacters = false }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [charactersLoading, setCharactersLoading] = useState(true);

  const extractId = (url) => url.split("/").filter(Boolean).pop();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`/api/swapi/films/${movieId}`);
        if (!res.ok) throw new Error("Network response was not ok");

        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  useEffect(() => {
    if (!showCharacters) {
      setCharacters([]);
      setCharactersLoading(false);
      return;
    }

    const fetchCharacters = async () => {
      if (!movie || !movie.characters || movie.characters.length === 0) {
        setCharacters([]);
        setCharactersLoading(false);
        return;
      }

      try {
        const charactersWithNames = await Promise.all(
          movie.characters.map(async (characterUrl) => {
            const id = extractId(characterUrl);
            try {
              const res = await fetch(`/api/swapi/people/${id}`);
              if (!res.ok) throw new Error("Failed to fetch character");
              const data = await res.json();
              return {
                id,
                name: data.properties?.name || `Character ${id}`,
              };
            } catch (err) {
              console.error(err);
              return {
                id,
                name: `Character ${id}`,
              };
            }
          })
        );

        setCharacters(charactersWithNames);
      } catch (err) {
        console.error(err);
        setCharacters([]);
      } finally {
        setCharactersLoading(false);
      }
    };

    setCharactersLoading(true);
    fetchCharacters();
  }, [movie, showCharacters]);

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>Movie not found</p>;

  return (
    <div>
      <h2>{movie.title}</h2>

      <section>
        <h3>Opening Crawl</h3>
        <p>{movie.opening_crawl}</p>
      </section>

      {showCharacters && charactersLoading && <p>Loading characters...</p>}

      {showCharacters && !charactersLoading && characters.length > 0 && (
        <section>
          <h3>Characters</h3>
          <ul>
            {characters.map((character) => (
              <li key={character.id}>
                <span>{character.name}</span>
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
