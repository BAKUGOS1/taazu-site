# Taazu website

Amdavad ka apna electrolyte drink. Next.js + TypeScript + Tailwind, Vercel pe live.

## 1. Pehli baar chalana (apne laptop pe)

1. Node.js install karo: nodejs.org se "LTS" version (22 ya naya). Install ke baad laptop restart kar lo.
2. taazu-site folder kholo. Upar address bar mein cmd likho aur Enter dabao. Terminal khulega.
3. Yeh do commands chalao, ek ke baad ek:

       npm install
       npm run dev

4. Browser mein kholo: http://localhost:3000
   Koi bhi file save karoge to page apne aap update ho jaayega.
5. Band karna ho to terminal mein Ctrl + C.

Dev mode mein upar-left ek chhota button hai: "Dev: show placeholders". Isse dikhta hai ki kaunse hisse abhi chhupe hain (FSSAI, nutrition, partners...). Yeh button live website pe kabhi nahi aata.

## 2. Text, price, number badalna

Sab kuch ek file mein hai: content/site.ts
Notepad se, ya better VS Code (free: code.visualstudio.com) se kholo.

Zaroori switches:
- launchStatus: "soon" se "live" karo jab stations sach mein chalu ho jaayein. "Pre-order" wala text apne aap "Order" ban jaayega.
- confirmIngredients: true karo jab supplier ki ingredient list mein potassium confirm ho.
- flags.showNavratriBanner: Navratri ke baad false.
- prices.cup / prices.bottle: khaali "" karoge to price line chhup jaayegi.
- nutrition: chaaron values NABL report se bharo, tabhi nutrition label dikhega.
- fssai: 14-digit number daalo, trust strip aur footer mein apne aap aa jaayega.
- flags.showLabTested, flags.showRealNimbu: sirf tab true jab proof haath mein ho.
- partners, testimonials: bharoge to section apne aap dikhne lagega.
- Naya flavour: flavours mein ek block copy karke badlo. Chhupana ho to show: false.

Dhyan rakho: text double quotes " " ke andar hi likho, aur line ke end ka comma mat hatao. Galti ho jaaye to Ctrl + Z.

## 3. Logo aur brand files

Brand kit ki files yahan rehti hain: public/brand/
- logo-v2/taazu-logo-horizontal.png (header aur footer: naya glossy drop + orange TAAZU logo)
- logo-v2/taazu-drop.png (hero ke round seal ke beech mein)
- logo-v2/taazu-icon-512.png (Google ke liye logo)
- icons/ (favicon.ico, apple-touch-icon-180x180.png, pwa-192x192.png, pwa-512x512.png), sab naye drop se bane
- creatives/ (Instagram strip: jo files 01, 02, 07 se shuru hoti hain)
- logos/ purane Concept A/B logos hain, ab use nahi hote

Photos (Gemini renders, Taazu app repo ke brand-kit se): public/images/ (hero-duo, flavour-classic, flavour-jeera, ingr-*).
Reels: public/video/ (content/site.ts mein reels list). Share image: app/opengraph-image.jpg.

Koi file missing ho to website placeholder dikhati hai, tootti nahi. File daalne ke baad dev server restart karo (Ctrl + C, phir npm run dev).

## 4. Photos lagana

1. Photo public/images/ mein daalo (WebP, 200 KB se kam).
2. content/site.ts mein path likho, jaise hero.image: "/images/hero-cup.webp".
3. Save. Illustration ki jagah photo aa jaayegi.
Kaunsi photo kis size ki: public/images/README.txt

## 5. Vercel pe live karna (pehli baar)

taazu-site folder ke terminal mein:

       npx vercel

- Login karo (browser khulega).
- "Set up and deploy?" : Y
- "Link to existing project?" : N   (DHYAN: aapka purana "taazu" project internal app hai, usko mat chuno)
- Project name : taazu-site
- Baaki sab Enter.

Phir live karne ke liye:

       npx vercel --prod

URL milega, jaise https://taazu-site.vercel.app. Agar URL alag hai to content/site.ts mein siteUrl badlo aur phir se "npx vercel --prod".

Baad mein koi bhi badlav: file save karo, phir "npx vercel --prod". Bas.

## 6. Apna domain lagana (jaise taazu.in)

1. Domain kharido (GoDaddy, Hostinger, BigRock...).
2. vercel.com par taazu-site project, Settings, Domains mein taazu.in add karo.
3. Vercel jo DNS records dikhaye, woh domain wale ki website pe DNS settings mein daalo.
4. 10 minute se 24 ghante lag sakte hain. Vercel mein green tick aa jaayega.
5. content/site.ts mein siteUrl: "https://taazu.in" karo aur "npx vercel --prod".

## 7. Form ka data kahan jaaye

Abhi: formMode "whatsapp". Form bharne pe WhatsApp khulta hai details ke saath. Koi server nahi, koi kharcha nahi.

Recommended upgrade: Google Sheet (free, har lead ek row mein).
1. Nayi Google Sheet banao. Pehli row mein headings: Time, Kind, Name, Phone, Type, Business, Date, Qty, Area, Message.
2. Extensions, Apps Script. Sab mita ke yeh paste karo:

       function doPost(e) {
         var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
         var d = JSON.parse(e.postData.contents);
         sheet.appendRow([new Date(), d.kind, d.name, d.phone, d.type || d.iam || "", d.biz || "", d.date || "", d.qty || "", d.area || "", d.msg || ""]);
         return ContentService.createTextOutput("ok");
       }

3. Deploy, New deployment, type "Web app". Execute as: Me. Who has access: Anyone. Deploy. Permission maange to Allow.
4. Jo Web app URL mile, woh content/site.ts mein formEndpoints.sheetsUrl mein daalo.
5. flags.formMode: "sheets" karo, save, deploy. Ek test form bharo aur sheet check karo.

Formspree: formspree.io pe form banao, ID ko formspreeId mein daalo, formMode "formspree".
Supabase: table "leads" banao, do column: kind (text) aur data (jsonb). URL aur anon key daalo, formMode "supabase".
Form mode badalte hi Privacy page ka text apne aap update ho jaata hai.

## 8. Analytics (optional)

Google Analytics 4 ka ID (G-XXXX) ga4Id mein daalo. WhatsApp taps aur form submits events ki tarah dikhenge. Privacy page apne aap bata dega ki analytics chal raha hai.

## 9. Legal rules (kabhi mat todna)

- FSSAI ne drinks ke naam aur label mein jo 3-letter oral-rehydration wala shabd ban kiya hai (brief Section 9, rule 1), woh kahin mat likhna. Hum "electrolyte drink" kehte hain.
- Koi medical claim nahi: treat, prevent, cure, heatstroke, "doctor recommended", "health drink", "immunity", "detox" wagaira nahi.
- "Low sugar", "zero sugar", "X mg sodium" jaise claims sirf NABL lab report ke number ke saath.
- FSSAI number sirf asli wala.
- Asli logon ki photo sirf unki permission se.
- Kisi competitor brand ka naam nahi.

## 10. Kuch galat ho jaaye to

- "npm is not recognized": Node.js install nahi hua. Step 1 dobara, phir laptop restart.
- Port 3000 busy: purana terminal band karo, ya jo naya port dikhe (3001) woh kholo.
- Deploy fail ho: terminal mein "npm run build" chalao, jo red text aaye woh copy karke Claude ko bhejo.
