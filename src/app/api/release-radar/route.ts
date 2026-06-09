import { getServerSession } from "next-auth";

import { authOptions } from "@/server/auth/config";
import { fail, handleApiError, ok } from "@/server/http";
import { getUpcomingMovies } from "@/server/services/movie-service";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return fail("Unauthorized", 401);
    
    const upcoming = await getUpcomingMovies();
    return ok({ followed: ["Denis Villeneuve", "Dune Franchise"], upcoming: upcoming.slice(0, 3) });
  } catch (error) {
    return handleApiError(error);
  }
}
