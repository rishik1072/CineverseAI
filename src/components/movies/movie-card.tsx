import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { MovieSummary } from "@/types/movie";
import { getYear } from "@/lib/utils";

export function MovieCard({ movie, priority = false }: { movie: MovieSummary; priority?: boolean }) {
  return (
    <Link href={`/movies/${movie.tmdbId}`} className="group block min-w-[180px] max-w-[220px]">
      <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/30 transition duration-500 hover:-translate-y-2 hover:border-cyan-300/40 hover:shadow-cyan-400/20">
        <div className="relative aspect-[2/3] overflow-hidden bg-slate-900">
          {movie.posterPath ? (
            <Image
              src={movie.posterPath}
              alt={movie.title}
              fill
              sizes="220px"
              priority={priority}
              className="object-cover transition duration-700 group-hover:scale-110"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-80" />
          <div className="absolute right-3 top-3">
            <Badge variant="neon" className="gap-1">
              <Star className="h-3 w-3 fill-cyan-200" /> {movie.rating.toFixed(1)}
            </Badge>
          </div>
        </div>
        <div className="p-4">
          <h3 className="line-clamp-1 font-semibold text-white">{movie.title}</h3>
          <p className="mt-1 text-xs text-slate-400">
            {getYear(movie.releaseDate)} • {movie.genres.slice(0, 2).join(" / ")}
          </p>
        </div>
      </article>
    </Link>
  );
}
