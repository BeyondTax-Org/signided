# Sign IDed — Claude Code Build Guide
> For AI agents (Claude Code) and developers building signided.aiyugtech.com
> Version 1.0 | 2026-03-19 | Aiyug Technologies Pvt Ltd

---

## Quick Context (Read This First)

Sign IDed is a **standalone public verification portal** for digitally signed PDFs in India. It is the third layer in Aiyug's document trust stack: Doclate (create) → Sign (execute) → Sign IDed (verify). Anyone with a UVC code or a signed PDF can check if a document is genuine — no login required.

**This is a NEW repo.** You are building from scratch, not modifying the Doclate codebase. However, you will extract and adapt one key reference file from the Doclate project.

**Before doing anything, read these files in order:**
1. `SIGNIDED_PLAN.md` — Product architecture, API design, data model, 4-phase roadmap
2. `SIGNIDED_HOMEPAGE_WIRING_PLAN.md` — Homepage sections, brand tokens, SEO, site architecture
3. `signided-verify.tsx` (in Doclate project) — The existing React component with ALL state logic (reference only — do NOT copy verbatim, rebuild with new architecture)
4. `Sign_IDed__Public_PDF_Signature_Verification_Portal__India_.pdf` — Full 17-page product spec (UX, security, accessibility, SEO, localization)
5. `aiyug-signing-spec.md` (in Doclate project) — API contracts, data model, legal alignment, SignIDed-specific sections

---

## What You Are Building

A standalone React SPA deployed at `signided.aiyugtech.com` with:

1. **Homepage** that IS the product — hero with floating document mockup, inline verification form, how-it-works timeline, FAQs
2. **Verification flow** — UVC input or PDF upload → loading → result (4 states: verified/not-found/expired/revoked)
3. **Secure preview flow** — request → OTP waiting → owner approved → Doclate viewer (read-only, watermarked, 15-min timer)
4. **Modals** — "Where is the UVC?" help, Report issue/fraud
5. **SEO** — meta tags, FAQPage schema, OG/Twitter cards, robots.txt, sitemap.xml
6. **Legal pages** — /privacy, /terms, /security (placeholder content, proper layout)

For Phase 1, all verification uses **mock data** (no real backend). The API client layer is stubbed with realistic delays and demo UVC codes.

---

## Environment Setup

```bash
mkdir signided && cd signided

# Initialize with Vite + React + TypeScript
npm create vite@latest . -- --template react-ts
npm install

# Core dependencies (match Doclate stack where relevant)
npm install react-router motion lucide-react sonner clsx tailwind-merge class-variance-authority
npm install @radix-ui/react-accordion @radix-ui/react-dialog @radix-ui/react-tooltip
npm install -D tailwindcss @tailwindcss/vite @vitejs/plugin-react

# Typography
# Geist font via CDN in index.html (not npm — keeps bundle smaller)

npm run dev
# → http://localhost:5173
```

### Vite Config

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": "/src" },
  },
});
```

---

## Visual Design Spec (Non-Negotiable)

The homepage design is **finalized**. The visual direction is:
- **Tone:** Razorpay / Zerodha — India-native, clean, confident
- **Brand color:** Amber `#F59E0B` (Sign IDed brand) with dark amber `#B45309` for hover
- **Font:** Geist Sans + Geist Mono (loaded via CDN, NOT Inter/Arial/system)
- **Layout:** Clean whites, 0.5px borders, generous whitespace, no gradients/shadows except functional
- **Hero:** Split — left copy, right is a real Indian board resolution with floating animation + Sign IDed amber stamp

### Typography Scale

```
Hero H1:           38px / 700 / -0.04em letter-spacing / line-height 1.08
Hero sub:           32px / 500 / -0.03em / color: muted
Section H2:        26px / 700 / -0.03em
Section sub:       15px / 400 / color: muted
Card title:        13px / 600 / -0.01em
Card body:         11.5px / 400 / color: muted / line-height 1.55
Body:              16px / 400 / line-height 1.65
Mono (UVC input):  15px / Geist Mono / 0.04em letter-spacing
Badge/tag:         9–11px / 600-700 / uppercase / 0.04em letter-spacing
```

### Color Tokens

