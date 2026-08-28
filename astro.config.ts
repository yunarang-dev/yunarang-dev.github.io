import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import { localeContentRemarkPlugin } from './src/remark/locale-content';
import { youtubeEmbedRemarkPlugin } from './src/remark/youtube-embed';

const redirectPaths = new Set([
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
      // Redirect pages preserve shared URLs; only their canonical targets
      // should appear in the sitemap.
      filter: (page) => !redirectPaths.has(new URL(page).pathname),
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
    processor: unified({ remarkPlugins: [youtubeEmbedRemarkPlugin, localeContentRemarkPlugin] }),
  },
});
