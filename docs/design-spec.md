# Design Spec — 個人履歷網站（8-bit 像素風格）

> 版本：1.0 | 日期：2026-03-10
> 目標專案：React + TypeScript + Tailwind CSS v4 + Framer Motion
> 設計風格：8-bit 像素風 × 深色極簡主義（Dark Pixel Minimalism）
> 風格參考：www.8bitcn.com 復古像素美學

---

## 1. 頁面目的與用戶流程

### 頁面目的
前端工程師個人履歷展示，目標是讓招聘方在 30 秒內掌握求職者核心技能、工作經歷與聯絡方式。
採用 8-bit 像素風格作為差異化設計語言，呈現開發者個性與技術深度。

### 目標用戶
- 招聘主管（HR）
- 技術主管（Tech Lead）
- 前端工程師社群

### 進入路徑
外部連結 / 直接輸入 URL → 著陸在 Hero 區塊

### 完成後行動
點擊 Email 或電話聯繫 → 跳轉 mailto: / tel:

### 主要操作流程（由上而下單頁滾動）

```
[Hero] 個人介紹 + 照片
   ↓ 滾動
[Work Experience] 工作經歷 + Side Projects
   ↓ 滾動
[Technical Skills] 硬技能 + 軟技能
   ↓ 滾動
[Education] 學歷
   ↓ 滾動
[Contact] CTA 聯絡區
   ↓
[Footer] 版權
```

---

## 2. 整體版面結構

### 全頁總覽（Desktop）

```
┌─────────────────────────────────────────────────────────┐
│  [CW]                           關於  經歷  技能  聯絡   │  ← Navbar fixed top，捲動後毛玻璃
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌───────────────────────┐   ┌──────────────────────┐  │
│  │ Hi, my name is        │   │  ┌──────────────────┐│  │
│  │ 游承緯                 │   │  │   [像素邊框]      ││  │
│  │ Cheng-Wei Yu          │   │  │   profile.jpg    ││  │
│  │ Front-End Engineer    │   │  └──────────────────┘│  │
│  │ [Bio text]            │   └──────────────────────┘  │
│  │ [Email] [Phone]       │                              │
│  └───────────────────────┘                              │
│                      HERO SECTION                       │
├─────────────────────────────────────────────────────────┤
│  01. Work Experience ─────────────────────────────────  │
│  ┌─────────────────────────────────────────────────┐   │
│  │  像素邊框工作卡片（full width）                    │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  Side Projects                                          │
│  ┌───────────────────┐  ┌───────────────────┐          │
│  │ 像素卡片           │  │ 像素卡片           │          │
│  └───────────────────┘  └───────────────────┘          │
├─────────────────────────────────────────────────────────┤
│  02. Technical Skills ────────────────────────────────  │
│  [Core Pills] [Core Pills] [Tech Pills] [Tech Pills]... │
│                                                         │
│  Other Strengths                                        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐               │
│  │ Icon + 文 │ │ Icon + 文 │ │ Icon + 文 │               │
│  └──────────┘ └──────────┘ └──────────┘               │
├─────────────────────────────────────────────────────────┤
│  03. Education ───────────────────────────────────────  │
│  ┌─────────────────────────────────────────────────┐   │
│  │ [Icon]  樹德科技大學 / 資訊工程系      2018—2022 │   │
│  └─────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│                    [像素裝飾光暈]                         │
│            Get In Touch                                 │
│       Let's Build Something Together                    │
│           [Email Button]  [Phone Button]                │
├─────────────────────────────────────────────────────────┤
│              游承緯 · Built with React + TypeScript      │
└─────────────────────────────────────────────────────────┘
```

### Mobile 版（375px）

