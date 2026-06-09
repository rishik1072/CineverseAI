import { prisma } from "@/server/db/prisma";
import { sanitizeText } from "@/server/security/sanitize";
import { upsertMovieByTmdbId } from "@/server/services/movie-reference-service";

export async function createReview(input: {
  userId: string;
  tmdbId: number;
  title?: string | undefined;
  content: string;
  ratingSnapshot?: number | undefined;
  containsSpoilers?: boolean | undefined;
  visibility?: "PRIVATE" | "PUBLIC" | "UNLISTED" | "FOLLOWERS_ONLY" | undefined;
}) {
  const movie = await upsertMovieByTmdbId(input.tmdbId);
  return prisma.review.create({
    data: {
      userId: input.userId,
      movieId: movie.id,
      title: input.title ? sanitizeText(input.title) : null,
      content: sanitizeText(input.content),
      ratingSnapshot: input.ratingSnapshot ?? null,
      containsSpoilers: input.containsSpoilers ?? false,
      visibility: input.visibility ?? "PUBLIC"
    }
  });
}
