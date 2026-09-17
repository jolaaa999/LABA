# ROADMAP.md — Brand-first Phase 0 → Phase 10

> 状态：Project Blueprint · Brand-first Revision  
> 版本：v1.1  
> Current Product Mode：`Brand-first AI Community Website`  
> Current Phase：`Phase 8B — Public Content API & Data Contract`  
> Next Phase：`Phase 8C+` / Auth / Admin / Frontend API Integration（仅在 maintainer 批准后）  
> 哲学：先规划 → 小步实现 → 运行 → 验证 → 修复 → Commit → 下一阶段  
> **Frontend Phase 4–7 FROZEN。未经批准不得开始 Auth / Admin / CMS / Frontend API Integration。**

---

## 1. Phase 0 → Phase 10

### Phase 0 — Brand Blueprint

- 产品定位切换为 AI Native Student Community / Brand-first 官网。  
- 更新 PRODUCT / DESIGN_SYSTEM / ARCHITECTURE / ROADMAP。  
- 清除 Learning Platform（Auth、Dashboard、Progress、Course LMS 等）对 V1 的污染。  
- **已完成并通过。**

### Phase 1 — Vue 3 Project Skeleton

- 仅初始化 `web/`：Vue 3 + TypeScript + Vite + Vue Router + Pinia + VueUse。  
- 根 README、`.gitignore`。  
- **已完成并通过。**

### Phase 2 — Aurora Design System

- 落地 `tokens.css` 与全局样式。  
- 实现基础组件：`AuroraButton`、`GlassCard`、`SectionHeader`、`GradientText`、`MotionSection`、`GlowBorder`。  
- Style Guide：`/style-guide`。  
- Reduced Motion：`useMotionPreference()` + `MotionSection`。  
- **已完成并通过。**

### Phase 3 — Global Shell

- `AppShell` + `SiteNavbar` + `SiteFooter` + `PageContainer`。  
- Navbar Morphing、Mobile Nav、Active State、Page Transition、scrollBehavior、404。  
- 品牌公开路由占位；`/style-guide` 保留且 `shell: false`。  
- **已完成并通过。**

### Phase 4A — Homepage Hero

- `HeroSection` + `HeroVisual`（SVG Neural Constellation）。  
- 首屏品牌叙事与双 CTA；复用 Aurora Design System。  
- **4A 已通过工程验收；4A.1 完成视觉 Refinement。**

### Phase 4A.1 — Hero Visual Refinement

- Desktop 垂直构图上移；HeroVisual 节点/边层级与弧线；Editorial keywords；Primary CTA 柔化；移除 CONTINUE；Mobile rhythm 收紧。  
- **已完成并通过。**

### Phase 4B — What We Explore

- `DirectionSection` + `DirectionPanel`：AI × Productivity / Deep Learning × Research。  
- Editorial direction panels；CTA → `/explore/ai`、`/explore/deep-learning`。  
- **4B 工程验收通过；4B.1 完成 Editorial Refinement。**

### Phase 4B.1 — Direction Editorial Refinement

- Shared Direction Canvas；Editorial split header；去掉 bullet list；RouterLink SPA；Hero→Section 垂直整合。  
- **已完成并通过。**

### Phase 4C — Selected Works

- `SelectedWorksSection` + `ProjectShowcase` / `ProjectPreview` / `ProjectVisual`。  
- Featured + Secondary editorial portfolio；本地 `content/projects.ts`（development mock）。  
- **已完成并通过。**

### Phase 4D.1 — Unified Intelligence Canvas

- `IntelligenceSection` + Three.js / GSAP Unified Intelligence Field。  
- BUILD ↔ UNDERSTAND same-scene morph；pointer / hotspots；Reduced Motion；WebGL fallback；offscreen / `document.hidden` pause；dispose。  
- **已完成并通过工程审核。**

### Phase 4D.1.1 — Intelligence Field Spatial Refinement

- Spatial expansion（layout coords + camera framing）；BUILD directional / UNDERSTAND clusters；edge hierarchy；depth parallax；soft luminous nodes；editorial mode switch；mobile larger subject。  
- **已完成并通过。**

### Phase 4D.2 — What Happens Here

- `WhatHappensSection` + Living Editorial Stream（`ActivityStream` / `ActivityEntry`）。  
- 4 activity types；Desktop sticky context + scroll active state；Mobile 自然纵读；本地 `content/activities.ts`。  
- **已完成并通过。**

