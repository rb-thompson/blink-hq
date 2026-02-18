import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BLINK HQ ⚡ Mission Control",
  description: "AI agent orchestration dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
