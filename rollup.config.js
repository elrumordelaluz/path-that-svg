import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import pkg from './package.json'

export default [
  {
    input: 'index.js',
    output: {
      file: pkg.browser,
      format: 'umd',
      name: 'svgson',
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: ['node_modules/**'],
      }),
    ],
  },
  {
    input: 'index.js',
    external: ['fast-copy', 'element-to-path', 'svgson-next'],
    plugins: [
      babel({
        exclude: ['node_modules/**'],
      }),
    ],
    output: [
      { file: pkg.main, format: 'cjs', exports: 'named' },
      { file: pkg.module, format: 'es', exports: 'named' },
    ],
  },
]
