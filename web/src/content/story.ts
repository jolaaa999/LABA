/**
 * Homepage Story Timeline — DEVELOPMENT PLACEHOLDERS.
 * Abstract community storyline, not verified club history.
 * Do not treat labels as real awards, headcount, or dated achievements.
 */
import type { StoryMilestone } from '../types/story'

export const storyMilestones: StoryMilestone[] = [
  {
    id: 'foundation',
    index: '01',
    label: 'Foundation',
    title: 'A community begins to take shape.',
    statement: 'Students gather around shared questions about AI — not a syllabus, a practice.',
    placeholder: true,
  },
  {
    id: 'build-with-ai',
    index: '02',
    label: 'Build with AI',
    title: 'Tools become part of how we create.',
    statement: 'Agents, workflows, and modern AI coding enter everyday building.',
    placeholder: true,
  },
  {
    id: 'understand-ai',
    index: '03',
    label: 'Understand AI',
    title: 'Research becomes the second direction.',
    statement: 'Papers, experiments, and careful reproduction sit beside engineering.',
    placeholder: true,
  },
  {
    id: 'build-together',
    index: '04',
    label: 'Build Together',
    title: 'Projects and culture connect both sides.',
    statement: 'Workshops, open collaboration, and shared work make the community real.',
    placeholder: true,
  },
  {
    id: 'next',
    index: '05',
    label: 'Next',
    title: 'The next chapter is not written yet.',
    statement: 'What comes next depends on who joins — and what they choose to build.',
    placeholder: true,
  },
]

export function getStoryMilestones(): StoryMilestone[] {
  return storyMilestones
}
