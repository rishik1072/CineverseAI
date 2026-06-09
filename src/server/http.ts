import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ ok: true, data }, init);
}

export function created<T>(data: T) {
  return ok(data, { status: 201 });
}

export function fail(message: string, status = 400, details?: unknown) {
  return NextResponse.json({ ok: false, error: { message, details } }, { status });
}

export function handleApiError(error: unknown) {
  if (error instanceof ZodError) return fail("Invalid request", 422, error.flatten());
  if (error instanceof Error) return fail(error.message, 500);
  return fail("Unexpected server error", 500);
}
