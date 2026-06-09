CREATE EXTENSION IF NOT EXISTS pg_trgm;

ALTER TABLE "Rating"
ADD CONSTRAINT rating_score_range CHECK ("score" >= 0 AND "score" <= 10);

ALTER TABLE "MovieComparison"
ADD CONSTRAINT movie_comparison_distinct_movies CHECK ("movieAId" <> "movieBId");

CREATE UNIQUE INDEX IF NOT EXISTS one_default_watchlist_per_user
ON "Watchlist" ("userId")
WHERE "isDefault" = true;

CREATE INDEX IF NOT EXISTS movie_title_trgm_idx
ON "Movie"
USING gin ("title" gin_trgm_ops);
