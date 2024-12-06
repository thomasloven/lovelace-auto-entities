import nodeResolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-typescript2";
import terser from "@rollup/plugin-terser";
import babel from "@rollup/plugin-babel";

const dev = process.env.ROLLUP_WATCH;

export default {
  input: "src/main.ts",
  output: {
    file: "auto-entities.js",
    format: "es",
  },
  plugins: [
    nodeResolve(),
    json(),
    typescript({
      clean: true,
    }),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
    }),
    !dev && terser({ format: { comments: false } }),
  ],
};
