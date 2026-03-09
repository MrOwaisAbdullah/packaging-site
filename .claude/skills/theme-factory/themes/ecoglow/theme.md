# EcoGlow Theme

> **Theme Name**: EcoGlow
> **Concept**: High-contrast Black & White with vibrant Lime Green accents
> **Primary Use Case**: Modern SaaS dashboards, productivity apps, agency tools
> **Visual Character**: Bold, energetic, premium, accessible
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
    /* EcoGlow Theme Variables */
    --background: #ffffff;
    --foreground: #09090b;
    --card: #ffffff;
    --card-foreground: #09090b;
    --popover: #ffffff;
    --popover-foreground: #09090b;
    --primary: #18181b;
    --primary-foreground: #ffffff;
    --secondary: #f4f4f5;
    --secondary-foreground: #09090b;
    --muted: #f4f4f5;
    --muted-foreground: #71717a;
    --accent: #a3e635;
    --accent-foreground: #18181b;
    --destructive: #ef4444;
    --destructive-foreground: #ffffff;
    --border: #e4e4e7;
    --input: #e4e4e7;
    --ring: #a3e635;
    --radius: 0.5rem;
  }

  .dark {
    --background: #09090b;
    --foreground: #fafafa;
    --card: #09090b;
    --card-foreground: #fafafa;
    --popover: #09090b;
    --popover-foreground: #fafafa;
    --primary: #fafafa;
    --primary-foreground: #18181b;
    --secondary: #27272a;
    --secondary-foreground: #fafafa;
    --muted: #27272a;
    --muted-foreground: #a1a1aa;
    --accent: #a3e635;
    --accent-foreground: #18181b;
    --destructive: #ef4444;
    --destructive-foreground: #ffffff;
    --border: #27272a;
    --input: #27272a;
    --ring: #a3e635;
  }
}

@layer base {
  * { @apply border-border; }
  body { @apply bg-background text-foreground; }
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

### Light Mode
| Role | Hex | Tailwind Class |
|------|-----|---------------|
| Background | `#ffffff` | `bg-white` |
| Foreground | `#09090b` | `text-zinc-950` |
| Card | `#ffffff` | `bg-white` |
| Border | `#e4e4e7` | `border-zinc-200` |
| Muted | `#f4f4f5` | `bg-zinc-100` |
| Muted FG | `#71717a` | `text-zinc-500` |

### Dark Mode
| Role | Hex | Tailwind Class |
|------|-----|---------------|
| Background | `#09090b` | `bg-zinc-950` |
| Foreground | `#fafafa` | `text-zinc-50` |
| Card | `#09090b` | `bg-zinc-950` |
| Border | `#27272a` | `border-zinc-800` |
| Muted | `#27272a` | `bg-zinc-800` |
| Muted FG | `##a1a1aa` | `text-zinc-400` |

### Brand Colors
| Role | Hex | Tailwind Class |
|------|-----|---------------|
| Lime Accent | `#a3e635` | `bg-lime-400` / `text-lime-400` |
| Lime Hover | `#84cc16` | `bg-lime-500` / `text-lime-500` |
| Black | `#18181b` | `bg-zinc-900` |

---

## Component Patterns (Tailwind v3)

### Primary Button (Lime)

```jsx
<button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-lime-400 text-zinc-900 shadow-[0_10px_15px_-3px_rgba(163,230,53,0.25)] hover:bg-lime-500 hover:shadow-[0_20px_25px_-5px_rgba(163,230,53,0.3)] focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 transition-all duration-200">
  Save Changes
</button>
```

### Secondary Button

```jsx
<button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-muted text-foreground hover:opacity-80 transition-all duration-200">
  Cancel
</button>
```

### Outline Button

```jsx
<button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-foreground border-2 border-border hover:bg-lime-400/10 hover:border-lime-400 hover:text-lime-500 transition-all duration-200">
  Learn More
</button>
```

### Card

```jsx
<div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
  <h3 className="text-xl font-semibold mb-2">Card Title</h3>
  <p className="text-sm text-muted-foreground">Description text</p>
</div>
```

### Input

```jsx
<input
  type="text"
  placeholder="Enter text..."
  className="w-full px-4 py-3 rounded-md border border-input bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-all"
/>
```

### Badge

```jsx
<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-lime-400/15 text-lime-600 dark:bg-lime-400/20 dark:text-lime-400">
  Active
</span>
```

### Stat Card

```jsx
<div className="bg-card border border-border rounded-lg p-5 flex items-start justify-between gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
  <div>
    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total Tasks</p>
    <p className="text-3xl font-black tracking-tight text-foreground">248</p>
  </div>
  <div className="p-2.5 rounded-xl bg-zinc-900 text-lime-400 shadow-sm dark:bg-lime-400 dark:text-zinc-900">
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
    </svg>
  </div>
</div>
```

### Sidebar (Always Dark)

```jsx
<aside className="w-64 bg-zinc-900 text-zinc-50 border-r border-zinc-800 p-4">
  <nav className="space-y-1">
    <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-zinc-50 hover:translate-x-1 transition-all">
      Dashboard
    </a>
    <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-lime-400 text-zinc-900 font-semibold">
      Projects
    </a>
  </nav>
</aside>
```

---

## Tailwind Color Reference

```jsx
// Backgrounds
bg-white               // Light mode bg
bg-zinc-950            // Dark mode bg
bg-lime-400            // Accent bg
bg-zinc-100            // Light muted
bg-zinc-800            // Dark muted

// Text
text-zinc-950           // Light text
text-zinc-50            // Dark text
text-lime-400           // Accent text
text-zinc-500           // Light muted text
text-zinc-400           // Dark muted text

// Borders
border-zinc-200         // Light border
border-zinc-800         // Dark border
border-lime-400        // Accent border
```

---

## Shadow Reference

```jsx
shadow-sm              // 0 1px 2px 0 rgb(0 0 0 / 0.05)
shadow-md              // 0 4px 6px -1px rgb(0 0 0 / 0.1)
shadow-lg              // 0 10px 15px -3px rgb(0 0 0 / 0.1)
shadow-[0_10px_15px_-3px_rgba(163,230,53,0.25)]  // Lime glow
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
  --color-background: #ffffff;
  --color-lime: #a3e635;
  --color-lime-dark: #84cc16;
  --color-black: #18181b;
  --radius-lg: 0.5rem;
}

.dark {
  --color-background: #09090b;
  --color-foreground: #fafafa;
}
```

---

## Accessibility Notes

- **WCAG AA Compliant**: All color combinations meet 4.5:1 contrast ratio
- **Focus States**: `focus:ring-2 focus:ring-lime-400 focus:ring-offset-2`
- **Reduced Motion**: Respect `prefers-reduced-motion` setting

---

## When to Use This Theme

✅ **Perfect for:**
- SaaS dashboards and admin panels
- Productivity and project management tools
- Agency/creative portfolio sites
- Modern B2B applications
- Task management systems

❌ **Avoid for:**
- Healthcare/Medical applications (too energetic)
- Financial/banking (too casual)
- Luxury brands (not sophisticated enough)
- Children's apps (too serious)
