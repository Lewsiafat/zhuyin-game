# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/).

## [0.4.0] - 2026-04-09

### Added
- 背景音樂（BGM）：Web Audio API 程序生成三角波旋律迴圈（16 音符），預設靜音，可在暫停選單切換
- 成就系統：8 個條件型成就（首殺、連擊 10、破 50 分、Boss 擊殺、完美通關、Lv.10、每日挑戰、完成教學），Toast 動畫通知 + localStorage 持久化
- 每日挑戰模式：以當天日期為 seed 的 LCG 隨機算法選出固定 5 句題組，每日限玩一次，分數記錄於 localStorage
- 教學關卡：10 步驟互動引導，鍵盤高亮目標鍵 + 提示文字，完成後解鎖成就
- HUD 暫停按鈕（⏸）：遊戲進行中右上角顯示，點擊暫停
- 強化暫停選單：改為卡片式設計，含 繼續/新遊戲/停止遊戲 + 音效/音樂 開關

### Fixed
- 移除 P 鍵暫停快捷鍵（P 對應注音 ㄣ，會阻斷輸入），保留 ESC 暫停

## [0.3.0] - 2026-04-08

### Added
- 句庫擴充：從 32 句增加至 100 句，分三階（初學 30 句、中級 40 句、高級 30 句）
- localStorage 最高分紀錄，開始畫面顯示歷史最高分，結束畫面顯示新紀錄徽章
- Web Audio API 合成音效引擎（一般擊中、爆擊、擊殺、答錯、遊戲結束共 5 種）
- 答錯時正確目標鍵黃色脈衝高亮，0.8 秒後自動消退
- ESC / P 鍵暫停功能，顯示 PAUSED overlay，限時模式計時同步暫停／恢復
- 結束畫面新增正確率（%）與本局最高連擊數統計
- Boss 關卡：每第 5 關（Lv.5, 10, 15…）怪物 HP x3、體型 x1.5、金橘色外框光暈 + 紅色 BOSS 標籤
- 升級動畫：等級提升時在怪物區顯示「⬆ Lv.X！」浮現淡出動畫（1 秒）

### Fixed
- 修正 `kenney_background-elements` 為 Mac 本地路徑 symlink 導致 VPS 404 的問題，改為將素材直接納入 repo（CC0 授權）

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
