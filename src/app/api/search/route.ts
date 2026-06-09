import { handleApiError, ok } from "@/server/http";
import { advancedSearch } from "@/server/services/search-service";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    return ok(await advancedSearch(url.searchParams));
  } catch (error) {
    return handleApiError(error);
  }
}
