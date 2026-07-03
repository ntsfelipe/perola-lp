import { spawn } from "node:child_process";
import { once } from "node:events";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const baseUrl = "http://127.0.0.1:3000";

async function waitForServer(server) {
  const deadline = Date.now() + 120_000;

  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`Next.js server exited with code ${server.exitCode}. Run the build first.`);
    }

    try {
      const response = await fetch(baseUrl);
      if (response.ok) {
        return;
      }
    } catch {
      // The server is still starting.
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error("Timed out while starting the Next.js production server.");
}

async function stopServer(server) {
  if (server.exitCode !== null) {
    return;
  }

  server.kill("SIGTERM");

  await Promise.race([
    once(server, "exit"),
    new Promise((resolve) => setTimeout(resolve, 5_000)),
  ]);

  if (server.exitCode === null) {
    server.kill("SIGKILL");
  }
}

const server = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1"],
  { cwd: projectRoot, stdio: "ignore" },
);

let exitCode = 1;

try {
  await waitForServer(server);

  const runner = spawn(
    process.execPath,
    ["node_modules/@playwright/test/cli.js", "test", ...process.argv.slice(2)],
    { cwd: projectRoot, stdio: "inherit" },
  );

  const [code] = await once(runner, "exit");
  exitCode = typeof code === "number" ? code : 1;
} finally {
  await stopServer(server);
}

process.exitCode = exitCode;
