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
 *
 * Whitespace class `[^\S\n]` = any whitespace except newline. This catches
 * regular space, tab, non-breaking space (U+00A0), zero-width spaces, and
 * other Unicode invisibles that often sneak in from pasted content, while
 * still keeping the match scoped to a single logical run.
 */

// Strong: ** ... **  and  __ ... __
const STRONG_DOUBLE_STAR = /\*\*[^\S\n]*([^\s*][^*]*?[^\s*]|[^\s*])[^\S\n]*\*\*/g;
const STRONG_DOUBLE_UNDERSCORE = /__[^\S\n]*([^\s_][^_]*?[^\s_]|[^\s_])[^\S\n]*__/g;

// Emphasis: single * ... * (avoid matching ** by requiring non-* on either side)
const EMPHASIS_SINGLE_STAR = /(^|[^*])\*[^\S\n]+([^\s*][^*\n]*?[^\s*]|[^\s*])[^\S\n]*\*(?!\*)/g;
const EMPHASIS_SINGLE_STAR_TRAIL = /(^|[^*])\*([^\s*][^*\n]*?[^\s*]|[^\s*])[^\S\n]+\*(?!\*)/g;

export function normalizeMarkdown(input: string): string {
  if (!input) return input;
  return input
    .replace(STRONG_DOUBLE_STAR, (_match, inner: string) => `**${inner}**`)
    .replace(
      STRONG_DOUBLE_UNDERSCORE,
      (_match, inner: string) => `__${inner}__`
    )
    .replace(
      EMPHASIS_SINGLE_STAR,
      (_match, lead: string, inner: string) => `${lead}*${inner}*`
    )
    .replace(
      EMPHASIS_SINGLE_STAR_TRAIL,
      (_match, lead: string, inner: string) => `${lead}*${inner}*`
    );
}
