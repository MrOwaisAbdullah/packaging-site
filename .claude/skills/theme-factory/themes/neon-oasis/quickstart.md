# 🚀 Quickstart: Neon Oasis

To apply the **Neon Oasis** theme to a new artifact, follow these two simple steps:

### 1. Configure CSS Variables

Copy the following into your `globals.css` to define the colors and add the premium grain texture:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Light Mode */
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
    --theme-gradient: linear-gradient(135deg, #FECD1A 0%, #fde047 30%, #86efac 80%, #64F4AB 100%);
  }

  .dark {
    /* Dark Mode (Primary Theme Vision) */
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
    /* High-end grain texture */
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.015'/%3E%3C/svg%3E");
    background-attachment: fixed;
  }
  .dark body {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
  }
}
```

### 2. Configure Tailwind Settings

Copy the theme settings into your `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: { DEFAULT: "var(--card)", foreground: "var(--card-foreground)" },
        popover: { DEFAULT: "var(--popover)", foreground: "var(--popover-foreground)" },
        primary: { DEFAULT: "var(--primary)", foreground: "var(--primary-foreground)" },
        secondary: { DEFAULT: "var(--secondary)", foreground: "var(--secondary-foreground)" },
        muted: { DEFAULT: "var(--muted)", foreground: "var(--muted-foreground)" },
        accent: { DEFAULT: "var(--accent)", foreground: "var(--accent-foreground)" },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    }
  }
} satisfies Config;
```

✅ **Done!** You can now freely use the `bg-theme-gradient`, `text-primary`, and other utility classes found in styling components alongside this theme format! Check `theme.md` for specific component patterns.
