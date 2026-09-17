# DESIGN_SYSTEM.md — Snow · Aurora · Sky · Glass

> 状态：Project Blueprint · Brand-first Revision  
> 版本：v0.5（Phase 4D.1 Purposeful Advanced Interaction）  
> Current Product Mode：`Brand-first AI Community Website`  
> Current Phase：`Phase 4D.1 — Unified Intelligence Canvas`（实现完成，等待验收）  
> 原则：明亮、干净、空气感、年轻科研气质；克制动效；服务品牌官网而非 LMS / Dashboard。

---

## 1. Design Language

### 视觉关键词

雪白 · 极光蓝 · 清晨白 · 鱼肚白 · 象牙白 · 雪山蓝 · 溪水蓝 · 汉白玉 · 雪雾白 · 晴空蓝 · 海盐蓝 · 月苍白 · 霜洁 · 雪莹

### 气质公式

```
Snow + Aurora + Sky + Glass + Minimalism
```

### 要传达的感受

| 要 | 不要 |
|----|------|
| 明亮、干净、空气感 | 纯黑背景、紫黑赛博 |
| 现代、年轻、有技术文化 | 大面积 Neon、紫色 Cyberpunk |
| 科技感 + 科研感 + 社区感 | 廉价渐变、Bootstrap 感 |
| 高级但不冰冷 | Element Admin / 普通 Dashboard 堆砌 |
| 留白、编辑式叙事 | 密集课程卡片墙、巨大圆角 everywhere |
| 克制玻璃质感 | AI 机器人素材滥用 |

### 构图原则（Brand Site）

1. **约 85%** 白色 / 中性色承载阅读与留白。  
2. **约 10%** 浅蓝（Frost / Glacier / Stream）建立氛围。  
3. **约 5%** Aurora / Sky 作为强调（CTA、焦点、互动高亮）。  
4. 首页第一屏：**一个构图** —— 品牌 Hero，不是仪表盘，不是课表。  
5. Glass 用于 Navbar、少量强调面板与浮层；不做满屏毛玻璃。  
6. 视觉锚点优先：抽象几何、神经网络意象、作品封面、成员真实感；避免机器人表情包。  
7. Projects 呈现偏 **Portfolio**；Events / Story 偏 **Editorial**。

### 字体方向（已落地）

- **Display / Sans**：Segoe UI Variable + PingFang / Hiragino / Noto Sans SC / YaHei 语义栈（无 Arial 核心）。  
- **Mono**：JetBrains Mono / Cascadia Code / SF Mono / Consolas。  
- 本地品牌字体文件可后续替换，不改变 Token 名称。

### 空间与圆角

- 大留白；section 间距大于组件间距。  
- 圆角：小到中（控件 8–12px，面板 12–16px）；禁止处处 stadium / 超大 radius。  
- 阴影：极轻、偏冷色扩散。

---

## 2. Design Tokens（已实现）

> 真源：`web/src/styles/tokens.css`  
> 组件只消费 CSS Variables，禁止散落魔法色值。

### 2.1 Color Tokens

#### Surface / Neutrals（~85%）

| Token | 值 | 用途 |
|-------|-----|------|
| `--color-snow` | `#FCFDFE` | 页面主底 |
| `--color-morning` | `#F7FAFC` | 次级底 |
| `--color-ivory` | `#FAFAF7` | 暖白点缀 |
| `--color-frost` | `#EDF4F8` | 浅分隔、输入底 |
| `--color-white` | `#FFFFFF` | 纯白浮层 |
| `--color-mist` | `#E8EEF3` | 边框浅 |
| `--color-line` | `#D5DEE7` | 默认边框 |

#### Blue Atmosphere（~10%）

| Token | 值 | 用途 |
|-------|-----|------|
| `--color-glacier` | `#DDEEFF` | 氛围洗色 |
| `--color-stream` | `#B8DEFF` | 次强调 |
| `--color-aurora` | `#79BEFF` | 强调光感 |
| `--color-sky` | `#4EA5F5` | 主 CTA / 链接 |
| `--color-mountain` | `#276FAE` | 深强调 |

#### Text / Semantic

| Token | 值 / 方向 |
|-------|-----------|
| `--color-text` | `#10243A` |
| `--color-text-secondary` | `#64778A` |
| `--color-text-muted` | `#8A9AAB` |
| `--color-text-inverse` | `#FCFDFE` |
| `--color-success` | `#3F8F7A`（冷绿） |
| `--color-warning` | `#B8873C`（柔琥珀） |
| `--color-danger` | `#C45F6D`（柔玫红） |
| `--color-info` | 映射 `--color-sky` |

### 2.2 Typography / Space / Radius / Elevation / Glass / Motion / Layout

已在 `tokens.css` 落地：`--font-*`、`--text-xs`…`--text-5xl`、`--space-*`、`--radius-*`、`--shadow-*`、`--glass-*`、`--ease-*`、`--duration-*`、`--border-*`、`--z-*`。

Phase 3 Layout Tokens：

| Token | 值 / 方向 | 用途 |
|-------|-----------|------|
| `--container-max` | `72rem` | 内容最大宽度 |
| `--page-gutter` | `var(--space-6)`（小屏 `space-4`） | 水平内边距 |
| `--nav-height` | `4.25rem` | Navbar 默认高度 |
| `--nav-height-scrolled` | `3.75rem` | 滚动后高度 |

### 2.3 CSS 结构

```
src/styles/
├── tokens.css   # Design Tokens
├── reset.css    # Browser baseline
└── main.css     # imports + app baseline + focus/selection
```

预览页：`/style-guide`（非正式导航）。

---

## 3. Motion Design System

### 交互原则

