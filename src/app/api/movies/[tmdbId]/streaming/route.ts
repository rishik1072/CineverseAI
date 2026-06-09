import { handleApiError, ok } from "@/server/http";
import { getMovieDetail } from "@/server/services/movie-service";

type Context = { params: Promise<{ tmdbId: string }> };

export async function GET(_request: Request, context: Context) {
  try {
    const { tmdbId } = await context.params;
    const movie = await getMovieDetail(Number(tmdbId));
    return ok(movie.providers ?? []);
  } catch (error) {
    return handleApiError(error);
  }
}
