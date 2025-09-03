import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*.spec.it.ts'],
    poolOptions: {
      threads: {
        isolate: true,
        singleThread: true,
      },
    },
    hookTimeout: 50000,
  },
});
