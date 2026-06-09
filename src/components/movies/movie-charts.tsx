"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import type { MovieMetric } from "@/types/movie";

function TrendChart({ data, color }: { data: MovieMetric[]; color: string }) {
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.45} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="label" stroke="rgba(255,255,255,.35)" />
          <YAxis stroke="rgba(255,255,255,.35)" />
          <Tooltip contentStyle={{ background: "rgba(3,4,10,.92)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 18 }} />
          <Area type="monotone" dataKey="value" stroke={color} strokeWidth={3} fill={`url(#gradient-${color})`} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MovieCharts({ ratingTrend, popularityTrend }: { ratingTrend: MovieMetric[]; popularityTrend: MovieMetric[] }) {
  return (
    <section className="cinema-container py-12">
      <div className="mb-6">
        <p className="mb-2 text-xs uppercase tracking-[0.35em] text-cyan-200/80">Analytics</p>
        <h2 className="text-3xl font-black">Rating and popularity trends</h2>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-4 text-xl font-bold">Rating trend</h3>
            <TrendChart data={ratingTrend} color="#22d3ee" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-4 text-xl font-bold">Popularity trend</h3>
            <TrendChart data={popularityTrend} color="#ec4899" />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
