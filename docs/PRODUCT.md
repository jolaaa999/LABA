# PRODUCT.md — Brand-first AI Community Website

> 状态：Project Blueprint · Brand-first Revision  
> 版本：v0.3  
> Current Product Mode：`Brand-first AI Community Website`  
> Current Phase：`Phase 8A — Backend Foundation & Domain Model`  
> 约束：Frontend Phase 4–7 frozen；本阶段 Backend only，不改 production UI。

---

## 1. Product Vision

### 一句话定位

面向大学生的 **AI Native Student Community** —— 以品牌体验为核心的大学 AI / Deep Learning 技术社团官方网站。

### 愿景陈述

这不是让成员每天登录上课的学习系统，而是社团对外的长期窗口：

1. 让第一次访问的学生迅速理解这个社团在做什么。  
2. 建立具有 AI / Deep Learning 特征的高质量技术品牌形象。  
3. 展示社团项目、成果、活动与成员。  
4. 展示社团在 **AI × Productivity** 与 **Deep Learning × Research** 两个方向上的能力。  
5. 激发学生加入社团的兴趣。  
6. 持续呈现技术文化、作品与社区气质。

### 产品本质（不是什么 / 是什么）

| 不是 | 是 |
|------|-----|
| Learning Management System | AI Community Brand Experience |
| AI Learning OS / 课程学习平台 | Brand-first Official Website |
| 学生 Dashboard 系统 | Project & Culture Showcase |
| 在线教育门户 | Student Tech Community Window |
| 百度品牌展示站 / 飞桨产品门户 | 独立的大学生 AI 技术社区品牌 |

### 品牌边界

- 社团历史可与「飞桨」相关，但**视觉与叙事不绑定百度品牌**。  
- 不使用百度 Logo、不模仿百度官网、不以 PaddlePaddle 为核心卖点。  
- 技术文化保持开放：AI Coding、Agent、RAG、MCP、PyTorch、CV、NLP、论文复现等均可呈现。

### 品牌语义方向（Brand Narrative）

**品牌名（Brand Name）：** `LABA` —— 导航栏品牌标识、页脚版权与文案中的自称统一使用该名，与仓库 README 的 `LABA — Learn AI. Build AI.` 保持一致。原名 `AI Community` 作为品类描述（AI 技术社区）使用，不再作为品牌标识出现在界面上。

**理念锚点（可保留）：**

```
Learn AI.
Build Intelligence.
Create with AI.
```

**首页 Hero 叙事方向（语义，非强制逐字文案）：**

- 主表达倾向：`We Learn AI. We Build with AI.`  
- 副表达倾向：一个属于大学生的 AI × Deep Learning 技术社区。  

文案实现时可润色，但必须传达：

- 我们在学 AI，也在用 AI 创造；  
- 我们既做生产力实践，也做科研理解；  
- 这是社区，不是课表。

### 文案语言策略（Copy Language Policy · v0.3）

站点**主体语言为中文**。英文只在下列三类位置保留，其余一律使用中文（含中文全角标点）：

| 保留英文 | 内容 |
|----------|------|
| **品牌锚点句** | `Learn AI. Build Intelligence. Create with AI.` · `We Learn AI. We Build with AI.` · 浏览器标题 `Learn AI, Build AI` |
| **方向 / 路径专名** | `Build with AI` · `Understand AI` · `AI × Productivity` · `Deep Learning × Research`（与路由、文档章节绑定，不译） |
| **技术专有名词** | Deep Learning · PyTorch · Transformer · CNN · NLP · Agent · RAG · MCP · AI Coding · Vibecoding · Prompt Engineering · LLM 等，以及 `techStack` 标签 |

**必须中文化：** 导航项、页面标题与 meta description、Section eyebrow / 标题 / 正文、按钮、空状态、可访问性标签（`aria-label` / `alt`）。

**不变式：** 语言切换只作用于**面向访问者的字符串**；代码标识符、路由 path、slug、wire 枚举值、Design Token 名一律不受影响。

**依据：** 本策略不改变品牌边界（仍不绑定百度品牌、不以 PaddlePaddle 为卖点）；品牌锚点句保留英文，是为了维持 `2. 产品本质` 与品牌语义方向的可识别性。

