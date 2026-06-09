import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(8).max(128)
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(2).max(80),
  username: z
    .string()
    .min(3)
    .max(32)
    .regex(/^[a-zA-Z0-9_]+$/)
    .optional()
});

export const searchSchema = z.object({
  q: z.string().trim().max(120).optional().default(""),
  genre: z.string().optional(),
  language: z.string().optional(),
  country: z.string().optional(),
  yearFrom: z.coerce.number().int().min(1880).max(2100).optional(),
  yearTo: z.coerce.number().int().min(1880).max(2100).optional(),
  runtimeMin: z.coerce.number().int().min(0).max(400).optional(),
  runtimeMax: z.coerce.number().int().min(0).max(400).optional(),
  ratingMin: z.coerce.number().min(0).max(10).optional(),
  sort: z.enum(["popularity", "rating", "release_date", "title"]).optional().default("popularity"),
  page: z.coerce.number().int().positive().optional().default(1)
});

export const moodSearchSchema = z.object({
  prompt: z.string().min(3).max(500)
});

export const ratingSchema = z.object({
  tmdbId: z.number().int().positive(),
  score: z.number().min(0).max(10)
});

export const reviewSchema = z.object({
  tmdbId: z.number().int().positive(),
  title: z.string().max(120).optional(),
  content: z.string().min(10).max(5000),
  ratingSnapshot: z.number().min(0).max(10).optional(),
  containsSpoilers: z.boolean().optional().default(false),
  visibility: z.enum(["PRIVATE", "PUBLIC", "UNLISTED", "FOLLOWERS_ONLY"]).optional().default("PUBLIC")
});

export const watchlistItemSchema = z.object({
  tmdbId: z.number().int().positive(),
  status: z.enum(["PLANNED", "WATCHING", "COMPLETED", "DROPPED", "ON_HOLD"]).optional().default("PLANNED"),
  notes: z.string().max(1000).optional()
});

export const compareSchema = z.object({
  movieA: z.number().int().positive(),
  movieB: z.number().int().positive()
});
