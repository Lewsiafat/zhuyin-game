# 套用 Kenney Monster Builder Pack 素材

- **分支:** `feat/monster-sprites`
- **日期:** 2026-03-19

## 描述
使用 Kenney Monster Builder Pack 的 spritesheet 素材取代現有 PixiJS Graphics 手繪怪物，每次生成怪物時隨機組合部件（body、arm、leg、eye、mouth、detail），讓怪物外觀更豐富多變。

## 任務清單
- [x] 載入 `spritesheet_default.png` + 解析 XML atlas，建立 PixiJS spritesheet textures
- [x] 重寫 `spawnMonster()`：隨機選顏色 → 隨機選 body/arm/leg 樣式 → 隨機選 eye/mouth/detail
- [x] 用 PixiJS Container 將各部件 Sprite 按正確相對位置疊加組合
- [x] 保留現有彈跳動畫、HP 條、受傷閃爍、死亡縮小動畫
- [x] 確認 mobile/desktop 不同尺寸下怪物顯示正常（適當縮放）
- [x] 確認素材路徑在 dev server 與 production server 下皆可正確存取
