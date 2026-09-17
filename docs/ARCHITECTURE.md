# ARCHITECTURE.md — Frontend-first Brand Website

> 状态：Project Blueprint · Brand-first Revision  
> 版本：v0.2  
> Current Product Mode：`Brand-first AI Community Website`  
> Current Phase：`Phase 8A — Backend Foundation & Domain Model`  
> 约束：Frontend Phase 4–7 frozen；Backend 公开域 API 骨架已落地；Auth/Admin/CMS 未开始。

---

## 1. Architecture Stance

### V1 目标形态

```
Brand Website (Vue)
        ↓
Local Content / Mock Data (JSON · TS modules)
```

**不是：**

```
LMS + Auth + Dashboard + Early Go/MySQL
```

### 原则

1. **先完成视觉、叙事与交互**，再考虑内容 API。  
2. **YAGNI**：不为「以后可能做学习平台」预埋整套 Auth / Progress / Course 架构。  
3. Homepage 未验收前，不大量开发子页面，也不启动后端。  
4. 未来 Backend 工程质量不降级：分层、DTO、Validation、AppError、Logger 仍强制。

---

## 2. Frontend Architecture

### 技术栈（V1 核心）

| 层 | 选型 | 说明 |
|----|------|------|
| Framework | Vue 3 | |
| Language | TypeScript | 严格类型 |
| Build | Vite | |
| Router | Vue Router | 品牌站点路由 |
| State | Pinia | **仅必要** UI / 全局状态 |
| Utilities | VueUse | |
| HTTP | Axios | **后期**接 API 时再重用；前期可不用 |

### 原生能力优先

- `Transition` / `TransitionGroup`  
- `Teleport`  
- `KeepAlive`  
- `Suspense`  

**不**用大型 UI Framework 决定整站视觉。自建 Aurora Design System。

### 分层

```
views/            页面编排（薄）
components/
  ui/             AuroraButton, GlassCard, ...
  brand/          HeroVisual, DirectionPanel, NeuralVisual, ...
  project/        ProjectShowcase, ProjectPreview, ...
  community/      MemberCard, MemberSpotlight, ...
  layout/         Navbar, Footer, AppShell
composables/      motion、media、content helpers（无 auth 必需）
stores/           ui（nav、toast、motion preference…）
content/          本地 JSON / TS 内容源（V1 前期真源）
types/            视图与内容模型类型
styles/           tokens + reset + utilities
router/           公开品牌路由（无登录守卫必需）
assets/           静态资源
services/         后期 API client（Phase 10 前可空或占位）
```

### 内容策略（V1 前期）

| 方式 | 用途 |
|------|------|
| `content/*.ts` 或 `*.json` | Projects、Members、Explore、Events、Community、About、Story、Join 信息 |
| 类型化模块 | 编译期校验字段 |
| Feature flags（可选） | Featured Projects / Members |

切换到 Backend 时：用 `services/` 替换读取路径，视图尽量不改。

### 状态边界（V1）

| Store | 职责 |
|-------|------|
| `ui` | nav 状态、toast、氛围/Neural 开关 |
| （不设）`auth` | V1 不需要 |
| （不设）`learning` | V1 不需要 |

### 路由

公开品牌路由；**无** `/app/**` Student Dashboard、**无** `/auth/**`、**无** 基于 JWT 的路由守卫作为 V1 必需项。

导航对齐 PRODUCT：

`Home · Explore · Projects · Events · Community · About · Join Us`

### 质量约束

- 严格 TypeScript。  
- 样式只消费 Design Token。  
- 动效走 Motion System。  
- 组件命名与 `DESIGN_SYSTEM.md` 规划对齐。

---

## 3. Backend Architecture（Phase 8A Foundation）

> **现状：** Phase 8A 已落地 `backend/`（Go + Gin + GORM + MySQL）公开域 API 骨架。  
> **Frontend：** Phase 4–7 冻结；**本阶段不接线 API**（接线留待后续 integration phase）。  
> **仍未开始：** Auth / Admin / CMS / LMS / Upload / WebSocket。

### Backend Boundary

