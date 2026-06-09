import { getMovieDetail } from "@/server/services/movie-service";

export async function compareMovies(movieA: number, movieB: number) {
  const [a, b] = await Promise.all([
    getMovieDetail(movieA),
    getMovieDetail(movieB)
  ]);
  
  const scoreA = a.rating * 12 + a.popularity / 12 + (a.revenue ? Number(a.revenue) / 100000000 : 0);
  const scoreB = b.rating * 12 + b.popularity / 12 + (b.revenue ? Number(b.revenue) / 100000000 : 0);

  return {
    movieA: a,
    movieB: b,
    scoreA: Number(scoreA.toFixed(1)),
    scoreB: Number(scoreB.toFixed(1)),
    winner: scoreA === scoreB ? null : scoreA > scoreB ? a : b,
    metrics: [
      { label: "Rating", a: a.rating, b: b.rating },
      { label: "Popularity", a: a.popularity, b: b.popularity },
      { label: "Revenue", a: a.revenue ? Number(a.revenue) : 0, b: b.revenue ? Number(b.revenue) : 0 },
      { label: "Runtime", a: a.runtime, b: b.runtime }
    ]
  };
}
