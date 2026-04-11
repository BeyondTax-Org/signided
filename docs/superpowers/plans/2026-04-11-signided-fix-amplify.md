# SignIded Fix + AWS Amplify Deployment — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the SignIded landing page to match the Figma Make design (split Hero, Compliance Badges strip, Features Grid header) and configure AWS Amplify CI/CD deployment.

**Architecture:** Keep all existing components and their logic intact — only update the Hero layout, add one new `ComplianceBadges` component, add a section header to the Features Grid, wire everything into `home.tsx`, and create `amplify.yml` at the repo root. Zero new dependencies required.

**Tech Stack:** React 19, Vite 6, TypeScript 5.7, Tailwind CSS v4, motion (Framer Motion), Lucide React, AWS Amplify Hosting

**Spec:** `docs/superpowers/specs/2026-04-11-signided-fix-amplify-design.md`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/components/compliance-badges.tsx` | **Create** | Slim amber strip with 4 compliance badge pills |
| `src/components/features-grid.tsx` | **Create** (via `git mv` from `trust-bar.tsx`) | 4 features cards + section header |
| `src/components/trust-bar.tsx` | **Git rename** → `features-grid.tsx` | (source only — becomes features-grid) |
| `src/components/hero/hero-section.tsx` | **Update** | Split two-column layout (left copy / right mockup) |
| `src/pages/home.tsx` | **Update** | Insert `<ComplianceBadges />`, update `TrustBar` → `FeaturesGrid` imports |
| `amplify.yml` | **Create** | AWS Amplify CI/CD: Node 18, build, artifacts, SPA redirect |

---

## Task 1: Create Compliance Badges Component

**Files:**
- Create: `src/components/compliance-badges.tsx`

### Background
This is the slim amber-tinted strip that sits directly below the Hero. It shows 4 compliance signals that build immediate trust: `§3A Compliant`, `SHA-256 Integrity`, `Zero Storage`, `WCAG 2.1 AA`. It uses only existing CSS tokens from `theme.css` — no new variables needed.

- [ ] **Step 1.1: Create `src/components/compliance-badges.tsx`**

```tsx
import { ShieldCheck, Lock, EyeOff, UserCheck } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "§3A Compliant" },
  { icon: Lock,        label: "SHA-256 Integrity" },
  { icon: EyeOff,      label: "Zero Storage" },
  { icon: UserCheck,   label: "WCAG 2.1 AA" },
] as const;

