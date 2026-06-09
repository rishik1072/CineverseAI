"use client";

import { Heart, ListPlus, Share2, Star } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

async function postJson(url: string, body: unknown) {
  const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!response.ok) throw new Error("Action failed");
  return response.json();
}

export function MovieActions({ tmdbId }: { tmdbId: number }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onClick={() =>
          toast.promise(postJson("/api/watchlists/default/items", { tmdbId }), {
            loading: "Adding to watchlist...",
            success: "Added to watchlist",
            error: "Sign in to manage your watchlist"
          })
        }
      >
        <ListPlus className="h-4 w-4" /> Watchlist
      </Button>
      <Button
        variant="glass"
        onClick={() =>
          toast.promise(postJson("/api/favorites", { tmdbId }), {
            loading: "Saving favorite...",
            success: "Saved to favorites",
            error: "Sign in to save favorites"
          })
        }
      >
        <Heart className="h-4 w-4" /> Favorite
      </Button>
      <Button
        variant="glass"
        onClick={() =>
          toast.promise(postJson("/api/ratings", { tmdbId, score: 9 }), {
            loading: "Rating movie...",
            success: "Rated 9/10",
            error: "Sign in to rate movies"
          })
        }
      >
        <Star className="h-4 w-4" /> Rate
      </Button>
      <Button
        variant="glass"
        onClick={() => {
          void navigator.clipboard?.writeText(window.location.href);
          toast.success("Link copied");
        }}
      >
        <Share2 className="h-4 w-4" /> Share
      </Button>
    </div>
  );
}