### 成功标准（产品级）

访问者进入网站 **30 秒以内**应产生以下认知：

> “这是一个真正懂 AI、会做项目、会科研，而且很有技术文化的大学生社区。”

而不是：

> “这是一个在线课程平台。”

可观测标准：

- 首页一眼读出双方向（Productivity / Research）与社区身份。  
- Featured Projects 让人相信「他们真的在做东西」。  
- 视觉与互动具有 AI/DL 特征，但不靠机器人素材。  
- Join Us 成为自然收束，而非生硬广告。

---

## 2. 社团核心方向

### Direction A — AI × Productivity

**面向：** 就业 · 实习 · 毕业设计 · AI 时代个人生产力 · 软件开发 · 项目实践  

**内容语义：** AI Coding · Vibecoding · Prompt Engineering · Agent · RAG · MCP · AI Workflow · AI Automation · AI-assisted Development · AI Product Building  

**表达：** 如何真正使用 AI 创造东西。

### Direction B — Deep Learning × Research

**面向：** 保研 · 科研 · 竞赛 · 实验室 · 论文 · 研究项目  

**内容语义：** PyTorch · Deep Learning · CNN · Transformer · Computer Vision · NLP · Paper Reading · Paper Reproduction · Experiment Design · Ablation Study · Academic Writing  

**表达：** 如何真正理解并研究 AI。

> 两个方向在站点中是「我们在探索什么」，不是「请选择课程开始学习」。

---

## 3. User Personas

### P1 — Potential Member「想加入的同学」

- **目标**：判断这个社团值不值得加入。  
- **路径**：Home → Projects / Community → Join。  
- **成功瞬间**：产生「这里的人很强、文化对我胃口」的加入意愿。

### P2 — Career-oriented Student「就业向学生」

- **目标**：了解社团如何用 AI 做项目、提生产力。  
- **路径**：Home Direction A → `/explore/ai` → Projects（AI 向）。  
- **成功瞬间**：看到可共鸣的作品与技术栈。

### P3 — Research-oriented Student「科研向学生」

- **目标**：了解社团 Deep Learning / 论文 / 竞赛能力。  
- **路径**：Home Direction B → `/explore/deep-learning` → Projects（科研向）。  
- **成功瞬间**：相信这里有科研深度，而不只是工具课。

### P4 — Visitor / Partner「外部访客」

- **身份**：老师、其他社团、比赛组织者、企业、媒体等。  
- **目标**：快速评估社团专业度与可合作点。  
- **路径**：Home → Projects / Events / About。  
- **成功瞬间**：留下「靠谱、有作品、有文化」的印象。

### P5 — Community Member「现有成员」

- **角色**：作为作品、故事与文化的一部分被展示。  
- **目标**：被看见；对外代表社团气质。  
- **路径**：Community / Project Detail contributors。  
- **说明**：**不是** Dashboard 用户；V1 不提供登录学习后台。

> V1 不以 Student Dashboard User、Admin CMS Operator 为核心 Persona。内容维护可先用静态数据 / 后期轻量 CMS。

---

## 4. Core User Journeys

### J1 — 30 秒品牌认知（核心）

1. 进入 Home，感受 Snow / Aurora 气质与 Hero 叙事。  
2. 理解：这是大学生 AI × DL 技术社区。  
3. 扫过双方向、Selected Works、社区预览。  
4. 产生信任与兴趣；可选点击 Join 或 Explore。

### J2 — 探索方向

1. Home「What We Explore」或导航 Explore。  
2. 进入 `/explore/ai` 或 `/explore/deep-learning`。  
3. 理解该方向在做什么、有哪些代表项目 / 活动。  
4. CTA：查看作品 / 了解加入。

### J3 — 作品深潜

1. Home Selected Works 或 `/projects`。  
2. 打开 Project Detail（技术栈、成员、GitHub / Demo）。  
3. 形成「他们会做项目」的证据链。

### J4 — 活动与社区氛围

