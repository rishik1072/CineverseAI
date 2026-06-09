import type { MovieSummary } from "@/types/movie";
import { fetchDiscoverMovies } from "@/server/external/tmdb/client";

const moodMap: Array<{ terms: string[]; genreIds: number[]; reason: string }> = [
  {
    terms: ["mind", "twist", "bending", "cerebral", "sci-fi", "science"],
    genreIds: [878, 9648], // Science Fiction, Mystery
    reason: "Matched to a mind-bending sci-fi mood with mystery and conceptual ambition."
  },
  {
    terms: ["action", "intense", "fast", "adrenaline"],
    genreIds: [28, 12], // Action, Adventure
    reason: "Matched to high-energy action with kinetic pacing."
  },
  {
    terms: ["emotional", "heart", "beautiful", "moving", "drama"],
    genreIds: [18], // Drama
    reason: "Matched to emotional storytelling and character-driven drama."
  }
];

export async function runMoodSearch(prompt: string): Promise<MovieSummary[]> {
  const normalized = prompt.toLowerCase();
  const profile = moodMap.find((entry) => entry.terms.some((term) => normalized.includes(term))) ?? moodMap[0]!;

  const movies = await fetchDiscoverMovies(profile.genreIds);
  return movies.map(movie => ({ ...movie, reason: profile.reason }));
}