| 类型 | 归属 | 示例 |
|------|------|------|
| **Static Editorial Content** | Frontend `web/src/content/*` | Home manifesto、Explore learning map、About philosophy、Join orientation wording、Project Case Study 长文 |
| **Truth-bearing Content** | Backend MySQL + `/api/v1` | Project metadata、CommunityEvent 场次、Public Community Members、RecruitingStatus |

### 关键边界（强制）

- **Auth User ≠ Community Member**  
  - `community_members` = 公开内容实体（展示用）  
  - Auth User = 未来身份系统；本阶段**不存在** password / JWT / role  
- Empty state 是合法产品状态：`projects=[]`、`events=[]`、`members=[]`、recruiting=`NOT_PUBLISHED`

### 技术栈

| 层 | 选型 |
|----|------|
| Language | Go 1.25+（环境可用工具链） |
| HTTP | Gin |
| ORM | GORM（运行时查询；schema 以 SQL migrations 为准） |
| DB | MySQL 8+ |
| Style | RESTful `/api/v1` |

### 强制分层

```
HTTP → Handler → Service → Repository(interface) → MySQL
```

- Handler 不直接碰 GORM。  
- Service 不依赖 `gin.Context`。  
- 对外 JSON 一律走 Response DTO（禁止直接序列化 GORM entity）。

### 包结构（已实现）

```
backend/
  cmd/server/
  internal/config/
  internal/http/{handler,middleware,response,router}/
  internal/service/
  internal/repository/{,mysql}/
  internal/model/
  internal/dto/
  internal/apperr/
  internal/platform/database/
  migrations/
  docker-compose.dev.yml   # MySQL only
```

### Public API（契约）

见 `docs/api/public-api.md`：

- `GET /api/v1/health` · `GET /api/v1/ready`
- `GET /api/v1/projects` · `GET /api/v1/projects/:slug`
- `GET /api/v1/events`
- `GET /api/v1/community/members`
- `GET /api/v1/recruiting/status`

### Seed Safety

- 不 seed 已发布假项目 / 假活动 / 假成员。  
- Recruiting 默认 `NOT_PUBLISHED`，无联系方式。  
- 开发假数据若引入，必须 `published=false` 或 `placeholder=true`，且不得作为 public API 默认结果。

### 横切关注点

- Config fail-fast、CORS 白名单、request_id + access log、Recovery、HTTP timeouts、统一 error envelope。  
- JWT / Admin middleware：**未实现**（YAGNI）。

---

## 4. Data Model Planning

### V1 内容模型（前端本地即可）

面向展示的 TypeScript 类型 / JSON 结构，例如：

| Model | 说明 |
|-------|------|
| **Project** | 作品 |
| **Member** | 成员展示（非账号系统） |
| **Event** | 活动 |
| **Announcement** | 公告（可选） |
| **Article** | 文章（可选） |
| **Tag** / **Category** | 分类标签 |
| **SiteConfig** | 站点文案、社群链接、二维码等 |
| **JoinInfo** | 招新信息（可并入 SiteConfig） |

#### Project 字段方向（Phase 5B 已细化）

`slug, title, category, summary, year, status?, techStack[], featured, featuredRank?, visualKind, githubUrl?, demoUrl?, placeholder?, caseStudy?`

`caseStudy`：overview / problem / question / approach / architecture / workflow / experiment / observations / results / limitations / usage / artifacts / collaborators / nextSteps

真源：`web/src/types/project.ts` + `web/src/content/projects.ts`  
Detail shell：`ProjectDetailView` + `ProjectCaseStudy`（按 persona 切换章节，非三套独立页面）。

#### Member 字段方向（Phase 4E.1 + 7B）

`id, slug?, name, role?, year?, direction ('ai'|'research'|'hybrid'), bio, skills[], contributionModes?, githubUrl?, homepageUrl?, avatar?, featuredProject?, projectSlugs?, featured, publicProfile, placeholder?, monogram, index`

**隐私 / 公开门禁：**  
- Homepage 开发态可显示 `placeholder: true`（DEV PLACEHOLDER）。  
- **Community 正式 roster：** `publicProfile === true` **且** `placeholder !== true`。  
- **Public profiles are opt-in.**  

**实体边界：**  
- `Member` = public content entity（CommunityMember 语义）。  
- **Auth User ≠ Member** — 未来登录账号可不绑定公开 profile；本阶段无 Auth。  

