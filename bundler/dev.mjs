import esbuild from "esbuild";
import options from "./bundler_options.mjs";

const ctx = await esbuild.context(options);

await ctx.watch();

const { host, port } = await ctx.serve({
  servedir: "out",
});

console.log(`DEV started at: http://${host}:${port}`);
