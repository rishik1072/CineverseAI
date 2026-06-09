import { ok, handleApiError } from "@/server/http";
import { getUpcomingMovies } from "@/server/services/movie-service";

export async function GET() {
  try {
    return ok(await getUpcomingMovies());
  } catch (error) {
    return handleApiError(error);
  }
}
