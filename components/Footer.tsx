import { CatWordmark } from "@/components/Nav";

const columns = [
  {
    title: "Company",
    links: ["Our story", "Leadership", "Sustainability", "News", "Contact us"],
  },
  {
    title: "Careers",
    links: ["Search open roles", "Students and graduates", "Life at Cat", "Benefits", "Veterans"],
  },
  {
    title: "Investors",
    links: ["Financial results", "Annual report", "Stock information", "Governance"],
  },
  {
    title: "Products",
    links: ["Equipment", "Engines and turbines", "Parts and service", "Find a dealer"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms of use", "Cookie settings", "Accessibility"],
  },
];

const socials = [
  {
    name: "LinkedIn",
    path: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.53 4.78 5.82v5.63h-4v-5c0-1.2-.02-2.73-1.7-2.73-1.7 0-1.95 1.3-1.95 2.64v5.09h-4.75v-11Z",
  },
  {
    name: "YouTube",
    path: "M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.4-1.6.5-3.2.5-4.8s-.1-3.2-.5-4.8ZM9.75 15.1V8.9L15.5 12l-5.75 3.1Z",
  },
  {
    name: "Facebook",
    path: "M13.5 21.5v-8h2.7l.4-3.2h-3.1V8.3c0-.9.3-1.6 1.6-1.6h1.7V3.9a22 22 0 0 0-2.5-.1c-2.4 0-4.1 1.5-4.1 4.2v2.3H7.5v3.2h2.7v8h3.3Z",
  },
  {
    name: "Instagram",
    path: "M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm6-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM12 3.6c2.7 0 3 0 4.1.06 2.7.12 4 1.4 4.1 4.1.06 1.1.06 1.4.06 4.1s0 3-.06 4.1c-.12 2.7-1.4 4-4.1 4.1-1.1.06-1.4.06-4.1.06s-3 0-4.1-.06c-2.7-.12-4-1.4-4.1-4.1C3.6 15 3.6 14.7 3.6 12s0-3 .06-4.1c.12-2.7 1.4-4 4.1-4.1C8.9 3.6 9.3 3.6 12 3.6ZM12 2c-2.7 0-3.1 0-4.2.06C4.2 2.2 2.2 4.2 2.06 7.8 2 8.9 2 9.3 2 12s0 3.1.06 4.2c.16 3.6 2.14 5.6 5.74 5.74C8.9 22 9.3 22 12 22s3.1 0 4.2-.06c3.6-.16 5.6-2.14 5.74-5.74C22 15.1 22 14.7 22 12s0-3.1-.06-4.2C21.8 4.2 19.8 2.2 16.2 2.06 15.1 2 14.7 2 12 2Z",
  },
];

export default function Footer() {
  return (
    <footer className="bg-iron text-paper">
      <div className="mx-auto max-w-[1280px] px-6 pt-16 pb-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_3fr]">
          <div className="max-w-xs">
            <CatWordmark className="text-[2.75rem]" />
            <p className="mt-5 text-[15px] leading-relaxed text-paper/70">
              Equipment, engines and people building the world&rsquo;s
              infrastructure since 1925.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5"
          >
            {columns.map((column) => (
              <div key={column.title}>
                <h2 className="font-display text-lg font-bold text-cat-yellow">
                  {column.title}
                </h2>
                <ul className="mt-4 space-y-2.5 text-[15px] text-paper/75">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="underline-offset-4 hover:text-paper hover:underline"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col-reverse gap-6 border-t border-steel/50 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-paper/60">
            &copy; {new Date().getFullYear()} Caterpillar. All rights reserved.
          </p>
          <ul className="flex gap-2">
            {socials.map((social) => (
              <li key={social.name}>
                <a
                  href="#"
                  aria-label={`Caterpillar on ${social.name}`}
                  className="grid size-10 place-items-center rounded-machined border border-steel/60 text-paper/80 transition-colors hover:border-cat-yellow hover:text-cat-yellow"
                >
                  <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
                    <path d={social.path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
