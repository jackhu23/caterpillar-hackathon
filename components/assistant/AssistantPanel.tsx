"use client";

// Placeholder from the foundation (#1). Replace in issue #7.
import { X } from "lucide-react";
import { useAssistant } from "@/lib/assistant-store";

export default function AssistantPanel() {
  const { isOpen, close, pendingPrompt } = useAssistant();
  if (!isOpen) return null;

  return (
    <aside
      role="dialog"
      aria-label="Cat AI Assistant"
      className="fixed inset-y-4 right-4 z-50 flex w-[min(420px,calc(100vw-2rem))] flex-col rounded-3xl bg-paper p-6 shadow-2xl"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold">Cat® AI Assistant™</h2>
        <button type="button" onClick={close} aria-label="Close assistant">
          <X className="size-5" />
        </button>
      </div>
      <p className="mt-6 text-steel">
        Assistant placeholder (#7).
        {pendingPrompt && <> Pending question: “{pendingPrompt}”</>}
      </p>
    </aside>
  );
}
