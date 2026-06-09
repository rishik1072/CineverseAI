import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CineVerse AI",
    short_name: "CineVerse",
    description: "Premium AI-powered movie discovery platform.",
    start_url: "/",
    display: "standalone",
    background_color: "#03040a",
    theme_color: "#03040a",
    icons: [{ src: "/icons/icon.svg", sizes: "any", type: "image/svg+xml" }]
  };
}
