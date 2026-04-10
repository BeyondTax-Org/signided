# SignIded — Fix, Align to Figma Make & AWS Amplify Deployment
> Design Spec | 2026-04-11 | Aiyug Technologies Pvt Ltd

---

## 1. Context

SignIded (`signided.aiyugtech.com`) is a standalone React SPA — the public verification portal for digitally signed PDFs. The codebase exists at `C:/Users/ADMIN/Desktop/Aiyug Technologies/Signided/` and is built with:

- React 19 + Vite 6 + TypeScript 5.7
- Tailwind CSS v4 + Radix UI + motion (Framer Motion)
- React Router v7

**Current state:**
- Build is clean — `tsc` and `vite build` pass with zero errors
- CSS design tokens in `src/styles/theme.css` are correct (brand amber, neutrals, status colors)
- **Not deployed anywhere** — no CI/CD config exists
- Two visual issues vs Figma Make: Hero is centered/stacked (not split), and Compliance Badges section is missing
- TrustBar component (4 features cards) lacks a section header

**Target:** Align page to Figma Make design, deploy to AWS Amplify (not Vercel).

---

## 2. What's Broken / Missing

| # | Issue | Severity | Action |
|---|---|---|---|
| 1 | Hero layout — centered column instead of split (left copy / right mockup) | High | Update component |
| 2 | Compliance Badges section missing entirely | High | Create new component |
| 3 | Features Grid has no section heading | Medium | Update TrustBar |
| 4 | No AWS Amplify deployment config | High | Create `amplify.yml` |
| 5 | No SPA redirect rule for Amplify | High | Add to `amplify.yml` |

---

## 3. Final Page Section Order (8 sections)

Matches Figma Make output exactly:

```
① Navbar           — sticky, mobile hamburger menu
② Hero             — split layout: left copy | right floating document mockup
③ Compliance Badges — slim strip: §3A · SHA-256 · Zero Storage · WCAG 2.1
④ Features Grid    — section header + 4 animated cards (2×2 grid)
⑤ Verify Section   — UVC input + PDF upload tabs with demo codes
⑥ How It Works     — 2 phases, 6 steps timeline
⑦ FAQ Accordion    — 5 questions, Radix accordion
⑧ Footer           — dark surface, SVG lockup + Aiyug mark logos
```

---

## 4. Component Changes

### 4.1 Hero Section — Split Layout (`src/components/hero/hero-section.tsx`)

**Current:** Single centered column — badge → shield mark → H1 → sub → description → CTA → document mockup below.

**Target:** Two-column split on desktop (`lg:` breakpoint), stacked on mobile.

```
┌──────────────────────┬──────────────────────┐
│  LEFT (text)         │  RIGHT (visual)       │
│  ─────────────────   │  ─────────────────    │
│  Badge pill          │  DocumentMockup       │
│  Shield mark         │  (floating animation) │
│  H1                  │  + amber stamp overlay│
│  Sub (amber)         │                       │
│  Description         │                       │
│  CTA button          │                       │
└──────────────────────┴──────────────────────┘
   ↕ stacks on mobile (text first, mockup below)
```

- Left column: `max-w-[520px]`, left-aligned text on desktop
- Right column: `DocumentMockup` with amber stamp SVG overlay (`signided-mark-color-light.svg`)
- Container: `max-w-[1120px]`, `gap-12 lg:gap-16`
- Mobile: text centered, mockup `max-w-[320px]` centered below

### 4.2 Compliance Badges — NEW (`src/components/compliance-badges.tsx`)

A slim horizontal strip between Hero and Features Grid.

**Visual spec:**
- Background: `var(--am-bg)` (amber 8% tint)
- Border top + bottom: `0.5px solid rgba(180,83,9,0.15)`
- Padding: `py-3.5 px-6`
- Content: 4 badge pills in a row, centered, `gap-4 flex-wrap`

