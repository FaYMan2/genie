import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { config as loadDotenv } from "dotenv";
import { Server, Probot } from "probot";
import { loadEnv } from "@genie/config";
import { genieApp } from "./app.js";

// `pnpm dev` runs this from apps/server, so load the monorepo-root .env explicitly
// (a bare `dotenv/config` would only look in the app's own directory).
loadDotenv({ path: fileURLToPath(new URL("../../../.env", import.meta.url)) });

const env = loadEnv();

function privateKey(): string {
  if (env.GITHUB_APP_PRIVATE_KEY) return env.GITHUB_APP_PRIVATE_KEY.replace(/\\n/g, "\n");
  if (env.GITHUB_APP_PRIVATE_KEY_PATH) return readFileSync(env.GITHUB_APP_PRIVATE_KEY_PATH, "utf8");
  throw new Error("Set GITHUB_APP_PRIVATE_KEY or GITHUB_APP_PRIVATE_KEY_PATH");
}

async function main(): Promise<void> {
  const server = new Server({
    Probot: Probot.defaults({
      appId: env.GITHUB_APP_ID,
      privateKey: privateKey(),
      secret: env.GITHUB_WEBHOOK_SECRET,
    }),
    port: env.PORT,
    log: undefined,
  });

  await server.load(genieApp);
  await server.start();
  // eslint-disable-next-line no-console
  console.log(`🧞 Genie webhook server listening on :${env.PORT}`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
