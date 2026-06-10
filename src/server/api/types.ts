/**
 * Centralized type definitions for API routes.
 * Ensures consistency and type safety across all endpoints.
 */

/**
 * Standard API context for dynamic routes with params.
 * Used with Promise-based params in Next.js 15+ App Router.
 */
export interface ApiContext<P extends Record<string, string>> {
  params: Promise<P>;
}

/**
 * API response envelope for all endpoints.
 * Consistent structure across the application.
 */
export interface ApiResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: {
    message: string;
    details?: unknown;
  };
  timestamp: string;
}

/**
 * User session from NextAuth.
 */
export interface ApiSession {
  user: {
    id: string;
    email: string;
    name: string | null;
    image: string | null;
    role: string;
    username: string | null;
  };
}

/**
 * Common route parameter types.
 */
export interface StringIdParams {
  id: string;
}

export interface StringIdParams2 {
  id: string;
  id2: string;
}

export interface TmdbIdParams {
  tmdbId: string;
}

export interface MovieIdParams {
  movieId: string;
}

export interface PartyIdParams {
  partyId: string;
}

export interface ItemIdParams {
  id: string;
  itemId: string;
}

/**
 * Type-safe context creation.
 */
export function createApiContext<P extends Record<string, string>>(
  params: Promise<P>
): ApiContext<P> {
  return { params };
}