真源：`web/src/types/member.ts` + `web/src/content/members.ts`  
Community 页文案：`web/src/content/community.ts`（contributionModes / principles）。  
View：`CommunityView` + `components/community/CommunityPageHero` · `ContributionStream` · `CollaborationField` · `PublicMemberRoster` · `CommunityPrinciples` · `CommunityClosing`。  
当前正式公开 roster：**0**（无真实成员资料）。

#### Explore public-content architecture（Phase 6A）

`/explore` 是 **Learning Map Hub**（路径取向），不是 Blog Category / Course Catalog / LMS Dashboard。

| 层 | 说明 |
|----|------|
| Content | `web/src/content/explore.ts` — `ExplorePath`、`SharedFoundation`、`LearningPrinciple` |
| View | `ExploreView` — page-level `ExplorePathId \| null` focus via provide/inject |
| Components | `explore/ExploreHero`、`ExploreDirections`、`LearningMap`、`SharedFoundations`、`LearningPrinciples`、`ExplorePathCta` |
| Routes | `/explore` Hub；`/explore/ai`（Phase 6B）；`/explore/deep-learning`（Phase 6C） |

**Path Focus：** hover / focus Direction、Map track、CTA → 对应 branch 轻微增强，另一条降低但不消失（约 0.5–0.62 opacity）。  
**禁止本阶段模型：** Lesson、Course、Enrollment、Progress、Completion、Quiz、UserLearningPath。  
**视觉：** Bifurcating Learning Path（SVG + CSS）；Morning / Frost / Glacier 色温；无 Skill Tree / 进度条 / lock。

#### Explore AI（Phase 6B）

`/explore/ai` 是 **AI Engineering orientation**，不是课程列表。

| 层 | 说明 |
|----|------|
| Content | `web/src/content/explore-ai.ts` — `AiStage`（facets）、`practiceLoop`、`aiCapstone` |
| View | `ExploreAiView` — page-level `AiStageId \| null` focus |
| Components | `explore-ai/ExploreAiHero`、`ExploreAiPath`、`ExploreAiStages`、`ExploreAiLoop`、`ExploreAiCapstone` |

阶段结构固定为 Capability / Practice / Tools / Deliverable。Practice Loop 为 Understand → Build → Test → Explain → Ship。无 Lesson / Progress。

#### Explore Research Field Guide（Phase 6C）

`/explore/deep-learning` 是 **Deep Learning & Research Field Guide**，不是课程 / 论文库 / LMS。

| 层 | 说明 |
|----|------|
| Content | `web/src/content/explore-research.ts` — `ResearchStage`、`researchLoop`、`evidenceLedger`、`researchCapstone` |
| View | `ExploreDeepLearningView` — `activeStage`（IntersectionObserver）+ `focusedStage`（hover/focus） |
| Components | `explore-research/ResearchHero`、`ResearchSpine`、`ResearchStageJournal`、`ResearchLoop`、`EvidenceLedger`、`ResearchCapstone` |

**信息结构（与 6B 刻意不同）：** Question / Practice / Evidence / Failure Signals。  
**布局：** Desktop sticky Research Spine（`top: var(--sticky-top)`）+ Stage Journal；≤1024 改为顶部横向 index + 全宽 journal。  
**禁止：** Lesson、Progress、Quiz、Paper search/upload、虚构发表 / 录取 / 奖项 / 实验数字。  
**与 Project Case Study 对齐：** Question → Experiment → Evidence → Limitations 语言连续。

#### Explore System topology（Phase 6D）

```
Explore Hub (/explore)
├── Build with AI (/explore/ai)
│   └── Capability → Practice → Tools → Deliverable → Ship
│
└── Understand AI (/explore/deep-learning)
    └── Question → Practice → Evidence → Failure Signals → Research

Both paths → Work Archive (/projects)
```

**Interaction semantics：**  
- Hub Path Focus = preview（blur 后回 neutral）。  
- Research Spine：`activeStage` = scroll reading；`focusedStage` = hover/keyboard preview；click/Enter 滚动后由 IntersectionObserver 更新 active。  
- AI Path：hover/focus = preview only（无 scroll-spy reading state）。  
**禁止：** GenericLearningPath 强行统一两套人格。

#### Placeholder content （public-release gate）

