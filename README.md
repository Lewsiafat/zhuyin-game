# 注音打字大冒險

A browser-based Zhuyin (Bopomofo) typing practice game. Type zhuyin sequences to defeat monsters!

## Quick Start

```bash
npm install

# Development (hot reload)
npm run dev

# Production
npm start
```

## Tech Stack

- **Vue 3** (CDN global build) — reactive UI
- **PixiJS 7** (CDN) — monster canvas rendering
- **Express** — production static server (port 10007, base path `/zhuyin-game`)
- **Vite** — dev server with hot reload

## Architecture

Single-page app, all code in `src/index.html` (HTML + CSS + JS in one file).

- `src/index.js` — Express static server for production deployment
- `src/index.html` — game UI, logic, keyboard, and PixiJS monster/background rendering
- `assets/kenney_background-elements/` — Kenney background element sprites (Public Domain)
- `assets/kenney_monster-builder-pack/` — Kenney monster builder sprites (Public Domain)
- `specs/` — development task walkthroughs
- `.github/workflows/deploy.yml` — auto-deploy to VPS on push to main

## Game Mechanics

- Type zhuyin symbols to damage monsters
- Wrong input: -2 seconds time penalty + target key hint glow (0.8s)
- Timer expires: lose 1 HP (3 HP total)
- Every 3 sentences: level up (harder sentences, stronger monsters) with level-up animation
- Every 5th level: Boss battle (HP ×3, size ×1.5, gold glow)
- Combo system: every 5 consecutive correct inputs = CRIT (×2 damage)
- Pause anytime with ESC or P
- High score saved in localStorage
- End screen shows accuracy % and peak combo
- Supports physical keyboard and on-screen virtual keyboard
- Tiered sentence pool: 100 sentences across 3 difficulty tiers (初學/中級/高級)
