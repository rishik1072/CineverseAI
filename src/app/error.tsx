"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="cinema-container grid min-h-[70vh] place-items-center py-20 text-center">
      <div>
        <h1 className="text-5xl font-black">Something broke in the projection room.</h1>
        <p className="mt-4 text-slate-400">{error.message}</p>
        <Button className="mt-8" onClick={reset}>Try again</Button>
      </div>
    </main>
  );
}
