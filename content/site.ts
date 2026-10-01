/* ============================================================
   TAAZU WEBSITE: SAARA CONTENT ISI FILE MEIN HAI
   Copy, prices, numbers, links aur on/off switches, sab yahan.
   "[[PLACEHOLDER: ...]]" = yeh cheez abhi baaki hai.
   Khaali "" chhodoge to woh hissa website pe apne aap chhup jaayega.
   Claims rules: README ka section 9 padho.
   ============================================================ */

export type LaunchStatus = "soon" | "live";
export type FormMode = "whatsapp" | "sheets" | "formspree" | "supabase";
export type Flavour = {
  id: string;
  show: boolean;
  name: string;
  tagline: string;
  ingredients: string[];
  tagBg: string;
  tagFg: string;
  topBg: string;
  drink: [string, string];
  image: string;
  imageAlt: string;
};
export type Partner = { name: string; area: string };
export type Testimonial = { quote: string; name: string; place: string };
export type TickerItem = string | { gu: string };
export type Fact = {
  counter?: { to: number; prefix: string; suffix: string; final: string };
  big?: string;
  text: string;
  source: string;
};
type Row = { label: string; cells: [string, string, string] };

export const SITE = {
  // ---------- BASICS ----------
  siteUrl: "https://taazu-site.vercel.app", // [[PLACEHOLDER: domain]]
  launchStatus: "soon" as LaunchStatus, // "soon" = launch baaki. Stations chalu ho jaayein to "live"
  confirmIngredients: false, // supplier list mein potassium confirm ho jaaye tab true

  whatsapp: "919173736652",
  whatsappDisplay: "+91 91737 36652",
  phone: "", // [[PLACEHOLDER: phone]]
  email: "", // [[PLACEHOLDER: email]] jaise hello@taazu.in
  address: "Ahmedabad, Gujarat", // [[PLACEHOLDER: address]]
  legalName: "Taazu", // [[PLACEHOLDER: legal business name]]
  fssai: "", // [[PLACEHOLDER: FSSAI number]] 14 digits, FoSCoS se
  privacyEmail: "", // [[PLACEHOLDER: privacy contact]] khaali = WhatsApp
  social: {
    instagram: "", // [[PLACEHOLDER: Instagram URL]]
    youtube: "", // [[PLACEHOLDER: YouTube URL]]
    googleBusiness: "", // [[PLACEHOLDER: Google Business Profile URL]]
  },
  ga4Id: "", // [[PLACEHOLDER: analytics ID]] jaise G-ABC123. Khaali = analytics band

  tagline: "Rehydrate | Refresh | Recover",

  metaDescription:
    "Taazu is Amdavad's own still nimbu-namak electrolyte drink, for garba nights, turfs, gyms and hot Ahmedabad days. Book a Taazu station on WhatsApp.",

  // ---------- ON/OFF SWITCHES ----------
  flags: {
    showNavratriBanner: true, // Navratri ke baad false
    showBottleWaitlist: true,
    showTestimonials: true, // tabhi dikhega jab testimonials bharoge
    showPartners: true, // tabhi dikhega jab partners bharoge
    showFssai: true, // tabhi dikhega jab fssai bharoge
    showNutrition: true, // tabhi dikhega jab chaaron nutrition values bharoge
    showLabTested: false, // NABL report haath mein aaye tab true
    showRealNimbu: false, // ingredient list mein asli nimbu confirm ho tab true
    showInstagramStrip: true, // tabhi dikhega jab social.instagram bharoge
    formMode: "whatsapp" as FormMode, // "whatsapp" | "sheets" | "formspree" | "supabase"
  },
  formEndpoints: {
    sheetsUrl: "", // [[PLACEHOLDER: form destination]] Google Apps Script web app URL
    formspreeId: "",
    supabaseUrl: "",
    supabaseAnonKey: "",
    supabaseTable: "leads",
  },

  // ---------- PRICES (khaali "" = price line chhup jaayegi) ----------
  prices: {
    cup: "from ₹10", // [[PLACEHOLDER: prices]]
    bottle: "around ₹25",
  },

  // ---------- NUTRITION per 250 ml, SIRF NABL lab report se ----------
  nutrition: {
    Energy: "", // [[PLACEHOLDER: nutrition value]] jaise "18 kcal"
    Sugar: "",
    Sodium: "",
    Potassium: "",
  },

  // ---------- TAAZU STATION ----------
  stationIncludes: "", // [[PLACEHOLDER: station details]] jaise "Dispenser, cups, ice, branded counter and staff."
  stationDefault: "Tell us your event and we'll plan it with you.",

  // ---------- PHOTOS (public/images mein rakho) ----------
  hero: {
    image: "/images/hero-duo.jpg", // Gemini bottle render (Classic + Jeera)
    video: "", // [[PLACEHOLDER: hero video]] jaise "/images/hero-loop.mp4" (poster bhi do)
    poster: "",
    imageAlt: "Taazu Classic Nimbu Namak and Jeera Masala 250 ml bottles on crushed ice with lemon halves",
  },

  // ---------- BRAND FILES (public/brand mein) ----------
  brand: {
    // Naya official logo (glossy drop + orange TAAZU). Purane concept-A/B logos ab use nahi hote.
    headerLogo: "/brand/logo-v2/taazu-logo-horizontal.png",
    footerLogo: "/brand/logo-v2/taazu-logo-horizontal.png", // footer mein cream badge ke andar dikhta hai
    seal: "", // khaali = drop wala round seal (neeche dropIcon se)
    dropIcon: "/brand/logo-v2/taazu-drop.png",
    icon: "/brand/logo-v2/taazu-icon-512.png",
    favicon: "/brand/icons/favicon.ico",
    appleIcon: "/brand/icons/apple-touch-icon-180x180.png",
    pwa192: "/brand/icons/pwa-192x192.png",
    pwa512: "/brand/icons/pwa-512x512.png",
    creativesDir: "/brand/creatives",
  },
  instagramCreatives: ["01", "02", "07"], // creatives folder ki files jo in numbers se shuru hoti hain

  nav: [
    { href: "#why", label: "Why Taazu" },
    { href: "#inside", label: "Andar kya hai" },
    { href: "#flavours", label: "Flavours" },
    { href: "#station", label: "Taazu Station" },
    { href: "#contact", label: "Contact" },
  ],

  ticker: [
    "Paani se aage",
    "Garmi ka desi jawab",
    { gu: "ગરમીમાં પણ તાજું" },
    "Nimbu + Namak + Potassium",
    "#TaazuRaho",
    "Made in Amdavad",
    "Rehydrate · Refresh · Recover",
  ] as TickerItem[],

  // ---------- FLAVOURS (naya flavour = ek block copy karo; chhupana = show: false) ----------
  flavours: [
    {
      id: "classic",
      show: true,
      name: "Classic Nimbu Namak",
      tagline: "The Desi Original",
      ingredients: ["Nimbu", "Namak", "Potassium", "Thanda paani"],
      tagBg: "#F5D83B",
      tagFg: "#1C1917",
      topBg: "#FFF3B0",
      drink: ["#FDF6C3", "#F3DC5A"],
      image: "/images/flavour-classic.jpg",
      imageAlt: "Taazu Classic Nimbu Namak 250 ml bottle with an orange cap",
    },
    {
      id: "jeera",
      show: true,
      name: "Jeera Masala",
      tagline: "Desi Twist", // [[PLACEHOLDER: flavour tagline]]
      ingredients: ["Nimbu", "Bhuna Jeera", "Kala Namak", "Potassium"], // [[PLACEHOLDER: final Jeera recipe]]
      tagBg: "#8A4B1F",
      tagFg: "#FFF8E7",
      topBg: "#F3E1CC",
      drink: ["#EDCB8C", "#B8793B"],
      image: "/images/flavour-jeera.jpg",
      imageAlt: "Taazu Jeera Masala 250 ml bottle with a brown cap",
    },
  ] as Flavour[],

  ingredientCards: [
    { name: "Nimbu", icon: "lemon", photo: "/images/ingr-nimbu.jpg", line: "The tang you grew up with." },
    { name: "Namak", icon: "salt", photo: "/images/ingr-namak.jpg", line: "Sodium, the main salt you lose in sweat." },
    { name: "Potassium", icon: "k", photo: "", line: "The other electrolyte in sweat, in a smaller amount." },
    { name: "Thanda paani", icon: "drop", photo: "/images/ingr-paani.jpg", line: "Still, not fizzy. Best served chilled." },
  ],

  businesses: [
    { title: "Gyms", type: "gym", icon: "gym", line: "A chilled nimbu-namak option at your counter that members look forward to. Set ke beech, ek sip Taazu." },
    { title: "Box-cricket turfs", type: "box-cricket turf", icon: "turf", line: "Floodlight matches run hot. Keep Taazu ready for every team that walks in. Last over tak taazu." },
    { title: "Running clubs", type: "running club", icon: "run", line: "Cups at the finish line for the whole group, from the Sabarmati Riverfront to your Sunday long run." },
    { title: "Canteens & factories", type: "canteen", icon: "canteen", line: "A desi drink your team already likes, for long shifts through Amdavad summers. Bulk orders on WhatsApp." },
  ],

  // ---------- 3D BOTTLE (public/bottle-3d.html, Taazu app repo ke brand-kit se). Khaali "" = section chhup jaayega ----------
  bottle3d: "/bottle-3d.html",

  // ---------- REELS (public/video mein). Hatana ho to list khaali [] kar do ----------
  reels: [
    { title: "Garmi ka Reset", src: "/video/taazu-reel-30s.mp4", poster: "/video/taazu-reel-30s_poster.jpg" },
    { title: "Andar kya hai?", src: "/video/taazu-reel2-30s.mp4", poster: "/video/taazu-reel2-30s_poster.jpg" },
  ],

  partners: [] as Partner[], // [[PLACEHOLDER: partner list]] jaise { name: "XYZ Turf", area: "Bopal" }
  testimonials: [] as Testimonial[], // [[PLACEHOLDER: testimonials]] permission ke saath: { quote: "...", name: "Riya", place: "Satellite" }
};

