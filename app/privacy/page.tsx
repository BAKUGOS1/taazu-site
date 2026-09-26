import type { Metadata } from "next";
import Link from "next/link";
import { SITE, MESSAGES } from "@/content/site";
import { waLink } from "@/lib/utils";
import { Ph } from "@/components/ui";
import { Logo } from "@/components/brand";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Taazu uses the details you share through our website forms.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const viaWa = SITE.flags.formMode === "whatsapp";
  return (
    <main className="priv">
      <div className="wrap">
        <div className="priv-top">
          <Link href="/" className="logo" aria-label="Taazu home"><Logo variant="header" /></Link>
          <Link href="/" className="btn btn-outline btn-sm">Back to Taazu</Link>
        </div>
        <Ph name="review by a lawyer if needed" show={false}><span /></Ph>
        <h1>Privacy</h1>
        <div className="priv-body">
          <p>Last updated: September 2026. Short and simple, like our recipe.</p>
          <h2>What we collect</h2>
          <p>Only what you type into our forms: your name, phone or WhatsApp number, area, and details about your event or business (type, date, expected people or quantity, and any message).</p>
          <h2>Why we collect it</h2>
          <p>To reply to your enquiry, plan a Taazu station, arrange stock for your business, or tell you when our bottles launch. Nothing else.</p>
          <h2>How it reaches us</h2>
          {viaWa ? (
            <p>Our forms open WhatsApp with your details filled in. You choose whether to send the message. This website does not store your form details.</p>
          ) : (
            <p>Your form details are saved in a private list that only the Taazu team can see, so we can get back to you.</p>
          )}
          <h2>What we don&apos;t do</h2>
          <ul>
            <li>We don&apos;t sell your data.</li>
            <li>We don&apos;t share it with anyone except the tools we use to run Taazu (like WhatsApp).</li>
            <li>
              {SITE.ga4Id
                ? "We use Google Analytics to count visits and button taps. It uses cookies, which you can block in your browser settings."
                : "We don't use tracking cookies on this site."}
            </li>
          </ul>
          <h2>Your rights</h2>
          <p>Under India&apos;s Digital Personal Data Protection Act, 2023, you can ask us to see, correct or delete your details, and you can withdraw your consent at any time.</p>
          <h2>Contact us</h2>
          <p>
            To see or delete your data, contact us at{" "}
            {SITE.privacyEmail ? (
              <a href={"mailto:" + SITE.privacyEmail}>{SITE.privacyEmail}</a>
            ) : (
              <a href={waLink(MESSAGES.privacy)} target="_blank" rel="noopener">{"WhatsApp " + SITE.whatsappDisplay}</a>
            )}
            .
          </p>
        </div>
      </div>
    </main>
  );
}
