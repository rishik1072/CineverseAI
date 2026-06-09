import type { MovieSummary } from "@/types/movie";
import { getTopRatedMovies } from "@/server/services/movie-service";

export async function getPersonalizedRecommendations(_userId?: string | null): Promise<MovieSummary[]> {
  const movies = await getTopRatedMovies();
  return movies.map((movie, index) => ({
    ...movie,
    reason:
      movie.reason ??
      ([
        "Because you enjoy ambitious sci-fi and prestige filmmaking.",
        "Based on your high ratings for visually inventive films.",
        "A strong match for your trending genre profile."
      ][index % 3] ?? "Recommended by your CineVerse taste profile.")
  }));
}

export async function getSurprisePick(userId?: string | null) {
  const recommendations = await getPersonalizedRecommendations(userId);
  const seed = userId ? userId.length : new Date().getDate();
  return recommendations[seed % recommendations.length];
}
