import { htmlPlugin } from "@craftamap/esbuild-plugin-html";
import { sassPlugin } from "esbuild-sass-plugin";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import { copy } from "esbuild-plugin-copy";

/**
 * @type {import("esbuild").BuildOptions}
 */
const options = {
  define: {
    "window.IS_PRODUCTION":
      process.env.IS_PRODUCTION === "true" ? "true" : "false",
  },
  publicPath: "http://localhost:8000",
  entryPoints: ["src/ts/entrypoints/**/*.ts", "src/assets/main.scss"],
  bundle: true,
  outdir: "out",
  splitting: true,
  format: "esm",
  minify: true,
  logLevel: "info",
  sourcemap: true,
  entryNames: "[ext]/[name].[hash]",
  chunkNames: "[ext]/[name].[hash]",
  assetNames: "[name].[hash]",
  target: "es6",
  plugins: [
    copy({
      verbose: true,
      assets: [
        {
          from: "src/img/**",
          to: "img",
        },
      ],
    }),
    sassPlugin({
      async transform(input, dir) {
        const { css } = await postcss([
          autoprefixer({
            flexbox: true,
          }),
        ]).process(input, {
          from: dir,
        });

        return css;
      },
    }),
    htmlPlugin({
      files: [
        {
          entryPoints: [
            "src/ts/entrypoints/page1.ts",
            "src/ts/entrypoints/main.ts",
          ],
          filename: "index.html",
          htmlTemplate: "src/index.html",
          title: "Test",
          scriptLoading: "module",
        },
      ],
    }),
  ],
  metafile: true,
};

export default options;
