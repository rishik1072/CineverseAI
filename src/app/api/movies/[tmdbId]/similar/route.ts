import { handleApiError, ok } from "@/server/http";
import { getSimilarMovies } from "@/server/services/movie-service";

type Context = { params: Promise<{ tmdbId: string }> };

export async function GET(_request: Request, context: Context) {
  try {
    const { tmdbId } = await context.params;
    return ok(await getSimilarMovies(Number(tmdbId)));
  } catch (error) {
    return handleApiError(error);
  }
}
