import { AIRecommendations } from "@/components/home/ai-recommendations";
import { HeroSection } from "@/components/home/hero-section";
import { MovieRail } from "@/components/home/movie-rail";
import { PopularActors } from "@/components/home/popular-actors";
import { StreamingSection } from "@/components/home/streaming-section";
import { UniversePreview } from "@/components/home/universe-preview";
import { getPersonalizedRecommendations } from "@/server/services/recommendation-service";
import { getPopularActors, getPopularMovies, getTopRatedMovies, getTrendingMovies, getUpcomingMovies } from "@/server/services/movie-service";

export default async function HomePage() {
  const [trending, recommendations, topRated, upcoming, popular, actors] = await Promise.all([
    getTrendingMovies(),
    getPersonalizedRecommendations(),
    getTopRatedMovies(),
    getUpcomingMovies(),
    getPopularMovies(),
    getPopularActors()
  ]);

  return (
    <main>
      <HeroSection movie={trending[0]!} />
      <MovieRail title="Trending movies" eyebrow="Infinite discovery rail" movies={trending} href="/search?sort=popularity" />
      <AIRecommendations movies={recommendations.slice(0, 8)} />
      <MovieRail title="Top rated movies" eyebrow="Critically loved" movies={topRated} href="/search?sort=rating" />
      <MovieRail title="Upcoming releases" eyebrow="Release radar" movies={upcoming} href="/search?sort=release_date" />
      <StreamingSection />
      <PopularActors actors={actors} />
      <MovieRail title="Popular now" eyebrow="Audience heat" movies={popular} href="/search?sort=popularity" />
      <UniversePreview />
    </main>
  );
}
