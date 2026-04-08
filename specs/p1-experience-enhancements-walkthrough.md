# feat: P1 體驗強化 — Walkthrough

- **分支:** `feat/p1-experience-enhancements`
- **日期:** 2026-04-08

## 變更摘要

為注音打字遊戲加入五項體驗強化：答錯時鍵盤上的正確目標鍵黃色發光提示（0.8 秒消退）、ESC/P 暫停功能（限時模式計時同步暫停/恢復）、遊戲結束畫面新增正確率與最高連擊統計、每第 5 關出現 Boss（HP x3、體型 x1.5、金色外框）、等級提升時在怪物區閃現「⬆ Lv.X！」動畫。

## 修改的檔案

| 檔案 | 說明 |
|------|------|
| `src/index.html` | 主程式：新增 CSS、JS 邏輯、HTML 模板更新（含全部 5 項 P1 功能） |
| `specs/p1-experience-enhancements.md` | 規格文件（任務清單全部打勾） |
| `specs/p1-experience-enhancements-walkthrough.md` | 本文件 |

## 技術細節

### 答錯高亮提示（答錯目標鍵）

新增 `ZH_TO_KEY` 反查表（`KB_ROWS` 平展後反轉），在 `handleInput` 答錯時取得正確鍵的 `en` key 並存入 `wrongHintKey` ref。

```js
wrongHintKey.value = ZH_TO_KEY[flatSentence.value[cursor.value]] || '';
wrongHintTimer = setTimeout(()=>{ wrongHintKey.value=''; wrongHintTimer=null; }, 800);
```

鍵盤模板加上 `:class` 判斷：`hint: wrongHintKey===k.en`。CSS `.kkey.hint` 使用黃色發光 + 脈衝動畫。

### 暫停功能

新增 `isPaused` ref 和 `togglePause()` 函式。`onKeyDown` 攔截 ESC/P 鍵呼叫 `togglePause()`；`handleInput` 和 `pressKey` 在 `isPaused` 為 true 時直接 return，確保暫停期間不接受輸入。

暫停時：`clearInterval(timerInterval)`。繼續時：若限時模式且 `timeLeft>0`，重新建立 interval（以現有 `timeLeft` 繼續倒數）。顯示 `#pause-overlay`（z-index: 200，黑底玻璃效果）。

### 結束畫面統計

新增 `totalPresses`、`correctPresses`、`maxComboReached` 三個 ref，以及 computed `accuracy`：

```js
const accuracy = computed(()=> totalPresses.value===0 ? 100 : Math.round(correctPresses.value/totalPresses.value*100));
```

`handleInput` 每次有效按鍵後 `totalPresses++`；答對則 `correctPresses++`、比較並更新 `maxComboReached`。`startGame()` 重置三個 ref。結束畫面新增一行：🎯 正確率 + ⚡ 最高連擊。

### Boss 關卡

`isBossLevel` computed：`level.value > 0 && level.value % 5 === 0`。

`spawnMonster()` 最開頭計算 `isBoss`，用於：
- HP：`monsterMaxHP = (5+level*2) * (isBoss ? 3 : 1)`
- 體型：`sc = isBoss ? Math.min(baseSc*1.5, 2.2) : baseSc`
- 外觀：`#monster-area` 加上 CSS class `.boss-glow`（金橘色光暈）+ 右上角 `#boss-label`（👑 BOSS 紅色標籤）

### 升級動畫

新增 `levelupMsg` ref（DOM）和 `showLevelup(lv)` 函式：設文字為 `⬆ Lv.X！`，重置 `.show` class 後加回（利用 `offsetWidth` reflow 重啟 animation）。

`watch(level, ...)` 監聽升級事件：僅在 `phase==='playing'` 且新值大於舊值時觸發。CSS `@keyframes levelup` 讓文字從中心縮小浮現、放大後向上飄出淡去（1 秒）。

### Vue / 引入調整

- `Vue` 解構新增 `watch`
- `return {}` 補上全部新增的 refs / computed / 函式