```
Calm · Fluid · Responsive · Natural · Delightful
```

### 已实现基础设施

- `useMotionPreference()` → `prefersReducedMotion` / `motionEnabled`（基于 VueUse）  
- `MotionSection`：Intersection 一次揭示；Reduced Motion 直接最终态  
- 全局 `@media (prefers-reduced-motion: reduce)` 降级过渡  

### 禁止（默认）

- `hover scale(1.1)`、持续闪烁、跑马灯边框、粒子 spam、无目的重 WebGL、大型 UI Framework

### Purposeful Advanced Interaction

允许在**明确服务品牌叙事**的场景使用 WebGL / Three.js / Canvas / GSAP / 高级状态动画。

原则：

```
Technology can be heavy. The experience must feel light.
```

高级交互门槛：

- progressive enhancement  
- performance-aware（DPR clamp、mobile tier、adaptive degradation）  
- reduced-motion aware  
- mobile-adaptive  
- pause offscreen + `document.hidden`  
- disposable（几何 / 材质 / renderer / listeners / GSAP 全清理）  
- fallback available（WebGL 失败 → 静态 SVG/CSS）

禁止：

- 无意义 GPU 炫技、全站常驻 `requestAnimationFrame`  
- 高成本粒子 spam、剧烈 camera fly-through  
- 影响可读性的抖动、为炫技而每 Section 堆 Three.js  

Performance Policy（Intelligence Canvas）：

| 项 | 策略 |
|----|------|
| DPR | Desktop `min(dpr, 1.5)`；Mobile `1.0–1.25` |
| Loop | 仅 section visible ∧ document visible ∧ motion/scene active |
| Tier | `high` / `balanced` / `reduced`（按宽度与启发式信号） |
| Morph | GSAP 驱动 `morph∈[0,1]`；同一 Scene 插值，不重建 renderer |

Reduced Motion：停连续物理感运动 / pointer parallax / awaken；模式切换 instant 或 ≤150ms。

Scene Lifecycle：`mount` → `setVisible` / pause·resume → `setMode` morph → `dispose`。

---

## 4. Components

### Phase 2 已实现（`src/components/ui/`）

| 组件 | API 摘要 |
|------|----------|
| `AuroraButton` | `variant`: primary \| secondary \| ghost；`size`: sm \| md \| lg；`disabled` |
| `GlassCard` | `variant`: plain \| glass \| elevated；`padding`: sm \| md \| lg |
| `GlowBorder` | `active?`；`focusable?`；hover/focus 边光 |
| `GradientText` | `as`；Mountain→Sky→Aurora 渐变字 |
| `SectionHeader` | `eyebrow?` `title` `description?` `align`: left \| center |
| `MotionSection` | `as`；`offsetY`: 12 \| 16 \| 20；一次 reveal |

### Phase 3 已实现（`src/components/layout/`）

| 组件 | 职责 |
|------|------|
| `AppShell` | Navbar + Main(RouterView Transition) + Footer；`meta.shell === false` 时裸页 |
| `SiteNavbar` | Desktop / Mobile 导航、Morphing、Active、Join CTA |
| `SiteFooter` | 简洁品牌收束与主导航 |
| `PageContainer` | `max-width` + gutter；可选 `narrow` |

### 后续 Phase（品牌业务组件，尚未实现）

**Phase 4 — Homepage（后续）**

| 组件 | 状态 |
|------|------|
| `HeroSection` | Phase 4A 已实现 |
| `HeroVisual` | Phase 4A 已实现（SVG Neural Constellation） |
| `DirectionSection` | Phase 4B 已实现 |
| `DirectionPanel` | Phase 4B 已实现（editorial direction surfaces） |
| `SelectedWorksSection` | Phase 4C 已实现 |
| `ProjectShowcase` / `ProjectPreview` / `ProjectVisual` | Phase 4C 已实现（portfolio composition） |
| `IntelligenceSection` + `intelligence/*` | Phase 4D.1 已实现（Unified Intelligence Canvas） |
| `WhatHappensSection` + `community/Activity*` | Phase 4D.2 已实现（Living Editorial Stream） |
| `CommunitySection` + Spotlight / Roster / Identity | Phase 4E.1 已实现（People Behind the Work） |
| `StorySection` + `JoinSection` | Phase 4E.2 已实现（Narrative Ending） |
| Projects Listing 等 | Phase 5+ |

#### Narrative Timeline / Story→CTA（Phase 4E.2）

- **Vertical Narrative Line**：scroll progress illuminate；无 scroll-jack / pin。  
- **Story → Join continuum**：NEXT 节点线延伸进入 Join Open Ending Canvas。  
- **Join**：statement + Primary CTA；联系渠道 optional-friendly；禁虚构 QQ / QR。

#### Explore Research patterns（Phase 6C）

| Pattern | 用途 |
|---------|------|
| **Research Spine** | Desktop sticky 左栏阶段导航（`top: var(--sticky-top)`）；scroll active + hover focus；≤1024 改为横向 index |
| **Stage Journal** | 开放式 editorial：Question / Practice / Evidence / Failure Signals（非 6B Capability 四字段） |
| **Evidence Ledger** | Config / Metric / Failure / Limitation — 科研证据观，非 Feature Cards |
| **Research Loop** | Question → … → New Question；与 6B Practice Loop 人格分离 |

视觉：relational / layered / quiet（Snow–Morning–Glacier）；SVG reasoning map；无实验室 icon / Skill Tree / Progress。

---

## 5. 使用纪律

1. 新 UI 必须消费 Token；禁止页面私自发明色板/间距。  
2. 先查 `/style-guide`，再写业务页面。  
3. Glass / Glow / GradientText 少用。  
4. 深色模式：V1 不做。
