import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { MovieGrid } from "@/components/movies/movie-grid";
import { PageHeader } from "@/components/shared/page-header";
import { getTopRatedMovies } from "@/server/services/movie-service";

export const metadata = { title: "Favorites" };

export default async function FavoritesPage() {
  const movies = await getTopRatedMovies();
  return (
    <DashboardShell>
      <PageHeader eyebrow="Taste graph" title="Favorites" description="Favorites power the recommendation engine and mood profile." />
      <MovieGrid movies={movies.slice(0, 6)} />
    </DashboardShell>
  );
}
