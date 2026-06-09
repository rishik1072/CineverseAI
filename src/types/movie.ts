export type MediaProvider = {
  id: string;
  name: string;
  logoPath?: string | undefined;
  type: "FLATRATE" | "RENT" | "BUY" | "ADS" | "FREE";
};

export type MovieCredit = {
  id: string;
  name: string;
  character?: string | undefined;
  job?: string | undefined;
  profilePath?: string | undefined;
};

export type MovieVideo = {
  id: string;
  site: "YouTube" | "Vimeo" | string;
  key: string;
  name: string;
  type: string;
  official?: boolean | undefined;
};

export type MovieLocation = {
  id: string;
  name: string;
  city?: string | undefined;
  country?: string | undefined;
  latitude?: number | undefined;
  longitude?: number | undefined;
  description?: string | undefined;
};

export type MovieMetric = {
  label: string;
  value: number;
  capturedAt: string;
};

export type MovieSummary = {
  id: string;
  tmdbId: number;
  title: string;
  slug: string;
  overview: string;
  tagline?: string | undefined;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  runtime: number;
  genres: string[];
  rating: number;
  voteCount: number;
  popularity: number;
  revenue?: number | undefined;
  budget?: number | undefined;
  providers?: MediaProvider[] | undefined;
  reason?: string | undefined;
};

export type MovieDetail = MovieSummary & {
  imdbRating?: number | undefined;
  metascore?: number | undefined;
  awards?: string | undefined;
  cast: MovieCredit[];
  crew: MovieCredit[];
  videos: MovieVideo[];
  locations: MovieLocation[];
  ratingTrend: MovieMetric[];
  popularityTrend: MovieMetric[];
  similar: MovieSummary[];
};

export type UniverseNode = {
  id: string;
  label: string;
  type: "movie" | "actor" | "director" | "franchise";
  image?: string | undefined;
  score?: number | undefined;
};

export type UniverseLink = {
  source: string;
  target: string;
  label: string;
  strength: number;
};

export type UniverseGraph = {
  nodes: UniverseNode[];
  links: UniverseLink[];
};
