import Experience from "@/components/Experience";
import Lineup from "@/components/Lineup";
import PlayerCard from "@/components/PlayerCard";
import Typer from "@/components/Typer";
import WorkList from "@/components/WorkList";
import { site } from "@/data/site";

const container = "mx-auto w-full max-w-6xl px-6";
const sectionTitle = "display mb-8 text-4xl sm:text-5xl";

export default function Home() {
  return (
    <>
      <header className={`${container} flex items-center justify-between gap-6 py-6`}>
        <a href="#top" className="display text-3xl">
          {site.brand}
        </a>
        <div className="flex items-center gap-6">
          <a
            href={site.status.href}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 text-sm text-muted hover:text-black lg:flex"
          >
            <span className="h-2 w-2 rounded-full bg-green" aria-hidden />
            {site.status.text}
          </a>
          <nav className="hidden gap-5 text-sm font-semibold sm:flex">
            <a href="#work" className="hover:text-red">Work</a>
            <a href="#experience" className="hover:text-red">Experience</a>
            <a href="#vao" className="hover:text-red">VAO</a>
            <a href="#contact" className="hover:text-red">Contact</a>
          </nav>
          <a
            href={site.links.resume}
            target="_blank"
            rel="noreferrer"
            className="bg-black px-4 py-2 text-sm font-semibold text-bone hover:bg-red"
          >
            Résumé
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section
          className={`${container} grid gap-14 pb-28 pt-8 md:grid-cols-[1.3fr_1fr] md:items-center md:pt-14`}
        >
          <div>
            <p className="text-lg text-muted">{site.greeting}</p>
            <h1 className="display mt-3 text-5xl sm:text-6xl lg:text-7xl">{site.headline}</h1>
            <Typer lines={site.taglines} />
            <p className="mt-6 max-w-xl text-lg leading-relaxed">{site.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={site.links.github}
                target="_blank"
                rel="noreferrer"
                className="bg-red px-6 py-3 font-semibold text-bone hover:bg-black"
              >
                See my work on GitHub
              </a>
              <a
                href={`mailto:${site.email}`}
                className="border-2 border-black px-6 py-3 font-semibold hover:bg-black hover:text-bone"
              >
                Email me
              </a>
            </div>
          </div>
          <PlayerCard />
        </section>

        {/* Work */}
        <section id="work" className={`${container} scroll-mt-8 pb-28`}>
          <h2 className={sectionTitle}>Selected work</h2>
          <WorkList />
        </section>

        {/* Experience */}
        <section id="experience" className={`${container} scroll-mt-8 pb-28`}>
          <h2 className={sectionTitle}>Experience</h2>
          <Experience />
        </section>

        {/* Lineup */}
        <section id="lineup" className={`${container} scroll-mt-8 pb-28`}>
          <h2 className={sectionTitle}>Starting XI</h2>
          <Lineup />
        </section>

        {/* VAO */}
        <section id="vao" className="scroll-mt-8 bg-stone py-24">
          <div className={`${container} grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-10`}>
            <div>
              <p className="display text-7xl sm:text-8xl">{site.brand}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {site.vao.offers.map((o) => (
                  <li key={o} className="bg-black px-3 py-1.5 text-sm font-semibold text-bone">
                    {o}
                  </li>
                ))}
              </ul>
            </div>
            <div className="max-w-prose">
              <h2 className="display text-3xl sm:text-4xl">{site.vao.heading}</h2>
              <p className="mt-5 text-lg leading-relaxed">{site.vao.text}</p>
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent("Collab with VAO")}`}
                className="mt-8 inline-block bg-red px-6 py-3 font-semibold text-bone hover:bg-black"
              >
                {site.vao.cta}
              </a>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className={`${container} scroll-mt-8 py-28`}>
          <div className="grid gap-6 border-t border-black pt-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-10">
            <h2 className="display text-4xl sm:text-5xl">About</h2>
            <div className="max-w-prose space-y-5 text-lg leading-relaxed">
              {site.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p className="display pt-4 text-3xl text-red">&ldquo;{site.motto}&rdquo;</p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-8 bg-black py-28 text-bone">
          <div className={container}>
            <h2 className="display max-w-3xl text-4xl sm:text-6xl">{site.contact.heading}</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-bone/75">{site.contact.text}</p>
            <a
              href={`mailto:${site.email}`}
              className="display mt-8 inline-block break-all text-2xl text-lime hover:text-red sm:text-4xl"
            >
              {site.email}
            </a>
            <div className="mt-10 flex flex-wrap gap-6 text-sm font-semibold">
              <a href={site.links.github} target="_blank" rel="noreferrer" className="hover:text-red">GitHub</a>
              <a href={site.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-red">LinkedIn</a>
              <a href={site.links.instagram} target="_blank" rel="noreferrer" className="hover:text-red">Instagram</a>
              <a href={site.links.x} target="_blank" rel="noreferrer" className="hover:text-red">X</a>
              <a href={site.links.resume} target="_blank" rel="noreferrer" className="hover:text-red">Résumé (PDF)</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black pb-8">
        <p className={`${container} text-xs text-bone/50`}>
          © {new Date().getFullYear()} {site.brand}. Built by Victor.
        </p>
      </footer>
    </>
  );
}