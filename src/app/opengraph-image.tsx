import { ogSize, renderOg } from "@/lib/og";

export const alt = "Athallah Azhar Aulia Hadi, data and AI portfolio";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    code: "ATHL.JK",
    kicker: "Portfolio",
    title: "Athallah Azhar Aulia Hadi",
    sub: "Data products, machine learning, and investment research. Informatics Engineering, Universitas Padjadjaran.",
  });
}
