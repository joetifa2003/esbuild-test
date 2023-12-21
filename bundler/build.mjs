import * as esbuild from "esbuild";
import { rimraf } from "rimraf";
import fs from "fs/promises";
import options from "./bundler_options.mjs";

await rimraf("./out");

const res = await esbuild.build(options);

const generateManifest = () => {
  /***
   * @type {Record<string, { output: string, cssBundle: string? }>}
   */
  const map = {};

  for (const [key, value] of Object.entries(res.metafile.outputs)) {
    if (!value.entryPoint) {
      continue;
    }

    map[value.entryPoint] = { output: key, cssBundle: value.cssBundle };
  }

  return map;
};

fs.writeFile("./out/manifest.json", JSON.stringify(generateManifest())).catch(
  console.error,
);
fs.writeFile("./out/metafile.json", JSON.stringify(res.metafile)).catch(
  console.error,
);
