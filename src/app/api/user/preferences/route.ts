import { getServerSession } from "next-auth";

import { authOptions } from "@/server/auth/config";
import { prisma } from "@/server/db/prisma";
import { fail, handleApiError, ok } from "@/server/http";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);
    const preferences = await prisma.userPreferences.upsert({
      where: { userId: session.user.id },
      create: { userId: session.user.id },
      update: {}
    });
    return ok(preferences);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);
    const body = await request.json();
    const preferences = await prisma.userPreferences.upsert({
      where: { userId: session.user.id },
      create: { userId: session.user.id, ...body },
      update: body
    });
    return ok(preferences);
  } catch (error) {
    return handleApiError(error);
  }
}
