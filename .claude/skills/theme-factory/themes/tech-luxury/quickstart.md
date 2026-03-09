# Tech Luxury Theme - Quick Start Guide

The **Tech Luxury** theme is now available for reuse across any project. It features a sophisticated dark aesthetic with Electric Indigo & Vibrant Cyan accents, premium visual effects, and smooth animations.

---

## Installation Options

### Option 1: Pure CSS (Fastest)

Simply copy `techluxury.css` to your project and add the class:

```html
<link rel="stylesheet" href="techluxury.css">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

<body class="techluxury">
  <button class="tl-btn tl-btn-primary">Click Me</button>
  <div class="tl-card">
    <h3 class="tl-card-title">Card Title</h3>
  </div>
</body>
```

### Option 2: Next.js / Tailwind

Add the CSS variables to your `globals.css`:

```css
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: #05060A;
    --foreground: #ffffff;
    --card: #0E101A;
    --primary: #6366f1;
    --accent: #38bdf8;
    --muted: #1e2538;
    --muted-foreground: #a1a1aa;
    --border: rgba(99, 102, 241, 0.3);
    --radius: 0.5rem;
  }
}
```

Update `tailwind.config.ts`:

```typescript
export default {
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        primary: "var(--primary)",
        accent: "var(--accent)",
        muted: "var(--muted)",
        border: "var(--border)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        heading: ["Montserrat", "sans-serif"],
        body: ["Poppins", "sans-serif"],
      },
    },
  },
}
```

### Option 3: Vue.js

```vue
<template>
  <div class="techluxury">
    <button class="tl-btn tl-btn-primary">Action</button>
  </div>
</template>

<style>
@import './techluxury.css';
</style>
```

### Option 4: React (without Tailwind)

```jsx
import './techluxury.css';

function App() {
  return (
    <div className="techluxury">
      <button className="tl-btn tl-btn-primary">
        Click Me
      </button>
      <div className="tl-card">
        <h3 className="tl-card-title">Title</h3>
        <p className="tl-card-desc">Description</p>
      </div>
    </div>
  );
}
```

---

## Available Components

### Buttons
```html
<!-- Primary (Gradient) -->
<button class="tl-btn tl-btn-primary">Save Changes</button>

<!-- Secondary (Card style) -->
<button class="tl-btn tl-btn-secondary">Cancel</button>

<!-- Outline -->
<button class="tl-btn tl-btn-outline">Learn More</button>

<!-- Ghost -->
<button class="tl-btn tl-btn-ghost">Edit</button>

<!-- Destructive -->
<button class="tl-btn tl-btn-destructive">Delete</button>

<!-- Sizes -->
<button class="tl-btn tl-btn-primary tl-btn-sm">Small</button>
<button class="tl-btn tl-btn-primary tl-btn-lg">Large</button>
<button class="tl-btn tl-btn-primary tl-btn-icon">+</button>
```

### Cards
```html
<div class="tl-card">
  <div class="tl-card-header">
    <h3 class="tl-card-title">Card Title</h3>
    <p class="tl-card-desc">Card description goes here</p>
  </div>
  <div class="tl-card-content">
    Your content here
  </div>
</div>

<!-- With Glow Effect -->
<div class="tl-card tl-card-glow">
  ...
</div>
```

### Stat Card (Dashboard)
```html
<div class="tl-stat">
  <div>
    <p class="tl-stat-label">Total Users</p>
    <p class="tl-stat-value">12,847</p>
  </div>
  <div class="tl-stat-icon">
    <svg><!-- your icon --></svg>
  </div>
</div>
```

### Inputs
```html
<input type="text" class="tl-input" placeholder="Enter your name">
<textarea class="tl-input tl-textarea" rows="4"></textarea>
```

### Badges
```html
<span class="tl-badge tl-badge-indigo">Active</span>
<span class="tl-badge tl-badge-cyan">New</span>
<span class="tl-badge tl-badge-green">Done</span>
<span class="tl-badge tl-badge-yellow">Pending</span>
<span class="tl-badge tl-badge-red">Error</span>
```

### Live Status Indicator
```html
<span class="tl-status">
  <span class="tl-status-dot"></span>
  Available for Projects
</span>
```

