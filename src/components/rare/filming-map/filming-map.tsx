import { MapPin } from "lucide-react";

const locations = [
  { name: "Wadi Rum", country: "Jordan", x: "57%", y: "48%" },
  { name: "Budapest", country: "Hungary", x: "51%", y: "36%" },
  { name: "Vancouver", country: "Canada", x: "18%", y: "30%" },
  { name: "New Zealand", country: "New Zealand", x: "82%", y: "77%" }
];

export function FilmingMap() {
  return (
    <div className="cinema-container py-16">
      <div className="mb-10 max-w-3xl">
        <p className="mb-2 text-xs uppercase tracking-[0.35em] text-fuchsia-200/80">Filming locations</p>
        <h1 className="text-5xl font-black md:text-7xl">A cinematic world map.</h1>
        <p className="mt-5 text-slate-300">Production-ready architecture can integrate Mapbox or Leaflet. This UI-safe preview uses an offline animated map canvas.</p>
      </div>
      <div className="relative min-h-[560px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#07101f] spotlight-grid">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,.16),transparent_30rem)]" />
        {locations.map((location) => (
          <div key={location.name} className="absolute" style={{ left: location.x, top: location.y }}>
            <div className="group relative">
              <span className="absolute -inset-4 animate-ping rounded-full bg-cyan-300/20" />
              <div className="relative grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-cyan-300 to-fuchsia-500 shadow-[0_0_40px_rgba(34,211,238,.35)]">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div className="absolute left-1/2 top-14 hidden w-44 -translate-x-1/2 rounded-2xl border border-white/10 bg-black/80 p-3 text-center text-sm backdrop-blur-xl group-hover:block">
                <strong>{location.name}</strong>
                <p className="text-slate-400">{location.country}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
