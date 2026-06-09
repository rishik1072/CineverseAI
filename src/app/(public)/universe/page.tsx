import { UniverseGraphClient } from "@/components/rare/universe-graph/universe-graph-client";
import { Badge } from "@/components/ui/badge";
import { getUniverseGraph } from "@/server/services/universe-service";

export const metadata = { title: "Movie Universe Explorer" };

export default async function UniversePage() {
  const graph = await getUniverseGraph();
  return (
    <main className="cinema-container py-16">
      <div className="mb-10 max-w-4xl">
        <Badge variant="neon">D3.js Graph</Badge>
        <h1 className="mt-5 text-5xl font-black md:text-7xl">Movie Universe Explorer</h1>
        <p className="mt-5 text-slate-300">Interactive graph connecting movies, actors, directors, and franchises.</p>
      </div>
      <UniverseGraphClient graph={graph} />
    </main>
  );
}
