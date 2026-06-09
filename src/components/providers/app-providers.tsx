"use client";

import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";
import type { ReactNode } from "react";

import { ReactQueryProvider } from "@/components/providers/react-query-provider";
import { SessionProvider } from "@/components/providers/session-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ReactQueryProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster richColors closeButton position="top-right" theme="dark" />
          <Analytics />
        </ThemeProvider>
      </ReactQueryProvider>
    </SessionProvider>
  );
}
