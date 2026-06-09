import { getServerSession } from "next-auth";

import { authOptions } from "@/server/auth/config";
import { prisma } from "@/server/db/prisma";
import { created, fail, handleApiError } from "@/server/http";
import { upsertMovieByTmdbId } from "@/server/services/movie-reference-service";
import { watchlistItemSchema } from "@/server/validators/schemas";

type Context = { params: Promise<{ id: string }> };

export async function POST(request: Request, context: Context) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);
    const { id } = await context.params;
    const parsed = watchlistItemSchema.parse(await request.json());
    const movie = await upsertMovieByTmdbId(parsed.tmdbId);
    const item = await prisma.watchlistItem.upsert({
      where: { watchlistId_movieId: { watchlistId: id, movieId: movie.id } },
      create: { watchlistId: id, userId: session.user.id, movieId: movie.id, status: parsed.status, notes: parsed.notes ?? null },
      update: { status: parsed.status, notes: parsed.notes ?? null }
    });
    return created(item);
  } catch (error) {
    return handleApiError(error);
  }
}
