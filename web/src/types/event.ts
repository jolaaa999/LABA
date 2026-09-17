/**
 * Events — Community Pulse content models (Frontend-first).
 * EventFormat = lasting activity types.
 * CommunityEvent = a concrete session instance (future Backend; not shown as real upcoming yet).
 */

export type EventDirection = 'ai-engineering' | 'research' | 'hybrid'

export type CommunityEventStatus = 'draft' | 'announced' | 'completed'

export interface EventFormat {
  id: string
  slug: string
  index: string
  label: string
  title: string
  description: string
  purpose: string
  whatHappens: string[]
  takeaway: string
  direction: EventDirection
}

/** Concrete session instance — reserved for future Backend / published schedule. */
export interface CommunityEvent {
  id: string
  slug: string
  formatId: string
  title: string
  summary: string
  startAt?: string
  endAt?: string
  locationLabel?: string
  status: CommunityEventStatus
  joinUrl?: string
  public: boolean
  /** Must not render as a real upcoming event while true */
  placeholder?: boolean
}
