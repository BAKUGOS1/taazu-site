import { Header, FloatingWhatsApp, ClientEffects } from "@/components/client";
import { Logo } from "@/components/brand";
import { Hero, Ticker, Why, Inside, Flavours, Reels, Station, Business, Trust, SocialProof, Faq, Contact, FinalCta, Footer } from "@/components/sections";

export const dynamic = "force-static";

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header logo={<Logo variant="header" />} />
      <main id="main">
        <Hero />
        <Ticker />
        <Why />
        <Inside />
        <Flavours />
        <Reels />
        <Station />
        <Business />
        <Trust />
        <SocialProof />
        <Faq />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <ClientEffects />
    </>
  );
}
