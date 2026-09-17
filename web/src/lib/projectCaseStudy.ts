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
    overview: '概述',
    problem: '问题',
    question: '提问',
    approach: '系统与方法',
    architecture: '架构',
    workflow: '工作流',
    experiment: '实验',
    observations: '观察',
    results: '成果',
    limitations: '局限',
    usage: '使用方式',
    artifacts: '产物',
    collaborators: '协作者',
    nextSteps: '下一步',
  },
  research: {
    overview: '概述',
    problem: '问题',
    question: '提问',
    approach: '方法',
    architecture: '架构',
    workflow: '工作流',
    experiment: '实验',
    observations: '观察',
    results: '证据',
    limitations: '局限',
    usage: '使用方式',
    artifacts: '产物',
    collaborators: '协作者',
    nextSteps: '下一步',
  },
  'developer-tool': {
    overview: '概述',
    problem: '痛点',
    question: '提问',
    approach: '界面与设计',
    architecture: '实现',
    workflow: '流水线',
    experiment: '实验',
    observations: '观察',
    results: '当前状态',
    limitations: '局限',
    usage: '使用方式',
    artifacts: '产物',
    collaborators: '协作者',
    nextSteps: '下一步',
  },
}

/** Placeholder-safe labels — future verified projects keep VERIFIED_TITLES. */
const PLACEHOLDER_TITLE_OVERRIDES: Partial<
  Record<ProjectDetailPersona, Partial<SectionTitleMap>>
> = {
  'ai-engineering': {
    results: '目标成果',
    artifacts: '设计产物',
  },
  research: {
    observations: '观察目标',
    results: '预期证据',
  },
  'developer-tool': {
    results: '预期状态',
    artifacts: '设计产物',
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
      return 'AI 工程案例研究'
    case 'research':
      return '科研案例研究'
    case 'developer-tool':
      return '工具案例研究'
  }
}
