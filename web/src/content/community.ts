/**
 * Community page — People & Work public content.
 * No fabricated people, metrics, or social claims.
 */
import type { ContributionModeId } from '../types/member'
import { getPublishedCommunityMembers } from './members'

export const communityHero = {
  eyebrow: 'Community',
  title: 'People behind the practice.',
  lede: 'A community is more than a roster. People learn, build, question, document, and leave work others can continue — across engineering, research, and hybrid practice.',
}

export interface ContributionMode {
  id: ContributionModeId
  index: string
  label: string
  statement: string
  related: string[]
  fieldHint: 'build' | 'research' | 'explain' | 'document' | 'connect'
}

export const contributionModes: ContributionMode[] = [
  {
    id: 'build',
    index: '01',
    label: 'Build',
    statement:
      'Turn an idea into something others can use or test — tools, workflows, prototypes.',
    related: ['AI Engineering', 'Projects', 'Workshops'],
    fieldHint: 'build',
  },
  {
    id: 'research',
    index: '02',
    label: 'Research',
    statement:
      'Ask a question, reproduce, experiment, and keep evidence with its limits.',
    related: ['Deep Learning', 'Paper Reading', 'Research Sharing'],
    fieldHint: 'research',
  },
  {
    id: 'explain',
    index: '03',
    label: 'Explain',
    statement:
      'Make a model, tool, experiment, or failure clear enough for another person to follow.',
    related: ['Workshops', 'Reading', 'Sharing'],
    fieldHint: 'explain',
  },
  {
    id: 'document',
    index: '04',
    label: 'Document',
    statement:
      'Leave README notes, configs, experiment logs, failure cases, and decisions others can continue.',
    related: ['Evidence', 'Repos', 'Configs'],
    fieldHint: 'document',
  },
  {
    id: 'connect',
    index: '05',
    label: 'Connect',
    statement:
      'Help a session happen, find a collaborator, and keep engineering and research in conversation.',
    related: ['Sessions', 'Collaboration', 'Rhythm'],
    fieldHint: 'connect',
  },
]

export const collaborationField = {
  eyebrow: 'Collaboration',
  title: 'Work connects people.',
  lede: 'The community is not organized by job titles. People meet through questions, projects, sessions, evidence, and shared tools.',
  statement: 'People meet through work, not through profile cards.',
}

export const publicMembersState = {
  eyebrow: 'People',
  title: 'Public profiles are not published yet.',
  body: 'Member profiles will appear here when people choose to make their work and contribution information public.',
  optIn: 'Public profiles are opt-in.',
}

export interface CommunityPrinciple {
  id: string
  index: string
  label: string
  statement: string
}

export const communityPrinciples: CommunityPrinciple[] = [
  {
    id: 'inspectable',
    index: '01',
    label: 'Make it inspectable',
    statement: 'Others should be able to run, read, question, and continue the work.',
  },
  {
    id: 'failed',
    index: '02',
    label: 'Share what failed',
    statement: 'Failure cases are evidence for engineering and research — not something to hide.',
  },
  {
    id: 'teach',
    index: '03',
    label: 'Teach what you learn',
    statement: 'Being able to explain usually matters more than only being able to use.',
  },
  {
    id: 'leave',
    index: '04',
    label: 'Leave something behind',
    statement:
      'A session or a piece of work should leave code, notes, config, a question, or evidence — at least one trail.',
  },
]

export const communityClosing = {
  eyebrow: 'Where next',
  title: 'Where do I go next?',
  lede: 'Find a direction, feel the community rhythm, or join when you are ready.',
}

export function getCommunityPublicMembers() {
  return getPublishedCommunityMembers()
}
