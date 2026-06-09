import Link from "next/link";
import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-3", className)}>
      <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500 via-fuchsia-500 to-cyan-400 shadow-lg shadow-fuchsia-500/30">
        <span className="absolute inset-0 bg-white/20 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
        <Sparkles className="relative h-5 w-5 text-white" />
      </span>
      <span className="text-lg font-black tracking-tight text-white">
        CineVerse <span className="text-gradient-neon">AI</span>
      </span>
    </Link>
  );
}
