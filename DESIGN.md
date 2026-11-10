# Fahrschule Kickdown – Design Plan (Private Demo)

Status: gebaut (Private Demo, dunkles „cinematic" Design seit Nov 2026). Quelle aller Inhalte: `CONTENT.md` (Stand 2026-11-04) und die Bilder in `public/old-site/`.
Sprache der Website: Deutsch (du-Form, wie bisher). Dieses Dokument ist auf Englisch, alle Beispiel-Texte für die Seite auf Deutsch.
Fragen an den Inhaber: siehe `OWNER-QUESTIONS.md`.

---

## 0. The idea in one paragraph

**"Nachtfahrt & Tageslicht."** Kickdown's own material already tells the story: a speedometer needle in the logo, a fleet of mostly lapis-blue cars wrapped in white and red, and old banners that are all night drives through a city. The new site borrows that: emotional moments (hero, the journey, the showroom) happen **at night** – dark blue asphalt, headlight glow, the car on a turntable. Everything a learner or parent has to *read and decide on* (prices, times, the form) happens **in daylight** – a cool white like a number plate, black text, big tabular numbers. The switch between night and day is the structure of the site, not decoration: night tells you how it feels, day tells you what it costs and when.

The one bold thing is the **3D car + scroll journey on the start page**. Everything else stays calm, exact and easy to scan.

**Update (post-launch revision):** the homepage is now short on purpose – hero, a short welcome, prices and times, and a way to get in touch. The one bold thing left is the **3D car**, which now keeps turning on its own instead of sitting still between drags. The scroll journey ("Deine Strecke zum Führerschein") and the simulated 4-step sign-up form were both removed; "Anmelden" is a real phone call now, not a form. Team and vehicles moved off the homepage onto their own full pages (`/team`, `/fahrzeuge`) – see 3.1 and 4.3/4.7 for what changed and why.

**Update (Nov 2026) – dark cinematic redesign (current direction, supersedes "Tageslicht").** The whole site is now night: near-black, charcoal, graphite and deep blue, with Kickdown blue and a little red as the only accents. There are no full-width white sections any more – light fills only on small elements (the call buttons, the selected toggle segment, the white border of the blue address sign). Reading stays easy: body text is off-white (`--text`, 17 : 1) or soft grey (`--text-2`, 10 : 1) on charcoal. The homepage opens with a **full-screen hero**: the 3D car, very large on a transparent canvas, in front of a huge, quiet "KICKDOWN" lettering, with the headline "Dein Kickstart in Bremen" (new wording – owner question 39). On load the car drives in while a light sweeps across its paint; scrolling out of the hero (GSAP ScrollTrigger, scrubbed, never pinned) turns its nose toward the viewer, it grows and drives on into the next section. Sections fade between dark tones; the road-line seams became a hairline that catches one light sweep. Blocks below the fold rise in softly once. Details: 2.1 (tokens), 2.4 (motion), 4.1 (hero).

**Update (Nov 2026) – road journey back, hero car fixed in place.** The winding road journey (Anmeldung → Theorie → Fahrstunden → Prüfung) is back on the homepage right after the hero, restyled dark (4.3); its small car follows the scroll in both directions, also with reduced motion (then 1:1). The hero car no longer grows, turns or drives away on scroll – it stays in place and keeps its auto-rotation, dragging and pause button (4.1).

---

## 1. DEMO RULES (apply to everything below)

These decisions are fixed for the private demo and override anything else in this document.

### 1.1 Content
- All **visible** old-site text and facts are used **word for word**: no rewriting, no grammar or spelling fixes, original capitalisation kept (e.g. "MIT SCHÜLER/STUDENTEN AKTION", "(ERSPARNIS VON 260 €)", "OHNE AKTION", "Automatik Getriebe", "einen passendes Theorie-Angebot").
- **Friday office hours** are shown as in the footer ("Freitag: 16:00 Uhr bis 19:00 Uhr") everywhere office hours appear. The Kontakt page sentence (Montag + Samstag only) stays word for word as its own text. The conflict is an owner question.
- **Never shown:** hidden phone number (+49 1525 6751996), the hidden e-mail address, the hidden student-offer popup, the Fahrlehrerverband membership, promotions (Christmas Deal), old course dates and the old Intensivkurs texts.
- All **7 vehicles** exactly as on the old site (names, "mit … ausgestattet" lines, every spec line, same order).
- **Inna Korobova** keeps the empty-window card with her name and role.
- **No new content:** no Sehtest, Erste Hilfe, other licence classes, reviews, pass rates, instructor details or prices that are not in CONTENT.md. New words are limited to UI labels (buttons, form labels, hints, demo notices – listed in 5.13).

### 1.2 Images
- Real team and car photos are shown **only at sizes where they stay sharp** (rules in 2.5). Never upscaled, not even by CSS.
- **No AI editing or AI upscaling** of photos of real people (or any old-site photo). Allowed: plain cropping, CSS frames/masks and CSS overlays that don't change the pixels of a face.
- **Theory photo** (`unterricht/theorie/01.jpg`) is used only as a **cropped copy** that removes the supplier's name, address, phone numbers, e-mail and website (details in 4.7).
- **Old background photos are not used** (`banner/s-1.jpg`, `s-2.jpg`, `s-3.jpg`, `brt-1.jpg`) because their licence is not confirmed (Impressum lists "© Adobe Stock Fotos"). All backgrounds are built with **CSS or Three.js**.

### 1.3 Demo safety
- The **sign-up form is a simulation**. It sends nothing (no `fetch`, no form `action`, no server route), stores nothing (no `localStorage`, `sessionStorage`, cookies or IndexedDB; inputs use `autocomplete="off"`), and says so clearly on every step and on the result screen.
- **noindex everywhere:** `metadata.robots = { index: false, follow: false }` in the root layout, `app/robots.ts` with `Disallow: /`, and an `X-Robots-Tag: noindex, nofollow` header in `next.config.ts`.
- A small, clear **"Private Demo"** label on every page (see 2.6).
- **No third-party requests** at runtime: fonts self-hosted, no Google Maps iframe, no analytics, no external scripts. The Instagram and map links are plain outbound links the visitor must click.
- **Nothing is published.** The demo runs only locally (`next dev` / `next start`). No deployment, no hosting, no shared links.

### 1.4 Budget and scope
- **Free tools and assets only:** OFL fonts, CC0 (or self-built) 3D model, free software (Blender, glTF-Transform, sharp/ImageMagick for the crop).
- **3D car:** a generic model with **no real brand logos** – no car-maker badges, no grille logo, no real number plate.
- **Phase 1 = homepage only.** All other pages are built only after the homepage is approved (see section 3).

---

## 2. STYLE

### 2.1 Colors

Taken from the logo (`logo/logo.png`, sampled) and the real fleet photos (`fahrzeuge/*.jpg`).

| Token | Hex | Source | Use |
|---|---|---|---|
| `--kd-blau` | `#009CDC` | Logo, "KICKDOWN" lettering | Brand color. Buttons and highlights **on dark**, focus rings, active states. |
| `--kd-blau-text` | `#0072A8` | Darker step of logo blue | Links and blue text **on light** (logo blue on white is only ~3:1 – too weak for text). ≥ 4.8:1 on `--tag`. |
| `--tacho-rot` | `#E63A3C` | Logo, speedometer needle; red wrap on the cars | Only for "the needle": the active step in the form gauge, required-field marks, error text. Never a big surface, never the main button. |
| `--lapis` | `#1D4FA6` | Paint of the T-Roc / Q2 fleet | Deep brand blue for night surfaces with color (journey gradient, showroom floor light, footer). |
| `--nacht` | `#0C1824` | Night mood of the old site (blue-black, not grey-black) | Night page background. |
| `--asphalt` | `#2A3440` | – | Panels on night sections, dividers on dark, base of the CSS road texture. |
| `--tag` | `#F4F6F8` | "Daylight", cool white like a number plate | Light page background. |
| `--tinte` | `#121A22` | – | Body text on light. |
| `--grau` | `#5B6875` | – | Secondary text on light (≥ 5:1 on `--tag`). |
| `--markierung` | `#FFFFFF` | Road marking | Text on night, the dashed lane line. |

**Dark cinematic system (current, Nov 2026)** – in `app/globals.css`. The day tokens above (`--tag`, `--tinte`, `--grau`, `--kd-blau-text`) are no longer used for surfaces or text.

| Token | Value | Use |
|---|---|---|
| `--ink` | `#05070A` | Near-black: hero, page headers, header, footer |
| `--charcoal` | `#0B0E12` | Main reading surface |
| `--graphite` | `#12161C` | Raised bands (team, contact), photo mounts |
| `--deep` | `#081226` | Deep-blue band (prices) |
| `--surface` / `--surface-2` | `#151A21` / `#1B2129` | Small panels |
| `--line` / `--line-strong` | white 8 % / 18 % | Hairlines, outlines |
| `--text` / `--text-2` / `--text-3` | `#EEF1F4` / `#B9C2CC` / `#8F9AA6` | Headings and numbers / body and long text / small print (17 : 1 / 10 : 1 / 6.4 : 1 on charcoal) |

- Accents: `--kd-blau` for links, focus rings, the number-plate bands and the active nav line (≥ 5.9 : 1 on the surfaces); `--tacho-rot` only as a hairline (hero small line, demo pill) and for the photo-approval frame.
- Primary actions are light pills (`--text` on dark, `--ink` text) that turn Kickdown blue on hover.
- Photos are shown complete and unchanged in a quiet passe-partout mount (graphite, 10 px, hairline) – no filter, mask or overlay on the pixels.

Rules (first build, kept for reference)
- Night sections: `--nacht` background, `--markierung` text, `--kd-blau` accents.
- Day sections: `--tag` background (white `#FFFFFF` for tables on it), `--tinte` text, `--kd-blau-text` links.
- Red appears at most once per screen.
- All pairs checked against WCAG AA (4.5:1 text, 3:1 UI).

### 2.2 Fonts

| Role | Font (free, OFL) | Why |
|---|---|---|
| Display (headlines, prices, times, numbers) | **Archivo** (variable, `wdth` 62–125, `wght` 100–900) | The logo is a wide, heavy sans. Archivo at `wdth 125`, `wght 800` gives the same "car badge" stance; the width axis lets headlines go wide on desktop and slightly narrower on phones. Tabular figures for prices/times. |
| Body, form, UI | **Atkinson Hyperlegible Next** | Built for legibility (clear `I/l/1`, open shapes). Audience: 17-year-olds on phones and parents reading prices. Clearly different from Archivo. |

- Both self-hosted through `next/font` (no request to Google at runtime).
- Full German character set (ä ö ü ß, „ “ – €).
- Our own UI labels are never set in all caps. Old-site text keeps its original capitalisation (rule 1.1) – the all-caps price labels are shown as written, in Archivo 700 at small size with normal letter-spacing so they don't shout.
- Prices and times always use `font-variant-numeric: tabular-nums`.

Type scale (premium refinement, Nov 2026 – smaller and calmer than the first build; one step between phone, tablet ≥ 640 px and desktop ≥ 1024 px):

| Step | Phone | Tablet | Desktop | Font / weight |
|---|---|---|---|---|
| Hero small line | 12 px caps, +0.1em | 12 px | 12 px | Atkinson 700 |
| Hero headline | 32 px / 1.1 | 40 px | 42–54 px / 1.06 | Archivo 600, wdth 100, −0.02em |
| H1 (subpages) | 32 px / 1.1 | 40 px | 48 px / 1.06 | Archivo 600, wdth 100, −0.02em |
| H2 | 26 px / 1.15 | 30 px | 36 px / 1.1 | Archivo 700, wdth 108, −0.01em |
| H3 | 19–20 px / 1.25 | – | 28 px / 1.15 | Archivo 700 |
| Navigation | 17 px (menu panel) | – | 15 px | Atkinson 700 |
| Price / time numbers | 28 px | 36 px | Archivo 700, tabular |
| Body | 17 px / 1.55 | 18 px / 1.6 | Atkinson 400 |
| Small | 15 px / 1.5 | 15 px / 1.5 | Atkinson 400 |

Text blocks max. 64 characters wide. Left aligned everywhere (centered only for the hero headline on phones).

### 2.3 Spacing and layout

- 4 px base. Scale: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 72 · 112.
- Phone gutter 20 px; tablet 32 px; desktop 48 px. Content max 1200 px, text max 64ch.
- Section padding: 64–72 px phone, 104–112 px desktop. Subpage header 56 px / 96 px.
- Radius has meaning: **0** for photos (complete, no mask), **pill** for buttons and links that act like buttons (Anrufen, Route planen, Instagram, jump links), **14 px** for cards and price panels, **10–14 px** for the segmented price toggle.
- Borders are hairlines (1 px, light grey on day, white at 6–18 % on night) with a soft shadow on day cards; no 2–3 px dark outlines. Focus rings: 2 px `--kd-blau`, 3 px offset.
- Tap targets ≥ 48 px. Phone layout first, then widen at 640 / 1024 / 1440.

### 2.4 Motion

GSAP + ScrollTrigger (installed), React Three Fiber + drei for 3D.

- **One orchestrated moment on load:** the hero. Headlights fade on (0.6 s), the car turns once into a three-quarter view (1.2 s), headline appears.
- **Update:** after that intro the car does not just sit still – it keeps turning on its own, slowly and continuously, like a turntable, with a very slight float (±1.2 cm, ~7 s period). A drag still rotates it freely at any time; on release it eases from the drag speed back into the same steady spin rather than snapping back to a fixed angle. A small, discreet **pause/play button** (bottom-right of the stage, "Drehung anhalten", `aria-pressed`) stops spin and float; dragging still works while paused (WCAG 2.2.2). (The scroll journey that used to be the one scroll-driven moment was removed – see 4.3.)
- **Dark cinematic redesign (current):** opening – the car drives in from the left with turning wheels while the studio reflections rotate across its paint (a light sweep), then it turns into the three-quarter view (≈ 2.6 s); the "KICKDOWN" lettering settles and catches a sheen; the text rises. Scroll-out (GSAP ScrollTrigger, scrubbed 0.35 s, no pin, `components/hero/hero-motion.tsx`): only the typography moves – the lettering drifts up and dims, the text fades. **The hero car is not animated by scrolling (removed Nov 2026): it stays in place.** The second scroll moment is the road journey (4.3). Site-wide (`components/site/site-motion.tsx`): blocks below the fold fade and rise in once; section hairlines catch one light sweep; refined hovers (button light pass, panel lift, underline colour). All of it only with `prefers-reduced-motion: no-preference`.
- Everything else is **response motion only**: switching a showroom car, hover/press feedback. 150–250 ms, `ease-out`.
- No fade-and-slide-up on every section, no hover wiggles.
- **Car scroll progress (every page, built):** the small top-down car from the former journey drives along a slim road strip at the bottom of the sticky header – forward when scrolling down, backward when scrolling up (3.3). With motion allowed it glides to its spot with a short exponential ease (no overshoot, no bounce); it never moves by itself.
- `prefers-reduced-motion: reduce` → same design and content, but no opening sequence, no scroll animation, no reveals or light sweeps; no intro, no auto-spin, no float and no pause button (nothing moves by itself, so there is nothing to pause); the 3D car is still shown and can still be dragged; instant transitions. The car progress indicator **stays visible** and its position is set directly from the scroll position (1:1, no smoothing, no automatic movement).

### 2.5 Photo sizes (sharpness rules)

Native sizes: team and car photos **370 × 400 px**; shop window **870 × 470**; praxis **870 × 390**; theory crop **870 × ~370**.

- A photo is never shown wider than its native pixel width (no upscaling at any screen density).
- Target ≥ 1.5 image pixels per CSS pixel so photos stay sharp on most phones (DPR 2–3 will be slightly soft, never blurry):
  - Team and car photos: **max 248 × 268 CSS px**.
  - Wide photos (shop window, praxis, theory crop): **max 580 CSS px wide**.
- Served with `next/image` and fixed `sizes` so the browser never requests or scales beyond the original; `unoptimized` is not needed, but quality ≥ 85 to avoid extra artefacts on already small JPEGs.
- The layouts in section 4 are designed around these sizes: the drama comes from the CSS/Three.js stage around the photo, not from making the photo big.

### 2.6 "Private Demo" label

- A small pill **"Private Demo"** inside the sticky header, right next to the logo – visible on every page and at every scroll position, never covered by the phone bottom bar.
- Style: `--tacho-rot` 1 px outline, white text on night / `--tinte` text on day, 13 px Atkinson 700. Not dismissible.
- `aria-label="Private Demo – keine echte Website der Fahrschule"`.
- The page `<title>` gets the suffix " – Private Demo".

### 2.7 Backgrounds without old photos

| Old background | Replacement |
|---|---|
| `brt-1.jpg` asphalt (subpage headers, journey road) | CSS asphalt: `--asphalt` base + SVG `feTurbulence` grain (inline, ~1 KB) + dashed `--markierung` center line via `repeating-linear-gradient`. |
| `s-1.jpg` car at night (old hero) | The Three.js hero scene itself (night stage, rim light, wet-floor reflection). |
| `s-3.jpg` cockpit at night (journey "Fahrstunden") | CSS: blurred streaks of light (`linear-gradient` bands with `filter: blur`) moving toward the viewer on scroll, like city lights through a windshield. |
| `s-2.jpg` people in front of Bremen Rathaus (journey "Prüfung") | The journey ends with the asphalt seam (dashed road line) and the daylight price section begins – the "road ends in daylight" moment. No people, no landmarks. (Built first as a soft gradient; replaced by the crisp seam.) |

---

## 3. SCOPE AND SITE MAP

### 3.1 Phase 1 – homepage (build now, after this plan is approved)

**Update (Nov 2026): the road journey is back** on the homepage, right after the hero (4.3) – the sign-up simulation, team and showroom stay off the homepage. Current order: hero → road journey → Willkommen → Preise → Zeiten → Kontakt → footer.

**Update (post-launch revision): the homepage was shortened.** Team, the showroom, the scroll journey and the sign-up simulation were removed from `/` – see "As revised" below for why and where that content lives now. The numbered list right below is the **original** Phase-1 plan, kept for history; it no longer matches the built site.

Sections on `/`, in order (original plan):

1. Header (logo, "Private Demo" pill, nav Preise · Fahrzeuge · Team · Kontakt + "Anmelden" button; "Menü" panel below 1024 px) + phone bottom bar (Anrufen · Zeiten · Anmelden, below 640 px)
2. Hero with 3D car (4.1) – night
3. Willkommen text + shop-window photo (4.2) – day
4. Scroll journey Anmeldung → Theorie → Fahrstunden → Prüfung (4.3) – night
5. Preise – full "Preisliste für Klasse B" with both lists and all footnotes (4.6) – day
6. Zeiten – Bürozeiten, Theoriezeiten, Praxiszeiten (4.6) – day; the one main place for the full office hours
7. Team – all 8 people incl. Inna Korobova (4.4) – night (moved above the showroom: who teaches matters most to parents)
8. Showroom – all 7 vehicles, the three identical VW T-Roc automatics on one card (4.5) – night
9. "Du hast Fragen zu Führerschein und Fahrschule?" contact block with phone, link to the office hours, address – day
10. Anmeldung – 4-step simulated form (4.7) – day
11. Footer – night

**As revised, sections on `/` are:**

1. Header (logo, "Private Demo" pill, nav Unterricht · Preise · Fahrzeuge · Team · Kontakt + "Anrufen" button; "Menü" panel below 1024 px) + phone bottom bar (Anrufen · Zeiten · Kontakt, below 640 px)
2. Hero with 3D car (4.1) – night
3. Willkommen text + shop-window photo (4.2) – day
4. Preise – full "Preisliste für Klasse B" with both lists and all footnotes (4.6) – day
5. Zeiten – Bürozeiten, Theoriezeiten, Praxiszeiten (4.6) – day; the one main place for the full office hours
6. "Du hast Fragen zu Führerschule und Fahrschule?" contact block with phone, link to the office hours, address – day
7. Footer – night

Reasons: a learner deciding whether to call shouldn't have to scroll past a full team roster and vehicle fleet first – those matter once someone is already interested, so they live on their own pages (`/team`, `/fahrzeuge`), reachable from the header nav and footer on every page, same as before. The scroll journey repeated facts the price/times sections already state and added a second big motion set-piece competing with the hero; its own text was never unique to it (see 4.3). The sign-up simulation added a whole flow for something that was never going to be real in the demo; a phone number is a clearer, more honest call to action (see 4.7).

Section pattern: every section opens with just its H2 (`components/site/section-heading.tsx`) – no small eyebrow label above it any more, on this page or on any subpage (removed sitewide as an unnecessary repeated decoration). Night ↔ day switches are still marked by the same crisp seam – a short asphalt strip with a dashed white road line (`components/site/seam.tsx`) – but there are only two of them now (into Willkommen, out of Kontakt) instead of five. **Dark redesign:** the seam is now a fine hairline that catches one soft light sweep when it scrolls into view; the sections around it fade between dark tones (charcoal → deep blue → charcoal → graphite).

No repetition: prices appear only in the price list; full office hours only in `#zeiten` (plus footer); other places link to `#zeiten`. Every fact still appears at least once, on the homepage or on a subpage.

Prices and times are full versions on the homepage; team and the showroom are full versions on their own pages. Later subpages reuse the same components either way.

All planned pages now exist (3.2), so the earlier shared placeholder page was removed; every nav and footer link goes to a real page.

### 3.2 Phase 2 – other pages (only after the homepage is approved)

All 10 old pages keep their content. Theorie and Praxis become one page (`/unterricht`) with two sections (both repeated the same times and "Unterrichtsform" links). Old `.html` URLs map to the new routes.

| New URL | Replaces | Content |
|---|---|---|
| `/` Start | `index.html` | Phase 1 (above). |
| `/unterricht` | `theoretischer-unterricht.html`, `praktischer-unterricht.html` | `#theorie`: cropped theory photo, course text, Theoriezeiten. `#praxis`: praxis photo, text, "Praxiszeiten: nach Vereinbarung". `#buerozeiten`: the office hours (shown on both old pages) once, with the phone link. "Unterrichtsform" keeps its two links as jump links to `#theorie` / `#praxis` – no tab switch, so no text is hidden. |
| `/preise` | `preise.html` | Same price component as homepage. |
| `/fahrzeuge` | `fahrzeuge.html` | Same showroom component. |
| `/team` | `team.html` | Same team component + link to `/ausbildungsfahrschule`. |
| `/ausbildungsfahrschule` | `ausbildungsfahrschule.html` | Heading, the one sentence, shop-window photo, phone/address. |
| `/kontakt` | `kontakt.html` | **Current (Nov 2026, duplicates removed):** contact text (word for word, incl. the Montag/Samstag hours), one card with name + address (one map link, opens Google Maps in a new tab) and phone (one call link), shop-window photo. The separate Bürozeiten card and the blue address sign with "Route planen" were removed – they repeated the intro's hours, the phone and the address; the full office hours (incl. Freitag) are in the footer on every page. Earlier: contact text (word for word), address, phone, office hours, shop-window photo, a static CSS map card with address + outbound link "Route planen" (goo.gl link). **No Google Maps iframe in the demo.** |
| `/impressum` | `impressum.html` | All text word for word. |
| `/datenschutz` | `datenschutz.html` | All text word for word. (Must be reviewed by the owner before any real launch – see owner questions.) |
| Cookie dialog | Cookie banner | The demo sets no cookies and loads no third parties, so the banner does not pop up. "Cookie-Einstellungen" in the footer opens the dialog with all original texts as a design preview; choices are not saved, and the dialog shows "Demo: Auswahl wird nicht gespeichert." |

**Update:** the optional `/anmeldung` route (same simulated form as the homepage section) was never built, and the homepage's own sign-up simulation was later removed entirely (4.7). There is no sign-up route or form anywhere in the demo; every "Anmelden" action is now a phone call or a link to `/kontakt`.

Old addresses are redirected (built, `redirects()` in `next.config.ts`, temporary 307 while this is a demo): `index.html`, `index-1.html` → `/`; `team.html` → `/team`; `theoretischer-unterricht.html` → `/unterricht#theorie`; `praktischer-unterricht.html` → `/unterricht#praxis`; `fahrzeuge.html` → `/fahrzeuge`; `ausbildungsfahrschule.html` → `/ausbildungsfahrschule`; `preise.html` → `/preise`; `kontakt.html` → `/kontakt`; `impressum.html` → `/impressum`; `datenschutz.html` → `/datenschutz`. For a real launch they can become permanent (308).

### 3.3 Global elements

- Header (built, premium refinement): 56 px phone / 64 px desktop, on the 1200 px grid; logo 116 / 148 px; links 15 px with 30 px gaps, a hairline underline that grows in on hover and stays (in blue, 2 px) for the current page; "Private Demo" as a 12 px pill with a red dot; "Anrufen" as an outlined pill with a phone icon that fills blue on hover. The phone menu panel has 17 px links with hairline separators, a blue bar in front of the current page and a short fade-in (none with reduced motion). Contents: logo · "Private Demo" · Unterricht · Preise · Fahrzeuge · Team · Kontakt · button "Anrufen" (a real `tel:` link; it was "Anmelden" → `#anmeldung` before the sign-up simulation was removed). Below 1024 px the links open from a "Menü" button (Escape closes, focus returns to the button). Not built: the office-time status chip.
- Phone (built, below 640 px): compact header (logo + demo pill + "Menü") and a **fixed bottom bar**: "Anrufen" (tel:+4917670386440, the visible number) · "Zeiten" (link to `#zeiten`; no sheet) · "Kontakt" (link to `/kontakt`; was "Anmelden" before the sign-up simulation was removed). The page reserves the bar's height at the bottom and in scroll-padding, so the bar never covers content or the footer; while a text field is focused (on-screen keyboard) the bar is hidden.
- Car scroll progress (built, all pages and widths): a 14 px dark road strip with a fine dashed line inside the sticky header; a thin Kickdown-blue line shows the road already driven, ending under the car; below logo, label and menu, so it never covers page text, buttons, the header controls or the phone bottom bar. The car (the journey's top-down car, turned to drive right) shows how far the page is scrolled. Decorative (`aria-hidden`). Anchor jumps account for the extra height via `html { scroll-padding-top }`. Page height and strip width are measured only on resize or content change – while scrolling each frame only reads `window.scrollY` (no layout reads). Code: `components/site/scroll-progress.tsx`.
- Footer: logo, address (map link), phone, Infos (Team, Unterricht, Fahrzeuge, Preise), Bürozeiten, Theoriezeiten, Instagram (icon + text link), Kontakt · Impressum · Datenschutzerklärung · Cookie-Einstellungen, and the bottom line "© 2026/2027 | Design & Entwicklung: Abdullah Diab" – the © part as on the old site; the credit replaces "Programmiert durch KS Design." and its link (plain text, no link; owner question 41).

---

## 4. MAIN IDEAS

### 4.1 Hero – the car on the turntable

```
PHONE (390 px)                       DESKTOP (1440 px)
┌──────────────────────┐             ┌──────────────────────────────────────────────┐
│ [logo][Private Demo][≡]│           │ [logo][Private Demo] Unterricht Preise … [Anrufen] │
│                      │             │                                              │
│  Deine Fahrschule    │             │  Deine Fahrschule           ╭────────────╮   │
│  Kickdown in Bremen  │             │  Kickdown in Bremen        ╱   3D CAR     ╲  │
│                      │             │                           │  (always      │  │
│   ╭──────────────╮   │             │  Dein Weg zum              ╲  turning;    ╱   │
│  ╱    3D CAR      ╲  │             │  Führerschein Klasse B      ╰─ drag too)─╯   │
│ │  ⟲ ziehen zum    │ │             │                           ═══ turntable ═══  │
│  ╲    Drehen      ╱  │             │  [Jetzt anrufen] [Preise ansehen]             │
│   ╰══ turntable ═╯   │             │                                              │
│ Dein Weg zum         │             │  Büro heute 16:30–19:30 Uhr                  │
│ Führerschein Klasse B│             └──────────────────────────────────────────────┘
│ [Jetzt anrufen]      │
├──────────────────────┤
│ Anrufen  Zeiten  Kontakt │  ← fixed bottom bar
└──────────────────────┘
```

- Layout (dark cinematic redesign, current): a full-screen hero (phones: the space between header and bottom bar). Back to front: atmosphere gradients → the huge "KICKDOWN" lettering (Archivo 800, ~13 vw, white 3–20 %, decorative, `aria-hidden`) → the 3D car on a transparent canvas that covers the whole hero → the text. Text: small line "Deine Fahrschule Kickdown in Bremen" (old site), headline **"Dein Kickstart in Bremen"** (new, owner question 39), the old-site line "Dein Weg zum Führerschein Klasse B" (kept – old content is never removed) and the "Jetzt anrufen" call button (the phone-number link next to it was removed as a duplicate of the same action; the number is in the contact section, the header, the bottom bar and the footer). Desktop: the car fills about half the width, centred at ~66 %, the text sits bottom-left on the header grid with a calm gradient behind it, so it stays readable at every car angle. Phones/tablets: the car spans ~92 % of the width in the upper part (in front of the lettering), the text and call button sit below it and are never covered at rest. The whole hero is the drag surface (links stay clickable). Scrolling never moves, scales or turns the car – it scrolls away with the hero like any other content (the earlier scroll-out "drive away" was removed).
- Studio in Three.js: the canvas is transparent (no floor plane, no fog); a soft light pool and the car-shaped contact shadow sit on the "floor"; studio softbox reflections from local Lightformers (nothing downloaded). The camera uses a view offset to place the car per layout without changing the perspective.
- Earlier (premium refinement): text column 5/12 + stage 7/12; matte floor with fog and one faint ring – replaced by the full-screen hero above.
- Car (premium refinement): smoother plan view (nose and tail taper, tumblehome above the shoulder), deeper bevels, deep metallic lapis paint (#163a78) under a hard clear coat, gloss-black glasshouse, satin roof rails, rounded tyres with ten-spoke graphite rims and brake discs, dark headlight housings with a slim LED line, a dark red tail lens with a thin light line. The Kickdown logo file (unchanged) is printed straight onto the door paint – no white sign behind it – with the red/white stripe below. Still original: no brand, no real model, blank plates.
- **The car:** a generic compact-SUV shape, free:
  - Option A (preferred): a **CC0** low-poly model (e.g. from Kenney, Quaternius or Poly Pizza CC0 assets) – licence and source written to `public/demo/3d/CREDITS.txt`.
  - Option B (fallback): built in code from Three.js primitives/extrusions (simple, stylised, fully ours).
  - Painted in fleet lapis blue `--lapis` with an abstract white-and-red side stripe in Kickdown colors. **No logos of any brand** (no car-maker badge, no grille emblem, no Kickdown logo on the car), and a **blank number plate**.
- Interaction: the car turns on its own, slowly and continuously, from the moment the intro ends. Drag left/right overrides that and rotates around the vertical axis with light inertia; on release, instead of snapping back to the three-quarter rest pose, the car eases from whatever speed the drag left into the same steady auto-spin – it never just stops. On touch, `touch-action: pan-y`, so vertical swipes still scroll – only horizontal drags rotate. Keyboard: canvas focusable, ← → nudges the angle, Home eases back to the rest pose (then auto-spin resumes from there). Hint "Wischen zum Drehen" / "Ziehen zum Drehen", hidden after first use; pause/play button "Drehung anhalten" / "Drehung fortsetzen". Hint and pause button step aside as soon as the visitor scrolls. `prefers-reduced-motion: reduce`: no intro, no auto-spin – the car sits at the rest pose and only turns while actively dragged.
- **Fallback – current rule (Nov 2026, mobile fix):** the 3D car runs on every device with WebGL2, phones included. There are no device, screen-size, memory (`deviceMemory`), CPU (`hardwareConcurrency`), touch, Data Saver or frame-rate checks any more. The server-rendered SVG still (`car-still.tsx`) is shown only if WebGL2 is missing, the 3D scene crashes (error boundary), or – briefly – while the browser has taken the WebGL context away (it comes back by itself on `webglcontextrestored`). A slow device only gets a lower pixel ratio (the frame probe drops it to 1; never a fallback). Phones: pixel ratio ≤ 1.5, reflection map 128 px, no shadow maps, the light pool and contact shadow are textures. `?hero3d=0` still forces the still for testing. The list below is the original plan.
- **Fallback (original plan, superseded):** a still render of the same car on the same stage (`public/demo/hero-car.avif` + `.webp`, ~120 KB, made with Blender or a three.js screenshot – free) is the hero image and the LCP element. The canvas loads after the page is idle and replaces the still only if:
  - WebGL2 is available,
  - not `prefers-reduced-motion`,
  - not `navigator.connection.saveData`,
  - `navigator.deviceMemory` ≥ 4 (where available) and `hardwareConcurrency` ≥ 4,
  - a 1-second frame probe stays above ~45 fps – otherwise it silently switches back to the still.
- Budget: model ≤ 1.5 MB (glTF + meshopt/Draco via glTF-Transform), `dpr` clamped to [1, 1.5] on phones, `frameloop="demand"`, paused when out of view.

### 4.2 Willkommen

Day section. "Willkommen in der Fahrschule Kickdown" + both paragraphs word for word, left column 64ch. Right (desktop) / below (phone): shop-window photo `start/01.jpg` at max 580 CSS px wide, no filter.

**As built:** the photo is the original file, shown complete – no crop, no rounded corners, no mask, no overlay – so the visible copyright notice ("© Copyright … Werbegestaltung", bottom-right) is not cut off, covered or edited. Under the photo a visible demo note: "Demo-Hinweis: Dieses Foto muss vor der Veröffentlichung freigegeben werden." **The photo must be approved before going live (owner question 13 stays open).**

### 4.3 Road journey – "Deine Strecke zum Führerschein" (RESTORED, Nov 2026)

**Current:** restored from git (`c88deac^`) and placed on the homepage directly after the hero (the hero fades into it). Restyled for the dark cinematic design – charcoal with a little deep-blue air, no white section, no neon glow.

- **Stations:** 1 Anmeldung · 2 Theorie · 3 Fahrstunden · 4 Prüfung – each with its real text (word for word, see the table below) and ONE link. No prices, times or footnotes are repeated here.
- **Links:** "Anmelden" → `/kontakt` (the multi-step sign-up form stays removed; the contact page has the phone number) · "Theoriezeiten" → `#zeiten` · "Unsere Fahrzeuge" → `/fahrzeuge` (the showroom is no longer on the homepage) · "Preise ansehen" → `#preise`.
- **Road:** a sticky winding road (SVG, `components/journey/road-path.ts`) – dark asphalt with a hairline edge and a fine dashed lane line; numbered markers turn Kickdown blue when the car reaches them; a thin blue line shows the road already driven, ending under the car.
- **Car:** a small top-down car (same drawing language as the header progress car) drives along the road with the scroll – forward when scrolling down, backward when scrolling up (no pinning, `components/journey/journey-motion.tsx`). **Smooth on phones (current, Nov 2026):** the road is sampled once into a lookup table (no SVG path maths while scrolling). Station positions are measured only when the layout can have changed – start, load, web fonts, back/forward cache (pageshow), real resizes (width or orientation) and a ResizeObserver on the content; height-only resizes under 160 px (the mobile address bar) are ignored, so the car never jumps. While scrolling, the passive scroll listener only requests one animation frame; that frame reads `window.scrollY` (no layout read), computes the place from the cached values and writes a single GPU-friendly transform (`translate3d` + rotate). The DOM is only touched when something changes (stations reached, mode). Motion allowed: frame-rate-independent glide (~0.45 s, no overshoot). Reduced motion: the car is placed exactly where the scroll position says, every frame. No ScrollTrigger and no GSAP in the journey any more. (An earlier mobile fix read the stations' live positions on every update – that caused layout and style work on each frame and the stutter on phones.)
  - Motion allowed: the car glides to its spot (0.45 s, no overshoot); stations fade in as the car reaches them.
  - **Reduced motion (Windows "Animation effects" off): the road and car stay visible; the car's position is set directly from the scroll position on every scroll event (1:1, no smoothing, nothing moves by itself); all stations are always visible.**
  - Without JavaScript: the car waits at the start of the road; all stations are visible.
- The header's thin car scroll indicator stays as it is (3.3).
- Ids are page-scoped (`start-strecke-title`, `start-station-…`, see 6); the site-wide reveal (`site-motion.tsx`) leaves the journey alone.

<details>
<summary>Original plan and removal note (history)</summary>

A real sequence, so numbered markers are justified.

The section turns into a road seen from above: the **CSS asphalt** band (2.7) with a white dashed center line. As you scroll, the line "drives" toward you and a small top-down car silhouette (SVG, same stripe as the hero car, no logos) moves from station to station. Each station: big number + heading + only quotes and facts from CONTENT.md + one link.

```
PHONE                                   DESKTOP (road left, sticky; text right)
┌──────────────────────┐                ┌───────────────┬──────────────────────────┐
│   ┊     1 Anmeldung  │                │  ┊            │ 1  Anmeldung             │
│   ┊     text…        │                │  ┊   🚗       │    text… [Anmelden]      │
│   🚗                  │                │  ┊  (sticky   │                          │
│   ┊     2 Theorie    │                │  ┊   road,    │ 2  Theorie …             │
│   ┊     Di–Do 17:00… │                │  ┊   car      │ 3  Fahrstunden …         │
│   ┊                  │                │  ┊   moves)   │ 4  Prüfung …             │
└──────────────────────┘                └───────────────┴──────────────────────────┘
```

| Station | Content (word for word from CONTENT.md) | Link | Background |
|---|---|---|---|
| 1 Anmeldung | S8, first sentence: "Wir stehen dir gern als Ansprechpartner zur Verfügung und beraten dich vom ersten Antrag bis zur praktischen Prüfung zu allen Themen rund um den Führerschein." | "Anmelden" → `#anmeldung` | Night |
| 2 Theorie | U4, complete: "Unser Theorieunterricht findet in Form von Kursen statt. Das hat für dich den Vorteil, …" | "Theoriezeiten" → `#zeiten` | Night |
| 3 Fahrstunden | U10, complete: "Wir bereiten dich zu fairen Preisen mit modernsten Lehrmethoden gezielt auf deinen Weg zur Fahrprüfung vor. Unser flexibles Ausbildungskonzept orientiert sich dabei ganz an deine Bedürfnisse." | "Unsere Fahrzeuge" → `#fahrzeuge` | CSS light streaks |
| 4 Prüfung | S6, end of a sentence: "… und bereiten dich auf die praktische Prüfung vor." | "Preise ansehen" → `#preise` | Night, then the seam into daylight |

Each station: its real text and ONE link – no prices, times or footnotes any more (they live in `#preise` / `#zeiten`). Station 2 no longer repeats "An 3 Wochentagen …" and station 3 uses the Praktischer-Unterricht text (U10) instead of the S6 sentence, because the full S6 paragraph is now in Willkommen right above. Station 4 still quotes S6 – it is the only old-site text about the exam. Quotes are exact (with "…" marking a cut); nothing is reworded. After station 4 the seam leads into the first daylight section of the journey's end (prices).

Reduced motion / no JS: plain numbered list with the same content.

</details>

### 4.4 Team – "Wer neben dir sitzt"

**Update: moved off the homepage onto its own page, `/team`.** Everything below is unchanged otherwise – same component, same content, just reached via the header nav / footer instead of a homepage section.

Each portrait is cut into the shape of a **car side window** (CSS `clip-path` – the image pixels stay untouched). All photos get the same frame and the same dark door panel around them; **no color grading, no filters, no AI** on faces.

```
PHONE: horizontal swipe, 1.3 doors visible       DESKTOP: row of doors, 4 per row
┌──────────────────────┐                          ┌──────┬──────┬──────┬──────┐
│  ╭─────────────╮ ╭── │                          │ ╭──╮ │ ╭──╮ │ ╭──╮ │ ╭──╮ │
│ ╱  photo       │╱    │                          │╱ ph │ │╱ ph │ ...         │
│ │  ≤248×268 px │ │   │                          │name │ │name │             │
│ └──────────────┘ └── │                          │role │ │role │             │
│ Mahmoud Shehada      │                          └──────┴──────┴──────┴──────┘
│ Inhaber / Fahrlehrer │
└──────────────────────┘
```

- Photo window max **248 × 268 CSS px** (2.5). The door panel around it can be larger – it's CSS, so it stays sharp.
- Name (Archivo H3) and role exactly as on the old site. Nothing else.
- Order exactly as on the old page: Mahmoud Shehada, Ralph Dölling, Ralf Jürgensen, Sarah Pendzich, Penelope Röper, Zulquarnain Khan, Khaled Abu Al-Assal, Inna Korobova. Heading "Unser Team".
- **Inna Korobova:** same window frame, empty glass with a soft CSS reflection; name "Inna Korobova", role "Bürofachangestellte". No silhouette, no stock or AI image.
- Interaction: tapping a window "rolls it down" (the frame's glass edge slides, the photo itself doesn't scale).

### 4.5 Vehicles – "Der Showroom"

**Update: moved off the homepage onto its own page, `/fahrzeuge`.** Everything below is unchanged otherwise – same component, same content, just reached via the header nav / footer instead of a homepage section.

A dark showroom stage (night section): CSS floor with a radial `--lapis` spotlight and a faint reflection line. **As built:** every car in its own lit bay with all its text always visible (grid: 4 per row on desktop, 2 on tablet, a swipe row on phones), and a switch **Alle · Automatik · Schaltung** (filters by the "Getriebe" line of each car; shown only because every car states its transmission clearly). Cars whose text is completely identical share one card with all their original photos: today the three automatic VW T-Roc (05, 06, 07). The manual VW T-Roc (03) has different text ("mit manueller Schaltung ausgestattet", "Manuelles Getriebe") and keeps its own card. (The original idea below – one car at a time + thumbnails – was not built.)

```
PHONE                                    DESKTOP
┌──────────────────────┐                 ┌──────────────────────────────────────────┐
│ [Alle][Automatik][Schaltung]           │ [Alle][Automatik][Schaltung]             │
│     ╲ spotlight ╱    │                 │        ╲ spotlight ╱       VW T-Roc       │
│    ┌──────────┐      │                 │       ┌──────────┐         mit Automatik- │
│    │ photo    │      │                 │       │ photo    │         schaltung      │
│    │ ≤248×268 │      │                 │       │ ≤248×268 │         ausgestattet   │
│    └──────────┘      │                 │       └──────────┘         Technische     │
│ VW T-Roc             │                 │    ── floor reflection ──  Details: …     │
│ mit Automatikschaltung ausgestattet    │                            Perfekt für …  │
│ Technische Details:  │                 │ [▢][▢][▢][▢][▢][▢][▢]  ← all 7 cars       │
│ Leistung: 110 kW / 150 PS              └──────────────────────────────────────────┘
│ Getriebe: Automatikgetriebe
│ Antrieb: Vorderradantrieb
│ Perfekt für Fahrschüler/ Fahranfänger geeignet.
│ ◀ [▢][▢][▢][▢] ▶     │
└──────────────────────┘
```

- Photo in the spotlight max **248 × 268 CSS px**; thumbnails smaller (downscaled = sharp). The spotlight, floor and frame are CSS, so the stage can be big while the photo stays small and sharp.
- The edges of each photo fade into the floor with a CSS mask on the frame edge only (photo pixels unchanged).
- Text exactly as on the old site, every line, for all 7 cars, in the old order: VW T-Roc (05), VW T-Roc (06), VW T-Roc (07), VW Golf VI (01), Audi Q2 (02), VW T-Roc manuell (03), Audi A4 (04) – including "Automatik Getriebe" for the A4.
- Spec lines styled like a dashboard display (Archivo tabular numbers, thin `--kd-blau` lines) – styling only, words unchanged.
- Swipe on phone, arrow keys on desktop; filter changes the row with a short reorder.

### 4.6 Prices and times – the daylight sections

**Prices (`#preise`):**

```
PHONE (toggle)                         DESKTOP (side by side)
┌──────────────────────┐               ┌───────────────────────┬───────────────────────┐
│ Preisliste für Klasse B              │ MIT SCHÜLER/STUDENTEN │ OHNE AKTION           │
│ [MIT SCHÜLER/STUDENTEN AKTION|OHNE AKTION]│ AKTION           │                       │
│ Grundbetrag inkl.    │               │ Grundbetrag inkl.      │ Grundbetrag     500 € │
│ Lehrmaterial   300 € │               │ Lehrmaterial     300 € │ Lehrmaterial 90 €¹/60 €²│
│ Übungsfahrt (45 Min.) 65 €           │ Übungsfahrt (45 Min.) 65 €│ Übungsfahrt (45 Min.) 65 €│
│ Sonderfahrt (45 Min.) 75 €           │ Sonderfahrt (45 Min.) 75 €│ Sonderfahrt (45 Min.) 75 €│
│ Vorstellung zur prakt. Prüfung* 170 €│ Vorstellung … prakt.* 170 €│ … prakt.* 170 €      │
│ Vorstellung zur theor. Prüfung* 30 € │ Vorstellung … theor.* 30 € │ … theor.* 30 €       │
│ (ERSPARNIS VON 260 €)│               │ (ERSPARNIS VON 260 €)  │                       │
│ ¹ Mit Drivers Cam, ² Ohne Drivers Cam│ ¹ Mit Drivers Cam, ² Ohne Drivers Cam          │
│ *Die amtlichen Gebühren …            │ *Die amtlichen Gebühren …                      │
└──────────────────────┘               └────────────────────────────────────────────────┘
```

- All labels, prices and footnotes word for word and in original capitalisation.
- Real `<table>` with row headers; prices right-aligned, tabular.
- Rows that differ between the two lists (Grundbetrag, Lehrmaterial) are subtly highlighted.
- Phone: segmented toggle between the two lists, default first list (as on the old page); footnotes always visible.
- Data in one file (`content/preise.ts`), reused by `/preise`.

**Times (`#zeiten`, footer, "Zeiten" sheet):**

**As built:** three number-plate-style cards with the exact old-site wording – "Bürozeiten", "Theoriezeiten", "Praxiszeiten" / "nach Vereinbarung" – at every width (the phone button under Bürozeiten was removed as a duplicate: the contact section right below and the footer have the phone). The week strip described below was built for desktop first and then removed, because it repeated the cards; the cards are clearer (exact wording, readable by screen readers). `#zeiten` is the one main place for the full office hours on the homepage.

(Original idea, not used:) Week strip Mo–Sa, each day's blocks as bars on a 14:00–21:00 axis (Büro = `--tinte` outline, Theorie = `--kd-blau` fill), with the exact times written in each bar – text is the information, bars only help scanning. Headings as on the old site: "Bürozeiten", "Theoriezeiten", "Praxiszeiten" + "nach Vereinbarung".

```
Mo  ▕ Büro 16:30 Uhr bis 19:30 Uhr ▏
Di          ▕ Theorie 17:00 Uhr bis 18:30 Uhr ▏ ▕ 19:00 Uhr bis 20:30 Uhr ▏
Mi          ▕ Theorie 17:00 Uhr bis 18:30 Uhr ▏ ▕ 19:00 Uhr bis 20:30 Uhr ▏
Do          ▕ Theorie 17:00 Uhr bis 18:30 Uhr ▏ ▕ 19:00 Uhr bis 20:30 Uhr ▏
Fr  ▕ Büro 16:00 Uhr bis 19:00 Uhr ▏      ← as in footer
Sa  ▕ Büro 14:00 Uhr bis 17:30 Uhr ▏
Praxiszeiten: nach Vereinbarung
```

Data in one file (`content/zeiten.ts`), used by header chip and footer.

### 4.7 Sign-up – 4-step simulated form with the speedometer (REMOVED)

**Update: this whole flow was removed.** It was never going to be real in the demo, and a form that exists only to say "this isn't real, call us instead" was more flow than the message needed. Every "Anmelden" button and link in the site is now a direct `tel:` call or a link to `/kontakt` – see 3.1, 3.3 and 4.1. `components/anmeldung/*` and `content/anmeldung.ts` were deleted. No replacement form was added (none of the removed content was unique to the form – it was new UI copy, not old-site content, so nothing needed to move elsewhere). What follows is the original plan, kept for history.

<details>
<summary>Original plan (not current)</summary>

The logo's gauge is the progress indicator: a half-circle tachometer (SVG). Each completed step moves the needle one segment; step 4 is the red zone. Below it, the step name in text ("Schritt 2 von 4: Wunsch").

**Demo notice** – a fixed, clearly visible box at the top of every step (not small print):
> **Demo – dieses Formular ist nur eine Simulation.** Deine Eingaben werden nicht gesendet und nicht gespeichert. Für eine echte Anmeldung ruf uns an: 01 76 - 70 386 440.

| Step | Fields | Notes |
|---|---|---|
| 1 Über dich | Vorname, Nachname, Geburtsdatum, Telefon, E-Mail | Client-side validation only. Clear error texts ("Bitte gib deine Telefonnummer ein."). |
| 2 Wunsch | Führerschein Klasse B (fixed, only class on the site); Getriebe: Automatik · Schaltung · noch unsicher; Preisliste: MIT SCHÜLER/STUDENTEN AKTION · OHNE AKTION (labels word for word from the price list) | No eligibility text (not on the site). |
| 3 Zeiten | Theory slot: 17:00 Uhr bis 18:30 Uhr · 19:00 Uhr bis 20:30 Uhr · egal; free text for Fahrstunden ("Praxiszeiten: nach Vereinbarung") | Options from `content/zeiten.ts`. |
| 4 Prüfen | Summary with "Ändern" links; button **"Anmeldung simulieren"** | No Datenschutz consent checkbox needed because nothing is processed – the notice explains it. |

Result screen: "**Simulation beendet – es wurde nichts gesendet oder gespeichert.** Für eine echte Anmeldung ruf uns während der Bürozeiten an." + Bürozeiten + phone.

Technical guarantees (checked in code review before showing the demo):
- No `action`/`method` on the `<form>`; submit handler calls `preventDefault()` and only switches the view.
- No `fetch`, server action, API route or third-party script in the form code.
- State only in React memory; cleared on reload. No web storage, no cookies. `autocomplete="off"` on all inputs.
- Without JavaScript: the form shows the demo notice and the submit button is disabled.

</details>

---

## 5. CONTENT CHECKLIST

Every item from CONTENT.md and where it goes. Text is used word for word.
Legend: ✅ used · ⛔ not shown · ↻ replaced by an element with the same function. **Phase** = 1 (homepage) or 2 (after approval).

### 5.1 Shared elements

| # | Item | New location | Phase | |
|---|---|---|---|---|
| G1 | Navigation: Willkommen, Team, Unterricht, Theoretischer Unterricht, Praktischer Unterricht, Fahrzeuge, Ausbildungsfahrschule, Kontakt | Header nav (Unterricht, Preise, Fahrzeuge, Team, Kontakt → real pages); Ausbildungsfahrschule in footer; Willkommen = logo → `/`; Theoretischer/Praktischer Unterricht = `/unterricht#theorie` / `#praxis` | 1 | ✅ |
| G2 | Mobile menu (same links; logo → broken `index-1.html`) | Phone menu, logo → `/` | 1 | ✅ |
| G3 | Address "Friedrich-Ebert-Straße 11/15, 28199 Bremen" + map link | Footer, question block on `/`; later Kontakt, Impressum, Datenschutz | 1 | ✅ |
| G4 | "Telefon: 01 76 - 70 386 440" (tel:+4917670386440) | Footer, bottom bar "Anrufen", `#zeiten` (next to the office hours), question block, form result | 1 | ✅ |
| G5 | Footer "Infos": Team, Unterricht, Fahrzeuge, Preise | Footer | 1 | ✅ |
| G6 | Footer "Bürozeiten" Mo / Fr / Sa | `#zeiten` (main place), footer; question block and bottom bar link to `#zeiten` | 1 | ✅ |
| G7 | Footer "Theoriezeiten" Di, Mi, Do | `#zeiten`, footer | 1 | ✅ |
| G8 | Instagram link + `instagram-button.png` | Footer: icon + text link (outbound only) | 1 | ↻ |
| G9 | "© 2026/2027 \| Programmiert durch KS Design." + link | Footer: "© 2026/2027" kept word for word; the KS Design credit and link replaced by "Design & Entwicklung: Abdullah Diab" (no link, owner question 41). KS Design stays in the Impressum (L5). | 1 | ✅ |
| G10 | Footer links Kontakt, Impressum, Datenschutzerklärung, Cookie-Einstellungen | Footer | 1 | ✅ |
| G11 | Cookie banner text + "Alle Akzeptieren & Schließen" + "Cookie Einstellungen" | Shown inside the Cookie dialog preview (banner doesn't auto-open, no cookies in demo) | 1 | ✅ |
| G12 | Cookie dialog: all headings, texts, links, buttons | Cookie dialog preview from footer link, choices not saved | 1 | ✅ |

### 5.2 Start page

| # | Item | New location | Phase | |
|---|---|---|---|---|
| S1 | `<title>` "Fahrschule Bremen \| Fahrschule Kickdown Mahmoud Shehada" | `/` title + " – Private Demo" | 1 | ✅ |
| S2 | "Deine Fahrschule Kickdown in Bremen" | Hero headline | 1 | ✅ |
| S3 | "Dein Weg zum / Führerschein Klasse B" | Hero subline | 1 | ✅ |
| S4 | "Willkommen in der Fahrschule Kickdown" | H2 Willkommen | 1 | ✅ |
| S5 | "Nicht nur im Privatleben, auch im Beruf…Kickstart." | Willkommen | 1 | ✅ |
| S6 | "Wir zeigen dir, worauf es im Straßenverkehr ankommt…4 Themen an." | Willkommen, complete | 1 | ✅ |
| S7 | "Du hast Fragen zu Führerschein und Fahrschule?" | H2 question block | 1 | ✅ |
| S8 | "Wir stehen dir gern als Ansprechpartner zur Verfügung…Wir freuen uns auf dich!" | Question block `#kontakt` (daylight; word for word; no e-mail address shown) | 1 | ✅ |

### 5.3 Team

| # | Item | New location | Phase | |
|---|---|---|---|---|
| T1 | `<title>` "Fahrschullehrer Team Fahrschule Kickdown" | `/team` | 2 | ✅ |
| T2 | "Unser Team" | H2 team section on `/`, H1 `/team` | 1 | ✅ |
| T3 | Mahmoud Shehada – Inhaber / Fahrlehrer | Team window 1 | 1 | ✅ |
| T4 | Ralph Dölling – Fahrlehrer | Team | 1 | ✅ |
| T5 | Ralf Jürgensen – Fahrlehrer | Team | 1 | ✅ |
| T6 | Sarah Pendzich – Bürofachangestellte | Team | 1 | ✅ |
| T7 | Penelope Röper – Fahrlehrerin / Büroleitung | Team | 1 | ✅ |
| T8 | Zulquarnain Khan – Fahrlehrer | Team | 1 | ✅ |
| T9 | Khaled Abu Al-Assal – Fahrlehrer | Team | 1 | ✅ |
| T10 | Inna Korobova – Bürofachangestellte (no photo) | Team, empty-window card | 1 | ✅ |

### 5.4 Theoretischer / Praktischer Unterricht

| # | Item | New location | Phase | |
|---|---|---|---|---|
| U1 | `<title>` "Theorieunterricht Fahrschule Bremen" | `/unterricht` title | 2 | ✅ |
| U2 | `<title>` "Führerschein in Bremen - praktischer Fahrschulunterricht" | `/unterricht` meta description | 2 | ✅ |
| U3 | "Theoretischer Unterricht" | H2 `#theorie` | 2 | ✅ |
| U4 | "Unser Theorieunterricht findet in Form von Kursen statt…abschließen kannst." | `#theorie` | 2 | ✅ |
| U5 | "Unterrichtsform" + two links | Tab switch on `/unterricht` | 2 | ↻ |
| U6 | "Theoriezeiten" block | `#zeiten` on `/`; `/unterricht` | 1 | ✅ |
| U7 | "Bürozeiten" block | `#zeiten` on `/`; `/unterricht` | 1 | ✅ |
| U8 | "Praktischer Unterricht" | H2 `#praxis` | 2 | ✅ |
| U9 | "Du möchtest den Führerschein machen?" | `#praxis` | 2 | ✅ |
| U10 | "Wir bereiten dich zu fairen Preisen…an deine Bedürfnisse." | `#praxis` | 2 | ✅ |
| U11 | "Praxiszeiten" "nach Vereinbarung" | `#zeiten` on `/`; later `#praxis` | 1 | ✅ |

### 5.5 Fahrzeuge

| # | Item | New location | Phase | |
|---|---|---|---|---|
| F1 | `<title>` "Fahrschulfahrzeuge" | `/fahrzeuge` | 2 | ✅ |
| F2 | "Unsere Fahrzeuge" | H2 showroom on `/`, H1 `/fahrzeuge` | 1 | ✅ |
| F3 | VW T-Roc – mit Automatikschaltung ausgestattet – 110 kW / 150 PS – Automatikgetriebe – Vorderradantrieb (05) | Showroom card 1 (shared with F4/F5: identical text) | 1 | ✅ |
| F4 | VW T-Roc – same (06) | Showroom card 1, photo 2 of 3 | 1 | ✅ |
| F5 | VW T-Roc – same (07) | Showroom card 1, photo 3 of 3 | 1 | ✅ |
| F6 | VW Golf VI – mit manueller Schaltung ausgestattet – 59 kW / 80 PS – Manuelles Getriebe – Vorderradantrieb (01) | Showroom car 4 | 1 | ✅ |
| F7 | Audi Q2 – mit Automatikschaltung ausgestattet – 110 kW / 150 PS – Automatikgetriebe – Vorderradantrieb (02) | Showroom car 5 | 1 | ✅ |
| F8 | VW T-Roc – mit manueller Schaltung ausgestattet – 110 kW / 150 PS – Manuelles Getriebe – Vorderradantrieb (03) | Showroom car 6 | 1 | ✅ |
| F9 | Audi A4 – mit Automatikschaltung ausgestattet – 140 kW / 190 PS – Automatik Getriebe – Vorderradantrieb (04) | Showroom car 7 | 1 | ✅ |
| F10 | "Technische Details:" + "Perfekt für Fahrschüler/ Fahranfänger geeignet." | Every car | 1 | ✅ |

### 5.6 Ausbildungsfahrschule

| # | Item | New location | Phase | |
|---|---|---|---|---|
| A1 | `<title>` "Fahrschule Kickdown \| Ausbildungsfahrschule" | `/ausbildungsfahrschule` | 2 | ✅ |
| A2 | "Ausbildungsfahrschule" | H1 | 2 | ✅ |
| A3 | "Für Fahrlehrer in der Ausbildung bieten wir einen Ausbildungsplatz an." | Page body (+ link from team later) | 2 | ✅ |

### 5.7 Preise (all prices)

| # | Item | New location | Phase | |
|---|---|---|---|---|
| P0 | `<title>` "Fahrschule Kickdown \| Preise"; "Preisliste für Klasse B" | H2 `#preise` on `/`; `/preise` | 1 | ✅ |
| P1 | "MIT SCHÜLER/STUDENTEN AKTION" | Column / toggle label, as written | 1 | ✅ |
| P2 | Grundbetrag inkl. Lehrmaterial – 300 € | `#preise` only | 1 | ✅ |
| P3 | Übungsfahrt (45 Min.) – 65 € | `#preise` only | 1 | ✅ |
| P4 | Sonderfahrt (45 Min.) – 75 € | `#preise` only | 1 | ✅ |
| P5 | Vorstellung zur prakt. Prüfung* – 170 € | `#preise` only | 1 | ✅ |
| P6 | Vorstellung zur theor. Prüfung* – 30 € | `#preise` only | 1 | ✅ |
| P7 | "(ERSPARNIS VON 260 €)" | Under first list, as written | 1 | ✅ |
| P8 | "OHNE AKTION" | Column / toggle label, as written | 1 | ✅ |
| P9 | Grundbetrag – 500 € | `#preise` | 1 | ✅ |
| P10 | Lehrmaterial – 90 € ¹ / 60 € ² | `#preise` | 1 | ✅ |
| P11 | Übungsfahrt (45 Min.) – 65 € | `#preise` | 1 | ✅ |
| P12 | Sonderfahrt (45 Min.) – 75 € | `#preise` | 1 | ✅ |
| P13 | Vorstellung zur prakt. Prüfung* – 170 € | `#preise` | 1 | ✅ |
| P14 | Vorstellung zur theor. Prüfung* – 30 € | `#preise` | 1 | ✅ |
| P15 | "¹ Mit Drivers Cam, ² Ohne Drivers Cam" | Under tables | 1 | ✅ |
| P16 | "*Die amtlichen Gebühren für die Fahrerlaubnisprüfungen sind hier nicht enthalten, und werden von der Prüfstelle extern berechnet." | Under tables | 1 | ✅ |

### 5.8 Opening times

| # | Item | New location | Phase | |
|---|---|---|---|---|
| Z1 | Bürozeiten Montag 16:30 Uhr bis 19:30 Uhr | `#zeiten` (main place), footer, form step 2 + result | 1 | ✅ |
| Z2 | Bürozeiten Freitag 16:00 Uhr bis 19:00 Uhr (as in footer) | Same places | 1 | ✅ |
| Z3 | Bürozeiten Samstag 14:00 Uhr bis 17:30 Uhr | Same places | 1 | ✅ |
| Z4 | Theorie Dienstag, Mittwoch und Donnerstag 17:00 Uhr bis 18:30 Uhr | `#zeiten`, footer | 1 | ✅ |
| Z5 | Theorie … 19:00 Uhr bis 20:30 Uhr | Same places | 1 | ✅ |
| Z6 | Praxiszeiten: nach Vereinbarung | `#zeiten` | 1 | ✅ |

### 5.9 Contact details

| # | Item | New location | Phase | |
|---|---|---|---|---|
| K0 | `<title>` "Fahrschule Kickdown \| Kontakt"; "Kontakt" | `/kontakt` | 2 | ✅ |
| K1 | "Du hast Fragen zu unseren Leistungen…Montag:16:30 Uhr bis 19:30 Uhr und Samstag: 14:00 Uhr bis 17:30 Uhr." | `/kontakt` intro, word for word | 2 | ✅ |
| K2 | "Fahrschule KICKDOWN" | `/kontakt` | 2 | ✅ |
| K3 | Address + https://goo.gl/maps/rshBXagK5StX8Lgs8 | Footer, `/kontakt` contact card (name + address as one map link), homepage contact section ("Route planen") | 1 | ✅ |
| K4 | 01 76 - 70 386 440 / tel:+4917670386440 | See G4 | 1 | ✅ |
| K5 | Hidden second phone tel:+4915256751996 | Not shown | – | ⛔ |
| K6 | Google Maps iframe | Replaced by static CSS map card + outbound link (no third-party request) | 2 | ↻ |
| K7 | Hidden e-mail info@fahrschule-kickdown.de | Not shown | – | ⛔ |
| K8 | Instagram | See G8 | 1 | ✅ |
| K9 | Inhaber: Mahmoud Shehada | Team (phase 1), Impressum | 1 | ✅ |

### 5.10 Impressum and Datenschutz

| # | Item | New location | Phase | |
|---|---|---|---|---|
| L1 | Impressum: title, address, phone, Inhaber, Steuer Nr. 60/240/19002, USt-ID DE 316948289, Verantwortlich für den Inhalt | `/impressum` | 2 | ✅ |
| L2 | Erlaubnisbehörde nach § 32 FahrlG (full block) | `/impressum` | 2 | ✅ |
| L3 | Verbraucherstreitbeilegung/Universalschlichtungsstelle + text | `/impressum` | 2 | ✅ |
| L4 | Bildquellen: © Fahrschule Kickdown, © Adobe Stock Fotos | `/impressum`, word for word | 2 | ✅ |
| L5 | Programmierung: KS Design \| www.ks-media.de | `/impressum` | 2 | ✅ |
| L6 | Datenschutz 1 "Datenschutz auf einen Blick" (all subsections) | `/datenschutz` | 2 | ✅ |
| L7 | Datenschutz 2 "Hosting" (KS Design, Timme Hosting, Auftragsverarbeitung) | `/datenschutz` | 2 | ✅ |
| L8 | Datenschutz 3 "Allgemeine Hinweise und Pflichtinformationen" (all subsections incl. Art. 21 caps text and 4 bullets) | `/datenschutz` | 2 | ✅ |
| L9 | Datenschutz 4 "Datenerfassung auf dieser Website" (Cookies, Server-Log-Dateien + 6 bullets, Kontaktformular, Anfrage per E-Mail…) | `/datenschutz` | 2 | ✅ |
| L10 | Datenschutz 5 "Plugins und Tools" (Google Fonts, Google Maps, all links) | `/datenschutz` | 2 | ✅ |

### 5.11 Images (all 28 files)

| # | File | New location | Phase | |
|---|---|---|---|---|
| B1 | `logo/logo.png` | Header, phone menu (200 × 50 px: shown at max 200 × 50 CSS px) | 1 | ✅ |
| B2 | `logo/f-logo.png` (= logo.png) | Footer (same file) | 1 | ✅ |
| B3 | `instagram-button.png` | Replaced by icon + text link | 1 | ↻ |
| B4 | `banner/brt-1.jpg` | Not used (licence unconfirmed) → CSS asphalt | – | ⛔ |
| B5 | `banner/s-1.jpg` | Not used (licence unconfirmed) → Three.js night stage | – | ⛔ |
| B6 | `banner/s-2.jpg` | Not used (licence unconfirmed) → CSS night-to-day | – | ⛔ |
| B7 | `banner/s-3.jpg` | Not used (licence unconfirmed) → CSS light streaks | – | ⛔ |
| B8 | `start/01.jpg` (shop window) | Willkommen on `/` (max 580 CSS px, complete, copyright notice untouched, demo note "muss vor der Veröffentlichung freigegeben werden"); later Kontakt. **Must be approved before going live (owner question 13).** | 1 | ✅ |
| B9 | `ausbildungsfahrschule/01.jpg` (= B8) | `/ausbildungsfahrschule` | 2 | ✅ |
| B10–B16 | `team/01.jpg`–`07.jpg` | Team windows (max 248 × 268 CSS px, no edits) | 1 | ✅ |
| B17 | `unterricht/theorie/01.jpg` | **Cropped copy only** `public/demo/theorie-kalender.jpg`: keep the calendar grid (from the month header row "DEZEMBER '25 … JANUAR '27" down to the last day row); remove the top band (Vogel System logo, "Udo Gerstmann", address, phone/fax/mobile, e-mail, "2026") and the bottom band (Vogel System logo, www.vogel-system.de, small print). Crop with sharp/ImageMagick, checked visually; the original is never served. Shown on `/unterricht#theorie` max 580 CSS px | 2 | ✅ |
| B18 | `unterricht/praxis/01.jpg` | `/unterricht#praxis` (max 580 CSS px) | 2 | ✅ |
| B19–B25 | `fahrzeuge/01.jpg`–`07.jpg` | Showroom (max 248 × 268 CSS px, no edits) | 1 | ✅ |
| B26 | `christmas-deal.jpg` | Not shown (promotion) | – | ⛔ |
| B27 | `logo/fahrlehrerverband-bremen.jpg` | Not shown (hidden membership) | – | ⛔ |
| B28 | `preloader.gif` | Not used – no preloader, hero still loads instantly | – | ↻ |

### 5.12 Hidden content (HTML comments) – none of it is shown

| # | Item | Decision |
|---|---|---|
| H1 | Commented-out nav item "Preise" | Preise is reachable in the main nav because the visible footer already linked it; the hidden item itself is not restored as content. |
| H2 | Old slider text "Deine Fahrschule in Bremen / Fahrschule KICKDOWN" | ⛔ |
| H3 | "Im März 2021 bieten wir euch einen Intensivkurs für Theorie an…" | ⛔ |
| H4 | "Theorie-Intensivkurs…", dates 27.12.2019–04.01.2020 | ⛔ |
| H5 | Popup "Schüler und Studenten Aktion…" | ⛔ |
| H6 | Popup "Christmas Deal" | ⛔ |
| H7 | E-mail info@fahrschule-kickdown.de | ⛔ |
| H8 | "Wir sind Mitglied im Fahrlehrerverband Bremen e. V." + logo | ⛔ |

### 5.13 New UI words (not content, owner should approve)

"Private Demo", demo notices of the form and cookie dialog, "Jetzt anmelden", "Anmelden", "Anrufen", "Zeiten", "Preise ansehen", "Route planen", "Anmeldung simulieren", "Ändern", "Schritt X von 4", step names (Über dich, Wunsch, Zeiten, Prüfen), form labels and error texts, "Wischen zum Drehen" / "Ziehen zum Drehen", "Drehung anhalten" / "Drehung fortsetzen" (pause/play of the hero car), hero headline "Dein Kickstart in Bremen" and the decorative hero lettering "KICKDOWN", footer credit "Design & Entwicklung: Abdullah Diab", section titles "Deine Strecke zum Führerschein", "Wer neben dir sitzt", "Der Showroom", journey station names (Anmeldung, Theorie, Fahrstunden, Prüfung), filter "Alle / Automatik / Schaltung", header chip "Büro heute …" / "Nächste Bürozeit …", placeholder text for unbuilt pages, alt texts.

Added while building (all listed in OWNER-QUESTIONS.md, question 35): "Menü" (header button), "Hauptnavigation", "Schnellzugriff", "Rechtliches" (names for screen readers), section labels above the headings ("Willkommen", "Anmeldung · Theorie · Fahrstunden · Prüfung", "Preise", "Zeiten", "Wer neben dir sitzt", "Der Showroom", "Kontakt", "Simulation"), times heading "Bürozeiten, Theoriezeiten und Praxiszeiten", journey links "Theoriezeiten" and "Unsere Fahrzeuge" (old-site headings used as link text), "Demo-Hinweis: Dieses Foto muss vor der Veröffentlichung freigegeben werden.", alt texts "Schaufenster der Fahrschule Kickdown" and "(Foto 1 von 3)", "Zur Startseite", "(öffnet in neuem Tab)", sign-up questions, hints and error texts, "Simulation beendet – es wurde keine Anmeldung gesendet.", "Simulation neu starten".

**Update:** the sign-up form, its step names, hints and error texts, the journey section and its station names/links, and the per-section eyebrow labels above headings ("Willkommen", "Anmeldung · Theorie · Fahrstunden · Prüfung", "Preise", "Zeiten", "Wer neben dir sitzt", "Der Showroom", "Kontakt", "Simulation", and the "Fahrschule Kickdown" label above every subpage's `<h1>`) no longer exist – none of that text needs owner approval any more. New word added instead: **"Jetzt anrufen"** (hero button and highlighted nav action; both now call `tel:+4917670386440` directly), and the phone bottom bar's third slot changed from "Anmelden" to **"Kontakt"** (links to `/kontakt`).

---

## 6. Build notes (for later, not now)

- Next.js 16.4 in this repo has breaking changes – read `node_modules/next/dist/docs/` before writing code (see `AGENTS.md`).
- Content in typed data files (`content/preise.ts`, `content/zeiten.ts`, `content/team.ts`, `content/fahrzeuge.ts`, `content/kontakt.ts`), copied word for word from CONTENT.md, so every fact exists once.
- 3D: `@react-three/fiber` + `drei` via `next/dynamic` (`ssr: false`) after idle; hero still is the server-rendered LCP.
- **Temporary debug panel (built, remove before go-live):** add `?debug=1` to any address to see WebGL2 yes/no, whether the 3D renderer is active (fps, frames, pixel ratio), the fallback reason, reduced motion, the journey mode and progress, and viewport/device values (`components/site/debug-panel.tsx`, values in memory only – nothing stored or sent). If the panel does not appear at all, JavaScript is not running on that device.
- **Older phones:** `CanvasRenderingContext2D.roundRect` (iOS 16+) is drawn by hand; `Element.checkVisibility` (Safari 17.4+) has a fallback; the site-wide reveal can never take the page down (errors there are caught – the content is visible without it).
- **Page-scoped ids (built):** with `cacheComponents`, Next keeps the previously visited page in the DOM (hidden) after a client navigation. Every heading/label id that `aria-labelledby`, `aria-controls` or `<label for>` points to is therefore built from the page key (`components/site/page-ids.ts`: `pageId(page, name)`, `pageTitleId(page)`), e.g. `team-title`, `start-preise-title`, `preise-preisliste`. React `useId()` is not enough – it yields the same ids on every route. Anchor targets (`#zeiten`, `#theorie`, `#praxis` …) stay unscoped so links keep working. `PageShell`, `SiteHeader`, `Footer` and `Preise` take a `page` prop.
- Accessibility floor: visible focus ring (`--kd-blau`, 2 px, 3 px offset), skip link, landmarks, real tables, form labels and error summaries, `lang="de"`, reduced motion respected.
- Performance targets on a mid-range phone over 4G: LCP < 2.5 s, CLS < 0.05, no 3D download when the device check fails.
- Demo check before showing it to anyone: network tab shows no third-party requests and no request on form submit; Application tab shows no cookies or storage; `noindex` present in HTML and response headers; "Private Demo" visible on every route.
