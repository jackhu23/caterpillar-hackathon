"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { MessageSquare, SendHorizontal } from "lucide-react";
import { useAssistant } from "@/lib/assistant-store";

const HEADLINE = ["We build what", "moves the world"];
const QUICK_ASKS = ["Open roles near me", "What does Caterpillar do?"];
const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const open = useAssistant((s) => s.open);
  const [question, setQuestion] = useState("");
  const reduceMotion = useReducedMotion();
  // With reduced motion, render the final state immediately.
  const initial = reduceMotion ? false : "hidden";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    open(question);
    setQuestion("");
  }

  return (
    <section
      aria-label="Introduction"
      className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-iron text-paper"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        initial={reduceMotion ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: EASE }}
      >
        <Image
          src="https://images.unsplash.com/photo-1621922688758-359fc864071e?w=2400&q=80"
          alt="Low-angle view of a yellow Cat track-type tractor against the sky"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-iron via-iron/85 to-iron/20" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-iron/80 to-transparent" />
      </motion.div>

      <motion.div
        className="mx-auto w-full max-w-[1280px] px-6 pt-32 pb-16 sm:px-10 md:pb-24"
        initial={initial}
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
      >
        <h1 className="font-display text-[clamp(3.5rem,10vw,9rem)] leading-[0.86] font-extrabold tracking-[-0.01em] uppercase">
          {HEADLINE.map((line) => (
            <span key={line} className="block overflow-hidden pb-[0.04em]">
              <motion.span
                className="block"
                variants={{
                  hidden: { y: "105%" },
                  visible: { y: 0, transition: { duration: 0.9, ease: EASE } },
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: EASE, delay: 0.25 },
            },
          }}
        >
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-paper/80 md:text-xl">
            For almost a century, our machines, engines and people have
            powered construction, mining, energy and transportation in more
            than 190 countries.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-machined bg-cat-yellow px-7 py-4 font-semibold text-iron transition-colors hover:bg-paper"
            >
              Explore Caterpillar
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-machined border border-paper/70 px-7 py-4 font-semibold text-paper transition-colors hover:border-paper hover:bg-paper hover:text-iron"
            >
              Explore equipment
            </a>
          </div>

          <form onSubmit={handleSubmit} className="mt-14 max-w-2xl">
            <label
              htmlFor="hero-ask"
              className="block text-base font-medium text-paper/85"
            >
              Curious about working here or what we build? Ask the Cat AI
              Assistant.
            </label>
            <div className="mt-3 flex items-stretch rounded-machined bg-paper text-iron focus-within:outline-3 focus-within:outline-offset-2 focus-within:outline-cat-yellow">
              <MessageSquare
                className="ml-4 size-5 shrink-0 self-center text-steel"
                aria-hidden
              />
              <input
                id="hero-ask"
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                maxLength={500}
                placeholder="Ask anything about Caterpillar"
                className="min-w-0 flex-1 bg-transparent px-3 py-4 text-lg placeholder:text-steel focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Ask the Cat AI Assistant"
                className="flex w-16 shrink-0 items-center justify-center rounded-r-machined bg-cat-yellow transition-colors hover:bg-iron hover:text-cat-yellow"
              >
                <SendHorizontal className="size-5" aria-hidden />
              </button>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-paper/70">
              <span>Try</span>
              {QUICK_ASKS.map((ask) => (
                <button
                  key={ask}
                  type="button"
                  onClick={() => open(ask)}
                  className="underline decoration-cat-yellow decoration-2 underline-offset-4 transition-colors hover:text-paper"
                >
                  {ask}
                </button>
              ))}
            </div>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
}
