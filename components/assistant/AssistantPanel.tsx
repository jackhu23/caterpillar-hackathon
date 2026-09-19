"use client";

// The Cat AI Assistant side panel (issue #7), modeled on the parts.cat.com assistant.
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import clsx from "clsx";
import {
  Copy,
  Check,
  CircleHelp,
  CirclePlus,
  ExternalLink,
  Menu,
  Mic,
  Minus,
  RefreshCw,
  SendHorizontal,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { useAssistant } from "@/lib/assistant-store";
import { SUGGESTED_PROMPTS, getReply, type Reply } from "./replies";

const MAX_CHARS = 500;
const TYPING_MS = 800;

type Message =
  | { id: number; role: "user"; text: string }
  | ({ id: number; role: "assistant" } & Reply);

type Feedback = "up" | "down";

function CatMark() {
  return (
    <span
      aria-hidden
      className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-iron"
    >
      <svg viewBox="0 0 24 24" className="size-5">
        <path d="M12 4 21 20H3Z" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M12 12.5 16.2 20H7.8Z" fill="var(--color-cat-yellow)" />
      </svg>
    </span>
  );
}

function IconButton({
  label,
  onClick,
  pressed,
  children,
}: {
  label: string;
  onClick?: () => void;
  pressed?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      title={label}
      onClick={onClick}
      className={clsx(
        "grid size-9 place-items-center rounded-full text-iron transition-colors hover:bg-iron/8",
        pressed && "bg-cat-yellow hover:bg-cat-yellow",
      )}
    >
      {children}
    </button>
  );
}

function AssistantName() {
  return (
    <>
      Cat<sup className="text-[0.6em]">®</sup> AI Assistant<sup className="text-[0.6em]">™</sup>
    </>
  );
}

export default function AssistantPanel() {
  const { isOpen, close, consumePrompt } = useAssistant();
  const reduceMotion = useReducedMotion();

  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<Record<number, Feedback>>({});

  const nextId = useRef(1);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const reply = useCallback((question: string) => {
    setTyping(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: nextId.current++, role: "assistant", ...getReply(question) },
      ]);
      setTyping(false);
    }, TYPING_MS);
  }, []);

  const send = useCallback(
    (raw: string) => {
      const text = raw.trim().slice(0, MAX_CHARS);
      if (!text) return;
      setMessages((m) => [...m, { id: nextId.current++, role: "user", text }]);
      setInput("");
      reply(text);
    },
    [reply],
  );

  const regenerate = () => {
    const lastQuestion = [...messages].reverse().find((m) => m.role === "user");
    if (!lastQuestion || typing) return;
    setMessages((m) => (m.at(-1)?.role === "assistant" ? m.slice(0, -1) : m));
    reply(lastQuestion.text);
  };

  const newChat = () => {
    if (timer.current) clearTimeout(timer.current);
    setMessages([]);
    setTyping(false);
    setInput("");
    setFeedback({});
    inputRef.current?.focus();
  };

  const copy = async (id: number, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId((c) => (c === id ? null : c)), 1500);
    } catch {
      // Clipboard can be blocked outside secure contexts; nothing to recover.
    }
  };

  const rate = (id: number, value: Feedback) =>
    setFeedback((f) => {
      const next = { ...f };
      if (next[id] === value) delete next[id];
      else next[id] = value;
      return next;
    });

  // A question handed over by the Hero ask bar becomes the first message.
  useEffect(() => {
    if (!isOpen) return;
    const pending = consumePrompt();
    if (pending) send(pending);
    inputRef.current?.focus();
  }, [isOpen, consumePrompt, send]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "end" });
  }, [messages, typing, reduceMotion]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const lastAssistantId = [...messages].reverse().find((m) => m.role === "assistant")?.id;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          role="dialog"
          aria-label="Cat AI Assistant"
          initial={reduceMotion ? { opacity: 0 } : { x: "105%" }}
          animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { x: "105%" }}
          transition={{ type: "spring", stiffness: 380, damping: 38 }}
          className="fixed inset-0 z-50 flex flex-col bg-[#f2f2f2] text-iron shadow-[0_24px_64px_rgba(0,0,0,0.35)] sm:inset-y-4 sm:right-4 sm:left-auto sm:w-[440px] sm:rounded-[28px]"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 pt-4">
            <IconButton label="Conversation history">
              <Menu className="size-5" />
            </IconButton>
            <IconButton label="Minimize assistant" onClick={close}>
              <Minus className="size-5" />
            </IconButton>
          </div>

          {/* Title row */}
          <div className="flex items-center justify-between border-b border-iron/10 px-6 pt-3 pb-4">
            <h2 className="font-display text-[1.65rem] leading-none font-bold">
              <AssistantName />
            </h2>
            <div className="flex gap-1">
              <IconButton label="Help">
                <CircleHelp className="size-5" />
              </IconButton>
              <IconButton label="Start a new chat" onClick={newChat}>
                <CirclePlus className="size-5" />
              </IconButton>
            </div>
          </div>

          {/* Conversation */}
          <div className="flex-1 overflow-y-auto px-6 py-5" aria-live="polite">
            <div className="flex items-center gap-3">
              <CatMark />
              <span className="font-medium">
                <AssistantName />
              </span>
            </div>
            <div className="mt-3 space-y-3 text-[1.02rem] leading-relaxed">
              <p>
                Hello. Welcome to the <AssistantName />.
              </p>
              <p>
                Ask me about what Caterpillar builds, the industries we power, or careers at
                Cat. Type a question below, or choose one to start.
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => send(prompt)}
                  disabled={typing}
                  className="rounded-[4px] border-[1.5px] border-iron bg-paper px-3.5 py-2 text-[0.95rem] font-semibold transition-colors hover:bg-cat-yellow disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <ul className="mt-6 space-y-5">
              {messages.map((m) =>
                m.role === "user" ? (
                  <li key={m.id} className="flex justify-end">
                    <p className="max-w-[85%] rounded-2xl rounded-br-[4px] bg-iron px-4 py-2.5 text-paper">
                      {m.text}
                    </p>
                  </li>
                ) : (
                  <li key={m.id}>
                    <div className="flex items-center gap-3">
                      <CatMark />
                      <span className="font-medium">
                        <AssistantName />
                      </span>
                    </div>
                    <p className="mt-2 leading-relaxed">{m.text}</p>
                    {m.link && (
                      <a
                        href={m.link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex items-center gap-1.5 font-semibold underline decoration-cat-yellow decoration-2 underline-offset-4 hover:decoration-iron"
                      >
                        {m.link.label}
                        <ExternalLink className="size-4" aria-hidden />
                      </a>
                    )}
                    <div className="mt-2 -ml-2 flex gap-1 text-steel">
                      {m.id === lastAssistantId && (
                        <IconButton label="Regenerate response" onClick={regenerate}>
                          <RefreshCw className="size-4" />
                        </IconButton>
                      )}
                      <IconButton label="Copy response" onClick={() => copy(m.id, m.text)}>
                        {copiedId === m.id ? <Check className="size-4" /> : <Copy className="size-4" />}
                      </IconButton>
                      <IconButton
                        label="Good response"
                        pressed={feedback[m.id] === "up"}
                        onClick={() => rate(m.id, "up")}
                      >
                        <ThumbsUp className="size-4" />
                      </IconButton>
                      <IconButton
                        label="Bad response"
                        pressed={feedback[m.id] === "down"}
                        onClick={() => rate(m.id, "down")}
                      >
                        <ThumbsDown className="size-4" />
                      </IconButton>
                    </div>
                  </li>
                ),
              )}
            </ul>

            {typing && (
              <div className="mt-5 flex items-center gap-3" aria-label="Cat AI Assistant is typing">
                <CatMark />
                <span className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="size-2 rounded-full bg-iron"
                      animate={reduceMotion ? undefined : { opacity: [0.25, 1, 0.25] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </span>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="px-4 pb-3"
          >
            <div className="rounded-2xl bg-paper px-3 pt-3 pb-2 shadow-[0_1px_0_rgba(0,0,0,0.06)] focus-within:outline-3 focus-within:outline-cat-yellow">
              <div className="flex items-start gap-2">
                <IconButton label="Voice input">
                  <Mic className="size-5" />
                </IconButton>
                <label htmlFor="assistant-input" className="sr-only">
                  Ask anything
                </label>
                <textarea
                  id="assistant-input"
                  ref={inputRef}
                  rows={1}
                  value={input}
                  maxLength={MAX_CHARS}
                  placeholder="Ask anything"
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  className="max-h-32 min-h-9 flex-1 resize-none bg-transparent py-1.5 text-[1.02rem] outline-none placeholder:text-steel focus-visible:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Send"
                  disabled={!input.trim() || typing}
                  className="grid size-9 place-items-center rounded-full bg-cat-yellow text-iron transition-opacity disabled:bg-transparent disabled:text-steel"
                >
                  <SendHorizontal className="size-5" />
                </button>
              </div>
              <p className="pr-1 text-right text-sm text-steel tabular-nums">
                {input.length}/{MAX_CHARS}
              </p>
            </div>
            <p className="mt-2 text-center text-xs text-steel">
              AI responses, review carefully.{" "}
              <a href="#" className="underline underline-offset-2 hover:text-iron">
                AI Terms
              </a>{" "}
              apply.
            </p>
          </form>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
