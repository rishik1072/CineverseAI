import { handleApiError, ok } from "@/server/http";
import { searchMovies } from "@/server/services/movie-service";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get("q") ?? "";
    const results = await searchMovies(query);
    return ok(results.slice(0, 6).map((movie) => ({ tmdbId: movie.tmdbId, title: movie.title, posterPath: movie.posterPath })));
  } catch (error) {
    return handleApiError(error);
  }
}
