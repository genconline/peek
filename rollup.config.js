import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/peek.ts',
  output: [
    {
      file: 'dist/peek.js',
      format: 'umd',
      name: 'Peek',
      sourcemap: true
    },
    {
      file: 'dist/peek.min.js',
      format: 'umd',
      name: 'Peek',
      plugins: [terser()],
      sourcemap: true
    },
    {
      file: 'dist/peek.esm.js',
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json'
    })
  ]
}; 