import { getServerSession } from "next-auth";

import { authOptions } from "@/server/auth/config";
import { prisma } from "@/server/db/prisma";
import { fail, handleApiError, ok } from "@/server/http";

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Context) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);
    const { id } = await context.params;
    const party = await prisma.watchParty.findUnique({
      where: { id },
      include: {
        movie: { select: { tmdbId: true, title: true, posterPath: true, backdropPath: true } },
        participants: { include: { user: { select: { id: true, name: true, image: true } } } }
      }
    });
    if (!party) return fail("Watch party not found", 404);
    return ok(party);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: Request, context: Context) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);
    const { id } = await context.params;
    await prisma.watchParty.updateMany({ where: { id, hostUserId: session.user.id }, data: await request.json() });
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
    await prisma.watchParty.deleteMany({ where: { id, hostUserId: session.user.id } });
    return ok({ deleted: true });
  } catch (error) {
    return handleApiError(error);
  }
}
