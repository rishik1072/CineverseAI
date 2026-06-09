import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { MovieGrid } from "@/components/movies/movie-grid";
import { PageHeader } from "@/components/shared/page-header";
import { getPopularMovies } from "@/server/services/movie-service";

export const metadata = { title: "Watchlist" };

export default async function WatchlistPage() {
  const movies = await getPopularMovies();
  return (
    <DashboardShell>
      <PageHeader eyebrow="Synced list" title="Watchlist" description="Private and public watchlists sync to PostgreSQL when authenticated." />
      <MovieGrid movies={movies.slice(0, 6)} />
    </DashboardShell>
  );
}