```css
:root {
  /* Sign IDed amber brand */
  --am:       #F59E0B;   /* Primary — CTAs, accents, Phase 2 strips */
  --am-hover: #B45309;   /* Hover — buttons, links */
  --am-dark:  #92400E;   /* Text on amber backgrounds */
  --am-light: #FEF3C7;   /* Amber 100 — badge/tag backgrounds */
  --am-bg:    #FFFBEB;   /* Amber 50 — very light fills, icon boxes */

  /* CTA foreground: dark text on amber, NOT white */
  --am-cta-fg: #1C1917;

  /* Status colors (NOT brand — these are semantic) */
  --verified:  #22C55E;  /* Green — verified state, Phase 1 strips */
  --expired:   #F97316;  /* Orange — expired codes */
  --revoked:   #EF4444;  /* Red — revoked signatures */
  --info:      #3B82F6;  /* Blue — "Automatic" badges, info states */

  /* Neutrals */
  --bg:     #FFFFFF;
  --bg2:    #FAFAFA;     /* Section alternating background */
  --tx:     #0A0A0A;     /* Primary text */
  --tx2:    #6B7280;     /* Secondary text */
  --tx3:    #9CA3AF;     /* Tertiary text, placeholders */
  --bd:     rgba(0,0,0,0.08);  /* Borders — 0.5px */

  /* Radius */
  --r-sm:   8px;
  --r-md:   10px;
  --r-lg:   14px;

  /* Font families */
  --font:   'Geist', system-ui, -apple-system, sans-serif;
  --mono:   'Geist Mono', 'SF Mono', monospace;
}

/* Dark mode — implement AFTER light mode is complete */
.dark {
  --bg:   #0A0A0A;
  --bg2:  #141414;
  --tx:   #FAFAFA;
  --tx2:  #A1A1AA;
  --tx3:  #52525B;
  --bd:   rgba(255,255,255,0.08);
  --am-cta-fg: #1C1917;  /* stays dark on amber */
}
```

### Micro-Interactions (Must Implement)

| Element | Interaction | Spec |
|---------|------------|------|
| **Primary CTA button** | Hover | translateY(-2px), box-shadow: 0 8px 24px rgba(245,158,11,.25), bg → am-hover, color → white |
| **Secondary button** | Hover | translateY(-1px), border-color → amber, text → am-hover |
| **Verify input** | Focus | border: 1.5px solid var(--am), box-shadow: 0 0 0 4px rgba(245,158,11,.1) |
| **Header CTA** | Hover | bg → am-hover, color → white, translateY(-1px) |
| **Verify card** | Hover | Gradient border fade-in (amber top-left → transparent), box-shadow: 0 8px 32px rgba(245,158,11,.08) |
| **FAQ item** | Hover | border-color → amber |
| **FAQ item** | Open | border-color → amber, border-bottom removed on question, answer slides in |
| **Document mockup** | Idle | 6s float animation (translateY 0→-10px, rotate -1deg→0.5deg) |
| **Sign IDed stamp** | Idle | 3s box-shadow pulse (0→12px 3px amber at 20% opacity) |
| **Header mark** | Hover | scale(1.08), 0.2s transition |
| **Footer links** | Hover | color → am-hover |
| All transitions | Duration | 0.15–0.2s ease unless specified |

---

## File Structure

