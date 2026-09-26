import { ImageResponse } from "next/og";

export const alt = "Taazu: Paani se aage. Amdavad's own electrolyte drink.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// [[PLACEHOLDER: OG image]] Apni 1200x630 image chahiye to is file ko hata ke app/opengraph-image.png rakh do.
export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px", background: "#EA580C", color: "#FFF8E7", position: "relative" }}>
        <div style={{ display: "flex", position: "absolute", right: "-90px", top: "-90px", width: "420px", height: "420px", borderRadius: "210px", background: "#F5D83B" }} />
        <div style={{ display: "flex", alignSelf: "flex-start", fontSize: 44, fontWeight: 700, color: "#1C1917", background: "#F5D83B", padding: "8px 28px", borderRadius: "999px" }}>Taazu</div>
        <div style={{ display: "flex", fontSize: 128, fontWeight: 800, marginTop: 30, lineHeight: 1 }}>Paani se aage.</div>
        <div style={{ display: "flex", fontSize: 40, marginTop: 28 }}>Amdavad&apos;s own nimbu-namak electrolyte drink</div>
        <div style={{ display: "flex", fontSize: 30, marginTop: 40, color: "#1C1917" }}>#TaazuRaho · Made in Ahmedabad</div>
      </div>
    ),
    { ...size }
  );
}
