import Image from "next/image";

const industries = [
  {
    name: "Construction",
    tagline: "Excavators, loaders and dozers that build roads, homes and cities.",
    image: "photo-1580901368919-7738efb0f87e",
    alt: "Yellow excavator working on a rocky construction site",
  },
  {
    name: "Mining",
    tagline: "Haul trucks and shovels that move the materials modern life runs on.",
    image: "photo-1523848309072-c199db53f137",
    alt: "Haul trucks and an excavator working in an open-pit mine",
  },
  {
    name: "Energy",
    tagline: "Engines, turbines and generators that keep power flowing.",
    image: "photo-1473341304170-971dccb5ac1e",
    alt: "High-voltage power lines at sunset",
  },
  {
    name: "Transportation",
    tagline: "Locomotive and marine power that keeps goods moving worldwide.",
    image: "photo-1494412574643-ff11b0a5c1c3",
    alt: "Container port with cranes loading cargo ships",
  },
];

export default function Industries() {
  return (
    <section aria-label="Industries we power" className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-4 md:px-8">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-5xl leading-none font-extrabold uppercase md:text-6xl">
              Industries we power
            </h2>
            <p className="mt-4 text-lg text-steel">
              Our machines, engines and services work wherever the world gets built,
              mined, powered and moved.
            </p>
          </div>
          <a
            href="#"
            className="self-start font-semibold underline decoration-cat-yellow decoration-2 underline-offset-4 hover:decoration-iron md:self-auto"
          >
            View all industries
          </a>
        </div>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry) => (
            <li key={industry.name}>
              <a
                href="#"
                className="group relative block aspect-[4/5] overflow-hidden rounded-[2px] bg-iron lg:aspect-[3/4]"
              >
                <Image
                  src={`https://images.unsplash.com/${industry.image}?auto=format&fit=crop&w=900&q=75`}
                  alt={industry.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-105 motion-safe:group-focus-visible:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-iron via-iron/40 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-3xl font-bold text-paper">
                    {industry.name}
                  </h3>
                  <p className="mt-2 max-w-[28ch] text-sm leading-snug text-paper/80">
                    {industry.tagline}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-1 w-0 bg-cat-yellow transition-[width] duration-300 group-hover:w-full group-focus-visible:w-full"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
