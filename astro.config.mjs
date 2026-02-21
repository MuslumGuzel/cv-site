// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

const defaultSite = 'https://muslumguzel.github.io';
const defaultBase = '/cv-site';

function normaliseBase(value) {
  if (!value || value === '/') return '/';
  const withLeadingSlash = value.startsWith('/') ? value : `/${value}`;
  return withLeadingSlash.replace(/\/+$/, '');
}

const site = process.env.SITE_URL || defaultSite;
const base = normaliseBase(process.env.SITE_BASE || defaultBase);

// https://astro.build/config
export default defineConfig({
  site,
  base,
  vite: {
    plugins: [tailwindcss()]
  }
});
