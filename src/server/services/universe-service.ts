import type { UniverseGraph } from "@/types/movie";
import { fetchMovieCollection } from "@/server/external/tmdb/client";

export async function getUniverseGraph(): Promise<UniverseGraph> {
  // Use the Avengers collection (86311) as an example universe
  const collection = await fetchMovieCollection(86311);

  const nodes: UniverseGraph["nodes"] = [];
  const links: UniverseGraph["links"] = [];

  const franchiseId = `franchise-${collection.id}`;
  nodes.push({
    id: franchiseId,
    label: collection.name,
    type: "franchise",
    score: 100
  });

  collection.movies.forEach(movie => {
    nodes.push({
      id: movie.id,
      label: movie.title,
      type: "movie",
      score: (movie.rating ?? 5) * 10
    });

    links.push({
      source: franchiseId,
      target: movie.id,
      label: "part of",
      strength: 1
    });
  });

  return { nodes, links };
}
