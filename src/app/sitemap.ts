import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getPopularMovies } from "@/server/services/movie-service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const popularMovies = await getPopularMovies();
  
  return [
    "",
    "/movies",
    "/search",
    "/mood-search",
    "/battle",
    "/universe",
    "/timeline",
    "/locations"
  ]
    .map((path) => ({ url: `${siteConfig.url}${path}`, lastModified: now, changeFrequency: "weekly" as const, priority: path === "" ? 1 : 0.8 }))
    .concat(
      popularMovies.map((movie) => ({
        url: `${siteConfig.url}/movies/${movie.tmdbId}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.7
      }))
    );
}
