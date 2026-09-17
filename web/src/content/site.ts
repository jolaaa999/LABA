/** Brand name used in navbar / footer — not a formal legal entity name. */
export const SITE_NAME = 'LABA'

/** Browser tab / document title brand line. */
export const SITE_DOCUMENT_TITLE = 'Learn AI, Build AI'

export const SITE_TAGLINE = '面向大学生的 AI × Deep Learning 技术社区。'

export type NavItem = {
  to: string
  label: string
  /** Match path exactly (Home) */
  exact?: boolean
}

export const primaryNav: NavItem[] = [
  { to: '/', label: '首页', exact: true },
  { to: '/explore', label: '探索' },
  { to: '/projects', label: '作品' },
  { to: '/events', label: '活动' },
  { to: '/community', label: '社区' },
  { to: '/about', label: '关于' },
]

export const footerNav: NavItem[] = [
  { to: '/explore', label: '探索' },
  { to: '/projects', label: '作品' },
  { to: '/events', label: '活动' },
  { to: '/community', label: '社区' },
  { to: '/about', label: '关于' },
  { to: '/join', label: '加入' },
]
