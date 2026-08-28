export interface LocalizedTextValue {
  ja: string;
  ko: string;
}

const rubyPattern = /<ruby>([^<>]+)<rt>([^<>]+)<\/rt><\/ruby>/g;

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');

/**
 * Escapes all authored markup except the site's supported ruby notation.
 * This keeps Japanese readings available before client-side locale code runs.
 */
export function renderLocalizedMarkup(value: string) {
  rubyPattern.lastIndex = 0;
  let textStart = 0;
  let match: RegExpExecArray | null;
  let output = '';

  while ((match = rubyPattern.exec(value)) !== null) {
    output += escapeHtml(value.slice(textStart, match.index));
    output += `<ruby>${escapeHtml(match[1])}<rt>${escapeHtml(match[2])}</rt></ruby>`;
    textStart = match.index + match[0].length;
  }

  return output + escapeHtml(value.slice(textStart));
}
