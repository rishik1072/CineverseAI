import { fail, ok } from "@/server/http";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");
  if (!process.env.CRON_SECRET || token !== process.env.CRON_SECRET) return fail("Unauthorized", 401);

  return ok({ status: "scheduled", executedAt: new Date().toISOString() });
}
