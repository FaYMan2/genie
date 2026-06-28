import { fileURLToPath } from "node:url";
import { config as loadDotenv } from "dotenv";

// Next runs from apps/admin; load the monorepo-root .env so server components and
// route handlers see DATABASE_URL / REDIS_URL etc. without manual env injection.
loadDotenv({ path: fileURLToPath(new URL("../../.env", import.meta.url)) });

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The admin reads @genie/db / @genie/config source directly from the workspace.
  transpilePackages: ["@genie/db", "@genie/config"],
  experimental: { serverActions: { bodySizeLimit: "2mb" } },
  webpack: (config) => {
    // The workspace packages (and this app) use NodeNext-style ".js" import
    // specifiers in TypeScript source; teach webpack to resolve them to the
    // actual .ts/.tsx sources so transpilePackages can compile them.
    config.resolve.extensionAlias = {
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
    };
    return config;
  },
};

export default nextConfig;
