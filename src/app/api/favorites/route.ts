import { getServerSession } from "next-auth";

import { authOptions } from "@/server/auth/config";
import { prisma } from "@/server/db/prisma";
import { created, fail, handleApiError, ok } from "@/server/http";
import { addFavorite } from "@/server/services/favorite-service";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);
    const favorites = await prisma.favorite.findMany({
      where: { userId: session.user.id },
      include: { movie: { select: { tmdbId: true, title: true, posterPath: true, backdropPath: true, tmdbVoteAverage: true, releaseDate: true } } },
      orderBy: { createdAt: "desc" }
    });
    return ok(favorites);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);
    const body = (await request.json()) as { tmdbId: number };
    return created(await addFavorite(session.user.id, body.tmdbId));
  } catch (error) {
    return handleApiError(error);
  }
}
