import { getServerSession } from "next-auth";
import { nanoid } from "nanoid";

import { authOptions } from "@/server/auth/config";
import { prisma } from "@/server/db/prisma";
import { created, fail, handleApiError } from "@/server/http";

type Context = { params: Promise<{ id: string }> };

export async function POST(request: Request, context: Context) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);
    const { id } = await context.params;
    const body = (await request.json()) as { email?: string; recipientUserId?: string };
    const invite = await prisma.watchPartyInvite.create({
      data: {
        watchPartyId: id,
        senderUserId: session.user.id,
        email: body.email ?? null,
        recipientUserId: body.recipientUserId ?? null,
        token: nanoid(32),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    });
    return created(invite);
  } catch (error) {
    return handleApiError(error);
  }
}
