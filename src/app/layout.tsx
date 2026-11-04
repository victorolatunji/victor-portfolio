import type { Metadata, Viewport } from "next";
import { Caveat, Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";

// Headings: Instrument Serif (fashion editorial). Body: Inter.
const heading = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-heading" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
// Chalkboard handwriting.
const chalk = Caveat({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-chalk" });

// Vercel sets this automatically; locally it falls back to localhost.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

const title = `${site.fullName} | ${site.role}`;
const description = `${site.hero.kicker} ${site.hero.title}. ${site.hero.line}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: { title, description, url: "/", siteName: site.shortName, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = { themeColor: "#e9ebee" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable} ${chalk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
