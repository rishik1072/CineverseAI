import { getServerSession } from "next-auth";

import { authOptions } from "@/server/auth/config";
import { prisma } from "@/server/db/prisma";
import { fail, handleApiError, ok } from "@/server/http";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "ADMIN") return fail("Forbidden", 403);
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, username: true, role: true, createdAt: true, _count: { select: { reviews: true, ratings: true } } },
      orderBy: { createdAt: "desc" },
      take: 100
    });
    return ok(users);
  } catch (error) {
    return handleApiError(error);
  }
}
