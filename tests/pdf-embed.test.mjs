import assert from 'node:assert/strict';
import test from 'node:test';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import { pdfEmbedRemarkPlugin } from '../src/remark/pdf-embed.ts';
import { youtubeEmbedRemarkPlugin } from '../src/remark/youtube-embed.ts';
import { localeContentRemarkPlugin } from '../src/remark/locale-content.ts';

const processor = await createMarkdownProcessor({ remarkPlugins: [pdfEmbedRemarkPlugin, youtubeEmbedRemarkPlugin, localeContentRemarkPlugin] });
const render = async (markdown) => (await processor.render(markdown)).code;

test('renders a lazy native viewer and an always-available original-file link', async () => {
  const html = await render(':::pdf /pdf/example.pdf "企画書"');
  assert.match(html, /class="pdf-embed__viewer" src="\/pdf\/example.pdf" title="企画書" loading="lazy"/);
  assert.match(html, /href="\/pdf\/example.pdf" target="_blank" rel="noopener noreferrer"/);
});

test('supports spaces, Unicode, underscores, URL fragments and GFM autolink parsing', async () => {
  const html = await render(':::pdf "/documents/企画 書_v1_test.pdf#page=2" "A & B <draft>"');
  assert.match(html, /%20/);
  assert.match(html, /_v1_test.pdf#page=2/);
  // The HTML serializer may normalize entity spelling inside attributes.
  assert.match(html, /title="A (?:&amp;|&#x26;) B (?:&lt;|<)draft(?:&gt;|>)"/);
  const remote = await render(':::pdf https://example.com/my_file_test.PDF?version=1&view=2');
  assert.match(remote, /src="https:\/\/example.com\/my_file_test.PDF\?version=1(?:&amp;|&#x26;)view=2"/);
});

test('keeps viewers inside their respective locale blocks without breaking YouTube', async () => {
  const html = await render(':::locale ja\n\n:::pdf /documents/ja.pdf "日本語"\n\n:::youtube X6bIqbZec4c\n\n:::\n\n:::locale ko\n\n:::pdf /documents/ko.pdf "한국어"\n\n:::');
  assert.match(html, /data-content-locale="ja"[\s\S]*src="\/documents\/ja.pdf"[\s\S]*youtube-nocookie[\s\S]*<\/div>[\s\S]*data-content-locale="ko"[\s\S]*src="\/documents\/ko.pdf"/);
  assert.equal((html.match(/class="pdf-embed__viewer"/g) ?? []).length, 2);
});

test('leaves code examples and ordinary prose untouched', async () => {
  const html = await render('```markdown\n:::pdf /documents/example.pdf\n```\n\nUse :::pdf in your post.');
  assert.doesNotMatch(html, /class="pdf-embed"/);
});

test('rejects malformed directives, unsafe schemes, credentials and non-PDF files', async (context) => {
  context.mock.method(console, 'error', () => {});
  for (const markdown of [
    ':::pdf',
    ':::pdf /documents/example.pdf unquoted title',
    ':::pdf javascript:alert(1)',
    ':::pdf //example.com/file.pdf',
    ':::pdf /\\example.com/file.pdf',
    ':::pdf https://user:password@example.com/file.pdf',
    ':::pdf /documents/file.html',
  ]) {
    await assert.rejects(() => render(markdown), /:::pdf/);
  }
});
