import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Outfit } from "next/font/google";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { CommandPalette } from "@/components/CommandPalette";
import { RecentlyViewedTracker } from "@/components/RecentlyViewedTracker";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "OpsDeck",
    template: "%s · OpsDeck",
  },
  description:
    "The cloud-native command center for DevOps engineers — searchable cheatsheets, interactive command explainers, and validators for Docker, Kubernetes, Terraform, and more. Everything runs in your browser.",
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#05060a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

// Static, hardcoded script — no user input is ever interpolated here. Runs
// before paint so the stored/OS theme applies immediately, avoiding a
// flash of the wrong theme (the standard pattern for runtime theme toggles).
const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('opsdeck-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${outfit.variable} font-sans antialiased`}
      >
        {children}
        <RecentlyViewedTracker />
        <CommandPalette />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
