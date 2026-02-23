"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AI_CHAT_INTRO } from "@/lib/portfolio-data";
import { useChat, type UIMessage } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

const INITIAL_MESSAGES: UIMessage[] = [
  {
    id: "msg-1",
    role: "assistant",
    parts: [{ type: "text", text: AI_CHAT_INTRO.aiGreeting }],
  },
  {
    id: "msg-2",
    role: "assistant",
    parts: [{ type: "text", text: AI_CHAT_INTRO.aiSpecialty }],
  },
  {
    id: "msg-3",
    role: "user",
    parts: [{ type: "text", text: AI_CHAT_INTRO.guestQuestion }],
  },
];

function getMessageText(msg: UIMessage): string {
  return msg.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");
}

/**
 * AskMeAnything — CLI-styled terminal chat UI.
 * Streams real answers from Gemini 2.0 Flash via /api/chat.
 */
export function AskMeAnything() {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    messages: INITIAL_MESSAGES,
  });

  // Show indicator while waiting for the first token
  const isTyping = status === "submitted";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || status === "submitted" || status === "streaming")
      return;
    sendMessage({ text: input.trim() });
    setInput("");
  };

  return (
    <motion.section
      id="about"
      className="mb-32"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Section header */}
      <div className="mb-8">
        <h2
          className={cn(
            "text-2xl font-bold uppercase flex items-center gap-2",
            "text-neutral-900 dark:text-white"
          )}
        >
          <span className="text-primary">&gt;</span> Ask Me Anything
        </h2>
        <p className="text-neutral-500 text-sm mt-2">
          Interacting with my AI representation trained on my career history.
        </p>
      </div>

      {/* Terminal window */}
      <div
        className={cn(
          "border overflow-hidden",
          "border-black/10 bg-cream-surface",
          "dark:border-white/10 dark:bg-terminal-surface"
        )}
      >
        {/* Terminal title bar */}
        <div
          className={cn(
            "px-4 py-2 border-b flex justify-between items-center",
            "bg-black/5 border-black/10",
            "dark:bg-white/5 dark:border-white/10"
          )}
        >
          <span className="text-[10px] uppercase text-neutral-500 tracking-wider">
            Shell: zsh — DigitalTwin.session
          </span>
          <div className="flex gap-2" aria-hidden="true">
            <div className="w-2 h-2 rounded-full bg-red-500/60" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
            <div className="w-2 h-2 rounded-full bg-green-500/60" />
          </div>
        </div>

        {/* Messages */}
        <div className="p-3 sm:p-6 font-mono text-sm space-y-3 sm:space-y-6 min-h-[240px] sm:min-h-[360px] max-h-[360px] sm:max-h-[480px] overflow-y-auto">
          {messages.map((msg) => (
            <div key={msg.id} className="flex gap-4">
              <span
                className={cn(
                  "font-bold shrink-0",
                  msg.role === "assistant"
                    ? "text-primary"
                    : "text-neutral-900 dark:text-white"
                )}
              >
                {msg.role === "assistant" ? "[AI]:" : "[GUEST@ROOT]:"}
              </span>
              <p
                className={cn(
                  "leading-relaxed",
                  msg.role === "assistant"
                    ? "text-neutral-700 dark:text-neutral-300"
                    : "text-primary"
                )}
              >
                {getMessageText(msg)}
              </p>
            </div>
          ))}

          {/* Typing indicator — shown while waiting for first token */}
          {isTyping && (
            <div className="flex gap-4">
              <span className="text-primary font-bold shrink-0">[AI]:</span>
              <span
                className="cli-cursor animate-blink"
                aria-label="AI is typing"
              />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input bar */}
        <form
          onSubmit={handleSubmit}
          className={cn(
            "p-3 sm:p-4 border-t",
            "bg-black/10 border-black/10",
            "dark:bg-black/40 dark:border-white/10"
          )}
        >
          <div className="flex items-center gap-3">
            <span className="text-primary font-bold shrink-0">&gt;&gt;&gt;</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about my tech stack..."
              disabled={status === "submitted" || status === "streaming"}
              className={cn(
                "flex-1 bg-transparent border-none outline-none focus:ring-0",
                "text-primary placeholder-neutral-600 text-sm"
              )}
              aria-label="Ask the AI a question"
            />
          </div>
        </form>
      </div>
    </motion.section>
  );
}
