import { getServerSession } from "next-auth";

import { authOptions } from "@/server/auth/config";
import { prisma } from "@/server/db/prisma";
import { created, fail, handleApiError } from "@/server/http";

type Context = { params: Promise<{ id: string }> };

export async function POST(request: Request, context: Context) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);
    const { id } = await context.params;
    const body = (await request.json()) as { reason?: "SPAM" | "ABUSE" | "SPOILER" | "HATE" | "MISINFORMATION" | "OTHER"; details?: string };
    const report = await prisma.reviewReport.create({
      data: {
        reviewId: id,
        reporterUserId: session.user.id,
        reason: body.reason ?? "OTHER",
        details: body.details ?? null
      }
    });
    return created(report);
  } catch (error) {
    return handleApiError(error);
  }
}
