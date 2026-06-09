import { getServerSession } from "next-auth";
import { nanoid } from "nanoid";

import { authOptions } from "@/server/auth/config";
import { prisma } from "@/server/db/prisma";
import { created, fail, handleApiError, ok } from "@/server/http";
import { upsertMovieByTmdbId } from "@/server/services/movie-reference-service";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);
    const parties = await prisma.watchParty.findMany({
      where: { hostUserId: session.user.id },
      include: { movie: { select: { tmdbId: true, title: true, posterPath: true } }, _count: { select: { participants: true } } },
      orderBy: { scheduledAt: "asc" }
    });
    return ok(parties);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);
    const body = (await request.json()) as { tmdbId: number; title: string; scheduledAt: string; description?: string };
    const movie = await upsertMovieByTmdbId(body.tmdbId);
    const party = await prisma.watchParty.create({
      data: {
        hostUserId: session.user.id,
        movieId: movie.id,
        title: body.title,
        description: body.description ?? null,
        scheduledAt: new Date(body.scheduledAt),
        joinCode: nanoid(10)
      }
    });
    return created(party);
  } catch (error) {
    return handleApiError(error);
  }
}
