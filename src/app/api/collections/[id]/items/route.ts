import { getServerSession } from "next-auth";

import { authOptions } from "@/server/auth/config";
import { created, fail, handleApiError } from "@/server/http";
import { prisma } from "@/server/db/prisma";
import { upsertMovieByTmdbId } from "@/server/services/movie-reference-service";

type Context = { params: Promise<{ id: string }> };

export async function POST(request: Request, context: Context) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);
    const { id } = await context.params;
    const body = (await request.json()) as { tmdbId: number; note?: string };
    const movie = await upsertMovieByTmdbId(body.tmdbId);
    const item = await prisma.collectionItem.upsert({
      where: { collectionId_movieId: { collectionId: id, movieId: movie.id } },
      create: { collectionId: id, movieId: movie.id, note: body.note ?? null },
      update: { note: body.note ?? null }
    });
    return created(item);
  } catch (error) {
    return handleApiError(error);
  }
}
