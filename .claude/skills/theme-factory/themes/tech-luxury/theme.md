# Tech Luxury Theme

> **Theme Name**: Tech Luxury
> **Concept**: Sophisticated dark theme with Electric Indigo & Vibrant Cyan accents
> **Primary Use Case**: Developer portfolios, AI/ML showcases, SaaS landing pages, tech presentations
> **Visual Character**: Premium, modern, immersive, cutting-edge
> **Tailwind Version**: v3.4.14 (compatible with your current setup)

---

## Quick Start (Tailwind v3.4.14)

This theme matches your existing project structure. Add these CSS variables to your `globals.css`:

### Step 1: Update globals.css

```css
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Tech Luxury Dark Theme Variables */
    --background: #05060A;        /* Deep Onyx */
    --foreground: #ffffff;         /* White */
    --card: #0E101A;                /* Shadow Card */
    --card-foreground: #ffffff;
    --popover: #0E101A;
    --popover-foreground: #ffffff;
    --primary: #6366f1;             /* Electric Indigo */
    --primary-foreground: #ffffff;
    --secondary: #1f2937;
    --secondary-foreground: #ffffff;
    --muted: #1e2538;               /* Twilight Muted */
    --muted-foreground: #a1a1aa;
    --accent: #38bdf8;              /* Vibrant Cyan */
    --accent-foreground: #ffffff;
    --destructive: #ef4444;
    --destructive-foreground: #ffffff;
    --border: rgba(99, 102, 241, 0.3);  /* Indigo Glow */
    --input: #1e2538;
    --ring: #38bdf8;                /* Cyan ring */
    --radius: 0.5rem;
    --heading: #ffffff;
    --text: #ffffff;
    --text2: #d1d5db;
  }
}

@layer base {
  * { @apply border-border; }
  body {
    @apply bg-background text-foreground;
    font-family: var(--font-poppins);
    /* Add grain texture for premium feel */
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
  }
}
```

### Step 2: Update tailwind.config.ts

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        heading: ["var(--font-montserrat)"],
        montserrat: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        heading: "var(--heading)",
        text: "var(--text)",
        text2: "var(--text2)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

---

## Color Palette

### Brand Core (Tailwind equivalents)
| Role | Hex | Tailwind Class | Usage |
|------|-----|---------------|-------|
| **Electric Indigo** | `#6366f1` | `bg-indigo-500` / `text-indigo-500` | Primary brand, gradients |
| **Vibrant Cyan** | `#38bdf8` | `bg-sky-400` / `text-sky-400` | Highlights, links |
| **Deep Onyx** | `#05060A` | `bg-[#05060A]` | Background |
| **Shadow Card** | `#0E101A` | `bg-[#0E101A]` | Elevated surfaces |
| **Twilight Muted** | `#1e2538` | `bg-[#1e2538]` | Secondary backgrounds |

### Text Colors
```jsx
text-white               // Primary text
text-[#d1d5db]          // Secondary text
text-[#a1a1aa]          // Muted text
```

---

## Component Patterns (Tailwind v3)

### Primary Button (Gradient)

```jsx
<button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-gradient-to-r from-primary to-accent text-white shadow-xl shadow-black/20 hover:from-blue-950 hover:to-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background transition-all">
  Save Changes
</button>
```

### Secondary Button

```jsx
<button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-card text-white border border-border hover:border-white/30 hover:bg-white/5 transition-all">
  Cancel
</button>
```

### Card with Glow

```jsx
<div className="bg-card border border-border rounded-lg p-6 shadow-xl shadow-black/50 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-0.5 transition-all duration-300">
  <h3 className="text-xl font-semibold mb-2">Card Title</h3>
  <p className="text-sm text-[#d1d5db]">Card description</p>
</div>
```

### Glass Card (Backdrop Blur)

```jsx
<div className="bg-card/80 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-xl">
  <h3 className="text-xl font-semibold">Glass Card</h3>
</div>
```

### Input with Focus Ring

```jsx
<input
  type="text"
  placeholder="Enter text..."
  className="w-full px-4 py-3 rounded border border-border bg-card text-white placeholder:text-[#a1a1aa] focus:outline-none focus:ring-1 focus:ring-accent transition-all"
/>
```

### Badge

```jsx
<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary">
  Active
</span>

<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent/20 text-accent">
  New
</span>
```

### Live Status Indicator

