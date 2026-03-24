

# Add App Screenshots to Landing Page

## Approach
Build a new `AppPreview` component that renders a realistic, static mockup of the dashboard inside a browser-frame wrapper. This gives the landing page a polished product shot without needing to log in or take actual screenshots. The mockup will use hardcoded sample data styled identically to the real app pages (same classes, same layout).

## What gets built

### 1. New component: `src/components/landing/AppPreview.tsx`
A static recreation of the dashboard view inside a macOS-style browser chrome:
- **Browser frame**: rounded corners, 3 traffic-light dots (red/yellow/green), a URL bar showing "traderops.app/dashboard", subtle drop shadow
- **Sidebar mockup**: condensed version of AppSidebar with the TO logo, nav items (Dashboard highlighted, Stock, Deals, Contacts), and group labels
- **Dashboard content**: 4 stat cards (Live Stock: 47, Active Deals: 12, Pipeline Value: £34,200, Urgent Stock: 3) with icons, plus a "Recent Deals" table with 4-5 sample rows showing vehicle names, parties, stages (with colored badges), and values
- All styled with the same Tailwind classes used in the real app (font-display, font-body, gradient-primary, bg-card, etc.)

### 2. Update `Hero.tsx`
Add the `AppPreview` component below the trust bar, inside a container with:
- Perspective/tilt effect via CSS transform for depth
- Fade-in animation matching the existing delay sequence
- Max width ~1100px, centered

### 3. Update `FeatureShowcase.tsx`
Replace the current mini-UI mockups with slightly more detailed inline previews that better represent the actual app screens (Stock table rows, Deal pipeline columns). Keep the card-based layout but make the previews feel more like real screenshots.

## Files to create/modify
- **Create**: `src/components/landing/AppPreview.tsx` — browser-frame dashboard mockup
- **Edit**: `src/components/landing/Hero.tsx` — embed AppPreview below CTA
- **Edit**: `src/components/landing/FeatureShowcase.tsx` — enhance mini-UI previews

## Sample data (no gibberish)
All data will use realistic UK trade dealer examples:
- Vehicles: Ford Transit Custom, VW Golf GTI, BMW 3 Series, Audi A4 Avant, Mercedes Sprinter
- Parties: Phoenix Motors, Greenfield Autos, Apex Car Group, Summit Trade Sales
- Stages: Enquiry, Negotiating, Agreed, Invoiced
- Values: £8,500 – £28,000 range
- Registrations: realistic UK format (e.g. YR71 MXD)

