
import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/components/ui/providers/QueryProvider";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "My Todos App",
  description: "A modern task manager",
};

// BEST WAY: SSR SAFE FONT LOADING
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased max-w-[1320px] px-4 md:px-6 mx-auto font-sans">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
