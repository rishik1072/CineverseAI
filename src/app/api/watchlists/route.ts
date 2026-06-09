import { getServerSession } from "next-auth";

import { authOptions } from "@/server/auth/config";
import { prisma } from "@/server/db/prisma";
import { created, fail, handleApiError, ok } from "@/server/http";
import { slugify } from "@/lib/utils";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);
    const watchlists = await prisma.watchlist.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: "desc" },
      include: { _count: { select: { items: true, likes: true } } }
    });
    return ok(watchlists);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);
    const body = (await request.json()) as { title: string; description?: string; visibility?: "PRIVATE" | "PUBLIC" | "UNLISTED" };
    const watchlist = await prisma.watchlist.create({
      data: {
        userId: session.user.id,
        title: body.title,
        slug: slugify(body.title),
        description: body.description ?? null,
        visibility: body.visibility ?? "PRIVATE"
      }
    });
    return created(watchlist);
  } catch (error) {
    return handleApiError(error);
  }
}