```
┌──────────────────────────┐
│ [CW]       關於  經歷  技能 │  ← Navbar compact
├──────────────────────────┤
│   ┌────────────────────┐ │
│   │  [像素邊框照片]      │ │
│   └────────────────────┘ │
│   游承緯                  │
│   Cheng-Wei Yu           │
│   Front-End Engineer     │
│   Bio...                 │
│   [Email Button]         │
│   [Phone Button]         │
├──────────────────────────┤
│  01. Work Experience     │
│  ┌──────────────────────┐│
│  │  像素卡片（full）     ││
│  └──────────────────────┘│
│  Side Projects           │
│  ┌──────────────────────┐│
│  │ 像素卡片              ││
│  └──────────────────────┘│
│  ┌──────────────────────┐│
│  │ 像素卡片              ││
│  └──────────────────────┘│
├──────────────────────────┤
│  02. Technical Skills    │
│  [Pills 流動排列]         │
│  ┌──────────┐┌──────────┐│
│  │ Icon + 文 ││ Icon + 文 ││
│  └──────────┘└──────────┘│
├──────────────────────────┤
│  03. Education           │
│  ┌──────────────────────┐│
│  │ Icon + 學校            ││
│  └──────────────────────┘│
├──────────────────────────┤
│     Get In Touch         │
│  Let's Build Something   │
│   [Email Button]         │
│   [Phone Button]         │
├──────────────────────────┤
│   游承緯 · React ...     │
└──────────────────────────┘
```

---

## 3. 色彩使用規範

### 現有基礎色票（保留）

| 角色 | 名稱 | Hex | Tailwind Token | 用途 |
|------|------|-----|----------------|------|
| 主背景 | navy | `#0a192f` | `bg-navy` | 全頁底色 |
| 卡片背景 | navy-light | `#112240` | `bg-navy-light` | Card 背景 |
| 卡片邊框底 | navy-lightest | `#233554` | `border-navy-lightest` | 分隔線、邊框 |
| 強調色 | accent | `#10b981` | `text-accent` | 像素裝飾、CTA 主按鈕 |
| 強調亮 | accent-light | `#34d399` | `text-accent-light` | hover 狀態、編號 |
| 強調淡底 | accent-tint | `rgba(16,185,129,0.1)` | `bg-accent-tint` | Tag 背景 |
| 主文字 | slate-200 | `#e6f1ff` | `text-slate-200` | 標題、重要文字 |
| 次文字 | slate-400 | `#a8b2d1` | `text-slate-400` | 正文 |
| 輔助文字 | slate-500 | `#8892b0` | `text-slate-500` | 說明文字 |
| 弱化文字 | slate-600 | `#495670` | `text-slate-600` | 時間、標籤 |

### 8-bit 風格擴充色票

| 角色 | 名稱 | Hex | 用途 |
|------|------|-----|------|
| 像素紅 | pixel-red | `#ff6b6b` | 錯誤狀態、像素裝飾點 |
| 像素黃 | pixel-yellow | `#ffd93d` | Warning、像素裝飾 |
| 像素藍 | pixel-blue | `#4ecdc4` | Info 狀態 |
| 掃描線覆蓋 | scanline | `rgba(0,0,0,0.03)` | 全頁掃描線紋理 |

### 色彩使用原則
- 背景絕不使用純黑 `#000000`，最深用 `#0a192f`
- 所有文字需達 WCAG AA 對比度（4.5:1）
- accent 色只用於互動元素、裝飾重點，不做大面積填充
- 8-bit 像素邊框優先用 `border-navy-lightest` 或 `border-accent/30`

---

## 4. 字體大小與粗細規範

### 字體引入策略

```css
/* 8-bit 風格標題字體（強烈像素感） */
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323:wght@400&family=Silkscreen:wght@400;700&display=swap');
```

### 字體角色分配

| 角色 | 字體 | 使用場景 | 備注 |
|------|------|---------|------|
| 8-bit Display | `Press Start 2P` | Section 編號（01. 02. 03.）、特殊裝飾文字 | 高辨識度像素感 |
| 8-bit Body | `VT323` | 技術 Tag、時間戳、終端機風格文字 | 更易讀的像素字體 |
| 系統正文 | `Space Grotesk` | 段落文字、卡片內容 | 保留現有，清晰可讀 |
| CJK | `Noto Sans TC` | 中文內容 | 保留現有 |
| Monospace | `JetBrains Mono` | 程式碼片段、scramble 動畫文字 | 保留現有 |