```
signided/
├── public/
│   ├── favicon.ico                 ← Amber shield mark (16+32 multi-size)
│   ├── favicon-32x32.png
│   ├── favicon-16x16.png
│   ├── apple-touch-icon.png        ← 180×180
│   ├── og-image.png                ← 1200×630 hero screenshot
│   ├── robots.txt
│   ├── sitemap.xml
│   └── site.webmanifest
├── src/
│   ├── main.tsx                    ← Entry point
│   ├── app.tsx                     ← BrowserRouter + routes
│   ├── styles/
│   │   ├── index.css               ← Tailwind imports + base resets
│   │   └── theme.css               ← Sign IDed color tokens (from above)
│   ├── assets/
│   │   ├── mark-color-light.svg    ← Shield mark for light bg (from brand system)
│   │   ├── mark-color-dark.svg     ← Shield mark for dark bg
│   │   ├── lockup-color-light.svg  ← Shield + wordmark
│   │   └── endorsed-color-light.svg ← Shield + wordmark + "by Aiyug Tech"
│   ├── pages/
│   │   ├── home.tsx                ← Full homepage (ALL 8 sections)
│   │   ├── verify.tsx              ← Standalone /verify page (duplicate form for SEO)
│   │   ├── privacy.tsx             ← Placeholder legal
│   │   ├── terms.tsx               ← Placeholder legal
│   │   ├── security.tsx            ← Placeholder legal
│   │   └── not-found.tsx           ← 404
│   ├── components/
│   │   ├── layout/
│   │   │   ├── site-header.tsx     ← Sticky header with mark + wordmark + nav
│   │   │   └── site-footer.tsx     ← "by Aiyug Tech" + legal links
│   │   ├── hero/
│   │   │   ├── hero-section.tsx    ← Copy + CTA buttons
│   │   │   └── document-mockup.tsx ← Floating board resolution with stamp
│   │   ├── trust-bar.tsx           ← IT Act, SHA-256, etc. — single row
│   │   ├── verify/
│   │   │   ├── verify-form.tsx     ← Tabbed UVC/PDF input with amber glow
│   │   │   ├── uvc-input.tsx       ← Mono input + validation + "Where is this?"
│   │   │   ├── pdf-upload.tsx      ← Drag-drop zone + file validation
│   │   │   ├── loading-state.tsx   ← Spinner + 3-step progress animation
│   │   │   ├── result-card.tsx     ← Status banner + metadata + preview CTA
│   │   │   └── demo-codes.tsx      ← "Try: X1Z5-AB3 / EXP1-999 / REV0-ABC"
│   │   ├── preview/
│   │   │   ├── preview-request.tsx ← Consent screen with 3-step explainer
│   │   │   ├── preview-waiting.tsx ← OTP progress animation
│   │   │   ├── preview-approved.tsx ← Success bounce → auto-transition
│   │   │   └── preview-viewer.tsx  ← Doclate viewer shell (read-only, timer, watermark)
│   │   ├── how-it-works/
│   │   │   ├── hiw-section.tsx     ← Phase 1 + divider + Phase 2
│   │   │   └── step-card.tsx       ← Individual step with num, icon, who badge
│   │   ├── faq/
│   │   │   └── faq-section.tsx     ← Accordion with amber highlight on open
│   │   └── modals/
│   │       ├── code-help-modal.tsx  ← "Where do I find the UVC?"
│   │       └── report-modal.tsx     ← Report issue / suspected fraud
│   ├── api/
│   │   ├── verify.ts               ← Mock: resolveUVC(), verifyPDF() with delays
│   │   ├── preview.ts              ← Mock: requestPreview(), approvePreview()
│   │   └── types.ts                ← QuickResult, VerifyStatus, PreviewSession
│   ├── lib/
│   │   ├── uvc.ts                  ← normalizeUVC(), isValidFormat(), resolveUVC()
│   │   ├── constants.ts            ← VALID_UVCS, EXPIRED_UVCS, REVOKED_UVCS, MOCK_RESULT
│   │   └── utils.ts                ← cn() helper (clsx + tailwind-merge)
│   └── hooks/
│       └── use-countdown.ts        ← Preview expiry timer hook
├── index.html                      ← SEO meta, Geist font CDN, schema JSON-LD
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## Routes

```typescript
// src/app.tsx
import { BrowserRouter, Routes, Route } from "react-router";

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/verify" element={<Verify />} />
    <Route path="/verify/:uvc" element={<Verify />} />
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/terms" element={<Terms />} />
    <Route path="/security" element={<Security />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

**Route behavior:**
- `/` — Full homepage with all 8 sections (header, hero, trust bar, verify form, how-it-works, result area, FAQ, footer)
- `/verify` — Standalone verify page (same form, simpler layout — for SEO and direct links)
- `/verify/:uvc` — Auto-populates UVC input and triggers verification on mount
- Result pages are NOT separate routes — they render inline replacing the form (AnimatePresence transition)

---

## Section-by-Section Build Spec

### Section 1: Sticky Header

```
┌─────────────────────────────────────────────────────────┐
│ [shield mark] Sign IDed  [BY AIYUG TECH]    How it works  FAQs  [Verify now] │
└─────────────────────────────────────────────────────────┘
```

- `position: sticky; top: 0; z-index: 50`
- Background: white with `backdrop-filter: blur(12px)` at 90% opacity
- Border-bottom: 0.5px solid var(--bd)
- Left: shield mark SVG (28×28 amber-tinted rounded square) + "Sign" in 600 weight + "IDed" in 700 weight amber color + "BY AIYUG TECH" pill (9px, uppercase, amber-on-amber-light)
- Right: "How it works" and "FAQs" as smooth-scroll anchors (13px, 500 weight, muted → dark on hover) + "Verify now" button (amber bg, dark text, 12px/600, 7px 18px padding, rounded-8px)
- "By Aiyug Tech" pill links to `https://aiyugtech.com` (external, opens new tab)

### Section 2: Hero

```
┌───────────────────────────┬──────────────────────────────┐
│ [badge] Public portal     │                              │
│                           │    ┌─────────────────┐       │
│ Is that signed            │    │  BEYONDTAX PVT  │       │
│ document real?            │    │  BOARD RESOLUT.  │       │
│ Verify it in seconds.     │    │  ...body text... │       │
│                           │    │  [sig] [STAMP]   │       │
│ A description paragraph   │    └─────────────────┘       │
│                           │       ↕ floating anim        │
│ [■ Verify]  [□ How]      │           ● amber glow       │
└───────────────────────────┴──────────────────────────────┘
```

- CSS Grid: `grid-template-columns: 1fr 1fr` with `gap: 40px`, `align-items: center`
- Left column: max-width 380px
  - Hero badge: amber pill with shield SVG icon + "Public verification portal"
  - H1 line 1: "Is that signed" + line break + "document **real**?" — "real" in `var(--am-hover)` color
  - H1 line 2: "Verify it in seconds." — lighter weight (500), muted color, slightly smaller (32px)
  - Paragraph: 16px, muted, 1.65 line-height
  - Two buttons: Primary amber + Secondary outline
- Right column: Document scene
  - Container: `display: flex; justify-content: center; align-items: center; min-height: 380px`
  - Amber radial glow: `position: absolute` pseudo-element, 200px circle, `radial-gradient(circle, rgba(245,158,11,.12), transparent 70%)`
  - Document: `animation: docFloat 6s ease-in-out infinite` — `0%,100%: translateY(0) rotate(-1deg)` → `50%: translateY(-10px) rotate(0.5deg)`

**Document mockup spec (critical — must look like a real Indian document):**

```
┌───────────────────────────────────┐
│     BEYONDTAX PRIVATE LIMITED     │  ← 13px, 700 weight, center, ALL CAPS
│ CIN: U74999TG2024PTC123456 · Hyd │  ← 8px, mono, muted, center
├───────────────────────────────────┤  ← 1.5px solid border
│                                   │
│        BOARD RESOLUTION           │  ← 11px, 700, underline, center
│  Annual Compliance — FY 2025-26   │  ← 8px, muted, center
│                                   │
│ RESOLVED THAT pursuant to Section │  ← 8.5px, 1.7 line-height
│ 179 of the Companies Act, 2013,   │
│ the Board of Directors hereby...  │
│ ████████████████████████  90%     │  ← gray placeholder lines
│ ██████████████████  78%           │
│ ████████████████████████  85%     │
│ █████████████  62%                │
│                                   │
│ [Signature]    ┌──────────────┐   │
│ Dheeraj Rao    │ ⛨ SIGNED VIA │   │  ← amber border, amber-light bg
│ Chikyala       │  SIGN IDED   │   │  ← 7px, 800 weight, mono, amber
│ Director       │ UVC: X1Z5-AB3│   │  ← 6.5px, mono, muted
│ DIN: 09876543  └──────────────┘   │
└───────────────────────────────────┘
```

- Document card: white bg, `border-radius: 6px`, `box-shadow: 0 2px 4px rgba(0,0,0,.04), 0 12px 40px rgba(0,0,0,.06), 0 0 0 0.5px rgba(0,0,0,.06)`, width 300px, padding 28px 24px
- `transform: rotate(-1deg)` base rotation (float animation oscillates around this)
- Stamp: 2px amber border, amber-light bg, 8px border-radius, `animation: stampPulse 3s ease-in-out infinite` — `box-shadow: 0 0 0 0 → 0 0 12px 3px rgba(245,158,11,.2)`
- Text in the document uses the `color: #1a1a1a` (actual document text, NOT theme text — this is a paper mockup)

### Section 3: Trust Bar

```
┌──────────────────────────────────────────────────────────────────┐
│  🛡 IT Act §3A aligned    🔒 SHA-256 fingerprinted    ⊘ No docs stored    ▦ WCAG 2.1 AA  │
└──────────────────────────────────────────────────────────────────┘
```

- `border-top` + `border-bottom`: 0.5px solid var(--bd)
- Flex row, center justified, gap 28px
- Each item: SVG icon (14×14, 50% opacity) + text (11px, 500 weight, muted)
- No links, no interactions — purely declarative trust signals

### Section 4: Inline Verify Form

- Section background: var(--bg2) — alternating background
- Border-top + border-bottom: 0.5px solid var(--bd)
- Section heading: "Verify a signed document" (26px/700) + sub (15px/muted)
- Form card: max-width 480px, centered, white bg, 0.5px border, 14px border-radius
- **Ambient border glow on hover**: `::before` pseudo-element with gradient border using mask-composite technique
- Tab bar: UVC tab (active — amber underline 2px) / PDF upload tab
- UVC input: Geist Mono, 15px, 14px 16px padding, 1.5px border, 10px radius, amber focus ring
- Submit button: full-width, amber bg, dark text, 600 weight, 14px height 48px, hover lifts
- Security note: muted bg, lock icon, small text about OTP requirement
- Below the card: 3-column info row (UVC Code, Fingerprint, Secure Preview) — same as before but with Geist typography
- Demo codes pill: centered, muted bg, mono font with green/orange/red colored codes

### Section 5: How It Works

- Section heading: "How it works" + "Two phases. Six steps. Under a minute."
- Phase 1 label: green pill with shield-check icon + "Phase 1"
- Phase title: "Verify the signature" — 18px/700
- 3 connected steps in a row: step-num (32px circle, green) → connecting line with arrow → step-num → line → step-num
- Each step: who-badge (YOU/AUTOMATIC/OWNER as pill tags), icon box (36px, green-light bg), h4 title, p description
- Divider: horizontal lines + centered amber pill "Document verified — want to see it?"
- Phase 2: same layout but amber colors, steps 4-5-6
- CTA at bottom: "Verify a document" amber button

### Section 6: Verification Result (inline replacement)

This is NOT a separate section on page load — it appears **when the user submits the form**, replacing the form via `AnimatePresence` from motion/react.

Build all 4 states as separate components:
- **Verified**: green banner, ShieldCheck icon, "VERIFIED" badge, metadata fields (fingerprint copyable, date, method, document), preview CTA
- **Not Found**: orange ShieldAlert, "No record found", guidance text, "Try again" + "Report" buttons
- **Expired**: orange ShieldOff, "Code expired", guidance to request fresh code
- **Revoked**: red ShieldX, "Signature revoked", warning text, "Report suspected fraud" button

### Section 7: FAQs

- Section background: var(--bg2) alternating
- Heading: "Common questions" (not "Frequently asked questions" — shorter, more natural)
- Max-width 520px centered
- 5 FAQ items as buttons (Radix Accordion)
- Closed: 0.5px border, 10px radius, 14px padding, flex space-between with chevron
- Hover: border-color → amber
- Open: border-color → amber, bottom radius removed on question, answer div appears below with amber border, no top border
- One FAQ open at a time (single accordion mode)
- Answer text: 13px, muted, 1.7 line-height

### Section 8: Footer

- Simple flex row, space-between
- Left: shield SVG + "SignIDed — Public verification portal by **Aiyug Tech**"
- Right: Privacy, Terms, Security, Contact — all as links
- "Aiyug Tech" links to `https://aiyugtech.com` (external)

---

## index.html — SEO & Fonts

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Geist fonts via CDN -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-sans/style.min.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-mono/style.min.css" />

  <!-- Favicons -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />

  <!-- SEO -->
  <title>Verify PDF Signature Online (India) — Sign IDed by Aiyug</title>
  <meta name="description" content="Check if any digitally signed PDF is genuine, untampered, and valid. Enter a verification code or upload the signed PDF. No account needed. Free public portal by Aiyug Tech." />
  <link rel="canonical" href="https://signided.aiyugtech.com/" />

  <!-- Open Graph -->
  <meta property="og:title" content="Is that signed document real? Verify it in seconds." />
  <meta property="og:description" content="Free public portal to verify digitally signed PDFs in India. Enter a code or upload the file." />
  <meta property="og:image" content="https://signided.aiyugtech.com/og-image.png" />
  <meta property="og:url" content="https://signided.aiyugtech.com/" />
  <meta property="og:type" content="website" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Sign IDed — Verify PDF Signatures (India)" />
  <meta name="twitter:description" content="Check any signed PDF instantly. Free, no login." />

  <!-- FAQPage + Organization schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why does the OTP go to the document owner, not me?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The document contains private information. Sign IDed ensures only the owner or signer can authorize who sees it. The OTP is proof of consent."
        }
      },
      {
        "@type": "Question",
        "name": "What if the owner doesn't approve my preview request?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The request expires after 10 minutes. You can still see the verification status and fingerprint. Contact the issuer if you need the full document."
        }
      },
      {
        "@type": "Question",
        "name": "What if my code is expired or revoked?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Expired means the code has passed its validity period — ask the issuer for a fresh one. Revoked means the signer cancelled the signature — treat the document as invalid."
        }
      },
      {
        "@type": "Question",
        "name": "How long does a preview last?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "15 minutes after the owner approves. Previews are read-only, non-downloadable, and open inside the Doclate viewer."
        }
      },
      {
        "@type": "Question",
        "name": "Can I verify using only the PDF?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Upload the signed PDF and we extract the signature metadata automatically. You may still need owner approval to preview the contents."
        }
      }
    ]
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Aiyug Technologies Pvt Ltd",
    "url": "https://aiyugtech.com",
    "logo": "https://aiyugtech.com/logo.svg"
  }
  </script>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

