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
  eyebrow: 'Explore',
  title: 'Two ways to grow with AI.',
  lede: 'One path uses AI to build and ship. The other understands models deeply enough to question them. They diverge — and they share foundations.',
}

export const explorePaths: ExplorePath[] = [
  {
    id: 'build',
    eyebrow: 'Build with AI',
    title: 'Build with AI',
    audience: ['Career', 'Internship', 'Graduation Projects'],
    statement:
      'Use AI as part of the engineering process, not as a shortcut around thinking.',
    topics: [
      { id: 'ai-coding', label: 'AI Coding', description: 'Assistive coding in real repos.' },
      { id: 'agents', label: 'Agent Systems', description: 'Tools, plans, and write-back.' },
      { id: 'rag', label: 'RAG', description: 'Retrieval grounded delivery.' },
      { id: 'mcp', label: 'MCP', description: 'Local tool bridges.' },
      { id: 'workflow', label: 'Workflow', description: 'From intent to shipped steps.' },
      { id: 'delivery', label: 'Delivery', description: 'Ship something people can use.' },
    ],
    mapStages: [
      'Foundations',
      'AI Coding',
      'Agent Systems',
      'RAG / MCP',
      'Workflows',
      'Ship',
    ],
    ctaLabel: 'Start building',
    to: '/explore/ai',
  },
  {
    id: 'understand',
    eyebrow: 'Understand AI',
    title: 'Understand AI',
    audience: ['Research', 'Recommendation', 'Competition'],
    statement:
      'Understand models deeply enough to question, reproduce, and improve them.',
    topics: [
      { id: 'pytorch', label: 'PyTorch', description: 'Implementation craft.' },
      { id: 'dl', label: 'Deep Learning', description: 'Core representations.' },
      { id: 'transformer', label: 'Transformer', description: 'Attention and structure.' },
      { id: 'papers', label: 'Paper Reading', description: 'Read for method, not hype.' },
      { id: 'repro', label: 'Reproduction', description: 'Turn claims into runs.' },
      { id: 'research', label: 'Research', description: 'Evidence and limits.' },
    ],
    mapStages: [
      'Foundations',
      'PyTorch',
      'Deep Learning',
      'Transformer',
      'Reproduction',
      'Research',
    ],
    ctaLabel: 'Start understanding',
    to: '/explore/deep-learning',
  },
]

export const sharedFoundations: SharedFoundation[] = [
  {
    id: 'programming',
    label: 'Programming',
    detail: 'Enough fluency to express ideas in code.',
  },
  {
    id: 'git',
    label: 'Git',
    detail: 'Version history you can trust and share.',
  },
  {
    id: 'python',
    label: 'Python',
    detail: 'The common tongue for tooling and experiments.',
  },
  {
    id: 'reading',
    label: 'Technical Reading',
    detail: 'Docs, papers, and failure notes — read for method.',
  },
  {
    id: 'decompose',
    label: 'Problem Decomposition',
    detail: 'Break vague goals into checkable steps.',
  },
  {
    id: 'docs',
    label: 'Documentation',
    detail: 'Leave a trail others can continue.',
  },
  {
    id: 'debug',
    label: 'Debug / Experiment Habit',
    detail: 'Change one thing, observe, write it down.',
  },
]

export const learningPrinciples: LearningPrinciple[] = [
  {
    id: 'build',
    index: '01',
    label: 'Build',
    title: 'Learn by Building',
    statement:
      'Workshops and projects matter more than passive lectures. Make something work.',
  },
  {
    id: 'reproduce',
    index: '02',
    label: 'Reproduce',
    title: 'Learn by Reproducing',
    statement:
      'Turn papers and ideas into experiments — not just into slides.',
  },
  {
    id: 'explain',
    index: '03',
    label: 'Explain',
    title: 'Learn by Explaining',
    statement:
      'Peer discussion forces clarity. If you cannot explain why, you do not yet own it.',
  },
  {
    id: 'share',
    index: '04',
    label: 'Share',
    title: 'Learn by Sharing',
    statement:
      'Leave process, failures, and results for the next people on the path.',
  },
]

export function getExplorePath(id: ExplorePathId): ExplorePath | undefined {
  return explorePaths.find((path) => path.id === id)
}
