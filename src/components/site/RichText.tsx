import type { ReactNode } from "react";

const LINK = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;

/** Renders `[texto](https://url)` inside a string as external links. */
export function RichText({
  text,
  linkClassName,
}: {
  text: string;
  linkClassName: string;
}) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    const start = m.index ?? 0;
    if (start > last) parts.push(text.slice(last, start));
    parts.push(
      <a
        key={start}
        href={m[2]}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        {m[1]}
      </a>,
    );
    last = start + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}
