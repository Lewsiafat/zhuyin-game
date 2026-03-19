# 修正輸入正確注音時觸發下一個注音錯誤 — Walkthrough

- **分支:** `fix/correct-triggers-next-wrong`
- **日期:** 2026-03-19

## 變更摘要
修正實體鍵盤快速打字時，正確輸入會同時觸發下一個注音錯誤判定的問題。根因是 hidden input 的 Vue 事件綁定與 window listener 重複註冊，導致同一個按鍵事件觸發 `handleInput` 兩次。

## 修改的檔案
- `src/index.html` — 移除 hidden input 上多餘的 `@keydown.prevent` 和 `@keyup` 綁定，改回 `keydown` 處理輸入並加上 `e.repeat` 過濾

## 技術細節
- **根因：** `<input>` 上的 `@keydown.prevent="onKeyDown"` 與 `window.addEventListener('keydown', onKeyDown)` 同時存在，當焦點在 input 時事件冒泡導致 handler 執行兩次。第一次正確推進 cursor，第二次用同一個 key 對上新 cursor 位置觸發錯誤。
- **修正：** 移除 input 上的 `@keydown` / `@keyup` 綁定，僅保留 window listener 作為唯一的鍵盤事件來源。
- **額外改進：** 將輸入處理從 `keyup` 改回 `keydown` 搭配 `e.repeat` 過濾，避免快速打字時因按鍵釋放順序不一致產生的潛在問題。
