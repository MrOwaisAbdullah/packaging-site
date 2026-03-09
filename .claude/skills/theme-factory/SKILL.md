---
name: theme-factory
description: Toolkit for styling artifacts with professional themes. These artifacts can be slides, docs, reportings, HTML landing pages, etc. There are 12 pre-set themes with colors/fonts, optimized for Tailwind CSS v3.4.14, that you can apply to any artifact, or can generate a new theme on-the-fly.
license: Complete terms in LICENSE.txt
---


# Theme Factory Skill

This skill provides a curated collection of professional themes, each with carefully selected color palettes and font pairings. All themes are **Tailwind CSS v3.4.14 optimized** with CSS variables and component patterns.

## Purpose

To apply consistent, professional styling to slide decks, documentation, landing pages, and other artifacts. Each theme includes:
- Cohesive color palette with hex codes and Tailwind classes
- CSS variables for easy Tailwind configuration
- Component patterns with ready-to-use Tailwind classes
- Distinct visual identity suitable for different contexts

## Usage Instructions

To apply styling to a slide deck or other artifact:

1. **Show the theme showcase**: Display the `theme-showcase.pdf` file to allow users to see all available themes visually
2. **Ask for their choice**: Ask which theme to apply to the deck
3. **Wait for selection**: Get explicit confirmation about the chosen theme
4. **Apply the theme**: Read the theme's `theme.md` file and apply the specified colors and Tailwind classes

## Themes Available

### Full Theme Directories (with CSS, showcase, quickstart)
These themes have complete documentation and standalone files:

| # | Theme | Description | Visual Character |
|---|-------|-------------|------------------|
| 1 | **Tech Luxury** | Sophisticated dark theme with Electric Indigo & Cyan | Premium, modern, immersive |
| 2 | **EcoGlow** | High-contrast Black & White with Lime Green accents | Bold, energetic, accessible |
| 3 | **Neon Oasis** | High-tech dark mode with Neon Yellow & Mint Green accents | Premium, vibrant, luxurious |

### Quick Reference Themes (single .md files)
These themes are defined in individual markdown files:

| # | Theme | Description | Visual Character |
|---|-------|-------------|------------------|
| 3 | **Ocean Depths** | Professional maritime colors | Calming, trustworthy |
| 4 | **Sunset Boulevard** | Warm sunset gradient | Vibrant, energetic |
| 5 | **Forest Canopy** | Earth tones and greens | Natural, grounded |
| 6 | **Modern Minimalist** | Clean grayscale | Contemporary, sleek |
| 7 | **Golden Hour** | Autumnal warm tones | Rich, sophisticated |
| 8 | **Arctic Frost** | Winter-inspired cool tones | Crisp, clean |
| 9 | **Desert Rose** | Dusty rose and sand tones | Soft, elegant |
| 10 | **Tech Innovation** | Bold tech aesthetic | Modern, confident |
| 11 | **Botanical Garden** | Fresh garden colors | Organic, fresh |
| 12 | **Midnight Galaxy** | Cosmic deep tones | Dramatic, mysterious |

**Total: 13 professional themes available**

## Theme Directory Structure

### Full Themes (Tech Luxury, EcoGlow)
```
themes/
├── tech-luxury/
│   ├── theme.md          # Full Tailwind v3 specification
│   ├── quickstart.md     # Quick start guide
│   ├── techluxury.css   # Standalone CSS (optional)
│   └── showcase.html     # Visual HTML preview
├── ecoglow/
│   ├── theme.md          # Full Tailwind v3 specification
│   ├── quickstart.md     # Quick start guide
│   ├── ecoglow.css       # Standalone CSS (optional)
│   └── showcase.html     # Visual HTML preview
```

### Quick Reference Themes
```
themes/
├── ocean-depths.md
├── sunset-boulevard.md
├── forest-canopy.md
├── modern-minimalist.md
├── golden-hour.md
├── arctic-frost.md
├── desert-rose.md
├── tech-innovation.md
├── botanical-garden.md
└── midnight-galaxy.md
```

