"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SOCIAL_LINKS } from "@/lib/portfolio-data";

type FormState = {
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

type SubmitStatus = "idle" | "submitting" | "success" | "error";

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address";
  }
  if (!values.message.trim()) {
    errors.message = "Message is required";
  }
  return errors;
}

/**
 * ContactSection — collaborate CTA + email/message form with validation.
 * Uses controlled form state and basic client-side validation.
 */
export function ContactSection() {
  const [form, setForm] = useState<FormState>({ email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("submitting");
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
      setForm({ email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <motion.section
      id="contact"
      className="mb-20"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
    >
      <div
        className={cn(
          "border p-1",
          "border-black/10 dark:border-white/10"
        )}
      >
        <div
          className={cn(
            "p-5 sm:p-10 flex flex-col lg:flex-row gap-6 sm:gap-12 items-center",
            "bg-cream-surface dark:bg-terminal-surface"
          )}
        >
          {/* ── Left — intro ── */}
          <div className="flex-1">
            <h2
              className={cn(
                "text-3xl font-bold uppercase mb-4",
                "text-neutral-900 dark:text-white"
              )}
            >
              Let&apos;s collaborate
            </h2>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Initiate communication protocol for future development.
            </p>

            <div className="flex gap-3 sm:gap-6 mt-8 sm:mt-12 text-[10px] uppercase text-neutral-500 font-bold tracking-wider">
              {SOCIAL_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="hover:text-primary transition-colors duration-150"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* ── Right — form ── */}
          {status === "success" ? (
            <div className="flex-1 w-full flex flex-col items-center justify-center py-6 sm:py-12 space-y-4">
              <span className="text-primary text-5xl font-bold">[OK]</span>
              <p className="text-neutral-900 dark:text-white font-bold uppercase">
                Message Sent
              </p>
              <p className="text-neutral-500 text-sm text-center">
                Transmission received. I&apos;ll reply within 24h.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="text-primary text-[10px] uppercase tracking-widest hover:underline mt-4"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex-1 w-full space-y-4"
              noValidate
            >
              {/* Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-email"
                  className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider"
                >
                  Input_Email:
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={cn(
                    "w-full p-3 sm:p-4 border outline-none text-sm transition-colors duration-150",
                    "bg-cream dark:bg-black/40",
                    "text-neutral-900 dark:text-white",
                    "placeholder-neutral-400 dark:placeholder-neutral-600",
                    errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-black/10 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary"
                  )}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p
                    id="email-error"
                    className="text-[11px] text-red-500 font-bold"
                    role="alert"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider"
                >
                  Input_Message:
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Brief message..."
                  rows={4}
                  className={cn(
                    "w-full p-4 border outline-none text-sm transition-colors duration-150 resize-none",
                    "bg-cream dark:bg-black/40",
                    "text-neutral-900 dark:text-white",
                    "placeholder-neutral-400 dark:placeholder-neutral-600",
                    errors.message
                      ? "border-red-500 focus:border-red-500"
                      : "border-black/10 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary"
                  )}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <p
                    id="message-error"
                    className="text-[11px] text-red-500 font-bold"
                    role="alert"
                  >
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className={cn(
                  "w-full py-3 sm:py-4 font-bold uppercase text-sm",
                  "flex items-center justify-center gap-3 transition-colors duration-150",
                  "bg-primary text-black hover:bg-white",
                  "dark:hover:bg-neutral-200",
                  "disabled:opacity-60 disabled:cursor-not-allowed"
                )}
              >
                {status === "submitting" ? "Transmitting..." : "Execute_Send"}
                <span
                  className="w-2 h-2 bg-black rounded-full animate-pulse"
                  aria-hidden="true"
                />
              </button>

              {status === "error" && (
                <p className="text-[11px] text-red-500 font-bold text-center" role="alert">
                  Transmission failed. Please try again.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </motion.section>
  );
}