### 字體大小階層

| 層級 | 用途 | Mobile | Desktop | 粗細 | Tailwind Class |
|------|------|--------|---------|------|----------------|
| Display | 姓名 h1 | `text-4xl` (2.25rem) | `text-6xl` (3.75rem) | 700 | `font-bold tracking-tight` |
| H2 | Section 標題 | `text-2xl` (1.5rem) | `text-3xl` (1.875rem) | 700 | `font-bold tracking-tight` |
| H3 | 卡片標題 | `text-lg` (1.125rem) | `text-lg` | 600 | `font-semibold` |
| Body | 正文說明 | `text-base` (1rem) | `text-base` | 400 | `leading-relaxed` |
| Small | Tag、輔助 | `text-xs` (0.75rem) | `text-sm` (0.875rem) | 400 | `font-mono` |
| Pixel | Section 編號 | `text-base` | `text-xl` | 400 | `font-[Press_Start_2P]` |

### Section 編號樣式（8-bit 核心元素）

```tsx
// 改用 Press Start 2P 字體強化像素感
<span className="font-['Press_Start_2P'] text-sm md:text-base text-accent-light">
  01.
</span>
```

---

## 5. 間距系統

### 全域容器

```
max-w-5xl mx-auto px-6 md:px-10 lg:px-16
```

### Section 間距

| 元素 | Mobile | Desktop | Tailwind |
|------|--------|---------|----------|
| Section 垂直間距 | `py-20` | `py-32` | `py-20 md:py-32` |
| Section heading → 內容 | `mb-10` | `mb-12` | `mb-10 md:mb-12` |
| 卡片內部 padding | `p-5` | `p-8` | `p-5 md:p-8` |
| 卡片間 gap | `gap-4` | `gap-4` | `gap-4` |
| Tag 群組 gap | `gap-2` | `gap-2` | `gap-2` |
| 按鈕 padding | `px-5 py-2.5` | `px-6 py-3` | `px-5 py-2.5 md:px-6 md:py-3` |

### 像素邊框間距原則
8-bit 風格卡片使用 `border-2` 而非 `border`，製造明顯的「像素」邊框感。
卡片角落一律 `rounded-none`（方角），強化復古感。

---

## 6. RWD 版面變化

| Breakpoint | 寬度 | 版面描述 | 關鍵變化 |
|------------|------|---------|---------|
| Mobile | 375px ~ 639px | 單欄堆疊，照片在上方 | 按鈕全寬堆疊、Side Projects 單欄 |
| sm | 640px ~ 767px | 按鈕同行，Projects 保持單欄 | `flex-row` 按鈕群 |
| md | 768px ~ 1023px | 雙欄（Hero 左右分列）、Navbar 顯示完整 | `grid-cols-[1fr_auto]` Hero |
| lg | 1024px ~ 1279px | 完整桌面版，Side Projects 雙欄 | 字體放大、間距加大 |
| xl | 1280px+ | 同 lg，內容居中更寬敞 | max-w-5xl 依然控制寬度 |

### 關鍵 RWD 行為

```tsx
// Hero Layout
<div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-14 items-center">

// Side Projects Grid
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

// CTA Buttons
<div className="flex flex-col sm:flex-row gap-3">

// Soft Skills Grid
<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
```

---

## 7. Components 清單

### 7.1 Navbar（固定頂部導覽列）

| 屬性 | 規格 |
|------|------|
| 定位 | `fixed top-0 left-0 right-0 z-50` |
| 捲動前 | `bg-transparent` |
| 捲動後 | `bg-navy/80 backdrop-blur-lg border-b border-navy-lightest/50` |
| 品牌字體 | `Press Start 2P` 或 `font-mono`，顯示 `>CW_` 游標閃爍效果 |
| Nav 連結 hover | 底線從左向右展開（`scale-x-0 → scale-x-100`） |
| 觸控高度 | `py-3`（最小 44px） |

