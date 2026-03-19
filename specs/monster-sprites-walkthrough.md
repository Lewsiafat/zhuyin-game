# 套用 Kenney Monster Builder Pack 素材 — Walkthrough

- **分支:** `feat/monster-sprites`
- **日期:** 2026-03-19

## 變更摘要
使用 Kenney Monster Builder Pack 的 spritesheet 取代原本 PixiJS Graphics 手繪的簡易怪物。每次生成怪物時從 6 色 × 多種部件中隨機組合，產生豐富多變的怪物外觀。同時調整怪物區域佈局，改為 flex 自動填滿剩餘空間，並加入 resize 自適應。

## 修改的檔案
- **`src/index.html`** — 主要變更：
  - 新增 `loadMonsterSheet()`：fetch XML atlas + 建立 PIXI.Texture 字典
  - 重寫 `spawnMonster()`：隨機選色 + body/arm/leg/eye/mouth/detail 組合怪物 Sprite
  - 新增 `syncCanvasSize()` / `resizePixi()`：canvas 尺寸與 monster-area 同步
  - `initPixi()` / `startGame()` 改為 async，等待 spritesheet 載入
  - CSS `#monster-area` 改為 `flex:1 1 auto` 自動填滿空間
  - HP 條放大（140px 寬、16px 高、14px 字體）
- **`src/assets/monsters/spritesheet_default.png`** — 新增：怪物部件 spritesheet
- **`src/assets/monsters/spritesheet_default.xml`** — 新增：spritesheet atlas 定義
- **`specs/monster-sprites.md`** — 任務規格文件

## 技術細節
- 使用單張 spritesheet + XML atlas，透過 `DOMParser` 解析後建立 `PIXI.Texture` 字典，避免逐張載入圖片
- 怪物組合：6 色 × 6 body × 5 arm × 5 leg × 14 eye × 14 mouth × 6 detail = 數十萬種組合
- 部件疊加順序：legs → arms → body → details → eyes → mouth
- HP 條使用 `1/sc` 反向縮放，確保不受怪物縮放影響
- 怪物高度計算包含 body + legs，預留 HP bar 空間和底部 padding，自動置中
- 視窗 resize 時自動重算 canvas 尺寸並重生怪物
