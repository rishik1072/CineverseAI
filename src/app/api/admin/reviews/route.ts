import { getServerSession } from "next-auth";

import { authOptions } from "@/server/auth/config";
import { prisma } from "@/server/db/prisma";
import { fail, handleApiError, ok } from "@/server/http";
import { canModerate } from "@/server/auth/permissions";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!canModerate(session?.user?.role)) return fail("Forbidden", 403);
    const reviews = await prisma.review.findMany({
      include: { user: { select: { id: true, name: true, email: true } }, movie: { select: { title: true, tmdbId: true } } },
      orderBy: [{ reportsCount: "desc" }, { createdAt: "desc" }],
      take: 100
    });
    return ok(reviews);
  } catch (error) {
    return handleApiError(error);
  }
}
