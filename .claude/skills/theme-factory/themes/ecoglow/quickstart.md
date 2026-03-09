# EcoGlow Theme - Quick Start Guide (Tailwind)

The **EcoGlow** theme is optimized for Tailwind CSS. High-contrast Black & White design with vibrant Lime Green accents.

---

## Installation (Tailwind CSS)

### Step 1: Add CSS Variables

Add to your `globals.css` or global stylesheet:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Brand Core */
    --accent: #a3e635;
    --accent-hover: #84cc16;
    --background: #ffffff;
    --foreground: #09090b;
    --card: #ffffff;
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

### Step 2: Update Tailwind Config

Update `tailwind.config.ts`:

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
          hover: "var(--accent-hover)",
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

## Tailwind Component Examples

### Primary Button (Lime)

```jsx
<button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-lime-400 text-zinc-900 shadow-[0_10px_15px_-3px_rgba(163,230,53,0.25)] hover:bg-lime-500 hover:shadow-[0_20px_25px_-5px_rgba(163,230,53,0.3)] focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 transition-all duration-200">
  Save Changes
</button>
```

### Secondary Button

```jsx
<button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 transition-all duration-200">
  Cancel
</button>
```

### Card

```jsx
<div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
  <h3 className="text-xl font-semibold mb-2">Card Title</h3>
  <p className="text-sm text-zinc-500 dark:text-zinc-400">Description text</p>
</div>
```

### Input

```jsx
<input
  type="text"
  placeholder="Enter text..."
  className="w-full px-4 py-3 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-950 transition-all"
/>
```

### Stat Card

```jsx
<div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 flex items-start justify-between gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
  <div>
    <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Total Users</p>
    <p className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">12,847</p>
  </div>
  <div className="p-2.5 rounded-xl bg-zinc-900 text-lime-400 dark:bg-lime-400 dark:text-zinc-900 shadow-sm">
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
    </svg>
  </div>
</div>
```

### Badge

```jsx
<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-lime-400/15 text-lime-600 dark:bg-lime-400/20 dark:text-lime-400">
  Active
</span>
```

### Sidebar (Always Dark)

```jsx
<aside className="w-64 bg-zinc-900 text-zinc-50 border-r border-zinc-800 p-4">
  <nav className="space-y-1">
    <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-zinc-50 hover:translate-x-1 transition-all">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7 7M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-3a1 1 0 00-1-1v-3a1 1 0 00-1-1H6a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1v-10M9 12H3m0 0l7-7 7 7 7M9 12v8m0 0l7-7 7-7-7"></path></svg>
      Dashboard
    </a>
    <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-lime-400 text-zinc-900 font-semibold">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7"></path></svg>
      Projects
    </a>
  </nav>
</aside>
```

---

## Color Reference (Tailwind)

| Purpose | Tailwind Class | Hex |
|---------|---------------|-----|
| Lime (Primary) | `bg-lime-400` / `text-lime-400` | `#a3e635` |
| Lime (Hover) | `bg-lime-500` / `text-lime-500` | `#84cc16` |
| Black | `bg-zinc-900` | `#18181b` |
| White BG | `bg-white` | `#ffffff` |
| Dark BG | `bg-zinc-950` | `#09090b` |
| Border Light | `border-zinc-200` | `#e4e4e7` |
| Border Dark | `border-zinc-800` | `#27272a` |
| Text Light | `text-zinc-950` | `#09090b` |
| Text Dark | `text-zinc-50` | `#fafafa` |
| Muted Light | `text-zinc-500` | `#71717a` |
| Muted Dark | `text-zinc-400` | `#a1a1aa` |

---

## Utility Combinations

### Hover Effects

```jsx
// Lift on hover
className="hover:-translate-y-1 hover:shadow-lg transition-all duration-200"

// Lime glow on hover
className="hover:shadow-[0_0_20px_rgba(163,230,53,0.3)] transition-all duration-200"

// Scale up slightly
className="hover:scale-105 transition-transform duration-200"
```

### Focus States

```jsx
// Ring focus
className="focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2"
```

### Shadows

```jsx
// Small shadow
shadow-sm    // 0 1px 2px 0 rgb(0 0 0 / 0.05)

// Medium shadow
shadow-md    // 0 4px 6px -1px rgb(0 0 0 / 0.1)

// Large shadow
shadow-lg    // 0 10px 15px -3px rgb(0 0 0 / 0.1)

// Lime glow
shadow-[0_10px_15px_-3px_rgba(163,230,53,0.25)]
```

---

## Dark Mode Toggle

```jsx
// Toggle component
const [isDark, setIsDark] = useState(false);

return (
  <button
    onClick={() => {
      setIsDark(!isDark);
      document.documentElement.classList.toggle('dark');
    }}
    className="px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 font-medium transition-colors"
  >
    {isDark ? 'Light Mode' : 'Dark Mode'}
  </button>
);
```

---

## Files in This Directory

1. **`theme.md`** - Full Tailwind-focused specification (use this!)
2. **`ecoglow.css`** - Standalone CSS (alternative to Tailwind)
3. **`quickstart.md`** - This Tailwind quick start guide
4. **`showcase.html`** - Visual preview (also uses Tailwind classes)

---

## Why Tailwind for EcoGlow?

1. **Utility-First** - All colors map to Tailwind's zinc color scale
2. **No Build Step** - CSS variables work with standard Tailwind setup
3. **Type Safe** - Full TypeScript support
4. **Tree Shakable** - Only used styles are included
5. **Easy Customization** - Change one variable, entire theme updates

---

## Quick Tailwind Setup

If you don't have Tailwind installed yet:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Then copy the CSS variables from Step 1 above into your `globals.css`.
