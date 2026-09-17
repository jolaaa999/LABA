/**
 * Homepage “What Happens Here” — activity culture types.
 * Describes how the community works, not claimed event history.
 */
import type { Activity } from '../types/activity'

export const activities: Activity[] = [
  {
    id: 'ai-workshop',
    index: '01',
    category: 'Workshop',
    title: 'AI Workshop',
    statement:
      'Learning how modern AI changes the way we build software — agents, tools, and workflows that ship.',
    meta: 'WEEKLY / LAB',
  },
  {
    id: 'paper-reading',
    index: '02',
    category: 'Read',
    title: 'Paper Reading',
    statement: 'Read the paper. Reproduce the idea. Question the result.',
    meta: 'RESEARCH / WEEKLY',
  },
  {
    id: 'project-building',
    index: '03',
    category: 'Build',
    title: 'Project Building',
    statement: 'Turn an idea into something people can actually use.',
    meta: 'BUILD / SHARE',
  },
  {
    id: 'research-sharing',
    index: '04',
    category: 'Share',
    title: 'Research Sharing',
    statement: 'Experiments, results, and the questions that remain — shared openly.',
    meta: 'IDEAS / TALK',
  },
]

export function getHomepageActivities(): Activity[] {
  return activities
}