**4 badges:**
| Badge | Icon | Label |
|---|---|---|
| §3A Compliant | `ShieldCheck` (lucide) | `§3A Compliant` |
| SHA-256 Integrity | `Lock` (lucide) | `SHA-256 Integrity` |
| Zero Storage | `EyeOff` (lucide) | `Zero Storage` |
| WCAG 2.1 AA | `Accessibility` → use `UserCheck` (lucide) | `WCAG 2.1 AA` |

**Badge pill style:**
- `inline-flex items-center gap-1.5 px-3 py-1 rounded-full`
- Background: `var(--am-light)` (`#FEF3C7`)
- Icon: 13px, color `var(--am)` (`#B45309`)
- Text: `text-[11px] font-semibold tracking-wide uppercase`, color `var(--am)`

### 4.3 Features Grid — Add Section Header (`src/components/trust-bar.tsx`)

Rename file to `src/components/features-grid.tsx`. Add section header above the 4 cards:

```
Why Sign IDed?                          ← H2, 26px/700/-0.03em
Designed for India's digital signing    ← sub, 15px/400, --muted-foreground
compliance requirements.
```

Update import in `src/pages/home.tsx` from `TrustBar`/`trust-bar` → `FeaturesGrid`/`features-grid`.

### 4.4 Home Page — Insert ComplianceBadges (`src/pages/home.tsx`)

Update section order:

```tsx
<HeroSection />
<ComplianceBadges />   ← NEW — insert here
<FeaturesGrid />       ← was TrustBar
<VerifyForm ... />
...
```

---

## 5. AWS Amplify Deployment

### 5.1 `amplify.yml` (project root)

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### 5.2 SPA Redirect Rule

Required so React Router routes (e.g. `/verify`, `/privacy`) return `index.html` instead of 404.

In Amplify Console → App → Rewrites and Redirects, add:

| Source | Target | Type |
|---|---|---|
| `</^[^.]+$\|\.(?!(css\|gif\|ico\|jpg\|js\|png\|txt\|svg\|woff\|woff2\|ttf\|map\|json)$)([^.]+$)/>` | `/index.html` | 200 (Rewrite) |

This can also be set in `amplify.yml` under `customHeaders` or via the Amplify Console UI.

### 5.3 Amplify Console Setup Checklist

- [ ] Connect GitHub repo (or push to CodeCommit)
- [ ] Select branch: `main`
- [ ] Framework: detect as Vite automatically (or set manually)
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Node.js version: 18 (set env var `_LIVE_UPDATES` if needed)
- [ ] Domain: `signided.aiyugtech.com` → connect custom domain in Amplify Console
- [ ] Add SPA redirect rule (see §5.2)

---

## 6. File Change Summary

| File | Action | Notes |
|---|---|---|
| `src/components/hero/hero-section.tsx` | Update | Split layout, left/right columns |
| `src/components/compliance-badges.tsx` | Create | NEW — 4 compliance badge pills |
| `src/components/features-grid.tsx` | Create (rename) | Was `trust-bar.tsx` + section header |
| `src/components/trust-bar.tsx` | Delete | Replaced by `features-grid.tsx` |
| `src/pages/home.tsx` | Update | Insert ComplianceBadges, update imports |
| `amplify.yml` | Create | AWS Amplify CI/CD config |

---

## 7. Out of Scope (Future)

- Dark mode toggle (CSS variables already support it — `--bg`, `--tx` etc.)
- Real API integration (mock data stays for Phase 1)
- SEO meta tags / Open Graph (exists in `index.html` already)
- Analytics integration

---

## 8. Success Criteria

- [ ] `npm run build` passes with zero errors
- [ ] Hero renders as two-column split on desktop, stacked on mobile
- [ ] Compliance Badges strip visible between Hero and Features Grid
- [ ] Features Grid has "Why Sign IDed?" section header
- [ ] All 8 sections present and in correct order
- [ ] `amplify.yml` present at repo root
- [ ] Amplify builds and serves from `dist/`
- [ ] SPA routing works (direct URL to `/verify` serves the app)
- [ ] All SVG brand assets render correctly
- [ ] Mobile hamburger menu works
- [ ] FAQ accordion opens/closes
- [ ] Demo verification codes work (X1Z5-AB3, EXP1-999, REV0-ABC)
