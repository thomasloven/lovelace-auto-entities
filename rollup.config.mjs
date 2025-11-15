import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';

export default defineConfig([
  {
    input: 'src/main.ts',
    output: {
      file: 'auto-entities.js',
      format: 'iife',
      name: 'autoEntities',
      sourcemap: false,
      inlineDynamicImports: true
    },
    plugins: [
      json(),
      resolve({
        browser: true,
        preferBuiltins: false,
        extensions: ['.js', '.ts', '.mjs', '.json']
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        sourceMap: true
      }),
      terser({
        format: {
          comments: false
        },
        compress: {
          drop_console: false,
          passes: 2
        },
        mangle: {
          properties: false
        }
      })
    ],
    onwarn(warning, warn) {
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      if (warning.code === 'CIRCULAR_DEPENDENCY') return;
      warn(warning);
    }
  }
]);
