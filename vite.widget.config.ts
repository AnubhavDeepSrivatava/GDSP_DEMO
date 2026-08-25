import { defineConfig } from 'vite'
import { resolve } from 'node:path'

// Separate build from vite.config.ts: that one builds this whole dev app,
// this one builds <employee-form> and <employee-list> as a single,
// dependency-free file any external page can load with a <script> tag.
// Run with `npm run build:widget` — output goes to dist-widget/.
export default defineConfig({
  // Skip copying public/ (favicon.svg etc.) into the output — those belong
  // to this app's shell, not to a widget meant to embed in someone else's.
  publicDir: false,
  build: {
    outDir: 'dist-widget',
    emptyOutDir: true,
    lib: {
      // Entry registers both components, bypassing main.ts and global.css
      // — a standalone widget shouldn't carry page-shell concerns. Note
      // this only *registers* the elements; wiring them together (like
      // main.ts does) is still the embedding page's job.
      entry: resolve(import.meta.dirname, 'src/widget-entry.ts'),
      formats: ['es'],
      fileName: () => 'employee-widgets.js',
    },
    // No `external` list, so Lit is bundled into the output rather than
    // left for the host page to provide — the file has zero dependencies.
  },
})
