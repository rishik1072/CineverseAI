import { ok, handleApiError } from "@/server/http";
import { getPopularMovies } from "@/server/services/movie-service";

export async function GET() {
  try {
    return ok(await getPopularMovies());
  } catch (error) {
    return handleApiError(error);
  }
}
