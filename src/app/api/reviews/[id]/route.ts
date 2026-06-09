import { getServerSession } from "next-auth";
import type { Prisma } from "@prisma/client";

import { authOptions } from "@/server/auth/config";
import { prisma } from "@/server/db/prisma";
import { fail, handleApiError, ok } from "@/server/http";
import { sanitizeText } from "@/server/security/sanitize";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: Context) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);
    const { id } = await context.params;
    const body = (await request.json()) as {
      title?: string;
      content?: string;
      containsSpoilers?: boolean;
      visibility?: "PRIVATE" | "PUBLIC" | "UNLISTED" | "FOLLOWERS_ONLY";
    };

    const data: Prisma.ReviewUpdateInput = {};
    if (body.title !== undefined) data.title = sanitizeText(body.title);
    if (body.content !== undefined) data.content = sanitizeText(body.content);
    if (body.containsSpoilers !== undefined) data.containsSpoilers = body.containsSpoilers;
    if (body.visibility !== undefined) data.visibility = body.visibility;

    const review = await prisma.review.update({ where: { id }, data });
    return ok(review);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, context: Context) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);
    const { id } = await context.params;
    await prisma.review.update({ where: { id }, data: { status: "DELETED" } });
    return ok({ deleted: true });
  } catch (error) {
    return handleApiError(error);
  }
}
