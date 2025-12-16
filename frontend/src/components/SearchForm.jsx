import React from "react";

export default function SearchForm({
  searchType,
  setSearchType,
  searchTerm,
  setSearchTerm,
  onSearch,
  loading
}) {
  return (
    <div style={{ flex: 1, marginRight: 20 }}>
      <h2>What are you searching for?</h2>
      
      <div>
        <label>
          <input
            type="radio"
            value="people"
            checked={searchType === "people"}
            onChange={() => setSearchType("people")}
          />
          People
        </label>
        <label>
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
        placeholder={searchType === "people" ? "e.g. Chewbacca, Yoda, Boba Fett" : "e.g. A New Hope"}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ display: "block", marginTop: 10, width: "100%" }}
      />

      <button
        onClick={onSearch}
        disabled={!searchTerm || loading}
        style={{
          marginTop: 10,
          backgroundColor: !searchTerm || loading ? "#ccc" : "green",
          color: "white",
          padding: "8px 16px",
          border: "none",
          cursor: !searchTerm || loading ? "not-allowed" : "pointer"
        }}
      >
        {loading ? "SEARCHING..." : "SEARCH"}
      </button>
    </div>
  );
}
