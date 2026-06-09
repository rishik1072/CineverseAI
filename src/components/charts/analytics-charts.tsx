"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";

const data = [
  { genre: "Sci-Fi", count: 34 },
  { genre: "Drama", count: 24 },
  { genre: "Action", count: 19 },
  { genre: "Mystery", count: 15 },
  { genre: "Animation", count: 10 }
];

export function AnalyticsCharts() {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="mb-6 text-2xl font-black">Most watched genres</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="genre" stroke="rgba(255,255,255,.45)" />
              <YAxis stroke="rgba(255,255,255,.45)" />
              <Tooltip contentStyle={{ background: "rgba(3,4,10,.92)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 18 }} />
              <Bar dataKey="count" fill="#22d3ee" radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
