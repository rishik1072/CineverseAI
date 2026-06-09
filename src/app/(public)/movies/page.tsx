import { MovieGrid } from "@/components/movies/movie-grid";
import { PageHeader } from "@/components/shared/page-header";
import { getPopularMovies } from "@/server/services/movie-service";

export const metadata = { title: "Movies" };

export default async function MoviesPage() {
  const movies = await getPopularMovies();
  return (
    <main className="cinema-container py-14">
      <PageHeader eyebrow="Catalog" title="Explore movies" description="A high-performance server-rendered catalog ready for TMDB-powered pagination and genre browsing." />
      <MovieGrid movies={movies} />
    </main>
  );
}
