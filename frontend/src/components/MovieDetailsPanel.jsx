import { useEffect, useState } from "react";

export default function MovieDetailsPanel({ movieId, onBack }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>Movie not found</p>;

  return (
    <div>
      <h2>{movie.title}</h2>

      <section>
        <h3>Opening Crawl</h3>
        <p>{movie.opening_crawl}</p>
      </section>

      <button onClick={onBack} style={{ marginTop: 20 }}>
        BACK TO SEARCH
      </button>
    </div>
  );
}
