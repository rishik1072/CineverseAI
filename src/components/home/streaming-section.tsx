import { MonitorPlay } from "lucide-react";

const providers = ["Netflix", "Prime Video", "Disney+", "Hulu", "Apple TV+", "Max"];

export function StreamingSection() {
  return (
    <section className="cinema-container py-14">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 backdrop-blur-2xl md:p-10">
        <div className="mb-8 flex items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-fuchsia-500 shadow-lg shadow-cyan-400/20">
            <MonitorPlay className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/80">Streaming availability</p>
            <h2 className="text-3xl font-black">Find where to watch instantly</h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {providers.map((provider, index) => (
            <div key={provider} className="group rounded-3xl border border-white/10 bg-white/[0.05] p-6 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.09]">
              <div className="mb-5 h-12 w-12 rounded-2xl bg-gradient-to-br from-white/20 to-white/5" />
              <div className="text-lg font-bold text-white">{provider}</div>
              <p className="mt-2 text-sm text-slate-400">Availability intelligence • Region-aware • Link out ready</p>
              <div className="mt-4 h-1 rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-rose-400 to-cyan-300" style={{ width: `${65 + index * 5}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
