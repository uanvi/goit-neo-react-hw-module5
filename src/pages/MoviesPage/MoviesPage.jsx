import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchMoviesByQuery } from "../../api/tmdb";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setSearchQuery(queryParam);
  }, [queryParam]);

  useEffect(() => {
    if (!queryParam) return;

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchMoviesByQuery(queryParam);
        setSearchResults(data.results || []);
      } catch {
        setError("Failed to fetch search results.");
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [queryParam]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) setSearchParams({ query: trimmedQuery });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Movie Search</h1>

      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          name="query"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter movie title"
          className={styles.searchInput}
          aria-label="Search movies"
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>

      {isLoading && <p className={styles.loading}>Searching...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!isLoading && !error && queryParam && searchResults.length === 0 && (
        <p className={styles.noResults}>No results for "{queryParam}"</p>
      )}
      {searchResults.length > 0 && <MovieList movies={searchResults} />}
    </div>
  );
};

export default MoviesPage;
