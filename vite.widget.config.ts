import { defineConfig } from 'vite'
import { resolve } from 'node:path'

// Separate build from vite.config.ts: that one builds this whole dev app,
// this one builds <app-shell>, <employee-form>, and <employee-list> as a
// single, dependency-free file any external page can load with a <script>
// tag. Run with `npm run build:widget` — output goes to dist-widget/.
export default defineConfig({
  // Skip copying public/ (favicon.svg etc.) into the output — those belong
  // to this app's shell, not to a widget meant to embed in someone else's.
  publicDir: false,
  build: {
    outDir: 'dist-widget',
    emptyOutDir: true,
    lib: {
      // Entry registers all three elements, including <app-shell>, so the
      // bundle is fully self-contained — the embedding page just nests
      // <employee-form>/<employee-list> inside <app-shell> and gets the
      // wiring for free, no separate glue script needed.
      entry: resolve(import.meta.dirname, 'src/widget-entry.ts'),
      formats: ['es'],
      fileName: () => 'employee-widgets.js',
    },
    // No `external` list, so Lit is bundled into the output rather than
    // left for the host page to provide — the file has zero dependencies.
  },
})
