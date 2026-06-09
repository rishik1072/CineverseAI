import { handleApiError, ok } from "@/server/http";

type Context = { params: Promise<{ tmdbId: string }> };

export async function GET(_request: Request, context: Context) {
  try {
    const { tmdbId } = await context.params;
    return ok([
      { id: "1", tmdbId, title: "Origin chapter", type: "RELEASE", year: 2021 },
      { id: "2", tmdbId, title: "Sequel expands the universe", type: "SEQUEL", year: 2024 },
      { id: "3", tmdbId, title: "Future franchise entry", type: "ANNOUNCEMENT", year: 2027 }
    ]);
  } catch (error) {
    return handleApiError(error);
  }
}
