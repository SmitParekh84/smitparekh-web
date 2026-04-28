/**
 * Markdown sanitization helpers.
 *
 * CommonMark requires that the closing delimiter of strong/emphasis runs
 * (`**`, `__`, `*`, `_`) is NOT preceded by whitespace, and the opening
 * delimiter is NOT followed by whitespace. When CMS- or AI-authored
 * content contains patterns like `**Heading: **` or `** Heading**`, the
 * markdown parser refuses to treat them as emphasis and renders the
 * asterisks/underscores literally on the page.
 *
 * `normalizeMarkdown` rewrites those near-miss runs by trimming the inner
 * whitespace so the parser can recognize them as emphasis again.
 */

const STRONG_DOUBLE_STAR = /\*\*[ \t]*([^\s*][^*]*?[^\s*]|[^\s*])[ \t]*\*\*/g;
const STRONG_DOUBLE_UNDERSCORE = /__[ \t]*([^\s_][^_]*?[^\s_]|[^\s_])[ \t]*__/g;

export function normalizeMarkdown(input: string): string {
  if (!input) return input;
  return input
    .replace(STRONG_DOUBLE_STAR, (_match, inner: string) => `**${inner}**`)
    .replace(
      STRONG_DOUBLE_UNDERSCORE,
      (_match, inner: string) => `__${inner}__`
    );
}
