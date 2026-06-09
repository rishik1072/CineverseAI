import { getServerSession } from "next-auth";
import type { Prisma } from "@prisma/client";

import { authOptions } from "@/server/auth/config";
import { prisma } from "@/server/db/prisma";
import { fail, handleApiError, ok } from "@/server/http";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        image: true,
        role: true,
        bio: true,
        location: true,
        website: true,
        createdAt: true,
        preferences: true,
        _count: { select: { favorites: true, ratings: true, reviews: true, watchlistItems: true } }
      }
    });

    return ok(user);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);

    const body = (await request.json()) as { name?: string; bio?: string; location?: string; website?: string };
    const data: Prisma.UserUpdateInput = {};
    if (body.name !== undefined) data.name = body.name;
    if (body.bio !== undefined) data.bio = body.bio;
    if (body.location !== undefined) data.location = body.location;
    if (body.website !== undefined) data.website = body.website;

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data,
      select: { id: true, name: true, bio: true, location: true, website: true }
    });

    return ok(user);
  } catch (error) {
    return handleApiError(error);
  }
}
