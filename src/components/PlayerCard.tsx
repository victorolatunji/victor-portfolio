"use client";

import Image from "next/image";
import { useState } from "react";
import { site } from "@/data/site";

export default function PlayerCard() {
  const [flipped, setFlipped] = useState(false);
  const { card } = site;

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="card-3d cursor-pointer" onClick={() => setFlipped((f) => !f)}>
        <div className={`card-inner aspect-[4/5] ${flipped ? "flipped" : ""}`}>
          {/* Front */}
          <div className="card-face overflow-hidden bg-black">
            <Image
              src={site.photo}
              alt={`Portrait of ${site.fullName}`}
              fill
              priority
              sizes="(min-width: 768px) 384px, 100vw"
              className="photo object-cover"
            />
            <div className="card-shade absolute inset-0" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-bone">
              <p className="display text-3xl">{site.cardName}</p>
              <p className="mt-1 text-sm text-bone/70">{card.position}</p>
            </div>
          </div>

          {/* Back */}
          <div className="card-face card-back flex flex-col bg-black p-6 text-bone">
            <div className="flex items-start justify-between">
              <p className="display text-3xl">{site.brand}</p>
              <p className="display text-5xl text-red">11</p>
            </div>
            <dl className="mt-3 space-y-2.5">
              {card.stats.map((s) => (
                <div key={s.label} className="border-t border-bone/15 pt-2">
                  <dt className="text-xs text-bone/55">{s.label}</dt>
                  <dd className="text-sm font-semibold">{s.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-auto border-t border-red pt-3">
              <p className="text-xs text-bone/55">{card.sideQuest.label}</p>
              <a
                href={card.sideQuest.href}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="display text-2xl hover:text-red"
              >
                {card.sideQuest.name}
              </a>
              <p className="text-sm text-bone/70">{card.sideQuest.text}</p>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        className="mx-auto mt-4 block text-sm font-semibold text-muted hover:text-red"
      >
        {flipped ? "Flip back" : "Flip the card"}
      </button>
    </div>
  );
}