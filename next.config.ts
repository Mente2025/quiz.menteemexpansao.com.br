import type { NextConfig } from "next";

/** Endereços do quiz antigo (8 etapas) que agora levam ao início. */
const oldSteps = [2, 3, 4, 5, 6, 7, 8].map((n) => `/etapa-${n}`);

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  redirects() {
    return [...oldSteps, "/confirmacao"].map((source) => ({
      source,
      destination: "/",
      permanent: false,
    }));
  },
};

export default nextConfig;
