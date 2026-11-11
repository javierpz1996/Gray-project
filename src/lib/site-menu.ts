import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { menuApplied } from "@/lib/site-menu-flag";

const file = path.join(process.cwd(), "data", "site-menu.json");

export async function readMenuApplied(): Promise<boolean> {
  if (process.env.NODE_ENV === "production") return menuApplied;
  try {
    const raw = await readFile(file, "utf8");
    const data = JSON.parse(raw) as { applied?: unknown };
    return data.applied !== false;
  } catch {
    return menuApplied;
  }
}

export async function writeMenuApplied(applied: boolean): Promise<void> {
  await writeFile(file, `${JSON.stringify({ applied }, null, 2)}\n`, "utf8");
}
