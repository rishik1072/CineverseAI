import { getServerSession } from "next-auth";

import { authOptions } from "@/server/auth/config";
import { fail, handleApiError, ok } from "@/server/http";
import { compareMovies } from "@/server/services/movie-battle-service";
import { compareSchema } from "@/server/validators/schemas";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);
    const parsed = compareSchema.parse(await request.json());
    if (parsed.movieA === parsed.movieB) return fail("Select two different movies", 422);
    return ok(await compareMovies(parsed.movieA, parsed.movieB));
  } catch (error) {
    return handleApiError(error);
  }
}
