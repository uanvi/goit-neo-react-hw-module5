import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/";
const API_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGFlMzFhYmNjYWI1YmYyZDAxYTA3OWRiYjIwMWY1NSIsIm5iZiI6MTc0Nzk0NDM5My40OTQwMDAyLCJzdWIiOiI2ODJmODNjOTI3ZGUzZmZiOGUwNTQxYzgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.2af0ecmvmkJkRc9CtZBhPQnpMz6wfSrw_7-VWONTZ6o";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: API_TOKEN,
  },
});

export async function fetchTrendingMovies() {
  const response = await axiosInstance.get("trending/movie/day");
  return response.data;
}

export async function fetchMoviesByQuery(query) {
  const response = await axiosInstance.get("search/movie", {
    params: { query },
  });
  return response.data;
}

export async function fetchMovieById(movieId) {
  const response = await axiosInstance.get(`movie/${movieId}`);
  return response.data;
}

export async function fetchMovieCast(movieId) {
  const response = await axiosInstance.get(`movie/${movieId}/credits`);
  return response.data;
}

export async function fetchMovieReviews(movieId) {
  const response = await axiosInstance.get(`movie/${movieId}/reviews`);
  return response.data;
}
