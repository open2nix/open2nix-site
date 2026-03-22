import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://open2nix.github.io',
  base: '/open2nix-site',
  integrations: [mdx()],
});
