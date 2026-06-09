import { getServerSession } from "next-auth";

import { authOptions } from "@/server/auth/config";
import { prisma } from "@/server/db/prisma";
import { fail, handleApiError, ok } from "@/server/http";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(_request: Request, context: Context) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);
    const { id } = await context.params;
    await prisma.notification.updateMany({ where: { id, userId: session.user.id }, data: { status: "READ", readAt: new Date() } });
    return ok({ read: true });
  } catch (error) {
    return handleApiError(error);
  }
}
