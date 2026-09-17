/** Homepage community activity types (Frontend-first, local content). */
export interface Activity {
  id: string
  index: string
  category: string
  title: string
  statement: string
  meta?: string
  /** Optional real activity photo — omit until authentic assets exist */
  cover?: string
}
