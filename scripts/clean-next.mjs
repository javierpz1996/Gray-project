import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const nextPath = path.join(root, ".next");
const cacheDir = path.join(
  os.homedir(),
  ".cache",
  "gray-proyect",
  path.basename(root),
  ".next",
);

if (fs.existsSync(nextPath)) {
  const stat = fs.lstatSync(nextPath);
  if (stat.isSymbolicLink()) {
    fs.rmSync(nextPath);
  } else {
    fs.rmSync(nextPath, { recursive: true, force: true });
  }
}

if (fs.existsSync(cacheDir)) {
  fs.rmSync(cacheDir, { recursive: true, force: true });
}
