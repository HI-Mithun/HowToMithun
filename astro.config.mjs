import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
	site: 'https://howtomithun.netlify.app/', // update this once you know your final URL
	integrations: [sitemap()],
	vite: {
		plugins: [tailwindcss()],
	},
});