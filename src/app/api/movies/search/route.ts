import { NextResponse } from "next/server";
import { searchMovies } from "@/server/services/movie-service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ ok: true, data: [] });
  }

  try {
    const movies = await searchMovies(query);
    // Limit to 5 results for the autocomplete
    return NextResponse.json({ ok: true, data: movies.slice(0, 5) });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
  }
}
