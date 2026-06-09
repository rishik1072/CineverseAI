"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Command, LayoutDashboard, LogIn, Search, Shield } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#03040a]/55 backdrop-blur-2xl">
      <div className="cinema-container flex h-20 items-center justify-between gap-6">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white",
                pathname === item.href && "bg-white/10 text-white"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/search"
            className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-slate-300 backdrop-blur-xl transition hover:bg-white/[0.10] sm:flex"
          >
            <Search className="h-4 w-4" />
            Search
            <span className="ml-3 inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-slate-400">
              <Command className="h-3 w-3" />K
            </span>
          </Link>
          {session?.user ? (
            <>
              <Button asChild size="icon" variant="glass" aria-label="Notifications">
                <Link href="/dashboard/notifications">
                  <Bell className="h-4 w-4" />
                </Link>
              </Button>
              {session.user.role === "ADMIN" ? (
                <Button asChild size="icon" variant="glass" aria-label="Admin">
                  <Link href="/admin">
                    <Shield className="h-4 w-4" />
                  </Link>
                </Button>
              ) : null}
              <Button asChild variant="glass" className="hidden md:inline-flex">
                <Link href="/dashboard">
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Link>
              </Button>
              <button onClick={() => void signOut()} className="rounded-full border border-white/10 p-1 transition hover:bg-white/10" aria-label="Sign out">
                <Avatar>
                  <AvatarImage src={session.user.image ?? undefined} />
                  <AvatarFallback>{session.user.name?.slice(0, 2).toUpperCase() ?? "CV"}</AvatarFallback>
                </Avatar>
              </button>
            </>
          ) : (
            <Button asChild variant="glass">
              <Link href="/login">
                <LogIn className="h-4 w-4" /> Sign in
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
