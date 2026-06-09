export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";

import { authOptions } from "@/server/auth/config";
import { prisma } from "@/server/db/prisma";
import { created, handleApiError, fail, ok } from "@/server/http";
import { createReview } from "@/server/services/review-service";
import { reviewSchema } from "@/server/validators/schemas";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const tmdbId = url.searchParams.get("tmdbId");
    const movie = tmdbId ? await prisma.movie.findUnique({ where: { tmdbId: Number(tmdbId) } }) : null;
    const reviews = await prisma.review.findMany({
      where: { status: "PUBLISHED", visibility: "PUBLIC", ...(movie ? { movieId: movie.id } : {}) },
      include: {
        user: { select: { id: true, name: true, username: true, image: true } },
        movie: { select: { tmdbId: true, title: true, posterPath: true } }
      },
      orderBy: { createdAt: "desc" },
      take: 30
    });
    return ok(reviews);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);
    const parsed = reviewSchema.parse(await request.json());
    return created(await createReview({ userId: session.user.id, ...parsed }));
  } catch (error) {
    return handleApiError(error);
  }
}
