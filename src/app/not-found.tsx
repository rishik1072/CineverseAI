import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="cinema-container grid min-h-[70vh] place-items-center py-20 text-center">
      <div>
        <p className="text-sm uppercase tracking-[0.5em] text-cyan-200">404</p>
        <h1 className="mt-4 text-6xl font-black">Lost in the multiverse.</h1>
        <p className="mt-4 text-slate-400">The scene you're looking for doesn't exist.</p>
        <Button asChild className="mt-8"><Link href="/">Back home</Link></Button>
      </div>
    </main>
  );
}
