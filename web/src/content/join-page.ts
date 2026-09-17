/**
 * Join page — Entry Field / orientation layer (static public content).
 * Not an application form, signup system, or recruiting CRM.
 * No fake QQ / QR / dates / member counts.
 */

export type JoinDirectionId = 'build' | 'research' | 'hybrid'

export const joinHero = {
  eyebrow: '加入',
  title: '在实践中\n找到你的位置。',
  lede: '你不必带着和别人一样的目标进来。\n\n有人想用 AI 构建有用的系统，有人想理解模型到足以向它发问的程度，也有人在两者之间移动。',
}

export interface JoinDirectionContent {
  id: JoinDirectionId
  index: string
  label: string
  eyebrow: string
  title: string
  startWith?: string
  tryText?: string
  learn?: string[]
  goodFirstMove?: string
  note?: string
  buildSide?: string
  researchSide?: string
  practice?: string
  primary?: { label: string; to: string }
  secondary?: { label: string; to: string }
  actions?: { label: string; to: string }[]
}

export const joinDirections: JoinDirectionContent[] = [
  {
    id: 'build',
    index: '01',
    label: '构建',
    eyebrow: 'Build with AI',
    title: '先做点小到\n能做完的东西。',
    startWith: 'AI 工程',
    tryText: '一个小工具、一套工作流、一个 Agent，或者一个毕业设计原型。',
    learn: ['上下文', '工具', '评估', '交付'],
    goodFirstMove: '去走一遍 Build with AI 这条路径。',
    primary: { label: '探索 Build with AI', to: '/explore/ai' },
    secondary: { label: '看社区作品', to: '/projects' },
  },
  {
    id: 'research',
    index: '02',
    label: '科研',
    eyebrow: 'Understand AI',
    title: '从一个\n可以验证的小问题开始。',
    startWith: 'Deep Learning × Research',
    tryText:
      '复现一个结果、验证一个假设，或者检视一种失败模式。',
    learn: ['PyTorch', '实验', '证据', '复现'],
    goodFirstMove: '去走一遍 Understand AI 这条路径。',
    primary: {
      label: '探索 Understand AI',
      to: '/explore/deep-learning',
    },
    secondary: { label: '看科研作品', to: '/projects' },
  },
  {
    id: 'hybrid',
    index: '03',
    label: '混合',
    eyebrow: '混合实践',
    title: '在构建与理解之间\n来回移动。',
    buildSide: '把模型变成有用的系统。',
    researchSide: '追问这个系统实际在做什么。',
    practice: '构建 → 检视 → 提问 → 改进 → 再次构建。',
    note: '混合不是第三套课程。它是在两者之间移动。',
    actions: [
      { label: 'Build with AI', to: '/explore/ai' },
      { label: 'Understand AI', to: '/explore/deep-learning' },
    ],
  },
]

export const joinNeutralEntry = {
  eyebrow: '从任何地方开始',
  title: '你不需要选定一个永久的身份。',
  lede: '挑一个最接近你当下想实践的疑问。',
  note: '方向以后可以改。',
}

export const joinEntryField = {
  eyebrow: '选择一个方向',
  title: '你想从哪里\n开始？',
}

export interface JoinStep {
  id: string
  index: string
  label: string
  description: string
}

export const joinProcess = {
  eyebrow: '加入如何进行',
  title: '加入是走进实践，\n而不是填一份资料。',
  centerLabel: '社区入口',
  steps: [
    {
      id: 'orient',
      index: '01',
      label: '定向',
      description: '选择一个方向。',
    },
    {
      id: 'show-up',
      index: '02',
      label: '到场',
      description:
        '参加一次活动、读一个作品，或者开始做一小件事。',
    },
    {
      id: 'make-question',
      index: '03',
      label: '动手 / 提问',
      description:
        '做出可被检视的东西，或者提出一个值得验证的问题。',
    },
    {
      id: 'share',
      index: '04',
      label: '分享',
      description:
        '留下笔记、代码、证据或问题，让别人能接着做。',
    },
  ] satisfies JoinStep[],
}

export type JoinStatusKind = 'available' | 'not-published'

export interface JoinStatusItem {
  index: string
  label: string
  status: JoinStatusKind
  statusLabel: string
  href?: string
}

export const joinStatus = {
  eyebrow: '入口状态',
  title: '公开的招新信息\n暂未发布。',
  lede: '站点已经可以展示我们如何学习、构建、做科研、分享作品与相聚。\n\n正式的招新信息在可以公开时，会出现在这里。',
  items: [
    {
      index: '01',
      label: '定向',
      status: 'available',
      statusLabel: '已开放',
      href: '/about',
    },
    {
      index: '02',
      label: '学习地图',
      status: 'available',
      statusLabel: '已开放',
      href: '/explore',
    },
    {
      index: '03',
      label: '作品档案',
      status: 'available',
      statusLabel: '已开放',
      href: '/projects',
    },
    {
      index: '04',
      label: '社区',
      status: 'available',
      statusLabel: '已开放',
      href: '/community',
    },
    {
      index: '05',
      label: '公开入口',
      status: 'not-published',
      statusLabel: '暂未发布',
    },
  ] satisfies JoinStatusItem[],
}

export interface JoinExit {
  eyebrow: string
  title: string
  to: string
}

export const joinClosing = {
  eyebrow: '下一步',
  title: '你不需要\n等到以后才开始。',
  lede: '读一读地图，看一看作品，跟上这里的节奏。\n\n正式入口可以晚一点，实践现在就能开始。',
  exits: [
    {
      eyebrow: '学习',
      title: '探索学习地图',
      to: '/explore',
    },
    {
      eyebrow: '作品',
      title: '浏览作品档案',
      to: '/projects',
    },
    {
      eyebrow: '相聚',
      title: '看社区节奏',
      to: '/events',
    },
  ] satisfies JoinExit[],
  echo: '做有用的东西。\n追问你做出来的东西。\n留下别人能接着走的东西。',
}

export function getJoinDirection(
  id: JoinDirectionId | null,
): JoinDirectionContent | null {
  if (!id) return null
  return joinDirections.find((d) => d.id === id) ?? null
}