1. `/events` 或 Home「What Happens Here」。  
2. 查看活动详情；了解 Workshop / Paper Reading / Talk 等文化。  
3. `/community` 认识 Featured Members。

### J5 — 转化加入

1. Home Join CTA 或 `/join`。  
2. 阅读招新信息、联系方式、社群入口。  
3. 完成站外加入动作（QQ 群 / 表单链接等；V1 可不做站内账号）。

### J6 — 轻量品牌互动（非教学）

1. 接触首页 Neural / Attention / Agent 等轻量视觉。  
2. 获得「这很 AI」的感受；不进入课程进度流。

---

## 5. Feature Scope

### V1 能力域（按优先级）

| 优先级 | 域 | 说明 |
|--------|-----|------|
| 1 | Brand Identity | 视觉、文案、气质、导航一致性 |
| 2 | Homepage Experience | 八大 Section 品牌叙事 |
| 3 | Projects / Works | 作品集列表与详情 |
| 4 | AI & DL Directions | `/explore`、`/explore/ai`、`/explore/deep-learning` |
| 5 | Events | Community Pulse：活动类型与节奏展示（非日历 / 报名系统） |
| 6 | Community / Members | People & Work：贡献方式、协作关系、公开成员（opt-in；非社交 Feed / 排行榜） |
| 7 | About | Manifesto + Operating Model：为何存在、双方向、共享实践、边界 |
| 8 | Join Us | 招新与联系转化 |
| 9 | Interactive AI/DL Visual | 轻量品牌互动视觉（非重型 Playground） |
| 10 | Content Backend | 后期 Go 内容 API（见架构文档）；非早期必需 |

### V1 明确不做（YAGNI）

- Login / Register / JWT 会员系统  
- Student / Member Dashboard  
- UserProgress / Course Learning Progress  
- Chapter / Lesson 学习系统 / 完整 Course LMS  
- LearningPathNode 数据系统  
- EventRegistration 报名系统  
- GUEST / MEMBER / ADMIN 作为 V1 运行必需的 RBAC  
- 复杂 Admin Dashboard（除非 Phase 10 内容维护确有需要再评估）

### 明确不做（产品边界外）

- 完整社交 Feed / 私信  
- 实时音视频课堂  
- 支付与商业化  
- 多租户 SaaS  
- 强制绑定某一云厂商 / 框架品牌  

---

## 6. V1 / V2 / V3 功能边界

### V1 — Brand Site（可发布的品牌官网）

**目标：** 品牌第一印象 + 作品与社区证据 + 加入转化 + 克制动效与轻量 AI 视觉。

| 模块 | V1 范围 |
|------|---------|
| Home | 完整八大 Section（见下文 IA） |
| Explore / AI / DL | 方向叙事页（静态或本地内容） |
| Projects | 列表 + 详情；首页仅 Featured |
| Events | 列表 + 详情（信息展示） |
| Community | 成员展示；首页 Featured Members |
| About | Manifesto + Operating Model（why / practice / boundaries） |
| Join | 招新、联系、社群入口 |
| Articles | **可选**；有内容再开 |
| Playground / Visual | 品牌级轻互动；禁止重型算法教学器 |
| Content | Local JSON / TS Mock 优先 |
| Backend | **不在 V1 前期**；排至路线末段 |

### V2 — Richer Community Presence（示例）

- 更丰富的 Articles / 技术写作  
- 更完整的互动视觉（仍非完整 LMS）  
- JoinApplication / ContactMessage 等轻量表单后端  
- 内容 CMS（若静态维护成本过高）  

### V3 — Optional Learning Extension（仅记录，不污染 V1）

若未来需要学习平台，可扩展：Course、Progress、Auth、Dashboard 等。  
必须作为 **Architecture Extension**，不得倒灌进当前 V1 核心。

---

## 7. Sitemap

```
/
├── Home                         → /
├── Explore                      → /explore
│   ├── AI × Productivity        → /explore/ai
│   └── Deep Learning × Research → /explore/deep-learning
├── Projects                     → /projects
│   └── Project Detail           → /projects/:slug
├── Events                       → /events
│   └── Event Detail             → /events/:slug
├── Community                    → /community
├── About                        → /about
├── Join Us                      → /join
├── Articles（可选）              → /articles
│   └── Article Detail           → /articles/:slug
└── Playground（可选）            → /playground
```

