/**
 * Public community member — content entity only.
 * NOT an Auth User / Account. No permissions, no login.
 *
 * Auth User ≠ Community Member:
 * - User (future) = authentication / authorization
 * - Member = opt-in public community identity
 * A User may exist without a public Member profile.
 */
export type MemberDirection = 'ai' | 'research' | 'hybrid'

export type ContributionModeId =
  | 'build'
  | 'research'
  | 'explain'
  | 'document'
  | 'connect'

export interface Member {
  id: string
  /** URL-safe id for future /community/:slug — optional until public profiles exist */
  slug?: string
  /** Display name or placeholder identity */
  name: string
  role?: string
  year?: string
  direction: MemberDirection
  bio: string
  skills: string[]
  /** Opt-in contribution modes for Community page (optional on Homepage placeholders) */
  contributionModes?: ContributionModeId[]
  githubUrl?: string
  homepageUrl?: string
  /** Authorized portrait URL — omit until authentic assets exist */
  avatar?: string
  /** Link to a project slug / title for editorial connection */
  featuredProject?: string
  /** Project slugs referenced from content/projects.ts */
  projectSlugs?: string[]
  featured: boolean
  /** Only members with publicProfile === true appear on public surfaces */
  publicProfile: boolean
  /** Development placeholder marker — never claim as a real person */
  placeholder?: boolean
  /** Monogram / initial for abstract identity visual */
  monogram: string
  /** Roster index label e.g. "01" */
  index: string
}
