import type { NextConfig } from "next";
const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: {
    cpus: 2,
    workerThreads: true,
    webpackBuildWorker: false,
    globalNotFound: true,
    useTypeScriptCli: false,
  },
};
export default config;
