import type { ReactNode } from "react";

import { CinematicLoader } from "@/components/brand/cinematic-loader";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { CinematicParticles } from "@/components/three/cinematic-particles";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      <CinematicLoader />
      <CinematicParticles />
      <Navbar />
      <div className="relative z-10 min-h-screen pt-20">{children}</div>
      <Footer />
    </>
  );
}
