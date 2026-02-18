# Portfolio Site Progress

## Tech Stack
- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4 (cascade layers)
- **Animation:** Framer Motion v12
- **Fonts:** Satoshi (display), Inter (body), JetBrains Mono (code)
- **Hosting:** Vercel (auto-deploy from GitHub main branch)
- **Live URL:** https://sohm-portfolio.vercel.app

## What's Been Built

### Core Site Structure
- [x] Root layout with fonts, navigation, footer (`src/app/layout.tsx`)
- [x] Home page with hero, 4 featured projects, about preview, contact CTA (`src/app/page.tsx`)
- [x] Work index page with all visible projects, category filter, sort (`src/app/work/page.tsx`, `work-content.tsx`)
- [x] Case study template with section renderer (`src/app/work/[slug]/content.tsx`)
- [x] Static generation for project pages (`src/app/work/[slug]/page.tsx`)
- [x] About page with editorial layout (`src/app/about/page.tsx`)
- [x] Project data schema and content (`src/content/projects.ts`)
- [x] "View all projects" CTA on home page linking to `/work`

### Design System (`src/app/globals.css`)
- [x] Dark mode default with CSS custom properties
- [x] Light mode via `@media (prefers-color-scheme: light)` (system preference, no toggle)
- [x] Film grain overlay, custom scrollbar, selection colors
- [x] All custom CSS in `@layer base {}` (Tailwind v4 cascade layer compatibility)
- [x] Custom utilities via `@utility` directive (`.divider`, `.line-reveal`)

### Navigation (`src/components/navigation.tsx`)
- [x] Fixed header, transparent to solid on scroll
- [x] Monospaced uppercase logo
- [x] Animated nav indicator with Framer Motion `layoutId`
- [x] Hamburger menu with animated X transform
- [x] Full-screen mobile menu with staggered entry
- [x] Social links in mobile menu (LinkedIn, GitHub)
- [x] "Work" link points to `/work` with prefix-based active state (highlights on `/work` and `/work/[slug]`)

### Interactive Elements
- [x] **Dot Grid** (`src/components/interactive/dot-grid.tsx`) - Canvas-based particle grid in hero
  - Mouse repulsion physics (spring constant 0.035, damping 0.82)
  - Connection lines between nearby dots
  - Accent-colored radial glow follows cursor
  - Listens on `window` so text elements don't block mouse events
  - `useReducedMotion` fallback renders static dots
  - `matchMedia` listener for theme color updates
- [x] **Tilt Card** (`src/components/interactive/tilt-card.tsx`) - 3D perspective cards in skills section
  - `useMotionValue` + `useSpring` for smooth tilt
  - Specular glare overlay follows cursor
  - Content has `translateZ(20px)` for depth
  - Reduced motion fallback renders flat

### Animation Components (`src/components/motion/fade-up.tsx`)
- [x] `FadeUp` - Scroll-triggered fade + translate
- [x] `TextReveal` - Slide-up text reveal using `clip-path: inset(0 0 -20% 0)` during animation (extends 20% below for descenders), removed entirely after animation completes. Combines y slide with quick opacity fade to mask initial peek.
- [x] `ScaleIn` - Scroll-triggered scale + fade
- [x] `StaggerContainer` / `StaggerItem` - Staggered children animations

### Work Index Page (`src/app/work/page.tsx`, `work-content.tsx`)
- [x] Hero with eyebrow, TextReveal heading, subtitle, animated divider
- [x] Category filter pills: All, Hardware, Software, ML/CV, Design (tag-based matching)
- [x] Sort toggle: Newest/Oldest (by timeline year)
- [x] AnimatePresence grid with staggered card animations
- [x] Empty state with "Clear filter" button
- [x] Equal-height project cards via flex layout (`h-full`, `flex-1`)

### Image Lightbox (`src/components/ui/lightbox.tsx`)
- [x] `LightboxProvider` wraps app in root layout
- [x] Click any case study image to view full size
- [x] Dark overlay with blur, Escape to close, click outside to close
- [x] Animated scale-in with Framer Motion

### Case Study Template (`src/app/work/[slug]/content.tsx`)
- [x] Full-viewport cinematic hero with background image
- [x] Tags, title (TextReveal), summary, meta row (role, duration, timeline, team)
- [x] Section types: standard, stack, code, failure
- [x] **Code sections with images** render side by side (code left, screenshot right)
- [x] Code + screenshot containers match height via `items-stretch` + `flex-1`
- [x] All images use `object-contain` (no cropping)
- [x] All images are clickable (open in lightbox)
- [x] Offset text layout alternates even/odd sections
- [x] Terminal-style code blocks with traffic light dots