---

## Mock Data & API Layer

### Constants (src/lib/constants.ts)

```typescript
export const VALID_UVCS = ["X1Z5-AB3", "X1Z5AB3", "Y7K2-CD9", "Y7K2CD9", "DEMO-001", "DEMO001"];
export const EXPIRED_UVCS = ["EXP1-999", "EXP1999"];
export const REVOKED_UVCS = ["REV0-ABC", "REV0ABC"];

export const MOCK_RESULT = {
  status: "verified" as const,
  fingerprint: "SHA-256: 9A3F…21C8",
  signedOn: "25 Aug 2025, 10:00 IST",
  method: "Aadhaar OTP e-Sign",
  docTitle: "Board Resolution — Annual Compliance Filing FY 2025-26",
  signerInitials: "DRC",
  pages: 3,
};
```

### UVC Utilities (src/lib/uvc.ts)

```typescript
export function normalizeUVC(raw: string): string {
  return raw.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export function isValidFormat(raw: string): boolean {
  return /^[A-Z0-9]{4,10}$/.test(normalizeUVC(raw));
}

export type VerifyStatus = "verified" | "expired" | "revoked" | "not-found";

export function resolveUVC(raw: string): VerifyStatus {
  const norm = normalizeUVC(raw);
  if (VALID_UVCS.map(normalizeUVC).includes(norm)) return "verified";
  if (EXPIRED_UVCS.map(normalizeUVC).includes(norm)) return "expired";
  if (REVOKED_UVCS.map(normalizeUVC).includes(norm)) return "revoked";
  return "not-found";
}
```

