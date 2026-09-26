import Image from "next/image";
import Link from "next/link";
import { SITE, COPY, MESSAGES, TEXT, COMPARE, FAQ } from "@/content/site";
import { F, waLink } from "@/lib/utils";
import { hasPublic, findCreatives } from "@/lib/assets";
import { Use, WaButton, Ph, CupIllustration, IngrIcon, UseCaseIcon, BizIcon } from "./ui";
import { Logo, Seal } from "./brand";
import { HeroVisual, HeroVideo, StationLink, Counter } from "./client";
import LeadForm from "./LeadForm";

/* ---------- 2. HERO ---------- */
function HeroMedia() {
  const h = SITE.hero;
  if (h.video) {
    return <div className="hero-photo"><HeroVideo src={h.video} poster={h.poster} alt={h.imageAlt} /></div>;
  }
  if (hasPublic(h.image)) {
    return (
      <div className="hero-photo">
        <Image src={h.image} alt={h.imageAlt} fill priority sizes="(min-width: 900px) 34vw, 62vw" style={{ objectFit: "cover" }} />
      </div>
    );
  }
  return <CupIllustration id="hero" top="#FDF6C3" bottom="#F3DC5A" label="Illustration of a Taazu cup with ice and a lemon slice" />;
}

export function Hero() {
  const back = (
    <>
      <div className="sunblob" aria-hidden="true" />
      <svg className="drift d1" viewBox="0 0 100 100" aria-hidden="true"><use href="#lemon" /></svg>
      <svg className="drift d2" viewBox="0 0 100 120" aria-hidden="true"><use href="#drop" /></svg>
      <svg className="drift d3" viewBox="0 0 100 100" aria-hidden="true"><use href="#lemon" /></svg>
      <svg className="drift d4" viewBox="0 0 100 120" aria-hidden="true"><use href="#drop" /></svg>
    </>
  );
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div>
          {F.navratri ? (
            <a className="banner" href="#station">
              <span className="banner-dot"><Use id="sun" viewBox="0 0 100 100" /></span>
              <span>{COPY.banner}</span>
            </a>
          ) : null}
          <h1 id="hero-title">{TEXT.hero.title}</h1>
          <p className="hero-sub">{TEXT.hero.sub}</p>
          <div className="cta-row">
            <WaButton message={MESSAGES.order} trackAs="order_hero" className="btn btn-primary">{COPY.orderLabel}</WaButton>
            <StationLink className="btn btn-outline">{TEXT.hero.stationBtn}</StationLink>
          </div>
          <p className="hero-gu gu" lang="gu">{TEXT.hero.gu}</p>
        </div>
        <HeroVisual back={back} media={<HeroMedia />} front={<Seal />} />
      </div>
    </section>
  );
}

/* ---------- 3. TICKER ---------- */
function TickerSet({ copy }: { copy?: boolean }) {
  return (
    <div className="ticker-set" aria-hidden={copy ? true : undefined}>
      {SITE.ticker.map((t, i) => (
        <span className="ticker-item" key={i}>
          {typeof t === "string" ? <span>{t}</span> : <span lang="gu" className="gu">{t.gu}</span>}
          <svg className="sep" viewBox="0 0 100 120" aria-hidden="true"><use href="#drop" /></svg>
        </span>
      ))}
    </div>
  );
}

export function Ticker() {
  return (
    <div className="ticker" role="region" aria-label="Taazu slogans">
      <div className="ticker-track">
        <TickerSet />
        <TickerSet copy />
      </div>
    </div>
  );
}

