import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Athallah Azhar Aulia Hadi | Portfolio",
  description:
    "Bloomberg terminal-inspired portfolio for data science, AI, finance strategy, and Japanese JLPT N2 credentials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
