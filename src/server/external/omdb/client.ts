export type OmdbMovie = {
  imdbID?: string;
  Title?: string;
  imdbRating?: string;
  imdbVotes?: string;
  Metascore?: string;
  Awards?: string;
  Rated?: string;
};

export async function fetchOmdbByImdbId(imdbId: string): Promise<OmdbMovie | null> {
  if (!process.env.OMDB_API_KEY) return null;

  const url = new URL("https://www.omdbapi.com/");
  url.searchParams.set("apikey", process.env.OMDB_API_KEY);
  url.searchParams.set("i", imdbId);

  const response = await fetch(url.toString(), { next: { revalidate: 60 * 60 * 24 } });
  if (!response.ok) return null;
  return response.json() as Promise<OmdbMovie>;
}