### 主导航（Brand Site）

```
Home · Explore · Projects · Events · Community · About · Join Us
```

**不再采用** Learning Platform 导航：

```
Home · Paths · Courses · Resources · Projects · Events · Playground · Login
```

---

## 8. 页面职责

| 页面 | 职责 | 关键 CTA |
|------|------|----------|
| **Home** | identity — 品牌叙事总览；建立 30 秒认知 | Explore Our Work / Join |
| **Explore** | learning — 学习地图：两条方向与入口 | /explore/ai · /explore/deep-learning |
| **AI** | Build with AI 工程取向叙事 | 看项目 / 加入 |
| **Deep Learning** | Understand AI 研究现场指南 | 看项目 / 加入 |
| **Projects** | work — 可检查的作品档案 | 打开详情 |
| **Project Detail** | 作品证据：摘要、技术栈、成员、链接 | GitHub / Demo |
| **Events** | gathering — Community Pulse：节奏与诚实日程状态 | Explore / Work Archive / Join |
| **Event Detail** | 未来具体场次详情（Phase 7A 未实现） | 了解更多 / 外链 |
| **Community** | people — People & Work：贡献、协作、公开成员状态 | Explore / Events / Join |
| **About** | philosophy / operating model — 为何存在、共享实践、站点映射、边界 | Explore / Events / Join（非唯一硬推 Join） |
| **Join** | entry / orientation — Entry Field：选方向、理解参与方式、公开招新状态 | Explore / Projects / Events（非假 Apply） |
| **Articles**（可选） | 技术写作与思想输出 | 阅读 |
| **Playground**（可选） | 品牌互动体验入口；非教学平台 | 体验视觉 |

---

## 9. Homepage Information Architecture

首页是整个 V1 的核心交付物。建议叙事顺序：

### Section 01 — Hero

- **目标：** 品牌第一印象。  
- **表达：** AI · Deep Learning · 大学生 · 创造 · 科研 · 技术社区。  
- **可包含：** 主标题、副标题、两个 CTA、轻量 AI / Neural Visual。  
- **CTA 方向：** Explore Our Work · Join the Community。  
- **禁止：** Dashboard 数据块、课程进度、后台统计、廉价 AI Robot、紫色 Cyberpunk、大量 Floating Card。

### Section 02 — What We Explore

- 两大 Interactive Panels：  
  - 左：AI × Productivity（AI Coding / Vibecoding / Agent / RAG / MCP / AI Workflow…）  
  - 右：Deep Learning × Research（PyTorch / CV / Transformer / Paper Reproduction / Experiment Design…）  
- 语义是「我们在探索什么」，不是「开始上课」。

### Section 03 — Selected Works

- 首页核心证据模块；仅 **Featured Projects**。  
- 气质：Design / Engineering Portfolio，而非课程 Card Grid。  
- Project 字段方向：Title、Category、Summary、Tech Stack、Cover、Year、Status、GitHub URL、Demo URL、Featured、Contributors。

### Section 04 — AI / DL Visual Experience

- 用轻量互动建立 AI 特征（Neural Node Graph、Attention Lines、Agent Workflow、Gradient Flow 等意象）。  
- V1 **不实现**复杂算法 Playground；作为品牌互动视觉语言。  
- 例：鼠标靠近节点 → 连线亮起 → 相邻节点轻微响应。  
- 必须：Calm · Minimal · 60 FPS · 支持 Reduced Motion。

### Section 05 — What Happens Here

- 展示社区日常：AI Workshop · Paper Reading · Project Building · Research Sharing · Competition · Open Source · Technical Talk。  
- 优先 Editorial Layout，避免六张同质 Card。

### Section 06 — Community

- Featured Members：name、avatar、role、year、direction、bio、skills、github_url、homepage_url、featured_projects。  
- 重点是「什么样的人」，不是「有多少人」。

### Section 07 — Timeline / Story

