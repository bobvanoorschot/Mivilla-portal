import pkg from './package.json'
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import postcssModules from 'postcss-modules';const cssExportMap = {};

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'build/index.js',
      format: 'cjs',
    }
  ],
  plugins: [
    babel({
      exclude: "node_modules/**"
    }),
    postcss({
      plugins: [
        postcssModules({
          getJSON (id, exportTokens) {
            cssExportMap[id] = exportTokens;
          }
        })
      ],
      getExportNamed: false,
      getExport (id) {
        return cssExportMap[id];
      },
      extract: 'index.css',
    }),
    commonjs(),
    resolve(),
    json()
  ],
  external: ['react', 'react-dom']
}