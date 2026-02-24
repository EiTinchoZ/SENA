<div align="center">

# ALERTA-ED

**Early Warning System for School Dropout Prevention**

[**Live Demo →**](https://sena-snowy.vercel.app/)
&nbsp;·&nbsp;
[Report an issue](https://github.com/EiTinchoZ/SENA/issues)

<br />

![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white&style=flat-square)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black&style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white&style=flat-square)
![Tailwind](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-EF0080?logo=framer&logoColor=white&style=flat-square)
![Status](https://img.shields.io/badge/status-ready%20to%20present-16a34a?style=flat-square)
![Offline](https://img.shields.io/badge/100%25-offline-0f766e?style=flat-square)

</div>

<br />

![Cover](assets/github/cover-sena-alertaed.png)

<br />

## What is it

An interactive dashboard built as an academic/professional pitch for **ALERTA-ED**: a proposed predictive system that detects school dropout risk before it becomes irreversible.

The experience emulates a real product: AI onboarding, data visualizations, business narrative, and an admin panel with local persistence.

---

## Features

| Feature | Description |
|---|---|
| **SENA Onboarding** | AI mascot identifies your role (teacher, principal, researcher, entrepreneur) and personalizes the view |
| **8 narrative sections** | Problem → Solution → Frictions → Personas → Scenarios → Impact → Reflection |
| **LIVE data** | Risk panel with real-time animation, updates every 4 seconds |
| **Admin panel** | Side drawer to edit all content, persisted in `localStorage` |
| **Light / dark mode** | Instant toggle without page reload |
| **Export as PNG** | Captures the full dashboard in high resolution |
| **Keyboard navigation** | Arrow keys `↑ ↓` and keys `1–8` to jump between sections |
| **100% offline** | No external APIs, no Google Fonts, works without internet |

---

## Stack

| Technology | Version | Purpose |
|---|---|---|
| [Vite](https://vitejs.dev/) | 5.x | Build tool & dev server |
| [React](https://react.dev/) | 18.x | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | 3.x | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | 11.x | Animations & transitions |
| [Lucide React](https://lucide.dev/) | latest | Icons |
| [html2canvas](https://html2canvas.hertzen.com/) | 1.x | PNG export (lazy-loaded) |

---

## Quick start

```bash
# 1. Clone the repository
git clone https://github.com/EiTinchoZ/SENA.git
cd SENA/dashboard

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
# → http://localhost:5173
```

**Production build:**

```bash
npm run build    # outputs to dashboard/dist/
npm run preview  # preview the build locally
```

> **About assets:** persona images and videos go in `dashboard/public/assets/`. Without them the app works with visual fallback states.

---

## Project structure

```
SENA/
├── dashboard/               # Vite + React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/       # AdminPanel & AdminToggle (editable drawer)
│   │   │   ├── layout/      # Navigation & ScrollProgress
│   │   │   ├── onboarding/  # SenaOnboarding, SenaAvatar
│   │   │   ├── sections/    # 8 dashboard sections
│   │   │   └── ui/          # RiskSignal, AlertTimeline, ExportButton…
│   │   ├── context/         # AdminContext (global state with localStorage)
│   │   ├── data/            # Static project data
│   │   ├── hooks/           # useScrollSpy, useKeyboardNavigation…
│   │   └── types/           # TypeScript types
│   └── public/assets/       # Images & videos (not included in repo)
├── design-system/           # Design system & tokens
└── assets/github/           # Repository branding
```

---

## Deployment

The project auto-deploys to **GitHub Pages** on every push to `main`.

To deploy manually on Vercel:

| Field | Value |
|---|---|
| Root Directory | `dashboard` |
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |

---

## License & author

Developed by **Martín Bundy** — [@EiTinchoZ](https://github.com/EiTinchoZ)

Published for academic demonstration. All rights reserved.
Use, copy, modification or distribution without the author's explicit written consent is not permitted.

See [LICENSE](LICENSE) · [NOTICE](NOTICE) · [SECURITY.md](SECURITY.md)

---

<div align="center">
  <sub>ALERTA-ED — Academic project / Digital Entrepreneurship · 2026</sub>
</div>
