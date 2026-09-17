/**
 * Join page — Entry Field / orientation layer (static public content).
 * Not an application form, signup system, or recruiting CRM.
 * No fake QQ / QR / dates / member counts.
 */

export type JoinDirectionId = 'build' | 'research' | 'hybrid'

export const joinHero = {
  eyebrow: 'Join',
  title: 'Find your place\nin the practice.',
  lede: 'You do not need to arrive with the same goal.\n\nSome people want to build useful systems with AI. Some want to understand models deeply enough to question them. Some move between both.',
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
    label: 'Build',
    eyebrow: 'Build with AI',
    title: 'Start by making something\nsmall enough to finish.',
    startWith: 'AI Engineering',
    tryText: 'A tiny tool, workflow, agent, or graduation-project prototype.',
    learn: ['Context', 'Tools', 'Evaluation', 'Delivery'],
    goodFirstMove: 'Explore the Build with AI path.',
    primary: { label: 'Explore Build with AI', to: '/explore/ai' },
    secondary: { label: 'See community work', to: '/projects' },
  },
  {
    id: 'research',
    index: '02',
    label: 'Research',
    eyebrow: 'Understand AI',
    title: 'Start with a question\nsmall enough to test.',
    startWith: 'Deep Learning × Research',
    tryText:
      'Reproduce one result, test one assumption, or inspect one failure mode.',
    learn: ['PyTorch', 'Experiments', 'Evidence', 'Reproduction'],
    goodFirstMove: 'Explore the Understand AI path.',
    primary: {
      label: 'Explore Understand AI',
      to: '/explore/deep-learning',
    },
    secondary: { label: 'See research work', to: '/projects' },
  },
  {
    id: 'hybrid',
    index: '03',
    label: 'Hybrid',
    eyebrow: 'Hybrid Practice',
    title: 'Move between building\nand understanding.',
    buildSide: 'Turn models into useful systems.',
    researchSide: 'Question what the system is actually doing.',
    practice: 'Build → Inspect → Question → Improve → Build again.',
    note: 'Hybrid is not a third curriculum. It is movement between the two.',
    actions: [
      { label: 'Build with AI', to: '/explore/ai' },
      { label: 'Understand AI', to: '/explore/deep-learning' },
    ],
  },
]

export const joinNeutralEntry = {
  eyebrow: 'Start Anywhere',
  title: 'You do not need to choose a permanent identity.',
  lede: 'Pick the question that feels closest to what you want to practice now.',
  note: 'You can change direction later.',
}

export const joinEntryField = {
  eyebrow: 'Choose a Direction',
  title: 'Where do you want\nto begin?',
}

export interface JoinStep {
  id: string
  index: string
  label: string
  description: string
}

export const joinProcess = {
  eyebrow: 'How Joining Works',
  title: 'Join by entering the practice,\nnot by filling a profile.',
  centerLabel: 'Community Entry',
  steps: [
    {
      id: 'orient',
      index: '01',
      label: 'Orient',
      description: 'Choose a direction.',
    },
    {
      id: 'show-up',
      index: '02',
      label: 'Show Up',
      description:
        'Join a session, read a project, or begin a small piece of work.',
    },
    {
      id: 'make-question',
      index: '03',
      label: 'Make / Question',
      description:
        'Build something inspectable, or ask a question worth testing.',
    },
    {
      id: 'share',
      index: '04',
      label: 'Share',
      description:
        'Leave notes, code, evidence, or questions that someone else can continue.',
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
  eyebrow: 'Entry Status',
  title: 'Public recruiting details\nare not published yet.',
  lede: 'The community site can already show how we learn, build, research, share work, and gather.\n\nFormal recruiting details will appear here when they are ready to be public.',
  items: [
    {
      index: '01',
      label: 'Orientation',
      status: 'available',
      statusLabel: 'Available',
      href: '/about',
    },
    {
      index: '02',
      label: 'Learning Map',
      status: 'available',
      statusLabel: 'Available',
      href: '/explore',
    },
    {
      index: '03',
      label: 'Work Archive',
      status: 'available',
      statusLabel: 'Available',
      href: '/projects',
    },
    {
      index: '04',
      label: 'Community',
      status: 'available',
      statusLabel: 'Available',
      href: '/community',
    },
    {
      index: '05',
      label: 'Public Entry',
      status: 'not-published',
      statusLabel: 'Not Published',
    },
  ] satisfies JoinStatusItem[],
}

export interface JoinExit {
  eyebrow: string
  title: string
  to: string
}

export const joinClosing = {
  eyebrow: 'Next',
  title: 'You do not need\nto wait to begin.',
  lede: 'Read the map. Study the work. Join the rhythm.\n\nFormal entry can come later; practice can start now.',
  exits: [
    {
      eyebrow: 'Learn',
      title: 'Explore the learning map',
      to: '/explore',
    },
    {
      eyebrow: 'Work',
      title: 'Browse the project archive',
      to: '/projects',
    },
    {
      eyebrow: 'Gather',
      title: 'See the community rhythm',
      to: '/events',
    },
  ] satisfies JoinExit[],
  echo: 'Build something useful.\nQuestion what you build.\nLeave something others can continue.',
}

export function getJoinDirection(
  id: JoinDirectionId | null,
): JoinDirectionContent | null {
  if (!id) return null
  return joinDirections.find((d) => d.id === id) ?? null
}