/* ---------- Launch status ke hisaab se text ("soon" vs "live") ---------- */
const STATUS_COPY = {
  soon: {
    banner: "Navratri 2026: Taazu stations coming to garba grounds. Book one for your event.",
    orderPrefix: "Pre-order on",
    orderLabel: "Pre-order on WhatsApp",
    formatLine: "Cup launching this Navratri · Bottle Feb 2027",
    orderMsg: "Hi Taazu! I'd like to try Taazu when it launches.\nName: \nArea: \nQuantity: ",
    flavourMsg: (flavour: string) => "Hi Taazu! I'd like to try Taazu when it launches.\nFlavour: " + flavour + "\nName: \nArea: \nQuantity: ",
    flavoursLead: "Cups at Taazu stations from this Navratri. Sealed 250 ml bottles from February 2027.",
    garbaLine: "A chilled nimbu-namak counter right next to the circle.",
    finalLine: "Taazu aa raha hai.",
    faqWhere: "We're launching with Taazu stations this Navratri at garba grounds, turfs and gyms in Ahmedabad. Message us on WhatsApp and we'll tell you where to find us.",
    faqBulk: "Yes. We're taking bookings for Taazu stations at garba nights, runs, turf tournaments and corporate events, and talking to gyms, turfs and canteens about stocking Taazu. Send us a WhatsApp or fill the form below.",
  },
  live: {
    banner: "Navratri 2026: find Taazu stations at garba grounds",
    orderPrefix: "Order on",
    orderLabel: "Order on WhatsApp",
    formatLine: "Cup now · 250 ml bottle Feb 2027",
    orderMsg: "Hi Taazu! I want to order.\nName: \nArea: \nQuantity: ",
    flavourMsg: (flavour: string) => "Hi Taazu! I want to order.\nFlavour: " + flavour + "\nName: \nArea: \nQuantity: ",
    flavoursLead: "Cups at Taazu stations right now. Sealed 250 ml bottles from February 2027.",
    garbaLine: "A chilled counter right next to the circle, all nine nights.",
    finalLine: "Taazu ready hai.",
    faqWhere: "Right now at Taazu stations at garba grounds, turfs and gyms in Ahmedabad. You can also order directly on WhatsApp.",
    faqBulk: "Yes. We set up Taazu stations for garba nights, runs, turf tournaments and corporate events, and supply gyms, turfs and canteens. Send us a WhatsApp or fill the form below.",
  },
};
export const COPY = STATUS_COPY[SITE.launchStatus];

