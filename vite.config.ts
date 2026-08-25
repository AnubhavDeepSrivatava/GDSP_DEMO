import { defineConfig } from 'vite'

// Builds the dev app (index.html + main.ts). For the standalone embeddable
// widget bundle, see vite.widget.config.ts / `npm run build:widget` instead.
export default defineConfig({
  server: {
    // PORT is set by external tooling that assigns this dev server a
    // specific port to proxy. When it's set, strictPort stops Vite from
    // silently falling back to a different port the proxy wouldn't know
    // about. When it's unset (a plain `npm run dev`), Vite is free to
    // auto-increment past 5173 as usual if that port is already taken.
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
    strictPort: Boolean(process.env.PORT),
  },
})
