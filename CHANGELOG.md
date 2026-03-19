# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/).

## [0.2.0] - 2026-03-19

### Added
- 怪物 sprite 系統：使用 Kenney Monster Builder Pack spritesheet 組合隨機怪物，取代手繪圓形
- 多層背景場景：使用 Kenney Background Elements 素材包，在 PixiJS canvas 中組裝日景背景（天空、雲、遠山、綠色山丘、地面、松樹、城堡）

## [0.1.1] - 2026-03-19

### Fixed
- 修正 HUD 中 `i<=hp` 的 `<` 符號導致 HTML parse error，改用 `hp>=i`

## [0.1.0] - 2026-03-19

### Added
- 注音打字遊戲核心玩法：打注音擊敗怪物
- Vue 3 + PixiJS 7 前端（單頁 HTML，CDN 載入）
- 台灣標準注音虛擬鍵盤，支援手機/平板/桌機
- 怪物系統：HP、擊殺動畫、隨等級增強
- 計時器 + 打錯扣 2 秒時間懲罰
- 句子池依等級分段選取
- Express 靜態伺服器（生產部署）
- Vite dev server（開發用，`npm run dev`）
- GitHub Actions 自動部署至 VPS

### Fixed
- 修正實體鍵盤快速打字時，事件重複觸發導致正確輸入誤判為錯誤
- 修正虛擬鍵盤空白鍵文字溢出截斷
- 修正怪物消失 bug、wrongIdx 競態條件
- 修正 IME 組字與按鍵重複觸發問題
