# 加入靜態背景圖片

- **分支:** `feat/add-background`
- **日期:** 2026-03-19

## 描述
使用 Kenney background-elements 素材包中的 Flat 分層元素，在 PixiJS canvas 中自行組裝多層背景，取代原本的深藍星空背景。採用日景明亮風格（淺藍天空 + 綠色山丘 + 棕色地面），前景搭配松樹和城堡裝飾。

## 任務清單
- [x] 在 `initPixi()` 中載入 Flat 背景素材 (clouds1/2, pointy_mountains, hills1/2, tree01/02/03, castle)
- [x] 新增 `buildBackground(W, H)` 函式組裝分層背景（雲 → 遠山 → 山丘 → 地面 → 樹木城堡）
- [x] 在 `spawnMonster()` 中呼叫 `buildBackground()`，取代星星繪製
- [x] 調整 `backgroundColor` 為天空藍 `0x87CEEB`
- [x] 更新 CSS `#monster-area` 背景色配合新色調
- [x] 確認 resize 時背景正確縮放
- [x] 視覺微調（元素位置、tint 顏色、層次比例）
