import Image from "next/image";
import Link from "next/link";
import { Play, Sparkles, TrendingUp } from "lucide-react";

import { MagneticButton } from "@/components/motion/magnetic-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { MovieSummary } from "@/types/movie";

export function HeroSection({ movie }: { movie: MovieSummary }) {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden">
      <div className="absolute inset-0">
        <Image src={movie.backdropPath} alt="Cinematic movie backdrop" fill priority className="premium-mask object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#03040a] via-[#03040a]/65 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#03040a] via-transparent to-[#03040a]/30" />
      </div>
      <div className="absolute inset-0 spotlight-grid opacity-20" />
      <div className="cinema-container relative flex min-h-[calc(100vh-5rem)] items-center py-20">
        <div className="max-w-4xl">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Badge variant="neon" className="gap-2">
              <Sparkles className="h-3.5 w-3.5" /> AI-curated discovery
            </Badge>
            <Badge variant="rose" className="gap-2">
              <TrendingUp className="h-3.5 w-3.5" /> Trending now
            </Badge>
          </div>
          <h1 className="max-w-5xl text-6xl font-black tracking-[-0.06em] text-white md:text-8xl lg:text-9xl">
            Discover cinema with <span className="text-gradient-cinema">AI taste</span>.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
            A visually rich movie universe that blends streaming discovery, smart recommendations, mood search, watch parties, and social watchlists.
          </p>
          <div className="mt-10 max-w-2xl rounded-full border border-white/10 bg-white/[0.08] p-2 shadow-2xl shadow-black/30 backdrop-blur-2xl">
            <form action="/search" className="flex items-center gap-2">
              <Input name="q" className="h-14 flex-1 border-0 bg-transparent text-base shadow-none focus-visible:ring-0" placeholder="Search movies, actors, moods, franchises..." />
              <Button className="h-14 px-7">Search</Button>
            </form>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <MagneticButton asChild size="lg">
              <Link href={`/movies/${movie.tmdbId}`}>
                <Play className="h-5 w-5 fill-white" /> Watch trailer
              </Link>
            </MagneticButton>
            <Button asChild size="lg" variant="glass">
              <Link href="/mood-search">Try AI Mood Search</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
