/**
 * Events page — Community Pulse public content.
 * Formats describe how the community gathers; no fabricated schedule instances.
 */
import type { CommunityEvent, EventFormat } from '../types/event'

export const eventsHero = {
  eyebrow: 'Community Pulse',
  title: 'Where ideas become shared time.',
  lede: 'Workshops, paper reading, building, and research sharing turn individual practice into community practice.',
}

export const communityRhythm = {
  eyebrow: 'Community Rhythm',
  title: 'The rhythm of the community.',
  lede: 'These are the ways practice becomes shared — not a fixed weekly calendar, and not a claim about how often each happens.',
}

export const eventFormats: EventFormat[] = [
  {
    id: 'ai-workshop',
    slug: 'ai-workshop',
    index: '01',
    label: 'Workshop',
    title: 'AI Workshop',
    description:
      'Modern AI engineering practice — agents, tools, workflows, and delivery — worked through together.',
    purpose:
      'Move from “I tried a prompt” to “we can inspect a system that does real work.”',
    whatHappens: [
      'Frame a small engineering question or workflow.',
      'Build or extend a tool path with peers.',
      'Evaluate what shipped and what broke.',
    ],
    takeaway:
      'A clearer sense of AI as engineering craft: context, tools, evaluation, delivery.',
    direction: 'ai-engineering',
  },
  {
    id: 'paper-reading',
    slug: 'paper-reading',
    index: '02',
    label: 'Read',
    title: 'Paper Reading',
    description:
      'Map a paper’s argument — question, assumption, method, evidence — before chasing every formula.',
    purpose:
      'Read for claims you can challenge, not for slides you can paraphrase.',
    whatHappens: [
      'Build a one-page paper map.',
      'Name the baseline and the claim.',
      'Ask what evidence would change your mind.',
    ],
    takeaway:
      'A habit of linking claim → experiment → limitation — aligned with the Research path.',
    direction: 'research',
  },
  {
    id: 'project-building',
    slug: 'project-building',
    index: '03',
    label: 'Build',
    title: 'Project Building',
    description:
      'Turn an idea into a prototype someone else can try — then test, feedback, and deliver.',
    purpose:
      'Practice shipping small, honest artifacts — not a staged hackathon brand.',
    whatHappens: [
      'Pick a problem small enough to finish.',
      'Prototype, show, and take critique.',
      'Leave a repo, demo path, or note others can continue.',
    ],
    takeaway: 'Something usable — or a clear record of why it is not yet.',
    direction: 'hybrid',
  },
  {
    id: 'research-sharing',
    slug: 'research-sharing',
    index: '04',
    label: 'Share',
    title: 'Research Sharing',
    description:
      'Experiments, results, failure cases, and next questions — shared so others can inspect them.',
    purpose:
      'Make evidence public enough to discuss — without promising publication outcomes.',
    whatHappens: [
      'Present what was tried and what failed.',
      'Show config, metric, and limits.',
      'Leave the next question for the room.',
    ],
    takeaway:
      'Open notes others can challenge — the same evidence language as Research Case Studies.',
    direction: 'research',
  },
]

export const sessionFlow = {
  eyebrow: 'How a Session Moves',
  title: 'How a session moves.',
  closing: 'An event should leave something behind.',
  closingDetail:
    'Notes, code, experiment config, failure cases, questions, or a small deliverable — something the next person can continue.',
  steps: [
    {
      id: 'frame',
      index: '01',
      label: 'Frame',
      statement: 'Name the question or the thing we want to build.',
    },
    {
      id: 'prepare',
      index: '02',
      label: 'Prepare',
      statement: 'Bring a paper, repo, experiment, tool, or small problem.',
    },
    {
      id: 'gather',
      index: '03',
      label: 'Gather',
      statement: 'Work together instead of watching passively.',
    },
    {
      id: 'work',
      index: '04',
      label: 'Make / Test',
      statement: 'Build, reproduce, inspect, question.',
    },
    {
      id: 'share',
      index: '05',
      label: 'Share',
      statement: 'Leave notes, code, evidence, or the next question.',
    },
  ],
}

export const scheduleState = {
  eyebrow: 'Next Session',
  status: 'Schedule not published yet.',
  body: 'Public event dates and joining details will appear here when they are confirmed.',
  hint: 'Until then, explore how the community practices — and join when you are ready.',
}

export const eventsClosing = {
  eyebrow: 'Keep Moving',
  title: 'Keep moving.',
  lede: 'Learn a direction, see the work, or join when the next pulse is open.',
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