```jsx
<span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-card border border-white/10 text-[#d1d5db]">
  <span className="relative flex h-2.5 w-2.5">
    <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping"></span>
    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
  </span>
  Available for Projects
</span>
```

### Stat Card

```jsx
<div className="bg-card border border-border rounded-lg p-5 flex items-start justify-between gap-4 shadow-xl shadow-black/50 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-0.5 transition-all duration-300">
  <div>
    <p className="text-xs font-bold uppercase tracking-wider text-[#a1a1aa]">Total Users</p>
    <p className="text-3xl font-black tracking-tight text-white font-montserrat">24,847</p>
  </div>
  <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/20">
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
    </svg>
  </div>
</div>
```

### Gradient Text (Metallic Effect)

```jsx
<h1 className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 font-montserrat font-bold">
  Nasir Siddiqui
</h1>
```

---

## Special Effects (Tailwind)

### Ambient Glow Blobs

```jsx
<div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[150px] opacity-20 pointer-events-none z-[-1]" />
<div className="absolute top-[40%] right-[-10%] w-[30%] h-[50%] bg-accent rounded-full blur-[150px] opacity-10 pointer-events-none z-[-1]" />
```

### Grain Texture (add to body)

```css
background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
```

### Mouse-Tracking Spotlight (with Framer Motion)

```jsx
import { useMotionValue, useMotionTemplate, motion } from "framer-motion";

export function Spotlight({ children }: { children: React.ReactNode }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div className="relative group" onMouseMove={handleMouseMove}>
      <motion.div
        className="pointer-events-none bg-dot-thick-indigo-500 absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          WebkitMaskImage: useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`,
          maskImage: useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`,
        }}
      />
      {children}
    </div>
  );
}
```

---

## Visual Effects Reference

| Effect | Tailwind Classes |
|--------|-----------------|
| **Deep Onyx Background** | `bg-[#05060A]` |
| **Shadow Card** | `bg-[#0E101A]` |
| **Indigo Glow Border** | `border-[rgba(99,102,241,0.3)]` |
| **Black Shadow** | `shadow-xl shadow-black/50` |
| **Indigo Shadow** | `shadow-indigo-500/30` |
| **Glow on Hover** | `hover:shadow-[0_0_20px_rgba(99,102,241,0.5)]` |
| **Backdrop Blur** | `backdrop-blur-md` |
| **Glass Background** | `bg-card/80` |
| **Gradient Button** | `bg-gradient-to-r from-primary to-accent` |

---

## Typography Classes

```jsx
// Headings with Montserrat
<h1 className="font-montserrat font-bold text-5xl">Heading</h1>
<h2 className="font-montserrat font-semibold text-3xl">Subheading</h2>

// Body text with Poppins
<p className="font-poppins text-base leading-relaxed">Body text</p>
<p className="font-poppins text-sm text-[#d1d5db]">Secondary text</p>

// Heavy numbers (for stats)
<span className="font-montserrat font-black text-4xl tracking-tight">24,847</span>
```

---

## Tailwind v4 Migration Notes (Future Reference)

When you're ready to upgrade to Tailwind v4, here are the key changes:

### Current v3 → v4 Changes

| v3 | v4 |
|-----|-----|
| `@tailwind base/components/utilities` | `@import "tailwindcss"` |
| `darkMode: ["class"]` in config | `@variant dark (&:where(.dark, .dark *))` in CSS |
| Colors via config | `--color-*` in `@theme` directive |
| `bg-opacity-50` | `bg-black/50` |
| `ring` = 3px | `ring` = 1px |

### v4 Configuration Example

```css
@import "tailwindcss";

@variant dark (&:where(.dark, .dark *));

@theme {
  --color-background: #05060A;
  --color-primary: #6366f1;
  --color-accent: #38bdf8;
  --radius-lg: 0.5rem;
}

.dark {
  --color-background: #05060A;
  --color-foreground: #ffffff;
}
```

---

## Accessibility Notes

- **WCAG AA Compliant**: White text on dark backgrounds = high contrast
- **Focus States**: `focus:ring-1 focus:ring-accent focus:ring-offset-2`
- **Reduced Motion**: Add `prefers-reduced-motion: reduce` consideration

---

## When to Use This Theme

✅ **Perfect for:**
- Developer portfolios
- AI/ML project showcases
- SaaS product landing pages
- Startup pitch decks
- Technology conference presentations

❌ **Avoid for:**
- Content-heavy blogs
- E-commerce sites
- Healthcare applications
- Corporate/law websites
