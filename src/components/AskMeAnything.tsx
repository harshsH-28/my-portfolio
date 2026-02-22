"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AI_CHAT_INTRO } from "@/lib/portfolio-data";

type Message = {
  id: string;
  role: "ai" | "guest";
  content: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "msg-1",
    role: "ai",
    content: AI_CHAT_INTRO.aiGreeting,
  },
  {
    id: "msg-2",
    role: "ai",
    content: AI_CHAT_INTRO.aiSpecialty,
  },
  {
    id: "msg-3",
    role: "guest",
    content: AI_CHAT_INTRO.guestQuestion,
  },
];

/**
 * AskMeAnything — CLI-styled terminal chat UI.
 * Shows a simulated conversation with the developer's AI twin.
 */
export function AskMeAnything() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const guestMsg: Message = {
      id: `msg-${Date.now()}`,
      role: "guest",
      content: inputValue.trim(),
    };

    setMessages((prev) => [...prev, guestMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiReply: Message = {
        id: `msg-${Date.now()}-ai`,
        role: "ai",
        content:
          "Processing your query through my knowledge base... This is a portfolio demo — connect with me via the contact form below to start a real conversation.",
      };
      setMessages((prev) => [...prev, aiReply]);
      setIsTyping(false);
    }, 1800);
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
                  msg.role === "ai"
                    ? "text-primary"
                    : "text-neutral-900 dark:text-white"
                )}
              >
                {msg.role === "ai" ? "[AI]:" : "[GUEST@ROOT]:"}
              </span>
              <p
                className={cn(
                  "leading-relaxed",
                  msg.role === "ai"
                    ? "text-neutral-700 dark:text-neutral-300"
                    : "text-primary"
                )}
              >
                {msg.content}
              </p>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-4">
              <span className="text-primary font-bold shrink-0">[AI]:</span>
              <span className="cli-cursor animate-blink" aria-label="AI is typing" />
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
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about my tech stack..."
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
