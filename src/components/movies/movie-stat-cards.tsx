import { Banknote, Clock, Flame, Trophy } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { MovieDetail } from "@/types/movie";
import { formatCompactNumber, formatCurrency, formatRuntime } from "@/lib/utils";

export function MovieStatCards({ movie }: { movie: MovieDetail }) {
  const stats = [
    { label: "Revenue", value: formatCurrency(movie.revenue), icon: Banknote },
    { label: "Budget", value: formatCurrency(movie.budget), icon: Trophy },
    { label: "Runtime", value: formatRuntime(movie.runtime), icon: Clock },
    { label: "Popularity", value: formatCompactNumber(movie.popularity), icon: Flame }
  ];

  return (
    <section className="cinema-container py-12">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="overflow-hidden">
            <CardContent className="p-6">
              <stat.icon className="mb-5 h-6 w-6 text-cyan-200" />
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="mt-2 text-3xl font-black text-white">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
