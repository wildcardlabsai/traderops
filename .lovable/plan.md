

# Landing Page Design & Hero Image Improvements

## What Changes

### 1. Hero Section -- Bring Back the Background Image
- Re-add `hero-bg.jpg` as a full-bleed background with a dark overlay gradient so text remains readable
- Layer order: image → dark gradient overlay → grid pattern → glow orbs → content
- Image styled with `object-cover`, low opacity (~20-30%), with a strong gradient fade to background color at top and bottom

### 2. Visual & Color Refinements
- **Slightly warmer foreground text**: Shift `--foreground` from pure blue-grey to a slightly warmer off-white (`210 15% 93%`) for better readability
- **Softer muted text**: Bump `--muted-foreground` up slightly (`215 15% 60%`) so body copy is more legible on dark backgrounds
- **Card hover states**: Add a subtle `translateY(-2px)` lift on hover for feature cards and benefit cards
- **Section dividers**: Add subtle gradient divider lines between major sections instead of relying only on spacing

### 3. Layout & Spacing Improvements
- **Hero**: Add more bottom padding and a subtle downward-pointing chevron/scroll indicator
- **Problem section**: Increase card padding and add a subtle red/destructive gradient border on hover instead of just color change
- **Solution section**: On mobile, use `grid-cols-2` with the 5th item spanning full width, instead of all single-column
- **Feature Showcase**: Add a subtle gradient background to alternate cards for visual rhythm
- **Pricing card**: Add a very subtle animated border glow (rotating gradient border effect)
- **Social Proof**: Add avatar placeholder