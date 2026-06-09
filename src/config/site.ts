export const siteConfig = {
  name: "CineVerse AI",
  description:
    "A premium AI-powered cinema discovery platform blending Netflix polish, Apple TV cinematic design, IMDb depth, and Letterboxd community.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  nav: [
    { title: "Movies", href: "/movies" },
    { title: "Mood AI", href: "/mood-search" },
    { title: "Battle", href: "/battle" },
    { title: "Universe", href: "/universe" }
  ],
  dashboardNav: [
    { title: "Overview", href: "/dashboard" },
    { title: "Watchlist", href: "/dashboard/watchlist" },
    { title: "Favorites", href: "/dashboard/favorites" },
    { title: "Reviews", href: "/dashboard/reviews" },
    { title: "Analytics", href: "/dashboard/analytics" },
    { title: "Settings", href: "/dashboard/settings" }
  ]
};
