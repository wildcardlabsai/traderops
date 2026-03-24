

# Redesign: Dark + Orange Colour Scheme

## Overview
Switch the entire landing page from the current light teal/white scheme to a premium dark theme with orange/amber accents, inspired by the reference screenshot. The app portal pages will also inherit the dark base through CSS variables.

## Colour Palette

```text
Background:    #0D0D0F (near-black)
Card/Surface:  #161618 (dark grey)
Muted bg:      #1C1C1F
Foreground:    #F5F5F5 (off-white)
Muted text:    #8A8A8E (mid-grey)
Primary:       #F97316 (orange-500)
Primary hover: #EA580C (orange-600)
Accent:        #FB923C (orange-400, lighter)
Border:        #2A2A2E
Destructive:   #EF4444 (stays red)
Success:       #22C55E
```

## Changes

### 1. `index.html`
- Add `class="dark"` back to `<html>` tag

### 2. `src/index.css` — Full variable rewrite
- Rewrite all CSS custom properties to the dark palette above
- `--primary` becomes orange (`25 95% 53%` or similar)
- `--background` becomes near-black, `--foreground` becomes off-white
- `--card` becomes dark surface, `--border` becomes subtle dark grey
- `--sidebar-*` variables: dark sidebar with orange active states
- Update `.gradient-primary` to orange gradient
- Update `.text-gradient` to orange gradient
- Update `.glow-box`, `.glow-border` to use orange glow instead of teal
- Update `.grid-bg`, `.bg-dot-pattern` for dark backgrounds
- `.card-lift:hover` shadow uses warm dark tones

### 3. `tailwind.config.ts`
- No structural changes needed — colours are driven by CSS vars

### 4. `src/components/landing/Hero.tsx`
- Swap overlay gradients back to dark-based (`from-background via-background/90`)
- Adjust blob colours to orange tints
- The decorative dot pattern and hero image opacity work naturally on dark

### 5. `src/components/landing/AppPreview.tsx`
- Browser chrome and sidebar will auto-adapt via CSS vars
- Title bar dots stay the same

### 6. Landing sections (Problem, Solution, Benefits, FeatureShowcase, Pricing, SocialProof, FinalCTA, Footer, Navbar)
- All use semantic classes (`bg-background`, `text-foreground`, `bg-card`, `border-border`, `text-primary`, etc.) so they adapt automatically
- `FinalCTA` currently uses `bg-foreground` for an inverted section — this will become a light-on-dark inversion which still works, or we can switch it to an orange gradient CTA block
- `Problem` section's `bg-muted/40` will become a dark muted tone
- Navbar scroll state adapts via `bg-background/80`

### 7. Auth pages (Login, Signup, etc.)
- Adapt automatically via CSS vars

## Files to Modify
- `index.html` — add `dark` class
- `src/index.css` — rewrite all CSS variables + utility classes
- `src/components/landing/Hero.tsx` — adjust blob colours
- `src/components/landing/FinalCTA.tsx` — switch to orange gradient CTA block instead of `bg-foreground` inversion (which would become white-on-dark and look odd)

