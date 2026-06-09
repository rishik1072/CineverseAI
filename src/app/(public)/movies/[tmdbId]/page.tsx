import type { Metadata } from "next";

import { CastCarousel } from "@/components/movies/cast-carousel";
import { MovieCharts } from "@/components/movies/movie-charts";
import { MovieHero } from "@/components/movies/movie-hero";
import { MovieRail } from "@/components/home/movie-rail";
import { MovieStatCards } from "@/components/movies/movie-stat-cards";
import { TrailerTheater } from "@/components/movies/trailer-theater";
import { Badge } from "@/components/ui/badge";
import { getMovieDetail } from "@/server/services/movie-service";
import { formatCurrency } from "@/lib/utils";

type PageProps = { params: Promise<{ tmdbId: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tmdbId } = await params;
  const movie = await getMovieDetail(Number(tmdbId));
  return {
    title: movie.title,
    description: movie.overview,
    openGraph: { title: movie.title, description: movie.overview, images: [{ url: movie.backdropPath }] }
  };
}

export default async function MovieDetailsPage({ params }: PageProps) {
  const { tmdbId } = await params;
  const movie = await getMovieDetail(Number(tmdbId));

  return (
    <main>
      <MovieHero movie={movie} />
      <TrailerTheater video={movie.videos[0]} />
      <CastCarousel cast={movie.cast} />
      <MovieStatCards movie={movie} />
      <MovieCharts ratingTrend={movie.ratingTrend} popularityTrend={movie.popularityTrend} />
      <section className="cinema-container py-12">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 backdrop-blur-2xl">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Badge variant="neon">Streaming Platforms</Badge>
            <Badge variant="rose">Budget {formatCurrency(movie.budget)}</Badge>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(movie.providers ?? []).map((provider) => (
              <div key={provider.id} className="rounded-3xl border border-white/10 bg-white/[0.05] p-5">
                <h3 className="font-bold text-white">{provider.name}</h3>
                <p className="mt-2 text-sm text-slate-400">{provider.type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <MovieRail title="Similar movies" movies={movie.similar} />
    </main>
  );
}
