"use client";

import { useMutation } from "@tanstack/react-query";
import { BrainCircuit, WandSparkles } from "lucide-react";
import { useState } from "react";

import { MovieGrid } from "@/components/movies/movie-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { MovieSummary } from "@/types/movie";

type MoodResponse = { ok: boolean; data: MovieSummary[] };

async function moodSearch(prompt: string): Promise<MoodResponse> {
  const response = await fetch("/api/mood-search", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt }) });
  if (!response.ok) throw new Error("Mood search failed");
  return response.json();
}

export function MoodSearchClient() {
  const [prompt, setPrompt] = useState("I want a mind-bending sci-fi movie with emotional depth.");
  const mutation = useMutation({ mutationFn: moodSearch });
  const movies = mutation.data?.data ?? [];

  return (
    <div className="cinema-container py-16">
      <div className="mx-auto max-w-4xl text-center">
        <Badge variant="neon">
          <BrainCircuit className="mr-2 h-3.5 w-3.5" /> AI Mood Search
        </Badge>
        <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">Describe a feeling. Get a movie.</h1>
        <p className="mt-5 text-slate-300">Natural language mood parsing maps intent to genres, tone, pacing, and cinematic texture.</p>
      </div>
      <div className="mx-auto mt-12 max-w-4xl rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-2xl">
        <Textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} className="min-h-[150px] text-lg" />
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2 text-xs text-slate-400">
            <span className="rounded-full bg-white/10 px-3 py-1">mind-bending</span>
            <span className="rounded-full bg-white/10 px-3 py-1">slow burn</span>
            <span className="rounded-full bg-white/10 px-3 py-1">comfort watch</span>
            <span className="rounded-full bg-white/10 px-3 py-1">visually stunning</span>
          </div>
          <Button onClick={() => mutation.mutate(prompt)} disabled={mutation.isPending}>
            <WandSparkles className="h-4 w-4" /> {mutation.isPending ? "Thinking..." : "Recommend"}
          </Button>
        </div>
      </div>
      {movies.length ? (
        <div className="mt-12">
          <MovieGrid movies={movies} />
        </div>
      ) : null}
    </div>
  );
}
