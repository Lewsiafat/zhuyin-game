# 注音打字大冒險

瀏覽器注音符號打字練習遊戲，打出正確注音來擊敗怪物！

## 快速開始

```bash
npm install

# 開發模式（自動重新載入）
npm run dev

# 生產環境
npm start
```

## 技術堆疊

- **Vue 3**（CDN 全域建構）— 響應式 UI
- **PixiJS 7**（CDN）— 怪物畫布渲染
- **Express** — 生產環境靜態伺服器（port 10007，路徑 `/zhuyin-game`）
- **Vite** — 開發伺服器，支援熱重載

## 架構

單頁應用，所有程式碼在 `src/index.html`（HTML + CSS + JS 合一）。

- `src/index.js` — Express 靜態伺服器，用於生產部署
- `src/index.html` — 遊戲 UI、邏輯、鍵盤、PixiJS 怪物與背景渲染
- `assets/kenney_background-elements/` — Kenney 背景元素素材（Public Domain）
- `assets/kenney_monster-builder-pack/` — Kenney 怪物組裝素材（Public Domain）
- `specs/` — 開發任務紀錄
- `.github/workflows/deploy.yml` — push 到 main 時自動部署至 VPS

## 遊戲機制

- 打出注音符號對怪物造成傷害
- 打錯：扣 2 秒時間
- 時間到：扣 1 顆 HP（共 3 顆）
- 每完成 3 句：升級（更難的句子、更強的怪物）
- 支援實體鍵盤與螢幕虛擬鍵盤
