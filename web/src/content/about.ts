/**
 * About page — Manifesto + Operating Model (static public content).
 * Not history, marketing, staff directory, or fake metrics.
 */

export const aboutHero = {
  eyebrow: '关于',
  title: '学会用 AI 构建。\n学会追问 AI。',
  lede: '现代 AI 要求两种素养：用模型构建有用系统的能力，以及理解、测试、复现并追问它们的能力。这个社区让两者处在同一个房间里。',
}

export const twoDirections = {
  eyebrow: '两个方向',
  title: '不同的目标。\n共同的准则。',
  bridge:
    '构建受益于理解。理解在实践之中变得更加锐利。',
  hybridNote:
    'Hybrid 不是第三条路。它指有人在工程的实践与科研的思辨之间，于不同阶段来回移动。',
  build: {
    label: 'Build with AI',
    question: '我如何把模型变成有用的东西？',
    topics: [
      'AI Coding',
      'Agent Systems',
      'RAG / MCP',
      '工作流',
      '评估',
      '交付',
    ],
    outcome: '可用的系统、工具、工作流与原型。',
  },
  understand: {
    label: 'Understand AI',
    question: '我如何知道模型实际在做什么？',
    topics: [
      'Deep Learning',
      'PyTorch',
      'Transformer',
      '论文精读',
      '复现',
      '实验',
      '证据',
    ],
    outcome: '问题、实验、可复现的笔记与证据。',
  },
  audiences: {
    build: ['职业', '实习', '毕业设计'],
    understand: ['科研', '推荐', '竞赛'],
  },
}

export interface SharedPracticeStep {
  id: string
  index: string
  label: string
  statement: string
}

export const sharedPractice = {
  eyebrow: '共同实践',
  title: '方法比标签\n更重要。',
  lede: '无论工作看起来像工程还是科研，同一种准则让它保持诚实。',
  steps: [
    {
      id: 'question',
      index: '01',
      label: '提问',
      statement:
        '在让模型替你编造答案之前，先点明问题、目标、假设与约束。',
    },
    {
      id: 'make',
      index: '02',
      label: '动手',
      statement:
        '工程构建系统；科研构建实验。两者都产出可被检视的东西。',
    },
    {
      id: 'test',
      index: '03',
      label: '验证',
      statement:
        '它真的有效吗？证据支持这个结论吗？不要相信第一次的输出。',
    },
    {
      id: 'explain',
      index: '04',
      label: '解释',
      statement:
        '说清发生了什么、为什么、什么失败了，以及还有什么未知。',
    },
    {
      id: 'share',
      index: '05',
      label: '分享',
      statement:
        '留下代码、README、配置、笔记、证据、失败案例，或别人能继续追问的问题。',
    },
  ] satisfies SharedPracticeStep[],
}

export interface CommunityPriority {
  id: string
  index: string
  label: string
  statement: string
}

export const communityPriorities = {
  eyebrow: '我们看重什么',
  title: '不要更多 AI。\n要更好的 AI 实践。',
  items: [
    {
      id: 'usefulness',
      index: '01',
      label: '有用性',
      statement: '不只是一个酷炫的演示——别人能用它或测它。',
    },
    {
      id: 'understanding',
      index: '02',
      label: '可理解性',
      statement:
        '不只是术语——还有假设、边界、失败模式，以及它为何有效。',
    },
    {
      id: 'reproducibility',
      index: '03',
      label: '可复现',
      statement: '别人能知道改了什么、怎么跑的、测了什么。',
    },
    {
      id: 'continuity',
      index: '04',
      label: '延续性',
      statement:
        '工作不会在一次活动后消失——它会留下笔记、工具、问题或证据。',
    },
  ] satisfies CommunityPriority[],
}

export interface SystemNode {
  id: string
  label: string
  routeLabel: string
  to: string
  statement: string
}

export const communitySystem = {
  eyebrow: '运作方式',
  title: '这个网站是实践的一张地图。',
  lede: '学习、相聚、工作、人与延续，构成一个循环——不是一张宣传册式的站点地图。',
  nodes: [
    {
      id: 'learn',
      label: '学习',
      routeLabel: '探索',
      to: '/explore',
      statement: '找一个方向——Build with AI 或 Understand AI。',
    },
    {
      id: 'gather',
      label: '相聚',
      routeLabel: '活动',
      to: '/events',
      statement: '以共享时光的方式一起实践。',
    },
    {
      id: 'make',
      label: '动手',
      routeLabel: '作品',
      to: '/projects',
      statement: '留下可被检视、别人能继续的工作。',
    },
    {
      id: 'share',
      label: '分享',
      routeLabel: '作品',
      to: '/projects',
      statement: '记录证据、边界与下一步问题。',
    },
    {
      id: 'connect',
      label: '连接',
      routeLabel: '社区',
      to: '/community',
      statement: '人们通过实践相遇，而不是通过名片墙。',
    },
  ] satisfies SystemNode[],
  aboutRole: '关于页解释这套运作方式为何存在。',
  joinRole: '加入页是准备好的人进入的方式。',
}

export interface CommunityBoundary {
  id: string
  label: string
  statement: string
}

export const communityBoundaries = {
  eyebrow: '边界',
  title: '有些事我们刻意不去优化。',
  items: [
    {
      id: 'prompt',
      label: '不是提示词画廊',
      statement: '用 AI 远不止收集聪明的提示词。',
    },
    {
      id: 'marketplace',
      label: '不是课程集市',
      statement: '这里的学习围绕实践组织，而不是围绕课程消费。',
    },
    {
      id: 'leaderboard',
      label: '不是排行榜',
      statement: '贡献不会被简化成分数或排名。',
    },
    {
      id: 'claims',
      label: '不是结论工厂',
      statement:
        '实验、局限与失败，和亮眼的结果同样重要。',
    },
  ] satisfies CommunityBoundary[],
}

export const aboutClosing = {
  eyebrow: '下一步',
  title: '选择你接下来想实践的内容。',
  lede: '理解社区的运作模型——然后选一个方向、感受节奏，或加入。',
}
