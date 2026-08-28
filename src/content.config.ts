import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const localizedText = z.object({
  ja: z.string(),
  ko: z.string(),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      shortTitle: z.string(),
      title: localizedText,
      tagline: localizedText,
      overview: localizedText,
      status: z.enum(['active', 'completed', 'paused', 'planned']),
      role: z.string(),
      technologies: z.array(z.string()),
      focus: z.array(
        z.object({
          title: localizedText,
          description: localizedText,
        }),
      ),
      featured: z.boolean().default(false),
      order: z.number().int().default(0),
      heroImage: image().optional(),
      heroAlt: z.string().optional(),
      links: z
        .object({
          github: z.url().optional(),
          website: z.url().optional(),
          board: z.url().optional(),
        })
        .optional(),
    }),
});

const projectWikis = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/wiki' }),
  schema: () =>
    z.object({
      project: reference('projects'),
      title: localizedText,
      description: localizedText,
      category: z.enum(['story', 'world', 'characters', 'systems', 'development', 'reference']),
      order: z.number().int().default(0),
      draft: z.boolean().default(false),
    }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: () =>
    z.object({
      title: localizedText,
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      description: localizedText.optional(),
      category: localizedText,
      tags: z.array(localizedText).default([]),
      locales: z.array(z.enum(['ja', 'ko'])).default(['ja', 'ko']),
      project: reference('projects').optional(),
      image: z
        .object({
          src: z.string(),
          alt: z.string(),
        })
        .optional(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
      legacySlug: z.string(),
      legacyPaths: z.array(z.string()).default([]),
    }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: localizedText,
    description: localizedText,
    hero: z.any(),
    sections: z.any(),
    profile: z.array(z.any()),
    tools: z.array(z.any()),
    equipment: z.array(z.any()),
    archiveAreas: z.array(z.any()),
    lifePlan: z.array(z.any()),
    externalLinks: z.array(z.any()),
  }),
});

export const collections = { posts, projects, projectWikis, pages };
