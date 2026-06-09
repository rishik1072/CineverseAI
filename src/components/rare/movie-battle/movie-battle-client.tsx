"use client";

import { useMutation } from "@tanstack/react-query";
import { Swords } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import type { MovieDetail, MovieSummary } from "@/types/movie";

type CompareResponse = {
  ok: boolean;
  data: { movieA: MovieDetail; movieB: MovieDetail; scoreA: number; scoreB: number; winner: MovieDetail | null; metrics: Array<{ label: string; a: number; b: number }> };
};

async function compare(movieA: number, movieB: number): Promise<CompareResponse> {
  const response = await fetch("/api/movies/compare", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ movieA, movieB }) });
  if (!response.ok) throw new Error("Sign in to save movie comparisons");
  return response.json();
}

function MovieSearchInput({ value, onChange, placeholder }: { value: string; onChange: (val: string) => void; placeholder: string }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MovieSummary[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    const delay = setTimeout(async () => {
      try {
        const res = await fetch(`/api/movies/search?query=${encodeURIComponent(query)}`);
        const json = await res.json();
        if (json.ok) setResults(json.data);
      } catch {
        // Ignored
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <Input
        value={query || value}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
      />
      {isOpen && results.length > 0 && (
        <div className="absolute z-10 mt-1 w-full rounded-md border border-slate-800 bg-slate-950 shadow-xl">
          <ul className="max-h-60 overflow-auto py-1">
            {results.map((movie) => (
              <li
                key={movie.tmdbId}
                className="flex cursor-pointer items-center gap-3 px-3 py-2 text-sm hover:bg-slate-800"
                onClick={() => {
                  onChange(movie.tmdbId.toString());
                  setQuery(movie.title);
                  setIsOpen(false);
                }}
              >
                {movie.posterPath ? (
                  <div className="relative h-10 w-7 shrink-0">
                    <Image src={movie.posterPath} alt={movie.title} fill sizes="28px" className="rounded object-cover" />
                  </div>
                ) : (
                  <div className="h-10 w-7 shrink-0 rounded bg-slate-800" />
                )}
                <div className="overflow-hidden">
                  <p className="truncate font-medium">{movie.title}</p>
                  <p className="text-xs text-slate-400">{movie.releaseDate?.substring(0, 4)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function MovieBattleClient() {
  const [a, setA] = useState("693134"); // Dune Part 2
  const [b, setB] = useState("157336"); // Interstellar
  const mutation = useMutation({ mutationFn: () => compare(Number(a), Number(b)) });
  const result = mutation.data?.data;

  return (
    <div className="cinema-container py-16">
      <div className="mx-auto max-w-4xl text-center">
        <Badge variant="rose"><Swords className="mr-2 h-3.5 w-3.5" /> Movie Battle</Badge>
        <h1 className="mt-5 text-5xl font-black md:text-7xl">Compare two legends.</h1>
        <p className="mt-5 text-slate-300">Ratings, revenue, cast depth, awards, and popularity collide in an interactive dashboard.</p>
      </div>
      <Card className="mx-auto mt-10 max-w-4xl">
        <CardContent className="grid gap-4 p-6 md:grid-cols-[1fr_1fr_auto]">
          <MovieSearchInput value={a} onChange={setA} placeholder="Search Movie A..." />
          <MovieSearchInput value={b} onChange={setB} placeholder="Search Movie B..." />
          <Button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
            {mutation.isPending ? "Battling..." : "Battle"}
          </Button>
        </CardContent>
      </Card>
      {result ? (
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {[result.movieA, result.movieB].map((movie, index) => (
            <Card key={movie.tmdbId} className="lg:col-span-1 border-slate-800 bg-slate-900/50 backdrop-blur">
              <CardContent className="p-6 text-center">
                <p className="text-sm uppercase tracking-widest text-slate-400">Contender {index + 1}</p>
                {movie.posterPath ? (
                  <div className="relative mx-auto mt-4 h-48 w-32 shrink-0">
                    <Image src={movie.posterPath} alt={movie.title} fill sizes="128px" className="rounded-md object-cover shadow-lg" />
                  </div>
                ) : null}
                <h2 className="mt-4 text-2xl font-black leading-tight">{movie.title}</h2>
                <div className="mt-4 text-5xl font-black text-gradient-neon">{index === 0 ? result.scoreA : result.scoreB}</div>
              </CardContent>
            </Card>
          ))}
          <Card className="border-rose-500/20 bg-rose-500/5 backdrop-blur">
            <CardContent className="p-6">
              <p className="text-sm uppercase tracking-widest text-rose-400">Winner</p>
              <h2 className="mt-2 text-3xl font-black text-rose-100">{result.winner?.title ?? "It's a Tie!"}</h2>
              <div className="mt-8 space-y-5">
                {result.metrics.map((metric) => (
                  <div key={metric.label}>
                    <div className="mb-2 flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
                      <span>{metric.label}</span>
                      <span>{metric.a} vs {metric.b}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                      <div className="h-full rounded-full bg-gradient-to-r from-rose-500 to-cyan-400" style={{ width: `${Math.min(100, (metric.a / Math.max(metric.a, metric.b, 1)) * 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