### Phase 4E.1 — Community / People Behind the Work

- `CommunitySection` + Featured Spotlight + Member Ledger Roster。  
- `Member` public content entity + `publicProfile` 隐私字段；development placeholder（无真人照 / 无假外链）。  
- **已完成并通过。**

### Phase 4E.2 — Story Timeline + Join Narrative

- `StorySection`（Vertical Narrative Line + scroll progress）+ `JoinSection`（Open Ending Canvas）。  
- Story NEXT → Join continuum；`content/story.ts` / `content/join.ts`；无虚构历史 / QQ / QR。  
- Homepage 八大 Section 齐备。  
- **已完成并通过。**

### Phase 4F — Homepage Integration & Polish

- 整页节奏、Sticky / scroll-padding、Story focus band、Story→Join rail elbow。  
- Inactive milestone 可读性、placeholder release policy（docs）。  
- Scroll-warmup screenshot QA（不适配 production 动画）。  
- Responsive / a11y / Intelligence lifecycle 回归。  
- **已完成并通过。Homepage Phase 4 正式冻结。**

### Phase 4 — Homepage（已冻结）

八大 Section 齐备并验收冻结：Hero · Directions · Selected Works · Intelligence · What Happens · Community · Story · Join。  
Homepage 代码本轮起不再重构。

### Phase 5A — Projects Listing / Work Archive

- `/projects` Work Archive：Archive Header + Filter + Featured + Editorial Work Index + Closing CTA。  
- 复用 `content/projects.ts`；扩展 development placeholders（`placeholder: true`）。  
- Filter：ALL / AI ENGINEERING / RESEARCH / TOOLS（前端 state，无 URL query / Backend）。  
- 视觉设计已通过维护者审核。

### Phase 5A.1 — Archive Interaction Completion

- Desktop Sticky Archive Preview：Work Index hover / keyboard focus → Preview 更新。  
- Work Row 可键盘访问（RouterLink）；Featured + Row 统一进入 `/projects/:slug`。  
- `/projects/:slug` 曾为 Phase 5B Coming Soon Placeholder（已由 5B 替换）。  
- **已完成并通过。**

### Phase 5B — Project Detail / Technical Case Study

- `/projects/:slug` → `ProjectDetailView` + 共享 `ProjectCaseStudy` shell。  
- 内容驱动：`Project.caseStudy`；按 category persona 切换章节。  
- **已完成并通过视觉 / 架构审核。**

### Phase 5B.1 — Evidence Safety & Detail Completion

- Placeholder case study 文案改为 intended / planned / illustrative；section label 按 `placeholder` 切换。  
- Related work（Continue Exploring）：同 category 优先，排除自身，取 2。  
- Mobile Case Index 单行横滑；Desktop TOC 轻量 active（IntersectionObserver）。  
- **已完成并通过。**

### Phase 5 — Projects

- 5A：Projects Listing / Work Archive  
- 5A.1：Archive Interaction Completion  
- 5B：Project Detail / Technical Case Study  
- Portfolio 气质；对接本地内容模型  
- **Phase 5 系列已冻结。**

### Phase 6A — Explore Hub / Learning Map

- `/explore` → `ExploreView` Learning Map Hub（非 LMS / 非课程目录）。  
- 双路径：Build with AI / Understand AI；Shared Foundations；How We Learn；Path Focus。  
- 内容真源：`web/src/content/explore.ts`。  
- **已完成并通过工程实现（等待维护者若尚未书面冻结则以 6A 报告为准）。**

### Phase 6B — Explore AI

- `/explore/ai` → `ExploreAiView`：AI Engineering 线性路径。  
- 叙事：Hero → The Path → Stage facets（Capability / Practice / Tools / Deliverable）→ Practice Loop → Capstone。  
- 内容真源：`web/src/content/explore-ai.ts`。  
- **已完成并通过工程实现（冻结）。**

### Phase 6C — Deep Learning & Research Path

- `/explore/deep-learning` → `ExploreDeepLearningView`：Research Field Guide。  
- 人格：Question / Practice / Evidence / Failure Signals（非 6B 四字段复制）。  
- Sticky Research Spine + Stage Journal；Research Loop；Evidence Ledger；Capstone。  
- 内容真源：`web/src/content/explore-research.ts`。  
- **已完成并通过审核。**

