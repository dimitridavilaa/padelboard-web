# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm run dev      # Start dev server at localhost:4321
npm run build    # Build production site to ./dist/
npm run preview  # Preview production build locally
```

There is no linter or test suite configured.

## Architecture

This is an **Astro 5** static site for PadelBoard — a digital padel scoreboard product. No UI framework (React/Vue/etc.) is used; all components are `.astro` files.

### Bilingual structure (ES / EN)

Every page and component exists in two versions:
- Spanish (default): `src/pages/index.astro`, `src/components/Hero.astro`, etc.
- English: `src/pages/en/index.astro`, `src/components/HeroEN.astro`, etc.

The `EN` suffix convention is consistent throughout. Two layouts exist: `src/layouts/Layout.astro` (ES, `lang="es"`) and `src/layouts/LayoutEN.astro` (EN). When adding or changing content, both versions must be updated.

### Pages and routing

| Route | File |
|---|---|
| `/` | `src/pages/index.astro` |
| `/en/` | `src/pages/en/index.astro` |
| `/compra` | `src/pages/compra.astro` |
| `/en/buy` | `src/pages/en/buy.astro` |
| `/ads` | `src/pages/ads.astro` |
| `/PadelBoardADS` | `src/pages/PadelBoardADS.astro` |

### Cart state (nanostores)

`src/store/cart.js` manages a persistent shopping cart using `@nanostores/persistent`. Cart data is stored in `localStorage` under key `padelboard-cart-v2`. The store exports: `cartItems`, `isCartOpen`, `addToCart`, `removeFromCart`, `toggleCart`.

`CartSidebar.astro` is rendered inside the layout and subscribes to the store. Checkout sends an order summary to a hardcoded WhatsApp number (`593987225485`).

### Global styles and design tokens

CSS custom properties are defined in `Layout.astro`'s `<style is:global>` block:
- `--color-azul-fondo: #04133E` — main dark background
- `--color-azul-claro: #3b82f6` — buttons/accents
- `--color-amarillo: #FFDE59` — highlight/CTA
- `--fuente-titulos: 'Anton'` — headings (uppercase, weight 400)
- `--fuente-cuerpo: 'Outfit'` — body text

The `.fade-up` class combined with an IntersectionObserver (set up in Layout) drives scroll-entrance animations globally. The `.container` utility class caps width at 1200px.
