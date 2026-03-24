# 🏛️ NUSALEXA Law Office - Prototype

[![Next.js](https://img.shields.io/badge/Next.js-13.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-Latest-6E56CF?style=flat-square&logo=radix-ui)](https://www.radix-ui.com/)

A modern, high-performance legal services prototype designed for **NUSALEXA Law Office**. This project showcases a "business-first" approach to legal counsel in Jakarta, focusing on SMEs, startups, and investors.

---

## ✨ Features

- **🌐 Multi-language Support (i18n)**: Fully supported interface with dynamic content switching between English and Indonesian.
- **⚡ Modern Tech Stack**: Built with Next.js 13.5 (App Router), TypeScript, and Tailwind CSS for speed and maintainability.
- **🎨 Premium Design**: Features a dark-themed, cinematic aesthetic with smooth animations, frosted glass effects, and a responsive layout.
- **📱 Mobile-First approach**: Optimized for all devices, from desktop to mobile.
- **🛠️ Service Catalog**: Comprehensive display of legal services categorized by Business Setup, Protection, and Dispute Resolution.
- **💬 Direct Integration**: One-tap WhatsApp and Email integration for instant client inquiries.
- **📋 Dynamic Contact Form**: Intelligent form with validation (Zod) and topic-based routing for lawyer consultations.
- **❓ Interactive FAQ**: Frequently asked questions section to address common client concerns upfront.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 13.5](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with `tailwindcss-animate`
- **Components**: [Radix UI](https://www.radix-ui.com/) primitives & [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State/Form**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Utilities**: `clsx`, `tailwind-merge`, `date-fns`

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/LawFirm-Prototype.git
   cd LawFirm-Prototype
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📁 Project Structure

```text
├── app/                  # Next.js App Router (pages & global styles)
├── components/           # Reusable UI components
│   ├── footer/           # Footer variations
│   ├── header/           # Header variations & navigation
│   ├── sections/         # Main landing page sections (Hero, Services, etc.)
│   └── ui/               # Base UI components (Radix/Shadcn)
├── context/              # React Context (Language/i18n)
├── lib/                  # Utility functions, copy, and link builders
├── hooks/                # Custom React hooks
└── public/               # Static assets
```

---

## 📄 Deployment

This project is configured for easy deployment on **Netlify** or **Vercel**.

- **Netlify**: Uses the `@netlify/plugin-nextjs` (configured in `package.json` and `netlify.toml`).
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

---

## ⚖️ Disclaimer

This website is a **prototype for demonstration purposes only**. All names (including **Raka Pratama, S.H., LL.M.** and **NUSALEXA Law Office**), testimonials, and claims are fictional and intended to showcase design and functionality. It does not create a lawyer-client relationship.

---

© 2024 NUSALEXA Law Office. All rights reserved.
