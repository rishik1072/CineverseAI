import { PageHeader } from "@/components/shared/page-header";
import { MovieGrid } from "@/components/movies/movie-grid";
import { getUpcomingMovies } from "@/server/services/movie-service";

export default async function ReleaseRadarPage() {
  const upcoming = await getUpcomingMovies();
  return <main className="cinema-container py-16"><PageHeader eyebrow="Follow graph" title="Release Radar" description="Follow actors, directors, and franchises to receive notifications." /><MovieGrid movies={upcoming.slice(0, 4)} /></main>;
}
