import { Nav } from "@/components/Nav";
import { ThemeProvider } from "@/components/ThemeProvider";
import { MotionConfig } from "framer-motion";
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/portfolio-data";

/* ─── Fonts ─────────────────────────────────────────────────────────── */
const sourceSerif = Source_Serif_4({
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

/* ─── Metadata ───────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.title,
    template: "%s — Harsh",
  },
  description: SITE_CONFIG.description,
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

/* ─── Root Layout ────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sourceSerif.variable} ${inter.variable} ${jetbrainsMono.variable} font-body antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MotionConfig reducedMotion="user">
            <Nav />
            {children}
          </MotionConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}
