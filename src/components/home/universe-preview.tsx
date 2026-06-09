import Link from "next/link";
import { Network } from "lucide-react";

import { Button } from "@/components/ui/button";

export function UniversePreview() {
  return (
    <section className="cinema-container py-16">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#070a12]/80 p-8 shadow-2xl shadow-black/40 backdrop-blur-2xl md:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(34,211,238,.18),transparent_20rem),radial-gradient(circle_at_75%_70%,rgba(236,72,153,.18),transparent_20rem)]" />
        <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="mb-5 inline-grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-fuchsia-500">
              <Network className="h-7 w-7 text-white" />
            </div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-200/80">Movie Universe Explorer</p>
            <h2 className="text-4xl font-black tracking-tight md:text-6xl">Explore cinema as a living graph.</h2>
            <p className="mt-5 text-slate-300">
              D3-powered nodes connect movies, actors, directors, collaborations, sequels, franchises, and creative universes.
            </p>
            <Button asChild className="mt-8" size="lg">
              <Link href="/universe">Open universe graph</Link>
            </Button>
          </div>
          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/10 bg-black/30">
            {Array.from({ length: 14 }).map((_, index) => (
              <div
                key={index}
                className="absolute rounded-full border border-cyan-200/20 bg-cyan-300/10 shadow-[0_0_30px_rgba(34,211,238,.25)]"
                style={{
                  width: 34 + (index % 5) * 14,
                  height: 34 + (index % 5) * 14,
                  left: `${(index * 19) % 88}%`,
                  top: `${(index * 29) % 82}%`
                }}
              />
            ))}
            <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent,rgba(255,255,255,.08),transparent)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
