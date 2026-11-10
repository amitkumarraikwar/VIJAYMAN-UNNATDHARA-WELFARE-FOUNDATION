import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const shared = z.object({
  title: z.string(),
  description: z.string(),
  published: z.boolean().default(false),
  publishedAt: z.coerce.date().optional(),
  image: z.string().optional(),
  category: z.string().optional()
});

export const collections = {
  initiatives: defineCollection({ loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/initiatives' }), schema: shared.extend({ status: z.enum(['proposed', 'planned', 'active', 'completed', 'archived']).default('proposed'), location: z.string().optional() }) }),
  events: defineCollection({ loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/events' }), schema: shared.extend({ startsAt: z.coerce.date().optional(), location: z.string().optional() }) }),
  news: defineCollection({ loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/news' }), schema: shared.extend({ author: z.string().optional(), updatedAt: z.coerce.date().optional() }) }),
  gallery: defineCollection({ loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/gallery' }), schema: z.object({ title: z.string(), alt: z.string(), caption: z.string().optional(), published: z.boolean().default(false), image: z.string() }) }),
  reports: defineCollection({ loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/reports' }), schema: z.object({ title: z.string(), description: z.string(), published: z.boolean().default(false), publishedAt: z.coerce.date().optional(), file: z.string() }) })
};
