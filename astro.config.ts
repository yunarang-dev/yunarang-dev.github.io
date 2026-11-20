import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import { localeContentRemarkPlugin } from './src/remark/locale-content';
import { youtubeEmbedRemarkPlugin } from './src/remark/youtube-embed';
import { pdfEmbedRemarkPlugin } from './src/remark/pdf-embed';

const vxRedirects = {
  ...Object.fromEntries(
    Array.from({ length: 12 }, (_, index) => {
      const number = String(index).padStart(2, '0');
      return [`/posts/VX-${number}/`, `/posts/LU-${number}/`];
    }),
  ),
  '/projects/project-vx/': '/posts/LU-00/',
  '/projects/project-vx/wiki/': '/projects/lumi/wiki/',
  '/projects/project-vx/wiki/overview/': '/projects/lumi/wiki/overview/',
  '/projects/project-vx/wiki/virtual-developer/': '/projects/lumi/wiki/virtual-developer/',
};

const redirectPaths = new Set([
  '/posts/AD-00/',
  '/posts/KR-01/',
  '/posts/KR-02/',
  ...Object.keys(vxRedirects),
]);

export default defineConfig({
  site: 'https://yunarang-dev.github.io',
  output: 'static',
  trailingSlash: 'always',
  redirects: vxRedirects,
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
    processor: unified({ remarkPlugins: [pdfEmbedRemarkPlugin, youtubeEmbedRemarkPlugin, localeContentRemarkPlugin] }),
  },
});
