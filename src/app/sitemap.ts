import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getPopularMovies } from "@/server/services/movie-service";

const STATIC_SITEMAP_PATHS = [
  "",
  "/movies",
  "/search",
  "/mood-search",
  "/battle",
  "/universe",
  "/timeline",
  "/locations"
];

function createStaticEntries(now: Date): MetadataRoute.Sitemap {
  return STATIC_SITEMAP_PATHS.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticEntries = createStaticEntries(now);

  try {
    const popularMovies = await getPopularMovies();

    const movieEntries: MetadataRoute.Sitemap = popularMovies.map((movie) => ({
      url: `${siteConfig.url}/movies/${movie.tmdbId}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7
    }));

    return [...staticEntries, ...movieEntries];
  } catch (error) {
    console.warn("[sitemap] Failed to fetch popular movies for sitemap. Falling back to static sitemap entries.", error);
    return staticEntries;
  }
}