### 8-bit Navbar 強化細節
- 品牌 Logo 改為 `>CW_` 並加入游標閃爍 CSS 動畫
- 捲動後加入 `border-b` 像素感水平線

---

### 7.2 Section Heading（區塊標題）

```
┌─ 01. Work Experience ─────────────────────────────┐
  [像素字] [標題文字]         [水平分隔線延伸至右端]
```

| 屬性 | 規格 |
|------|------|
| 編號字體 | `font-['Press_Start_2P'] text-sm md:text-base text-accent-light` |
| 標題字體 | `Space Grotesk font-bold text-2xl md:text-3xl text-slate-200` |
| 分隔線 | `flex-1 border-t-2 border-navy-lightest`（2px 強化像素感） |
| 底部間距 | `mb-10 md:mb-12` |

---

### 7.3 Work Card（工作卡片）

```
┌──────────────────────────────────────────────┐  ← border-2 border-navy-lightest
│  Front-End Engineer        Jul 2022 — Present │
│  GLSoft                                       │
│  ─────────────────────────────────────────── │  ← pixel divider
│  ▹ 描述文字一                                  │
│  ▹ 描述文字二                                  │
│                                               │
│  [Angular] [TypeScript] [SAP] [REST API]      │
└──────────────────────────────────────────────┘
```

| 屬性 | 規格 |
|------|------|
| 邊框 | `border-2 border-navy-lightest rounded-none` |
| 背景 | `bg-navy-light` |
| hover 效果 | `hover:border-accent/40 transition-colors duration-200` |
| 內部 padding | `p-5 md:p-8` |
| 像素裝飾 | 左上角加入 2×2 像素點陣裝飾（純 CSS pseudo-element） |

---

### 7.4 Side Project Card（Side Project 卡片）

| 屬性 | 規格 |
|------|------|
| 邊框 | `border-2 border-navy-lightest/50 rounded-none` |
| 背景 | `bg-navy-light/50` |
| hover | `hover:border-navy-lightest hover:bg-navy-light transition-all duration-200` |
| 卡片高度 | `min-h-[160px]`（維持一致視覺高度） |

---

### 7.5 Tech Tag / Skill Pill

**8-bit 方角版（取代原有 rounded-full）**

| 類型 | 樣式 | Tailwind |
|------|------|----------|
| Core Skill (強調) | 像素綠底、方角 | `font-['VT323'] text-base px-3 py-1 bg-accent-tint border-2 border-accent/40 text-accent-light rounded-none` |
| Other Skill (次要) | 深藍底、方角 | `font-['VT323'] text-base px-3 py-1 bg-navy-light border-2 border-navy-lightest/40 text-slate-400 rounded-none hover:border-accent/30 hover:text-slate-200` |

---

### 7.6 Button 像素風格

```
┌─────────────────────┐
│ [Icon] Button Label │   ← border-2、方角、像素陰影
└─────────────────────┘
```

**主要 CTA（Email）**

```tsx
className="inline-flex items-center gap-2
           bg-accent hover:bg-accent-light
           text-navy font-semibold
           px-5 py-2.5 md:px-6 md:py-3
           border-2 border-accent
           rounded-none
           shadow-[3px_3px_0px_0px_rgba(16,185,129,0.4)]
           hover:shadow-[1px_1px_0px_0px_rgba(16,185,129,0.4)]
           hover:translate-x-[2px] hover:translate-y-[2px]
           active:shadow-none active:translate-x-[3px] active:translate-y-[3px]
           transition-all duration-100
           cursor-pointer"
```

**次要 CTA（Phone）**

```tsx
className="inline-flex items-center gap-2
           bg-navy-light text-slate-300
           hover:text-slate-200 hover:border-accent/50
           px-5 py-2.5 md:px-6 md:py-3
           border-2 border-navy-lightest
           rounded-none
           shadow-[3px_3px_0px_0px_rgba(35,53,84,0.8)]
           hover:shadow-[1px_1px_0px_0px_rgba(35,53,84,0.8)]
           hover:translate-x-[2px] hover:translate-y-[2px]
           active:shadow-none active:translate-x-[3px] active:translate-y-[3px]
           transition-all duration-100
           cursor-pointer"
```

