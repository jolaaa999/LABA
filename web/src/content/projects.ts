/**
 * Development placeholder content for Selected Works + Work Archive + Case Study.
 * Replace with real community projects when available.
 * NOT claimed as real club deliverables.
 *
 * Placeholder content must be replaced or explicitly gated before public launch.
 * Case study wording for placeholder:true uses intended / planned / illustrative language.
 */
import type { Project, ProjectCaseStudy } from '../types/project'
import {
  getProjectCategoryLabel,
  matchesProjectFilter,
  type ProjectFilterId,
} from '../types/project'

const agentCase: ProjectCaseStudy = {
  overview:
    '校园 Agent 工作坊旨在探索如何把社团活动里的重复协调工作，收敛成可拆解、可调用工具、可回写结果的 Agent 工作流设计。',
  problem:
    '活动筹备时，任务常分散在聊天与文档里：拆解不清晰、工具调用靠人手、结果难以回写到统一记录——这是本设计要回应的痛点。',
  approach:
    '设计主链为 Task → Plan → Tool → Observe → Result，把意图翻译成可执行步骤，并用本地工具桥接减少“只能聊不能办”。',
  architecture: {
    summary: '计划中的结构：轻量编排层 + 工具适配层 + 结果回写。',
    nodes: [
      { id: 'intent', label: '意图', detail: '活动目标与约束' },
      { id: 'planner', label: '规划器', detail: '步骤拆解与优先级' },
      { id: 'tools', label: '工具', detail: 'MCP / 本地脚本' },
      { id: 'memory', label: '记忆', detail: '短时上下文与清单' },
      { id: 'writeback', label: '回写', detail: '结果归档' },
    ],
  },
  workflow: [
    {
      title: '捕捉意图',
      detail: '目标：把活动目标写成可检查的任务描述。',
    },
    {
      title: '规划步骤',
      detail: '目标：生成有序步骤，并标注所需工具。',
    },
    {
      title: '调用工具',
      detail: '目标：执行文件、通知或清单类动作。',
    },
    {
      title: '观察并回写',
      detail: '目标：记录结果，回写到共享笔记。',
    },
  ],
  results: [
    {
      label: '示意性演示路径',
      detail: '目标演示路径为 Task → Plan → Tool → Result；尚未作为生产系统验证。',
    },
    {
      label: '共享词汇（拟议）',
      detail: '设计目标：用同一套 Task / Tool / Result 语言讨论 Agent。',
    },
  ],
  limitations: [
    '当前为开发占位：无真实线上部署与稳定性数据。',
    '工具权限与安全边界仍需在实现阶段约束。',
  ],
  artifacts: [
    { label: '设计笔记', kind: 'notes', note: '仅作示意' },
    { label: '代码仓库', kind: 'repo', note: '未发布' },
  ],
  collaborators: [{ name: '开发占位', role: '工程' }],
  nextSteps: [
    '若进入实现：补齐评测用例与失败回放。',
    '收敛工具白名单与权限模型。',
  ],
}

const researchCase: ProjectCaseStudy = {
  overview:
    '注意力消融实验台规划用对照实验整理 Transformer attention 的复现与消融记录，强调可复查的配置与失败样本归档方式。',
  question:
    '在固定数据与训练预算下，不同 attention 变体对稳定性与指标曲线的影响是什么？哪些失败模式可能重复出现？',
  approach:
    '计划统一复现脚本、对照配置表与日志约定；每次消融只改一个关键因子，并把失败样本单独归档。',
  experiment: {
    summary: '计划中的小规模对照消融框架，优先可复查而非刷榜。',
    setup: '计划固定随机种子、数据切分与训练步数，并记录配置哈希。',
    metrics: ['验证损失', '注意力熵（近似）', '失败率'],
    controls: ['基线注意力', '被消融的头 / 模式'],
  },
  observations: [
    '观察消融是否影响早期训练稳定性，以及是否需要更长 warmup。',
    '检查失败样本是否更常出现在长序列或边缘类别。',
    '检查日志命名一致性是否影响对照可读性。',
  ],
  results: [
    {
      label: '配置台账',
      detail: '预期产物：可对照的实验配置记录结构。',
    },
    {
      label: '失败案例索引',
      detail: '预期产物：结构化的失败样本复查索引。',
    },
  ],
  limitations: [
    '尚未执行真实实验；不可外推为模型结论。',
    '占位内容，非已发表论文结果。',
  ],
  artifacts: [
    { label: '实验笔记', kind: 'notes', note: '示意性提纲' },
    { label: '配置模板', kind: 'other', note: '仅设计' },
  ],
  collaborators: [{ name: '开发占位', role: '科研' }],
  nextSteps: [
    '有真实跑数后再补对照维度与可视化。',
    '把失败样本分类写成短文（若实验执行）。',
  ],
}