### Footer (`src/components/footer.tsx`)
- [x] Minimal monospaced layout with gradient divider
- [x] Live clock (ET timezone), availability status, social links

### Layout & Spacing
- [x] Viewport-relative section spacing using `clamp(rem, vh, rem)` instead of fixed padding
- [x] About section: `min-h-svh` with flex centering (fills one screen)
- [x] Contact section: `min-h-[calc(100svh-10rem)]` so contact + footer together fill one screen
- [x] Mobile overflow fixed on code blocks with `min-w-0` on grid children

## DDV (Dynamic Drinking Vessel) Case Study

### Content Status: Complete
Seven sections in chronological order for a reader starting from zero:

1. **The Brief** - What Coca-Cola asked for, target demographic, constraints, competitor analysis (Cirkul)
2. **The Product** - Omni Water Bottle design, two parallel tracks (electronic + fully mechanical), hexagonal cap form factor, cartridge system
3. **The System** - Hardware/software stack with context for each component
4. **What Went Wrong** - Four real failures: gravity feed, seal failures, power delivery, BLE state sync
5. **The Firmware** - Arduino C++ pump control code
6. **The Companion App** - Swift BLE manager code + iOS app screenshot (side by side)
7. **The Result** - Expo demo to Coca-Cola, deliverables

### Role Reflected
Product Designer, Mechanical CAD, Firmware Lead, iOS Developer. Content reflects:
- Led product design (form factor, internal architecture)
- Co-CAD'd two parallel designs in SolidWorks with one ME
- Designed rolling pinch valve mechanism (3 tolerance iterations)
- Wrote all Arduino firmware
- Built iOS companion app in SwiftUI

### Images
| File | Content | Used In |
|------|---------|---------|
| `poster.jpg` | Expo poster (converted from PDF) | Thumbnail, hero background |
| `ideation.jpg` | Early fluid dynamics sketches | The Brief |
| `product.jpg` | Exploded CAD render of bottle assembly | The Product |
| `electronics.jpg` | PCB and wiring close-up | The System |
| `mechanical.jpg` | Pump/valve assembly CAD render | The System |
| `prototype.jpg` | Hands-on prototype assembly photo | What Went Wrong |
| `testing.jpg` | Test rig with bottle + app running | What Went Wrong |
| `app.png` | iOS app screenshot (Control screen) | The Companion App |
| `team.jpg` | Team at Coca-Cola truck | The Result |
| `hero.jpg` | Early proof-of-concept device | Unused (replaced by poster) |
| `process.jpg` | Design review meeting | Unused (replaced by prototype photos) |

## Other Projects

### Populated (visible: true)
- **LiDAR Garment Measurement** - Full case study with sections, code snippets, hero image
- **Computer Vision Fashion Detection** - Full case study with YOLO pipeline details
- **AliveCor Product Development** - Full case study with workspace photo hero

### Placeholder (visible: false)
- **HP Product Design Internship** - Needs content from presentation
- **AI Square** - Needs all assets from external sources
- Other Tier 2/3 projects awaiting processing

## Key Bug Fixes
- **Tailwind v4 spacing breakage:** Un-layered CSS `* { margin: 0; padding: 0; }` overrode Tailwind's layered utilities. Fixed by wrapping all custom CSS in `@layer base {}`.
- **Framer Motion ease type error:** `number[]` not assignable to `Easing`. Fixed with `as const`.
- **Dot grid dead zones over text:** `mousemove` listener on parent div was blocked by text elements. Fixed by listening on `window` with bounds checking.
- **TextReveal clipping descenders:** `overflow-hidden` clips descenders on large display text with tight line-height. Padding fix (`pb-[0.15em]`) failed because `em` is relative to wrapper font-size (16px), not the child heading (up to 112px). Fixed by replacing `overflow-hidden` with `clip-path: inset(0 0 -20% 0)` which extends the visible area 20% below for descenders. Clip-path is removed entirely after animation completes. Quick opacity fade (0.3s) masks the slight text peek at animation start.
- **Code/screenshot height mismatch:** `items-start` on grid let columns be different heights. Fixed with `items-stretch` + `flex-1`.

## Remaining Work
- [ ] Process LiDAR Room Scanner project (need app screenshots)
- [ ] Process CV-Clothing project (need inference results, training curves)
- [ ] Process AliveCor project (need all assets from external sources)
- [ ] Process Tier 2 projects (Interactive Products, Perception & Robotics, etc.)
- [ ] Add real images for placeholder project thumbnails
- [ ] Consider adding React Three Fiber scenes for hero or project pages
