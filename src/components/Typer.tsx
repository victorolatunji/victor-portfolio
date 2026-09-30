"use client";

import { useEffect, useState } from "react";

export default function Typer({ lines }: { lines: string[] }) {
  const [text, setText] = useState(lines[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let line = 0;
    let i = lines[0].length;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (deleting) {
        i--;
        setText(lines[line].slice(0, i));
        if (i === 0) {
          deleting = false;
          line = (line + 1) % lines.length;
        }
        timer = setTimeout(tick, 35);
      } else {
        i++;
        setText(lines[line].slice(0, i));
        if (i === lines[line].length) {
          deleting = true;
          timer = setTimeout(tick, 1800);
          return;
        }
        timer = setTimeout(tick, 70);
      }
    };

    timer = setTimeout(tick, 2200);
    return () => clearTimeout(timer);
  }, [lines]);

  return (
    <p className="display mt-5 min-h-[1.2em] text-xl text-muted sm:text-2xl">
      <span className="sr-only">{lines.join(". ")}</span>
      <span aria-hidden>
        <span className="text-green">&gt;</span> {text}
        <span className="caret" />
      </span>
    </p>
  );
}