import startDevServer from "./dev";

if (!window.IS_PRODUCTION) {
  startDevServer();
}