const toolCase: ProjectCaseStudy = {
  overview:
    '论文流水线 CLI 计划把论文阅读、复现清单与实验记录串成命令行流水线，减少文档在协作中的漂移。',
  problem:
    '笔记、清单与实验日志分散在不同文件与约定里，交接时容易丢步骤、丢版本。',
  approach:
    '设计统一命令入口管理 parse → checklist → log 三个阶段，并约定最小元数据字段。',
  architecture: {
    summary: '计划实现：CLI 编排 + Markdown 约定 + 本地文件存储。',
    nodes: [
      { id: 'parse', label: '解析', detail: '论文笔记结构化' },
      { id: 'checklist', label: '清单', detail: '复现清单' },
      { id: 'runlog', label: '运行日志', detail: '实验记录' },
      { id: 'export', label: '导出', detail: '汇总输出' },
    ],
  },
  workflow: [
    { title: '读入笔记', detail: '目标：从 Markdown 读取基础字段。' },
    { title: '生成清单', detail: '目标：生成可勾选复现项。' },
    { title: '追加运行日志', detail: '目标：写入一次实验摘要。' },
    { title: '导出汇总', detail: '目标：输出可读汇总。' },
  ],
  usage: [
    {
      title: '初始化工作区',
      detail: '拟定命令：paper pipeline init — 建立目录约定。',
    },
    {
      title: '运行阶段',
      detail: '拟定命令：paper pipeline run --from notes — 执行流水线。',
    },
    {
      title: '导出',
      detail: '拟定命令：paper pipeline export — 生成汇总。',
    },
  ],
  results: [
    {
      label: 'CLI 形态（拟议）',
      detail: '设计目标：命令与目录约定可被其他工具型项目参考。',
    },
    {
      label: '拟定状态：已共享',
      detail: '分发模型设想为社团内部示例；并非已发布生产软件。',
    },
  ],
  limitations: [
    '尚未形成可发布实现；无远程协作与权限系统。',
    '解析规则仍属设计假设，依赖笔记格式约定。',
  ],
  artifacts: [
    { label: 'CLI 草图', kind: 'repo', note: '未发布' },
    { label: '使用说明', kind: 'notes', note: '示意' },
  ],
  collaborators: [{ name: '开发占位', role: '工具' }],
  nextSteps: [
    '增强解析容错与 schema 校验（实现阶段）。',
    '补一小套示例论文笔记。',
  ],
}

