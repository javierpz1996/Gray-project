import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { prepareNextDev } from "./prepare-next-dev.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const nextBin = path.join(root, "node_modules", ".bin", "next");

prepareNextDev(root);

const child = spawn(nextBin, ["dev", ...process.argv.slice(2)], {
  cwd: root,
  stdio: "inherit",
  env: {
    ...process.env,
    COPYFILE_DISABLE: "1",
  },
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});

child.on("error", (err) => {
  console.error("[dev]", err.message);
  process.exit(1);
});
