import { handleApiError, ok } from "@/server/http";
import { getMovieDetail } from "@/server/services/movie-service";

type Context = { params: Promise<{ tmdbId: string }> };

export async function GET(_request: Request, context: Context) {
  try {
    const { tmdbId } = await context.params;
    return ok(await getMovieDetail(Number(tmdbId)));
  } catch (error) {
    return handleApiError(error);
  }
}
