export default function DetailsPanel({ item, onSeeMovie, onBack }) {
  const props = item.properties;

  const extractId = (url) => url.split("/").filter(Boolean).pop();

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
            const id = extractId(filmUrl);
            return (
              <li key={id}>
                <button
                  className="link"
                  onClick={() => onSeeMovie(id)}
                >
                  Film {id}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <button onClick={onBack} style={{ marginTop: 20 }}>
        BACK TO SEARCH
      </button>
    </div>
  );
}
