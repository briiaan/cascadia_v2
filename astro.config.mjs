import { defineConfig } from 'astro/config';

import node from '@astrojs/node';

import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false
  },
  output: 'server',

  adapter: node({
    mode: 'standalone'
  }),

  integrations: [sitemap(), react()]
});