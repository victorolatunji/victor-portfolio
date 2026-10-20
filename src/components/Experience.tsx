import { site } from "@/data/site";

export default function Experience() {
  const { education: edu } = site;
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
      <ol className="border-t border-black">
        {site.experience.map((job) => (
          <li
            key={job.role + job.company}
            className="grid gap-2 border-b border-black/20 py-6 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-8"
          >
            <p className="text-sm font-semibold text-muted">{job.dates}</p>
            <div>
              <p className="display text-xl">{job.role}</p>
              <p className="text-sm font-semibold text-red">{job.company}</p>
              <p className="mt-2 leading-relaxed">{job.summary}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="self-start bg-black p-7 text-bone">
        <p className="text-xs font-semibold text-bone/55">Education</p>
        <p className="display mt-3 text-2xl">{edu.program}</p>
        <p className="mt-1 font-semibold text-lime">{edu.school}</p>
        <div className="mt-6 flex items-end justify-between border-t border-bone/15 pt-4">
          <p className="text-sm text-bone/70">{edu.dates}</p>
          <p className="display text-2xl">{edu.detail}</p>
        </div>
      </div>
    </div>
  );
}