"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Grid2X2, List, Search } from "lucide-react";

import { MovieCard } from "@/components/movies/movie-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import type { MovieSummary } from "@/types/movie";
import { cn } from "@/lib/utils";

type SearchResponse = {
  ok: boolean;
  data: { results: MovieSummary[]; total: number };
};

async function fetchSearch(query: string, genre: string, sort: string): Promise<SearchResponse> {
  const params = new URLSearchParams({ q: query, sort });
  if (genre) params.set("genre", genre);
  const response = await fetch(`/api/search?${params.toString()}`);
  if (!response.ok) throw new Error("Search failed");
  return response.json();
}

const genres = ["", "Science Fiction", "Drama", "Action", "Adventure", "Mystery", "Animation"];

export function SearchClient({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState("popularity");
  const [view, setView] = useState<"grid" | "list">("grid");
  const debounced = useDebounce(query, 280);

  const { data, isLoading } = useQuery({
    queryKey: ["search", debounced, genre, sort],
    queryFn: () => fetchSearch(debounced, genre, sort)
  });

  const movies = useMemo(() => data?.data.results ?? [], [data]);

  return (
    <div className="cinema-container py-14">
      <div className="mx-auto max-w-4xl text-center">
        <Badge variant="neon">Advanced Search Engine</Badge>
        <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">Search the cinematic universe.</h1>
        <p className="mt-5 text-slate-300">Instant debounced search with filters, sorting, and grid/list views.</p>
      </div>

      <div className="mt-12 rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 backdrop-blur-2xl">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try: mind-bending sci-fi" className="h-14 pl-12 text-base" />
          </div>
          <select value={genre} onChange={(event) => setGenre(event.target.value)} className="h-14 rounded-2xl border border-white/10 bg-[#0b0e18] px-4 text-sm text-white">
            {genres.map((item) => (
              <option key={item || "all"} value={item}>
                {item || "All genres"}
              </option>
            ))}
          </select>
          <select value={sort} onChange={(event) => setSort(event.target.value)} className="h-14 rounded-2xl border border-white/10 bg-[#0b0e18] px-4 text-sm text-white">
            <option value="popularity">Popularity</option>
            <option value="rating">Rating</option>
            <option value="release_date">Release date</option>
            <option value="title">Title</option>
          </select>
          <div className="flex rounded-2xl border border-white/10 bg-white/[0.04] p-1">
            <Button type="button" variant={view === "grid" ? "default" : "ghost"} size="icon" onClick={() => setView("grid")}>
              <Grid2X2 className="h-4 w-4" />
            </Button>
            <Button type="button" variant={view === "list" ? "default" : "ghost"} size="icon" onClick={() => setView("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between text-sm text-slate-400">
        <span>{isLoading ? "Searching..." : `${movies.length} results`}</span>
        <span>Runtime, language, country, year, and rating filters are API-ready.</span>
      </div>

      <div className={cn("mt-8", view === "grid" ? "grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5" : "space-y-4")}> 
        {movies.map((movie) =>
          view === "grid" ? (
            <MovieCard key={movie.tmdbId} movie={movie} />
          ) : (
            <div key={movie.tmdbId} className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-2xl">
              <div className="flex gap-5">
                <MovieCard movie={movie} />
                <div className="py-2">
                  <h3 className="text-2xl font-bold text-white">{movie.title}</h3>
                  <p className="mt-3 max-w-3xl text-slate-300">{movie.overview}</p>
                  <div className="mt-4 flex gap-2">
                    {movie.genres.map((item) => (
                      <Badge key={item} variant="outline">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
