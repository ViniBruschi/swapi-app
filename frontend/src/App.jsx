import { useState } from "react";
import SearchForm from "./components/SearchForm";
import ResultsPanel from "./components/ResultsPanel";
import DetailsPanel from "./components/DetailsPanel";
import MovieDetailsPanel from "./components/MovieDetailsPanel";
import "./App.css";

function App() {
  const [searchType, setSearchType] = useState("people");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [movieId, setMovieId] = useState(null);

  const handleSearch = async () => {
    if (!searchTerm) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/swapi/${searchType}?q=${encodeURIComponent(searchTerm)}`
      );

      if (!res.ok) throw new Error("Network response was not ok");

      const data = await res.json();
      setResults(data.result || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSeeDetails = (item) => {
    setSelectedItem(item);
  };

  const handleSeeMovie = (id) => {
    setMovieId(id);
  };

  const handleBack = () => {
    setSelectedItem(null);
    setMovieId(null);
  };

  return (
    <div className="page">
      <div className="card">
        <SearchForm
          searchType={searchType}
          setSearchType={setSearchType}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
          loading={loading}
        />

        <div className="panel-right">
          {!selectedItem && !movieId && (
            <ResultsPanel
              results={results}
              loading={loading}
              error={error}
              onSeeDetails={handleSeeDetails}
            />
          )}

          {selectedItem && (
            <DetailsPanel
              item={selectedItem}
              onSeeMovie={handleSeeMovie}
              onBack={handleBack}
            />
          )}

          {movieId && (
            <MovieDetailsPanel movieId={movieId} onBack={handleBack} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
