import { getServerSession } from "next-auth";

import { authOptions } from "@/server/auth/config";
import { created, fail, handleApiError } from "@/server/http";
import { addMovieToWatchlist } from "@/server/services/watchlist-service";
import { watchlistItemSchema } from "@/server/validators/schemas";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);
    const parsed = watchlistItemSchema.parse(await request.json());
    return created(await addMovieToWatchlist(session.user.id, parsed.tmdbId, parsed.status, parsed.notes));
  } catch (error) {
    return handleApiError(error);
  }
}