> 像素按鈕的核心：`shadow-[3px_3px_0px] + hover位移` 模擬像素按下效果，禁止使用 `rounded-*`

---

### 7.7 Profile Photo（個人照片）

```
┌─────────────────────────────────┐
│                                 │  ← 外框：border-2 border-navy-lightest
│   ┌─────────────────────────┐   │  ← 像素內框裝飾
│   │     profile.jpg         │   │
│   └─────────────────────────┘   │
│                                 │
│  ▒▒▒  掃描線紋理覆蓋  ▒▒▒        │  ← ::after 掃描線效果
└─────────────────────────────────┘
```

| 屬性 | 規格 |
|------|------|
| 尺寸 | `w-56 h-64 md:w-72 md:h-80` |
| 邊框 | `border-2 border-navy-lightest` |
| 圓角 | `rounded-none`（方角，像素感） |
| 掃描線 | CSS `::after` pseudo-element，水平條紋 |
| 陰影 | `shadow-[4px_4px_0px_0px_rgba(16,185,129,0.2)]` |

---

### 7.8 Soft Skill Card（軟技能格子）

| 屬性 | 規格 |
|------|------|
| 排列 | `grid grid-cols-2 md:grid-cols-3 gap-4` |
| 樣式 | `flex items-center gap-3 py-2` |
| Icon | Phosphor Icons `weight="duotone"` size=18 `text-accent-light` |
| 文字 | `text-sm text-slate-400 Space Grotesk` |

---

### 7.9 Education Card

| 屬性 | 規格 |
|------|------|
| 樣式 | `border-2 border-navy-lightest/40 rounded-none p-5` |
| 背景 | `bg-navy-light/30` |
| Icon 容器 | `w-10 h-10 bg-accent-tint border-2 border-accent/20 rounded-none flex items-center justify-center` |

---

### 7.10 Footer

| 屬性 | 規格 |
|------|------|
| 邊框 | `border-t-2 border-navy-lightest/30` |
| 像素裝飾 | 左右兩端加入像素點陣圖案（純 CSS） |

---

## 8. 互動行為定義

### hover 效果

| 元素 | hover 行為 | 時長 |
|------|----------|------|
| 像素按鈕（主/次） | 位移 `translate(2px, 2px)` + 陰影縮短 | 100ms |
| Nav 連結 | 底線從左滑入 `scale-x-100` | 200ms |
| Work Card | `border-accent/40` 邊框變色 | 200ms |
| Side Project Card | 背景加深 `bg-navy-light` | 200ms |
| Skill Pill | `border-accent/30 text-slate-200` | 200ms |
| 照片 | `shadow` 像素陰影微調 | 200ms |

### click / tap 行為

| 元素 | tap 行為 |
|------|---------|
| 像素按鈕 | `translate(3px, 3px)` + `shadow-none`（完全按入效果） |
| Nav 連結 | 平滑捲動至對應 section |
| 品牌 Logo | 捲動至頁面頂部 |

### transition / animation

| 動畫名稱 | 觸發 | 實作 |
|---------|------|------|
| 元素入場 | `whileInView` | Framer Motion fadeUp（opacity 0→1, y 24→0） |
| 文字 Scramble | 掛載後自動循環 | requestAnimationFrame + 隨機字元 |
| Navbar 出現 | 頁面載入 | Framer Motion slideDown |
| 像素游標閃爍 | 持續 | CSS `@keyframes blink`，0.8s infinite |
| 掃描線滾動 | 持續 | CSS `@keyframes scanline`，body::before |

### scroll 行為

- `html { scroll-behavior: smooth }` 全局
- Navbar 捲動 24px 後切換毛玻璃背景
- `whileInView` 每個 section 觸發入場動畫（margin: '-80px'）

---

