"use client";

import { useEffect, useRef, useState, type ReactNode, type PointerEvent } from "react";
import { SITE, COPY, MESSAGES, TEXT } from "@/content/site";
import { track, waLink } from "@/lib/utils";
import { Use, WaButton } from "./ui";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Sticky header + mobile menu ---------- */
export function Header({ logo }: { logo: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open && menuRef.current) {
      const first = menuRef.current.querySelector("a");
      if (first) first.focus();
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        if (burgerRef.current) burgerRef.current.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className={"hdr" + (scrolled ? " scrolled" : "")}>
        <div className="wrap hdr-row">
          <a href="#top" className="logo" aria-label="Taazu, back to top">{logo}</a>
          <nav className="nav" aria-label="Main">
            {SITE.nav.map((n) => (
              <a key={n.href} href={n.href}>{n.label}</a>
            ))}
          </nav>
          <WaButton message={MESSAGES.order} trackAs="order_header" className="btn btn-primary btn-sm hdr-cta">
            <span className="hide-xs">{COPY.orderPrefix}&nbsp;</span>WhatsApp
          </WaButton>
          <button
            ref={burgerRef}
            type="button"
            className="burger"
            aria-expanded={open}
            aria-controls="menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>
      <nav id="menu" ref={menuRef} className={"menu" + (open ? " open" : "")} aria-label="Mobile menu">
        {SITE.nav.map((n) => (
          <a key={n.href} className="m" href={n.href} onClick={() => setOpen(false)}>{n.label}</a>
        ))}
        <WaButton message={MESSAGES.order} trackAs="order_menu" className="btn btn-primary">{COPY.orderLabel}</WaButton>
        <p className="gu menu-gu" lang="gu">{TEXT.footer.gu}</p>
      </nav>
    </>
  );
}

/* ---------- Hero visual: desktop pe halka tilt ---------- */
export function HeroVisual({ back, media, front }: { back: ReactNode; media: ReactNode; front: ReactNode }) {
  const tiltRef = useRef<HTMLDivElement>(null);
  function onMove(e: PointerEvent<HTMLDivElement>) {
    const el = tiltRef.current;
    if (!el || reducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", (x * 12).toFixed(2) + "deg");
    el.style.setProperty("--rx", (-y * 8).toFixed(2) + "deg");
  }
  function onLeave() {
    const el = tiltRef.current;
    if (!el) return;
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
  }
  return (
    <div className="hero-vis" onPointerMove={onMove} onPointerLeave={onLeave}>
      {back}
      <div className="tilt" ref={tiltRef}>
        <div className="float">{media}</div>
      </div>
      {front}
    </div>
  );
}

/* ---------- Hero video: reduced-motion ya data-saver pe sirf poster ---------- */
export function HeroVideo({ src, poster, alt }: { src: string; poster: string; alt: string }) {
  const [play, setPlay] = useState(false);
  useEffect(() => {
    const conn = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
    setPlay(!reducedMotion() && !(conn && conn.saveData));
  }, []);
  if (!play) return poster ? <img className="hero-photo-img" src={poster} alt={alt} /> : null;
  return <video className="hero-photo-img" src={src} poster={poster || undefined} autoPlay muted loop playsInline aria-label={alt} />;
}

/* ---------- "Book a station" buttons: form mein Event station pehle se select ---------- */
export function StationLink({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <a
      href="#contact"
      className={className}
      data-track="station_cta"
      onClick={(e) => {
        e.preventDefault();
        window.dispatchEvent(new Event("taazu:station"));
        const target = document.getElementById("contact");
        if (target) target.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth" });
        history.replaceState(null, "", "#contact");
      }}
    >
      {children}
    </a>
  );
}

/* ---------- Count-up number ---------- */
export function Counter({ to, prefix, suffix, final }: { to: number; prefix: string; suffix: string; final: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(final);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    setText(prefix + "0" + suffix);
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0] || !entries[0].isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (t: number) => {
          const p = Math.min(1, (t - t0) / 900);
          const v = to * (1 - Math.pow(1 - p, 3));
          setText(p < 1 ? prefix + v.toFixed(1) + suffix : final);
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, prefix, suffix, final]);
  return <span ref={ref}>{text}</span>;
}

/* ---------- Floating WhatsApp (mobile): hero ke baad, form dikhe to chhup jaata hai ---------- */
export function FloatingWhatsApp() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let heroOn = true;
    const formsOn = new Set<Element>();
    const update = () => setShow(!heroOn && formsOn.size === 0);
    const hero = document.getElementById("top");
    const io1 = new IntersectionObserver((entries) => {
      entries.forEach((en) => { heroOn = en.isIntersecting; });
      update();
    });
    if (hero) io1.observe(hero);
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) formsOn.add(en.target);
        else formsOn.delete(en.target);
      });
      update();
    });
    document.querySelectorAll("form").forEach((f) => io2.observe(f));
    return () => {
      io1.disconnect();
      io2.disconnect();
    };
  }, []);
  return (
    <a
      className={"fab" + (show ? " show" : "")}
      href={waLink(MESSAGES.order)}
      target="_blank"
      rel="noopener"
      aria-label={COPY.orderLabel}
      aria-hidden={show ? undefined : true}
      tabIndex={show ? 0 : -1}
      data-track="whatsapp_fab"
    >
      <Use id="chat" />
    </a>
  );
}

/* ---------- Scroll reveal + click tracking ---------- */
export function ClientEffects() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".rv, .stagger > *").forEach((el) => io.observe(el));
    const onClick = (e: MouseEvent) => {
      const t = e.target as Element | null;
      const a = t && t.closest ? t.closest("[data-track]") : null;
      if (a) track(a.getAttribute("data-track") || "click");
    };
    document.addEventListener("click", onClick);
    return () => {
      io.disconnect();
      document.removeEventListener("click", onClick);
    };
  }, []);
  return null;
}

/* ---------- Sirf dev mode: placeholders dikhane ka button ---------- */
export function PreviewToggle() {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      className="pv"
      aria-pressed={on}
      onClick={() => {
        const next = !on;
        setOn(next);
        document.body.classList.toggle("show-ph", next);
      }}
    >
      Dev: show placeholders
    </button>
  );
}
