/**
 * About page — Manifesto + Operating Model (static public content).
 * Not history, marketing, staff directory, or fake metrics.
 */

export const aboutHero = {
  eyebrow: 'About',
  title: 'Learn to build with AI.\nLearn to question AI.',
  lede: 'Modern AI asks for two kinds of literacy: the ability to build useful systems with models, and the ability to understand, test, reproduce, and question them. This community keeps both in the same room.',
}

export const twoDirections = {
  eyebrow: 'Two Directions',
  title: 'Different goals.\nShared discipline.',
  bridge:
    'Building benefits from understanding. Understanding becomes sharper through practice.',
  hybridNote:
    'Hybrid is not a third path. It means someone moves between engineering practice and research thinking across stages of work.',
  build: {
    label: 'Build with AI',
    question: 'How do I turn models into something useful?',
    topics: [
      'AI Coding',
      'Agent Systems',
      'RAG / MCP',
      'Workflow',
      'Evaluation',
      'Delivery',
    ],
    outcome: 'Usable systems, tools, workflows, and prototypes.',
  },
  understand: {
    label: 'Understand AI',
    question: 'How do I know what the model is actually doing?',
    topics: [
      'Deep Learning',
      'PyTorch',
      'Transformer',
      'Paper Reading',
      'Reproduction',
      'Experiment',
      'Evidence',
    ],
    outcome: 'Questions, experiments, reproducible notes, and evidence.',
  },
  audiences: {
    build: ['Career', 'Internships', 'Graduation projects'],
    understand: ['Research', 'Recommendation', 'Competitions'],
  },
}

export interface SharedPracticeStep {
  id: string
  index: string
  label: string
  statement: string
}

export const sharedPractice = {
  eyebrow: 'Shared Practice',
  title: 'The method matters more\nthan the label.',
  lede: 'Whether the work looks like engineering or research, the same discipline keeps it honest.',
  steps: [
    {
      id: 'question',
      index: '01',
      label: 'Question',
      statement:
        'Name the problem, goal, assumption, and constraint — before asking a model to invent the answer.',
    },
    {
      id: 'make',
      index: '02',
      label: 'Make',
      statement:
        'Engineering builds a system; research builds an experiment. Both make something inspectable.',
    },
    {
      id: 'test',
      index: '03',
      label: 'Test',
      statement:
        'Does it work? Does the evidence support the claim? Do not trust the first output.',
    },
    {
      id: 'explain',
      index: '04',
      label: 'Explain',
      statement:
        'Say what happened, why, what failed, and what remains unknown.',
    },
    {
      id: 'share',
      index: '05',
      label: 'Share',
      statement:
        'Leave code, README, config, notes, evidence, failure cases, or questions others can continue.',
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
  eyebrow: 'What Matters',
  title: 'Not more AI.\nBetter practice with AI.',
  items: [
    {
      id: 'usefulness',
      index: '01',
      label: 'Usefulness',
      statement: 'Not only a cool demo — someone else can use or test it.',
    },
    {
      id: 'understanding',
      index: '02',
      label: 'Understanding',
      statement:
        'Not only vocabulary — assumptions, limits, failure modes, and why something works.',
    },
    {
      id: 'reproducibility',
      index: '03',
      label: 'Reproducibility',
      statement: 'Others can know what changed, how it ran, and what was measured.',
    },
    {
      id: 'continuity',
      index: '04',
      label: 'Continuity',
      statement:
        'Work does not vanish after a session — it leaves notes, tools, questions, or evidence.',
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
  eyebrow: 'The System',
  title: 'The website is a map of the practice.',
  lede: 'Learning, gathering, work, people, and continuity form a loop — not a brochure sitemap.',
  nodes: [
    {
      id: 'learn',
      label: 'Learn',
      routeLabel: 'Explore',
      to: '/explore',
      statement: 'Find a direction — Build with AI or Understand AI.',
    },
    {
      id: 'gather',
      label: 'Gather',
      routeLabel: 'Events',
      to: '/events',
      statement: 'Practice together as shared time.',
    },
    {
      id: 'make',
      label: 'Make',
      routeLabel: 'Projects',
      to: '/projects',
      statement: 'Leave inspectable work others can continue.',
    },
    {
      id: 'share',
      label: 'Share',
      routeLabel: 'Projects',
      to: '/projects',
      statement: 'Document evidence, limits, and next questions.',
    },
    {
      id: 'connect',
      label: 'Connect',
      routeLabel: 'Community',
      to: '/community',
      statement: 'People meet through practice, not profile walls.',
    },
  ] satisfies SystemNode[],
  aboutRole: 'About explains why this operating model exists.',
  joinRole: 'Join is how someone enters when ready.',
}

export interface CommunityBoundary {
  id: string
  label: string
  statement: string
}

export const communityBoundaries = {
  eyebrow: 'Boundaries',
  title: 'Some things we deliberately do not optimize for.',
  items: [
    {
      id: 'prompt',
      label: 'Not a prompt gallery',
      statement: 'AI use is more than collecting clever prompts.',
    },
    {
      id: 'marketplace',
      label: 'Not a course marketplace',
      statement: 'Learning here is organized around practice, not course consumption.',
    },
    {
      id: 'leaderboard',
      label: 'Not a leaderboard',
      statement: 'Contribution is not reduced to points or rankings.',
    },
    {
      id: 'claims',
      label: 'Not a claim factory',
      statement:
        'Experiments, limitations, and failures matter as much as impressive results.',
    },
  ] satisfies CommunityBoundary[],
}

export const aboutClosing = {
  eyebrow: 'Next',
  title: 'Choose what you want to practice next.',
  lede: 'Understand the model of the community — then pick a direction, feel the rhythm, or join.',
}
