import { hashPassword } from "@/server/auth/password";
import { prisma } from "@/server/db/prisma";
import { created, fail, handleApiError } from "@/server/http";
import { getClientIp, rateLimit } from "@/server/security/rate-limit";
import { registerSchema } from "@/server/validators/schemas";
import { slugify } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limit = rateLimit(`register:${ip}`, 3, 60 * 60 * 1000);
    if (!limit.allowed) return fail("Too many registration attempts", 429);

    const body = await request.json();
    const parsed = registerSchema.parse(body);
    const email = parsed.email.toLowerCase();

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return fail("An account with this email already exists", 409);

    const passwordHash = await hashPassword(parsed.password);
    const username = parsed.username ? slugify(parsed.username).replaceAll("-", "_") : slugify(parsed.name).replaceAll("-", "_");

    const user = await prisma.user.create({
      data: {
        email,
        name: parsed.name,
        username,
        passwordHash,
        preferences: { create: {} },
        watchlists: { create: { title: "Watchlist", slug: "watchlist", isDefault: true } }
      },
      select: { id: true, email: true, name: true, username: true }
    });

    return created(user);
  } catch (error) {
    return handleApiError(error);
  }
}
