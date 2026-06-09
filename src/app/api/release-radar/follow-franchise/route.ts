import { getServerSession } from "next-auth";

import { authOptions } from "@/server/auth/config";
import { fail, handleApiError, ok } from "@/server/http";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);
    return ok({ followed: true, ...(await request.json()) });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);
    return ok({ followed: false, ...(await request.json()) });
  } catch (error) {
    return handleApiError(error);
  }
}