- 前端 content 可标记 `placeholder: true`（Member / Story / Project 等）。  
- 开发阶段保留警示文案是正确的真实性保护。  
- **Placeholder content must be replaced or explicitly gated before public launch.**  
- Phase 4F 不强制 production filtering；上线前不得将 placeholder 静默改为「真实内容」。

#### Event 字段方向（Phase 7A）

**EventFormat**（当前本地真源 · 长期活动类型）：

`id, slug, index, label, title, description, purpose, whatHappens[], takeaway, direction`

真源：`web/src/types/event.ts` + `web/src/content/events.ts`  
View：`EventsView` + `components/events/*`（Community Pulse，非 Calendar）。

**CommunityEvent**（具体场次实例 · 预留 Backend）：

`id, slug, formatId, title, summary, startAt?, endAt?, locationLabel?, status ('draft'|'announced'|'completed'), joinUrl?, public, placeholder?`

Phase 7A：**不**展示虚构 upcoming；Schedule 使用正式 Empty State（Schedule not published yet）。  
**禁止：** EventRegistration、假日期/地点/人数。

#### About — Manifesto + Operating Model（Phase 7C）

`/about` 是 **哲学 / 运作模型页**，不是公司 About Us、时间线、荣誉墙或团队介绍。

| 层 | 说明 |
|----|------|
| Content | `web/src/content/about.ts` — `twoDirections`、`sharedPractice`、`communityPriorities`、`communitySystem`、`communityBoundaries`、`aboutClosing` |
| View | `AboutView` |
| Components | `about/AboutHero`、`AboutDualField`、`AboutDualLens`、`SharedPractice`、`CommunityPriorities`、`CommunitySystem`、`CommunityBoundaries`、`AboutClosing` |

**性质：** 纯 static public content；**不属于** Backend domain。  
**Evidence safety：** 无虚构历史、人数、奖项、合作伙伴、就业/保研承诺。  
**视觉：** Dual Lens SVG（Build 直线 / Understand 曲线 → Shared Practice）；Snow / Glacier / Aurora；无 Three.js、无新依赖。  
**Site IA：** Home=identity · Explore=learning · Events=gathering · Projects=work · Community=people · About=philosophy · Join=entry / orientation。

#### Join — Entry Field / Orientation（Phase 7D）

`/join` 是 **入口 / 定向页**，不是申请表、注册系统或招聘广告页。

| 层 | 说明 |
|----|------|
| Content | `web/src/content/join-page.ts` — directions、process、status、closing |
| View | `JoinView` |
| Components | `join/JoinHero`、`JoinConvergenceVisual`、`JoinEntryField`、`JoinPersonalizedEntry`、`JoinProcess`、`JoinStatus`、`JoinClosing` |

**状态模型：** `committedDirection` + `focusedDirection` → `effectiveDirection`（hover/focus 预览；click/Enter/Space commit）。  
**Evidence safety：** Public Entry = Not Published；无虚构联系方式 / 招新日期 / 人数。  
**视觉：** Entry Field / Convergence（YOU → ENTRY → PRACTICE；BUILD / RESEARCH / HYBRID）；Snow / Glacier / Aurora。  
**Auth User ≠ Community Member** 边界不变；本阶段无 Auth / 表单提交。

#### Frontend Baseline（Phase 4–7 Frozen）

正式 route map：

`/` · `/explore` · `/explore/ai` · `/explore/deep-learning` · `/projects` · `/projects/:slug` · `/events` · `/community` · `/about` · `/join` · `404`

内容真源仍为 `web/src/content/*` static TS。  

**未实现：** Backend · Auth · Admin · LMS · CMS · Registration API。  

**原则：** Frontend IA frozen；Backend 服务前台模型，不倒逼 CRUD 式前台重构。

#### Event 字段方向（旧草稿）

> 下列通用字段方向仍适用于未来 Backend 实例化；以 EventFormat / CommunityEvent 分层为准。

`slug, title, summary, description, location, start_at, end_at, cover?, tags?, published`

### Phase 10 后端优先实体

```
Project
Member
Event
Announcement
Article
Tag
Category
SiteConfig
```

**可选：**

```
JoinApplication
ContactMessage
```

### 明确移出 V1 核心（Future Extension only）

