import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://www.cascadiacustomframing.com',

  output: 'server',

  server: {
    host: '0.0.0.0',
    port: 3999,
  },

  devToolbar: {
    enabled: false,
  },

  adapter: node({
    mode: "standalone",
    entrypointResolution: "auto"
  }),
  

  integrations: [
    sitemap(),
    react(),
  ],
});