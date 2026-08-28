import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import { legacyJekyllRemarkPlugin } from './src/remark/legacy-jekyll';
import { localeContentRemarkPlugin } from './src/remark/locale-content';
import { youtubeEmbedRemarkPlugin } from './src/remark/youtube-embed';

const legacyRedirectPaths = new Set([
  '/posts/AD-00/',
  '/posts/VX-00/',
  '/posts/KR-01/',
  '/posts/KR-02/',
]);

export default defineConfig({
  site: 'https://yunarang-dev.github.io',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      // Legacy URLs remain as client-friendly redirect pages, but their
      // canonical targets are the pages search engines should index.
      filter: (page) => !legacyRedirectPaths.has(new URL(page).pathname),
    }),
  ],
  build: {
    format: 'directory',
  },
  image: {
    layout: 'constrained',
    responsiveStyles: true,
  },
  markdown: {
    processor: unified({ remarkPlugins: [youtubeEmbedRemarkPlugin, legacyJekyllRemarkPlugin, localeContentRemarkPlugin] }),
  },
});
