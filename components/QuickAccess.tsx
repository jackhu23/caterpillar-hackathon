import Image from "next/image";
import { ArrowRight, HardHat, MapPin, TrendingUp, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Destination = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  image: string;
  alt: string;
};

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=900&q=75&auto=format&fit=crop`;

const destinations: Destination[] = [
  {
    title: "Equipment",
    description: "Machines, engines and technology for every kind of job.",
    href: "#equipment",
    icon: Truck,
    image: unsplash("1580901368919-7738efb0f87e"),
    alt: "Yellow excavator on a rocky mountain worksite",
  },
  {
    title: "Dealers",
    description: "Sales, service and parts from a Cat dealer near you.",
    href: "#dealers",
    icon: MapPin,
    image: unsplash("1504917595217-d4dc5ebe6122"),
    alt: "Technician grinding metal in a service shop, sparks flying",
  },
  {
    title: "Careers",
    description: "Open roles in engineering, manufacturing, technology and more.",
    href: "#careers",
    icon: HardHat,
    image: unsplash("1621905251189-08b45d6a269e"),
    alt: "Worker in a yellow hard hat wiring an electrical panel",
  },
  {
    title: "Investors",
    description: "Financial results, shareholder resources and governance.",
    href: "#investors",
    icon: TrendingUp,
    image: unsplash("1486406146926-c627a92ad1ab"),
    alt: "Office towers seen from street level against a pale sky",
  },
];

export default function QuickAccess() {
  return (
    <section aria-label="What are you looking for?" className="bg-concrete">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-4xl leading-none font-bold tracking-tight text-iron md:text-5xl">
            What are you looking for?
          </h2>
          <p className="text-steel">Quick access to the things that matter most.</p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map(({ title, description, href, icon: Icon, image, alt }) => (
            <li key={title}>
              <a
                href={href}
                className="group relative flex h-full flex-col overflow-hidden rounded-[2px] border border-iron/10 bg-paper transition-colors hover:border-iron focus-visible:border-iron"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-iron">
                  <Image
                    src={image}
                    alt={alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transform-none"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-[2px] bg-iron text-cat-yellow">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="font-display text-2xl leading-none font-bold text-iron">
                      {title}
                    </h3>
                  </div>
                  <p className="mt-4 max-w-[32ch] text-[15px] leading-snug text-steel">
                    {description}
                  </p>
                  <div className="mt-auto flex justify-end pt-6">
                    <ArrowRight
                      className="size-5 text-iron transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transform-none"
                      aria-hidden
                    />
                  </div>
                </div>

                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-cat-yellow transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
