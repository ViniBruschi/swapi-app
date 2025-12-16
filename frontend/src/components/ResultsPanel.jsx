export default function ResultsPanel({ results, loading, error, onSeeDetails }) {
  if (loading) return <p>Searching...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!results.length) return <p>There are zero matches. Use the form to search for People or Movies.</p>;

  return (
    <div style={{ marginLeft: 20 }}>
      <h3>Results</h3>
      <ul>
        {results.map((item, idx) => (
          <li key={idx} style={{ marginBottom: 10 }}>
            {item.properties.name || item.properties.title}
            <button
              style={{ marginLeft: 10 }}
              onClick={() => onSeeDetails(item)}
            >
              SEE DETAILS
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
