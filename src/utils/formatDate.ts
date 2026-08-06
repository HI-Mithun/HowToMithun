// src/utils/formatDate.ts

export function formatDate(dateStr: string): string {
	if (dateStr === 'Present') return 'Present';
	const date = new Date(`${dateStr}T00:00:00`);
	return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function formatDateRange(start: string, end: string): string {
	return `${formatDate(start)} — ${formatDate(end)}`;
}