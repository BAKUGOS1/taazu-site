"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { SITE } from "@/content/site";
import { waLink, validIndianMobile, sendLead, track } from "@/lib/utils";

type Kind = "enquiry" | "waitlist";
type Field = {
  name: string;
  label: string;
  msgLabel: string;
  kind: "text" | "tel" | "date" | "select" | "textarea";
  required?: boolean;
  options?: string[];
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "numeric";
  full?: boolean;
  onlyIfType?: string;
};
type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const ENQUIRY: Field[] = [
  { name: "name", label: "Name", msgLabel: "Name", kind: "text", required: true, autoComplete: "name" },
  { name: "phone", label: "Phone / WhatsApp", msgLabel: "Phone", kind: "tel", required: true, autoComplete: "tel", inputMode: "tel", placeholder: "98765 43210" },
  { name: "type", label: "Type", msgLabel: "Type", kind: "select", required: true, options: ["Event station", "Gym", "Turf", "Running club", "Canteen", "Other"] },
  { name: "biz", label: "Business or event name", msgLabel: "Business/Event", kind: "text" },
  { name: "date", label: "Event date", msgLabel: "Date", kind: "date", onlyIfType: "Event station" },
  { name: "qty", label: "", msgLabel: "People/Quantity", kind: "text", inputMode: "numeric" },
  { name: "area", label: "Area in Ahmedabad", msgLabel: "Area", kind: "text", required: true, placeholder: "e.g. Bopal, Navrangpura" },
  { name: "msg", label: "Message", msgLabel: "Message", kind: "textarea", full: true },
];

const WAITLIST: Field[] = [
  { name: "name", label: "Name", msgLabel: "Name", kind: "text", required: true, autoComplete: "name" },
  { name: "phone", label: "WhatsApp number", msgLabel: "WhatsApp", kind: "tel", required: true, autoComplete: "tel", inputMode: "tel", placeholder: "98765 43210" },
  { name: "area", label: "Area / city", msgLabel: "Area", kind: "text", required: true, placeholder: "e.g. Satellite, Ahmedabad" },
  { name: "iam", label: "I am a", msgLabel: "I am a", kind: "select", required: true, options: ["Drinker", "Gym", "Turf", "Event organiser", "Canteen"] },
];

