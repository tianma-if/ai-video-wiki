import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const wiki = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/wiki" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number().optional(),
  }),
});

export const collections = { wiki };
