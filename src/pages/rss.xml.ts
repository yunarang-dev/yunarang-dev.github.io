import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

const site = 'https://yunarang-dev.github.io';

export const GET: APIRoute = async (context) => {
  const posts = (await getCollection('posts', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: 'Yunarang Development Archive',
    description: 'ゲーム、物語、AIを用いた開発の過程を記録する個人開発アーカイブ。',
    site: context.site ?? site,
    items: posts.map((post) => ({
      title: post.data.title.ja,
      description: post.data.description?.ja,
      link: `/posts/${post.data.slug}/`,
      pubDate: post.data.date,
    })),
    customData: '<language>ja-JP</language>',
  });
};
