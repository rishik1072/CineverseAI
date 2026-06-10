import type { MovieSummary, MovieDetail } from "@/types/movie";
import type { TmdbMovie, TmdbPagedResponse, TmdbPerson, TmdbProvider } from "@/server/external/tmdb/types";
import { slugify } from "@/lib/utils";

const TMDB_BASE = process.env.TMDB_API_BASE_URL ?? "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = process.env.TMDB_IMAGE_BASE_URL ?? "https://image.tmdb.org/t/p";

function logTmdbWarning(message: string, details?: unknown) {
  console.warn(`[TMDB] ${message}`, details ?? "");
}

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
    logTmdbWarning("TMDB_API_KEY is not configured. Returning safe fallback response.", { path });
    return Promise.resolve({} as T);
  }

  const url = new URL(`${TMDB_BASE}${path}`);
  if (!url.searchParams.has("api_key")) url.searchParams.set("api_key", process.env.TMDB_API_KEY);

  const response = await fetch(url.toString(), {
    ...init,
    next: { revalidate: init?.revalidate ?? 900 }
  });

  if (!response.ok) {
    const bodyText = await response.text().catch(() => "");
    logTmdbWarning("TMDB request failed. Returning safe fallback response.", {
      path,
      status: response.status,
      statusText: response.statusText,
      bodyText
    });
    return Promise.resolve({} as T);
  }

  return response.json() as Promise<T>;
}

function createEmptyMovieDetail(tmdbId: number): MovieDetail {
  return {
    id: `tmdb-${tmdbId}`,
    tmdbId,
    title: "Unknown movie",
    slug: `unknown-movie-${tmdbId}`,
    overview: "No overview available.",
    tagline: "",
    posterPath: "",
    backdropPath: "",
    releaseDate: "",
    runtime: 0,
    genres: [],
    rating: 0,
    voteCount: 0,
    popularity: 0,
    budget: 0,
    revenue: 0,
    cast: [],
    crew: [],
    videos: [],
    locations: [],
    ratingTrend: [],
    popularityTrend: [],
    similar: []
  };
}

export async function fetchMovieList(path: string, revalidate = 900) {
  try {
    const data = await tmdbFetch<TmdbPagedResponse<TmdbMovie>>(path, { revalidate });
    return data.results?.map(mapTmdbMovie) ?? [];
  } catch (error) {
    logTmdbWarning("Failed to fetch movie list. Returning empty list.", { path, error });
    return [];
  }
}

export async function fetchMovieDetail(tmdbId: number): Promise<MovieDetail> {
  if (!process.env.TMDB_API_KEY) {
    logTmdbWarning("TMDB_API_KEY missing when fetching movie detail. Returning fallback detail.", { tmdbId });
    return createEmptyMovieDetail(tmdbId);
  }

  try {
    const movie = await tmdbFetch<TmdbMovieDetailResponse>(
      `/movie/${tmdbId}?append_to_response=credits,videos,watch/providers,similar`,
      {
        revalidate: 60 * 60 * 12
      }
    );

    const summary = mapTmdbMovie(movie);

    return {
      ...summary,
      cast: (movie.credits?.cast || []).map((c) => ({
        id: `cast-${c.id}`,
        name: c.name,
        character: c.character,
        profilePath: imageUrl(c.profile_path, "w500")
      })),
      crew: (movie.credits?.crew || []).map((c) => ({
        id: `crew-${c.id}-${c.job}`,
        name: c.name,
        job: c.job,
        profilePath: imageUrl(c.profile_path, "w500")
      })),
      videos: (movie.videos?.results || []).map((v) => ({
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
      similar: (movie.similar?.results || []).map((m) => mapTmdbMovie(m))
    };
  } catch (error) {
    logTmdbWarning("Failed to fetch movie detail. Returning fallback detail.", { tmdbId, error });
    return createEmptyMovieDetail(tmdbId);
  }
}

export async function fetchSearchMovies(query: string, page = 1) {
  if (!query) return [];

  try {
    const data = await tmdbFetch<TmdbPagedResponse<TmdbMovie>>(
      `/search/movie?query=${encodeURIComponent(query)}&page=${page}`,
      {
        revalidate: 60 * 5
      }
    );
    return data.results?.map(mapTmdbMovie) ?? [];
  } catch (error) {
    logTmdbWarning("Failed to fetch search movies. Returning empty search results.", { query, page, error });
    return [];
  }
}

export async function fetchPopularActors() {
  try {
    const data = await tmdbFetch<TmdbPagedResponse<TmdbPerson>>(`/person/popular`, {
      revalidate: 60 * 60 * 24
    });
    return data.results?.map((person) => ({
      id: `actor-${person.id}`,
      name: person.name,
      role: person.known_for_department ?? "Actor",
      image: imageUrl(person.profile_path, "w500")
    })) ?? [];
  } catch (error) {
    logTmdbWarning("Failed to fetch popular actors. Returning empty actor list.", { error });
    return [];
  }
}

export async function fetchStreamingProviders() {
  try {
    const data = await tmdbFetch<{ results: TmdbProvider[] }>(`/watch/providers/movie?watch_region=US`, {
      revalidate: 60 * 60 * 24 * 7
    });
    return data.results?.map((provider) => ({
      id: `provider-${provider.provider_id}`,
      name: provider.provider_name,
      logoPath: imageUrl(provider.logo_path, "original"),
      type: "FLATRATE" as const
    })) ?? [];
  } catch (error) {
    logTmdbWarning("Failed to fetch streaming providers. Returning empty provider list.", { error });
    return [];
  }
}

export async function fetchDiscoverMovies(genreIds: number[]) {
  const genreParam = genreIds.join(",");

  try {
    const data = await tmdbFetch<TmdbPagedResponse<TmdbMovie>>(
      `/discover/movie?with_genres=${genreParam}&sort_by=popularity.desc`,
      {
        revalidate: 60 * 60 * 24
      }
    );
    return data.results?.map(mapTmdbMovie) ?? [];
  } catch (error) {
    logTmdbWarning("Failed to fetch discover movies. Returning empty discover list.", { genreIds, error });
    return [];
  }
}

export async function fetchMovieCollection(collectionId: number) {
  try {
    const data = await tmdbFetch<{ id: number; name: string; parts: TmdbMovie[] }>(`/collection/${collectionId}`, {
      revalidate: 60 * 60 * 24 * 7
    });
    return {
      id: data.id ?? 0,
      name: data.name ?? "",
      movies: data.parts?.map(mapTmdbMovie) ?? []
    };
  } catch (error) {
    logTmdbWarning("Failed to fetch movie collection. Returning empty collection.", { collectionId, error });
    return { id: 0, name: "", movies: [] };
  }
}

type TmdbCast = { id: number; name: string; character: string; profile_path: string | null };
type TmdbCrew = { id: number; name: string; job: string; profile_path: string | null };
type TmdbVideo = { id: string; site: string; key: string; name: string; type: string; official: boolean };

type TmdbMovieDetailResponse = TmdbMovie & {
  credits?: { cast: TmdbCast[]; crew: TmdbCrew[] };
  videos?: { results: TmdbVideo[] };
  similar?: { results: TmdbMovie[] };
};

