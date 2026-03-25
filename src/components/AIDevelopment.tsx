// Usage:
// <AIDevelopment />
//
// Left-aligned numbered section header ("03." + title + horizontal rule),
// showcasing AI-assisted development workflow, verification pipeline,
// security/risk control, and real-world lessons learned from the ScanUp project.
// 8-bit pixel style: square corners, dashed borders, pixel font for numbering.

import { motion } from 'framer-motion'
import {
  Robot,
  ShieldCheck,
  Eye,
  Brain,
  Code,
  Warning,
  Lock,
  GitBranch,
  TestTube,
  TreeStructure,
  Bug,
  Lightning,
  Detective,
  Checks,
  FileDashed,
  BrowsersIcon,
} from '@phosphor-icons/react'

// ─── Animation config ────────────────────────────────────────────────────────

const spring = { type: 'spring', stiffness: 100, damping: 20 } as const

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: spring },
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface WorkflowStep {
  Icon: React.ElementType
  title: string
  description: string
}

interface SecurityItem {
  Icon: React.ElementType
  title: string
  details: string[]
}

interface LessonItem {
  Icon: React.ElementType
  incident: string
  root: string
  fix: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const AI_WORKFLOW_STEPS: WorkflowStep[] = [
  {
    Icon: TreeStructure,
    title: '架構規劃 → SDD 約束',
    description:
      '透過 Planner / Architect Agent 自動產出 PRD、系統設計文件（SDD）與任務拆分。SDD 作為 AI 的 ground truth，避免後續開發產生幻覺',
  },
  {
    Icon: Code,
    title: '多代理協作 + 檔案邊界',
    description:
      '每個 Agent 鎖定嚴格的檔案邊界 — api-engineer 只能動 types + api-client，hook-engineer 只能動 hooks，禁止跨層修改，爆炸半徑鎖在單一層',
  },
  {
    Icon: GitBranch,
    title: 'Git Worktree 隔離',
    description:
      '所有子代理強制在獨立 Git Worktree 運作，改動不直接進主分支。改壞了直接丟掉分支重來，等於內建 rollback 機制',
  },
  {
    Icon: Eye,
    title: '驗收三件套（自動觸發）',
    description:
      '每次實作完自動觸發三個獨立 Agent：Validator 跑 lint + typecheck 有錯直接修、Code Reviewer 按 checklist 審查品質與效能、UI/UX Designer 比對設計規範檢查視覺合規',
  },
  {
    Icon: Detective,
    title: 'OpenAPI MCP 規格比對',
    description:
      'API 修改前先用 OpenAPI MCP 查 Swagger 規格確認欄位與路徑。曾靠此抓到 AI 把 /merchants/apply 寫成 /merchant/apply（差一個 s → 直接 404）',
  },
]

const VERIFICATION_PIPELINE: WorkflowStep[] = [
  {
    Icon: TestTube,
    title: '自動化檢查',
    description:
      'local-ci 指令串聯：套件安全掃描 → ESLint → TypeScript 型別檢查，Turborepo 平行跑三個 App。最後 push 上 Cloud Build 的 Docker 建置失敗就不會部署',
  },
  {
    Icon: BrowsersIcon,
    title: '視覺回歸測試',
    description:
      'Playwright 截圖腳本自動登入三個 App 逐頁截圖，改版後與上次的圖做 diff 比對（簡易版 Visual Regression）。RWD 在 375 / 768 / 1024 / 1920 四個斷點手動驗證',
  },
  {
    Icon: Checks,
    title: '人工 Flow 驗證',
    description:
      '使用測試帳號手動走關鍵 User Flow — 表單驗證、OAuth redirect、狀態切換導向是否正確。動到 Axios interceptor、useAuth 等跨 App 共用程式碼一定逐行 Review 才 merge',
  },
]

const SECURITY_MEASURES: SecurityItem[] = [
  {
    Icon: Lock,
    title: '三層資料隔離',
    details: [
      '第一層：.gitignore 排除 .env / .pem / credential，Agent commit 時帶不進去',
      '第二層：Agent 規格檔寫死檔案邊界，寫入範圍鎖死',
      '第三層：敏感資訊存放 .claude/ 目錄（被 gitignore 排除），API key 由 CI 注入',
    ],
  },
  {
    Icon: ShieldCheck,
    title: 'AI 輸出防護',
    details: [
      '型別必須對齊 Swagger schema，不可自創欄位 — 指不回規格出處的直接打回',
      '不餵整份外部文件，限定搜尋局部 60-100 行，防止 context 污染',
      '產出與審查分離 — 寫 API 的 Agent 和審查的 Agent 是不同角色，交叉檢查',
      'API 呼叫次數限制不超過 2 次，防止幻覺導致瘋狂打 API',
    ],
  },
  {
    Icon: Warning,
    title: 'Prompt Injection 防護',
    details: [
      'Agent 自我檢查清單：型別對齊、路徑存在、HTTP method 正確',
      '專責 Injection 檢測代理與其他子代理溝通驗證，再回報總代理',
      'Claude Code 平台內建機制：工具回傳內容疑似 injection 直接向使用者示警',
      '嚴禁實際打 Production API，開發期間只查公開 Swagger endpoint',
    ],
  },
]

const LESSONS_LEARNED: LessonItem[] = [
  {
    Icon: Bug,
    incident: 'AI 自創 Swagger 不存在的欄位',
    root: '型別檢查會過但上線讀到 undefined，連續好幾個 commit 都在修 build fail',
    fix: '規格裡加「型別必須對齊 Swagger，不可自創欄位」+ 每個欄位要能指回 Swagger 出處',
  },
  {
    Icon: Lightning,
    incident: 'Code Splitting 重構破壞頁面',
    root: 'Agent 不只改 import 方式，還順手動了 JSX 結構和業務邏輯 → 頁面白屏',
    fix: '直接 git 回到重構前版本。事後加規則：重構任務必須零功能零視覺變更，Prompt 要明確寫「禁止動什麼」',
  },
  {
    Icon: FileDashed,
    incident: '認證方案互相矛盾',
    root: '兩個 SDD 分別建議 HttpOnly Cookie 和 localStorage，造成架構衝突',
    fix: '查 Swagger response 確認回傳 JWT（非 Set-Cookie），檢查現有 interceptor — 以系統事實為準，不讓 AI 幻想方案',
  },
]

const CORE_PRINCIPLES: string[] = [
  'Agent 的自由度要盡可能壓低，Prompt 越具體越安全，寧可多跑幾輪也不要一次給太大的改動範圍',
  '所有 AI 產出都要能指回一個具體的規格出處 — 指不回來的就打回',
  '限定範圍餵資料（具體檔案、具體行數），不問「這個專案怎麼運作」這種開放問題',
  '安全相關程式碼（認證、授權、跨 App 共用）不完全依賴 AI，一定逐行 Review 才 merge',
  'Prompt 要寫「禁止動什麼」而不只是「要做什麼」— 約束比指令更重要',
]

// ─── Pixel Corners Helper ────────────────────────────────────────────────────

function PixelCorners({ className = 'bg-accent' }: { className?: string }) {
  return (
    <>
      <div className={`absolute top-0 left-0 w-1.5 h-1.5 ${className}`} aria-hidden="true" />
      <div className={`absolute top-0 right-0 w-1.5 h-1.5 ${className}`} aria-hidden="true" />
      <div className={`absolute bottom-0 left-0 w-1.5 h-1.5 ${className}`} aria-hidden="true" />
      <div className={`absolute bottom-0 right-0 w-1.5 h-1.5 ${className}`} aria-hidden="true" />
    </>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function AIDevelopment() {
  return (
    <section
      id="ai-development"
      aria-label="AI-assisted development workflow"
      className="border-t-2 border-dashed border-navy-lightest/40 pt-16 md:pt-20"
    >
      <div>

        {/* ── Section heading ──────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
          className="flex items-center gap-4 mb-12"
        >
          <motion.h2
            variants={fadeUp}
            className="flex items-baseline gap-2 shrink-0 text-2xl md:text-3xl font-bold text-slate-200 tracking-tight whitespace-nowrap"
          >
            <span
              className="text-accent-light text-xs md:text-sm"
              style={{ fontFamily: "'Press Start 2P'" }}
            >
              03.
            </span>
            AI Development
          </motion.h2>
          <motion.div
            variants={fadeUp}
            className="flex-1 border-t-2 border-dashed border-navy-lightest"
            aria-hidden="true"
          />
        </motion.div>

        {/* ── Intro ────────────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
        >
          <motion.div
            variants={fadeUp}
            className="relative bg-navy-light/50 border-2 border-navy-lightest/30 rounded-none p-6 md:p-8 mb-8"
          >
            <PixelCorners className="bg-accent/60" />
            <div className="flex items-start gap-4">
              <Robot
                size={28}
                weight="duotone"
                className="text-accent-light shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  以 <span className="text-accent-light font-semibold">Claude Code</span> 為核心 AI 開發夥伴，
                  在 ScanUp（Turborepo Monorepo 三端架構）的實際開發中，建立了一套完整的
                  <span className="text-accent-light font-semibold"> AI 輔助開發工作流</span>。
                  核心原則：每個環節都有 AI 參與，但
                  <span className="text-accent-light font-semibold">人類掌控決策權</span>，
                  所有產出必須能指回具體規格出處。
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── AI 開發工作流 ──────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-6"
          >
            Multi-Agent Workflow
          </motion.p>

          <div className="space-y-3">
            {AI_WORKFLOW_STEPS.map((step, index) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                className="relative flex gap-4 bg-navy-light/30 border border-navy-lightest/20 rounded-none p-4
                           hover:border-accent/40 transition-colors group"
              >
                <div className="flex flex-col items-center shrink-0">
                  <span
                    className="text-accent/60 text-[10px] mb-1.5"
                    style={{ fontFamily: "'Press Start 2P'" }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <step.Icon
                    size={20}
                    weight="duotone"
                    className="text-accent-light group-hover:text-accent transition-colors"
                    aria-hidden="true"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-200 mb-1">{step.title}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Verification Pipeline ────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-mono text-slate-500 uppercase tracking-widest mt-12 mb-6"
          >
            Verification Pipeline
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {VERIFICATION_PIPELINE.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="relative bg-navy-light/50 border-2 border-navy-lightest/30 rounded-none p-5
                           hover:border-accent/40 transition-colors"
              >
                <PixelCorners className="bg-accent/40" />
                <div className="flex items-center gap-2 mb-3">
                  <item.Icon
                    size={18}
                    weight="duotone"
                    className="text-accent-light shrink-0"
                    aria-hidden="true"
                  />
                  <p className="text-sm font-semibold text-slate-200">{item.title}</p>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Security & Risk Control ──────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-mono text-slate-500 uppercase tracking-widest mt-12 mb-6"
          >
            Security & Risk Control
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SECURITY_MEASURES.map((measure) => (
              <motion.div
                key={measure.title}
                variants={fadeUp}
                className="relative bg-navy-light/50 border-2 border-navy-lightest/30 rounded-none p-5
                           hover:border-accent/40 transition-colors flex flex-col"
              >
                <PixelCorners className="bg-accent/40" />
                <div className="flex items-center gap-2 mb-3">
                  <measure.Icon
                    size={18}
                    weight="duotone"
                    className="text-accent-light shrink-0"
                    aria-hidden="true"
                  />
                  <p className="text-sm font-semibold text-slate-200">{measure.title}</p>
                </div>
                <ul className="space-y-2 flex-1" role="list">
                  {measure.details.map((detail, i) => (
                    <li key={i} className="flex gap-2 text-xs text-slate-400 leading-relaxed">
                      <span className="text-accent/60 shrink-0 mt-0.5" aria-hidden="true">▹</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Lessons Learned (Real Cases) ──────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-mono text-slate-500 uppercase tracking-widest mt-12 mb-6"
          >
            Lessons Learned
          </motion.p>

          <div className="space-y-4">
            {LESSONS_LEARNED.map((lesson) => (
              <motion.div
                key={lesson.incident}
                variants={fadeUp}
                className="relative bg-navy-light border-2 border-navy-lightest/30 rounded-none p-5
                           hover:border-accent/40 transition-colors"
              >
                <PixelCorners className="bg-accent/40" />
                <div className="flex items-start gap-3">
                  <lesson.Icon
                    size={20}
                    weight="duotone"
                    className="text-accent-light shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-200 mb-2">{lesson.incident}</p>
                    <div className="space-y-1.5">
                      <p className="text-xs text-slate-400 leading-relaxed">
                        <span className="text-slate-500 font-mono">ROOT</span>{' '}
                        {lesson.root}
                      </p>
                      <p className="text-xs text-accent-light/80 leading-relaxed">
                        <span className="text-accent font-mono">FIX</span>{' '}
                        {lesson.fix}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Core Principles ──────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-mono text-slate-500 uppercase tracking-widest mt-12 mb-6"
          >
            Core Principles
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="relative bg-navy-light/30 border border-navy-lightest/20 rounded-none p-5"
          >
            <Brain
              size={16}
              weight="duotone"
              className="text-accent/40 absolute top-4 right-4"
              aria-hidden="true"
            />
            <ul className="space-y-3" role="list">
              {CORE_PRINCIPLES.map((point, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-400 leading-relaxed">
                  <span
                    className="text-accent/50 text-[9px] shrink-0 mt-1"
                    style={{ fontFamily: "'Press Start 2P'" }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