/* ---------- Ingredients confirm hue ya nahi ---------- */
const OK = SITE.confirmIngredients;
export const ING = {
  heroSub:
    "Amdavad's own nimbu-namak electrolyte drink. Tastes like the best ghar ka nimbu-paani, with " +
    (OK ? "the sodium and potassium" : "the salts") +
    " your sweat takes.",
  saltsRow: OK ? "Sodium & potassium" : "Salts (namak)",
  faqWhat:
    "Taazu is a still nimbu-namak electrolyte drink from Ahmedabad. It tastes like good home-made nimbu-paani, with " +
    (OK ? "sodium and potassium" : "salts") +
    " added. Taazu is an everyday electrolyte drink, not a medicine.",
  faqDiff:
    "Plain water has no salt in it. Most cold drinks are built around sugar and fizz. Taazu is built around nimbu and namak" +
    (OK ? ", with potassium added," : ",") +
    " and it's still, not fizzy.",
};

export const MESSAGES = {
  order: COPY.orderMsg,
  hello: "Hi Taazu! I have a question.",
  station: "Hi Taazu! I want a Taazu station for my event.\nEvent: \nDate: \nExpected people: \nVenue: ",
  privacy: "Hi Taazu! I'd like to see or delete the details I shared with you.",
  stock: (type: string) => "Hi Taazu! I run a " + type + " and want to stock Taazu.\nName: \nArea: ",
  flavour: COPY.flavourMsg,
};

