# feat: P2 精緻化功能 — Walkthrough

- **分支:** `feat/p2-polish-features`
- **日期:** 2026-04-08

## 變更摘要

為注音打字遊戲加入四項精緻化功能：Web Audio 程序生成背景音樂（HUD 靜音切換）、8 個條件型成就系統（Toast 通知 + localStorage 持久化）、LCG seeded 每日挑戰（固定 5 句、每日一次）、10 步驟互動教學關卡（鍵盤高亮引導）。

## 修改的檔案

| 檔案 | 說明 |
|------|------|
| `src/index.html` | 主程式：新增 CSS 樣式、P2 JS 系統、HTML 模板更新（全部 4 項功能） |
| `specs/p2-polish-features.md` | 規格文件（任務清單全部打勾） |
| `specs/p2-polish-features-walkthrough.md` | 本文件 |

## 技術細節

### 背景音樂（BGM）

在 `createApp` 之前定義：
- `BGM_NOTES[]`：16 個音符頻率（C5~G5 範圍的旋律）
- `BGM_DURS[]`：對應音符時值（0.3~0.6 秒）
- `scheduleBGMNote()`：遞迴 setTimeout 排程，每次建立一個三角波 `OscillatorNode` + 共享 `bgmGain`，音量 0.055

`bgmMuted = true`（預設靜音），HUD 新增 `<button id="bgm-btn">` 呼叫 `toggleBGM()`。`startGame()` 會在遊戲開始時自動啟動（若非靜音），`doGameOver()` 呼叫 `stopBGM()`。

### 成就系統

定義 `ACHIEVEMENTS[]`（8 個：`first_kill`, `combo10`, `score50`, `boss_kill`, `perfect`, `level10`, `daily`, `tutorial`），`ACH_KEY = 'zhuyin_achievements'`。

`unlockAch(id)` 檢查 `unlockedAchs` Set，未解鎖則寫入 localStorage 並設定 `achToast` ref（3.2 秒後清除）。

觸發點：
- `killMonster()` → `first_kill`、`boss_kill`（判斷 `isBossLevel`）
- `handleInput()` 連擊 ≥10 → `combo10`
- 句子完成 score ≥50 → `score50`
- `doGameOver()` → `perfect`（100% 且 ≥20 鍵）、`level10`（level ≥10）
- 每日完成 → `daily`
- 教學完成 → `tutorial`

HTML：`#ach-toast`（position:fixed, bottom:80px）帶 slide-in animation。

### 每日挑戰

`seededRng(seed)` — LCG 算法：`s = Math.imul(s, 1664525) + 1013904223 >>> 0`。

`getTodayKey()` — 返回 `YYYYMMDD` 字串，作為 seed 整數。

`getDailySentences()` — 從 100 句全池中用 LCG 隨機選 5 句（無重複）。

儲存格式：`DAILY_KEY = 'zhuyin_daily'`，JSON `{ date: '20260408', score: 3 }`。

模式選單新增 daily 卡片，`startDaily()` 檢查 `dailyDoneToday`，呼叫 `startGame(null, true)` 設定 `mode = 'daily'`。`loadSentence()` 依 `dailyIdx` 從 `dailySentences` 取句，完成第 5 句後觸發 `saveDailyResult()` + `doGameOver()`。

### 教學關卡

`TUTORIAL_STEPS[]` — 10 步驟，每步 `{ key, zh, hint }`（ㄅ→1, ㄆ→Q, ㄇ→A, ㄉ→2, ㄧ→U, ㄨ→J, ㄚ→8, ㄞ→9, ˇ→3, ˋ→4）。

`phase = 'tutorial'` 觸發：
- `#monster-area` 內顯示 `#tutorial-panel`（絕對定位覆蓋 canvas）
- `tutTargetKey` computed 從當前步驟提取 key，鍵盤 `:class` 加入 `tutTargetKey===k.en` → `.hint` 黃色高亮
- `handleTutInput(key)` 比對後推進或 `tutWrong` 閃紅（600ms）
- 完成後 2.2s 自動返回 start 畫面並 `unlockAch('tutorial')`

`onKeyDown` 和 `pressKey` 均優先判斷 `phase === 'tutorial'`，路由至 `handleTutInput()`。
