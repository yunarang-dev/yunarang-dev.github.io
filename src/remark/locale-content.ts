type Locale = 'ja' | 'ko';

interface MarkdownNode {
  type: string;
  value?: string;
  children?: MarkdownNode[];
}

interface MarkdownRoot extends MarkdownNode {
  children: MarkdownNode[];
}

const localeStartPattern = /^:::locale\s+(ja|ko)\s*$/;
const localeEndPattern = /^:::\s*$/;

function paragraphText(node: MarkdownNode) {
  if (node.type !== 'paragraph' || !node.children?.length) {
    return undefined;
  }

  if (node.children.some((child) => child.type !== 'text')) {
    return undefined;
  }

  return node.children.map((child) => child.value ?? '').join('');
}

function startLocale(node: MarkdownNode): Locale | undefined {
  const match = paragraphText(node)?.match(localeStartPattern);
  return match?.[1] as Locale | undefined;
}

function isLocaleEnd(node: MarkdownNode) {
  return localeEndPattern.test(paragraphText(node) ?? '');
}

/**
 * Enables two complete Markdown bodies in a single document:
 *
 * :::locale ja
 * Japanese Markdown
 * :::
 *
 * :::locale ko
 * Korean Markdown
 * :::
 *
 * Markers must appear as top-level paragraphs, with blank lines around them.
 */
export function localeContentRemarkPlugin() {
  return (tree: MarkdownRoot) => {
    let activeLocale: Locale | undefined;
    const output: MarkdownNode[] = [];

    for (const node of tree.children) {
      const locale = startLocale(node);

      if (locale) {
        if (activeLocale) {
          throw new Error('A :::locale block cannot be nested inside another locale block.');
        }

        activeLocale = locale;
        output.push({ type: 'html', value: `<div lang="${locale}" data-content-locale="${locale}">` });
        continue;
      }

      if (isLocaleEnd(node)) {
        if (!activeLocale) {
          throw new Error('Found ::: without an opening :::locale ja or :::locale ko marker.');
        }

        output.push({ type: 'html', value: '</div>' });
        activeLocale = undefined;
        continue;
      }

      output.push(node);
    }

    if (activeLocale) {
      throw new Error(`The :::locale ${activeLocale} block is missing its closing ::: marker.`);
    }

    tree.children = output;
  };
}
