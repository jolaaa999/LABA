/**
 * Homepage Story Timeline — DEVELOPMENT PLACEHOLDERS.
 * Abstract community storyline, not verified club history.
 * Do not treat labels as real awards, headcount, or dated achievements.
 */
import type { StoryMilestone } from '../types/story'

export const storyMilestones: StoryMilestone[] = [
  {
    id: 'foundation',
    index: '01',
    label: '起步',
    title: '一个社区开始成形。',
    statement: '学生因对 AI 的共同追问而聚到一起——不是课程大纲，而是实践。',
    placeholder: true,
  },
  {
    id: 'build-with-ai',
    index: '02',
    label: 'Build with AI',
    title: '工具成为我们创造方式的一部分。',
    statement: 'Agent、工作流与现代 AI 编程进入日常的构建之中。',
    placeholder: true,
  },
  {
    id: 'understand-ai',
    index: '03',
    label: 'Understand AI',
    title: '科研成为第二条方向。',
    statement: '论文、实验与审慎的复现，与工程实践并肩而立。',
    placeholder: true,
  },
  {
    id: 'build-together',
    index: '04',
    label: '共同构建',
    title: '项目与文化把两端连接起来。',
    statement: '工作坊、开放协作与共享成果，让社区变得真实。',
    placeholder: true,
  },
  {
    id: 'next',
    index: '05',
    label: '下一步',
    title: '下一章还没有写定。',
    statement: '接下来会发生什么，取决于谁加入——以及他们选择构建什么。',
    placeholder: true,
  },
]

export function getStoryMilestones(): StoryMilestone[] {
  return storyMilestones
}