/* ---------- Section ka text ---------- */
export const TEXT = {
  hero: { title: "Paani se aage.", sub: ING.heroSub, gu: "ગરમીમાં પણ તાજું.", stationBtn: "Book a Taazu Station" },
  why: {
    eyebrow: "Why Taazu",
    title: "Paseena sirf paani nahi hota.",
    lead: "Jab paseena aata hai, sirf paani nahi jaata. Namak bhi jaata hai. Plain water brings back the water, not the salt.",
    facts: [
      { counter: { to: 1, prefix: "≈", suffix: " g", final: "≈1 g" }, text: "On average, every litre of sweat takes about 1 g of sodium with it (it varies a lot from person to person). Plain water doesn't put it back.", source: "Source: Baker LB, Sports Medicine, 2017." },
      { counter: { to: 2, prefix: "", suffix: "%", final: "2%" }, text: "Lose about 2% of your body weight in sweat, and performance and focus can start to drop.", source: "Source: American College of Sports Medicine, Position Stand, 2007." },
      { big: "Pyaas se pehle.", text: "Thirst often shows up late. Sip before you feel it, especially on a 44°C Amdavad afternoon.", source: "#TaazuRaho" },
    ] as Fact[],
    compareLabel: "Plain water, cold drink and Taazu compared",
    cols: ["Plain water", "Cold drink", "Taazu"],
  },
  inside: {
    eyebrow: "Andar kya hai",
    title: "Nimbu, namak, aur thoda science.",
    labelTitle: "Nutrition information · Per 250 ml",
    soonTitle: "Lab report coming soon.",
    soonBody: "We'll publish exact numbers per 250 ml, straight from our NABL lab report. No guessing.",
    made: "Made in Ahmedabad.",
  },
  flavours: {
    eyebrow: "Flavours",
    title: "Two flavours. Dono desi.",
    lead: COPY.flavoursLead,
    waitSticker: "Bottle coming Feb 2027",
    waitTitle: "Bottle aa rahi hai.",
    waitBody: "250 ml sealed bottles" + (SITE.prices.bottle ? ", " + SITE.prices.bottle : "") + ". Join the waitlist and we'll WhatsApp you first.",
  },
  station: {
    eyebrow: "Taazu Station",
    title: "Bring the Taazu station to your event.",
    sub: "Garba ki raat lambi hai.",
    body: "A chilled nimbu-namak counter, right where the action is. You bring the crowd, we bring the Taazu.",
    bringLabel: "What we bring:",
    bring: SITE.stationIncludes || SITE.stationDefault,
    requestBtn: "Request a station",
    waBtn: "WhatsApp us",
    cases: [
      { icon: "garba", title: "Garba & Navratri nights", line: COPY.garbaLine },
      { icon: "run", title: "Marathons & running clubs", line: "Cups ready at the start, the finish and the Sunday riverfront run." },
      { icon: "turf", title: "Turf tournaments", line: "Floodlights, full squads, hot evenings. Last over tak taazu." },
      { icon: "corp", title: "Corporate & school events", line: "Sports days, offsites and annual functions, served clean and on-brand." },
    ],
  },
  business: {
    eyebrow: "For businesses · Kahan milega",
    title: "Stock Taazu at your place.",
    lead: "Gyms, turfs, running clubs and canteens across Ahmedabad. One WhatsApp message and we'll sort the rest.",
    btn: "Stock Taazu",
    partnersTitle: "Find us at",
  },
  trust: { made: "Made in Ahmedabad", still: "Still, not fizzy", lab: "NABL lab-tested", nimbu: "Real nimbu" },
  proof: {
    eyebrow: "Amdavad bol raha hai",
    title: "What people said at our sampling.",
    igEyebrow: "From our Instagram",
    igTitle: "#TaazuRaho",
    igBtn: "Follow us on Instagram",
  },
  faq: { eyebrow: "FAQ", title: "Sawaal? Jawab yahan." },
  contact: {
    eyebrow: "Contact",
    title: "Chalo, baat karte hain.",
    lead: "Planning an event, running a gym or turf, or feeding a canteen? Tell us a little and we'll plan it with you.",
  },
  bottle3d: { eyebrow: "3D bottle", title: "Ghuma ke dekho.", lead: "Drag to turn the 250 ml bottle. Switch between Classic and Jeera, or see both together.", open: "Open full screen" },
  reels: { eyebrow: "Reels", title: "Dekho, phir piyo.", lead: "Two 30-second reels from Taazu. Sound on." },
  final: { line1: "Garmi tez hai.", stationBtn: "Book a Station", tag: "#TaazuRaho" },
  footer: {
    tagline: "Paani se aage.",
    gu: "અમદાવાદનું પોતાનું.",
    madeWith: "Made with nimbu in Amdavad",
    quick: "Quick links",
    contact: "Contact",
  },
};

