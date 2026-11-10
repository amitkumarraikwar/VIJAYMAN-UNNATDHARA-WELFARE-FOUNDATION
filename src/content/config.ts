import { defineCollection, z } from 'astro:content';

const shared = z.object({
  title: z.string(),
  description: z.string(),
  published: z.boolean().default(false),
  publishedAt: z.coerce.date().optional(),
  image: z.string().optional(),
  category: z.string().optional()
});

export const collections = {
  initiatives: defineCollection({ schema: shared.extend({ status: z.enum(['proposed', 'planned', 'active', 'completed', 'archived']).default('proposed'), location: z.string().optional() }) }),
  events: defineCollection({ schema: shared.extend({ startsAt: z.coerce.date().optional(), location: z.string().optional() }) }),
  news: defineCollection({ schema: shared.extend({ author: z.string().optional(), updatedAt: z.coerce.date().optional() }) }),
  gallery: defineCollection({ schema: z.object({ title: z.string(), alt: z.string(), caption: z.string().optional(), published: z.boolean().default(false), image: z.string() }) }),
  reports: defineCollection({ schema: z.object({ title: z.string(), description: z.string(), published: z.boolean().default(false), publishedAt: z.coerce.date().optional(), file: z.string() }) })
};
