/**
 * API request validation and error handling utilities.
 * Provides type-safe request/response handling for all API routes.
 */

import { ZodSchema, ZodError } from "zod";
import type { NextRequest } from "next/server";

export class ValidationError extends Error {
  constructor(
    public message: string,
    public status: number = 400,
    public details?: unknown
  ) {
    super(message);
    this.name = "ValidationError";
  }
}

export class AuthenticationError extends Error {
  constructor(public message: string = "Unauthorized") {
    super(message);
    this.status = 401;
    this.name = "AuthenticationError";
  }
  status: number;
}

export class AuthorizationError extends Error {
  constructor(public message: string = "Forbidden") {
    super(message);
    this.status = 403;
    this.name = "AuthorizationError";
  }
  status: number;
}

export class NotFoundError extends Error {
  constructor(public message: string = "Not found") {
    super(message);
    this.status = 404;
    this.name = "NotFoundError";
  }
  status: number;
}

export class ConflictError extends Error {
  constructor(public message: string = "Conflict") {
    super(message);
    this.status = 409;
    this.name = "ConflictError";
  }
  status: number;
}

/**
 * Validates request body against a Zod schema.
 * Returns typed result or throws ValidationError.
 */
export async function validateRequest<T>(
  request: NextRequest,
  schema: ZodSchema
): Promise<T> {
  try {
    const body = await request.json();
    return schema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ValidationError(
        "Invalid request body",
        400,
        error.flatten()
      );
    }
    throw new ValidationError("Failed to parse request body", 400);
  }
}

/**
 * Extract and validate URL parameters.
 */
export function validateParams<T>(
  params: Record<string, string | string[]>,
  schema: ZodSchema
): T {
  try {
    return schema.parse(params);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ValidationError(
        "Invalid route parameters",
        400,
        error.flatten()
      );
    }
    throw new ValidationError("Failed to validate parameters", 400);
  }
}

/**
 * Safe JSON response builder.
 */
export function apiResponse<T>(
  data: T,
  status: number = 200
): Response {
  return new Response(
    JSON.stringify({
      ok: true,
      data,
      timestamp: new Date().toISOString()
    }),
    {
      status,
      headers: { "Content-Type": "application/json" }
    }
  );
}

/**
 * Safe error response builder.
 */
export function apiError(
  message: string,
  status: number = 400,
  details?: unknown
): Response {
  return new Response(
    JSON.stringify({
      ok: false,
      error: {
        message,
        ...(process.env.NODE_ENV === "development" && { details })
      },
      timestamp: new Date().toISOString()
    }),
    {
      status,
      headers: { "Content-Type": "application/json" }
    }
  );
}

/**
 * Wraps API route handler with error handling.
 */
export function withErrorHandler(
  handler: (request: Request, context?: unknown) => Promise<Response>
): (request: Request, context?: unknown) => Promise<Response> {
  return async (request: Request, context?: unknown) => {
    try {
      return await handler(request, context);
    } catch (error) {
      // Log only in development
      if (process.env.NODE_ENV === "development") {
        console.error("[API Error]", error);
      }

      if (error instanceof ValidationError) {
        return apiError(error.message, error.status, error.details);
      }

      if (error instanceof AuthenticationError) {
        return apiError(error.message, 401);
      }

      if (error instanceof AuthorizationError) {
        return apiError(error.message, 403);
      }

      if (error instanceof NotFoundError) {
        return apiError(error.message, 404);
      }

      if (error instanceof ConflictError) {
        return apiError(error.message, 409);
      }

      if (error instanceof Error) {
        return apiError(error.message, 500);
      }

      return apiError("Internal server error", 500);
    }
  };
}
