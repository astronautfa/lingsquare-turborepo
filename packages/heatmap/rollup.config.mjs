import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import filesize from 'rollup-plugin-filesize';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

const extensions = ['.ts', '.tsx'];

export default {
  input: 'src/index.ts',
  output: {
    file: 'build/index.js',
    format: 'cjs',
    sourcemap: true,
    exports: 'named',
    // Use 'auto' instead of 'default' for better interoperability with CRA etc.
    // https://rollupjs.org/guide/en/#outputinterop
    interop: 'auto',
    // Rollup does not support this React Server Components directive yet.
    // https://github.com/rollup/rollup/issues/4699
    banner: `'use client';`,
  },
  plugins: [
    external({
      includeDependencies: true,
    }),
    postcss({
      modules: true,
    }),
    babel({
      extensions,
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),
    resolve({
      extensions,
    }),
    copy({
      targets: [{ src: 'src/*.d.ts', dest: 'build/' }],
    }),
    filesize(),
  ],
  onwarn(warning, warn) {
    if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && warning.message.includes('use client')) {
      return; // ignore the error for now
    }
    warn(warning);
  },
};
