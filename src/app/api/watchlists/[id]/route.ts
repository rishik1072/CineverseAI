import { getServerSession } from "next-auth";

import { authOptions } from "@/server/auth/config";
import { prisma } from "@/server/db/prisma";
import { fail, handleApiError, ok } from "@/server/http";

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Context) {
  try {
    const { id } = await context.params;
    const watchlist = await prisma.watchlist.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, username: true, image: true } },
        items: {
          include: {
            movie: { select: { tmdbId: true, title: true, posterPath: true, backdropPath: true, tmdbVoteAverage: true, releaseDate: true } }
          },
          orderBy: { addedAt: "desc" }
        }
      }
    });
    if (!watchlist) return fail("Watchlist not found", 404);
    return ok(watchlist);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: Request, context: Context) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);
    const { id } = await context.params;
    const body = await request.json();
    await prisma.watchlist.updateMany({
      where: { id, userId: session.user.id },
      data: body
    });
    const watchlist = await prisma.watchlist.findFirst({ where: { id, userId: session.user.id } });
    return ok(watchlist);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, context: Context) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);
    const { id } = await context.params;
    await prisma.watchlist.deleteMany({ where: { id, userId: session.user.id } });
    return ok({ deleted: true });
  } catch (error) {
    return handleApiError(error);
  }
}
