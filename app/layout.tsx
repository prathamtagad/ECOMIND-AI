import type { Metadata } from "next";
import "./globals.css";
import LayoutShell from "@/components/layout/layout-shell";

export const metadata: Metadata = {
  title: "EcoMind AI — Urban Tree Intelligence Platform",
  description: "AI-powered urban tree health monitoring, pollution analytics, and carbon impact platform for smarter, greener cities.",
  keywords: ["urban forestry", "tree health", "AI", "pollution monitoring", "carbon capture", "smart city"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className="antialiased">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
