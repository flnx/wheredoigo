import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svgr(), react()],
    resolve: {
        alias: {
            src: '/src',
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        // css: true, // CSS parsing is slow, disable it if you don't need it
        setupFiles: './src/test/setup.js',
    },
});