## 9. 狀態設計

### Loading State
（單頁靜態網站，無非同步資料，不需 Loading State）

### Error State
若圖片載入失敗（profile.jpg）：
```tsx
// img 加入 onError fallback
onError={(e) => {
  e.currentTarget.src = '/fallback-avatar.svg'
}}
```
fallback 使用像素風格佔位圖（純 CSS 繪製的人形輪廓）

### Empty State
無（所有資料為靜態常數，不存在空資料情境）

---

## 10. 8-bit 風格專屬設計元素

### 10.1 像素按鈕陰影系統

模擬老式 8-bit 遊戲按鈕的按壓效果：

```css
/* 正常狀態 */
box-shadow: 3px 3px 0px 0px rgba(16, 185, 129, 0.4);

/* hover（半按入） */
box-shadow: 1px 1px 0px 0px rgba(16, 185, 129, 0.4);
transform: translate(2px, 2px);

/* active（全按入） */
box-shadow: none;
transform: translate(3px, 3px);
```

### 10.2 掃描線紋理（CRT 效果）

```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9998;
  pointer-events: none;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.03) 2px,
    rgba(0, 0, 0, 0.03) 4px
  );
}
```

### 10.3 游標閃爍（品牌 Logo）

```css
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.cursor-blink::after {
  content: '_';
  animation: blink 0.8s step-end infinite;
  color: var(--color-accent);
}
```

### 10.4 像素點陣裝飾（Section 點綴）

在 Section 標題右側或卡片角落加入 3×3 像素點陣圖案：

```css
/* 3×3 pixel dot grid decoration */
.pixel-decoration {
  width: 9px;
  height: 9px;
  background-image:
    radial-gradient(circle, var(--color-accent) 1px, transparent 1px);
  background-size: 3px 3px;
  opacity: 0.4;
}
```

### 10.5 像素邊框規格

| 應用場景 | 邊框規格 |
|---------|---------|
| 主要卡片 | `border-2 border-navy-lightest` |
| 照片外框 | `border-2 border-navy-lightest` + pixel shadow |
| Tag 標籤 | `border-2 border-accent/40` 或 `border-2 border-navy-lightest/40` |
| Icon 容器 | `border-2 border-accent/20` |
| Footer 分隔 | `border-t-2 border-navy-lightest/30` |
| Section 分隔線 | `border-t-2 border-navy-lightest` |

> 原則：全站使用 `border-2`（2px）作為標準像素邊框粗細，捨棄 `border`（1px）

---

## 11. 字體載入建議

### Google Fonts 引入（更新 index.css）

```css
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+TC:wght@300;400;500;700&display=swap');
```

### Tailwind v4 @theme 擴充

```css
@theme {
  /* 現有保留 */
  --font-sans: 'Space Grotesk', 'Noto Sans TC', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* 新增 8-bit 字體 */
  --font-pixel: 'Press Start 2P', monospace;
  --font-pixel-body: 'VT323', monospace;

  /* 色票（現有保留） */
  --color-navy: #0a192f;
  --color-navy-light: #112240;
  --color-navy-lightest: #233554;
  --color-slate-600: #495670;
  --color-slate-500: #8892b0;
  --color-slate-400: #a8b2d1;
  --color-slate-300: #ccd6f6;
  --color-slate-200: #e6f1ff;
  --color-accent: #10b981;
  --color-accent-light: #34d399;
  --color-accent-tint: rgba(16, 185, 129, 0.1);

  /* 新增 8-bit 裝飾色 */
  --color-pixel-red: #ff6b6b;
  --color-pixel-yellow: #ffd93d;
  --color-pixel-blue: #4ecdc4;
}
```

---

## 12. 無障礙設計注意事項

### 色彩對比度（WCAG AA，最低 4.5:1）

