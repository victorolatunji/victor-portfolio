import CarryOn from "@/components/CarryOn";
import Closet from "@/components/Closet";
import GuestList from "@/components/GuestList";
import LiveStats from "@/components/LiveStats";
import Board from "@/components/Board";
import Files from "@/components/Files";
import ScrollFx from "@/components/ScrollFx";
import { site } from "@/data/site";

const container = "mx-auto w-full max-w-6xl px-4 sm:px-6";

function Head({ no, title, note }: { no: string; title: string; note?: string }) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-ink/20 pb-4">
      <div>
        <p className="mono text-xs text-live-dark">{no}</p>
        <h2 className="display mt-2 text-5xl sm:text-6xl">{title}</h2>
      </div>
      {note && <p className="max-w-sm text-sm text-ink/60">{note}</p>}
    </div>
  );
}

const mail = (subject: string) => `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;

export default function Home() {
  return (
    <>
      <header className="site-header sticky top-0 z-40">
        <ScrollFx />
        <div className={`${container} flex items-center justify-between gap-6`}>
          <a href="#top" className="flex items-center gap-3" aria-label={`${site.brand}, back to top`}>
            <span className="woven">{site.brand}</span>
            <span className="mono hidden text-xs text-ink/60 sm:inline">{site.shortName.toUpperCase()}</span>
          </a>
          <div className="flex items-center gap-5">
            <nav className="hidden gap-5 text-sm font-medium md:flex">
              <a href="#rail" className="nav-link">Collection</a>
              <a href="#carry-on" className="nav-link">Carry-on</a>
              <a href="#board" className="nav-link">Board</a>
              <a href="#guest-list" className="nav-link">Guest list</a>
              <a href="#contact" className="nav-link">Viewing</a>
            </nav>
            <a href={site.links.resume} target="_blank" rel="noreferrer" className="btn-dark !px-4 !py-2 text-sm">
              Résumé
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className={`${container} grid gap-10 pb-14 pt-8 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:pt-14`}>
          <div className="hero-in">
            <p className="mono text-xs text-ink/60">{site.hero.kicker.toUpperCase()}</p>
            <h1 className="display mt-3 text-6xl leading-[0.95] sm:text-7xl lg:text-8xl">{site.hero.title}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/80">{site.hero.line}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#rail" className="btn-dark">{site.hero.primary}</a>
              <a href="#contact" className="btn-line">{site.hero.secondary}</a>
            </div>
          </div>
          <LiveStats />
        </section>

        {/* Rail */}
        <section id="rail" data-reveal className={`${container} scroll-mt-20 pb-28`}>
          <Head
            no="01 · THE COLLECTION"
            title="On the rail"
            note="Sneak a peek."
          />
          <Closet />
        </section>

        {/* Carry-on */}
        <section id="carry-on" data-reveal className={`${container} scroll-mt-20 pb-28`}>
          <Head
            no="02 · THE CARRY-ON"
            title="Packed and worn"
            note="Never travel light."
          />
          <CarryOn />
        </section>

        {/* Chalkboard */}
        <section id="board" className="scroll-mt-20 bg-panel py-24">
          <div data-reveal className={container}>
            <Head no="03 · THE BOARD" title="Chalk talk" note="Leave your mark." />
            <Board />
          </div>
        </section>

        {/* Files */}
        <section id="experience" data-reveal className={`${container} scroll-mt-20 py-28`}>
          <Head no="04 · THE FILES" title="The paper trail" note="Signed, sealed, delivered." />
          <Files />
        </section>

        {/* Guest list */}
        <section id="guest-list" data-reveal className={`${container} scroll-mt-20 pb-28`}>
          <Head no="05 · THE GUEST LIST" title={site.guestList.heading} note={site.guestList.text} />
          <GuestList />
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-20 bg-ink py-28 text-bone">
          <div data-reveal className={container}>
            <p className="mono text-xs text-live">06 · PRIVATE VIEWING</p>
            <h2 className="display mt-3 max-w-4xl text-6xl sm:text-7xl">{site.contact.heading}</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-bone/75">{site.contact.text}</p>
            <ul className="mt-8 flex flex-wrap gap-3">
              {site.contact.options.map((o) => (
                <li key={o}>
                  <a href={mail(o)} className="chip chip-dark">
                    <span className="chip-dot" aria-hidden />
                    {o}
                  </a>
                </li>
              ))}
            </ul>
            <a href={mail("Private viewing")} className="display mt-12 inline-block break-all text-3xl text-gold hover:text-bone sm:text-5xl">
              {site.email}
            </a>
            <div className="mt-10 flex flex-wrap gap-6 text-sm font-medium">
              <a href={site.links.github} target="_blank" rel="noreferrer" className="hover:text-gold">GitHub</a>
              <a href={site.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-gold">LinkedIn</a>
              <a href={site.links.instagram} target="_blank" rel="noreferrer" className="hover:text-gold">Instagram</a>
              <a href={site.links.x} target="_blank" rel="noreferrer" className="hover:text-gold">X</a>
              <a href={site.links.resume} target="_blank" rel="noreferrer" className="hover:text-gold">Résumé (PDF)</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-ink pb-8 text-bone/55">
        <div className={`${container} flex flex-wrap items-center justify-between gap-3 border-t border-bone/10 pt-6 text-xs`}>
          <p>
            © {new Date().getFullYear()} {site.brand} · {site.fullName}
          </p>
          <a href={site.footerLabel.href} target="_blank" rel="noreferrer" className="mono hover:text-gold">
            {site.footerLabel.text.toUpperCase()}: {site.footerLabel.name} ↗
          </a>
        </div>
      </footer>
    </>
  );
}
