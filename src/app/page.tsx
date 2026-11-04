import CarryOn from "@/components/CarryOn";
import Closet from "@/components/Closet";
import GuestList from "@/components/GuestList";
import LiveStats from "@/components/LiveStats";
import Mirror from "@/components/Mirror";
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
              <a href="#mirror" className="nav-link">Mirror</a>
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
            note="Projects, a taste of my label, and one hanger saved for you. Open the closet, then rearrange it however you like."
          />
          <Closet />
        </section>

        {/* Carry-on */}
        <section id="carry-on" data-reveal className={`${container} scroll-mt-20 pb-28`}>
          <Head
            no="02 · THE CARRY-ON"
            title="Packed and worn"
            note="My skills, each one an accessory I never travel without. No piece packed twice."
          />
          <CarryOn />
        </section>

        {/* Mirror */}
        <section id="mirror" className="scroll-mt-20 bg-panel py-24">
          <div data-reveal className={container}>
            <Head no="03 · THE MIRROR" title="The reflection" />
            <div className="grid gap-14 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:items-center">
              <Mirror />
              <div className="max-w-prose">
                <p className="display text-4xl sm:text-5xl">{site.fullName}</p>
                <p className="mono mt-2 text-xs text-accent">{site.role.toUpperCase()} · FRONT END TO BACK END</p>
                <div className="mt-6 space-y-5 text-lg leading-relaxed">
                  {site.about.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                <p className="display mt-7 text-3xl text-accent">&ldquo;{site.motto}&rdquo;</p>
                <dl className="mt-8 grid gap-x-8 gap-y-3 border-t border-ink/15 pt-6 sm:grid-cols-2">
                  {site.facts.map((f) => (
                    <div key={f.label}>
                      <dt className="mono text-[0.7rem] text-ink/55">{f.label.toUpperCase()}</dt>
                      <dd className="font-medium">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* Care labels */}
        <section id="experience" data-reveal className={`${container} scroll-mt-20 py-28`}>
          <Head no="04 · CARE LABELS" title="Where it's been worn" note="Experience and education." />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {site.experience.map((job) => (
              <li key={job.role + job.company} className="care">
                <p className="mono text-[0.7rem] text-ink/55">{job.dates || "ONGOING"}</p>
                <p className="mt-3 text-lg font-semibold leading-snug">{job.role}</p>
                <p className="mono mt-1 text-xs text-accent">{job.company.toUpperCase()}</p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/75">{job.summary}</p>
              </li>
            ))}
            <li className="care care-dark">
              <p className="mono text-[0.7rem] text-bone/60">{site.education.dates.toUpperCase()}</p>
              <p className="mt-3 text-lg font-semibold leading-snug">{site.education.program}</p>
              <p className="mono mt-1 text-xs text-gold">{site.education.school.toUpperCase()}</p>
              <p className="display mt-6 text-4xl">{site.education.detail}</p>
            </li>
          </ul>
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
