import { getServerSession } from "next-auth";

import { authOptions } from "@/server/auth/config";
import { prisma } from "@/server/db/prisma";
import { fail, handleApiError, ok } from "@/server/http";

type Context = { params: Promise<{ id: string }> };

export async function POST(_request: Request, context: Context) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);
    const { id } = await context.params;
    const like = await prisma.reviewLike.upsert({
      where: { reviewId_userId: { reviewId: id, userId: session.user.id } },
      create: { reviewId: id, userId: session.user.id },
      update: {}
    });
    return ok(like);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, context: Context) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);
    const { id } = await context.params;
    await prisma.reviewLike.delete({ where: { reviewId_userId: { reviewId: id, userId: session.user.id } } });
    return ok({ deleted: true });
  } catch (error) {
    return handleApiError(error);
  }
}
