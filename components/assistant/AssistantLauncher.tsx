"use client";

// Floating button that opens the Cat AI Assistant. Owned by issue #7.
import { MessageSquare } from "lucide-react";
import { useAssistant } from "@/lib/assistant-store";

export default function AssistantLauncher() {
  const { isOpen, open } = useAssistant();
  if (isOpen) return null;

  return (
    <button
      type="button"
      onClick={() => open()}
      className="fixed right-6 bottom-6 z-40 flex items-center gap-2 rounded-full bg-cat-yellow px-5 py-3 font-semibold text-iron shadow-lg transition-transform hover:scale-105"
    >
      <MessageSquare className="size-5" aria-hidden />
      Ask Cat AI
    </button>
  );
}
