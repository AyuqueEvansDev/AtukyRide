---
name: Kinetic Minimalist
colors:
  surface: '#faf8ff'
  surface-dim: '#d9d9e5'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3fe'
  surface-container: '#ededf9'
  surface-container-high: '#e7e7f3'
  surface-container-highest: '#e1e2ed'
  on-surface: '#191b23'
  on-surface-variant: '#434655'
  inverse-surface: '#2e3039'
  inverse-on-surface: '#f0f0fb'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#545f73'
  on-secondary: '#ffffff'
  secondary-container: '#d5e0f8'
  on-secondary-container: '#586377'
  tertiary: '#943700'
  on-tertiary: '#ffffff'
  tertiary-container: '#bc4800'
  on-tertiary-container: '#ffede6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#d8e3fb'
  secondary-fixed-dim: '#bcc7de'
  on-secondary-fixed: '#111c2d'
  on-secondary-fixed-variant: '#3c475a'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#faf8ff'
  on-background: '#191b23'
  surface-variant: '#e1e2ed'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  title-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  gutter: 16px
  margin-mobile: 20px
  margin-desktop: 40px
---

## Brand & Style
This design system is built on the principles of **Minimalism** and **Utility**, specifically tailored for the high-velocity context of transportation. The brand personality is efficient, safe, and unfailingly reliable. It strips away visual noise to focus on the user's primary intent: getting from point A to point B.

The aesthetic utilizes heavy whitespace to reduce cognitive load during travel. It balances a high-tech "Electric" feel with grounded, professional stability. The interface should feel "invisible" until needed, providing a calm, focused environment for navigation and booking.

## Colors
The color palette is dominated by **Electric Blue**, used strategically for primary actions, active routes, and brand moments to signify movement and trust. 

- **Primary (Electric Blue):** High-visibility blue for calls to action and critical path indicators.
- **Secondary (Dark Slate):** Used for primary headings and body text to ensure maximum legibility and a sense of authority.
- **Background (Light Grey):** A cool-toned off-white that reduces glare and provides a modern, clean canvas.
- **Accent Neutrals:** Use variations of Slate (e.g., #64748B) for secondary information and iconography to maintain a hierarchy that favors the primary destination or price.

## Typography
**Inter** is the sole typeface for the design system, chosen for its exceptional legibility in digital interfaces and its neutral, systematic character.

- **Headlines:** Use Bold (700) weights with slight negative letter-spacing to create a compact, "urgent" feel for arrival times and destinations.
- **Body:** Standard body text uses Regular (400) weight for maximum readability.
- **Labels:** Use Medium (500) and Semi-Bold (600) for UI controls, buttons, and secondary metadata. Small labels (12px) should be uppercase to distinguish them from interactive text.

## Layout & Spacing
The layout follows a **Fluid Grid** model optimized for one-handed mobile use. 

- **Mobile:** A 4-column grid with 20px side margins and 16px gutters. Most interactive elements (cards, buttons) should span the full width of the 4 columns.
- **Desktop:** A 12-column centered grid (max-width 1280px) for administrative or booking dashboards.
- **Rhythm:** Spacing follows an 8px linear scale. Vertical rhythm is critical; use 24px (lg) between distinct content sections and 8px (base) between related elements within a card.

## Elevation & Depth
Depth is conveyed through **Ambient Shadows** and **Tonal Layers**. This system avoids heavy borders in favor of soft shadows that suggest physical lift.

- **Level 1 (Cards/Inputs):** Subtle shadow (Y: 2px, Blur: 4px, Color: Slate #1E293B at 5% opacity).
- **Level 2 (Floating Action Buttons/Active States):** Medium shadow (Y: 4px, Blur: 12px, Color: Slate #1E293B at 10% opacity).
- **Overlays (Modals/Bottom Sheets):** High-diffused shadow (Y: 10px, Blur: 30px, Color: Slate #1E293B at 15% opacity).
- **Backdrop:** Use a soft blur (8px) on the map or background when a bottom sheet is active to maintain context without distraction.

## Shapes
Shapes are consistently **Rounded** to evoke friendliness and safety. The standard corner radius is **16px (1rem)** for primary containers like cards, input fields, and main buttons.

- **Small elements:** (Chips, Checkboxes) use a 4px or 8px radius.
- **Large elements:** (Bottom sheets) use a 24px top-only radius to create a soft, "drawer" appearance.
- **Interactive:** Avoid sharp 0px corners entirely to maintain the approachable, modern aesthetic.

## Components
- **Buttons:** Primary buttons are full-width on mobile, 56px height, Electric Blue background with White text. Use 16px rounded corners.
- **Cards:** White background with a Level 1 shadow. Padding should be 16px or 20px. Use these for ride options, driver details, and trip history.
- **Input Fields:** 56px height, Light Grey (#F1F5F9) background, no border, 16px roundedness. On focus, add a 2px Electric Blue stroke.
- **Bottom Sheets:** The primary container for transportation details. Should have a 24px top-left and top-right corner radius and a subtle "drag handle" at the top center.
- **Chips:** Small, 32px height containers with 8px radius for quick filters (e.g., "Personal," "Business," "Economy").
- **Vehicle Selection:** Horizontal scrolling list of cards with high-contrast imagery of vehicles and clear, bold pricing.