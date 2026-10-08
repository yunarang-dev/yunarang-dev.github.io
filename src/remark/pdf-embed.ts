interface MarkdownNode {
  type: string;
  children?: MarkdownNode[];
  value?: string;
  position?: { start: { offset?: number }; end: { offset?: number } };
}

const directivePattern = /^:::pdf[\t ]+(?:"([^"\r\n]+)"|(\S+))(?:[\t ]+"([^"\r\n]+)")?[\t ]*$/;

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!);
}

function pdfUrl(source: string) {
  // Keep embeds restricted to public site files or explicit HTTP(S) URLs.
  if (/[\u0000-\u001f\u007f\\]/.test(source) || !/^(?:\/(?!\/)|https?:\/\/)/i.test(source)) {
    throw new Error('A :::pdf URL must be a site-root path or an HTTP(S) URL.');
  }

  const url = new URL(source, 'https://pdf.invalid');
  if (!/\.pdf$/i.test(url.pathname) || url.username || url.password) {
    throw new Error('A :::pdf URL must point to a .pdf file and must not contain credentials.');
  }

  if (!source.startsWith('/')) return url.href;

  // macOS can provide decomposed file names, while Git tracks NFC names.
  // Decode each segment separately so encoded separators remain encoded.
  try {
    url.pathname = url.pathname.split('/').map((segment) => encodeURIComponent(decodeURIComponent(segment).normalize('NFC'))).join('/');
  } catch {
    throw new Error('A :::pdf site-root path contains invalid URL encoding.');
  }

  return `${url.pathname}${url.search}${url.hash}`;
}

function transformChildren(nodes: MarkdownNode[], source: string): MarkdownNode[] {
  return nodes.map((node) => {
    const start = node.position?.start.offset;
    const end = node.position?.end.offset;
    const raw = node.type === 'paragraph' && start !== undefined && end !== undefined
      ? source.slice(start, end).trim()
      : undefined;

    if (raw && /^:::pdf(?:\s|$)/.test(raw)) {
      const directive = raw.match(directivePattern);
      if (!directive) {
        throw new Error('Write :::pdf /pdf/file.pdf "Optional title" on its own line, with blank lines before and after.');
      }

      const url = escapeHtml(pdfUrl(directive[1] ?? directive[2]!));
      const title = escapeHtml(directive[3] ?? 'PDF');
      return {
        type: 'html',
        value: [
          '<figure class="pdf-embed">',
          `  <figcaption class="pdf-embed__caption"><span>${title}</span><a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="PDF: ${title}">PDF <span aria-hidden="true">↗</span></a></figcaption>`,
          `  <iframe class="pdf-embed__viewer" src="${url}" title="${title}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>`,
          '</figure>',
        ].join('\n'),
      };
    }

    if (node.children) node.children = transformChildren(node.children, source);
    return node;
  });
}

/** Native PDF embed in ordinary Markdown: :::pdf /pdf/file.pdf "Title" */
export function pdfEmbedRemarkPlugin() {
  return (tree: MarkdownNode, file: { value: unknown }) => {
    if (tree.children) tree.children = transformChildren(tree.children, String(file.value));
  };
}
