import { ok, handleApiError } from "@/server/http";
import { getTopRatedMovies } from "@/server/services/movie-service";

export async function GET() {
  try {
    return ok(await getTopRatedMovies());
  } catch (error) {
    return handleApiError(error);
  }
}
