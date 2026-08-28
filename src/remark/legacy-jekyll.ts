interface MarkdownNode {
  type: string;
  value?: string;
  url?: string;
  children?: MarkdownNode[];
}

const baseUrlPattern = /\{\{\s*site\.baseurl\s*\}\}/g;
const kramdownAttributePattern = /\s*\{:\s*[^}]+\}/g;
const standaloneKramdownAttributePattern = /^\s*\{:\s*[^}]+\}\s*$/;
const jekyllIncludePattern = /^\s*\{%\s*include\s+[^%]+%\}\s*$/;

function cleanLegacyValue(value: string) {
  return value.replace(baseUrlPattern, '').replace(kramdownAttributePattern, '');
}

function isUnsupportedJekyllNode(node: MarkdownNode) {
  if (typeof node.value !== 'string') return false;
  const value = node.value.trim();
  return standaloneKramdownAttributePattern.test(value) || jekyllIncludePattern.test(value);
}

function paragraphText(node: MarkdownNode) {
  if (node.type !== 'paragraph' || !node.children?.length || node.children.some((child) => child.type !== 'text')) {
    return undefined;
  }

  return node.children.map((child) => child.value ?? '').join('');
}

function transformChildren(nodes: MarkdownNode[]) {
  const output: MarkdownNode[] = [];

  for (const node of nodes) {
    if (typeof node.url === 'string') {
      node.url = node.url.replace(baseUrlPattern, '');
    }

    if ((node.type === 'text' || node.type === 'html') && typeof node.value === 'string') {
      node.value = cleanLegacyValue(node.value);
    }

    if (node.children) {
      node.children = transformChildren(node.children);
    }

    // Kramdown styling attributes and Liquid includes depend on the old Jekyll
    // runtime. Keep their authored Markdown untouched, but do not expose the
    // unsupported directives as visible prose in Astro.
    if (isUnsupportedJekyllNode(node) || paragraphText(node)?.trim() === '' || (node.type === 'paragraph' && !node.children?.length)) {
      continue;
    }

    output.push(node);
  }

  return output;
}

/**
 * Renders legacy Jekyll Markdown without changing its source body. It keeps
 * existing URLs and content, while removing only theme-specific syntax.
 */
export function legacyJekyllRemarkPlugin() {
  return (tree: MarkdownNode) => {
    if (tree.children) {
      tree.children = transformChildren(tree.children);
    }
  };
}
