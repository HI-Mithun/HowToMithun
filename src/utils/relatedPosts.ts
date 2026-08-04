import type { CollectionEntry } from 'astro:content';

export function getRelatedPosts(
	currentPost: CollectionEntry<'blog'>,
	allPosts: CollectionEntry<'blog'>[],
	maxResults = 3
): CollectionEntry<'blog'>[] {
	const currentTags = currentPost.data.tags;

	const scored = allPosts
		.filter((post) => post.id !== currentPost.id)
		.map((post) => {
			const sharedTags = post.data.tags.filter((tag) =>
				currentTags.includes(tag)
			).length;
			return { post, sharedTags };
		})
		.filter((entry) => entry.sharedTags > 0)
		.sort((a, b) => b.sharedTags - a.sharedTags);

	return scored.slice(0, maxResults).map((entry) => entry.post);
}