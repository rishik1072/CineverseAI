export type TmdbMovie = {
  id: number;
  title: string;
  original_title?: string;
  overview?: string;
  tagline?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  release_date?: string;
  runtime?: number;
  genre_ids?: number[];
  genres?: { id: number; name: string }[];
  vote_average?: number;
  vote_count?: number;
  popularity?: number;
  budget?: number;
  revenue?: number;
  imdb_id?: string;
};

export type TmdbPerson = {
  id: number;
  name: string;
  known_for_department?: string;
  profile_path?: string | null;
  popularity?: number;
};

export type TmdbProvider = {
  provider_id: number;
  provider_name: string;
  logo_path?: string | null;
};

export type TmdbPagedResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};
