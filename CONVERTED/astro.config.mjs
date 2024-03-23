import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte'; // Import your integrations

export default defineConfig({
  integrations: [svelte()] // Add your integrations
});
