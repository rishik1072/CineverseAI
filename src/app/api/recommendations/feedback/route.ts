import { getServerSession } from "next-auth";

import { authOptions } from "@/server/auth/config";
import { fail, handleApiError, ok } from "@/server/http";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);
    const body = await request.json();
    return ok({ recorded: true, userId: session.user.id, ...body });
  } catch (error) {
    return handleApiError(error);
  }
}
