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

function validateYoutubeId(videoId: string) {
  if (!youtubeIdPattern.test(videoId)) {
    throw new Error('A :::youtube directive requires an 11-character YouTube video ID, for example: :::youtube ZCAR2RRWAXE');
  }
}

function trailingYoutubeDirective(node: MarkdownNode) {
  const value = paragraphText(node);
  if (!value) return undefined;

  const lines = value.split(/\r?\n/);
  if (lines.length < 2) return undefined;

  const directive = lines.at(-1)?.match(youtubeDirectivePattern);
  if (!directive) return undefined;

  const videoId = directive[1]?.trim() ?? '';
  validateYoutubeId(videoId);

  return {
    caption: lines.slice(0, -1).join('\n').trimEnd(),
    videoId,
  };
}

function transformChildren(nodes: MarkdownNode[]) {
  const output: MarkdownNode[] = [];

  for (const node of nodes) {
    if (node.type === 'blockquote' && node.children?.length) {
      const lastChild = node.children.at(-1);
      const trailingDirective = lastChild ? trailingYoutubeDirective(lastChild) : undefined;

      if (lastChild && trailingDirective) {
        lastChild.children = [{ type: 'text', value: trailingDirective.caption }];
        node.children = transformChildren(node.children);
        output.push(node, { type: 'html', value: youtubeEmbedHtml(trailingDirective.videoId) });
        continue;
      }
    }

    const value = paragraphText(node)?.trim();
    const directive = value?.match(youtubeDirectivePattern);

    if (directive) {
      const videoId = directive[1]?.trim() ?? '';
      validateYoutubeId(videoId);

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
