import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://www.cascadiacustomframing.com',

  output: 'server',

  devToolbar: {
    enabled: false,
  },

  adapter: node({
    mode: "standalone",
    entrypointResolution: "auto"
  }),
  image: {
  service: {
    entrypoint: "astro/assets/services/noop",
  },
},

  integrations: [
    sitemap(),
    react(),
  ],
});