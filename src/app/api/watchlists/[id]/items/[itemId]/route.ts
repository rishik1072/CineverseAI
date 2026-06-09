import { getServerSession } from "next-auth";

import { authOptions } from "@/server/auth/config";
import { prisma } from "@/server/db/prisma";
import { fail, handleApiError, ok } from "@/server/http";

type Context = { params: Promise<{ id: string; itemId: string }> };

export async function PATCH(request: Request, context: Context) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);
    const { itemId } = await context.params;
    const body = await request.json();
    await prisma.watchlistItem.updateMany({ where: { id: itemId, userId: session.user.id }, data: body });
    const item = await prisma.watchlistItem.findFirst({ where: { id: itemId, userId: session.user.id } });
    return ok(item);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, context: Context) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);
    const { itemId } = await context.params;
    await prisma.watchlistItem.deleteMany({ where: { id: itemId, userId: session.user.id } });
    return ok({ deleted: true });
  } catch (error) {
    return handleApiError(error);
  }
}
