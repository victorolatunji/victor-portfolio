"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { AccessoryArt } from "./Art";

// Aluminium carry-on. Closed by default: unlatch it to see what's packed.
export default function CarryOn() {
  const [open, setOpen] = useState(false);
  const total = site.carryOn.reduce((n, c) => n + c.items.length, 0);

  return (
    <div>
      <div className={`case ${open ? "is-open" : ""}`}>
        {/* Interior */}
        <div className="case-interior">
          <div className="case-strap" aria-hidden />
          <div className="relative z-[1] grid gap-4 p-4 sm:p-6 md:grid-cols-2 lg:grid-cols-3">
            {site.carryOn.map((c, ci) => (
              <section
                key={c.label}
                className={`pocket ${ci === 2 ? "lg:row-span-2" : ""}`}
                aria-label={`${c.label} skills`}
              >
                <p className="mono flex justify-between text-[0.68rem] text-bone/55">
                  <span>{c.label.toUpperCase()}</span>
                  <span className="text-live">{c.items.length}</span>
                </p>
                <ul className="mt-3 grid grid-cols-1 gap-2 min-[480px]:grid-cols-2">
                  {c.items.map((a) => (
                    <li key={a.skill} className="piece">
                      <span className="piece-icon">
                        <AccessoryArt icon={a.icon} image={a.image} alt={a.item} />
                      </span>
                      <span className="min-w-0 text-sm font-semibold leading-tight text-bone">{a.skill}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>

        {/* Lid */}
        <div className="case-lid" aria-hidden={open}>
          <span className="case-handle" />
          <span className="case-latch case-latch-l" />
          <span className="case-latch case-latch-r" />
          <span className="case-plate mono">VAO · CARRY-ON · {total} PIECES</span>
          {!open && (
            <button type="button" onClick={() => setOpen(true)} className="unlatch mono">
              Unlatch the case
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 flex min-h-10 items-center justify-end gap-4">
        {open && (
          <button type="button" onClick={() => setOpen(false)} className="chip">
            Close the case
          </button>
        )}
      </div>
    </div>
  );
}
