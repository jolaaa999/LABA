/**
 * Events page — Community Pulse public content.
 * Formats describe how the community gathers; no fabricated schedule instances.
 */
import type { CommunityEvent, EventFormat } from '../types/event'

export const eventsHero = {
  eyebrow: '社区脉动',
  title: '想法变成共享时光的地方。',
  lede: '工作坊、论文精读、项目开发与科研分享，把个人的实践变成社区的实践。',
}

export const communityRhythm = {
  eyebrow: '社区节奏',
  title: '社区自己的节奏。',
  lede: '这些是实践变成共享的方式——不是固定的每周日历，也不代表每件事发生的频率。',
}

export const eventFormats: EventFormat[] = [
  {
    id: 'ai-workshop',
    slug: 'ai-workshop',
    index: '01',
    label: '工作坊',
    title: 'AI 工作坊',
    description:
      '现代 AI 工程实践——Agent、工具、工作流与交付——大家一起推进。',
    purpose:
      '从「我试过一个提示词」走到「我们能检视一个真正干活的系统性东西」。',
    whatHappens: [
      '提出一个小的工程问题或工作流。',
      '与同伴一起构建或扩展工具路径。',
      '评估哪些交付了、哪些坏了。',
    ],
    takeaway:
      '更清楚地把 AI 理解为一种工程手艺：上下文、工具、评测、交付。',
    direction: 'ai-engineering',
  },
  {
    id: 'paper-reading',
    slug: 'paper-reading',
    index: '02',
    label: '阅读',
    title: '论文精读',
    description: '梳理一篇论文的论证链——问题、假设、方法、证据——而不是追着每个公式跑。',
    purpose: '为可以质疑的论点而读，而不是为可以复述的幻灯片而读。',
    whatHappens: [
      '做一张一页纸的论文地图。',
      '点明基线与方法。',
      '问：什么样的证据会改变你的看法。',
    ],
    takeaway: '养成「主张 → 实验 → 局限」的链接习惯——与科研方向一致。',
    direction: 'research',
  },
  {
    id: 'project-building',
    slug: 'project-building',
    index: '03',
    label: '构建',
    title: '项目开发',
    description: '把一个想法变成别人能试的原型——然后测试、反馈、交付。',
    purpose: '练习交付小而诚实的成果——而不是一场摆拍的黑客松品牌。',
    whatHappens: [
      '选一个足够小、能做完的问题。',
      '做出原型、演示，并接受批评。',
      '留下一个仓库、演示路径或笔记，供他人继续。',
    ],
    takeaway: '一件能用的东西——或一份清楚说明它为何还没能用的记录。',
    direction: 'hybrid',
  },
  {
    id: 'research-sharing',
    slug: 'research-sharing',
    index: '04',
    label: '分享',
    title: '科研分享',
    description: '实验、结果、失败案例与下一步问题——公开分享，让别人能检视。',
    purpose: '让证据公开到足以讨论——但不承诺发表结果。',
    whatHappens: [
      '展示试过什么、失败了什么。',
      '展示配置、指标与边界。',
      '把下一个问题留给在场的人。',
    ],
    takeaway: '公开的、别人可以质疑的笔记——与科研案例研究使用同一种证据语言。',
    direction: 'research',
  },
]

export const sessionFlow = {
  eyebrow: '一场活动如何推进',
  title: '一场活动如何推进。',
  closing: '一场活动应该留下点什么。',
  closingDetail:
    '笔记、代码、实验配置、失败案例、问题，或一件小交付物——让下一个人能继续的东西。',
  steps: [
    {
      id: 'frame',
      index: '01',
      label: '定题',
      statement: '点明我们要追问的问题，或想构建的东西。',
    },
    {
      id: 'prepare',
      index: '02',
      label: '准备',
      statement: '带上一篇论文、一个仓库、一次实验、一件工具，或一个小题。',
    },
    {
      id: 'gather',
      index: '03',
      label: '相聚',
      statement: '一起动手，而不是被动旁观。',
    },
    {
      id: 'work',
      index: '04',
      label: '构建 / 验证',
      statement: '构建、复现、检视、质疑。',
    },
    {
      id: 'share',
      index: '05',
      label: '分享',
      statement: '留下笔记、代码、证据，或下一个问题。',
    },
  ],
}

export const scheduleState = {
  eyebrow: '下一场',
  status: '活动安排暂未发布。',
  body: '公开的活动日期与报名信息，将在确认后显示在这里。',
  hint: '在此之前，先看看社区如何实践——准备好时再加入。',
}

export const eventsClosing = {
  eyebrow: '继续前行',
  title: '继续前行。',
  lede: '学一个方向、看看作品，或在下一次脉动开放时加入。',
}

/** No real upcoming instances in Phase 7A — empty by design. */
export const communityEvents: CommunityEvent[] = []

export function getPublishedCommunityEvents(): CommunityEvent[] {
  return communityEvents.filter(
    (event) => event.public && !event.placeholder && event.status === 'announced',
  )
}

export function getEventFormat(id: string): EventFormat | undefined {
  return eventFormats.find((format) => format.id === id)
}
