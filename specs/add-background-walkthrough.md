# 加入靜態背景圖片 — Walkthrough

- **分支:** `feat/add-background`
- **日期:** 2026-03-19

## 變更摘要
將怪物區域的深藍星空背景替換為使用 Kenney background-elements 素材包組裝的多層日景背景。背景由淺藍天空、白色雲朵、灰藍遠山、綠色山丘、棕色地面，以及彩色松樹與城堡裝飾組成。

## 修改的檔案
- **`src/index.html`** — 主要變更：
  - 新增 `loadBgTextures()` 載入背景素材（Flat 條帶 + 彩色個別元素）
  - 新增 `buildBackground(W, H)` 組裝多層背景 Container
  - 修改 `initPixi()` 加入背景素材載入，backgroundColor 改為 `0x87CEEB`
  - 修改 `spawnMonster()` 以 `buildBackground()` 取代星星繪製
  - CSS `#monster-area` 背景色從深藍漸層改為 `#87CEEB`
- **`assets/kenney_background-elements/`** — 新增 Kenney 背景素材包（Public Domain）
- **`src/assets/kenney_background-elements`** — symlink 指向素材包，供 Vite dev server 使用
- **`specs/add-background.md`** — 任務規格文件
- **`specs/add-background-walkthrough.md`** — 本 walkthrough

## 技術細節
- 背景分層使用 PixiJS Container，每次 `spawnMonster()` 時重建，確保 resize 正確
- Flat 條帶素材（hills、mountains、clouds strips）為淺藍單色剪影，透過 `sprite.tint` 上色
- 個別裝飾元素（tree02/03、cloud1/2、castle_beige、sun）使用彩色版 PNG，不需 tint
- 所有元素位置和大小使用 canvas 寬高的比例值，自適應不同螢幕尺寸
