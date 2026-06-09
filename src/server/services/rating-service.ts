import { prisma } from "@/server/db/prisma";
import { upsertMovieByTmdbId } from "@/server/services/movie-reference-service";

export async function rateMovie(userId: string, tmdbId: number, score: number) {
  const movie = await upsertMovieByTmdbId(tmdbId);
  return prisma.rating.upsert({
    where: { userId_movieId: { userId, movieId: movie.id } },
    create: { userId, movieId: movie.id, score },
    update: { score }
  });
}
