# feat: P0 核心體驗強化 — Walkthrough

- **分支:** `feat/p0-core-improvements`
- **日期:** 2026-04-08

## 變更摘要

將注音打字遊戲的句庫從 32 句三倍擴充至 100 句，加入 localStorage 高分存檔系統（開始與結束畫面皆顯示），並以 Web Audio API 合成五種遊戲音效（打對、爆擊、怪物死亡、答錯、遊戲結束）。

## 修改的檔案

| 檔案 | 說明 |
|------|------|
| `src/index.html` | 主程式：句庫擴充、高分邏輯、音效引擎、UI 更新、CSS 新增 |
| `specs/p0-core-improvements.md` | 規格文件（任務清單） |
| `specs/p0-core-improvements-walkthrough.md` | 本文件 |

## 技術細節

### 句庫擴充（32 → 100 句）

`SENTENCE_TIERS` 各層均衡補充：

| 層級 | 舊 | 新 | 內容特點 |
|------|----|----|----------|
| Tier 1 初學 | 12 | 30 | 2-3字、常見稱謂、日常動詞、顏色 |
| Tier 2 中級 | 12 | 40 | 3-5字、複合韻母、日常生活場景、台灣文化 |
| Tier 3 高級 | 8  | 30 | 5字以上、成語典故、捲舌音、古詩句 |

新增例句：「溫故而知新」「三人行必有我師」「書中自有黃金屋」「一寸光陰一寸金」「早起的鳥兒有蟲吃」等。

### localStorage 高分存檔

- Key：`zhuyin_best_score`
- `bestScore` ref 在 `setup()` 初始化時從 localStorage 讀取
- `doGameOver()` 新函式集中處理遊戲結束邏輯（原分散於 `onTimerExpire`）：
  ```js
  function doGameOver() {
    if (score.value > bestScore.value) {
      bestScore.value = score.value;
      localStorage.setItem(HS_KEY, String(score.value));
      isNewBest.value = true;
    }
    playSound('gameover');
    phase.value = 'gameover';
  }
  ```
- 開始畫面：`v-if="bestScore>0"` 才顯示最高分 chip（新玩家不顯示）
- 結束畫面：固定顯示最高分 + `isNewBest` 觸發「🎉 新紀錄！」脈衝動畫

### Web Audio API 音效系統

純合成音效，零外部資源。所有聲音用 OscillatorNode + GainNode 組合：

```js
let audioCtx = null;
function ensureAudio() { /* lazy init + resume suspended ctx */ }
function playSound(type) { /* 5 sound types */ }
```

| 音效類型 | 觸發時機 | 波形 | 頻率 |
|---------|---------|------|------|
| `hit` | 每個答對字符 | sine | 880Hz → 淡出 |
| `crit` | 5連擊爆擊觸發 | square | 880 → 1320Hz 雙音 |
| `kill` | 怪物 HP 歸零 | sawtooth | 600 → 80Hz 下滑 |
| `wrong` | 答錯 | sawtooth | 180Hz 低嗡 |
| `gameover` | 遊戲結束 | sine | 440 → 220Hz 收尾 |

- `ensureAudio()` 在 `startGame()` 時呼叫以滿足瀏覽器 autoplay policy（必須用戶手勢後才能建立 AudioContext）
- 所有 `playSound()` 包在 try-catch，音效錯誤不影響遊戲

### 其他細節
- `pressKey()` / `startGame()` 均觸發 `ensureAudio()` 確保行動裝置也能正常發聲
- CSS 新增 `.best-score-chip`（金邊圓角標籤）和 `.new-best-badge`（脈衝金色字）