| 前景 | 背景 | 預估對比 | 狀態 |
|------|------|---------|------|
| `#e6f1ff`（slate-200）| `#0a192f`（navy）| ~14:1 | PASS |
| `#a8b2d1`（slate-400）| `#0a192f`（navy）| ~6.5:1 | PASS |
| `#34d399`（accent-light）| `#0a192f`（navy）| ~8:1 | PASS |
| `#8892b0`（slate-500）| `#0a192f`（navy）| ~4.7:1 | PASS |

> `Press Start 2P` 字體由於字形特殊，建議只用在 `text-sm`（14px）以上確保可讀性

### ARIA 標記規範

```tsx
// Section
<section aria-label="Work experience and side projects">

// 圖片
<img alt="游承緯的個人照片" />

// Icon-only 按鈕
<a aria-label="Send email to u096205660@gmail.com">
  <Envelope aria-hidden="true" />
</a>

// 動態文字（Scramble）
<span aria-live="polite" aria-atomic="true">
  {scrambledSkill}
</span>

// Tag 群組
<div role="list" aria-label="Technologies used">
  <span role="listitem">Angular</span>
</div>
```

### 鍵盤導航順序

```
Tab順序：
1. Navbar brand (CW)
2. Navbar links (關於 → 經歷 → 技能 → 聯絡)
3. Hero Email button
4. Hero Phone button
5. Contact Email button
6. Contact Phone button
```

### 焦點指示器

```tsx
// 所有互動元素統一 focus ring 樣式
className="focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-navy"
```

像素風格 focus ring：考慮改為方角 outline，配合整體像素美學：
```css
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
  border-radius: 0; /* 方角像素感 */
}
```

### 觸控目標大小

| 元素 | 最小尺寸 | 實際設計 |
|------|---------|---------|
| Nav 連結 | 44px | `py-2 px-4` = 約 44px 高 |
| 主要按鈕 | 44px | `py-2.5`(10px) + line-height ≈ 44px |
| Icon 容器 | 44px | `w-10 h-10`（40px，需確認加 padding） |

### 動畫無障礙

```css
/* 尊重使用者偏好（現有，保留） */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- `VT323` / `Press Start 2P` 字體的 Scramble 動畫需加入 `prefers-reduced-motion` 判斷，直接顯示最終文字

---

## 13. Taste-Skill 規則對照表

| 規則 | 值 | 實作說明 |
|------|-----|---------|
| DESIGN_VARIANCE | 8（不對稱/有趣） | Hero 左文右圖非對稱格局；Section 標題靠左 + 延伸線；卡片佈局非純網格 |
| MOTION_INTENSITY | 6（流暢動畫） | Framer Motion spring；Scramble；像素按鈕位移；掃描線 CSS |
| VISUAL_DENSITY | 4（藝廊模式） | Section 間距 `py-24 md:py-32`；大量留白；卡片不堆砌 |
| 禁止 Emoji | - | 所有裝飾使用 Phosphor Icons 或純 CSS 像素圖形 |
| 禁止 Inter | - | Space Grotesk + Press Start 2P + VT323 |
| 禁止純黑 | - | 最深色 `#0a192f` |
| Icon 庫 | @phosphor-icons/react | Phosphor Icons `weight="duotone"` |

---

## 14. 實作優先順序

| 優先級 | 改動項目 | 影響組件 |
|--------|---------|---------|
| P0 | 引入 `Press Start 2P` 字體 | index.css |
| P0 | Section 編號改用像素字體 | Experience, Skills, Education |
| P0 | 所有卡片 `border-2 rounded-none` | Experience, Education |
| P0 | 主要按鈕改為像素陰影效果 | Hero, Contact |
| P1 | Navbar 品牌改為 `>CW_` 游標閃爍 | Navbar |
| P1 | Skill Tags 改為 `VT323` 字體 + `rounded-none` | Skills |
| P1 | Profile 照片改為方角 + 像素陰影 | Hero |
| P2 | 加入 body::before 掃描線紋理 | index.css |
| P2 | Section heading 分隔線改為 `border-t-2` | 全站 |
| P3 | 加入 3×3 像素點陣裝飾元素 | Hero, Contact |

---

*設計規範版本 1.0 — 可供工程師直接對照實作*
