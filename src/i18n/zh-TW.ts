import type { Translations } from './types'

export const zhTW: Translations = {
  nav: {
    about: '關於',
    experience: '經歷',
    ai: 'AI',
    skills: '技能',
    contact: '聯絡',
  },
  hero: {
    greeting: 'Hi, my name is',
    title: 'Front-End Engineer',
    bio: '4 年前端開發經驗，專精 Angular 與 TypeScript。能獨立扛下完整前端產線 — 從 Figma 切版、元件開發、API 串接到 SAP 企業系統整合，並運用 AI 多代理工作流提升開發效率與程式碼品質。',
  },
  experience: {
    sectionTitle: 'Work Experience',
    workTitle: 'Front-End Engineer',
    bullets: [
      '獨立負責多個 SAP 整合專案的前端開發，運用 Angular 與 TypeScript 從零建構功能模組，專案皆準時交付',
      '依據 Figma 設計稿精準切版，搭配 IMPEX 進行 Slot 與 Component 匯入，縮短前後端整合流程',
      '主動與客戶方工程師協作釐清需求，減少來回溝通次數，加速問題解決與交付效率',
      '熟悉 SAP ERP Backoffice 與 hac 平台操作，能獨立處理一般前端工程師不熟悉的企業系統對接',
    ],
    projectsLabel: 'Projects',
    projects: {
      scanup: {
        subtitle: '寵物美容預約平台',
        summary: '幫助寵物飼主一鍵預約美容服務，Turborepo Monorepo 三端架構（Consumer / Seller / Admin），整合 AI 寵物掃描、地圖搜尋與 Stripe 金流',
      },
      lnez: {
        subtitle: '電商網站',
        summary: '從商品瀏覽到結帳的完整購物體驗，包含搜尋篩選、購物車、多種付款方式與會員中心，桌面與手機響應式設計',
      },
      linebot: {
        subtitle: '醫療 Line Bot',
        summary: '讓醫療人員直接在 Line 內查詢與管理患者資料，免切換系統，支援模糊搜尋與重複資料檢測',
      },
      taskManager: {
        subtitle: '企業內部工具',
        summary: '解決公司內部任務分配與追蹤需求，Context API 全域狀態管理搭配 LocalStorage 資料持久化',
      },
      fengti: {
        subtitle: '形象網站',
        summary: '已交付客戶的企業形象網站，使用 WordPress 搭建並以 Fullpage.js 打造全頁滾動體驗，整合 Facebook Pixel 追蹤廣告成效與用戶行為',
      },
    },
  },
  ai: {
    sectionTitle: 'AI Development',
    intro: {
      text1: '以 ',
      highlight1: 'Claude Code',
      text2: ' 為核心 AI 開發夥伴，在 ScanUp（Turborepo Monorepo 三端架構）的實際開發中，建立了一套完整的',
      highlight2: ' AI 輔助開發工作流',
      text3: '。核心原則：每個環節都有 AI 參與，但',
      highlight3: '人類掌控決策權',
      text4: '，所有產出必須能指回具體規格出處。',
    },
    workflowLabel: 'Multi-Agent Workflow',
    workflow: [
      {
        title: '架構規劃 → SDD 約束',
        description: '透過 Planner / Architect Agent 自動產出 PRD、系統設計文件（SDD）與任務拆分。SDD 作為 AI 的 ground truth，避免後續開發產生幻覺',
      },
      {
        title: '多代理協作 + 檔案邊界',
        description: '每個 Agent 鎖定嚴格的檔案邊界 — api-engineer 只能動 types + api-client，hook-engineer 只能動 hooks，禁止跨層修改，爆炸半徑鎖在單一層',
      },
      {
        title: 'Git Worktree 隔離',
        description: '所有子代理強制在獨立 Git Worktree 運作，改動不直接進主分支。改壞了直接丟掉分支重來，等於內建 rollback 機制',
      },
      {
        title: '驗收三件套（自動觸發）',
        description: '每次實作完自動觸發三個獨立 Agent：Validator 跑 lint + typecheck 有錯直接修、Code Reviewer 按 checklist 審查品質與效能、UI/UX Designer 比對設計規範檢查視覺合規',
      },
      {
        title: 'OpenAPI MCP 規格比對',
        description: 'API 修改前先用 OpenAPI MCP 查 Swagger 規格確認欄位與路徑。曾靠此抓到 AI 把 /merchants/apply 寫成 /merchant/apply（差一個 s → 直接 404）',
      },
    ],
    verificationLabel: 'Verification Pipeline',
    verification: [
      {
        title: '自動化檢查',
        description: 'local-ci 指令串聯：套件安全掃描 → ESLint → TypeScript 型別檢查，Turborepo 平行跑三個 App。最後 push 上 Cloud Build 的 Docker 建置失敗就不會部署',
      },
      {
        title: '視覺回歸測試',
        description: 'Playwright 截圖腳本自動登入三個 App 逐頁截圖，改版後與上次的圖做 diff 比對（簡易版 Visual Regression）。RWD 在 375 / 768 / 1024 / 1920 四個斷點手動驗證',
      },
      {
        title: '人工 Flow 驗證',
        description: '使用測試帳號手動走關鍵 User Flow — 表單驗證、OAuth redirect、狀態切換導向是否正確。動到 Axios interceptor、useAuth 等跨 App 共用程式碼一定逐行 Review 才 merge',
      },
    ],
    securityLabel: 'Security & Risk Control',
    security: [
      {
        title: '三層資料隔離',
        details: [
          '第一層：.gitignore 排除 .env / .pem / credential，Agent commit 時帶不進去',
          '第二層：Agent 規格檔寫死檔案邊界，寫入範圍鎖死',
          '第三層：敏感資訊存放 .claude/ 目錄（被 gitignore 排除），API key 由 CI 注入',
        ],
      },
      {
        title: 'AI 輸出防護',
        details: [
          '型別必須對齊 Swagger schema，不可自創欄位 — 指不回規格出處的直接打回',
          '不餵整份外部文件，限定搜尋局部 60-100 行，防止 context 污染',
          '產出與審查分離 — 寫 API 的 Agent 和審查的 Agent 是不同角色，交叉檢查',
          'API 呼叫次數限制不超過 2 次，防止幻覺導致瘋狂打 API',
        ],
      },
      {
        title: 'Prompt Injection 防護',
        details: [
          'Agent 自我檢查清單：型別對齊、路徑存在、HTTP method 正確',
          '專責 Injection 檢測代理與其他子代理溝通驗證，再回報總代理',
          'Claude Code 平台內建機制：工具回傳內容疑似 injection 直接向使用者示警',
          '嚴禁實際打 Production API，開發期間只查公開 Swagger endpoint',
        ],
      },
    ],
    lessonsLabel: 'Lessons Learned',
    lessons: [
      {
        incident: 'AI 自創 Swagger 不存在的欄位',
        root: '型別檢查會過但上線讀到 undefined，連續好幾個 commit 都在修 build fail',
        fix: '規格裡加「型別必須對齊 Swagger，不可自創欄位」+ 每個欄位要能指回 Swagger 出處',
      },
      {
        incident: 'Code Splitting 重構破壞頁面',
        root: 'Agent 不只改 import 方式，還順手動了 JSX 結構和業務邏輯 → 頁面白屏',
        fix: '直接 git 回到重構前版本。事後加規則：重構任務必須零功能零視覺變更，Prompt 要明確寫「禁止動什麼」',
      },
      {
        incident: '認證方案互相矛盾',
        root: '兩個 SDD 分別建議 HttpOnly Cookie 和 localStorage，造成架構衝突',
        fix: '查 Swagger response 確認回傳 JWT（非 Set-Cookie），檢查現有 interceptor — 以系統事實為準，不讓 AI 幻想方案',
      },
    ],
    principlesLabel: 'Core Principles',
    principles: [
      'Agent 的自由度要盡可能壓低，Prompt 越具體越安全，寧可多跑幾輪也不要一次給太大的改動範圍',
      '所有 AI 產出都要能指回一個具體的規格出處 — 指不回來的就打回',
      '限定範圍餵資料（具體檔案、具體行數），不問「這個專案怎麼運作」這種開放問題',
      '安全相關程式碼（認證、授權、跨 App 共用）不完全依賴 AI，一定逐行 Review 才 merge',
      'Prompt 要寫「禁止動什麼」而不只是「要做什麼」— 約束比指令更重要',
    ],
  },
  skills: {
    sectionTitle: 'Technical Skills',
    coreLabel: 'Core Stack',
    otherLabel: 'Other Strengths',
    softSkills: [
      '跨團隊需求釐清',
      '獨立開發與團隊協作',
      '問題根因分析',
      'AI 工程化工作流',
      '規格驅動開發',
      '持續學習新技術',
    ],
  },
  education: {
    sectionTitle: 'Education',
    institution: '樹德科技大學',
    department: '資訊工程系',
    capstoneLabel: 'Capstone Project',
    capstoneName: '車輛診斷系統 — 藍雅',
    capstoneSummary: '手機 APP 透過 OBD 藍牙連接車輛，讀取即時數據並模擬故障資訊顯示與診斷',
  },
  contact: {
    eyebrow: 'Get In Touch',
    heading: "Let's Build Something Together",
    subtext: '正在尋找重視程式碼品質與工程文化的團隊 — 前端、全端或 AI 工程化領域皆歡迎聊聊',
    formTitle: 'Leave a Message',
    nameLabel: 'Name',
    namePlaceholder: '您的名字',
    emailLabel: 'Email',
    emailPlaceholder: 'your@email.com',
    messageLabel: 'Message',
    messagePlaceholder: '想說些什麼...',
    submit: '送出訊息',
    submitting: '送出中...',
    success: '訊息已送出，感謝您的聯繫！',
    error: '送出失敗，請稍後再試或直接寄信給我',
  },
  footer: {
    builtWith: '· Built with React + TypeScript · 2026',
  },
}
