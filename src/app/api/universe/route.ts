import { handleApiError, ok } from "@/server/http";
import { getUniverseGraph } from "@/server/services/universe-service";

export async function GET() {
  try {
    return ok(await getUniverseGraph());
  } catch (error) {
    return handleApiError(error);
  }
}