### Phase 6D — Explore System Integration & Final QA

- 整合 `/explore` · `/explore/ai` · `/explore/deep-learning` 路由连续性与回归。  
- 区分 Research Spine **scroll active** 与 **hover/focus preview**。  
- Breadcrumb / Capstone CTA / Hero rhythm / motion / a11y / responsive QA。  
- **已完成并通过审核；Explore System 冻结。**

### Phase 7A — Events / Community Pulse

- `/events` → `EventsView`：Community Pulse（非 Calendar / 报名系统）。  
- EventFormat 本地内容；CommunityEvent 类型预留、无虚构 upcoming。  
- Hero Pulse · Rhythm · Formats · Session Flow · honest Schedule Empty State · Closing。  
- **已完成并通过审核。**

### Phase 7B — Community / People & Work

- `/community` → `CommunityView`：People & Work（非 Team Directory / Feed / Leaderboard）。  
- Contribution modes · Collaboration field · Public Members Empty State（opt-in gating）。  
- `getPublishedCommunityMembers()`：`publicProfile && !placeholder`；当前公开 roster = 0。  
- Homepage DEV placeholders **未修改**、不进入正式 roster。  
- **已完成并通过审核。**

### Phase 7C — About / Why This Community Exists

- `/about` → `AboutView`：Manifesto + Operating Model（非 Company About / 时间线 / 荣誉墙）。  
- Dual Lens Hero · Two Directions · Shared Practice · Priorities · Site System loop · Boundaries · Closing。  
- Content：`web/src/content/about.ts`（static public；非 Backend）。  
- **已完成并通过审核。**

### Phase 7D — Join Page / Entry Field

- `/join` → `JoinView`：Entry Field / orientation（非申请表 / 注册 / 招聘 Landing）。  
- Build / Research / Hybrid（pointer + keyboard）；Personalized Entry；How Joining Works；Entry Status（Public Entry = Not Published）；Closing → Explore / Projects / Events。  
- Content：`web/src/content/join-page.ts`（static public；非 Backend）。  
- **已完成并通过审核。**

### Phase 7E — Frontend Final Integration & Release Readiness

- 全站 IA / Nav / Footer / Content Truth / CTA / a11y / Responsive / Reduced Motion / Animation lifecycle 审计。  
- 仅修复不一致；不新增页面或 Backend。  
- Frontend Phase 4–7 → **FROZEN / RELEASE-READY BASELINE**。  
- **已完成并通过审核。**

### Phase 8A — Backend Foundation & Domain Model

- Go + Gin + GORM + MySQL；`Handler → Service → Repository`。  
- 表：`projects`、`community_events`、`community_members`、`recruiting_status`。  
- Public API skeleton + seed safety。  
- **已完成并通过审核。**

### Phase 8B — Public Content API & Data Contract（当前）

- 稳定 public wire enums、可见性 / 排序 / featured invariant、upcoming events、recruiting contact strip。  
- DTO mappers；public safety + HTTP contract tests；`-tags=integration` repository tests。  
- `cmd/seed-dev`（APP_ENV guard，idempotent，永不自动启动 seed）。  
- Contract：`docs/api/public-api.md`。  
- **不**接 Frontend；**不**做 Auth / Admin / CMS。

### Phase 8C+ / Auth / Admin / CMS（未开始）

- 需 maintainer 批准后另开阶段。

### Phase 9 — Responsive + Motion + a11y + Performance

- 主体已在 Frontend Phase 4–7E 覆盖；剩余为持续硬化。  

### Phase 10 — Content Backend Integration / Admin（原计划演进）

- Frontend 切换至 `/api/v1`（原 Phase 8E 意图）。  
- 可选 Admin / CMS 写入通道。  
- **不**默认 JWT 会员系统、Course LMS、UserProgress。

---

## 2. Definition of Done

### 通用 DoD

- [ ] 范围仅限该 Phase  
- [ ] 当期可运行部分保持可运行  
- [ ] 无无关大重构；无 Learning Platform 回潮  
- [ ] 文档变更已同步  
- [ ] Commit 仅在维护者要求时进行  

### Phase 0 DoD

