"use client";

import { create } from "zustand";

type AssistantState = {
  isOpen: boolean;
  /** A question handed over by another part of the page (e.g. the Hero ask bar). */
  pendingPrompt: string | null;
  open: (prompt?: string) => void;
  close: () => void;
  /** Returns the pending prompt once and clears it, so it is only sent once. */
  consumePrompt: () => string | null;
};

export const useAssistant = create<AssistantState>((set, get) => ({
  isOpen: false,
  pendingPrompt: null,
  open: (prompt) =>
    set({ isOpen: true, pendingPrompt: prompt?.trim() || null }),
  close: () => set({ isOpen: false }),
  consumePrompt: () => {
    const prompt = get().pendingPrompt;
    set({ pendingPrompt: null });
    return prompt;
  },
}));
