/** Homepage / archive / case-study project model (Frontend-first). */

export type ProjectVisualKind = 'agent' | 'research' | 'tool'

export type ProjectCategory =
  | 'ai-engineering'
  | 'research'
  | 'developer-tool'
  | 'open-source'
  | 'competition'

export type ProjectFilterId = 'all' | 'ai-engineering' | 'research' | 'tools'

/** Narrative persona for Project Detail shell (shared view, different emphasis). */
export type ProjectDetailPersona =
  | 'ai-engineering'
  | 'research'
  | 'developer-tool'

export interface ProjectArchitectureNode {
  id: string
  label: string
  detail?: string
}

export interface ProjectArchitecture {
  summary?: string
  nodes: ProjectArchitectureNode[]
}

export interface ProjectStep {
  title: string
  detail: string
}

export interface ProjectExperiment {
  summary?: string
  setup?: string
  metrics?: string[]
  controls?: string[]
}

export interface ProjectResult {
  label: string
  detail: string
}

export interface ProjectArtifact {
  label: string
  kind: 'repo' | 'demo' | 'notes' | 'paper' | 'other'
  href?: string
  note?: string
}

export interface ProjectContributor {
  name: string
  role?: string
}

export interface ProjectCaseStudy {
  overview?: string
  problem?: string
  question?: string
  approach?: string
  architecture?: ProjectArchitecture
  workflow?: ProjectStep[]
  experiment?: ProjectExperiment
  observations?: string[]
  results?: ProjectResult[]
  limitations?: string[]
  usage?: ProjectStep[]
  artifacts?: ProjectArtifact[]
  collaborators?: ProjectContributor[]
  nextSteps?: string[]
}

export interface Project {
  slug: string
  title: string
  category: ProjectCategory
  summary: string
  year: string
  status?: string
  techStack: string[]
  featured: boolean
  featuredRank?: number
  /** Abstract visual language for placeholder surfaces */
  visualKind: ProjectVisualKind
  githubUrl?: string
  demoUrl?: string
  /**
   * Development / unverified content.
   * Must be replaced or explicitly gated before public launch.
   */
  placeholder?: boolean
  /** Technical case study body for Project Detail */
  caseStudy?: ProjectCaseStudy
}

export const PROJECT_CATEGORY_LABELS: Record<ProjectCategory, string> = {
  'ai-engineering': 'AI Engineering',
  research: 'Research',
  'developer-tool': 'Developer Tool',
  'open-source': 'Open Source',
  competition: 'Competition',
}

export function getProjectCategoryLabel(category: ProjectCategory): string {
  return PROJECT_CATEGORY_LABELS[category]
}

/** Compact archive meta label (e.g. RESEARCH / TOOL). */
export function getProjectArchiveKindLabel(category: ProjectCategory): string {
  switch (category) {
    case 'ai-engineering':
      return 'AI Engineering'
    case 'research':
      return 'Research'
    case 'developer-tool':
      return 'Tool'
    case 'open-source':
      return 'Open Source'
    case 'competition':
      return 'Competition'
  }
}

export function getProjectDetailPersona(
  category: ProjectCategory,
): ProjectDetailPersona {
  if (category === 'research') return 'research'
  if (category === 'developer-tool' || category === 'open-source') {
    return 'developer-tool'
  }
  return 'ai-engineering'
}

export function matchesProjectFilter(
  project: Project,
  filter: ProjectFilterId,
): boolean {
  if (filter === 'all') return true
  if (filter === 'ai-engineering') return project.category === 'ai-engineering'
  if (filter === 'research') return project.category === 'research'
  return (
    project.category === 'developer-tool' || project.category === 'open-source'
  )
}
