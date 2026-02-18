import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BLINK HQ ⚡ Visualizer",
  description: "8-bit retro office visualizer for the Blink AI agent squad",
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
