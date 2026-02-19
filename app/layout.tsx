import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import HealthBanner from "@/components/HealthBanner";

export const metadata: Metadata = {
  title: "BLINK HQ ⚡",
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
        <Sidebar />
        <div className="pl-12 md:pl-12 pl-0">
          <HealthBanner />
          {children}
        </div>
      </body>
    </html>
  );
}
