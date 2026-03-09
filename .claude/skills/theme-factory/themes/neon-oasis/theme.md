# Neon Oasis Theme

> **Theme Name**: Neon Oasis
> **Concept**: High-tech, premium luxury dark mode with vibrant Neon Yellow & Mint Green accents
> **Primary Use Case**: Developer portfolios, modern AI agencies, creative studios, tech landing pages
> **Visual Character**: Immersive, luxurious, vibrant, high-contrast, state-of-the-art
> **Tailwind Version**: v3.4.14 (compatible with your current setup)

---

## Quick Start (Tailwind v3.4.14)

### Step 1: Add CSS Variables to globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Light Mode - Neon Oasis */
    --background: #FAFAFA;
    --foreground: #111827;
    --card: #ffffff;
    --card-foreground: #111827;
    --popover: #ffffff;
    --popover-foreground: #111827;
    --primary: #FECD1A;
    --primary-foreground: #000000;
    --secondary: #f4f4f5;
    --secondary-foreground: #111827;
    --muted: #f4f4f5;
    --muted-foreground: #4b5563;
    --accent: #64F4AB;
    --accent-foreground: #000000;
    --destructive: #ef4444;
    --destructive-foreground: #ffffff;
    --border: rgba(0, 0, 0, 0.05);
    --input: #e5e7eb;
    --ring: #FECD1A;
    --radius: 0.5rem;
    --heading: #111827;
    --text: #111827;
    --text2: #4b5563;
    --theme-gradient: linear-gradient(135deg, #FECD1A 0%, #fde047 30%, #86efac 80%, #64F4AB 100%);
  }

  .dark {
    /* Dark Mode - Tech Luxury Neon Edition */
    --background: #0A0A0A;
    --foreground: #ffffff;
    --card: #141414;
    --card-foreground: #ffffff;
    --popover: #141414;
    --popover-foreground: #ffffff;
    --primary: #FECD1A;
    --primary-foreground: #000000;
    --secondary: #1A1A1A;
    --secondary-foreground: #ffffff;
    --muted: #1A1A1A;
    --muted-foreground: #9ca3af;
    --accent: #64F4AB;
    --accent-foreground: #000000;
    --destructive: #ef4444;
    --destructive-foreground: #ffffff;
    --border: rgba(255, 255, 255, 0.1);
    --input: #1A1A1A;
    --ring: #FECD1A;
    --heading: #ffffff;
    --text: #ffffff;
    --text2: #d1d5db;
    --theme-gradient: linear-gradient(135deg, #FECD1A 0%, #fde047 30%, #86efac 80%, #64F4AB 100%);
  }
}

