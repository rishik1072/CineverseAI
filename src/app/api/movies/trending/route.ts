import { ok, handleApiError } from "@/server/http";
import { getTrendingMovies } from "@/server/services/movie-service";

export async function GET() {
  try {
    return ok(await getTrendingMovies());
  } catch (error) {
    return handleApiError(error);
  }
}
