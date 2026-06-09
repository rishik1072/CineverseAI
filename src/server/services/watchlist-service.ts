import { prisma } from "@/server/db/prisma";
import { upsertMovieByTmdbId } from "@/server/services/movie-reference-service";

export async function ensureDefaultWatchlist(userId: string) {
  return prisma.watchlist.upsert({
    where: { userId_slug: { userId, slug: "watchlist" } },
    create: { userId, title: "Watchlist", slug: "watchlist", isDefault: true },
    update: {}
  });
}

type WatchStatusInput = "PLANNED" | "WATCHING" | "COMPLETED" | "DROPPED" | "ON_HOLD";

export async function addMovieToWatchlist(
  userId: string,
  tmdbId: number,
  status: WatchStatusInput = "PLANNED",
  notes?: string
) {
  const [watchlist, movie] = await Promise.all([ensureDefaultWatchlist(userId), upsertMovieByTmdbId(tmdbId)]);
  return prisma.watchlistItem.upsert({
    where: { watchlistId_movieId: { watchlistId: watchlist.id, movieId: movie.id } },
    create: { watchlistId: watchlist.id, userId, movieId: movie.id, status, notes: notes ?? null },
    update: { status, notes: notes ?? null }
  });
}
