

# Switch to Light Mode + Outfit Font

## Overview
Convert the entire app from dark mode to light mode and replace Space Grotesk with Outfit as the display font. This touches the global CSS variables, font imports, Tailwind config, and utility classes across all components.

## What Changes

### 1. Global CSS (`src/index.css`)
- Replace Google Fonts import: swap `Space+Grotesk` for `Outfit`
- Rewrite all CSS variables for a light palette:
  - `--background`: white/near-white (~0 0% 100%)
  - `--foreground`: dark charcoal (~220 20% 12%)
  - `--card`: white with very subtle grey
  - `--primary`: keep the teal/cyan hue but slightly deeper for contrast on white
  - `--muted`: light greys
  - `--border`: light grey borders
  - `--sidebar-*`: light sidebar palette
  - `--surface`, `--glow`, `--success`, `--warning`: adjusted for light backgrounds
- Update heading font-family references from `Space Grotesk` to `Outfit`
- Update `.font-display` utility
- Adjust glow/shadow utilities to use softer, lighter shadows instead of dark-mode glows
- Update `.grid-bg`, `.gradient-surface`, `.card-lift` hover shadows for light mode
- Remove or tone down `.glow-text` (text-shadow doesn't work well on light backgrounds)

### 2. Tailwind Config (`tailwind.config.ts`)
- Update `fontFamily.display` from `Space Grotesk` to `Outfit`

### 3. HTML (`index.html`)
- Remove `class="dark"` from `<html>` tag

### 4. Hero Section (`src/components/landing/Hero.tsx`)
- Adjust overlay gradients to use white-based fades instead of dark background fades
- Increase hero image opacity slightly since the overlay is now lighter
- Adjust glow orb colours for light mode visibility

### 5. Landing Page Components
All components already use semantic CSS variable classes (`bg-background`, `text-foreground`, `bg-card`, etc.) so they'll automatically adapt. Minor tweaks needed:
- **Navbar**: gradient on scroll uses light bg
- **Problem/Solution/Benefits/FeatureShowcase/Pricing/SocialProof/FinalCTA/Footer**: review `gradient-primary` button contrast, ensure `text-primary` is readable on white

### 6. App Components
- **AppSidebar**: sidebar colours adapt via CSS vars; `gradient-primary` logo stays
- **AppLayout**: header backdrop adapts
- **Dashboard, Stock, Contacts, Deals, Wanted, Movements, Documents**: all use semantic classes, should adapt automatically

### 7. Auth Pages (Login, Signup, ForgotPassword, ResetPassword)
- Replace `font-display` references from Space Grotesk → Outfit (handled by CSS)
- Backgrounds adapt via CSS vars

## Files to Modify
- `index.html` — remove `dark` class
- `src/index.css` — new light palette + Outfit font import
- `tailwind.config.ts` — Outfit in fontFamily
- `src/components/landing/Hero.tsx` — light overlay gradients

All other files use semantic Tailwind classes and will adapt automatically.

