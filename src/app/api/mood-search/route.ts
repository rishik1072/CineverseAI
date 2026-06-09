import { handleApiError, ok } from "@/server/http";
import { runMoodSearch } from "@/server/services/mood-search-service";
import { moodSearchSchema } from "@/server/validators/schemas";

export async function POST(request: Request) {
  try {
    const parsed = moodSearchSchema.parse(await request.json());
    return ok(await runMoodSearch(parsed.prompt));
  } catch (error) {
    return handleApiError(error);
  }
}
