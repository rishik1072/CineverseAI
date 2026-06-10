import { BrainCircuit } from "lucide-react";

import { MovieRail } from "@/components/home/movie-rail";
import { Card, CardContent } from "@/components/ui/card";
import type { MovieSummary } from "@/types/movie";

export function AIRecommendations({ movies }: { movies: MovieSummary[] }) {
  const safeMovies = movies ?? [];
  
  return (
    <section className="cinema-container py-12">
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,.20),transparent_24rem),radial-gradient(circle_at_80%_20%,rgba(236,72,153,.18),transparent_24rem)]" />
        <CardContent className="relative p-0">
          <div className="p-8 md:p-10">
            <div className="mb-3 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 p-3 text-cyan-100">
              <BrainCircuit className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-5xl">AI recommendations tuned to your cinematic fingerprint</h2>
            <p className="mt-4 max-w-2xl text-slate-300">
              Recommendation ranking blends watchlists, favorites, ratings, genre affinity, recency, and cinematic mood signals.
            </p>
          </div>
          <MovieRail title="Because your taste is evolving" movies={safeMovies} />
        </CardContent>
      </Card>
    </section>
  );
}
