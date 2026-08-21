export function joinMeta(parts: (string | undefined | null | false)[], separator = ' · '): string {
	return parts.filter(Boolean).join(separator);
}