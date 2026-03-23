---
description: DORION Design System & UI Rules - Liquid Glass aesthetic reference
---

# DORION: Design System & UI Rules
**CRITICAL:** Strictly adhere to these rules for all UI/UX generation. Never default to standard Tailwind components.

## 1. Aesthetic: "Liquid Glass"
* **Backgrounds:** Dark void `#080F0E`. No solid grays or blacks for cards.
* **Cards & Modals:** Liquid Glass formula: `bg-white/[0.04] backdrop-blur-2xl border border-white/[0.12]`.
* **Shadows:** Deep, spatial: `shadow-[0_16px_40px_rgba(0,0,0,0.5)]` for floating elements.
* **Geometry:** Heavy Apple-style squircles. Master containers `rounded-[32px]`. Inner badges `rounded-[16px]`.

## 2. Typography: "Premium Editorial"
* **Primary Font:** `font-sans` for data. `font-serif` (Playfair Display) for headers and numbers.
* **Title Case strictly:** Never `uppercase` for buttons or nav labels. Only `uppercase` for microscopic semantic badges (e.g., `text-[9px] tracking-widest`).
* **Contrast (WCAG):** Muted text must be `text-white/60` or brand teal `#A3B8B6`. Never `text-white/40` or lower. Min clickable text size `11px`.
* **Glanceable Headers:** For success screens or critical modals, identify the single most important action/state word (e.g., "cleared", "all set", "change") and highlight it using `<span className="text-[#00E5CC]">`. This enables rapid task verification for the user.

## 3. Brand Colors
* **Primary (Action):** Cyan `#00E5CC`.
* **Gradient:** `from-[#00E5CC] to-[#00B5A0]`.
* **Secondary (Neutral/Move):** Silver Grey `#CFD8D7`.
* **Destructive:** Cyan `#00E5CC` (No red for cancellations — they are successful actions, not errors).

## 4. Components & Micro-UI
* **Primary Buttons:** Liquid Capsules: `rounded-full bg-gradient-to-r from-[#00E5CC] to-[#00B5A0] text-[#080F0E] font-bold tracking-[0.1em] shadow-[0_8px_20px_rgba(0,229,204,0.3)]`.
* **Icons (Apple SF Style):** ALL SVGs: `strokeWidth="1.5"`, `strokeLinecap="round"`, `fill="none"`. No filled shapes, cheap emojis, or colored status dots.
* **Voice & Tone:** Conversational, premium concierge. No robotic commands (e.g., "Let's get you on the road." not "SELECT SESSION").
* **Date Representation:** Never use flat text strings for primary dates (e.g., "May 26, 2026"). Dates must always be enclosed in a Glass Calendar Badge (stacked month/day inside a `rounded-[12px]` or `rounded-[16px]` frosted container with `bg-white/[0.04] border border-white/[0.08] shadow-[inset_0_1px_4px_rgba(255,255,255,0.05)]`). Receipts must structurally align across the entire app.