- [x] 四份 Blueprint 完成 Brand-first Revision（v0.2）  
- [x] V1 移除 Auth / Dashboard / Progress / Course LMS 等核心依赖  
- [x] 四文档一致性检查通过（见文末）  
- [ ] **维护者验收通过**（等待中）  
- [ ] **未进入 Phase 1**  

### Phase 1 DoD

- [ ] `web/` 可 `npm run dev`  
- [ ] 无 `server/`（除非维护者另行批准提前）  
- [ ] 目录符合 Frontend-first 架构  
- [ ] README 含启动步骤  

### Phase 2 DoD

- [ ] Token 全站可引用  
- [ ] 基础 UI 组件可用  
- [ ] 预览页展示色比例与按钮态  
- [ ] `prefers-reduced-motion` 基础处理  

### Phase 3 DoD

- [ ] Navbar / Footer 稳定  
- [ ] 品牌导航可切换  
- [ ] Page Transition 可降级  
- [ ] 无 Login / Dashboard 入口  

### Phase 4 DoD

- [ ] 首页八大 Section 齐备且叙事正确  
- [ ] 双方向是「探索」而非「开课」  
- [ ] Featured Works / Members 可见  
- [ ] Join CTA 可转化（外链即可）  
- [ ] 无课程进度 / 统计 Dashboard 块  
- [ ] 维护者 Homepage 验收通过  

### Phase 5 DoD

- [ ] Projects 列表与详情完整  
- [ ] Portfolio 气质达标  
- [ ] 站内链接无死链  

### Phase 6 DoD

- [ ] Events 展示闭环  
- [ ] Community / Members 展示闭环  
- [ ] 无报名系统硬依赖  

### Phase 7 DoD

- [x] About 说清定位、双方向、共享实践与品牌边界（Phase 7C）  
- [x] Join = Entry Field / orientation；无假申请与虚构联系方式（Phase 7D）  
- [ ] 正式招新渠道发布后更新 Public Entry 状态（内容变更，非本阶段）

### Phase 8 DoD

- [ ] 轻量 AI/DL 视觉可交互或可感知  
- [ ] 60 FPS / Reduced Motion 降级存在  
- [ ] 无重型 Playground  

### Phase 9 DoD

- [ ] 主断点适配通过  
- [ ] 动效与 a11y / 性能抽检通过  

### Phase 10 DoD

- [ ] 内容 API 可读（及按需可写）  
- [ ] 分层无 Handler 直连 DB  
- [ ] 前端可切换至 API（保留本地回退可选）  
- [ ] 未擅自引入 Course LMS / 会员 Progress  

---

## 3. 技术风险

| 风险 | 影响 | 缓解 |
|------|------|------|
| Homepage 未完成就扩散子页 | 品牌主叙事失败 | Phase 4 强制验收门禁 |
| 动效 / Neural 层过重 | 掉帧、喧宾夺主 | Motion Token；Reduced Motion；禁止重 WebGL |
| 回潮成 LMS | 定位失败 | DoD 与文档一致性检查；评审拒收 |
| 过早上 Go/MySQL | 分散带宽 | Backend 锁定 Phase 10 |
| 本地内容无规范 | 后期接 API 痛苦 | `content/` + types 先行 |
| Design System 进度慢 | 延误首页 | Phase 2 最小集；组件按需增量 |
| 误用百度视觉 | 品牌偏离 | DESIGN_SYSTEM 禁止项 + 评审 |
| 一次生成整站 | 不可审 | 分 Phase；每阶段可运行 |

---

## 4. Vibecoding 风险与约束

### 常见失败模式

1. 一次生成整个官网 + 后端 + Auth。  
2. 用 Element / Ant Design 铺前台。  
3. 偷偷加 Login、Dashboard、Course、Progress「以后用得上」。  
4. Homepage 还没做好就做 Admin。  
5. 重型 Playground 炫技。  
6. Handler 直连 GORM（到 Phase 10 时）。  
7. 文档仍写 LMS，代码却做品牌站（或相反）。  

### 硬约束

