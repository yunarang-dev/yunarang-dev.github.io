export interface LocalizedTextValue {
  ja: string;
  ko: string;
}

export type LocalizedMarkupToken =
  | { type: 'text'; value: string }
  | { type: 'ruby'; base: string; reading: string }
  | { type: 'break' };

const supportedMarkupPattern = /<ruby>([^<>]+)<rt>([^<>]+)<\/rt><\/ruby>|<br\s*\/?>/gi;

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');

/**
 * Parses only the small markup subset supported by localized strings.
 * Any other authored HTML remains plain text and is escaped by the renderer.
 */
export function parseLocalizedMarkup(value: string): LocalizedMarkupToken[] {
  supportedMarkupPattern.lastIndex = 0;
  let textStart = 0;
  let match: RegExpExecArray | null;
  const tokens: LocalizedMarkupToken[] = [];

  while ((match = supportedMarkupPattern.exec(value)) !== null) {
    if (match.index > textStart) {
      tokens.push({ type: 'text', value: value.slice(textStart, match.index) });
    }

    if (match[1] !== undefined && match[2] !== undefined) {
      tokens.push({ type: 'ruby', base: match[1], reading: match[2] });
    } else {
      tokens.push({ type: 'break' });
    }

    textStart = match.index + match[0].length;
  }

  if (textStart < value.length) {
    tokens.push({ type: 'text', value: value.slice(textStart) });
  }

  return tokens.length > 0 ? tokens : [{ type: 'text', value }];
}

/**
 * Escapes all authored markup except the site's supported ruby and line-break
 * notation. This keeps both available before client-side locale code runs.
 */
export function renderLocalizedMarkup(value: string) {
  return parseLocalizedMarkup(value)
    .map((token) => {
      if (token.type === 'ruby') {
        return `<ruby>${escapeHtml(token.base)}<rt>${escapeHtml(token.reading)}</rt></ruby>`;
      }
      if (token.type === 'break') return '<br>';
      return escapeHtml(token.value);
    })
    .join('');
}
