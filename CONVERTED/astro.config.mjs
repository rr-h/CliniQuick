import { defineConfig } from 'astro/config';
import markdown from '@astrojs/markdown-remark';

export default defineConfig({
  integrations: [markdown()],
});