### Gradient Text
```html
<h1 class="tl-gradient-text">Your Name Here</h1>
```

### Glass Card (with backdrop blur)
```html
<div class="tl-card tl-glass">
  <h3 class="tl-card-title">Glass Card</h3>
  <p class="tl-card-desc">With backdrop blur effect</p>
</div>
```

---

## Special Effects

### Ambient Glow Background
```html
<div class="tl-ambient-glow">
  <!-- Your content here -->
</div>
```

### Grain Texture (add to body/main)
```html
<body class="tl-grain">
  <!-- Your content here -->
</body>
```

---

## Custom Colors

You can customize the theme by overriding CSS variables:

```css
:root {
  /* Change the primary color */
  --primary: #8b5cf6;  /* Purple instead of Indigo */

  /* Change the accent color */
  --accent: #f472b6;    /* Pink instead of Cyan */

  /* Change the background */
  --background: #000000;  /* Pure black */
}
```

---

## Animation Classes

```html
<!-- Fade in from bottom -->
<div class="tl-fade-in-up">Content here</div>

<!-- Slide in from left -->
<div class="tl-slide-in-left">Content here</div>

<!-- Slide in from right -->
<div class="tl-slide-in-right">Content here</div>

<!-- Scale entrance -->
<div class="tl-scale-in">Content here</div>

<!-- Hover lift effect -->
<div class="tl-hover-lift">Lifts on hover</div>

<!-- Glow on hover -->
<div class="tl-hover-glow">Glows on hover</div>
```

---

## Color Reference

| Color | Hex | Usage |
|-------|-----|-------|
| Electric Indigo | `#6366f1` | Primary brand, gradients |
| Vibrant Cyan | `#38bdf8` | Accents, highlights, links |
| Deep Onyx | `#05060A` | Page background |
| Shadow Card | `#0E101A` | Elevated surfaces |
| Twilight Muted | `#1e2538` | Secondary backgrounds |
| White | `#ffffff` | Primary text |
| Cool Gray | `#a1a1aa` | Secondary text |

---

## Tailwind Color Classes

```html
<!-- Backgrounds -->
bg-[#05060A]        <!-- Deep Onyx -->
bg-[#0E101A]        <!-- Shadow Card -->
bg-[#1e2538]        <!-- Twilight Muted -->

<!-- Text -->
text-white          <!-- Primary text -->
text-[#d1d5db]       <!-- Secondary text -->
text-[#a1a1aa]       <!-- Muted text -->

<!-- Gradients -->
from-primary to-accent
from-white via-gray-200 to-gray-500

<!-- Glows -->
shadow-indigo-500/50
shadow-sky-400/30
shadow-2xl shadow-black/50
```

---

## Font Classes

```html
<!-- Headings -->
font-montserrat font-bold
font-montserrat font-extrabold

<!-- Body -->
font-poppins font-normal
font-poppins font-medium
```

---

## Files Created

1. **`theme.md`** - Full theme specification with all design tokens
2. **`techluxury.css`** - Standalone CSS file ready to drop into any project
3. **`quickstart.md`** - This quick start guide
4. **`showcase.html`** - Visual preview of all components

All located in: `.claude/skills/theme-factory/themes/tech-luxury/`

---

## What Makes This Theme Special

1. **Premium Dark Aesthetic** - Deep onyx with subtle grain feels luxurious
2. **Electric Color Palette** - Indigo + cyan pairing is modern and distinctive
3. **Rich Visual Effects** - Grain, glows, glass morphism, mouse-tracking
4. **Spring Animations** - Smooth, premium-feeling interactions
5. **Production Tested** - Battle-tested in real portfolio applications
6. **Framework Agnostic** - Works with vanilla HTML, React, Vue, Next.js

---

## Tips for Best Results

1. **Use the grain texture** - it adds essential warmth to dark backgrounds
2. **Limit glow effects** - use sparingly for CTAs and key elements
3. **Maintain contrast** - ensure text remains readable (white on dark)
4. **Use gradients strategically** - buttons and hero backgrounds only
5. **Add spring animations** - makes interactions feel premium
6. **Glass elements need borders** - use `border-white/10` for definition
