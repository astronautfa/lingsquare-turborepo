import { configs, defineConfig } from '@lingsquare/eslint'

export default defineConfig(
  ...configs.base,

  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
)
