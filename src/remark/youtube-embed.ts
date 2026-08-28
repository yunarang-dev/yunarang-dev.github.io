interface MarkdownNode {
  type: string;
  value?: string;
  children?: MarkdownNode[];
}

const youtubeDirectivePattern = /^\s*:::youtube(?:\s+(.+?))?\s*$/;
// The Markdown parser converts straight quotes in legacy Liquid snippets to
// typographic quotes before Remark plugins run, so accept both forms here.
const legacyYoutubeIncludePattern = /^\s*\{%\s*include\s+embed\/youtube\.html\s+id=(?:'|"|‘|“)([A-Za-z0-9_-]{11})(?:'|"|’|”)\s*%\}\s*$/;
const legacyYoutubeIncludeLinePattern = /(?:^|\n)[\t ]*\{%\s*include\s+embed\/youtube\.html\s+id=(?:'|"|‘|“)([A-Za-z0-9_-]{11})(?:'|"|’|”)\s*%\}[\t ]*(?=\n|$)/g;
const youtubeIdPattern = /^[A-Za-z0-9_-]{11}$/;

function paragraphText(node: MarkdownNode) {
  if (node.type !== 'paragraph' || !node.children?.length || node.children.some((child) => child.type !== 'text')) {
    return undefined;
  }

  return node.children.map((child) => child.value ?? '').join('');
}

function youtubeEmbedHtml(videoId: string) {
  return [
    '<div class="youtube-embed">',
    '  <div class="youtube-embed__frame">',
    `    <iframe src="https://www.youtube-nocookie.com/embed/${videoId}" title="YouTube video player" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    '  </div>',
    '</div>',
  ].join('\n');
}

function splitLegacyYoutubeIncludes(node: MarkdownNode) {
  const value = paragraphText(node);

  if (!value) return undefined;

  const output: MarkdownNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  legacyYoutubeIncludeLinePattern.lastIndex = 0;
  while ((match = legacyYoutubeIncludeLinePattern.exec(value)) !== null) {
    const prose = value.slice(cursor, match.index).trim();
    if (prose) {
      output.push({ type: 'paragraph', children: [{ type: 'text', value: prose }] });
    }

    output.push({ type: 'html', value: youtubeEmbedHtml(match[1]) });
    cursor = match.index + match[0].length;
  }

  if (output.length === 0) return undefined;

  const prose = value.slice(cursor).trim();
  if (prose) {
    output.push({ type: 'paragraph', children: [{ type: 'text', value: prose }] });
  }

  return output;
}

function transformChildren(nodes: MarkdownNode[]) {
  const output: MarkdownNode[] = [];

  for (const node of nodes) {
    const splitLegacyIncludes = splitLegacyYoutubeIncludes(node);
    if (splitLegacyIncludes) {
      output.push(...splitLegacyIncludes);
      continue;
    }

    const value = paragraphText(node)?.trim();
    const directive = value?.match(youtubeDirectivePattern);
    const legacyInclude = value?.match(legacyYoutubeIncludePattern);

    if (directive) {
      const videoId = directive[1]?.trim() ?? '';

      if (!youtubeIdPattern.test(videoId)) {
        throw new Error('A :::youtube directive requires an 11-character YouTube video ID, for example: :::youtube ZCAR2RRWAXE');
      }

      output.push({ type: 'html', value: youtubeEmbedHtml(videoId) });
      continue;
    }

    if (legacyInclude) {
      output.push({ type: 'html', value: youtubeEmbedHtml(legacyInclude[1]) });
      continue;
    }

    if (node.children) {
      node.children = transformChildren(node.children);
    }

    output.push(node);
  }

  return output;
}

/**
 * Lets ordinary Markdown files render responsive YouTube videos without MDX.
 *
 * New posts use: :::youtube ZCAR2RRWAXE
 * Existing valid Jekyll YouTube includes are rendered with the same markup.
 */
export function youtubeEmbedRemarkPlugin() {
  return (tree: MarkdownNode) => {
    if (tree.children) {
      tree.children = transformChildren(tree.children);
    }
  };
}
