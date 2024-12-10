import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',  // 必要に応じて 'jsdom' に変更可能
    setupFiles: ['./vitest.setup.js'],
  },
});
