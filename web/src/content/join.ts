/**
 * Homepage Join narrative — contact channels optional.
 * No fake QQ / QR / form URLs. Add real values when authorized.
 */
import type { JoinInfo } from '../types/join'

export const joinInfo: JoinInfo = {
  open: true,
  headline: 'The next chapter isn’t written yet.',
  description:
    'What comes next depends on who joins us — builders, readers, and people who care about the work.',
  ctaLabel: 'Join the Community',
  ctaTo: '/join',
  contactNote:
    'Public recruiting details are not published yet — no public QQ / QR available.',
  brandEcho: ['Learn AI.', 'Build Intelligence.', 'Create with AI.'],
}

export function getJoinInfo(): JoinInfo {
  return joinInfo
}
