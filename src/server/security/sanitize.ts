/**
 * Server-safe HTML sanitizer for API routes.
 *
 * This implementation uses only string operations and does not depend on
 * jsdom, DOMPurify, browser CSS, or .next build artifacts.
 */

const HTML_TAG_RE = /<[^>]*>/g;
const HTML_ENTITY_RE = /&[a-z#0-9]+;/gi;

const HTML_ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&nbsp;": " "
};

export function sanitizeText(input: string): string {
  return input
    .replace(HTML_TAG_RE, "")
    .replace(HTML_ENTITY_RE, (entity) => HTML_ENTITIES[entity] ?? entity)
    .trim();
}
