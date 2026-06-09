import { BarChart3, Heart, ListChecks, Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { label: "Watchlist", value: "128", icon: ListChecks },
  { label: "Favorites", value: "42", icon: Heart },
  { label: "Average rating", value: "8.4", icon: Star },
  { label: "Genre spread", value: "18", icon: BarChart3 }
];

export function DashboardStatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-6">
            <stat.icon className="mb-5 h-6 w-6 text-cyan-200" />
            <p className="text-sm text-slate-400">{stat.label}</p>
            <p className="mt-2 text-3xl font-black">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
