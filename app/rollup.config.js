import { name } from './package.json';
import isCI from 'is-ci';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import progressPlugin from 'rollup-plugin-progress';

const progress = () => {
  if (isCI) {
    return {};
  }

  return progressPlugin();
};

const src = 'src/';
const dest = 'public/js/';

const assets = {
  umd: {
    input: src + 'index.js',
    output: dest + name + '.js',
  },
  cjs: {
    input: src + 'index.js',
    output: dest + name + '.cjs.js',
  }
};

export default params => [
  // umd
  {
    input: assets['umd'].input,
    output: {
      file: assets['umd'].output,
      format: 'umd',
      name: name,
    },
    plugins: [
      resolve(),
      json(),
      babel({
        babelHelpers: 'bundled'
      }),
      params.progress !== false ? progress() : {}
    ]
  },
  {
    input: src + 'app.js',
    output: {
      file: dest + 'app.js',
      format: 'umd',
      name: 'app'
    },
    plugins: [
      resolve(),
      json(),
      babel({
        babelHelpers: 'bundled'
      }),
      params.progress !== false ? progress() : {}
    ]
  },
  // cjs
  {
    input: assets['cjs'].input,
    output: {
      file: assets['cjs'].output,
      format: 'cjs'
    },
    plugins: [
      resolve(),
      json(),
      babel({
        babelHelpers: 'bundled'
      }),
      params.progress !== false ? progress() : {}
    ]
  }
];
