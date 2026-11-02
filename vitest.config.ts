import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'coding-sdk',
    environment: 'node',
    testTimeout: 30000,
    hookTimeout: 30000,
  },
});
