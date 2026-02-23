import "@testing-library/jest-dom";
import { vi } from "vitest";

// jsdom does not implement scrollIntoView — provide a stub
window.HTMLElement.prototype.scrollIntoView = vi.fn();

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock next-themes
vi.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "dark",
    setTheme: vi.fn(),
    resolvedTheme: "dark",
  }),
  ThemeProvider: ({ children }: { children: unknown }) => children,
}));

// Mock framer-motion — use a Proxy so any motion.TAG works without enumeration
vi.mock("framer-motion", () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const React = require("react");

  const makeMotionComponent = (tag: string) =>
    // eslint-disable-next-line react/display-name
    function ({
      children,
      // Strip framer-motion-specific props so they don't land on DOM nodes
      initial: _i,
      animate: _a,
      exit: _e,
      whileInView: _wiv,
      viewport: _vp,
      transition: _t,
      variants: _v,
      whileHover: _wh,
      whileTap: _wt,
      layout: _l,
      layoutId: _lid,
      ...rest
    }: Record<string, unknown>) {
      return React.createElement(tag, rest, children);
    };

  // Proxy lets any motion.tagName work without explicit enumeration
  const motionProxy = new Proxy(
    {},
    { get: (_target, key: string) => makeMotionComponent(key) }
  );

  return {
    motion: motionProxy,
    AnimatePresence: ({ children }: { children: unknown }) => children,
    useAnimation: () => ({
      start: vi.fn(),
      stop: vi.fn(),
      set: vi.fn(),
    }),
  };
});

// Mock @ai-sdk/react — return pre-seeded messages so AskMeAnything renders correctly
vi.mock("@ai-sdk/react", async () => {
  const portfolioData = await import("@/lib/portfolio-data");
  return {
    useChat: vi.fn().mockReturnValue({
      messages: [
        {
          id: "msg-1",
          role: "assistant",
          parts: [{ type: "text", text: portfolioData.AI_CHAT_INTRO.aiGreeting }],
        },
        {
          id: "msg-2",
          role: "assistant",
          parts: [{ type: "text", text: portfolioData.AI_CHAT_INTRO.aiSpecialty }],
        },
        {
          id: "msg-3",
          role: "user",
          parts: [{ type: "text", text: portfolioData.AI_CHAT_INTRO.guestQuestion }],
        },
      ],
      sendMessage: vi.fn(),
      status: "ready",
    }),
  };
});

// Mock ai — stub DefaultChatTransport so it doesn't attempt network calls
vi.mock("ai", () => ({
  DefaultChatTransport: vi.fn().mockImplementation(() => ({})),
}));

// Suppress expected React test warnings
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      (args[0].includes("Warning: ReactDOM.render") ||
        args[0].includes("Warning: An update to") ||
        args[0].includes("not wrapped in act"))
    ) {
      return;
    }
    originalError(...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
