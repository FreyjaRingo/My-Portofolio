import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogSize = { width: 1200, height: 630 };

const font = (pkg: string, file: string) => readFile(join(process.cwd(), "node_modules/@fontsource", pkg, "files", file));

export async function renderOg({ code, kicker, title, sub }: { code: string; kicker: string; title: string; sub: string }) {
  const [sans600, mono500] = await Promise.all([
    font("ibm-plex-sans", "ibm-plex-sans-latin-600-normal.woff"),
    font("ibm-plex-mono", "ibm-plex-mono-latin-500-normal.woff"),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#000", color: "#ece6d6", padding: "64px 72px", fontFamily: "Plex Sans" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: "Plex Mono", fontSize: 26 }}>
          <span style={{ background: "#ffa028", color: "#1a1000", padding: "4px 12px" }}>{code}</span>
          <span style={{ color: "#ffa028" }}>{kicker}</span>
        </div>
        <div style={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontSize: title.length > 40 ? 64 : 80, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>{title}</div>
          <div style={{ fontSize: 30, color: "#b9b2a0", marginTop: 28, maxWidth: 960, lineHeight: 1.35 }}>{sub}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "2px solid #2b271f", paddingTop: 24, fontFamily: "Plex Mono", fontSize: 24, color: "#8a8473" }}>
          <span>Athallah Azhar Aulia Hadi</span>
          <span style={{ color: "#34d27f" }}>Data · AI · Markets</span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Plex Sans", data: sans600, style: "normal", weight: 600 },
        { name: "Plex Mono", data: mono500, style: "normal", weight: 500 },
      ],
    },
  );
}
