import { site } from "@/data/site";

export default function WorkList() {
  return (
    <ul className="border-t border-black">
      {site.work.map((item) => {
        const title = <span className="display text-3xl md:text-4xl">{item.title}</span>;
        return (
          <li
            key={item.title}
            className="grid gap-4 border-b border-black/20 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-10"
          >
            <div>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="decoration-red decoration-2 underline-offset-6 hover:underline"
                >
                  {title}
                  <span className="ml-2 align-top text-base text-red" aria-hidden>↗</span>
                </a>
              ) : (
                title
              )}
              <p className="mt-2 text-sm text-muted">
                {item.role}, {item.year}
              </p>
              {item.status && (
                <p className="mt-3 inline-flex items-center gap-2 border border-black/30 px-2.5 py-1 text-xs font-semibold">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${item.status === "In progress" ? "bg-green" : "bg-muted"}`}
                    aria-hidden
                  />
                  {item.status}
                </p>
              )}
            </div>
            <div className="max-w-prose">
              <p className="text-lg leading-relaxed">{item.summary}</p>
              {item.points && (
                <ul className="mt-4 space-y-2">
                  {item.points.map((pt) => (
                    <li key={pt} className="flex gap-3 leading-relaxed text-black/80">
                      <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-red" aria-hidden />
                      {pt}
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-4 text-sm font-semibold text-green">{item.stack.join(", ")}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}