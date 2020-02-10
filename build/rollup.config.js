import commonjs from 'rollup-plugin-commonjs';
import vue from 'rollup-plugin-vue';
import buble from 'rollup-plugin-buble';
import { eslint } from 'rollup-plugin-eslint';

export default {
  input: 'src/index.js',
  output: {
    name: 'VueWidgetLink',
    exports: 'named'
  },
  plugins: [
    eslint({
      exclude: [
        'src/styles/**'
      ]
    }),
    commonjs(),
    vue({
      css: true,
      compileTemplate: true
    }),
    buble()
  ]
};
