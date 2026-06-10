/**
 * Strip all HTML tags and decode common HTML entities from a string.
 *
 * WHY: isomorphic-dompurify@2.x depends on jsdom@28 which reads
 * `lib/jsdom/browser/default-stylesheet.css` from disk via fs.readFileSync.
 * During `next build` on Vercel the baked-in absolute path doesn't exist,
 * causing: ENOENT: no such file or directory, open
 * '/vercel/path0/.next/browser/default-stylesheet.css'
 *
 * Because we always call DOMPurify with { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }
 * (i.e. strip everything), we don't need a DOM at all — a regex tag-stripper
 * is functionally identical and has zero native dependencies.
 */

const HTML_TAG_RE = /<[^>]*>/g;

const HTML_ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&nbsp;": " ",
};

export function sanitizeText(input: string): string {
  return input
    .replace(HTML_TAG_RE, "")
    .replace(/&[a-z#0-9]+;/gi, (entity) => HTML_ENTITIES[entity] ?? entity)
    .trim();
}
