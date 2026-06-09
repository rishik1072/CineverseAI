import Image from "next/image";

export function PopularActors({ actors }: { actors: Array<{ id: string; name: string; role: string; image: string }> }) {
  return (
    <section className="cinema-container py-14">
      <div className="mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-fuchsia-200/80">Release radar inputs</p>
        <h2 className="text-3xl font-black md:text-4xl">Popular actors</h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {actors.map((actor) => (
          <article key={actor.id} className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-2xl transition hover:-translate-y-2 hover:border-fuchsia-300/40">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-900">
              <Image src={actor.image} alt={actor.name} fill sizes="300px" className="object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-white">{actor.name}</h3>
            <p className="text-sm text-slate-400">{actor.role} • Follow for release radar</p>
          </article>
        ))}
      </div>
    </section>
  );
}
