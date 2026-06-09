import Link from "next/link";
import type { ReactNode } from "react";

import { siteConfig } from "@/config/site";

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="cinema-container grid gap-8 py-10 lg:grid-cols-[260px_1fr]">
      <aside className="h-fit rounded-3xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-2xl">
        <div className="px-3 py-4">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/80">Dashboard</p>
          <h2 className="mt-2 text-2xl font-black">Your CineVerse</h2>
        </div>
        <nav className="space-y-1">
          {siteConfig.dashboardNav.map((item) => (
            <Link key={item.href} href={item.href} className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white">
              {item.title}
            </Link>
          ))}
        </nav>
      </aside>
      <main>{children}</main>
    </div>
  );
}
