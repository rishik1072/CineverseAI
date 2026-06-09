import Image from "next/image";

import type { MovieCredit } from "@/types/movie";

export function CastCarousel({ cast }: { cast: MovieCredit[] }) {
  return (
    <section className="cinema-container py-12">
      <div className="mb-6">
        <p className="mb-2 text-xs uppercase tracking-[0.35em] text-fuchsia-200/80">Cast</p>
        <h2 className="text-3xl font-black">Featured performers</h2>
      </div>
      <div className="scrollbar-none flex gap-5 overflow-x-auto pb-4">
        {cast.map((person) => (
          <article key={person.id} className="min-w-[180px] rounded-3xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-2xl">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-white/10">
              {person.profilePath ? <Image src={person.profilePath} alt={person.name} fill sizes="180px" className="object-cover" /> : null}
            </div>
            <h3 className="mt-4 font-bold text-white">{person.name}</h3>
            <p className="text-sm text-slate-400">{person.character ?? person.job}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
