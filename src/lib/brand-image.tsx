import { readFile } from "node:fs/promises";
import path from "node:path";

/** OPAM logo as a data URI, for use inside next/og ImageResponse. */
export async function logoDataUri() {
  const file = await readFile(path.join(process.cwd(), "public", "opam-logo.jpeg"));
  return `data:image/jpeg;base64,${file.toString("base64")}`;
}
