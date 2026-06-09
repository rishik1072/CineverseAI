import { MovieCard } from "@/components/movies/movie-card";
import type { MovieSummary } from "@/types/movie";

export function MovieGrid({ movies }: { movies: MovieSummary[] }) {
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {movies.map((movie) => (
        <MovieCard key={movie.tmdbId} movie={movie} />
      ))}
    </div>
  );
}