## Tailwind CSS Integration

All themes are designed for **Tailwind CSS v3.4.14** (your project's current version). Each full theme includes:

### CSS Variables (globals.css)
```css
@layer base {
  :root {
    --background: #05060A;
    --foreground: #ffffff;
    --primary: #6366f1;
    --accent: #38bdf8;
    --radius: 0.5rem;
  }
}
```

### Tailwind Config (tailwind.config.ts)
```typescript
theme: {
  extend: {
    colors: {
      background: "var(--background)",
      foreground: "var(--foreground)",
      primary: "var(--primary)",
      accent: "var(--accent)",
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
  },
}
```

### Ready-to-Use Component Classes
```jsx
// Button
<button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-primary to-accent text-white shadow-xl hover:shadow-2xl transition-all">
  Click Me
</button>

// Card
<div className="bg-card border border-border rounded-lg p-6 shadow-xl hover:shadow-2xl transition-all">
  Content here
</div>
```

## Theme Details by Category

### Dark-First Themes
- **Tech Luxury** - Deep Onyx background with Indigo/Cyan accents (portfolios, tech showcases)
- **EcoGlow** - Black & White with Lime accents (SaaS, dashboards)
- **Midnight Galaxy** - Cosmic purples and deep blues
- **Neon Oasis** - Deep Onyx background with vibrant Neon Yellow and Mint Green accents

### Light Themes
- **Ocean Depths** - Blues and teals
- **Forest Canopy** - Greens and earth tones
- **Botanical Garden** - Fresh organic colors

### Warm Themes
- **Sunset Boulevard** - Orange/pink gradients
- **Golden Hour** - Gold and amber tones
- **Desert Rose** - Dusty pinks and sands

### Cool Themes
- **Arctic Frost** - Icy blues and whites
- **Modern Minimalist** - Clean grayscale

### High-Contrast Themes
- **EcoGlow** - Black & White with Lime (accessible, energetic)
- **Tech Innovation** - Bold tech colors

## Application Process

After a preferred theme is selected:
1. Read the corresponding `theme.md` file from the `themes/` directory
2. Copy the CSS variables to `globals.css`
3. Update `tailwind.config.ts` with color mappings
4. Apply the Tailwind component classes throughout the project
5. For standalone CSS projects, use the provided `.css` file directly

## Create Your Own Theme

To handle cases where none of the existing themes work for an artifact, create a custom theme:

1. **Analyze the artifact's requirements**: Purpose, audience, context
2. **Choose appropriate colors**: 4-6 colors that work harmoniously
3. **Select font pairings**: Header font + body font
4. **Define the theme structure**: Backgrounds, text, accents, borders
5. **Create theme files**: `theme.md`, optional `quickstart.md` and CSS
6. **Add to the themes directory**: Place in `themes/<theme-name>/`

### Theme Naming Convention
Use descriptive names that evoke the visual character:
- **Tech Luxury** - Premium dark tech aesthetic
- **Ocean Depths** - Maritime, calming
- **Golden Hour** - Warm, sunset-like
- **Forest Canopy** - Natural, earthy

### Theme File Template
When creating a new full theme, include:
- `theme.md` - Complete specification with Tailwind classes
- `quickstart.md` - Setup guide for Tailwind integration
- `<theme>.css` - Standalone CSS (optional, for non-Tailwind projects)
- `showcase.html` - Visual preview (optional)

## Tailwind Version Notes

**Current**: All themes are optimized for **Tailwind CSS v3.4.14**
**Future**: When upgrading to Tailwind v4, refer to the migration notes included in each theme's `theme.md` file.

### v4 Breaking Changes to Note
- `@tailwind directives` → `@import "tailwindcss"`
- `darkMode: ["class"]` → `@variant dark (&:where(.dark, .dark *))`
- `colors` in config → `--color-*` in `@theme` directive
- `bg-opacity-*` → `bg-black/*`
- `ring` width changes from 3px to 1px
