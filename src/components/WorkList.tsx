import { site } from "@/data/site";

export default function WorkList() {
  return (
    <ul className="border-t border-black">
      {site.work.map((item) => {
        const title = <span className="display text-3xl md:text-4xl">{item.title}</span>;
        return (
          <li
            key={item.title}
            className="grid gap-3 border-b border-black/20 py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-10"
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
                </a>
              ) : (
                title
              )}
              <p className="mt-2 text-sm text-muted">{item.role}</p>
            </div>
            <div className="max-w-prose">
              <p className="text-lg leading-relaxed">{item.summary}</p>
              <p className="mt-3 text-sm font-semibold text-green">{item.stack.join(", ")}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}