- Vertical Narrative Line；4–5 milestones（FOUNDATION → NEXT）。  
- 无真实历史资料时使用 development placeholder，禁止虚构获奖 / 人数 / 合作。

### Placeholder content release policy

- Content entities（Member / Story milestone / Project 等）可带 `placeholder: true`。  
- 开发环境允许显示「DEV PLACEHOLDER」类警示，避免被误认为真实事实。  
- **Placeholder content must be replaced or explicitly gated before public launch.**  
- 公开上线前：`placeholder === true` 的人物 / 未验证历史 / 开发用项目不得静默伪装成真实内容。

### Section 08 — Join Us

- Timeline NEXT 延伸进入 Join Open Ending Canvas。  
- headline + Primary CTA + optional QQ / QR / contact（无则 coming soon）。  
- 品牌回声可极轻呈现 `Learn AI. Build Intelligence. Create with AI.`

---

## 10. Site Information Architecture（正式）

| 页面 | 职责关键词 |
|------|------------|
| Home | identity |
| Explore | learning |
| Events | gathering |
| Projects | work |
| Community | people |
| About | philosophy / operating model |
| Join | entry / orientation |

### About = Manifesto + Operating Model（Phase 7C）

About 回答：**Why does this community exist?**  
同时解释为何 **AI Engineering** 与 **Deep Learning & Research**、**Build** 与 **Understand** 需要共存。

**不是：** Company About Us、荣誉墙、创始人故事、时间线、领导/团队介绍、品牌宣传页。  
**不做：** 未验证历史、虚构成员数/项目数/论文/奖项/合作伙伴。

**页面结构：**

1. Hero — Dual Lens（Build / Understand → Shared Practice）  
2. Why Two Directions  
3. Shared Practice（Question → Make → Test → Explain → Share）  
4. What We Optimize For（Usefulness / Understanding / Reproducibility / Continuity）  
5. How The Site Maps To The Community（operating loop）  
6. What We Are Not（boundaries）  
7. Open Ending（Explore primary → Events → Join）

### Join = Entry Field / Orientation（Phase 7D）

`/join` 是进入实践体系的 **orientation layer**，不是报名表、注册系统或招聘 Landing。

回答：

1. 我适合从哪里开始？（Build / Research / Hybrid）  
2. Hybrid 不是第三条课程路线，而是两种实践之间的移动。  
3. 加入意味着进入实践循环：Orient → Show Up → Make/Question → Share。  
4. 目前哪些内容已公开；Public Entry 仍为 **Not Published**。  
5. 正式招新未发布时，可以先 Explore / Projects / Events。

**禁止：** 虚构 QQ / QR / 邮箱 / 招新日期 / 人数 / Apply·Submit·Register 动作。

内容真源：`web/src/content/join-page.ts`（纯 static public content）。

---

## 11. Frontend Baseline（Phase 4–7 Frozen）

正式公开路由：

```
/
/explore
/explore/ai
/explore/deep-learning
/projects
/projects/:slug
/events
/community
/about
/join
404
```

| 状态 | 说明 |
|------|------|
| Frontend IA | Frozen — Phase 4–7 release-ready baseline |
| Backend | Phase 8A foundation implemented (`backend/`, `/api/v1`) — **not wired to frontend** |
| Auth | not implemented |
| Admin | not implemented |
| LMS | not implemented |

**静态 frontend readiness ≠ 完整 production platform readiness。**  
后续 Backend 应服务已确定的前台产品模型，不得倒逼重构前台 IA。

### Backend Boundary（Phase 8A）

- **Static Editorial Content（Frontend）：** Home / Explore paths / About / Join orientation / Project Case Study body。  
- **Truth-bearing Content（Backend）：** Project metadata、CommunityEvent、Public Members、RecruitingStatus。  
- **Auth User ≠ Community Member。**  
- Contract：`docs/api/public-api.md`。

---

## 文档索引

- 设计语言与 Token / Motion → `docs/DESIGN_SYSTEM.md`  
- Frontend-first 架构与延后 Backend → `docs/ARCHITECTURE.md`  
- Phase 路线与 DoD / 风险 → `docs/ROADMAP.md`
