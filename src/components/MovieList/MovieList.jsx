import { Link, useLocation } from "react-router-dom";
import styles from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={styles.list}>
      {movies.map(({ id, title, name }) => (
        <li key={id} className={styles.item}>
          <Link
            to={`/movies/${id}`}
            state={{ from: location }}
            className={styles.link}
          >
            {title || name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