export default function LeadForm({ kind }: { kind: Kind }) {
  const fields = kind === "enquiry" ? ENQUIRY : WAITLIST;
  const idp = kind === "enquiry" ? "eq-" : "wl-";
  const viaWa = SITE.flags.formMode === "whatsapp";
  const [values, setValues] = useState<Record<string, string>>({});
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [status, setStatus] = useState("");
  const [waUrl, setWaUrl] = useState("");
  const refs = useRef<Record<string, Control | null>>({});
  const thanksRef = useRef<HTMLDivElement>(null);

  const type = values.type || "";
  const visible = fields.filter((f) => !f.onlyIfType || f.onlyIfType === type);

  useEffect(() => {
    if (kind !== "enquiry") return;
    function onStation() {
      setValues((prev) => ({ ...prev, type: "Event station" }));
      setDone(false);
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.setTimeout(() => {
        const el = refs.current["name"];
        if (el) el.focus({ preventScroll: true });
      }, reduced ? 0 : 650);
    }
    window.addEventListener("taazu:station", onStation);
    return () => window.removeEventListener("taazu:station", onStation);
  }, [kind]);

  useEffect(() => {
    if (done && thanksRef.current) thanksRef.current.focus();
  }, [done]);

  function labelFor(f: Field): string {
    if (f.name !== "qty") return f.label;
    if (type === "Event station") return "Expected people";
    if (type) return "Monthly quantity (cups or bottles)";
    return "Expected people or monthly quantity";
  }

  function check(f: Field, v: string): string {
    const t = v.trim();
    if (f.required && !t) return "Please fill this in.";
    if (f.kind === "tel" && t && !validIndianMobile(t)) return "Enter a 10-digit Indian mobile number, like 98765 43210.";
    return "";
  }

  function update(f: Field, v: string) {
    setValues((prev) => ({ ...prev, [f.name]: v }));
    if (errs[f.name]) {
      const msg = check(f, v);
      setErrs((prev) => ({ ...prev, [f.name]: msg }));
    }
  }

  function buildMessage(): string {
    const head = kind === "waitlist" ? "Hi Taazu! Please add me to the Feb 2027 bottle waitlist." : "Hi Taazu! New enquiry from the website.";
    const lines = visible
      .filter((f) => (values[f.name] || "").trim() !== "")
      .map((f) => f.msgLabel + ": " + (values[f.name] || "").trim());
    return [head].concat(lines).join("\n");
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("");
    const next: Record<string, string> = {};
    visible.forEach((f) => {
      const m = check(f, values[f.name] || "");
      if (m) next[f.name] = m;
    });
    setErrs(next);
    const firstBad = visible.find((f) => next[f.name]);
    if (firstBad) {
      const el = refs.current[firstBad.name];
      if (el) el.focus();
      return;
    }
    const url = waLink(buildMessage());
    setWaUrl(url);
    try {
      if (viaWa) {
        window.open(url, "_blank", "noopener");
      } else {
        const data: Record<string, string> = {};
        visible.forEach((f) => { data[f.name] = (values[f.name] || "").trim(); });
        await sendLead(kind, data);
      }
      setDone(true);
      track("form_submit_" + kind);
    } catch {
      setStatus("Sorry, that didn't go through. Your details are still here, so please try again or message us on WhatsApp.");
    }
  }

  const thanksText = !viaWa
    ? "We've got your details and will WhatsApp you soon."
    : kind === "waitlist"
      ? "WhatsApp should open with your details. Just hit send and we'll ping you first when bottles launch."
      : "WhatsApp should open with your details filled in. Just hit send and we'll get back to you soon.";

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="form-grid">
        {visible.map((f) => {
          const id = idp + f.name;
          const err = errs[f.name] || "";
          const errId = id + "-err";
          const val = values[f.name] || "";
          const setRef = (el: Control | null) => {
            refs.current[f.name] = el;
          };
          let control: ReactNode;
          if (f.kind === "select") {
            control = (
              <select id={id} name={f.name} value={val} required={f.required} aria-invalid={err ? true : undefined} aria-describedby={err ? errId : undefined} ref={setRef} onChange={(e) => update(f, e.target.value)}>
                <option value="">Choose one</option>
                {(f.options || []).map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            );
          } else if (f.kind === "textarea") {
            control = (
              <textarea id={id} name={f.name} value={val} aria-invalid={err ? true : undefined} aria-describedby={err ? errId : undefined} ref={setRef} onChange={(e) => update(f, e.target.value)} />
            );
          } else {
            control = (
              <input id={id} name={f.name} type={f.kind} value={val} required={f.required} placeholder={f.placeholder} autoComplete={f.autoComplete} inputMode={f.inputMode} aria-invalid={err ? true : undefined} aria-describedby={err ? errId : undefined} ref={setRef} onChange={(e) => update(f, e.target.value)} />
            );
          }
          return (
            <div key={f.name} className={"field" + (f.full ? " full" : "") + (err ? " bad" : "")}>
              <label htmlFor={id}>
                {labelFor(f)}
                {!f.required ? <span className="opt"> (optional)</span> : null}
              </label>
              {control}
              {err ? <p className="err" id={errId}>{err}</p> : null}
            </div>
          );
        })}
      </div>
      <button className={"btn " + (kind === "waitlist" ? "btn-yellow" : "btn-primary")} type="submit">
        {kind === "waitlist" ? "Join the waitlist" : viaWa ? "Send on WhatsApp" : "Send enquiry"}
      </button>
      <p className="status" role="alert">{status}</p>
      <p className="consent">
        We&apos;ll only use this to contact you about Taazu. <Link href="/privacy">Privacy</Link>
      </p>
      {done ? (
        <div className="thanks" ref={thanksRef} tabIndex={-1}>
          <h4>{kind === "waitlist" ? "You're on the list!" : "Shukriya!"}</h4>
          <p>{thanksText}</p>
          <div className="cta-row mt-3.5">
            <a className="btn btn-green btn-sm" href={waUrl} target="_blank" rel="noopener">
              {viaWa ? "Didn't open? Tap here" : "Message us on WhatsApp"}
            </a>
            <button type="button" className="btn btn-outline btn-sm" onClick={() => setDone(false)}>Edit details</button>
          </div>
        </div>
      ) : null}
    </form>
  );
}
