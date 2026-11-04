import Image from "next/image";
import type { Kind, Shoe as ShoeT, Icon } from "@/data/site";
import AccessoryIcon from "./AccessoryIcon";
import Garment from "./Garment";
import Shoe from "./Shoe";

// Uses a real photo when one is set in site.ts, otherwise the built-in drawing.

export function PieceArt({
  kind,
  color,
  image,
  alt,
  className = "",
}: {
  kind: Kind;
  color: string;
  image?: string;
  alt: string;
  className?: string;
}) {
  if (!image) return <Garment kind={kind} color={color} className={`h-auto w-full ${className}`} />;
  return (
    <span className={`relative block aspect-[4/5] w-full ${className}`}>
      {/* gold hook so photos still hang from the rail */}
      <svg viewBox="0 0 200 250" className="absolute inset-0 h-full w-full" aria-hidden>
        <path d="M100 30 V16 Q100 6 109 6 Q117 6 117 13" fill="none" stroke="var(--color-gold)" strokeWidth={3} strokeLinecap="round" />
      </svg>
      <Image src={image} alt={alt} fill sizes="(min-width: 640px) 200px, 176px" className="object-contain pt-[12%]" />
    </span>
  );
}

export function ShoeArt({ kind, image, alt, className = "" }: { kind: ShoeT["kind"]; image?: string; alt: string; className?: string }) {
  if (!image) return <Shoe kind={kind} className={`h-auto ${className}`} />;
  return (
    <span className={`relative block aspect-[7/4] ${className}`}>
      <Image src={image} alt={alt} fill sizes="112px" className="object-contain" />
    </span>
  );
}

export function AccessoryArt({ icon, image, alt }: { icon: Icon; image?: string; alt: string }) {
  if (!image) return <AccessoryIcon icon={icon} className="h-8 w-8" />;
  return (
    <span className="relative block h-9 w-9">
      <Image src={image} alt={alt} fill sizes="40px" className="object-contain" />
    </span>
  );
}