/* ---------- 4. WHY TAAZU ---------- */
export function Why() {
  const t = TEXT.why;
  return (
    <section id="why" aria-labelledby="why-title">
      <div className="wrap">
        <span className="eyebrow rv">{t.eyebrow}</span>
        <h2 id="why-title" className="rv">{t.title}</h2>
        <p className="lead rv">{t.lead}</p>
        <div className="grid3 stagger mt-9">
          {t.facts.map((f, i) => (
            <article className="card fact" key={i}>
              {f.counter ? (
                <div className="big" aria-hidden="true">
                  <Counter to={f.counter.to} prefix={f.counter.prefix} suffix={f.counter.suffix} final={f.counter.final} />
                </div>
              ) : (
                <div className="big big-sm">{f.big}</div>
              )}
              <p>{f.text}</p>
              <p className="src">{f.source}</p>
            </article>
          ))}
        </div>
        <div className="cmp rv" role="table" aria-label={t.compareLabel}>
          <div className="cmp-row cmp-head" role="row">
            <div className="rl" role="columnheader"><span className="sr">Compared on</span></div>
            <div role="columnheader">{t.cols[0]}</div>
            <div role="columnheader">{t.cols[1]}</div>
            <div className="tz" role="columnheader">{t.cols[2]}</div>
          </div>
          {COMPARE.map((r) => (
            <div className="cmp-row" role="row" key={r.label}>
              <div className="rl" role="rowheader">{r.label}</div>
              <div role="cell">{r.cells[0]}</div>
              <div role="cell">{r.cells[1]}</div>
              <div className="tz" role="cell">{r.cells[2]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 5. ANDAR KYA HAI ---------- */
const CHIP: Record<string, string> = { Nimbu: "c-nimbu", Namak: "c-namak", Potassium: "c-pot", "Thanda paani": "c-paani" };

export function Inside() {
  const t = TEXT.inside;
  const recipe = SITE.flavours[0].ingredients;
  return (
    <section className="inside" id="inside" aria-labelledby="inside-title">
      <div className="wrap">
        <span className="eyebrow rv">{t.eyebrow}</span>
        <h2 id="inside-title" className="rv">{t.title}</h2>
        <p className="recipe rv">
          {recipe.map((ing, i) => (
            <span className="recipe-part" key={ing}>
              {i > 0 ? <span className="plus" aria-hidden="true">+</span> : null}
              <span className={"chip " + (CHIP[ing] || "")}>{ing}</span>
            </span>
          ))}
        </p>
        <div className="ingr stagger">
          {SITE.ingredientCards.map((c) => (
            <div className="card" key={c.name}>
              <IngrIcon kind={c.icon} />
              <h3>{c.name}</h3>
              <p>{c.line}</p>
            </div>
          ))}
        </div>
        <div className="inside-bottom">
          <div>
            <Ph name="nutrition values (NABL lab report)" show={F.nutrition} className="label">
              <h3>{t.labelTitle}</h3>
              {Object.entries(SITE.nutrition).map(([k, v]) => (
                <div className="label-row" key={k}>
                  <span>{k}</span>
                  <strong>{v || "[[PLACEHOLDER: nutrition value]]"}</strong>
                </div>
              ))}
            </Ph>
            {F.nutrition ? null : (
              <div className="soon">
                <strong>{t.soonTitle}</strong> {t.soonBody}
              </div>
            )}
          </div>
          <p className="trustline rv">
            <Ph tag="span" name="NABL lab report" show={F.labTested}>Lab-tested. </Ph>
            <Ph tag="span" name="FSSAI number" show={F.fssai}>FSSAI registered. </Ph>
            <span>{t.made}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- 6. FLAVOURS + WAITLIST ---------- */
export function Flavours() {
  const t = TEXT.flavours;
  const cup = SITE.prices.cup;
  const bottle = SITE.prices.bottle;
  return (
    <section id="flavours" aria-labelledby="flavours-title">
      <div className="wrap">
        <span className="eyebrow rv">{t.eyebrow}</span>
        <h2 id="flavours-title" className="rv">{t.title}</h2>
        <p className="lead rv">{t.lead}</p>
        <div className="flv-grid stagger">
          {SITE.flavours.filter((f) => f.show).map((f) => (
            <article className="flv" key={f.id}>
              <div className="flv-top" style={{ background: f.topBg }}>
                {hasPublic(f.image) ? (
                  <div className="flv-photo">
                    <Image src={f.image} alt={f.imageAlt} fill sizes="(min-width: 760px) 40vw, 90vw" style={{ objectFit: "cover" }} />
                  </div>
                ) : (
                  <CupIllustration id={f.id} top={f.drink[0]} bottom={f.drink[1]} label={"Illustration of " + f.name + " in a Taazu cup"} />
                )}
              </div>
              <div className="flv-body">
                <span className="tag" style={{ background: f.tagBg, color: f.tagFg }}>{f.tagline}</span>
                <h3>{f.name}</h3>
                <p className="rec">{f.ingredients.join(" + ")}</p>
                <p className="formats">{COPY.formatLine}</p>
                <div className="flv-foot">
                  {cup || bottle ? (
                    <p className="price">
                      {cup ? "Cup " + cup : null}
                      {bottle ? <small>{"Bottle " + bottle + " (from Feb 2027)"}</small> : null}
                    </p>
                  ) : null}
                  <WaButton message={MESSAGES.flavour(f.name)} trackAs={"flavour_" + f.id} className="btn btn-primary btn-sm">{COPY.orderLabel}</WaButton>
                </div>
              </div>
            </article>
          ))}
        </div>
        {F.waitlist ? (
          <div className="waitlist dark rv" id="waitlist">
            <div>
              <span className="sticker">{t.waitSticker}</span>
              <h3>{t.waitTitle}</h3>
              <p className="mt-2.5 opacity-90">{t.waitBody}</p>
            </div>
            <LeadForm kind="waitlist" />
          </div>
        ) : null}
      </div>
    </section>
  );
}

/* ---------- 7. TAAZU STATION ---------- */
export function Station() {
  const t = TEXT.station;
  return (
    <section className="station dark" id="station" aria-labelledby="station-title">
      <div className="wrap station-grid">
        <div>
          <span className="eyebrow rv">{t.eyebrow}</span>
          <h2 id="station-title" className="rv">{t.title}</h2>
          <p className="station-sub rv">{t.sub}</p>
          <p className="station-body rv">{t.body}</p>
          <div className="bring rv"><strong>{t.bringLabel}</strong> {t.bring}</div>
          <div className="cta-row rv">
            <StationLink className="btn btn-yellow">{t.requestBtn}</StationLink>
            <WaButton message={MESSAGES.station} trackAs="station" className="btn btn-ghost-cream">{t.waBtn}</WaButton>
          </div>
        </div>
        <div className="uc stagger">
          {t.cases.map((c) => (
            <article className="card" key={c.title}>
              <UseCaseIcon kind={c.icon} />
              <h3>{c.title}</h3>
              <p>{c.line}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 8. BUSINESSES / KAHAN MILEGA ---------- */
export function Business() {
  const t = TEXT.business;
  return (
    <section id="business" aria-labelledby="business-title">
      <div className="wrap">
        <span className="eyebrow rv">{t.eyebrow}</span>
        <h2 id="business-title" className="rv">{t.title}</h2>
        <p className="lead rv">{t.lead}</p>
        <div className="biz stagger">
          {SITE.businesses.map((b) => (
            <article className="card" key={b.type}>
              <BizIcon kind={b.icon} />
              <h3>{b.title}</h3>
              <p>{b.line}</p>
              <WaButton message={MESSAGES.stock(b.type)} trackAs={"stock_" + b.icon} className="btn btn-primary btn-sm">{t.btn}</WaButton>
            </article>
          ))}
        </div>
        <Ph name="partner list" show={F.partners} className="partners">
          <h3 className="partners-title">{t.partnersTitle}</h3>
          <ul className="partner-list">
            {SITE.partners.map((p) => (
              <li key={p.name}><strong>{p.name}</strong>, {p.area}</li>
            ))}
          </ul>
        </Ph>
      </div>
    </section>
  );
}

/* ---------- 9. TRUST STRIP ---------- */
export function Trust() {
  const t = TEXT.trust;
  return (
    <div className="trust" role="region" aria-label="Why you can trust Taazu">
      <ul className="wrap trust-list">
        <Ph tag="li" name="FSSAI number" show={F.fssai}><Use id="check" className="trust-ic" />{"FSSAI Reg. No. " + SITE.fssai}</Ph>
        <Ph tag="li" name="NABL lab report" show={F.labTested}><Use id="check" className="trust-ic" />{t.lab}</Ph>
        <li><Use id="check" className="trust-ic" />{t.made}</li>
        <Ph tag="li" name="final ingredient declaration (real nimbu)" show={F.realNimbu}><Use id="check" className="trust-ic" />{t.nimbu}</Ph>
        <li><Use id="check" className="trust-ic" />{t.still}</li>
        <li><Use id="check" className="trust-ic" />{COPY.orderLabel}</li>
      </ul>
    </div>
  );
}

/* ---------- 10. SOCIAL PROOF + INSTAGRAM ---------- */
export function SocialProof() {
  const t = TEXT.proof;
  const creatives = findCreatives(SITE.brand.creativesDir, SITE.instagramCreatives);
  const ig = SITE.social.instagram || "#";
  return (
    <>
      <Ph tag="section" name="testimonials + photos (with permission)" show={F.testimonials}>
        <div className="wrap">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2>{t.title}</h2>
          <div className="grid3 mt-6">
            {SITE.testimonials.map((q) => (
              <figure className="card quote" key={q.name + q.place}>
                <blockquote>{"\u201C" + q.quote + "\u201D"}</blockquote>
                <figcaption>{q.name + ", " + q.place}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Ph>
      <Ph tag="section" name="Instagram URL (social.instagram)" show={F.instagram && creatives.length > 0}>
        <div className="wrap">
          <span className="eyebrow">{t.igEyebrow}</span>
          <h2>{t.igTitle}</h2>
          <div className="ig-grid">
            {creatives.map((src, i) => (
              <a key={src} className="ig-item" href={ig} target="_blank" rel="noopener" aria-label={"Taazu on Instagram, post " + (i + 1)}>
                <Image src={src} alt="" fill sizes="(min-width: 900px) 30vw, 33vw" style={{ objectFit: "cover" }} />
              </a>
            ))}
          </div>
          <a className="btn btn-outline mt-6" href={ig} target="_blank" rel="noopener">{t.igBtn}</a>
        </div>
      </Ph>
    </>
  );
}

/* ---------- 11. FAQ ---------- */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title">
      <div className="wrap">
        <span className="eyebrow rv">{TEXT.faq.eyebrow}</span>
        <h2 id="faq-title" className="rv">{TEXT.faq.title}</h2>
        <div className="faq-list rv">
          {FAQ.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <div className="faq-a">{a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CONTACT + ENQUIRY FORM ---------- */
export function Contact() {
  const t = TEXT.contact;
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="wrap contact-grid">
        <div>
          <span className="eyebrow rv">{t.eyebrow}</span>
          <h2 id="contact-title" className="rv">{t.title}</h2>
          <p className="lead rv">{t.lead}</p>
          <ul className="clist rv">
            <li><WaButton message={MESSAGES.hello} trackAs="contact" className="btn btn-green">{"WhatsApp " + SITE.whatsappDisplay}</WaButton></li>
            <Ph tag="li" name="phone" show={F.phone}><a href={"tel:" + SITE.phone}>{SITE.phone}</a></Ph>
            <Ph tag="li" name="email" show={F.email}><a href={"mailto:" + SITE.email}>{SITE.email}</a></Ph>
            <li>{SITE.address}</li>
          </ul>
        </div>
        <div className="formcard rv">
          <LeadForm kind="enquiry" />
        </div>
      </div>
    </section>
  );
}

/* ---------- 12. FINAL CTA ---------- */
export function FinalCta() {
  const t = TEXT.final;
  return (
    <section className="final" aria-labelledby="final-title">
      <svg className="deco deco-sun" viewBox="0 0 100 100" aria-hidden="true"><use href="#sun" /></svg>
      <svg className="deco deco-drop" viewBox="0 0 100 120" aria-hidden="true"><use href="#drop" /></svg>
      <div className="wrap final-inner">
        <h2 id="final-title" className="rv">{t.line1}<br />{COPY.finalLine}</h2>
        <div className="cta-row rv">
          <WaButton message={MESSAGES.order} trackAs="order_final" className="btn btn-cream">{COPY.orderLabel}</WaButton>
          <StationLink className="btn btn-ink">{t.stationBtn}</StationLink>
        </div>
        <p className="final-tag rv">{t.tag}</p>
      </div>
    </section>
  );
}

/* ---------- 13. FOOTER ---------- */
export function Footer() {
  const t = TEXT.footer;
  return (
    <footer className="foot dark">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <a href="#top" className="logo" aria-label="Taazu, back to top"><Logo variant="footer" /></a>
            <p className="foot-tag">{t.tagline}</p>
            <p className="gu foot-gu" lang="gu">{t.gu}</p>
            <Ph tag="p" name="FSSAI number" show={F.fssai} className="foot-fssai">{"FSSAI Reg. No. " + SITE.fssai}</Ph>
          </div>
          <div>
            <h3>{t.quick}</h3>
            <ul>
              {SITE.nav.slice(0, 4).map((n) => (
                <li key={n.href}><a href={n.href}>{n.label}</a></li>
              ))}
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3>{t.contact}</h3>
            <ul>
              <li><a href={waLink(MESSAGES.hello)} target="_blank" rel="noopener" data-track="whatsapp_footer">{"WhatsApp " + SITE.whatsappDisplay}</a></li>
              <Ph tag="li" name="phone" show={F.phone}><a href={"tel:" + SITE.phone}>{SITE.phone}</a></Ph>
              <Ph tag="li" name="email" show={F.email}><a href={"mailto:" + SITE.email}>{SITE.email}</a></Ph>
              <li>{SITE.address}</li>
              <Ph tag="li" name="Instagram URL" show={SITE.social.instagram !== ""}><a href={SITE.social.instagram} target="_blank" rel="noopener">Instagram</a></Ph>
              <Ph tag="li" name="YouTube URL" show={SITE.social.youtube !== ""}><a href={SITE.social.youtube} target="_blank" rel="noopener">YouTube</a></Ph>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>{"\u00A9 2026 " + SITE.legalName}</span>
          <Link href="/privacy">Privacy</Link>
          <span>{t.madeWith}</span>
        </div>
      </div>
    </footer>
  );
}
