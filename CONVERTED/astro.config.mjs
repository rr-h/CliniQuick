// astro.config.mjs
import { defineConfig } from 'astro/config';
import markdown from '@astrojs/markdown-remark';
import svelte from '@astrojs/svelte';

export default defineConfig({
  integrations: [markdown(), svelte()],
});