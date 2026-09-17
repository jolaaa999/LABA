/**
 * Homepage “What Happens Here” — activity culture types.
 * Describes how the community works, not claimed event history.
 */
import type { Activity } from '../types/activity'

export const activities: Activity[] = [
  {
    id: 'ai-workshop',
    index: '01',
    category: '工作坊',
    title: 'AI 工作坊',
    statement:
      '了解现代 AI 如何改变我们构建软件的方式——能真正落地的 Agent、工具与工作流。',
    meta: '每周 / 实验室',
  },
  {
    id: 'paper-reading',
    index: '02',
    category: '阅读',
    title: '论文精读',
    statement: '读论文。复现思路。质疑结论。',
    meta: '科研 / 每周',
  },
  {
    id: 'project-building',
    index: '03',
    category: '构建',
    title: '项目开发',
    statement: '把一个想法变成别人真正能用上的东西。',
    meta: '构建 / 分享',
  },
  {
    id: 'research-sharing',
    index: '04',
    category: '分享',
    title: '科研分享',
    statement: '实验、结果，以及仍未解答的问题——公开分享。',
    meta: '想法 / 交流',
  },
]

export function getHomepageActivities(): Activity[] {
  return activities
}
