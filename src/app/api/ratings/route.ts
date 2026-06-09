import { getServerSession } from "next-auth";

import { authOptions } from "@/server/auth/config";
import { prisma } from "@/server/db/prisma";
import { created, fail, handleApiError, ok } from "@/server/http";
import { rateMovie } from "@/server/services/rating-service";
import { ratingSchema } from "@/server/validators/schemas";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);
    const ratings = await prisma.rating.findMany({
      where: { userId: session.user.id },
      include: { movie: { select: { tmdbId: true, title: true, posterPath: true, tmdbVoteAverage: true } } },
      orderBy: { updatedAt: "desc" }
    });
    return ok(ratings);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);
    const parsed = ratingSchema.parse(await request.json());
    return created(await rateMovie(session.user.id, parsed.tmdbId, parsed.score));
  } catch (error) {
    return handleApiError(error);
  }
}
