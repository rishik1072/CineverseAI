import { getServerSession } from "next-auth";

import { authOptions } from "@/server/auth/config";
import { prisma } from "@/server/db/prisma";
import { fail, handleApiError, ok } from "@/server/http";

type Context = { params: Promise<{ movieId: string }> };

export async function DELETE(_request: Request, context: Context) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);
    const { movieId } = await context.params;
    const movie = await prisma.movie.findUnique({ where: { tmdbId: Number(movieId) } });
    if (!movie) return ok({ deleted: true });
    await prisma.favorite.deleteMany({ where: { userId: session.user.id, movieId: movie.id } });
    return ok({ deleted: true });
  } catch (error) {
    return handleApiError(error);
  }
}