### API Client (src/api/verify.ts)

```typescript
// Phase 1: mock with delays. Phase 2+: replace with real fetch calls.
export async function verifyUVC(code: string): Promise<VerifyResult> {
  await new Promise(r => setTimeout(r, 2500)); // Simulate network
  const status = resolveUVC(code);
  if (status === "not-found") return { status: "not-found" };
  return { ...MOCK_RESULT, status };
}

export async function verifyPDF(file: File): Promise<VerifyResult> {
  await new Promise(r => setTimeout(r, 3000)); // Simulate extraction
  return { ...MOCK_RESULT, status: "verified" };
}
```

---

## State Management

Use **React context + useReducer** for the verification flow state machine. Do NOT use Zustand/Redux — the state is page-local, not global.

```typescript
type AppStep =
  | "landing"      // Homepage with form visible
  | "input"        // Standalone /verify page
  | "loading"      // Checking the record
  | "quick-result" // Verified — showing metadata
  | "not-found"    // No record
  | "expired"      // Code expired
  | "revoked"      // Signature revoked
  | "preview-request"   // Consent screen
  | "preview-waiting"   // Waiting for owner OTP
  | "preview-approved"  // Owner approved, opening viewer
  | "preview-viewer";   // Read-only Doclate viewer

type Action =
  | { type: "VERIFY_START" }
  | { type: "VERIFY_RESULT"; status: VerifyStatus; result?: QuickResult }
  | { type: "REQUEST_PREVIEW" }
  | { type: "PREVIEW_APPROVED" }
  | { type: "OPEN_VIEWER" }
  | { type: "RESET" };
```

