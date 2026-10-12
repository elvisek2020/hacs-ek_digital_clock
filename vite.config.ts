import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import pkg from './package.json' with { type: 'json' };

export default defineConfig({
  define: {
    __CARD_VERSION__: JSON.stringify(pkg.version),
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/ek-digital-clock.ts'),
      name: 'EkDigitalClock',
      formats: ['es'],
      fileName: () => 'ek-digital-clock.js',
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    minify: true,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
    target: 'es2020',
  },
});
