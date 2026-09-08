import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
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
