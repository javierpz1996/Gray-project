/**
 * Dev en disco externo: macOS crea AppleDouble (._*) en exFAT/APFS removible
 * y Turbopack rompe al leerlos ("invalid digit found in string").
 * Enlaza .next al disco interno y borra ._ trash antes de arrancar.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @param {string} root */
export function prepareNextDev(root = path.resolve(__dirname, "..")) {
  const nextPath = path.join(root, ".next");
  const onExternalVolume = root.startsWith("/Volumes/");

  if (onExternalVolume) {
    linkNextCacheToInternalDisk(root, nextPath);
  }

  purgeAppleDouble(nextPath);

  if (fs.existsSync(nextPath)) {
    const target = fs.lstatSync(nextPath).isSymbolicLink()
      ? fs.realpathSync(nextPath)
      : nextPath;
    purgeAppleDouble(target);
  }
}

/**
 * @param {string} root
 * @param {string} nextPath
 */
function linkNextCacheToInternalDisk(root, nextPath) {
  const cacheDir = path.join(
    os.homedir(),
    ".cache",
    "gray-proyect",
    path.basename(root),
    ".next",
  );

  fs.mkdirSync(cacheDir, { recursive: true });

  if (!fs.existsSync(nextPath)) {
    fs.symlinkSync(cacheDir, nextPath, "dir");
    return;
  }

  const stat = fs.lstatSync(nextPath);

  if (stat.isSymbolicLink()) {
    return;
  }

  if (stat.isDirectory()) {
    console.log(
      "[dev] Caché .next en disco externo → enlace en disco interno:",
      cacheDir,
    );
    fs.rmSync(nextPath, { recursive: true, force: true });
    fs.symlinkSync(cacheDir, nextPath, "dir");
  }
}

/**
 * @param {string} dir
 */
function purgeAppleDouble(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }

  /** @param {string} current */
  const walk = (current) => {
    let entries;
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      const full = path.join(current, entry.name);

      if (entry.name.startsWith("._")) {
        try {
          fs.rmSync(full, { force: true });
        } catch {
          /* best effort */
        }
        continue;
      }

      if (entry.isDirectory()) {
        walk(full);
      }
    }
  };

  walk(dir);
}

const isDirectRun =
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isDirectRun) {
  prepareNextDev();
}
