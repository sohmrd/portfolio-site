---
name: design-system
description: Design tokens, component patterns, and styling conventions for Sohm's portfolio. Load when building or modifying any visual component.
---

# Portfolio Design System

## Colors

### Dark Mode (Default)
```css
--background:     hsl(220, 15%, 6%);    /* Near-black */
--surface:        hsl(220, 15%, 10%);   /* Cards, elevated surfaces */
--surface-hover:  hsl(220, 15%, 14%);   /* Hover state */
--border:         hsl(220, 10%, 18%);   /* Subtle borders */
--text:           hsl(0, 0%, 95%);      /* Primary text */
--text-muted:     hsl(0, 0%, 60%);      /* Secondary text */
--text-subtle:    hsl(0, 0%, 40%);      /* Tertiary text */
--accent:         hsl(190, 80%, 55%);   /* Cyan - CTAs, links, highlights */
--accent-hover:   hsl(190, 80%, 65%);
--accent-muted:   hsl(190, 40%, 20%);   /* Accent backgrounds */
```

### Light Mode
```css
--background:     hsl(0, 0%, 98%);
--surface:        hsl(0, 0%, 100%);
--border:         hsl(0, 0%, 88%);
--text:           hsl(220, 15%, 10%);
--text-muted:     hsl(0, 0%, 45%);
--accent:         hsl(190, 80%, 40%);
```

## Typography

### Font Stack
- **Display (H1, project titles):** `'Satoshi', sans-serif` — weight 700, tracking -0.02em
- **Headings (H2-H4):** `'Satoshi', sans-serif` — weight 600
- **Body:** `'Inter', sans-serif` — weight 400/500, line-height 1.6
- **Code:** `'JetBrains Mono', monospace` — weight 400
- **Labels/Tags:** `'JetBrains Mono', monospace` — uppercase, tracking 0.1em, size 0.75rem

### Scale
```
text-xs:    0.75rem  (12px)  — tags, labels
text-sm:    0.875rem (14px)  — captions, meta
text-base:  1rem     (16px)  — body text
text-lg:    1.125rem (18px)  — lead paragraphs
text-xl:    1.25rem  (20px)  — section intros
text-2xl:   1.5rem   (24px)  — H3
text-3xl:   1.875rem (30px)  — H2
text-4xl:   2.25rem  (36px)  — H1 on mobile
text-5xl:   3rem     (48px)  — H1 on desktop
text-6xl:   3.75rem  (60px)  — Hero title
text-7xl:   4.5rem   (72px)  — Hero title on desktop
```

## Spacing

8px grid system:
```
space-1:  0.25rem  (4px)
space-2:  0.5rem   (8px)
space-3:  0.75rem  (12px)
space-4:  1rem     (16px)
space-6:  1.5rem   (24px)
space-8:  2rem     (32px)
space-12: 3rem     (48px)
space-16: 4rem     (64px)
space-20: 5rem     (80px)
space-24: 6rem     (96px)
space-32: 8rem     (128px)
```

### Section Spacing
- Between major sections: `py-32` (128px) desktop, `py-20` (80px) mobile
- Between subsections: `py-16` (64px)
- Between elements within a section: `space-y-8` (32px)

## Layout

- **Max content width:** 1200px (`max-w-screen-xl`)
- **Narrow content (text-heavy):** 720px (`max-w-3xl`)
- **Full-bleed sections:** edge-to-edge images, videos, 3D scenes
- **Asymmetric grids:** Not everything centered. Use offset layouts for visual interest.

### Responsive Breakpoints
```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

## Motion

### Framer Motion Defaults
```typescript
// Spring for interactive elements
const spring = { type: "spring", stiffness: 300, damping: 30 };

// Fade up for scroll reveals
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
};

// Stagger children
const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};
```

### GSAP ScrollTrigger Defaults
```typescript
ScrollTrigger.defaults({
  start: "top 80%",
  end: "bottom 20%",
  toggleActions: "play none none reverse",
});
```

### Reduced Motion
Always wrap animations:
```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```
If `prefers-reduced-motion`: disable all animations, show content immediately.

## Component Patterns

### Project Card (home page grid)
- Aspect ratio: 4:3 or 16:10
- Hover: scale 1.02, slight shadow lift, image zoom 1.05
- Overlay on hover: title + tags fade in
- Click: navigate to /work/[slug]

### Case Study Hero
- Full viewport height on desktop
- heroImage as background with overlay gradient
- If heroScene exists: R3F canvas with fallback to static image
- Title, role, timeline overlaid at bottom

### Section Component
- Left-aligned heading (Satoshi 600, text-2xl)
- Body text (Inter 400, text-base, max-w-3xl)
- Images: full-bleed or contained based on count
- Code blocks: dark surface background, JetBrains Mono, syntax highlighted

### Navigation
- Fixed top, transparent → solid on scroll
- Logo/name left, nav links right
- Mobile: hamburger → slide-in panel
- Active link: accent color underline

## React Three Fiber Patterns

### Scene Setup
```tsx
<Canvas
  camera={{ position: [0, 0, 5], fov: 45 }}
  dpr={[1, 2]}
  gl={{ antialias: true, alpha: true }}
>
  <Suspense fallback={null}>
    <Scene />
  </Suspense>
</Canvas>
```

### Performance Rules
- Always wrap in `<Suspense>`
- Use `useGLTF.preload()` for models
- Compress GLB with DRACO
- Lazy-load 3D scenes (only render when in viewport)
- Target 60fps, degrade gracefully on mobile
- Bake lighting into textures when possible
