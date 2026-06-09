const events = [
  { year: "2014", title: "Original idea becomes a phenomenon", type: "Origin" },
  { year: "2017", title: "Universe expands through sequels", type: "Sequel" },
  { year: "2024", title: "Prestige reboot and franchise revival", type: "Reboot" },
  { year: "2027", title: "Future chapter release radar", type: "Announcement" }
];

export function MovieTimeline() {
  return (
    <div className="cinema-container py-16">
      <div className="mb-12 max-w-3xl">
        <p className="mb-2 text-xs uppercase tracking-[0.35em] text-cyan-200/80">Interactive Timeline</p>
        <h1 className="text-5xl font-black md:text-7xl">Franchise history, sequels, prequels, and release arcs.</h1>
      </div>
      <div className="relative border-l border-cyan-300/30 pl-8">
        {events.map((event) => (
          <div key={event.year} className="relative mb-10 rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-2xl">
            <div className="absolute -left-[2.85rem] top-8 h-5 w-5 rounded-full border-4 border-[#03040a] bg-cyan-300 shadow-[0_0_30px_rgba(34,211,238,.7)]" />
            <div className="text-sm font-bold text-cyan-200">{event.year} • {event.type}</div>
            <h2 className="mt-2 text-2xl font-black">{event.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