export const projects: Project[] = [
  {
    slug: 'campus-agent-workshop',
    title: '校园 Agent 工作坊',
    category: 'ai-engineering',
    summary:
      '一个面向社团活动的 Agent 工作流设计：从任务拆解到工具调用与结果回写，探索把“能聊”变成“能办”。',
    year: '2026',
    status: '进行中',
    techStack: ['Vue', 'TypeScript', 'Agent', 'MCP'],
    featured: true,
    featuredRank: 1,
    visualKind: 'agent',
    placeholder: true,
    caseStudy: agentCase,
  },
  {
    slug: 'attention-ablation-lab',
    title: '注意力消融实验台',
    category: 'research',
    summary:
      '围绕 Transformer attention 的复现与消融实验规划：对照配置、指标曲线与失败样本归档方式。',
    year: '2025',
    status: '进行中',
    techStack: ['PyTorch', 'Transformer', 'CV', 'Experiment'],
    featured: true,
    featuredRank: 2,
    visualKind: 'research',
    placeholder: true,
    caseStudy: researchCase,
  },
  {
    slug: 'paper-pipeline-cli',
    title: '论文流水线 CLI',
    category: 'developer-tool',
    summary:
      '计划把论文阅读、复现清单与实验记录串成命令行流水线，减少科研协作里的文档漂移。',
    year: '2025',
    status: '已共享',
    techStack: ['Go', 'CLI', 'Markdown', 'Workflow'],
    featured: true,
    featuredRank: 3,
    visualKind: 'tool',
    placeholder: true,
    caseStudy: toolCase,
  },
  {
    slug: 'rag-lab-notes',
    title: 'RAG 实验笔记',
    category: 'ai-engineering',
    summary:
      '检索增强问答的实验笔记框架：规划 chunk 策略、评测集与失败案例归档方式。',
    year: '2025',
    status: '已共享',
    techStack: ['Python', 'Embedding', 'RAG', 'Eval'],
    featured: false,
    featuredRank: 4,
    visualKind: 'agent',
    placeholder: true,
    caseStudy: {
      overview:
        '规划记录 RAG 实验中的 chunk、检索与评测选择，把失败案例整理成可复用笔记结构。',
      problem: '策略常散落在个人笔记，新人难以复现同一评测口径。',
      approach: '计划固定评测集，对照 chunk / top-k / rerank 组合并归档失败问答。',
      workflow: [
        { title: '构建评测集', detail: '目标：标注一组可复查问答。' },
        { title: '遍历策略', detail: '目标：对照 chunk 与检索参数。' },
        { title: '归档失败样本', detail: '目标：失败样本分类入库。' },
      ],
      results: [
        {
          label: '可复用笔记（目标）',
          detail: '设计目标：形成可引用的策略备忘结构；尚未验证采用效果。',
        },
      ],
      limitations: ['未接生产检索服务；无真实评测跑数。'],
      artifacts: [{ label: '实验笔记', kind: 'notes', note: '示意' }],
      nextSteps: ['若实现：补自动评测脚本。'],
    },
  },
  {
    slug: 'vision-baseline-kit',
    title: '视觉基线套件',
    category: 'research',
    summary:
      '轻量视觉基线脚手架规划：固定数据切分、训练日志与对比表，降低入门复现摩擦。',
    year: '2025',
    status: '进行中',
    techStack: ['PyTorch', 'CV', 'Hydra', 'Logging'],
    featured: false,
    featuredRank: 5,
    visualKind: 'research',
    placeholder: true,
    caseStudy: {
      overview: '规划为视觉入门复现提供固定切分与日志约定的基线脚手架。',
      question: '如何让新人在最短路径上跑通可对照的视觉基线？',
      approach: '计划模板化配置、日志与对比表，减少环境差异。',
      experiment: {
        summary: '计划中的标准分类基线模板。',
        setup: '计划固定 split 与 seed。',
        metrics: ['准确率', '训练耗时'],
      },
      observations: [
        '检查统一日志字段后，对照成本是否下降。',
      ],
      results: [
        {
          label: '入门套件（拟议）',
          detail: '预期产物：可用于 workshop 演示的模板结构。',
        },
      ],
      limitations: ['覆盖任务面窄；尚无真实训练产物。'],
      artifacts: [{ label: '套件笔记', kind: 'notes', note: '示意' }],
      nextSteps: ['加更多 backbone 模板（实现阶段）。'],
    },
  },
  {
    slug: 'mcp-toolbench',
    title: 'MCP 工具台',
    category: 'open-source',
    summary:
      '一组面向本地开发的 MCP 工具样例规划：文件、终端与笔记桥接，方便 Agent 实验接线。',
    year: '2026',
    status: '已共享',
    techStack: ['TypeScript', 'MCP', 'Node', 'CLI'],
    featured: false,
    featuredRank: 6,
    visualKind: 'tool',
    placeholder: true,
    caseStudy: {
      overview: '规划提供本地 MCP 工具样例，方便 Agent 实验快速接线。',
      problem: '每次实验都要从零写工具适配，启动成本高。',
      approach: '计划沉淀文件 / 终端 / 笔记三类最小工具。',
      usage: [
        { title: '本地安装', detail: '拟定：在开发机挂载样例 server。' },
        { title: '调用工具', detail: '拟定：从 Agent 侧调用白名单工具。' },
      ],
      architecture: {
        summary: '计划中的 MCP server 样例集合。',
        nodes: [
          { id: 'fs', label: '文件系统' },
          { id: 'shell', label: '终端' },
          { id: 'notes', label: '笔记' },
        ],
      },
      results: [
        {
          label: '拟定状态：已共享',
          detail: '分发模型设想为学习 / 演示样例；非生产加固发布。',
        },
      ],
      limitations: ['权限模型仅为设计假设。'],
      artifacts: [{ label: '工具台', kind: 'repo', note: '未发布' }],
      nextSteps: ['补安全沙箱说明。'],
    },
  },
  {
    slug: 'club-ops-assistant',
    title: '社团运营助手',
    category: 'ai-engineering',
    summary:
      '社团运营助手原型规划：活动通知草稿、清单生成与周报摘要，探索 AI × 生产力落地路径。',
    year: '2026',
    status: '草稿',
    techStack: ['LLM', 'Prompt', 'Notion', 'Automation'],
    featured: false,
    featuredRank: 7,
    visualKind: 'agent',
    placeholder: true,
    caseStudy: {
      overview: '计划验证运营场景下的提示词与草稿生成，是否能减少重复文书。',
      problem: '通知、清单与周报格式重复，占用组织时间。',
      approach: '设计模板化提示 + 人工审阅后发布的流程。',
      workflow: [
        { title: '收集输入', detail: '目标：收集活动要点与时间。' },
        { title: '起草', detail: '目标：生成通知 / 清单草稿。' },
        { title: '复核', detail: '目标：人工修订后发出。' },
      ],
      results: [
        {
          label: '草稿原型（拟议）',
          detail: '目标状态为可内部试用的草稿助手；尚未正式上线。',
        },
      ],
      limitations: ['依赖人工终审；无真实使用数据。'],
      nextSteps: ['沉淀常用模板库。'],
    },
  },
  {
    slug: 'hackathon-starter-pack',
    title: '黑客松起步包',
    category: 'competition',
    summary:
      '面向短期黑客松的脚手架说明与模板索引（开发占位）：目录约定、提交清单与演示脚本。',
    year: '2024',
    status: '归档',
    techStack: ['Template', 'Docs', 'Demo'],
    featured: false,
    featuredRank: 8,
    visualKind: 'tool',
    placeholder: true,
    caseStudy: {
      overview: '规划为短期黑客松提供目录、提交与演示约定的起步包说明。',
      problem: '临时组队时结构混乱，演示前才发现缺材料。',
      approach: '用清单与模板约束最小交付物。',
      workflow: [
        { title: '初始化', detail: '目标：复制目录约定。' },
        { title: '填写清单', detail: '目标：对照提交项。' },
        { title: '演示脚本', detail: '目标：准备演示路径。' },
      ],
      results: [
        {
          label: '起步包提纲（示意）',
          detail: '当前为占位材料结构，待真实赛事资料替换。',
        },
      ],
      limitations: ['非特定赛事官方材料。'],
      artifacts: [{ label: '起步文档', kind: 'notes', note: '示意' }],
      nextSteps: ['按真实赛事更新清单。'],
    },
  },
]

