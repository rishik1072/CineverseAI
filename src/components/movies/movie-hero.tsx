import Image from "next/image";
import { Calendar, Clock, Star } from "lucide-react";

import { MovieActions } from "@/components/movies/movie-actions";
import { Badge } from "@/components/ui/badge";
import type { MovieDetail } from "@/types/movie";
import { formatRuntime, getYear } from "@/lib/utils";

export function MovieHero({ movie }: { movie: MovieDetail }) {
  return (
    <section className="relative min-h-[74vh] overflow-hidden">
      <div className="absolute inset-0">
        <Image src={movie.backdropPath} alt={movie.title} fill priority className="premium-mask object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#03040a] via-[#03040a]/75 to-[#03040a]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#03040a] via-transparent to-black/30" />
      </div>
      <div className="cinema-container relative flex min-h-[74vh] items-end pb-16 pt-20">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:items-end">
          <div className="relative aspect-[2/3] max-w-[260px] overflow-hidden rounded-[2rem] border border-white/15 shadow-2xl shadow-black/60 neon-ring">
            <Image src={movie.posterPath} alt={movie.title} fill priority className="object-cover" />
          </div>
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <Badge key={genre} variant="outline">
                  {genre}
                </Badge>
              ))}
            </div>
            <h1 className="max-w-5xl text-5xl font-black tracking-tight text-white md:text-7xl">{movie.title}</h1>
            {movie.tagline ? <p className="mt-4 text-xl italic text-cyan-100/80">“{movie.tagline}”</p> : null}
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{movie.overview}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-300">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                <Star className="h-4 w-4 fill-yellow-300 text-yellow-300" /> {movie.rating.toFixed(1)} / 10
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                <Clock className="h-4 w-4" /> {formatRuntime(movie.runtime)}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                <Calendar className="h-4 w-4" /> {getYear(movie.releaseDate)}
              </span>
            </div>
            <div className="mt-8">
              <MovieActions tmdbId={movie.tmdbId} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
