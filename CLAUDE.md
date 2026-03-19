# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

注音打字大冒險 — a browser-based Zhuyin (Bopomofo) typing practice game where players type zhuyin sequences to defeat monsters. Targeted at Traditional Chinese learners, supports both physical keyboards and on-screen virtual keyboard (mobile/tablet/desktop responsive).

## Commands

- **Dev server**: `npm start` → runs Express on `http://127.0.0.1:10007/zhuyin-game/`
- **No build step, no tests, no linter** — this is a vanilla HTML/JS project served by Express.

## Architecture

Single-page app with all game logic in one file:

- **`src/index.js`** — Express static server. Serves files under `BASE_PATH` (default `/zhuyin-game`), port from `PORT` env var (default `10007`).
- **`src/index.html`** — The entire game: HTML, CSS (`<style>`), and JS (`<script>`) in one file.

### Frontend Stack (all via CDN, no bundler)

- **Vue 3** (global build) — reactive UI: keyboard rendering, sentence display, overlays, game state
- **PixiJS 7** — monster area canvas: sprite rendering, HP bar, bounce animation, death animation

### Game Flow

`phase` ref drives state: `start` → `playing` → `gameover`. During `playing`:
1. `loadSentence()` picks a sentence from `SENTENCES` pool (difficulty scales with `level`)
2. Player types zhuyin symbols matching `flatSentence` array; `cursor` tracks position
3. Correct input advances cursor and damages monster; wrong input triggers `wrongIdx` highlight + 2-second time penalty
4. Timer expires → lose 1 HP; all HP gone → game over
5. Every 3 sentences scored → level up; when monster HP reaches 0 → kill animation + respawn

### Key Data Structures

- `SENTENCES[]` — word pool, each entry: `{ words: [{ h: '漢字', z: ['ㄓ','ㄨ','ˋ'] }] }`
- `KB_ROWS[]` — virtual keyboard layout matching Taiwan standard zhuyin keyboard mapping
- `KEY_TO_ZH{}` — maps physical key (e.g. `'5'`) → zhuyin symbol (e.g. `'ㄓ'`)

### Input Handling

Uses `keyup` events (not `keydown`) to avoid key-repeat and IME composition false triggers. Mobile uses a hidden `<input>` element for focus. Virtual keyboard buttons fire `pressKey()` directly.

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) auto-deploys on push to `main` via SSH to VPS. Runs behind nginx reverse proxy at `/zhuyin-game/`.
