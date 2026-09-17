/** Shared layout helpers for sticky nav / scroll focus. */

export function getStickyNavOffset(): number {
  if (typeof window === 'undefined' || typeof document === 'undefined') return 60
  const styles = getComputedStyle(document.documentElement)
  const raw = styles.getPropertyValue('--nav-height-scrolled').trim() || '3.75rem'
  if (raw.endsWith('rem')) {
    const rem = Number.parseFloat(raw)
    const root = Number.parseFloat(getComputedStyle(document.documentElement).fontSize)
    return rem * root
  }
  if (raw.endsWith('px')) return Number.parseFloat(raw)
  return 60
}

/** Focus band Y for “what the user is actually reading”, below sticky nav. */
export function getScrollFocusY(): number {
  const nav = getStickyNavOffset()
  return nav + (window.innerHeight - nav) * 0.32
}
