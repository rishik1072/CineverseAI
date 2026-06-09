import { getServerSession } from "next-auth";

import { authOptions } from "@/server/auth/config";
import { prisma } from "@/server/db/prisma";
import { fail, handleApiError, ok } from "@/server/http";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "ADMIN") return fail("Forbidden", 403);
    const [users, reviews, ratings, watchlists] = await Promise.all([
      prisma.user.count(),
      prisma.review.count(),
      prisma.rating.count(),
      prisma.watchlist.count()
    ]);
    return ok({ users, reviews, ratings, watchlists });
  } catch (error) {
    return handleApiError(error);
  }
}
