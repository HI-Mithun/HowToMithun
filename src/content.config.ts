import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.date().optional(),
		tags: z.array(z.string()).default([]),
		category: z.string().default('Uncategorized'),
		featuredImage: z.string().optional(),
		draft: z.boolean().default(false),
	}),
});

export const collections = {
	blog: blogCollection,
};