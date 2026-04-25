# SP Construction Company Website

A modern, fully-responsive construction company website built with React 18, Vite, and Tailwind CSS. Features rich animations, a 3D interactive scene, particle effects, and a contact form with email integration.

## 🚀 Tech Stack

- **React 18** + **Vite** — Fast build tooling with HMR
- **Tailwind CSS v3** — Utility-first styling with custom design tokens
- **Framer Motion** — Smooth animations and scroll transitions
- **@react-three/fiber + Three.js** — Interactive 3D construction scene
- **@tsparticles/react** — Particle effects in the hero section
- **react-type-animation** — Typewriter effect in the hero heading
- **react-countup** — Animated number counters for stats
- **yet-another-react-lightbox** — Masonry gallery with lightbox viewer
- **react-hook-form + zod** — Form validation with schema-based rules
- **emailjs-com** — Client-side email submission
- **@studio-freight/lenis** — Smooth scroll experience
- **react-hot-toast** — Toast notifications

## 🏗️ Sections

1. **Loading Screen** — Animated building skyline with progress bar
2. **Navbar** — Fixed with smooth scroll, dark/light toggle, responsive mobile menu
3. **Hero** — Parallax background, particles, typewriter animation, mouse parallax
4. **Stats** — Animated counters: 250+ projects, 15+ years, 52 experts, 98% satisfaction
5. **Projects** — Filterable portfolio grid with category tabs
6. **Gallery** — Masonry photo gallery with lightbox
7. **3D Assets** — Interactive Three.js construction scene + equipment grid
8. **Team** — Expandable team member cards with skills
9. **Services** — Hover-reveal service cards with pricing
10. **Testimonials** — Auto-rotating client review carousel
11. **Contact** — Form with validation + EmailJS + embedded map
12. **Footer** — Multi-column with social links

## 🎨 Design

- **Primary:** Orange `#FF6B35`
- **Background:** Steel Gray `#2D3748` / `#171923`
- **Font:** Inter (body) + Poppins (headings)
- Dark/light theme toggle with `localStorage` persistence

## ⚙️ Setup

```bash
npm install
```

### Environment Variables (optional — for contact form email)

Copy `.env.example` to `.env` and fill in your EmailJS credentials:

```bash
cp .env.example .env
```

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## 🛠️ Development

```bash
npm run dev
```

## 📦 Build

```bash
npm run build
```

## 🌐 Preview

```bash
npm run preview
```
