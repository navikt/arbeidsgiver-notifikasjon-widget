import typescript from '@rollup/plugin-typescript';
import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import commonjs from "@rollup/plugin-commonjs"
import NpmImport from "less-plugin-npm-import";
import url from "@rollup/plugin-url";
import postcssPrefixSelector from "postcss-prefix-selector"
import svgr from '@svgr/rollup'

const packageJson = require("./package.json");

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true
    }

  ],
  plugins: [
    typescript({ tsconfig: './tsconfig.json' }),
    commonjs(),
    resolve(),
    postcss({
      plugins: [
        postcssPrefixSelector({
          prefix: '.notifikasjoner_widget',
          exclude: ['.notifikasjoner_widget'],
          transform(prefix, selector, prefixedSelector) {
            // tvinger css fra nav biblioteker til å være scopet til widget
            if (selector.match(/^(html|body|:root|:export)/)) {
              return selector.replace(/^([^\s]*)/, `$1 ${prefix}`);
            }
            return prefixedSelector;
          },
        })
      ],
      use: {
        less: {
          plugins: [
            new NpmImport({prefix: "~"})
          ],
        },
        sass: {},
        stylus: {}
      }
    }),
    url({
      include: ["**/*.ttf"],
      limit: Infinity,
    }),
    svgr(),
    peerDepsExternal()
  ]
};
