import { getServerSession } from "next-auth";

import { authOptions } from "@/server/auth/config";
import { prisma } from "@/server/db/prisma";
import { fail, handleApiError, ok } from "@/server/http";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: Context) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "ADMIN") return fail("Forbidden", 403);
    const { id } = await context.params;
    const body = (await request.json()) as { role?: "USER" | "MODERATOR" | "ADMIN" };
    if (!body.role) return fail("Role is required", 422);
    const user = await prisma.user.update({ where: { id }, data: { role: body.role } });
    return ok({ id: user.id, role: user.role });
  } catch (error) {
    return handleApiError(error);
  }
}
