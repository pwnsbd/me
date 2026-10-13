import { existsSync } from 'node:fs'
import { join } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

// Showcase pages live in public/<name>/ (see docs/showcases.md). Vercel serves their
// index.html for /<name>/; this makes the dev and preview servers do the same instead of
// falling back to the app.
function showcaseIndex(): Plugin {
  const rewrite = (root: string) => (req: { url?: string }, _res: unknown, next: () => void) => {
    const path = req.url?.split('?')[0] ?? ''
    if (path.length > 1 && path.endsWith('/') && existsSync(join(root, path, 'index.html'))) {
      req.url = `${path}index.html`
    }
    next()
  }
  return {
    name: 'showcase-index',
    configureServer(server) { server.middlewares.use(rewrite(server.config.publicDir)) },
    configurePreviewServer(server) { server.middlewares.use(rewrite(server.config.build.outDir)) },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), showcaseIndex()],
})
