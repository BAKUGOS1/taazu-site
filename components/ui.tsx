import { createElement, type ReactNode } from "react";
import { IS_DEV, waLink } from "@/lib/utils";

export function Sprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <symbol id="lemon" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="#F5D83B" />
        <circle cx="50" cy="50" r="41" fill="#FFF4B8" />
        <path d="M50 11V89M11 50H89M22 22L78 78M78 22L22 78" stroke="#F5D83B" strokeWidth="4" />
        <circle cx="50" cy="50" r="7" fill="#FFF4B8" />
      </symbol>
      <symbol id="drop" viewBox="0 0 100 120">
        <path d="M50 4C50 4 12 52 12 78a38 38 0 0 0 76 0C88 52 50 4 50 4Z" />
      </symbol>
      <symbol id="sun" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="20" fill="currentColor" />
        <path d="M50 8v12M50 80v12M8 50h12M80 50h12M20 20l9 9M71 71l9 9M80 20l-9 9M29 71l-9 9" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      </symbol>
      <symbol id="chat" viewBox="0 0 24 24">
        <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" d="M4 19.5l1.2-3.6A8 8 0 1 1 8.4 19L4 19.5z" />
        <circle cx="8.5" cy="12" r="1.2" fill="currentColor" />
        <circle cx="12" cy="12" r="1.2" fill="currentColor" />
        <circle cx="15.5" cy="12" r="1.2" fill="currentColor" />
      </symbol>
      <symbol id="check" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="currentColor" />
        <path d="M7 12.5l3 3 7-7" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </symbol>
      {/* [[PLACEHOLDER: logo]] brand kit ki SVG na mile tab ka drop icon */}
      <symbol id="logo-drop" viewBox="0 0 100 120">
        <path fill="#EA580C" d="M50 4C50 4 12 52 12 78a38 38 0 0 0 76 0C88 52 50 4 50 4Z" />
        <circle cx="50" cy="78" r="22" fill="#F5D83B" />
        <circle cx="50" cy="78" r="17" fill="#FFF4B8" />
        <path d="M50 61v34M33 78h34M38 66l24 24M62 66L38 90" stroke="#F5D83B" strokeWidth="3" />
      </symbol>
    </svg>
  );
}

export function Use({ id, className, viewBox }: { id: string; className?: string; viewBox?: string }) {
  return (
    <svg className={className} viewBox={viewBox || "0 0 24 24"} aria-hidden="true" focusable="false">
      <use href={"#" + id} />
    </svg>
  );
}

export function WaButton({ message, trackAs, className, children }: { message: string; trackAs: string; className?: string; children: ReactNode }) {
  return (
    <a className={className} href={waLink(message)} target="_blank" rel="noopener" data-track={"whatsapp_" + trackAs}>
      <Use id="chat" className="ic" />
      {children}
    </a>
  );
}

type PhTag = "div" | "span" | "li" | "section" | "p";
// Placeholder wrapper: data bhara ho to dikhta hai. Warna live site pe kuch nahi,
// aur dev mode mein "show placeholders" button se dashed box mein dikhta hai.
export function Ph({ name, show, tag, className, children }: { name: string; show: boolean; tag?: PhTag; className?: string; children: ReactNode }) {
  const t = tag || "div";
  if (show) return createElement(t, { className: className }, children);
  if (!IS_DEV) return null;
  return createElement(t, { className: (className ? className + " " : "") + "ph-dev", "data-ph": name }, children);
}

