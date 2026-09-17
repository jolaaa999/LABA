/**
 * Homepage Join narrative — contact channels optional.
 * No fake QQ / QR / form URLs. Add real values when authorized.
 */
import type { JoinInfo } from '../types/join'

export const joinInfo: JoinInfo = {
  open: true,
  headline: '下一章还没有写定。',
  description:
    '接下来会怎样，取决于谁加入我们——构建者、阅读者，以及真正在意这份工作的人。',
  ctaLabel: '加入社区',
  ctaTo: '/join',
  contactNote:
    '公开招新信息暂未发布——暂无公开 QQ / 二维码。',
  brandEcho: ['Learn AI.', 'Build Intelligence.', 'Create with AI.'],
}

export function getJoinInfo(): JoinInfo {
  return joinInfo
}
