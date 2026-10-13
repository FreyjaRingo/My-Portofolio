import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import "./globals.css";
import { CommandPalette } from "@/components/CommandPalette";
import { Header } from "@/components/Header";
import { LangProvider } from "@/components/LangProvider";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Athallah Azhar Aulia Hadi | Data, AI & Markets",
  description:
    "Portfolio of Athallah Azhar Aulia Hadi: Informatics Engineering student at Universitas Padjadjaran building data products, machine learning models, and tools for financial services.",
  openGraph: {
    title: "Athallah Azhar Aulia Hadi",
    description: "Data products, machine learning, and investment research. Informatics Engineering, Universitas Padjadjaran.",
    type: "website",
    siteName: "Athallah Azhar",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <LangProvider>
          <div className="site">
            <a href="#main" className="skip-link">
              Skip to content
            </a>
            <Header />
            <main id="main">{children}</main>
            <footer className="footer">
              <span>© {new Date().getFullYear()} Athallah Azhar Aulia Hadi</span>
              <span className="mono">
                Press <kbd>/</kbd> to search · Not investment advice
              </span>
            </footer>
          </div>
          <CommandPalette />
        </LangProvider>
        <Analytics />
      </body>
    </html>
  );
}
