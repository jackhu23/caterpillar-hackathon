"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

type Stat = { value: number; suffix?: string; label: string };

const stats: Stat[] = [
  { value: 100, label: "years of building, since 1925" },
  { value: 110000, label: "people on the Cat team" },
  { value: 190, suffix: "+", label: "countries where our machines work" },
  { value: 150, suffix: "+", label: "independent dealers worldwide" },
];

const format = (n: number) => Math.round(n).toLocaleString("en-US");

function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduceMotion = useReducedMotion();

  // Start from zero on the client only when we're going to animate, so
  // server-rendered and reduced-motion visitors always see the real number.
  useEffect(() => {
    if (reduceMotion || !ref.current) return;
    ref.current.textContent = format(0) + suffix;
  }, [reduceMotion, suffix]);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (node) node.textContent = format(v) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {format(value) + suffix}
    </span>
  );
}

export default function About() {
  return (
    <section
      aria-label="About Caterpillar"
      id="about"
      className="bg-concrete py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
          <div>
            <h2 className="font-display text-5xl leading-[0.95] font-extrabold tracking-tight text-iron sm:text-6xl lg:text-7xl">
              A hundred years of heavy lifting
            </h2>
            <div className="mt-8 max-w-[62ch] space-y-5 text-lg leading-relaxed text-iron/80">
              <p>
                Caterpillar began in 1925, when two California tractor makers
                joined forces. Today we&rsquo;re the world&rsquo;s leading
                maker of construction and mining equipment, off-highway engines,
                industrial gas turbines and diesel-electric locomotives.
              </p>
              <p>
                Our machines dig the mines, pave the roads and keep the power on
                for hospitals and data centers. From our headquarters in Irving,
                Texas, we work alongside independent dealers who sell and service
                Cat equipment close to where it works.
              </p>
              <p>
                What&rsquo;s next is already on site: autonomous haul trucks
                running around the clock, and battery-electric machines built to
                cut jobsite emissions.
              </p>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-machined bg-steel">
            <Image
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80"
              alt="Crew and heavy equipment at work on a construction site"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-2 border-t-4 border-cat-yellow bg-iron lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={[
                "flex flex-col-reverse justify-end gap-3 px-6 py-8 sm:px-8 sm:py-10",
                i % 2 === 1 ? "border-l border-steel/60" : "",
                i >= 2 ? "border-t border-steel/60 lg:border-t-0" : "",
                i === 2 ? "lg:border-l" : "",
              ].join(" ")}
            >
              <dt className="max-w-[22ch] text-base leading-snug text-paper/85">
                {stat.label}
              </dt>
              <dd className="font-display text-5xl leading-none font-black text-cat-yellow sm:text-6xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
