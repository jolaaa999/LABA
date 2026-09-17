/**
 * Homepage Community members — DEVELOPMENT PLACEHOLDERS only.
 * Not real students. No stock portraits. No fake personal URLs.
 * Replace with authorized publicProfile members when available.
 */
import type { Member } from '../types/member'

export const members: Member[] = [
  {
    id: 'member-01',
    index: '01',
    name: 'Member 01',
    monogram: 'M1',
    role: 'AI Engineering',
    direction: 'ai',
    bio: 'Builds agent workflows and tool-using systems — from intent to something that runs.',
    skills: ['AI Engineering', 'Agent', 'Vue', 'Workflow'],
    featuredProject: 'Campus Agent Workshop',
    featured: true,
    publicProfile: true,
    placeholder: true,
  },
  {
    id: 'member-02',
    index: '02',
    name: 'Member 02',
    monogram: 'M2',
    role: 'Research',
    direction: 'research',
    bio: 'Reads carefully, reproduces results, and keeps notes on what actually failed.',
    skills: ['Transformer', 'CV', 'PyTorch', 'Ablation'],
    featuredProject: 'Attention Ablation Lab',
    featured: false,
    publicProfile: true,
    placeholder: true,
  },
  {
    id: 'member-03',
    index: '03',
    name: 'Member 03',
    monogram: 'M3',
    role: 'Developer Tools',
    direction: 'hybrid',
    bio: 'Turns research notes and build habits into small tools the group can reuse.',
    skills: ['CLI', 'Go', 'Markdown', 'Pipeline'],
    featuredProject: 'Paper Pipeline CLI',
    featured: false,
    publicProfile: true,
    placeholder: true,
  },
  {
    id: 'member-04',
    index: '04',
    name: 'Member 04',
    monogram: 'M4',
    role: 'Hybrid Practice',
    direction: 'hybrid',
    bio: 'Moves between coding with AI and understanding the models underneath.',
    skills: ['AI Coding', 'Deep Learning', 'NLP', 'Experiment'],
    featured: false,
    publicProfile: true,
    placeholder: true,
  },
  {
    id: 'member-05',
    index: '05',
    name: 'Member 05',
    monogram: 'M5',
    role: 'Community Ops',
    direction: 'ai',
    bio: 'Keeps workshops and reading groups running — the quiet work behind the culture.',
    skills: ['Workshop', 'Docs', 'Coordination'],
    featured: false,
    publicProfile: true,
    placeholder: true,
  },
  // Explicitly non-public — must never appear on homepage
  {
    id: 'member-private',
    index: 'XX',
    name: 'Private Member',
    monogram: 'XX',
    role: '—',
    direction: 'ai',
    bio: 'Should never render on public surfaces.',
    skills: [],
    featured: false,
    publicProfile: false,
    placeholder: true,
  },
]

const directionLabel: Record<Member['direction'], string> = {
  ai: 'AI Engineering',
  research: 'Research',
  hybrid: 'Hybrid',
}

export function getPublicMembers(): Member[] {
  return members.filter((member) => member.publicProfile)
}

/**
 * Official Community page roster.
 * Requires opt-in public profile AND non-placeholder.
 * Homepage DEV placeholders must never appear here.
 */
export function getPublishedCommunityMembers(): Member[] {
  return members.filter(
    (member) => member.publicProfile === true && member.placeholder !== true,
  )
}

export function getHomepageMembers(): Member[] {
  return getPublicMembers().slice(0, 5)
}

export function getDefaultSpotlightMember(list: Member[] = getHomepageMembers()): Member | undefined {
  return list.find((member) => member.featured) ?? list[0]
}

export function formatMemberDirection(direction: Member['direction']): string {
  return directionLabel[direction]
}

export function formatMemberSkills(skills: string[]): string {
  return skills.join(' · ')
}
