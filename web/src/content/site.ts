/** Shared brand site labels — not a formal legal entity name. */
export const SITE_NAME = 'AI Community'

/** Browser tab / document title brand line. */
export const SITE_DOCUMENT_TITLE = 'Learn AI, Build AI'

export const SITE_TAGLINE = 'A university AI × Deep Learning tech community.'

export type NavItem = {
  to: string
  label: string
  /** Match path exactly (Home) */
  exact?: boolean
}

export const primaryNav: NavItem[] = [
  { to: '/', label: 'Home', exact: true },
  { to: '/explore', label: 'Explore' },
  { to: '/projects', label: 'Projects' },
  { to: '/events', label: 'Events' },
  { to: '/community', label: 'Community' },
  { to: '/about', label: 'About' },
]

export const footerNav: NavItem[] = [
  { to: '/explore', label: 'Explore' },
  { to: '/projects', label: 'Projects' },
  { to: '/events', label: 'Events' },
  { to: '/community', label: 'Community' },
  { to: '/about', label: 'About' },
  { to: '/join', label: 'Join' },
]