const priceRow: Row[] = SITE.prices.cup ? [{ label: "Price", cells: ["Lowest", "Varies", "Cup " + SITE.prices.cup] }] : [];
export const COMPARE: Row[] = ([
  { label: ING.saltsRow, cells: ["None added", "Usually little or none", "Added"] },
  { label: "Taste", cells: ["Plain", "Sweet & fizzy", "Tangy, salty, still"] },
  { label: "Built around", cells: ["Just water", "Sugar-first", "Nimbu-namak first"] },
  { label: "Sugar per 250 ml", cells: ["0 g", "Check the label", SITE.nutrition.Sugar || "On our label soon"] },
] as Row[]).concat(priceRow);

export const FAQ: [string, string][] = [
  ["What is Taazu?", ING.faqWhat],
  ["How is it different from plain water or a cold drink?", ING.faqDiff],
  ["How is it different from nimbu-paani from a thela?", "We love a good thela! Taazu is made from the same measured recipe every time, so it tastes the same every time. From February 2027 it also comes in sealed bottles, with everything written on the label."],
  ["How much sugar is in it?", SITE.nutrition.Sugar ? "Per 250 ml, Taazu has " + SITE.nutrition.Sugar + " of sugar, from our NABL lab report." : "We'll share exact numbers per 250 ml as soon as our NABL lab report is in. We'd rather wait than guess."],
  ["Where can I buy it?", COPY.faqWhere],
  ["Do you do bulk or event orders?", COPY.faqBulk],
  ["When is the bottle coming?", "250 ml sealed bottles are planned for February 2027. Join the waitlist and we'll WhatsApp you first."],
];