Wrap the page in a `VerifyProvider` that holds the reducer. All child components dispatch actions and read state from context.

---

## Animation Spec (motion/react)

```typescript
// Page transitions — form → loading → result
<AnimatePresence mode="wait">
  {step === "loading" && (
    <motion.div
      key="loading"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <LoadingState />
    </motion.div>
  )}
  {step === "quick-result" && (
    <motion.div
      key="result"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <ResultCard result={result} />
    </motion.div>
  )}
</AnimatePresence>

// Scroll-triggered reveals for feature cards and steps
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: 0.5, delay: index * 0.1 }}
>

// Preview approval — spring bounce
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ type: "spring", stiffness: 400, damping: 15 }}
>
```

---

## Responsive Breakpoints

```css
/* Mobile-first, then enhance */
/* Default: mobile (<640px) — single column, stacked */
/* sm (640px+):  minor adjustments */
/* md (768px+):  2-column hero, 2-col steps */
/* lg (1024px+): 3-col steps, full layout as designed */

/* Hero: stacks to single column on <768px, document below copy */
/* Steps: stack vertically on <768px, connecting lines become vertical */
/* Verify card: always centered, max-width 480px, no change needed */
/* Trust bar: wraps to 2×2 grid on mobile */
```

Build mobile AFTER the desktop version is correct. The design is desktop-first.

