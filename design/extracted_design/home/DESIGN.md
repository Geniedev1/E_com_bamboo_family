---
name: Artisan Craft System
colors:
  surface: '#fcf9f6'
  surface-dim: '#dcdad7'
  surface-bright: '#fcf9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f0'
  surface-container: '#f0edea'
  surface-container-high: '#eae8e5'
  surface-container-highest: '#e5e2df'
  on-surface: '#1c1c1a'
  on-surface-variant: '#424844'
  inverse-surface: '#31302f'
  inverse-on-surface: '#f3f0ed'
  outline: '#727973'
  outline-variant: '#c2c8c2'
  surface-tint: '#496455'
  primary: '#173124'
  on-primary: '#ffffff'
  primary-container: '#2d4739'
  on-primary-container: '#98b5a3'
  inverse-primary: '#b0cdbb'
  secondary: '#984721'
  on-secondary: '#ffffff'
  secondary-container: '#fd966a'
  on-secondary-container: '#752d08'
  tertiary: '#422401'
  on-tertiary: '#ffffff'
  tertiary-container: '#5c3a13'
  on-tertiary-container: '#d5a474'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ccead6'
  primary-fixed-dim: '#b0cdbb'
  on-primary-fixed: '#062014'
  on-primary-fixed-variant: '#324c3e'
  secondary-fixed: '#ffdbcd'
  secondary-fixed-dim: '#ffb598'
  on-secondary-fixed: '#360f00'
  on-secondary-fixed-variant: '#79300b'
  tertiary-fixed: '#ffdcbd'
  tertiary-fixed-dim: '#f0bd8b'
  on-tertiary-fixed: '#2c1600'
  on-tertiary-fixed-variant: '#623f18'
  background: '#fcf9f6'
  on-background: '#1c1c1a'
  surface-variant: '#e5e2df'
typography:
  headline-xl:
    fontFamily: Literata
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Literata
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-lg-mobile:
    fontFamily: Literata
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Literata
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
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
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

The brand personality of the design system is grounded, authentic, and serene. It celebrates the intersection of traditional Vietnamese craftsmanship and modern interior aesthetics. The UI should evoke an emotional response of "slow living"—inviting users to appreciate the tactile quality of handmade rattan and bamboo products.

The design style is **Tactile Minimalism**. It prioritizes heavy whitespace and clean layouts to allow product photography to breathe, while incorporating subtle organic textures and "soft" UI elements that mimic the natural curves of woven materials. The interface avoids clinical sharpness, opting instead for a warm, human-centric approach that feels as curated as a boutique showroom.

## Colors

The palette is derived from natural raw materials and earth pigments.

- **Primary (Deep Leaf Green):** Used for primary actions, navigation headers, and emphasis. It represents the source of the materials and provides a sophisticated contrast to wood tones.
- **Secondary (Terracotta):** An accent color used for highlights, sale badges, and call-to-action buttons. It adds warmth and a "fired-earth" artisanal touch.
- **Tertiary (Honey Wood):** Inspired by aged rattan, this color is used for secondary UI elements like icons or active states in filtering.
- **Neutral (Sandy Beige):** The foundation of the UI. It replaces harsh whites to reduce eye strain and provide a parchment-like background that complements natural textures.

The default color mode is **Light**, as it best reflects the natural sunlight essential to showcasing organic home goods.

## Typography

This design system uses a pairing of **Literata** and **Be Vietnam Pro** to balance heritage with modernity.

- **Literata (Serif):** Chosen for all headlines. Its scholarly yet warm character suggests an editorial authority and highlights the "story" behind each handmade piece. Use tighter letter spacing for large display text.
- **Be Vietnam Pro (Sans-Serif):** Used for all functional text, descriptions, and labels. It is highly legible and provides a clean, contemporary contrast to the more decorative serif headings.

For mobile, headlines scale down to ensure readability and prevent awkward line breaks on smaller devices, while body text remains consistent to maintain accessibility.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for desktop to maintain a curated, "lookbook" feel, while transitioning to a **Fluid Grid** for mobile devices.

- **Desktop:** A 12-column grid with a max-width of 1280px. Gutters are set to 24px to provide ample air between product cards.
- **Mobile:** A 4-column fluid grid with 16px side margins. 

Spacing follows an 8px base unit. Use larger vertical spacing (lg/xl) between sections to reinforce the minimal, high-end boutique aesthetic. Product galleries should prioritize "asymmetric balance"—don't be afraid to use offset grids to mimic the irregular beauty of handmade items.

## Elevation & Depth

Hierarchy is achieved through **Tonal Layers** and **Ambient Shadows** rather than stark borders.

- **Surface Levels:** The base layer is the Neutral Sandy Beige. Elevated components like cards or modals use a slightly lighter cream tint or a pure white to "lift" off the page.
- **Shadows:** Use extremely soft, diffused shadows with a slight color tint derived from the Secondary color (Terracotta). For example, a `0 12px 24px -4px rgba(193, 102, 62, 0.08)`. This creates a warm glow rather than a cold grey drop-shadow.
- **Textures:** Backdrop blurs are used sparingly on navigation bars to maintain focus on the product images underneath. Woven pattern textures (subtle SVG overlays) can be applied to container backgrounds to add physical depth.

## Shapes

The shape language is dominated by **Rounded** geometry, echoing the natural flexibility of rattan and bamboo.

- **Base Radius:** 0.5rem (8px) for standard components like input fields and small buttons.
- **Large Radius:** 1rem (16px) for product cards and main containers.
- **Organic Accents:** For high-impact marketing sections, use "squircle" or irregular blob shapes for image masks to break the rigidity of the grid and emphasize the "handmade" theme.

Avoid sharp 90-degree corners entirely; even the most structural elements should have at least a 2px radius to maintain the "soft" brand character.

## Components

### Buttons
- **Primary:** Filled with Deep Leaf Green, white text. Large padding (16px 32px), 8px rounded corners.
- **Secondary:** Outlined in Terracotta with a 1.5px border.
- **Text Buttons:** Label-sm style in Tertiary wood tone with a subtle underline.

### Cards
Cards are the hero of this design system. They feature a light cream background, a soft warm shadow, and a 16px corner radius. The image should occupy the top 70% of the card, with a slight "zoom" transition on hover.

### Input Fields
Inputs use a "Ghost" style: a very light beige-grey background with a bottom-only border in Tertiary wood tone. This keeps the forms feeling lightweight and non-intrusive.

### Chips & Tags
Used for material types (e.g., "100% Bamboo"). These should be pill-shaped with a light Green tint background and Deep Green text.

### Woven Overlays
For section dividers or footer backgrounds, use a subtle, low-opacity repeating pattern of a "hexagon weave" or "twill weave" to reinforce the product's origin.