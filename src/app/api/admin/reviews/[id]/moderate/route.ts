import { getServerSession } from "next-auth";

import { authOptions } from "@/server/auth/config";
import { canModerate } from "@/server/auth/permissions";
import { prisma } from "@/server/db/prisma";
import { fail, handleApiError, ok } from "@/server/http";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: Context) {
  try {
    const session = await getServerSession(authOptions);
    if (!canModerate(session?.user?.role)) return fail("Forbidden", 403);
    const { id } = await context.params;
    const body = (await request.json()) as { status: "PUBLISHED" | "FLAGGED" | "HIDDEN" | "DELETED" };
    const review = await prisma.review.update({ where: { id }, data: { status: body.status } });
    return ok(review);
  } catch (error) {
    return handleApiError(error);
  }
}
