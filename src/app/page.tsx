import { AIRecommendations } from "@/components/home/ai-recommendations";
import { HeroSection } from "@/components/home/hero-section";
import { MovieRail } from "@/components/home/movie-rail";
import { PopularActors } from "@/components/home/popular-actors";
import { StreamingSection } from "@/components/home/streaming-section";
import { UniversePreview } from "@/components/home/universe-preview";
import { getPersonalizedRecommendations } from "@/server/services/recommendation-service";
import { getPopularActors, getPopularMovies, getTopRatedMovies, getTrendingMovies, getUpcomingMovies } from "@/server/services/movie-service";
import type { MovieSummary } from "@/types/movie";

const FALLBACK_HERO_MOVIE: MovieSummary = {
  id: "fallback-inception",
  tmdbId: 27205,
  title: "Inception",
  slug: "inception",
  overview: "A skilled thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
  tagline: "Your mind is the scene of the crime",
  posterPath: "https://image.tmdb.org/t/p/w500/qmDpIHrmpJDpmn0x5SzCFYMNqP8.jpg",
  backdropPath: "https://image.tmdb.org/t/p/w1280/9gk7adHYeDMNNGceKPn1V01Dz8.jpg",
  releaseDate: "2010-07-16",
  runtime: 148,
  genres: ["Science Fiction", "Action", "Thriller"],
  rating: 8.8,
  voteCount: 33000,
  popularity: 85.5
};

export default async function HomePage() {
  const [trending, recommendations, topRated, upcoming, popular, actors] = await Promise.all([
    getTrendingMovies(),
    getPersonalizedRecommendations(),
    getTopRatedMovies(),
    getUpcomingMovies(),
    getPopularMovies(),
    getPopularActors()
  ]);

  // Ensure all arrays have fallback values
  const safeHeroMovie: MovieSummary = (trending && trending.length > 0) ? trending[0]! : FALLBACK_HERO_MOVIE;
  const safeTrending = trending && trending.length > 0 ? trending : [];
  const safeRecommendations = recommendations && recommendations.length > 0 ? recommendations : [];
  const safeTopRated = topRated && topRated.length > 0 ? topRated : [];
  const safeUpcoming = upcoming && upcoming.length > 0 ? upcoming : [];
  const safePopular = popular && popular.length > 0 ? popular : [];
  const safeActors = actors && actors.length > 0 ? actors : [];

  return (
    <main>
      <HeroSection movie={safeHeroMovie} />
      <MovieRail title="Trending movies" eyebrow="Infinite discovery rail" movies={safeTrending} href="/search?sort=popularity" />
      <AIRecommendations movies={safeRecommendations.slice(0, 8)} />
      <MovieRail title="Top rated movies" eyebrow="Critically loved" movies={safeTopRated} href="/search?sort=rating" />
      <MovieRail title="Upcoming releases" eyebrow="Release radar" movies={safeUpcoming} href="/search?sort=release_date" />
      <StreamingSection />
      <PopularActors actors={safeActors} />
      <MovieRail title="Popular now" eyebrow="Audience heat" movies={safePopular} href="/search?sort=popularity" />
      <UniversePreview />
    </main>
  );
}
