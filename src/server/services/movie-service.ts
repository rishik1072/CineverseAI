import type { MovieDetail, MovieSummary } from "@/types/movie";
import { fetchMovieDetail, fetchMovieList, fetchSearchMovies, fetchPopularActors, fetchStreamingProviders } from "@/server/external/tmdb/client";

export async function getTrendingMovies() {
  return fetchMovieList("/trending/movie/week", 60 * 15);
}

export async function getPopularMovies() {
  return fetchMovieList("/movie/popular", 60 * 60);
}

export async function getTopRatedMovies() {
  return fetchMovieList("/movie/top_rated", 60 * 60 * 6);
}

export async function getUpcomingMovies() {
  return fetchMovieList("/movie/upcoming", 60 * 60);
}

export async function getMovieDetail(tmdbId: number): Promise<MovieDetail> {
  return fetchMovieDetail(tmdbId);
}

export async function getSimilarMovies(tmdbId: number) {
  const detail = await getMovieDetail(tmdbId);
  return detail.similar;
}

export async function getStreamingProviders() {
  return fetchStreamingProviders();
}

export async function getPopularActors() {
  return fetchPopularActors();
}

export async function searchMovies(query: string, filters?: { genre?: string; ratingMin?: number; sort?: string }) {
  let results: MovieSummary[] = [];
  if (query) {
    const pages = await Promise.all([fetchSearchMovies(query, 1), fetchSearchMovies(query, 2), fetchSearchMovies(query, 3)]);
    results = pages.flat();
  } else {
    const pages = await Promise.all([
      fetchMovieList("/movie/popular?page=1"),
      fetchMovieList("/movie/popular?page=2"),
      fetchMovieList("/movie/popular?page=3"),
    ]);
    results = pages.flat();
  }

  // Deduplicate movies by TMDB ID
  const uniqueIds = new Set();
  results = results.filter((movie) => {
    if (uniqueIds.has(movie.tmdbId)) return false;
    uniqueIds.add(movie.tmdbId);
    return true;
  });

  if (filters?.genre) {
    results = results.filter((movie) => movie.genres.some((genre) => genre.toLowerCase() === filters.genre?.toLowerCase()));
  }
  if (filters?.ratingMin) {
    results = results.filter((movie) => movie.rating >= (filters.ratingMin ?? 0));
  }

  if (filters?.sort === "rating") results = results.sort((a, b) => b.rating - a.rating);
  if (filters?.sort === "title") results = results.sort((a, b) => a.title.localeCompare(b.title));
  if (filters?.sort === "release_date") results = results.sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
  if (!filters?.sort || filters.sort === "popularity") results = results.sort((a, b) => b.popularity - a.popularity);

  return results;
}
