export default function SearchForm({
  searchType,
  setSearchType,
  searchTerm,
  setSearchTerm,
  onSearch,
  loading,
}) {
  return (
    <div className="panel panel-left">
      <h2>What are you searching for?</h2>

      <div style={{ marginBottom: 12 }}>
        <label>
          <input
            type="radio"
            value="people"
            checked={searchType === "people"}
            onChange={() => setSearchType("people")}
          />
          People
        </label>

        <label style={{ marginLeft: 12 }}>
          <input
            type="radio"
            value="films"
            checked={searchType === "films"}
            onChange={() => setSearchType("films")}
          />
          Movies
        </label>
      </div>

      <input
        type="text"
        placeholder="e.g. Chewbacca, Yoda, Boba Fett"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button onClick={onSearch} disabled={!searchTerm || loading}>
        {loading ? "SEARCHING..." : "SEARCH"}
      </button>
    </div>
  );
}
