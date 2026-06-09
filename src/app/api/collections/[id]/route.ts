import { getServerSession } from "next-auth";

import { authOptions } from "@/server/auth/config";
import { prisma } from "@/server/db/prisma";
import { fail, handleApiError, ok } from "@/server/http";

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Context) {
  try {
    const { id } = await context.params;
    const collection = await prisma.collection.findUnique({
      where: { id },
      include: { items: { include: { movie: { select: { tmdbId: true, title: true, posterPath: true, tmdbVoteAverage: true } } } } }
    });
    if (!collection) return fail("Collection not found", 404);
    return ok(collection);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: Request, context: Context) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);
    const { id } = await context.params;
    await prisma.collection.updateMany({ where: { id, userId: session.user.id }, data: await request.json() });
    return ok({ updated: true });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, context: Context) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);
    const { id } = await context.params;
    await prisma.collection.deleteMany({ where: { id, userId: session.user.id } });
    return ok({ deleted: true });
  } catch (error) {
    return handleApiError(error);
  }
}
