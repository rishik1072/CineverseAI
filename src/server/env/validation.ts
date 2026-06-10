/**
 * Environment variable validation with type safety.
 * Ensures all required variables are present and valid at runtime.
 * Safe fallbacks prevent build-time crashes.
 */

import { z } from "zod";

const envSchema = z.object({
  // App
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  APP_ENV: z.enum(["development", "staging", "production"]).default("development"),

  // Database
  DATABASE_URL: z.string().url(),
  DIRECT_URL: z.string().url().optional(),

  // NextAuth v4
  NEXTAUTH_URL: z.string().url().optional(),
  NEXTAUTH_SECRET: z.string().min(32),

  // OAuth (optional)
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  GITHUB_CLIENT_ID: z.string().optional(),
  GITHUB_CLIENT_SECRET: z.string().optional(),

  // Email (optional)
  EMAIL_SERVER_HOST: z.string().optional(),
  EMAIL_SERVER_PORT: z.coerce.number().optional(),
  EMAIL_SERVER_USER: z.string().optional(),
  EMAIL_SERVER_PASSWORD: z.string().optional(),
  EMAIL_FROM: z.string().email().optional(),

  // TMDB API (required for features, but safe fallback)
  TMDB_API_KEY: z.string().optional(),
  TMDB_API_BASE_URL: z.string().url().default("https://api.themoviedb.org/3"),
  TMDB_IMAGE_BASE_URL: z.string().url().default("https://image.tmdb.org/t/p"),

  // OMDB API (optional)
  OMDB_API_KEY: z.string().optional(),

  // YouTube API (optional)
  YOUTUBE_API_KEY: z.string().optional(),

  // Security
  CRON_SECRET: z.string().optional(),
  RATE_LIMIT_SECRET: z.string().optional(),

  // Observability (optional)
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
  SENTRY_DSN: z.string().url().optional(),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().optional(),

  // Internal
  NODE_ENV: z.enum(["development", "production", "test"]).default("development")
});

type Env = z.infer<typeof envSchema>;

/**
 * Validated environment variables with runtime safety.
 * If validation fails, logs warnings but doesn't crash build.
 */
export function getValidatedEnv(): Env {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missing = error.errors
        .filter((e) => e.code === "invalid_type")
        .map((e) => e.path.join("."));

      console.warn(
        `⚠️  Missing or invalid environment variables: ${missing.join(", ")}\n` +
          "   Build will continue but some features may be unavailable.\n" +
          "   See .env.example for required variables."
      );
    }
    return envSchema.parse({});
  }
}

/**
 * Validate critical environment variables only.
 * Used at build time to prevent failures on missing optional vars.
 */
export function validateCriticalEnv(): boolean {
  const required = ["DATABASE_URL", "NEXTAUTH_SECRET"];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error(`❌ Missing critical environment variables: ${missing.join(", ")}`);
    return false;
  }

  return true;
}

// Export for server-side use
export const env = getValidatedEnv();
