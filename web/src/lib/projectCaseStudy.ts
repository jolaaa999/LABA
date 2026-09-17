/**
 * Category-driven case study section plan.
 * Shared shell — wording / order change by persona + placeholder safety labels.
 */
import type {
  Project,
  ProjectCaseStudy,
  ProjectDetailPersona,
} from '../types/project'
import { getProjectDetailPersona } from '../types/project'

export type CaseSectionId =
  | 'overview'
  | 'problem'
  | 'question'
  | 'approach'
  | 'architecture'
  | 'workflow'
  | 'experiment'
  | 'observations'
  | 'results'
  | 'limitations'
  | 'usage'
  | 'artifacts'
  | 'collaborators'
  | 'nextSteps'

export interface CaseSectionPlan {
  id: CaseSectionId
  eyebrow: string
  title: string
}

type SectionTitleMap = Record<CaseSectionId, string>

const VERIFIED_TITLES: Record<ProjectDetailPersona, SectionTitleMap> = {
  'ai-engineering': {
    overview: 'Overview',
    problem: 'Problem',
    question: 'Question',
    approach: 'System & Approach',
    architecture: 'Architecture',
    workflow: 'Workflow',
    experiment: 'Experiment',
    observations: 'Observations',
    results: 'Outcome',
    limitations: 'Limitations',
    usage: 'Usage',
    artifacts: 'Artifacts',
    collaborators: 'Collaborators',
    nextSteps: 'Next Steps',
  },
  research: {
    overview: 'Overview',
    problem: 'Problem',
    question: 'Question',
    approach: 'Method',
    architecture: 'Architecture',
    workflow: 'Workflow',
    experiment: 'Experiment',
    observations: 'Observations',
    results: 'Evidence',
    limitations: 'Limitations',
    usage: 'Usage',
    artifacts: 'Artifacts',
    collaborators: 'Collaborators',
    nextSteps: 'Next Steps',
  },
  'developer-tool': {
    overview: 'Overview',
    problem: 'Pain Point',
    question: 'Question',
    approach: 'Interface & Design',
    architecture: 'Implementation',
    workflow: 'Pipeline',
    experiment: 'Experiment',
    observations: 'Observations',
    results: 'Current Status',
    limitations: 'Limitations',
    usage: 'Usage',
    artifacts: 'Artifacts',
    collaborators: 'Collaborators',
    nextSteps: 'Next Steps',
  },
}

/** Placeholder-safe labels — future verified projects keep VERIFIED_TITLES. */
const PLACEHOLDER_TITLE_OVERRIDES: Partial<
  Record<ProjectDetailPersona, Partial<SectionTitleMap>>
> = {
  'ai-engineering': {
    results: 'Target Outcome',
    artifacts: 'Design Artifacts',
  },
  research: {
    observations: 'Observation Targets',
    results: 'Planned Evidence',
  },
  'developer-tool': {
    results: 'Intended Status',
    artifacts: 'Design Artifacts',
  },
}

const PERSONA_ORDER: Record<ProjectDetailPersona, CaseSectionId[]> = {
  'ai-engineering': [
    'overview',
    'problem',
    'approach',
    'architecture',
    'workflow',
    'results',
    'artifacts',
    'limitations',
    'nextSteps',
    'collaborators',
  ],
  research: [
    'overview',
    'question',
    'approach',
    'experiment',
    'observations',
    'results',
    'limitations',
    'artifacts',
    'nextSteps',
    'collaborators',
  ],
  'developer-tool': [
    'overview',
    'problem',
    'approach',
    'workflow',
    'usage',
    'architecture',
    'results',
    'artifacts',
    'nextSteps',
    'collaborators',
  ],
}

function hasSectionContent(
  study: ProjectCaseStudy,
  id: CaseSectionId,
): boolean {
  switch (id) {
    case 'overview':
      return Boolean(study.overview)
    case 'problem':
      return Boolean(study.problem)
    case 'question':
      return Boolean(study.question)
    case 'approach':
      return Boolean(study.approach)
    case 'architecture':
      return Boolean(
        study.architecture?.nodes?.length || study.architecture?.summary,
      )
    case 'workflow':
      return Boolean(study.workflow?.length)
    case 'experiment':
      return Boolean(
        study.experiment?.summary ||
          study.experiment?.setup ||
          study.experiment?.metrics?.length,
      )
    case 'observations':
      return Boolean(study.observations?.length)
    case 'results':
      return Boolean(study.results?.length)
    case 'limitations':
      return Boolean(study.limitations?.length)
    case 'usage':
      return Boolean(study.usage?.length)
    case 'artifacts':
      return Boolean(study.artifacts?.length)
    case 'collaborators':
      return Boolean(study.collaborators?.length)
    case 'nextSteps':
      return Boolean(study.nextSteps?.length)
  }
}

function resolveTitle(
  persona: ProjectDetailPersona,
  id: CaseSectionId,
  isPlaceholder: boolean,
): string {
  const verified = VERIFIED_TITLES[persona][id]
  if (!isPlaceholder) return verified
  return PLACEHOLDER_TITLE_OVERRIDES[persona]?.[id] ?? verified
}

export function getCaseSectionPlan(project: Project): CaseSectionPlan[] {
  const persona = getProjectDetailPersona(project.category)
  const study = project.caseStudy
  if (!study) return []
  const isPlaceholder = project.placeholder === true
  let index = 0
  return PERSONA_ORDER[persona]
    .filter((id) => hasSectionContent(study, id))
    .map((id) => {
      index += 1
      return {
        id,
        eyebrow: String(index).padStart(2, '0'),
        title: resolveTitle(persona, id, isPlaceholder),
      }
    })
}

export function getPersonaLabel(persona: ProjectDetailPersona): string {
  switch (persona) {
    case 'ai-engineering':
      return 'Engineering Case Study'
    case 'research':
      return 'Research Case Study'
    case 'developer-tool':
      return 'Tool Case Study'
  }
}
