import { SITE } from "@/content/site";

export const IS_DEV = process.env.NODE_ENV === "development";

const filled = (v: string) => v.trim() !== "";

// Switch ON + data bhara ho, tabhi cheez dikhegi
export const F = {
  navratri: SITE.flags.showNavratriBanner,
  waitlist: SITE.flags.showBottleWaitlist,
  fssai: SITE.flags.showFssai && filled(SITE.fssai),
  partners: SITE.flags.showPartners && SITE.partners.length > 0,
  testimonials: SITE.flags.showTestimonials && SITE.testimonials.length > 0,
  nutrition: SITE.flags.showNutrition && Object.values(SITE.nutrition).every(filled),
  labTested: SITE.flags.showLabTested,
  realNimbu: SITE.flags.showRealNimbu,
  instagram: SITE.flags.showInstagramStrip && filled(SITE.social.instagram),
  phone: filled(SITE.phone),
  email: filled(SITE.email),
};

export function waLink(message: string): string {
  return "https://wa.me/" + SITE.whatsapp + "?text=" + encodeURIComponent(message);
}

export function validIndianMobile(v: string): boolean {
  return /^(\+?91)?[6-9]\d{9}$/.test(v.replace(/[\s-]/g, ""));
}

type Gtag = (command: string, name: string) => void;
export function track(name: string): void {
  if (typeof window === "undefined") return;
  const g = (window as unknown as { gtag?: Gtag }).gtag;
  if (g) g("event", name);
}

export async function sendLead(kind: string, data: Record<string, string>): Promise<void> {
  const E = SITE.formEndpoints;
  const mode = SITE.flags.formMode;
  if (mode === "sheets") {
    await fetch(E.sheetsUrl, { method: "POST", mode: "no-cors", body: JSON.stringify({ kind: kind, ...data }) });
    return;
  }
  if (mode === "formspree") {
    const r = await fetch("https://formspree.io/f/" + E.formspreeId, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ kind: kind, ...data }),
    });
    if (!r.ok) throw new Error("Formspree failed");
    return;
  }
  if (mode === "supabase") {
    const r = await fetch(E.supabaseUrl + "/rest/v1/" + E.supabaseTable, {
      method: "POST",
      headers: { apikey: E.supabaseAnonKey, Authorization: "Bearer " + E.supabaseAnonKey, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify({ kind: kind, data: data }),
    });
    if (!r.ok) throw new Error("Supabase failed");
  }
}
