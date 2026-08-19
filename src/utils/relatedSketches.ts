import type { CollectionEntry } from 'astro:content';

export function getRelatedSketches(
	current: CollectionEntry<'sketches'>,
	all: CollectionEntry<'sketches'>[],
	limit = 4
): CollectionEntry<'sketches'>[] {
	const scored = all
		.filter((s) => s.id !== current.id)
		.map((s) => {
			let score = 0;
			if (s.data.category && s.data.category === current.data.category) score += 2;
			const sharedTags = s.data.tags.filter((t) => current.data.tags.includes(t));
			score += sharedTags.length;
			return { entry: s, score };
		})
		.filter((s) => s.score > 0)
		.sort((a, b) => b.score - a.score);

	return scored.slice(0, limit).map((s) => s.entry);
}

export function getGallerySketches(
	current: CollectionEntry<'sketches'>,
	all: CollectionEntry<'sketches'>[]
): CollectionEntry<'sketches'>[] {
	const related = getRelatedSketches(current, all, all.length);
	const relatedIds = new Set(related.map((r) => r.id));
	const rest = all.filter((s) => s.id !== current.id && !relatedIds.has(s.id));
	return [...related, ...rest];
}