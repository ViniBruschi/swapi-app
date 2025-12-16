import { useState, useEffect } from "react";

export default function DetailsPanel({ item, onBack }) {
  const props = item.properties;
  const [filmTitles, setFilmTitles] = useState({});

  useEffect(() => {
    props.films.forEach(async (filmUrl) => {
      const id = filmUrl.split("/").filter(Boolean).pop();
      const res = await fetch(`/api/swapi/films/${id}`);
      if (res.ok) {
        const data = await res.json();
        setFilmTitles((prev) => ({ ...prev, [id]: data.title }));
      }
    });
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

      <section>
        <h3>Movies</h3>
        <ul>
          {props.films.map((filmUrl) => {
            const id = filmUrl.split("/").filter(Boolean).pop();
            return <li key={id}>{filmTitles[id] || "Loading..."}</li>;
          })}
        </ul>
      </section>

      <button onClick={onBack} style={{ marginTop: 20 }}>
        BACK TO SEARCH
      </button>
    </div>
  );
}
