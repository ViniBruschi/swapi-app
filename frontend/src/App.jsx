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
  const [movieFromSearch, setMovieFromSearch] = useState(false);

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
    if (item.properties.title) {
      setMovieId(item.uid);
      setMovieFromSearch(true); // Vem de uma busca direta por filmes
    } else {
      setSelectedItem(item);
      setMovieFromSearch(false);
    }
  };

  const handleSeeMovie = (id) => {
    setMovieId(id);
    setMovieFromSearch(false); // Vem de um personagem
  };

  const handleBack = () => {
    setSelectedItem(null);
    setMovieId(null);
    setMovieFromSearch(false);
  };

  return (
    <div className="page">
      <header className="app-header">
        <h1>SWStarter</h1>
      </header>
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
            <MovieDetailsPanel 
              movieId={movieId} 
              onBack={handleBack}
              showCharacters={movieFromSearch}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
