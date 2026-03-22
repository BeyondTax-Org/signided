# Sign IDed — Brand Specification
> Version 1.0 | March 2026 | A product by Aiyug Technologies

---

## 1. The name

**Sign IDed** = Sign + Identified
Public verification layer — anyone with a UVC code can verify a signed document is authentic.
Third layer of the stack: Doclate (create) → Sign (execute) → Sign IDed (verify).

---

## 2. The mark — shield with lock ring + OTP underlines

An amber shield containing two elements: a concentric circle (lock ring with center dot) in the upper zone representing secure access, and three horizontal underline strokes in the lower zone at cascading opacity representing OTP code entry slots.

### Construction (80x80 viewbox)

| Element | Position | Opacity | Role |
|---------|----------|---------|------|
| Shield outline | origin (40,10), points to (62,22) (62,44) curve to (40,72) curve to (18,44) (18,22) | 100% | Trust boundary |
| Lock ring (outer) | center (40,28), r=5 | 50% | Secure access |
| Lock ring (center dot) | center (40,28), r=1.8 | 60% | Authentication point |
| OTP line 1 | x:24 to 32, y:48 | 65% | First digit slot |
| OTP line 2 | x:36 to 44, y:48 | 45% | Second digit slot |
| OTP line 3 | x:48 to 56, y:48 | 25% | Third digit slot |

- Shield: stroke-linejoin round, stroke-width 2.8
- OTP lines: stroke-linecap round, stroke-width 2
- Lock ring: stroke-width 1.6
- All stroke-based, no fills except center dot

### Responsive behavior

| Render size | Adjustment |
|-------------|------------|
| 48px+ | Full detail — lock ring + OTP underlines |
| 32px | Remove lock center dot, thicken strokes to 3.5 |
| 16px (favicon) | Shield + three underlines only, remove lock ring, strokes at 5 |

---

## 3. Color system

### Primary: Amber (Sign IDed's own color)

Distinct from Aiyug blue-purple and Doclate emerald. Amber communicates authority, official seals, and trust.

| Context | Stroke color | "Sign" text | "IDed" text |
|---------|-------------|-------------|-------------|
| Dark bg (#0B0B1A) | #F59E0B | #FFFFFF | #F59E0B |
| Black bg (#000) | #FFFFFF | #FFFFFF | #FFFFFF |
| Light bg (#FFF) | #B45309 | #1A1A1A | #B45309 |

### Monochrome fallback

| Context | Stroke | Text |
|---------|--------|------|
| Dark/black bg | #FFFFFF | #FFFFFF |
| Light bg | #1A1A1A | #1A1A1A |

---

## 4. Typography

**Wordmark treatment:** "Sign" + "IDed" — two visual parts.
- "Sign" in neutral text color (white on dark, dark on light)
- "IDed" in amber brand color — highlights the identity-verification aspect
- Both: Inter Medium (500), 19px, letter-spacing 0.3px

**Fallback:** Inter, system-ui, -apple-system, sans-serif

---

## 5. Lockups

### A. Icon + "Sign IDed" (primary)
Mark + wordmark side by side.
- Mark height: 40px at standard use
- Gap: 8px between mark and text
- "IDed" always in brand amber color

### B. "Sign IDed by Aiyug" (endorsed)
Sign IDed lockup + "by" + Aiyug spectrum arcs + "aiyug"
- "by": Inter Regular (400), 13px, muted
- Aiyug mark: 24px height, spectrum colors
- "aiyug": Inter Medium (500), 13px

---

## 6. Family relationship

```
Aiyug (blue-purple spectrum arcs)
├── Doclate (emerald stacked pages + grid block)
│   └── Sign (future — own mark, own color)
└── Sign IDed (amber shield + lock ring + OTP underlines)
```

Visual DNA shared across all three products:
- Stroke-based (no fills, except small accent dots)
- Opacity cascade (100% → 65% → 45% → 25%)
- Round linecap / linejoin
- Inter typeface
- Geometric construction

Shape distinction:
- Aiyug: quarter-arc curves (expansion)
- Doclate: rectangles/pages (documents)
- Sign IDed: shield + circles + lines (protection + verification)

Color distinction:
- Aiyug: #4D8EFF → #7B6CF6 → #B06AE0 (blue-purple spectrum)
- Doclate: #34D399 dark / #059669 light (emerald)
- Sign IDed: #F59E0B dark / #B45309 light (amber)

---

## 7. Color reference (quick copy)

```css
/* Sign IDed — dark background */
--signided-primary: #F59E0B;

/* Sign IDed — light background */
--signided-primary-light: #B45309;

/* Aiyug parent (for badges) */
--aiyug-arc-outer: #4D8EFF;
--aiyug-arc-middle: #7B6CF6;
--aiyug-arc-inner: #B06AE0;
```

---

## 8. Don'ts

- Never fill the shield (stroke only)
- Never add a checkmark (the lock ring IS the verification signal)
- Never use Doclate's emerald or Aiyug's blue-purple for the shield
- Never rotate the shield (point always faces up)
- Never separate "Sign" and "IDed" onto different lines
- Never make "IDed" the same color as "Sign" in the color version
- Never add shadows, glow, or gradients
- Never use the old dark rounded-square container icon

---

## 9. Files

| File | Use |
|------|-----|
| signided-mark-color-dark.svg | Icon, amber, dark bg |
| signided-mark-mono-dark.svg | Icon, white, black bg |
| signided-mark-color-light.svg | Icon, amber, white bg |
| signided-lockup-color-dark.svg | Icon + text, dark bg |
| signided-lockup-mono-dark.svg | Icon + text, black bg |
| signided-lockup-color-light.svg | Icon + text, white bg |
| signided-by-aiyug-color-dark.svg | Endorsed lockup, dark bg |
| signided-by-aiyug-mono-dark.svg | Endorsed lockup, black bg |
| signided-by-aiyug-color-light.svg | Endorsed lockup, white bg |
