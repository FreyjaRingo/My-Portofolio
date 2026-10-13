import type { Metadata, Viewport } from "next";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-sans/700.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import "@fontsource/ibm-plex-sans-jp/500.css";
import "@fontsource/ibm-plex-sans-jp/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Athallah Azhar Aulia Hadi | Data, AI & Markets",
  description:
    "Portfolio of Athallah Azhar Aulia Hadi: Informatics Engineering student at Universitas Padjadjaran working on data products, machine learning, and investment research.",
  openGraph: {
    title: "Athallah Azhar Aulia Hadi",
    description:
      "Data products, machine learning, and investment research. Informatics Engineering, Universitas Padjadjaran.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