---

## Key Files from Doclate Project (Reference Only)

These files in the Doclate project contain logic and patterns to **reference**, not copy. Rebuild cleanly.

| File | What to extract |
|------|----------------|
| `signided-verify.tsx` (in project) | State machine logic, UVC validation, all flow states, mock data shape. **Warning**: this uses a different design system (Doclate's `dsFont`/`dsMonoFont` helpers) — do NOT import those |
| `theme.css` | CSS variable naming pattern (adapt to Sign IDed amber tokens) |
| `button.tsx`, `badge.tsx`, `dialog.tsx` | shadcn/ui component patterns. Copy the ones you need, retheme with amber |
| `aiyug-signing-spec.md` | Section on "SignIDed SEO and indexing rules" — follow for robots/noindex |

---

## Decisions Already Made (Do Not Revisit)

1. **Brand color is amber `#F59E0B`** — not indigo, not teal, not purple
2. **Font is Geist** — not Inter, not system fonts
3. **Hero has a real document mockup** — not abstract shapes or stock photos
4. **CTA text on amber uses dark foreground** — not white (contrast requirement)
5. **Status colors are semantic** — green=verified, orange=expired, red=revoked. Amber is ONLY brand
6. **Homepage IS the product** — the verify form lives inline on the landing page, not behind a /verify click
7. **Phase 1 uses mock data** — no real API, no backend dependency
8. **Standalone repo** — not a page within Doclate, not a Framer page
9. **Legal pages link to parent** (aiyugtech.com) initially — own pages later
10. **React SPA with client-side routing** — not SSR/Next.js (simplicity for Phase 1)

---

## Prompt Template for Claude Code Sessions

```
Project: Sign IDed (signided.aiyugtech.com)
Product: Public PDF signature verification portal for India
Company: Aiyug Technologies Pvt Ltd

Reference files (read first):
- SIGNIDED_PLAN.md (architecture, API, data model)
- SIGNIDED_HOMEPAGE_WIRING_PLAN.md (homepage sections, brand, SEO)
- SIGNIDED_CLAUDE_CODE.md (THIS file — build spec, visual design, file structure)

Brand: Amber #F59E0B, Geist font, Razorpay/Zerodha-clean aesthetic
Stack: React 18 + Vite + TypeScript + Tailwind 4 + motion/react + Radix + Lucide

Current task: [DESCRIBE SPECIFIC TASK]

Constraints:
- Use Geist Sans for all text, Geist Mono for UVC codes and fingerprints
- Amber (#F59E0B) is brand accent. Dark text (#1C1917) on amber buttons.
- Status colors: green=verified, orange=expired, red=revoked — NOT amber
- All transitions 0.15-0.2s ease. Hero doc floats on 6s cycle. Stamp pulses 3s.
- Mock data only — no real API calls. Stub with setTimeout delays.
- Verify form has amber focus ring (border + 4px box-shadow).
- FAQ accordion: single-open, amber border on active item.
- Mobile: stack hero to single column, steps to vertical. Build after desktop.
```

---

## Testing Checklist (Run After Every Change)

```
BUILD & ROUTES
[ ] npm run build succeeds with 0 errors
[ ] / loads with all 8 sections visible
[ ] /verify loads with standalone form
[ ] /verify/X1Z5-AB3 auto-populates and triggers verification
[ ] /privacy, /terms, /security render placeholder content
[ ] 404 page renders for unknown routes

VISUAL
[ ] Geist Sans renders (not system font fallback)
[ ] Geist Mono renders on UVC input and fingerprint
[ ] Amber brand color appears in: header mark, hero badge, CTAs, Phase 2 strips, stamp
[ ] Status colors are green (verified), orange (expired), red (revoked) — NOT amber
[ ] Document mockup floats on 6s animation
[ ] Stamp pulses with amber shadow on 3s cycle
[ ] Trust bar shows 4 items in a row

INTERACTIONS
[ ] Primary CTA: lifts 2px on hover with amber shadow bloom
[ ] Verify input: amber focus ring appears on click (border + shadow)
[ ] Verify card: gradient border fades in on hover
[ ] Tab switch: underline animates between UVC/PDF tabs
[ ] FAQ: click opens one, click another closes previous, amber border on open
[ ] Header "Verify now": scrolls to verify section smoothly
[ ] "Where is this?" link: opens code-help modal
[ ] All buttons have cursor: pointer

VERIFICATION FLOW
[ ] Enter X1Z5-AB3 → loading (2.5s) → verified result with green banner + metadata
[ ] Enter EXP1-999 → loading → expired state with orange banner
[ ] Enter REV0-ABC → loading → revoked state with red banner
[ ] Enter AAAA-BBB → loading → not-found state
[ ] Empty submit → inline error message
[ ] Invalid format (e.g., "!!") → inline error
[ ] AnimatePresence transitions between all states without layout jump

PREVIEW FLOW (from verified result)
[ ] "Preview this document" → preview request screen with 3-step explainer
[ ] "Send request" → waiting state with progress animation
[ ] Auto-approve after ~4s → approved state with green bounce
[ ] Auto-transition to viewer after 2s → Doclate viewer shell
[ ] 15-min countdown timer ticks down
[ ] Timer turns red below 2 minutes
[ ] "Done — Verify Another" resets to form

SEO
[ ] Page title: "Verify PDF Signature Online (India) — Sign IDed by Aiyug"
[ ] Meta description present and correct
[ ] OG tags render in social preview (test with opengraph.xyz)
[ ] FAQPage JSON-LD is valid (test with Google Rich Results tester)
[ ] robots.txt exists at /robots.txt

RESPONSIVE
[ ] Desktop (1024px+): full side-by-side hero, 3-col steps
[ ] Tablet (768px): hero stacks, steps 2-col or stacked
[ ] Mobile (375px): everything single column, buttons full width, no horizontal overflow
```

---

## Build Order (Recommended)

```
1. Scaffold: Vite + React + TS + Tailwind + routing
2. Theme: Geist fonts, amber tokens, base CSS
3. Layout: site-header.tsx + site-footer.tsx
4. Hero: hero-section.tsx + document-mockup.tsx (with float animation)
5. Trust bar: trust-bar.tsx
6. Verify form: verify-form.tsx + uvc-input.tsx + pdf-upload.tsx (with amber focus ring)
7. Mock API: constants.ts + uvc.ts + verify.ts stubs
8. Verification flow: state reducer + loading-state + all 4 result states
9. How it works: hiw-section.tsx + step-card.tsx (Phase 1 green + Phase 2 amber)
10. FAQ: faq-section.tsx (Radix Accordion with amber active state)
11. Preview flow: request → waiting → approved → viewer
12. Modals: code-help + report
13. SEO: index.html meta, schema, robots, sitemap
14. Legal pages: privacy, terms, security (placeholder)
15. Responsive: mobile pass
16. Polish: all hover states, transitions, animation timing
```