export function ComplianceBadges() {
  return (
    <div
      className="w-full px-6 py-3.5"
      style={{
        background: "var(--am-bg)",          /* rgba(180,83,9,0.08) */
        borderTop: "0.5px solid rgba(180,83,9,0.15)",
        borderBottom: "0.5px solid rgba(180,83,9,0.15)",
      }}
    >
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-center gap-3">
        {badges.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1"
            style={{
              background: "var(--am-light)",  /* #FEF3C7 */
            }}
          >
            <Icon
              size={13}
              strokeWidth={2.5}
              style={{ color: "var(--am)" }}   /* #B45309 */
            />
            <span
              className="text-[11px] font-semibold uppercase tracking-wide"
              style={{ color: "var(--am)" }}
            >
              {label}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 1.2: Verify the file saved correctly**

Run: `npx tsc --noEmit`
Expected: zero errors (new file is not yet imported, so TS won't flag it).

- [ ] **Step 1.3: Commit**

```bash
git add src/components/compliance-badges.tsx
git commit -m "feat: add ComplianceBadges strip (§3A, SHA-256, Zero Storage, WCAG 2.1)"
```

---

## Task 2: Rename TrustBar → FeaturesGrid + Add Section Header

**Files:**
- Git rename: `src/components/trust-bar.tsx` → `src/components/features-grid.tsx`
- Modify: `src/components/features-grid.tsx` — add section header

### Background
The existing `TrustBar` component already has the 4 feature cards built correctly. We're just:
1. Renaming it so the filename reflects its actual purpose
2. Adding the "Why Sign IDed?" section heading that's shown in Figma Make above the cards

- [ ] **Step 2.1: Git rename the file**

```bash
git mv "src/components/trust-bar.tsx" "src/components/features-grid.tsx"
```

- [ ] **Step 2.2: Add section header and rename the export**

Open `src/components/features-grid.tsx`. Make two changes:
1. Add the section header block above the grid `div`
2. Rename the exported function from `TrustBar` to `FeaturesGrid`

The full updated file:

```tsx
import { motion } from "motion/react";
import { Zap, Eye, ShieldCheck, UserX } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Verification",
    description:
      "Enter a UVC code or upload the PDF — get a definitive answer in under 3 seconds.",
  },
  {
    icon: Eye,
    title: "Owner-Approved Preview",
    description:
      "View the original document only after the signer approves via a one-time OTP.",
  },
  {
    icon: ShieldCheck,
    title: "Tamper-Proof Integrity",
    description:
      "SHA-256 fingerprint confirms the file hasn't been modified since signing.",
  },
  {
    icon: UserX,
    title: "No Account Needed",
    description:
      "Anyone with a verification code can check a document — no signup or login required.",
  },
];

export function FeaturesGrid() {
  return (
    <section className="px-6 py-16" style={{ background: "var(--background)" }}>
      {/* Section header */}
      <div className="mx-auto mb-10 max-w-[1120px]">
        <h2
          className="mb-2"
          style={{
            fontSize: "26px",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "var(--foreground)",
          }}
        >
          Why Sign IDed?
        </h2>
        <p
          style={{
            fontSize: "15px",
            color: "var(--muted-foreground)",
            lineHeight: 1.6,
          }}
        >
          Designed for India&apos;s digital signing compliance requirements.
        </p>
      </div>

      {/* 4 cards grid */}
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-5 sm:grid-cols-2">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 24,
              delay: i * 0.08,
            }}
            className="group rounded-[var(--radius-card)] border p-5 transition-all duration-300"
            style={{
              background: "var(--card)",
              borderColor: "var(--border)",
              boxShadow: "var(--shadow-sm)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "var(--shadow-md)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "var(--shadow-sm)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                style={{ background: "rgba(180, 83, 9, 0.12)" }}
              >
                <feature.icon size={22} strokeWidth={2} style={{ color: "#B45309" }} />
              </div>
              <div>
                <h3
                  className="mb-1 text-[15px] font-semibold"
                  style={{ color: "var(--foreground)", letterSpacing: "-0.01em" }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-[13px] leading-[1.65]"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {feature.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2.3: Verify TypeScript is still happy**

Run: `npx tsc --noEmit`
Expected: zero errors (home.tsx still imports `TrustBar` from old path — that's fine, we'll fix in Task 4).

> Note: TS will error on the old import in home.tsx until Task 4. That's expected and acceptable.

- [ ] **Step 2.4: Commit**

```bash
git add src/components/features-grid.tsx
git commit -m "feat: rename TrustBar → FeaturesGrid, add section header"
```

---

## Task 3: Fix Hero Section — Split Layout

**Files:**
- Modify: `src/components/hero/hero-section.tsx`

### Background
The current hero stacks everything in a single centered column. Figma Make shows a two-column layout at `lg` (1024px+): left side has all text + CTA, right side has the `DocumentMockup`. On mobile (< 1024px) it stacks: text centered on top, mockup centered below.

The `DocumentMockup` component already includes the amber stamp — no changes needed to `document-mockup.tsx`.

- [ ] **Step 3.1: Replace `src/components/hero/hero-section.tsx` with split layout**

```tsx
import { DocumentMockup } from "./document-mockup";

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden px-6 pt-20 pb-12"
      style={{ background: "var(--background)" }}
    >
      <div className="relative mx-auto flex max-w-[1120px] flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">

        {/* ── LEFT: Copy ── */}
        <div className="flex w-full flex-col items-center text-center lg:max-w-[520px] lg:items-start lg:text-left">

          {/* Badge */}
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 animate-fade-in"
            style={{
              background: "var(--muted)",
              borderColor: "var(--border)",
            }}
          >
            <span
              className="text-[11px] font-semibold tracking-wide"
              style={{ color: "var(--muted-foreground)" }}
            >
              Public verification portal
            </span>
          </div>

          {/* Shield mark */}
          <div
            className="mb-5 flex animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <img
              src="/brand/signided-mark-color-light.svg"
              alt="Sign IDed"
              className="h-14 w-14"
            />
          </div>

          {/* H1 */}
          <h1
            className="mb-4 animate-fade-in"
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.08,
              color: "var(--foreground)",
              animationDelay: "0.15s",
            }}
          >
            Is that signed document real?
          </h1>

          {/* Sub */}
          <p
            className="mb-5 animate-fade-in"
            style={{
              fontSize: "clamp(20px, 3vw, 26px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.25,
              color: "var(--am)",
              animationDelay: "0.25s",
            }}
          >
            Verify it in seconds.
          </p>

          {/* Description */}
          <p
            className="mb-6 max-w-[480px] leading-[1.7] animate-fade-in lg:max-w-none"
            style={{
              fontSize: "15px",
              color: "var(--muted-foreground)",
              animationDelay: "0.35s",
            }}
          >
            Enter the unique verification code printed on any Aiyug-signed PDF
            — or upload the file directly. Instant results. No account needed.
          </p>

          {/* CTA */}
          <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <a
              href="#verify"
              className="cta-shine inline-flex items-center rounded-xl px-8 py-3.5 text-[15px] font-semibold no-underline hover:scale-[1.03] active:scale-[0.97] transition-transform"
              style={{
                background: "#1C1917",
                color: "#FFFFFF",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              Verify a document
            </a>
          </div>
        </div>

        {/* ── RIGHT: Document Mockup ── */}
        <div
          className="w-full max-w-[320px] animate-fade-in sm:max-w-[360px] lg:max-w-none lg:flex-1"
          style={{ animationDelay: "0.5s" }}
        >
          <DocumentMockup />
        </div>

      </div>
    </section>
  );
}
```

- [ ] **Step 3.2: Run TypeScript check**

Run: `npx tsc --noEmit`
Expected: Any errors are only from `home.tsx`'s stale `TrustBar` import — not from hero files.

- [ ] **Step 3.3: Commit**

```bash
git add src/components/hero/hero-section.tsx
git commit -m "feat: hero split layout — left copy, right document mockup (lg breakpoint)"
```

---

## Task 4: Update `home.tsx` — Wire In New Components

**Files:**
- Modify: `src/pages/home.tsx`

### Background
Two import changes needed:
1. `TrustBar` from `@/components/trust-bar` → `FeaturesGrid` from `@/components/features-grid`
2. Add `ComplianceBadges` import from `@/components/compliance-badges`

Then in JSX: insert `<ComplianceBadges />` between `<HeroSection />` and `<FeaturesGrid />`.

- [ ] **Step 4.1: Update imports at the top of `src/pages/home.tsx`**

Replace these two lines:
```tsx
import { TrustBar } from "@/components/trust-bar";
```
With:
```tsx
import { FeaturesGrid } from "@/components/features-grid";
import { ComplianceBadges } from "@/components/compliance-badges";
```

- [ ] **Step 4.2: Update JSX in `HomeContent`**

Replace:
```tsx
<HeroSection />
<TrustBar />
```
With:
```tsx
<HeroSection />
<ComplianceBadges />
<FeaturesGrid />
```

- [ ] **Step 4.3: Run full TypeScript check — should be zero errors now**

Run: `npx tsc --noEmit`
Expected: **zero errors**

- [ ] **Step 4.4: Run build — must pass clean**

Run: `npm run build`
Expected output includes:
```
✓ built in ~8s
dist/index.html
dist/assets/index-*.css
dist/assets/index-*.js
```
No errors.

- [ ] **Step 4.5: Start dev server and visually verify all 8 sections**

Run: `npm run dev`
Open: `http://localhost:5173`

Check in browser:
- [ ] ① Navbar — sticky, logo visible, "Verify now" CTA button on right
- [ ] ② Hero — **two columns on wide screen** (text left, floating document right); stacks on narrow window
- [ ] ③ Compliance Badges — amber-tinted strip with `§3A Compliant · SHA-256 Integrity · Zero Storage · WCAG 2.1 AA`
- [ ] ④ Features Grid — "Why Sign IDed?" heading visible above 4 cards (2×2 grid)
- [ ] ⑤ Verify Section — UVC input and PDF upload tabs
- [ ] ⑥ How It Works — timeline/phases visible
- [ ] ⑦ FAQ Accordion — expands/collapses correctly
- [ ] ⑧ Footer — dark background, SVG logos

Responsive check (drag browser window narrow to ~375px):
- [ ] Hero stacks — text on top, mockup below, text centered
- [ ] Compliance badges wrap to multiple rows gracefully
- [ ] Hamburger menu opens/closes

- [ ] **Step 4.6: Commit**

```bash
git add src/pages/home.tsx
git commit -m "feat: wire ComplianceBadges + FeaturesGrid into home page"
```

---

## Task 5: Create AWS Amplify Config

**Files:**
- Create: `amplify.yml` (project root)

### Background
AWS Amplify reads `amplify.yml` from the repo root to know how to build and serve the app. We need:
- Node 18 pinned via `nvm use 18` (Amplify's default may be lower)
- `npm ci` for reproducible installs
- `npm run build` to produce `dist/`
- SPA redirect rule so React Router routes (`/verify`, `/privacy`) don't 404

- [ ] **Step 5.1: Create `amplify.yml` at the project root**

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - nvm use 18
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
  redirects:
    - source: '</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json)$)([^.]+$)/>'
      target: /index.html
      status: '200'
```

- [ ] **Step 5.2: Verify the file is at the project root (not inside `src/`)**

Run: `ls amplify.yml`
Expected: file listed, no error.

- [ ] **Step 5.3: Commit**

```bash
git add amplify.yml
git commit -m "feat: add amplify.yml — Node 18, Vite build, SPA redirect rule"
```

---

## Task 6: Final Build Verification + Git Log

**Files:** None — verification only.

- [ ] **Step 6.1: Clean build from scratch**

```bash
rm -rf dist
npm run build
```
Expected: `✓ built in ~8s` — zero TypeScript errors, zero Vite errors.

- [ ] **Step 6.2: Review git log**

```bash
git log --oneline -6
```
Expected commits (newest first):
```
feat: add amplify.yml — Node 18, Vite build, SPA redirect rule
feat: wire ComplianceBadges + FeaturesGrid into home page
feat: hero split layout — left copy, right document mockup (lg breakpoint)
feat: rename TrustBar → FeaturesGrid, add section header
feat: add ComplianceBadges strip (§3A, SHA-256, Zero Storage, WCAG 2.1)
docs: add SignIded fix + AWS Amplify deployment design spec
```

- [ ] **Step 6.3: Push to remote**

```bash
git push origin main
```
Expected: push succeeds. Amplify will auto-trigger a build if the repo is already connected.

---

## Amplify Console Setup (One-Time — Done by Human)

After pushing, complete these steps in the AWS Amplify Console:

1. **Connect repo** — Amplify Console → New App → Host Web App → GitHub → select repo
2. **Branch:** `main`
3. **Build settings:** Amplify auto-detects `amplify.yml` — no manual config needed
4. **Custom domain:** Amplify Console → Domain Management → `signided.aiyugtech.com`
   - If `aiyugtech.com` is on Route 53: Amplify can auto-configure the CNAME
   - If external registrar: add the CNAME record manually as shown by Amplify
5. **Verify SPA routing** after deploy: visit `https://signided.aiyugtech.com/verify` directly → should load the app (not 404)

---

## Success Checklist

- [ ] `npm run build` passes with zero errors
- [ ] Hero renders as two-column split at `lg` (1024px+), stacked below 1024px
- [ ] At 375px (mobile): hero text centered on top, mockup below
- [ ] Compliance Badges strip visible between Hero and Features Grid
- [ ] Features Grid has "Why Sign IDed?" section heading
- [ ] All 8 sections present in correct order
- [ ] FAQ accordion opens/closes (Radix)
- [ ] Mobile hamburger menu opens/closes
- [ ] Demo verification codes work: `X1Z5-AB3` (verified), `EXP1-999` (expired), `REV0-ABC` (revoked)
- [ ] `amplify.yml` present at repo root
- [ ] All SVG brand assets load (navbar logo, hero shield mark, footer lockup)
- [ ] Clean `git log` shows all 5 feature commits