@layer utilities {
  .bg-theme-gradient {
    background-image: var(--theme-gradient);
  }
  .text-theme-gradient {
    background-image: var(--theme-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

@layer base {
  * { @apply border-border; }
  body { 
    @apply bg-background text-foreground; 
    /* Premium noise texture */
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.015'/%3E%3C/svg%3E");
    background-attachment: fixed;
  }
  .dark body {
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

## Color Palette (Tailwind Classes)

### Dark Mode (Primary Appearance)
| Role | Hex | Tailwind Class |
|------|-----|---------------|
| Deep Onyx | `#0A0A0A` | `bg-[#0A0A0A]` |
| Card Gray | `#141414` | `bg-[#141414]` |
| Neon Yellow | `#FECD1A` | `bg-primary` / `text-primary` |
| Mint Green | `#64F4AB` | `bg-accent` / `text-accent` |
| Text White | `#ffffff` | `text-white` |
| Subtext Gray| `#9ca3af` | `text-muted-foreground` |

### Premium Gradient
| Value | Class Application |
|-------|-------------------|
| `linear-gradient(135deg, #FECD1A 0%, #fde047 30%, #86efac 80%, #64F4AB 100%)` | `bg-theme-gradient` / `text-theme-gradient` |

---

## Component Patterns (Tailwind v3)

### Premium Hover Button

```jsx
<button className="relative px-6 py-3 font-semibold text-black bg-theme-gradient rounded-full shadow-[0_0_15px_rgba(254,205,26,0.3)] hover:shadow-[0_0_25px_rgba(254,205,26,0.5)] transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background">
  Contact Me
</button>
```

### Secondary Hover Outline Button

```jsx
<button className="relative px-6 py-3 font-medium text-foreground bg-secondary/50 hover:bg-secondary border border-border/50 hover:border-primary/50 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20">
  View Projects
</button>
```

### Solid Glowing Trigger Button

```jsx
<button className="w-14 h-14 rounded-full flex items-center justify-center bg-primary text-black hover:bg-primary/90 shadow-[0_4px_24px_rgba(254,205,26,0.3)] hover:scale-110 transition-all duration-300 ring-1 ring-black/10">
  <Icon />
</button>
```

### Glass / Frost Card

```jsx
<div className="bg-card/80 backdrop-blur-xl border-t border-b border-border/50 p-6 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
  <h3 className="font-montserrat font-bold text-lg mb-2 text-foreground">Glass Title</h3>
  <p className="text-muted-foreground font-poppins">Smooth frosted card effect.</p>
</div>
```

### Glowing Tooltip Item

```jsx
<div className="shadow-xl opacity-80 hover:opacity-100 rounded-lg bg-secondary border border-border p-3 text-2xl text-muted-foreground hover:text-primary transition-all duration-300">
  <Icon />
</div>
```

### Pill Input Field

```jsx
<input
  type="text"
  placeholder="Type something..."
  className="w-full bg-secondary/50 focus:bg-secondary border border-border/50 focus:border-primary/50 rounded-full px-5 py-3 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
/>
```

### Pulsing Live Status Indicator

```jsx
<span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground border border-border bg-card shadow-xl backdrop-blur-md">
  <span className="relative flex h-2.5 w-2.5">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
  </span>
  System Online
</span>
```

---

## Special Effects (Tailwind)

### Ambient Glow Overlays
Place these in an `overflow-hidden` container behind your relative content to create massive, subtle neon lights.

```jsx
{/* Primary Yellow Ambient Glow */}
<div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[150px] opacity-20 pointer-events-none z-[-1]" />

{/* Accent Green Ambient Glow */}
<div className="absolute top-[40%] right-[-10%] w-[30%] h-[50%] bg-accent rounded-full blur-[150px] opacity-10 pointer-events-none z-[-1]" />
```

### Premium Gradient Overlay inside Cards

```jsx
<div className="relative overflow-hidden bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl">
  {/* Subtle gradient wash over the entire card */}
  <div className="absolute inset-0 bg-theme-gradient opacity-[0.03] pointer-events-none" />
  
  <div className="relative z-10 p-4">
    Content goes here
  </div>
</div>
```

---

## Formatting / Typography

```jsx
// Main Headings (Montserrat)
<h1 className="font-montserrat font-bold text-5xl tracking-tight text-heading">Main Heading</h1>

// Subheadings / Highlighted Sections
<h2 className="text-3xl font-medium title-font text-foreground">Section Title</h2>
<h3 className="text-base text-accent font-medium tracking-widest uppercase">Subtitle</h3>

// Body Text (Poppins)
<p className="font-poppins leading-relaxed text-muted-foreground">Standard paragraph text.</p>

// Links
<a className="text-foreground hover:text-primary transition-colors font-medium">Link text</a>
```

---

## When to Use This Theme

✅ **Perfect for:**
- AI Developer Portfolios
- Luxury / Premium web applications
- High-end digital agencies
- Futuristic SaaS products
- Showcase landing pages requiring strong focal points

❌ **Avoid for:**
- Traditional corporate internal tools (too flashy)
- Highly dense data dashboards (gradients may become distracting)
- E-commerce products attempting an organic/natural feel
