import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

function renameSitemap() {
  return {
    name: 'rename-sitemap',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const distDir = fileURLToPath(dir);
        const indexPath = path.join(distDir, 'sitemap-index.xml');
        const sitemapZeroPath = path.join(distDir, 'sitemap-0.xml');
        const finalPath = path.join(distDir, 'sitemap.xml');
        try {
          await fs.copyFile(sitemapZeroPath, finalPath);
          await fs.unlink(sitemapZeroPath);
          await fs.unlink(indexPath);
        } catch (err) {
          console.warn('[rename-sitemap] skipped:', err.message);
        }
      },
    },
  };
}

export default defineConfig({
  site: 'https://alexmaina.me',
  trailingSlash: 'never',
  build: {
    inlineStylesheets: 'auto',
    assets: '_assets',
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 1.0,
      serialize(item) {
        return { ...item, lastmod: new Date().toISOString() };
      },
    }),
    renameSitemap(),
  ],
});
