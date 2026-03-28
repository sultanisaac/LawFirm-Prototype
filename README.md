# 🏛️ NUSALEXA Law Office — Prototype

[![Next.js](https://img.shields.io/badge/Next.js-13.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Status](https://img.shields.io/badge/Status-Prototype_Active-emerald?style=for-the-badge)](https://github.com/sultanisaac26/LawFirm-Prototype)

A high-performance, cinematic digital gateway for **NUSALEXA Law Office**. This prototype showcases a "Business-First" approach to legal counsel in Jakarta, specifically designed for SMEs, startups, and international investors.

---

## 💎 The Vision: Business-First Legal Counsel
In a landscape often bogged down by legal jargon and slow response times, **NUSALEXA** prioritizes speed, clarity, and results. The prototype implements a "Dark Performance Lab" aesthetic — a deep slate and gold palette that communicates authority and modern efficiency.

### 🌟 Key Pillars
- **🌐 Intelligent i18n**: A custom dual-language engine (English & Indonesian) built into the React Context, allowing for seamless content switching.
- **⚡ Performance-Centric UI**: Built with Next.js 13.5 (App Router) and Tailwind CSS, achieving near-instant load times.
- **📱 Mobile-First Experience**: A responsive architecture that treats mobile users as first-class citizens, featuring optimized navigation and touch-friendly booking flows.
- **🎨 Premium Aesthetics**: Framer Motion animations, frosted glass effects (Glassmorphism), and a business-focused dark theme.

---

## 📅 Premium Booking Workflow
The core of the prototype is the **Strategic Session Booking Engine**. Unlike standard integrations, this is a custom-built multi-step experience.

### The Handover Flow
1. **Qualification**: A 2-page modal captures critical data: *Full Name, Email, Legal Area, and Entity Name*.
2. **Conflict Check**: Initial capture includes objective details for preliminary internal assessment.
3. **Calendly Handover**: Data is seamlessly injected into the **Calendly Advanced JS Embed** via the custom `window.Calendly` global, prefilling the final scheduling screen for a zero-friction user experience.

---

## 🛠️ Tech Stack & Architecture

### Core Infrastructure
- **Framework**: [Next.js 13.5](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + `tailwindcss-animate`
- **Components**: [Radix UI](https://www.radix-ui.com/) Primitives & [Shadcn UI](https://ui.shadcn.com/)
- **Animation**: [Lucide React](https://lucide.dev/) & CSS Transitions

### Logic & State
- **Form Management**: [React Hook Form](https://react-hook-form.com/)
- **Schema Validation**: [Zod](https://zod.dev/)
- **Scheduling**: [Calendly JS API](https://calendly.com/developer/)
- **Typing**: Strict [TypeScript 5.2](https://www.typescriptlang.org/)

---

## 📂 Project Structure
```text
├── app/                  # Next.js App Router (Pages, Layouts, Global Styles)
├── components/           # UI Components
│   ├── header/           # Mobile-first navigation & Brand headers
│   ├── sections/         # Feature blocks: Hero, Services, HowItWorks, FAQ
│   └── ui/               # Base Shadcn/Radix primitives
├── implementation/       # Feature blueprints (e.g., CALENDLY_INTEGRATION_PLAN.md)
├── lib/                  # i18n Copy (copy.ts), Utils, & Calendly Config
├── types/                # Global TS definitions & API declarations
├── public/               # Optimized SVGs, Logos, & Static Assets
└── .env                  # Environment branding & API tokens
```

---

## 🚀 Getting Started

### 1. Requirements
- Node.js 18.17+
- npm / yarn / pnpm

### 2. Installation
```bash
git clone https://github.com/sultanisaac26/LawFirm-Prototype.git
cd LawFirm-Prototype
npm install
```

### 3. Environment Setup
Create a `.env` file in the root based on the following template:
```bash
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-event-link
NEXT_PUBLIC_BRAND_COLOR=dfa129  # Primary Gold
NEXT_PUBLIC_BG_COLOR=0b0e14     # Deep Slate
```

### 4. Run Development
```bash
npm run dev
```

---

## 🛤️ Roadmap
- [x] **Phase 1**: High-fidelity UI & i18n Engine (Jakarta/Global focus).
- [x] **Phase 2**: Custom Calendly Integration with Data Handover.

---

## ⚖️ Disclaimer
This website is a **prototype for demonstration purposes only**. All names, testimonials, and legal claims are fictional and intended to showcase design and technical functionality. This site does not create a lawyer-client relationship.

© 2024 NUSALEXA Law Office. Designed for Modern Business.
