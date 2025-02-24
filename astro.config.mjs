import { defineConfig } from 'astro/config';

import node from '@astrojs/node';

import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';
import dotenv from "dotenv"

dotenv.config()

// https://astro.build/config
export default defineConfig({
  site: 'https://www.cascadiacustomframing.com',
  devToolbar: {
    enabled: false
  },
  server:{
    port: 3999,
  },
  output: 'server',

  adapter: node({
    mode: 'standalone'
  }),

  integrations: [sitemap(), react()]
})