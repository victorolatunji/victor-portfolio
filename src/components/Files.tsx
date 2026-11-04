"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";

// Experience as a packed stack of file folders. Each file pulls itself out
// as it scrolls into view: no clicking needed, works the same on phones.
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

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = Number((e.target as HTMLElement).dataset.i);
          setShown((s) => (s[i] ? s : s.map((v, k) => (k === i ? true : v))));
          io.unobserve(e.target);
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
