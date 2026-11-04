"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";

// Experience as a packed stack of file folders. Each file pulls itself out as it
// scrolls into view and tucks back in when you scroll up past it. No clicking needed.
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
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [shown, setShown] = useState<boolean[]>(() => files.map(() => false));

  // Scrolling down opens each file as it comes into view; scrolling back up
  // (so the file drops below the screen again) closes it.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const i = Number((e.target as HTMLElement).dataset.i);
          const belowScreen = e.boundingClientRect.top > (e.rootBounds?.bottom ?? window.innerHeight) * 0.5;
          const open = e.isIntersecting || !belowScreen;
          setShown((s) => (s[i] === open ? s : s.map((v, k) => (k === i ? open : v))));
        }),
      { rootMargin: "0px 0px -18% 0px", threshold: 0.35 },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="files">
      {files.map((f, i) => (
        <div
          key={f.tab + f.title}
          ref={(el) => {
            refs.current[i] = el;
          }}
          data-i={i}
          className={`file ${f.dark ? "file-dark" : ""} ${shown[i] ? "is-open" : ""}`}
          style={{ zIndex: i + 1, rotate: `${i % 2 ? 0.6 : -0.5}deg` }}
        >
          <span className="file-tab mono" style={{ marginLeft: `${(i * 17) % 62}%` }}>
            {f.tab.toUpperCase()}
          </span>
          <div className="file-head">
            <span className="mono text-[0.7rem] opacity-60">{f.dates.toUpperCase()}</span>
            <span className="mt-1 block text-lg font-semibold leading-snug">{f.title}</span>
          </div>
          <div className="file-body">
            <div>
              <p className={f.dark ? "display pb-6 text-4xl" : "pb-6 leading-relaxed opacity-80"}>{f.body}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
