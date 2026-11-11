import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "panel_admin";

function expectedToken(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return createHmac("sha256", password).update("panel-admin").digest("hex");
}

export async function isPanelAdmin(): Promise<boolean> {
  const expected = expectedToken();
  if (!expected) return false;
  const jar = await cookies();
  const current = jar.get(COOKIE)?.value;
  if (!current || current.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(current), Buffer.from(expected));
}

export async function openPanelAdminSession(): Promise<void> {
  const token = expectedToken();
  if (!token) {
    throw new Error("Falta ADMIN_PASSWORD.");
  }
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function closePanelAdminSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export function passwordMatches(input: string): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(password);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
