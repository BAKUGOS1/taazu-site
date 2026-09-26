// Sirf server pe chalta hai: check karta hai ki public/ mein file hai ya nahi.
import fs from "node:fs";
import path from "node:path";

export function hasPublic(p: string): boolean {
  if (!p) return false;
  if (p.startsWith("http")) return true;
  try {
    return fs.existsSync(path.join(process.cwd(), "public", p));
  } catch {
    return false;
  }
}

export function findCreatives(dir: string, prefixes: string[]): string[] {
  try {
    const abs = path.join(process.cwd(), "public", dir);
    const list = fs.readdirSync(abs).filter((f) => /\.(png|jpe?g|webp|avif)$/i.test(f)).sort();
    const out: string[] = [];
    prefixes.forEach((p) => {
      const hit = list.find((f) => f.startsWith(p));
      if (hit) out.push(dir + "/" + encodeURIComponent(hit));
    });
    return out;
  } catch {
    return [];
  }
}
