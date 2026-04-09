# hotfix: 暫停按鈕 + P 鍵衝突修正 — Walkthrough

- **分支:** `main`
- **日期:** 2026-04-09

## 變更摘要

在 v0.3.0 後修正兩項問題：新增 HUD 暫停按鈕並強化暫停選單（停止/繼續/新遊戲/音效/音樂開關），以及移除 P 鍵暫停快捷鍵（P 對應注音 ㄣ，原快捷鍵會阻斷輸入）。

## 修改的檔案

| 檔案 | 說明 |
|------|------|
| `src/index.html` | 新增 HUD 暫停按鈕、強化暫停選單、移除 P 鍵快捷鍵、更新提示文字 |
| `specs/hotfix-pause-p-key-walkthrough.md` | 本文件 |

## 技術細節

### 暫停按鈕 + 選單強化

HUD 右上角新增 `<button id="pause-btn">⏸</button>`（`v-if="phase==='playing'"`），點擊呼叫 `togglePause()`。

暫停 overlay 重新設計為卡片式 `#pause-card`，包含：
- ▶ 繼續遊戲（`togglePause`）
- 🔄 新遊戲（`restartGame`）
- 🏠 停止遊戲（`quitGame`）
- 🔔/🔕 音效開關（`toggleSFX`，`sfxMuted` module 變數 + `isSfxMuted` ref）
- 🎵/🎶 音樂開關（`toggleBGM`）

新增 `sfxMuted` 模組變數；`playSound()` 加入 `if (sfxMuted) return;` 前置檢查。

### P 鍵衝突修正

原 `onKeyDown` 以 `e.key.toLowerCase()==='p'` 攔截暫停，與注音鍵盤 `ㄣ`（對應 `p` 鍵）衝突。

修正為僅保留 ESC：
```js
// Before
if(phase.value==='playing' && (e.key==='Escape' || e.key.toLowerCase()==='p')){
// After
if(phase.value==='playing' && e.key==='Escape'){
```

同步更新暫停選單提示文字（「ESC 或 P 繼續」→「按 ESC 或點選繼續」）及按鈕 `title` 屬性。
