import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => {
  const isDev = command === 'serve';

  return {
    plugins: [react()],
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
    server: {
      port: 4173,
      strictPort: true,
      proxy: isDev
        ? {
            '/api': {
              target: 'http://localhost:3000',
              changeOrigin: true,
              rewrite: path => path,
            },
          }
        : undefined,
    },
    build: {
      outDir: 'dist',
      sourcemap: mode !== 'production',
      minify: mode === 'production' ? 'terser' : false,
    },
  };
});