```
RULES FOR THIS REPOSITORY
1. Current mode = Brand-first AI Community Website.
2. 未完成当前 Phase DoD，不得开始下一 Phase。
3. 架构/范围变更必须先改 docs/，再改代码。
4. Phase 0 结束前：禁止创建 web/、server/、数据库、业务代码。
5. Phase 1–9：禁止初始化 Go Backend / MySQL（除非维护者改路线）。
6. V1 禁止实现：JWT 会员登录、Student Dashboard、UserProgress、
   Course LMS、EventRegistration、LearningPathNode 数据系统。
7. 禁止用大型 UI 库定义前台视觉。
8. 禁止纯黑赛博紫霓虹主视觉；禁止 hover scale(1.1)；禁止粒子 spam。
9. Phase 8 仅允许轻量品牌互动；禁止重型 Playground。
10. Phase 10 起：Handler → Service → Repository；禁止 Handler → DB。
11. 每次只做小步；结束时必须可运行。
12. Commit 仅在维护者要求时进行。
```

### 推荐 AI 协作提示词

```text
阅读 docs/PRODUCT.md、DESIGN_SYSTEM.md、ARCHITECTURE.md、ROADMAP.md。
当前是 Brand-first AI Community Website，不是 LMS。
仅实现当前 Phase。使用 Design Token 与既有组件规划。
不要引入 Auth / Dashboard / Course / Progress。
不要初始化后端（若未到 Phase 10）。
不要实现重型 Playground。
对照该 Phase DoD 自检后停止，等待验收。
```

### 评审检查表

- [ ] 是否仍像「懂 AI 的大学生技术社区官网」？  
- [ ] 是否出现 LMS / Dashboard / Login 回潮？  
- [ ] 是否出现禁用视觉？  
- [ ] 动效是否 Calm？  
- [ ] 是否违反 Phase 门禁（尤其 Homepage / Backend）？  
- [ ] 四份文档是否仍一致？  

---

## 5. 当前状态

| 项 | 状态 |
|----|------|
| Product Mode | Brand-first AI Community Website |
| 仓库代码 | `web/` Phase 4 Homepage complete |
| Phase | **4E.2 — 实现完成，等待验收** |
| Next | 批准后 → Phase 5 |
| Phase 5 | **NOT started** |

---

## 6. Consistency Check（v0.2）

| 检查项 | 结果 |
|--------|------|
| PRODUCT 无 Login，ARCHITECTURE 无强制 JWT | 一致：Auth 非 V1 必需，Backend 延后且不默认 JWT |
| PRODUCT 无 Student Dashboard，ROADMAP 无 Dashboard Phase | 一致：已删除 |
| PRODUCT Backend 最后，ROADMAP Backend = Phase 10 | 一致 |
| PRODUCT 为品牌官网，Sitemap 非 LMS | 一致：Explore / Projects / Community / Join |
| DESIGN_SYSTEM 保留 Snow/Aurora，组件改为 Brand | 一致 |
| Course / Progress / EventRegistration 不在 V1 核心模型 | 一致：仅 Future Extension |
| 导航无 Paths / Courses / Resources / Login | 一致 |

### Removed From V1（核心）

- Auth（Login / Register / JWT）  
- Student / Member Dashboard  
- UserProgress / Course Learning Progress  
- Chapter / Lesson / 完整 Course LMS  
- LearningPathNode 数据系统  
- EventRegistration  
- GUEST / MEMBER / ADMIN 作为运行时必需 RBAC  
- 早期 Go / MySQL / 复杂 Admin Dashboard  

### Preserved For Future（延后，非永远删除）

- Go + Gin + GORM + MySQL 内容后端（Phase 10）  
- 可选 JoinApplication / ContactMessage  
- 可选轻量 CMS / Admin（按需）  
- 更丰富 Articles、更强互动视觉（仍非 LMS）  
- V3 Learning Platform Extension（Course、Progress、Auth、Dashboard 等）  

---

## 文档闭环

| 文档 | 内容 |
|------|------|
| `PRODUCT.md` | Vision、Persona、Journey、Scope、Sitemap、Homepage IA |
| `DESIGN_SYSTEM.md` | Language、Token、Motion、Brand 组件规划 |
| `ARCHITECTURE.md` | Frontend-first、延后 Backend、内容模型 |
| `ROADMAP.md` | Phase、DoD、风险、约束、一致性 |

---

**Phase 8B implementation complete for maintainer review.**  
**Frontend Phase 4–7 FROZEN.**  
**Public Content API contract stabilized.**  
**Auth NOT started.**  
**Admin NOT started.**  
**CMS NOT started.**  
**LMS NOT started.**  
**Frontend API integration NOT started.**  
**Waiting for maintainer approval before Phase 8C+.**
