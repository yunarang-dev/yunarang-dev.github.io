interface MarkdownNode {
  type: string;
  value?: string;
  children?: MarkdownNode[];
}

const youtubeDirectivePattern = /^\s*:::youtube(?:\s+(.+?))?\s*$/;
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

function transformChildren(nodes: MarkdownNode[]) {
  const output: MarkdownNode[] = [];

  for (const node of nodes) {
    const value = paragraphText(node)?.trim();
    const directive = value?.match(youtubeDirectivePattern);

    if (directive) {
      const videoId = directive[1]?.trim() ?? '';

      if (!youtubeIdPattern.test(videoId)) {
        throw new Error('A :::youtube directive requires an 11-character YouTube video ID, for example: :::youtube ZCAR2RRWAXE');
      }

      output.push({ type: 'html', value: youtubeEmbedHtml(videoId) });
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
 * Use: :::youtube ZCAR2RRWAXE
 */
export function youtubeEmbedRemarkPlugin() {
  return (tree: MarkdownNode) => {
    if (tree.children) {
      tree.children = transformChildren(tree.children);
    }
  };
}
