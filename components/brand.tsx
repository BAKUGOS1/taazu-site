// Server-only: brand kit ki files hain to unko use karta hai, warna placeholder.
import { SITE } from "@/content/site";
import { hasPublic } from "@/lib/assets";

export function Logo({ variant }: { variant: "header" | "footer" }) {
  const src = variant === "header" ? SITE.brand.headerLogo : SITE.brand.footerLogo;
  if (hasPublic(src)) {
    return <img src={src} alt="Taazu" className={"logo-img logo-img-" + variant} />;
  }
  return (
    <span className="logo-ph">
      <svg viewBox="0 0 100 120" aria-hidden="true"><use href="#logo-drop" /></svg>
      <span className="logo-word">Taazu</span>
    </span>
  );
}

export function Seal() {
  if (hasPublic(SITE.brand.seal)) {
    return <img src={SITE.brand.seal} alt="Taazu seal: Taazu, Amdavad, Paani se aage" className="seal" />;
  }
  return (
    <svg className="seal" viewBox="0 0 120 120" role="img" aria-label="Made in Ahmedabad">
      <defs><path id="seal-circle" d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0" /></defs>
      <circle cx="60" cy="60" r="58" fill="#F5D83B" stroke="#1C1917" strokeWidth="2" />
      <circle cx="60" cy="60" r="31" fill="#FFF8E7" /><circle cx="60" cy="60" r="31" fill="none" stroke="#1C1917" strokeWidth="1.5" strokeDasharray="3 4" />
      <text fontWeight="700" fontSize="10.5" fill="#1C1917" style={{ fontFamily: "var(--font-jakarta), sans-serif" }}>
        <textPath href="#seal-circle" textLength="266" lengthAdjust="spacing">MADE IN AHMEDABAD · #TAAZURAHO ·</textPath>
      </text>
      {hasPublic(SITE.brand.dropIcon) ? (
        <image href={SITE.brand.dropIcon} x="42" y="34" width="36" height="51" />
      ) : (
        <svg x="44" y="40" width="32" height="40" viewBox="0 0 100 120"><use href="#logo-drop" /></svg>
      )}
    </svg>
  );
}
