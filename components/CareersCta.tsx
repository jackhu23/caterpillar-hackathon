const areas = [
  {
    name: "Engineering",
    detail: "Design engines, electrified drivetrains and autonomy systems.",
  },
  {
    name: "Manufacturing",
    detail: "Build and weld the machines in plants around the world.",
  },
  {
    name: "Internships",
    detail: "Spend a paid summer on real projects with Cat teams.",
  },
];

export default function CareersCta() {
  return (
    <section
      aria-label="Careers at Cat"
      id="careers"
      className="bg-cat-yellow py-20 text-iron sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-20">
        <div>
          <h2 className="font-display text-6xl leading-[0.9] font-black tracking-tight sm:text-7xl lg:text-8xl">
            Build a brighter future with us
          </h2>
          <p className="mt-8 max-w-[52ch] text-lg leading-relaxed font-medium sm:text-xl">
            Engineers, technicians, welders and data scientists build their
            careers at Cat, with hands-on training and room to grow across teams
            on every continent.
          </p>
          <a
            href="#"
            className="mt-10 inline-flex items-center rounded-machined bg-iron px-7 py-4 text-lg font-semibold text-paper transition-colors hover:bg-iron/85 focus-visible:outline-iron"
          >
            Search open roles
          </a>
        </div>

        <ul className="self-end border-t-4 border-iron">
          {areas.map((area) => (
            <li key={area.name} className="border-b-2 border-iron">
              <a
                href="#"
                className="group block py-6 focus-visible:outline-iron"
              >
                <span className="font-display text-3xl font-extrabold sm:text-4xl">
                  <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_3px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_3px]">
                    {area.name}
                  </span>
                </span>
                <span className="mt-1 block text-base text-iron/75">
                  {area.detail}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
