import type { MovieSummary } from "@/types/movie";
import type { TmdbMovie, TmdbPagedResponse, TmdbPerson, TmdbProvider } from "@/server/external/tmdb/types";
import { slugify } from "@/lib/utils";

const TMDB_BASE = process.env.TMDB_API_BASE_URL ?? "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = process.env.TMDB_IMAGE_BASE_URL ?? "https://image.tmdb.org/t/p";

function imageUrl(path: string | null | undefined, size: "w500" | "original" = "original") {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

export function mapTmdbMovie(movie: TmdbMovie): MovieSummary {
  return {
    id: `tmdb-${movie.id}`,
    tmdbId: movie.id,
    title: movie.title,
    slug: slugify(`${movie.title}-${movie.id}`),
    overview: movie.overview ?? "No overview available.",
    tagline: movie.tagline,
    posterPath: imageUrl(movie.poster_path, "w500"),
    backdropPath: imageUrl(movie.backdrop_path, "original"),
    releaseDate: movie.release_date ?? "",
    runtime: movie.runtime ?? 0,
    genres: movie.genres?.map((genre) => genre.name) ?? [],
    rating: Number((movie.vote_average ?? 0).toFixed(1)),
    voteCount: movie.vote_count ?? 0,
    popularity: movie.popularity ?? 0,
    budget: movie.budget,
    revenue: movie.revenue
  };
}

export async function tmdbFetch<T>(path: string, init?: RequestInit & { revalidate?: number }): Promise<T> {
  if (!process.env.TMDB_API_KEY) {
    throw new Error("TMDB_API_KEY is not configured");
  }

  const url = new URL(`${TMDB_BASE}${path}`);
  if (!url.searchParams.has("api_key")) url.searchParams.set("api_key", process.env.TMDB_API_KEY);

  const response = await fetch(url.toString(), {
    ...init,
    next: { revalidate: init?.revalidate ?? 900 }
  });

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function fetchMovieList(path: string, revalidate = 900) {
  const data = await tmdbFetch<TmdbPagedResponse<TmdbMovie>>(path, { revalidate });
  return data.results.map(mapTmdbMovie);
}

import type { MovieDetail } from "@/types/movie";

export async function fetchMovieDetail(tmdbId: number): Promise<MovieDetail> {
  const movie = await tmdbFetch<any>(`/movie/${tmdbId}?append_to_response=credits,videos,watch/providers,similar`, {
    revalidate: 60 * 60 * 12
  });
  
  const summary = mapTmdbMovie(movie);
  
  return {
    ...summary,
    cast: (movie.credits?.cast || []).map((c: any) => ({
      id: `cast-${c.id}`,
      name: c.name,
      character: c.character,
      profilePath: imageUrl(c.profile_path, "w500")
    })),
    crew: (movie.credits?.crew || []).map((c: any) => ({
      id: `crew-${c.id}-${c.job}`,
      name: c.name,
      job: c.job,
      profilePath: imageUrl(c.profile_path, "w500")
    })),
    videos: (movie.videos?.results || []).map((v: any) => ({
      id: v.id,
      site: v.site,
      key: v.key,
      name: v.name,
      type: v.type,
      official: v.official
    })),
    locations: [],
    ratingTrend: [],
    popularityTrend: [],
    similar: (movie.similar?.results || []).map((m: any) => mapTmdbMovie(m))
  };
}

export async function fetchSearchMovies(query: string, page = 1) {
  if (!query) return [];
  const data = await tmdbFetch<TmdbPagedResponse<TmdbMovie>>(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`, {
    revalidate: 60 * 5
  });
  return data.results.map(mapTmdbMovie);
}

export async function fetchPopularActors() {
  const data = await tmdbFetch<TmdbPagedResponse<TmdbPerson>>(`/person/popular`, {
    revalidate: 60 * 60 * 24
  });
  return data.results.map(person => ({
    id: `actor-${person.id}`,
    name: person.name,
    role: person.known_for_department ?? "Actor",
    image: imageUrl(person.profile_path, "w500")
  }));
}

export async function fetchStreamingProviders() {
  const data = await tmdbFetch<{ results: TmdbProvider[] }>(`/watch/providers/movie?watch_region=US`, {
    revalidate: 60 * 60 * 24 * 7
  });
  return data.results.map(provider => ({
    id: `provider-${provider.provider_id}`,
    name: provider.provider_name,
    logoPath: imageUrl(provider.logo_path, "original"),
    type: "FLATRATE" as const
  }));
}

export async function fetchDiscoverMovies(genreIds: number[]) {
  const genreParam = genreIds.join(",");
  const data = await tmdbFetch<TmdbPagedResponse<TmdbMovie>>(`/discover/movie?with_genres=${genreParam}&sort_by=popularity.desc`, {
    revalidate: 60 * 60 * 24
  });
  return data.results.map(mapTmdbMovie);
}

export async function fetchMovieCollection(collectionId: number) {
  const data = await tmdbFetch<{ id: number, name: string, parts: TmdbMovie[] }>(`/collection/${collectionId}`, {
    revalidate: 60 * 60 * 24 * 7
  });
  return {
    id: data.id,
    name: data.name,
    movies: data.parts.map(mapTmdbMovie)
  };
}

