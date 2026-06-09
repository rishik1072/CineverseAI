import Link from "next/link";
import type { ReactNode } from "react";

const links = [
  { title: "Overview", href: "/admin" },
  { title: "Users", href: "/admin/users" },
  { title: "Reviews", href: "/admin/reviews" },
  { title: "Reports", href: "/admin/reports" },
  { title: "Analytics", href: "/admin/analytics" }
];

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="cinema-container grid gap-8 py-10 lg:grid-cols-[260px_1fr]">
      <aside className="h-fit rounded-3xl border border-rose-300/20 bg-rose-500/[0.06] p-4 backdrop-blur-2xl">
        <div className="px-3 py-4">
          <p className="text-xs uppercase tracking-[0.35em] text-rose-200">Admin</p>
          <h2 className="mt-2 text-2xl font-black">Control Room</h2>
        </div>
        <nav className="space-y-1">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white">{link.title}</Link>
          ))}
        </nav>
      </aside>
      <main>{children}</main>
    </div>
  );
}
