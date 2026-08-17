"use client";

import { ASK_SUGGESTIONS } from "@/lib/portfolio-data";
import { type UIMessage, useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";

function getMessageText(msg: UIMessage): string {
  return msg.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");
}

/**
 * AskDialog — the AI chat as a quiet, native <dialog>.
 * Serif-italic questions, plain prose answers, a ▍ cursor while streaming.
 */
export function AskDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [input, setInput] = useState("");

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Native <dialog> doesn't close on backdrop click — the backdrop IS the
  // dialog element, so a click whose target is the dialog itself is outside
  // the panel. (Effect, not JSX onClick: keeps Biome's a11y rule quiet;
  // keyboard users already have Esc natively.)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onBackdropClick = (e: MouseEvent) => {
      if (e.target === dialog) dialog.close();
    };
    dialog.addEventListener("click", onBackdropClick);
    return () => dialog.removeEventListener("click", onBackdropClick);
  }, []);

  const ask = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    sendMessage({ text: trimmed });
    setInput("");
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="m-auto w-[min(640px,calc(100vw-32px))] rounded-xl border border-hairline bg-surface p-6 text-ink-muted backdrop:bg-paper/70 backdrop:backdrop-blur-sm motion-safe:open:animate-dialog-in"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
        className="flex items-baseline gap-3 border-b border-hairline pb-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ask me anything…"
          aria-label="Ask me anything"
          className="w-full bg-transparent font-mono text-sm tracking-[0.04em] text-ink outline-none placeholder:text-ink-faint"
        />
        <span aria-hidden className="font-mono text-sm text-ink-faint">
          ↵
        </span>
      </form>

      {messages.length === 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {ASK_SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => ask(suggestion)}
              className="rounded-full bg-surface-2 px-3 py-1 font-mono text-xs text-ink-muted transition-colors hover:text-ink"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {messages.length > 0 && (
        <div className="mt-5 flex max-h-[50vh] flex-col gap-4 overflow-y-auto">
          {messages.map((msg) =>
            msg.role === "user" ? (
              <p key={msg.id} className="font-serif italic text-ink">
                "{getMessageText(msg)}"
              </p>
            ) : (
              <p key={msg.id} className="text-sm leading-relaxed">
                {getMessageText(msg)}
              </p>
            )
          )}
          {busy && (
            <span aria-hidden className="animate-blink text-ink">
              ▍
            </span>
          )}
        </div>
      )}
    </dialog>
  );
}
