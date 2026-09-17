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
    name: '成员 01',
    monogram: 'M1',
    role: 'AI 工程',
    direction: 'ai',
    bio: '构建 Agent 工作流与可调用工具的系统——从意图到真正能跑起来的东西。',
    skills: ['AI 工程', 'Agent', 'Vue', '工作流'],
    featuredProject: '校园 Agent 工作坊',
    featured: true,
    publicProfile: true,
    placeholder: true,
  },
  {
    id: 'member-02',
    index: '02',
    name: '成员 02',
    monogram: 'M2',
    role: '科研',
    direction: 'research',
    bio: '仔细读、复现结果，并记下真正失败的地方。',
    skills: ['Transformer', 'CV', 'PyTorch', 'Ablation'],
    featuredProject: '注意力消融实验台',
    featured: false,
    publicProfile: true,
    placeholder: true,
  },
  {
    id: 'member-03',
    index: '03',
    name: '成员 03',
    monogram: 'M3',
    role: '开发者工具',
    direction: 'hybrid',
    bio: '把研究笔记与构建习惯，变成小组可以复用的小工具。',
    skills: ['CLI', 'Go', 'Markdown', 'Pipeline'],
    featuredProject: '论文流水线 CLI',
    featured: false,
    publicProfile: true,
    placeholder: true,
  },
  {
    id: 'member-04',
    index: '04',
    name: '成员 04',
    monogram: 'M4',
    role: '混合实践',
    direction: 'hybrid',
    bio: '在 AI 编程与理解底层模型之间来回切换。',
    skills: ['AI Coding', 'Deep Learning', 'NLP', '实验'],
    featured: false,
    publicProfile: true,
    placeholder: true,
  },
  {
    id: 'member-05',
    index: '05',
    name: '成员 05',
    monogram: 'M5',
    role: '社区运营',
    direction: 'ai',
    bio: '维持工作坊与读书会运转——文化背后那些安静的工作。',
    skills: ['工作坊', '文档', '协作'],
    featured: false,
    publicProfile: true,
    placeholder: true,
  },
  // Explicitly non-public — must never appear on homepage
  {
    id: 'member-private',
    index: 'XX',
    name: '私有成员',
    monogram: 'XX',
    role: '—',
    direction: 'ai',
    bio: '绝不应出现在公开页面上。',
    skills: [],
    featured: false,
    publicProfile: false,
    placeholder: true,
  },
]

const directionLabel: Record<Member['direction'], string> = {
  ai: 'AI 工程',
  research: '科研',
  hybrid: '混合',
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
