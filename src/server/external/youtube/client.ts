export type YouTubeVideo = {
  id: string;
  title: string;
  thumbnail?: string | undefined;
};

export async function searchYouTubeTrailers(query: string): Promise<YouTubeVideo[]> {
  if (!process.env.YOUTUBE_API_KEY) return [];

  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.searchParams.set("key", process.env.YOUTUBE_API_KEY);
  url.searchParams.set("part", "snippet");
  url.searchParams.set("q", `${query} official trailer`);
  url.searchParams.set("type", "video");
  url.searchParams.set("maxResults", "3");

  const response = await fetch(url.toString(), { next: { revalidate: 60 * 60 * 24 } });
  if (!response.ok) return [];

  const data = (await response.json()) as {
    items?: Array<{ id?: { videoId?: string }; snippet?: { title?: string; thumbnails?: { high?: { url?: string } } } }>;
  };

  return (data.items ?? [])
    .filter((item) => item.id?.videoId)
    .map((item) => ({
      id: item.id!.videoId!,
      title: item.snippet?.title ?? "Trailer",
      thumbnail: item.snippet?.thumbnails?.high?.url
    }));
}
