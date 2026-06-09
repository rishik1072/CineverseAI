import { getServerSession } from "next-auth";

import { authOptions } from "@/server/auth/config";
import { fail, handleApiError, ok } from "@/server/http";
import { getSurprisePick } from "@/server/services/recommendation-service";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);
    return ok(await getSurprisePick(session.user.id));
  } catch (error) {
    return handleApiError(error);
  }
}
