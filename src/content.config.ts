import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.date().optional(),
		author: z.string().default('Hasan Imam Mithun'),
		tags: z.array(z.string()).default([]),
		category: z.string().default('Uncategorized'),
		featuredImage: z.string().optional(),
		draft: z.boolean().default(false),
	}),
});

const emptyToUndefined = (v: unknown) => (v === '' ? undefined : v);

const sketchesCollection = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/sketches' }),
	schema: ({ image }) =>
		z.object({
			title: z.preprocess(emptyToUndefined, z.string().optional()),
			date: z.preprocess(emptyToUndefined, z.coerce.date().optional()),
			medium: z.preprocess(emptyToUndefined, z.string().default('Digital')),
			description: z.string().optional(),
			image: image(),
			category: z.string().optional(),
			tags: z.array(z.string()).default([]),
		}),
});

export const collections = {
	blog: blogCollection,
	sketches: sketchesCollection,
};