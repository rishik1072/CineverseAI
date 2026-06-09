import { Logo } from "@/components/brand/logo";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/20 py-12">
      <div className="cinema-container flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo />
          <p className="mt-4 max-w-xl text-sm text-slate-400">
            CineVerse AI is a premium movie discovery experience. Movie metadata is powered by external APIs and cached for performance.
          </p>
        </div>
        <div className="text-sm text-slate-500">© {new Date().getFullYear()} CineVerse AI. Portfolio-grade demo platform.</div>
      </div>
    </footer>
  );
}
