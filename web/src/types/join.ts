export interface JoinInfo {
  open: boolean
  headline: string
  description: string
  ctaLabel: string
  /** Route or external URL — only set when real */
  ctaTo?: string
  ctaHref?: string
  qqGroup?: string
  qrCode?: string
  formUrl?: string
  contact?: string
  /** Shown when contact channels are not yet available */
  contactNote?: string
  brandEcho?: string[]
}
