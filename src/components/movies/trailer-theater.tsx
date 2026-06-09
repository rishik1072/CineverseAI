"use client";

import { Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { MovieVideo } from "@/types/movie";

export function TrailerTheater({ video }: { video: MovieVideo | undefined }) {
  if (!video) return null;

  return (
    <section className="cinema-container py-12">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 backdrop-blur-2xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.35em] text-cyan-200/80">Trailer</p>
            <h2 className="text-3xl font-black">Theater mode preview</h2>
            <p className="mt-3 text-slate-400">Dim the interface and watch official video content in a cinematic overlay.</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg">
                <Play className="h-5 w-5 fill-white" /> Play trailer
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl p-4">
              <DialogHeader>
                <DialogTitle>{video.name}</DialogTitle>
              </DialogHeader>
              <div className="aspect-video overflow-hidden rounded-2xl bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${video.key}`}
                  title={video.name}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
