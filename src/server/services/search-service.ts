import { searchMovies } from "@/server/services/movie-service";
import { searchSchema } from "@/server/validators/schemas";

export async function advancedSearch(searchParams: URLSearchParams) {
  const parsed = searchSchema.parse(Object.fromEntries(searchParams.entries()));
  const filters: { genre?: string; ratingMin?: number; sort?: string } = { sort: parsed.sort };
  if (parsed.genre) filters.genre = parsed.genre;
  if (parsed.ratingMin !== undefined) filters.ratingMin = parsed.ratingMin;
  const results = await searchMovies(parsed.q, filters);

  return {
    query: parsed.q,
    filters: parsed,
    results,
    total: results.length
  };
}
