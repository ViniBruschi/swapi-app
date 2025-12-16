import { useState } from "react";
import SearchForm from "./components/SearchForm";
import ResultsPanel from "./components/ResultsPanel";
import DetailsPanel from "./components/DetailsPanel";
import MovieDetailsPanel from "./components/MovieDetailsPanel";

function App() {
  const [searchType, setSearchType] = useState("people");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [movieUrl, setMovieUrl] = useState(null);

  const handleSearch = async () => {
    if (!searchTerm) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/swapi/${searchType}?q=${encodeURIComponent(searchTerm)}`);
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      console.log(data)
      setResults(data.result || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSeeDetails = (item) => {
    if (searchType === "films") {
      setMovieUrl(item.properties.url);
    } else {
      setSelectedItem(item);
    }
  };

  const handleBack = () => {
    setSelectedItem(null);
    setMovieUrl(null);
  };

  return (
    <div style={{ display: "flex", padding: 20 }}>
      {!selectedItem && !movieUrl ? (
        <>
          <SearchForm
            searchType={searchType}
            setSearchType={setSearchType}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={handleSearch}
            loading={loading}
          />
          <ResultsPanel
            results={results}
            loading={loading}
            error={error}
            onSeeDetails={handleSeeDetails}
          />
        </>
      ) : selectedItem ? (
        <DetailsPanel item={selectedItem} onBack={handleBack} />
      ) : (
        <MovieDetailsPanel movieUrl={movieUrl} onBack={handleBack} />
      )}
    </div>
  );
}

export default App;
