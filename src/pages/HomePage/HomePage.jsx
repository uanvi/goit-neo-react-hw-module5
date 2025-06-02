import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../api/tmdb"; 
import MovieList from "../../components/MovieList/MovieList";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTrendingMovies();
        setTrendingMovies(data.results || []);
      } catch (err) {
        setError("Failed to fetch trending movies.");
        console.error("Error fetching trending movies:", err);
      } finally {
        setIsLoading(false);
      }
    };

    getTrendingMovies();
  }, []);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Trending Today</h1>
      {isLoading && <div className={styles.loading}>Loading...</div>}
      {error && <p className={styles.error}>{error}</p>}
      {!isLoading && !error && trendingMovies.length === 0 && (
        <p className={styles.noMovies}>No trending movies found.</p>
      )}
      {trendingMovies.length > 0 && <MovieList movies={trendingMovies} />}
    </main>
  );
};

export default HomePage;
