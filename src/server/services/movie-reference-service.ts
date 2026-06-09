import { prisma } from "@/server/db/prisma";
import { getMovieDetail } from "@/server/services/movie-service";
import { slugify } from "@/lib/utils";

export async function upsertMovieByTmdbId(tmdbId: number) {
  const movie = await getMovieDetail(tmdbId);

  return prisma.movie.upsert({
    where: { tmdbId },
    create: {
      tmdbId,
      slug: slugify(`${movie.title}-${tmdbId}`),
      title: movie.title,
      overview: movie.overview,
      tagline: movie.tagline ?? null,
      posterPath: movie.posterPath,
      backdropPath: movie.backdropPath,
      releaseDate: movie.releaseDate ? new Date(movie.releaseDate) : null,
      runtime: movie.runtime ?? null,
      budget: movie.budget ? BigInt(movie.budget) : null,
      revenue: movie.revenue ? BigInt(movie.revenue) : null,
      tmdbVoteAverage: movie.rating,
      tmdbVoteCount: movie.voteCount,
      tmdbPopularity: movie.popularity,
      imdbRating: movie.imdbRating ?? null,
      metascore: movie.metascore ?? null,
      awards: movie.awards ?? null,
      cachedAt: new Date()
    },
    update: {
      title: movie.title,
      overview: movie.overview,
      tagline: movie.tagline ?? null,
      posterPath: movie.posterPath,
      backdropPath: movie.backdropPath,
      releaseDate: movie.releaseDate ? new Date(movie.releaseDate) : null,
      runtime: movie.runtime ?? null,
      budget: movie.budget ? BigInt(movie.budget) : null,
      revenue: movie.revenue ? BigInt(movie.revenue) : null,
      tmdbVoteAverage: movie.rating,
      tmdbVoteCount: movie.voteCount,
      tmdbPopularity: movie.popularity,
      imdbRating: movie.imdbRating ?? null,
      metascore: movie.metascore ?? null,
      awards: movie.awards ?? null,
      cachedAt: new Date()
    }
  });
}
