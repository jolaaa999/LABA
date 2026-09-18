/**
 * Homepage Join narrative — contact channels when authorized.
 */
import type { JoinInfo } from '../types/join'

export const joinInfo: JoinInfo = {
  open: true,
  headline: '下一章还没有写定。',
  description:
    '接下来会怎样，取决于谁加入我们——构建者、阅读者，以及真正在意这份工作的人。',
  ctaLabel: '加入社区',
  ctaTo: '/join',
  qqGroup: '1050332675',
  qrCode: 'join/qq-qrcode.png',
  contactNote: '扫码加入 QQ 群，或进入加入页查看完整招新海报。',
  brandEcho: ['Learn AI.', 'Build Intelligence.', 'Create with AI.'],
}

export function getJoinInfo(): JoinInfo {
  return joinInfo
}
