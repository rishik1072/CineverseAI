import { prisma } from "@/server/db/prisma";
import { upsertMovieByTmdbId } from "@/server/services/movie-reference-service";

export async function addFavorite(userId: string, tmdbId: number) {
  const movie = await upsertMovieByTmdbId(tmdbId);
  return prisma.favorite.upsert({
    where: { userId_movieId: { userId, movieId: movie.id } },
    create: { userId, movieId: movie.id },
    update: {}
  });
}
