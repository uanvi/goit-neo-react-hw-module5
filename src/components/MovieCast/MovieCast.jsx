import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../api/tmdb";
import styles from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadCast = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMovieCast(movieId);
        setCast(data.cast || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadCast();
  }, [movieId]);

  if (isLoading) return <p>Loading cast...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!cast.length) return <p>No cast available.</p>;

  return (
    <ul className={styles.castList}>
      {cast.map((actor) => (
        <li key={actor.cast_id} className={styles.castItem}>
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                : "https://placehold.co/180x240?text=No+Image&font=roboto"
            }
            alt={actor.name}
            className={styles.image}
          />
          <p className={styles.name}>{actor.name}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
