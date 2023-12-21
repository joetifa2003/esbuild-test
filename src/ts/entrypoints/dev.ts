export default function startDevServer() {
  new EventSource("/esbuild").addEventListener("change", () =>
    location.reload(),
  );
}
