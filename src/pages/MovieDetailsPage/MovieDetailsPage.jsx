import { useState, useEffect, useRef } from "react";
import {
  Link,
  Outlet,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { fetchMovieById } from "../../api/tmdb";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const goBackRef = useRef(location.state?.from || "/movies");

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMovieById(movieId);
        setMovie(data);
      } catch {
        setError("Failed to load movie details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [movieId]);

  const handleGoBack = () => navigate(goBackRef.current);

  if (isLoading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!movie) return <p className={styles.notFound}>Movie not found</p>;

  const {
    poster_path,
    original_title,
    release_date,
    vote_average,
    overview,
    genres,
  } = movie;

  return (
    <div className={styles.container}>
      <button onClick={handleGoBack} className={styles.backButton}>
        &larr; Go back
      </button>

      <div className={styles.movieContainer}>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={original_title}
          className={styles.poster}
          loading="lazy"
        />

        <div className={styles.details}>
          <h1 className={styles.title}>
            {original_title} ({release_date?.slice(0, 4)})
          </h1>

          <p className={styles.userScore}>
            User score: {Math.round(vote_average * 10)}%
          </p>

          <section className={styles.section}>
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>

          <section className={styles.section}>
            <h2>Genres</h2>
            <p>
              {genres?.length > 0
                ? genres.map((g) => g.name).join(", ")
                : "No genres available"}
            </p>
          </section>
        </div>
      </div>

      <section className={styles.additionalInfo}>
        <h2>Additional information</h2>
        <ul className={styles.infoList}>
          <li>
            <Link to="cast" className={styles.infoLink}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" className={styles.infoLink}>
              Reviews
            </Link>
          </li>
        </ul>
      </section>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
