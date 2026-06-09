import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { GsapScrollReveal } from "@/components/motion/gsap-scroll-reveal";
import { MovieCard } from "@/components/movies/movie-card";
import { MovieCard3D } from "@/components/movies/movie-card-3d";
import { Button } from "@/components/ui/button";
import type { MovieSummary } from "@/types/movie";

export function MovieRail({ title, eyebrow, movies, href }: { title: string; eyebrow?: string; movies: MovieSummary[]; href?: string }) {
  return (
    <GsapScrollReveal className="py-10">
      <div className="cinema-container">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            {eyebrow ? <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-200/80">{eyebrow}</p> : null}
            <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">{title}</h2>
          </div>
          {href && (
            <Button variant="ghost" className="hidden sm:inline-flex" asChild>
              <Link href={href}>
                View all <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
        <div className="scrollbar-none flex gap-5 overflow-x-auto pb-6">
          {movies.map((movie, index) => (
            <MovieCard3D key={movie.tmdbId}>
              <MovieCard movie={movie} priority={index < 2} />
            </MovieCard3D>
          ))}
        </div>
      </div>
    </GsapScrollReveal>
  );
}
