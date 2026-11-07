"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";

// Experience as a packed stack of file folders. Each file pulls itself out as it
// scrolls into view and tucks back in when you scroll up past it.
// Smooth on phones: file heights never change (no layout shifts while scrolling);
// only opacity and transform animate, and a buffer zone stops flicker at the edge.
export default function Files() {
  const files = [
    ...site.experience.map((j) => ({
      tab: j.company,
      dates: j.dates || "Ongoing",
      title: j.role,
      body: j.summary,
      dark: false,
    })),
    {
      tab: site.education.school,
      dates: site.education.dates,
      title: site.education.program,
      body: site.education.detail,
      dark: true,
    },
  ];
  const slots = useRef<(HTMLDivElement | null)[]>([]);
  const [shown, setShown] = useState<boolean[]>(() => files.map(() => false));

  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const vh = window.innerHeight;
      setShown((prev) => {
        let changed = false;
        const next = prev.map((open, i) => {
          const el = slots.current[i];
          if (!el) return open;
          const top = el.getBoundingClientRect().top;
          // open once the file is 78% up the screen; close only after it drops below 90%
          const v = open ? top < vh * 0.9 : top < vh * 0.78;
          if (v !== open) changed = true;
          return v;
        });
        return changed ? next : prev;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="files">
      {files.map((f, i) => (
        <div
          key={f.tab + f.title}
          ref={(el) => {
            slots.current[i] = el;
          }}
          className="file-slot"
          style={{ zIndex: i + 1 }}
        >
          <div
            className={`file ${f.dark ? "file-dark" : ""} ${shown[i] ? "is-open" : ""}`}
            style={{ "--tilt": `${i % 2 ? 1.4 : -1.2}deg` } as React.CSSProperties}
          >
            <span className="file-tab mono" style={{ marginLeft: `${(i * 17) % 62}%` }}>
              {f.tab.toUpperCase()}
            </span>
            <div className="file-head">
              <span className="mono text-[0.7rem] opacity-60">{f.dates.toUpperCase()}</span>
              <span className="mt-1 block text-lg font-semibold leading-snug">{f.title}</span>
            </div>
            <div className="file-body">
              <p className={f.dark ? "display text-4xl" : "leading-relaxed opacity-80"}>{f.body}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
