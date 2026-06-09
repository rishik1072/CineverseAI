import { getServerSession } from "next-auth";

import { authOptions } from "@/server/auth/config";
import { canModerate } from "@/server/auth/permissions";
import { prisma } from "@/server/db/prisma";
import { fail, handleApiError, ok } from "@/server/http";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!canModerate(session?.user?.role)) return fail("Forbidden", 403);
    const reports = await prisma.reviewReport.findMany({ include: { review: true, reporter: { select: { id: true, name: true, email: true } } }, orderBy: { createdAt: "desc" } });
    return ok(reports);
  } catch (error) {
    return handleApiError(error);
  }
}
