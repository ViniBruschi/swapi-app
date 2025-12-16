export default function ResultsPanel({
  results,
  loading,
  error,
  onSeeDetails,
}) {
  if (loading) return <p>Searching...</p>;

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  if (!results.length)
    return (
      <p className="results-empty">
        There are zero matches. Use the form to search for People or Movies.
      </p>
    );

  return (
    <div>
      <h2>Results</h2>

      {results.map((item) => (
        <div key={item.uid} className="result-item">
          <span>{item.properties.name || item.properties.title}</span>
          <button onClick={() => onSeeDetails(item)}>SEE DETAILS</button>
        </div>
      ))}
    </div>
  );
}