export function CupIllustration({ id, top, bottom, label }: { id: string; top: string; bottom: string; label: string }) {
  const g = "g-" + id;
  const c = "c-" + id;
  const cup = "M50 70H250L228 350Q226 366 210 366H90Q74 366 72 350Z";
  return (
    <svg className="cup" viewBox="0 -24 300 410" role="img" aria-label={label}>
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset="1" stopColor={bottom} />
        </linearGradient>
        <clipPath id={c}><path d={cup} /></clipPath>
      </defs>
      <g transform="rotate(14 150 200)">
        <rect x="140" y="-8" width="18" height="250" rx="9" fill="#FFF8E7" stroke="#1C1917" strokeOpacity=".2" strokeWidth="2" />
        <g fill="#EA580C">
          <rect x="141" y="8" width="16" height="12" />
          <rect x="141" y="36" width="16" height="12" />
          <rect x="141" y="64" width="16" height="12" />
          <rect x="141" y="92" width="16" height="12" />
        </g>
      </g>
      <g clipPath={"url(#" + c + ")"}>
        <rect x="0" y="0" width="300" height="400" fill="#fff" opacity=".45" />
        <path d="M0 114Q75 100 150 114T300 114V400H0Z" fill={"url(#" + g + ")"} />
        <rect x="84" y="92" width="54" height="48" rx="10" fill="#fff" opacity=".6" transform="rotate(-12 111 116)" />
        <rect x="150" y="100" width="50" height="46" rx="10" fill="#fff" opacity=".5" transform="rotate(14 175 123)" />
        <rect x="110" y="150" width="44" height="40" rx="9" fill="#fff" opacity=".35" transform="rotate(6 132 170)" />
        <rect x="64" y="82" width="12" height="270" rx="6" fill="#fff" opacity=".45" />
      </g>
      <path d={cup} fill="none" stroke="#1C1917" strokeOpacity=".22" strokeWidth="3" />
      <rect x="42" y="62" width="216" height="14" rx="7" fill="#fff" opacity=".85" stroke="#1C1917" strokeOpacity=".15" />
      <rect x="96" y="218" width="108" height="58" rx="14" fill="#EA580C" />
      <text x="150" y="258" textAnchor="middle" fontWeight="800" fontSize="31" fill="#FFF8E7" style={{ fontFamily: "var(--font-baloo), sans-serif" }}>Taazu</text>
      <use href="#lemon" x="186" y="16" width="100" height="100" />
      <g fill="#fff" opacity=".8">
        <ellipse cx="220" cy="190" rx="4" ry="6" />
        <ellipse cx="90" cy="300" rx="3.5" ry="5" />
        <ellipse cx="212" cy="300" rx="3" ry="4.5" />
        <ellipse cx="100" cy="190" rx="3" ry="4" />
        <ellipse cx="160" cy="330" rx="3" ry="4" />
      </g>
    </svg>
  );
}

export function IngrIcon({ kind }: { kind: string }) {
  if (kind === "lemon") return <svg className="ingr-icon" viewBox="0 0 100 100" aria-hidden="true"><use href="#lemon" /></svg>;
  if (kind === "salt") {
    return (
      <svg className="ingr-icon" viewBox="0 0 60 60" aria-hidden="true">
        <g fill="#F2A7A0" stroke="#1C1917" strokeWidth="1.5">
          <rect x="8" y="26" width="18" height="18" rx="3" transform="rotate(-14 17 35)" />
          <rect x="30" y="30" width="16" height="16" rx="3" transform="rotate(20 38 38)" />
          <rect x="20" y="10" width="14" height="14" rx="3" transform="rotate(8 27 17)" />
        </g>
      </svg>
    );
  }
  if (kind === "k") {
    return (
      <svg className="ingr-icon" viewBox="0 0 60 60" aria-hidden="true">
        <circle cx="30" cy="30" r="26" fill="#CFE8D5" stroke="#1F7A3A" strokeWidth="3" />
        <text x="30" y="40" textAnchor="middle" fontWeight="700" fontSize="28" fill="#1F7A3A">K</text>
      </svg>
    );
  }
  return <svg className="ingr-icon" viewBox="0 0 100 120" aria-hidden="true" fill="#7CC4E8"><use href="#drop" /></svg>;
}

function Line({ className, children }: { className: string; children: ReactNode }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

export function UseCaseIcon({ kind }: { kind: string }) {
  if (kind === "garba") return <Line className="uc-icon"><path d="M10 40L36 8M38 40L12 8" /><circle cx="36" cy="8" r="3" /><circle cx="12" cy="8" r="3" /></Line>;
  if (kind === "run") return <Line className="uc-icon"><path d="M16 4l8 14 8-14" /><circle cx="24" cy="31" r="12" /><path d="M24 25v12M20 29l4-4" /></Line>;
  if (kind === "turf") return <Line className="uc-icon"><path d="M14 6v34M24 6v34M34 6v34M11 6h26" /><circle cx="40" cy="38" r="4" /></Line>;
  return <Line className="uc-icon"><path d="M8 42V10l16-6v38M24 16h16v26M4 42h40M14 16h4M14 24h4M14 32h4M30 24h4M30 32h4" /></Line>;
}

export function BizIcon({ kind }: { kind: string }) {
  if (kind === "gym") return <Line className="biz-icon"><path d="M6 18v12M12 14v20M36 14v20M42 18v12M12 24h24" /></Line>;
  if (kind === "turf") return <Line className="biz-icon"><path d="M14 8v32M24 8v32M34 8v32M11 8h26M8 40h32" /></Line>;
  if (kind === "run") return <Line className="biz-icon"><path d="M6 34c0-6 4-8 8-8l6-10 8 4 4 8 10 2c2 0 4 2 4 4v4H6z" /><path d="M20 26l4 2M24 22l4 2" /></Line>;
  return <Line className="biz-icon"><path d="M8 20h26v10a10 10 0 0 1-10 10h-6A10 10 0 0 1 8 30zM34 23h4a4 4 0 0 1 0 8h-4M14 6c0 4 4 4 4 8M22 6c0 4 4 4 4 8" /></Line>;
}