/** Content revision stamp for archive header (local mock). */
export const PROJECTS_ARCHIVE_UPDATED = '2026-09'

export function getAllProjects(): Project[] {
  return [...projects].sort(
    (a, b) => (a.featuredRank ?? 99) - (b.featuredRank ?? 99),
  )
}

export function getFeaturedProjects(): Project[] {
  return projects
    .filter((project) => project.featured)
    .sort((a, b) => (a.featuredRank ?? 99) - (b.featuredRank ?? 99))
}

export function getProjectsByFilter(filter: ProjectFilterId): Project[] {
  return getAllProjects().filter((project) =>
    matchesProjectFilter(project, filter),
  )
}

export function getArchiveFeatured(filter: ProjectFilterId): Project | undefined {
  const list = getProjectsByFilter(filter)
  return list.find((project) => project.featured) ?? list[0]
}

export function getArchiveIndex(
  filter: ProjectFilterId,
  featuredSlug?: string,
): Project[] {
  return getProjectsByFilter(filter).filter(
    (project) => project.slug !== featuredSlug,
  )
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

/** Continue Exploring: same category first, then others; exclude self; take 2. */
export function getRelatedProjects(slug: string, limit = 2): Project[] {
  const current = getProjectBySlug(slug)
  if (!current) return []
  const others = getAllProjects().filter((project) => project.slug !== slug)
  const same = others.filter((project) => project.category === current.category)
  const rest = others.filter((project) => project.category !== current.category)
  return [...same, ...rest].slice(0, limit)
}

export function formatProjectMeta(project: Project): string {
  const parts = [
    getProjectCategoryLabel(project.category).toUpperCase(),
    project.year,
  ]
  if (project.status) parts.push(project.status.toUpperCase())
  return parts.join(' / ')
}

export function formatProjectTech(project: Project): string {
  return project.techStack.map((item) => item.toUpperCase()).join(' · ')
}
