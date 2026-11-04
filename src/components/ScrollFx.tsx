"use client";

import { useEffect, useRef } from "react";

// Page-wide scroll effects:
//  · a percentage bar across the top, with a tag riding the end of the fill
//  · sections marked data-reveal fade up into view
//  · the header tightens once you leave the top
export default function ScrollFx() {
  const bar = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.current?.style.setProperty("--p", p.toFixed(4));
      if (label.current) label.current.textContent = `${Math.round(p * 100)}%`;
      document.documentElement.dataset.scrolled = window.scrollY > 24 ? "1" : "0";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.shown = "1";
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={bar} className="progress" aria-hidden>
      <div className="progress-fill" />
      <span ref={label} className="progress-tag mono">
        0%
      </span>
    </div>
  );
}
