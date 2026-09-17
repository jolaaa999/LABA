/**
 * Explore Hub — Learning Map public content.
 * Curriculum topology for orientation, not LMS / progress / enrollment.
 */

export type ExplorePathId = 'build' | 'understand'

export interface ExploreTopic {
  id: string
  label: string
  description?: string
}

export interface ExplorePath {
  id: ExplorePathId
  eyebrow: string
  title: string
  audience: string[]
  statement: string
  topics: ExploreTopic[]
  mapStages: string[]
  ctaLabel: string
  to: string
}

export interface SharedFoundation {
  id: string
  label: string
  detail: string
}

export interface LearningPrinciple {
  id: string
  index: string
  label: string
  title: string
  statement: string
}

export const exploreHero = {
  eyebrow: '探索',
  title: '用 AI 成长的两条路。',
  lede: '一条路用 AI 去构建与交付。另一条路深入理解模型，直到能质疑它们。它们分叉——也共享基础。',
}

export const explorePaths: ExplorePath[] = [
  {
    id: 'build',
    eyebrow: 'Build with AI',
    title: 'Build with AI',
    audience: ['职业', '实习', '毕业设计'],
    statement:
      '把 AI 当作工程过程的一部分，而不是绕过思考的捷径。',
    topics: [
      { id: 'ai-coding', label: 'AI Coding', description: '在真实仓库中辅助编程。' },
      { id: 'agents', label: 'Agent Systems', description: '工具、规划与回写。' },
      { id: 'rag', label: 'RAG', description: '基于检索的落地交付。' },
      { id: 'mcp', label: 'MCP', description: '本地工具桥接。' },
      { id: 'workflow', label: '工作流', description: '从意图到已交付的步骤。' },
      { id: 'delivery', label: '交付', description: '交付别人能用的东西。' },
    ],
    mapStages: [
      '基础',
      'AI Coding',
      'Agent Systems',
      'RAG / MCP',
      '工作流',
      '交付',
    ],
    ctaLabel: '开始构建',
    to: '/explore/ai',
  },
  {
    id: 'understand',
    eyebrow: 'Understand AI',
    title: 'Understand AI',
    audience: ['科研', '推荐', '竞赛'],
    statement:
      '深入理解模型，直到能质疑、复现并改进它们。',
    topics: [
      { id: 'pytorch', label: 'PyTorch', description: '实现手艺。' },
      { id: 'dl', label: 'Deep Learning', description: '核心表征。' },
      { id: 'transformer', label: 'Transformer', description: '注意力与结构。' },
      { id: 'papers', label: '论文精读', description: '读方法，不读 hype。' },
      { id: 'repro', label: '复现', description: '把主张变成可运行的实验。' },
      { id: 'research', label: '科研', description: '证据与边界。' },
    ],
    mapStages: [
      '基础',
      'PyTorch',
      'Deep Learning',
      'Transformer',
      '复现',
      '科研',
    ],
    ctaLabel: '开始理解',
    to: '/explore/deep-learning',
  },
]

export const sharedFoundations: SharedFoundation[] = [
  {
    id: 'programming',
    label: '编程基础',
    detail: '足以用代码表达想法的熟练度。',
  },
  {
    id: 'git',
    label: 'Git',
    detail: '可以信任并分享的版本历史。',
  },
  {
    id: 'python',
    label: 'Python',
    detail: '工具与实验的共同语言。',
  },
  {
    id: 'reading',
    label: '技术阅读',
    detail: '文档、论文与失败记录——读的是方法。',
  },
  {
    id: 'decompose',
    label: '问题拆解',
    detail: '把模糊目标拆成可检验的步骤。',
  },
  {
    id: 'docs',
    label: '文档习惯',
    detail: '留下别人能接着走的痕迹。',
  },
  {
    id: 'debug',
    label: '调试与实验习惯',
    detail: '一次只改一处，观察，然后记录。',
  },
]

export const learningPrinciples: LearningPrinciple[] = [
  {
    id: 'build',
    index: '01',
    label: '构建',
    title: '在构建中学习',
    statement:
      '工作坊与项目比被动听讲更重要。让一个东西真正跑起来。',
  },
  {
    id: 'reproduce',
    index: '02',
    label: '复现',
    title: '在复现中学习',
    statement:
      '把论文与想法变成实验——而不只是变成幻灯片。',
  },
  {
    id: 'explain',
    index: '03',
    label: '解释',
    title: '在解释中学习',
    statement:
      '同伴讨论会逼出清晰。如果讲不清为什么，就还不算真正掌握。',
  },
  {
    id: 'share',
    index: '04',
    label: '分享',
    title: '在分享中学习',
    statement:
      '把过程、失败与结果留给这条路上的后来者。',
  },
]

export function getExplorePath(id: ExplorePathId): ExplorePath | undefined {
  return explorePaths.find((path) => path.id === id)
}
