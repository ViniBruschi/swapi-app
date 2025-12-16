import { useEffect, useState } from "react";

export default function MovieDetailsPanel({ movieUrl, onBack }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`/api/proxy?url=${encodeURIComponent(movieUrl)}`);
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setMovie(data.result?.properties || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [movieUrl]);

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>Movie not found</p>;

  return (
    <div>
      <h2>{movie.title}</h2>

      <section>
        <h3>Opening Crawl</h3>
        <p>{movie.opening_crawl}</p>
      </section>

      <section>
        <h3>Characters</h3>
        <ul>
          {movie.characters.map((charUrl, idx) => (
            <li key={idx}>
              {charUrl.split("/").slice(-1)[0]} {/* Pode buscar o nome real se quiser */}
            </li>
          ))}
        </ul>
      </section>

      <button onClick={onBack} style={{ marginTop: 20 }}>
        BACK TO SEARCH
      </button>
    </div>
  );
}
