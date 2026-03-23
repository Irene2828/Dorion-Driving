# 🏎️ Dorion Driving Academy: A Design Engineering Prototype

**Status:** High-Fidelity Interactive Prototype (Vercel Deployment)

**Aesthetic:** Liquid Glass / Quiet Luxury

**Core Objective:** Transforming the administrative "friction" of driving school into a premium concierge experience.

---

## 💎 The Engineering Vision

This project demonstrates the power of **AI-Assisted Design Engineering**. By bypassing static Figma files and designing directly in the IDE, I've eliminated the "Translation Tax" and built a living system that prioritizes **physics, spatial logic, and technical accessibility**.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React (Vite) |
| **Styling** | Tailwind CSS (Custom Design System) |
| **Animation** | Framer Motion (Shared Element Transitions) |
| **Deployment** | Vercel |

---

## 🚀 Key Engineering Features

### 1. Spatial Continuity (The Magic Morph)

We utilize Framer Motion's `layoutId` to create **Shared Element Transitions**. When a user confirms a booking, the preview card doesn't disappear; it physically *morphs* into the final receipt. This provides the user with a continuous mental model of their action.

### 2. The "Liquid Glass" Design System

Every component follows a strict "Liquid Glass" formula:

- **Surfaces:** `bg-white/[0.04] backdrop-blur-2xl` with custom inner shadows for depth.
- **Geometry:** Strict Apple-standard Squircles (`rounded-[32px]`) for a native iOS feel.
- **Micro-Labels:** High-contrast Title Case for a soft, conversational tone.

### 3. Accessible Engineering (Fat-Finger Friendly)

While the UI looks minimal and "jewelry-like," the code is optimized for real-world mobile use:

- **Hit Areas:** Every interactive element (even small 20px icons) is wrapped in a minimum **48x48px** tap target to meet WCAG and Apple HIG standards.
- **Haptic Feedback:** Visual "shudders" and ripples provide non-verbal feedback during validation errors.

### 4. Market-Specific Realism

Unlike generic templates, the mock data is engineered for the **Canadian market**. The 4-month lesson spread tests the UI's ability to handle sparse data and long-term scheduling flows, proving the design's resilience in "slow-burn" service environments.

---

## 🔮 Future Roadmap

- **Telematics Integration:** Live GPS tracking for instructor vehicles.
- **Winter Driving Module:** Specialized study track for icy road conditions.
- **High-Latency Optimization:** Transitioning blurs to CSS-only solutions for low-end device compatibility.

---

## 🏗 Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

---

*Built with precision. Designed in code.*