以下**不得**作为当前架构核心模型，仅在 V2/V3 Learning Extension 文档中出现：

- Course / Chapter / Lesson  
- LearningPath / LearningPathNode  
- UserProgress  
- EventRegistration  
- User（会员账号）+ GUEST/MEMBER/ADMIN RBAC 运行时体系  

### 关系草图（后端届时）

```
Project N─N Tag
Project N─N Member（展示型关联 / contributors）
Event N─N Tag
Article N─N Tag
Article N─1 Category
SiteConfig 1（单例或键值）
```

---

## 5. API Domain Planning（Phase 10+）

> 前期无 API。以下为未来公开内容域，非 OpenAPI 定稿。

建议前缀：`/api/v1`

| Domain | 示例 | 说明 |
|--------|------|------|
| Projects | `GET /projects`, `GET /projects/:slug` | 公开读 |
| Members | `GET /members` | 公开读 |
| Events | `GET /events`, `GET /events/:slug` | 公开读 |
| Articles | `GET /articles`… | 可选 |
| Announcements | `GET /announcements` | 可选 |
| Site | `GET /site-config` | 招新链接等 |
| Join / Contact | `POST /join-applications` 等 | 可选写入 |
| Admin write | 按需；不默认复杂 Dashboard | |

**不在默认规划中：** `/auth/register`、`/me/progress`、`/learning-paths`、Course CRUD。

约定（届时）：分页、`{ code, message, details? }` 错误体、ISO 时间。

---

## 6. Permission Model（V1）

### V1 运行时

| 访问 | 说明 |
|------|------|
| 全站公开浏览 | 默认 |
| 内容编辑 | 开发者改本地 content；或 Phase 10 后的受控写入 |

**GUEST / MEMBER / ADMIN 不是 V1 网站运行所必需的权限体系。**

### Future（若需要 CMS）

- 最小管理身份（例如单一 `editor` / `admin`）即可。  
- 细粒度 RBAC、MENTOR、LECTURER、学生学习角色 → Learning Extension，不污染品牌站核心。

---

## 7. 推荐项目目录结构

### Phase 1–9（Frontend-only）

```
.
├── docs/
│   ├── PRODUCT.md
│   ├── DESIGN_SYSTEM.md
│   ├── ARCHITECTURE.md
│   └── ROADMAP.md
├── web/                          # Phase 1 起创建（本轮禁止创建）
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── brand/
│   │   │   ├── project/
│   │   │   ├── community/
│   │   │   └── layout/
│   │   ├── composables/
│   │   ├── content/              # 本地内容真源
│   │   ├── router/
│   │   ├── stores/
│   │   ├── services/             # 后期再充实
│   │   ├── styles/
│   │   ├── types/
│   │   ├── views/
│   │   ├── App.vue
│   │   └── main.ts
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── .gitignore
└── README.md
```

### Phase 10+（追加）

```
server/                           # 仅到 Phase 10 才初始化
├── cmd/server/
└── internal/...                  # 见上文包职责
```

### Monorepo 说明

- 文档为真源；变更架构先改 docs。  
- **当前 Phase 0：仓库仅有 `docs/`，不得创建 `web/` 或 `server/`。**

---

## 8. Future Extension：Learning Platform（记录用）

若产品未来演进为 Learning Platform，可另开扩展设计：

- Auth（JWT）、User、Role  
- Course / Chapter / Lesson  
- LearningPath / Node  
- UserProgress  
- EventRegistration  
- Student Dashboard  

**扩展规则：** 新开文档章节或 `docs/EXTENSIONS_LEARNING.md`；不得在未批准时把上述实体写回 V1 核心目录与 Phase 1–9 路线。

---

## 9. 架构不变式（Vibecoding）

1. V1 是 Brand-first 官网，不是 LMS。  
2. 前期内容走 Local/Mock；Backend 不早于 Phase 10。  
3. 前端视觉由自有 Design System 决定。  
4. 一旦有 Go Backend：永远 `Handler → Service → Repository`。  
5. 不为「以后可能需要」保留 Auth / Progress / Course 脚手架。  
6. 每个已开始的 Phase 结束时项目必须可运行。  
7. 本 Blueprint 验收前：不写业务代码、不建库、不 scaffold。
