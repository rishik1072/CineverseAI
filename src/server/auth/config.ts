import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/server/db/prisma";
import { loginSchema } from "@/server/validators/schemas";
import { verifyPassword } from "@/server/auth/password";

const providers: NextAuthOptions["providers"] = [];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  );
}

if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  providers.push(
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    })
  );
}

if (process.env.EMAIL_SERVER_HOST && process.env.EMAIL_FROM) {
  providers.push(
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT ?? 587),
        auth:
          process.env.EMAIL_SERVER_USER && process.env.EMAIL_SERVER_PASSWORD
            ? {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD
              }
            : undefined
      },
      from: process.env.EMAIL_FROM
    })
  );
}

providers.push(
  CredentialsProvider({
    name: "Email and password",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
      const parsed = loginSchema.safeParse(credentials);
      if (!parsed.success) return null;

      const user = await prisma.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
      if (!user?.passwordHash) return null;

      const valid = await verifyPassword(user.passwordHash, parsed.data.password);
      if (!valid) return null;

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        role: user.role,
        username: user.username
      };
    }
  })
);

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60
  },
  pages: {
    signIn: "/login",
    error: "/auth-error",
    verifyRequest: "/verify-request"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = "role" in user ? user.role : "USER";
        token.username = "username" in user ? user.username : null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id);
        session.user.role = String(token.role ?? "USER");
        session.user.username = typeof token.username === "string" ? token.username : null;
      }
      return session;
    },
    async signIn({ user }) {
      if (!user.email) return true;
      const existing = await prisma.user.findUnique({ where: { email: user.email } });
      if (existing) {
        await prisma.$transaction([
          prisma.userPreferences.upsert({
            where: { userId: existing.id },
            create: { userId: existing.id },
            update: {}
          }),
          prisma.watchlist.upsert({
            where: { userId_slug: { userId: existing.id, slug: "watchlist" } },
            create: { userId: existing.id, title: "Watchlist", slug: "watchlist", isDefault: true },
            update: {}
          })
        ]);
      }
      return true;
    }
  },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production" ? "__Secure-next-auth.session-token" : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production"
      }
    }
  },
  secret: process.env.NEXTAUTH_SECRET ?? "development-secret-change-me"
};
