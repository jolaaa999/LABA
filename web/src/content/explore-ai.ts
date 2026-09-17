/**
 * Explore AI — public orientation for the Build with AI path.
 * Not a course catalog, enrollment, or progress model.
 */

export type AiStageId =
  | 'foundations'
  | 'ai-native-coding'
  | 'agent-systems'
  | 'rag-mcp'
  | 'workflow-eval'
  | 'ship'

export interface AiStageFacet {
  id: 'capability' | 'practice' | 'tools' | 'deliverable'
  label: string
  body: string
}

export interface AiStage {
  id: AiStageId
  index: string
  title: string
  lede: string
  facets: AiStageFacet[]
}

export interface PracticeLoopStep {
  id: string
  label: string
  statement: string
}

export const exploreAiHero = {
  eyebrow: 'AI 工程',
  title: '学会用 AI 去构建，而不只是向它提问。',
  lede: '这条路径把模型当作工程过程的一部分——上下文、工具、评估与交付。聊天只是表层，交付才是目的。',
}

export const aiStages: AiStage[] = [
  {
    id: 'foundations',
    index: '01',
    title: '基础',
    lede: '有足够的手艺：用代码表达想法、保留历史，并读懂工具真正在说什么。',
    facets: [
      {
        id: 'capability',
        label: '能力',
        body: '写一个小程序，给它做版本管理，按 README 跑起来，并把模糊的目标拆成可检验的步骤。',
      },
      {
        id: 'practice',
        label: '实践',
        body: '做一个小脚本或 CLI。让提交记录能被别人沿着走。靠读报错修掉一个 bug，而不是靠猜。',
      },
      {
        id: 'tools',
        label: '工具 / 概念',
        body: 'Git、Python 或 TypeScript、终端、文档、问题拆解。',
      },
      {
        id: 'deliverable',
        label: '交付物',
        body: '一个适合公开的仓库：能跑起来，并且 README 足以让同伴自己试一次。',
      },
    ],
  },
  {
    id: 'ai-native-coding',
    index: '02',
    title: 'AI 原生编程',
    lede: '在仓库里使用模型——把它当作需要你审查的协作者，而不是思考的替代品。',
    facets: [
      {
        id: 'capability',
        label: '能力',
        body: '给模型正确的上下文，接受或拒绝它的 diff，并始终掌握设计的主导权。',
      },
      {
        id: 'practice',
        label: '实践',
        body: '用辅助编程交付一个真实功能。记录下你信任了什么、重写了什么，以及为什么。',
      },
      {
        id: 'tools',
        label: '工具 / 概念',
        body: 'AI 编程环境、把 prompt 当规格来写、上下文窗口、用测试兜底。',
      },
      {
        id: 'deliverable',
        label: '交付物',
        body: '一次已合并（或可随时合并）的改动，外加一份简短记录：模型帮到了哪里，又在哪里失败。',
      },
    ],
  },
  {
    id: 'agent-systems',
    index: '03',
    title: 'Agent 系统',
    lede: '计划、工具、观察与回写的循环——边界足够清晰，才调试得动。',
    facets: [
      {
        id: 'capability',
        label: '能力',
        body: '设计一个能行动、能看到发生了什么，并在任务完成或出现风险时停下来的 Agent。',
      },
      {
        id: 'practice',
        label: '实践',
        body: '给它一份狭窄的工作和少量工具。读它的执行轨迹。收紧契约，直到这个循环是诚实的。',
      },
      {
        id: 'tools',
        label: '工具 / 概念',
        body: '工具调用、执行轨迹、记忆边界、护栏、人在回路。',
      },
      {
        id: 'deliverable',
        label: '交付物',
        body: '一个小 Agent，能完成一项明确的任务，并留下你解释得清楚的审计轨迹。',
      },
    ],
  },
  {
    id: 'rag-mcp',
    index: '04',
    title: 'RAG 与 MCP',
    lede: '把回答锚定在你可控的来源上。让模型能够触达本地工具，而不是假装它「知道」。',
    facets: [
      {
        id: 'capability',
        label: '能力',
        body: '先检索，再生成。给出引用。通过工具接口暴露一项本地能力。',
      },
      {
        id: 'practice',
        label: '实践',
        body: '给一个小语料建索引。只从它里面回答。再给文件、仓库或命令加一座 MCP 式的桥。',
      },
      {
        id: 'tools',
        label: '工具 / 概念',
        body: '检索、Embedding、切分、引用、MCP / 工具服务。',
      },
      {
        id: 'deliverable',
        label: '交付物',
        body: '在已知文档集上做带来源的问答，外加一条真正跑通的本地工具连接。',
      },
    ],
  },
  {
    id: 'workflow-eval',
    index: '05',
    title: '工作流与评估',
    lede: '把步骤组合起来。知道流水线何时失败。宁可要一个会失败的检查，也不要一个侥幸的演示。',
    facets: [
      {
        id: 'capability',
        label: '能力',
        body: '把一次性的 prompt 变成有输入、有输出、也有质量评分方式的序列。',
      },
      {
        id: 'practice',
        label: '实践',
        body: '把两个以上的步骤串起来。加一个小型评估集。故意让一个用例失败，然后修正契约。',
      },
      {
        id: 'tools',
        label: '工具 / 概念',
        body: '工作流、执行轨迹、评估集、回归检查、可观测性。',
      },
      {
        id: 'deliverable',
        label: '交付物',
        body: '一个有文档的工作流，至少包含一个会失败的检查——并说明什么才算「好」。',
      },
    ],
  },
  {
    id: 'ship',
    index: '06',
    title: '交付上线',
    lede: '离开 notebook。把成果放到别人真正能试用它的地方。',
    facets: [
      {
        id: 'capability',
        label: '能力',
        body: '打包、演示并讲解一个能用的产物，同时不隐瞒它的局限。',
      },
      {
        id: 'practice',
        label: '实践',
        body: '部署好，或者把演示交给同伴。看他们在哪里卡住。去修上手流程，而不是修演示文稿。',
      },
      {
        id: 'tools',
        label: '工具 / 概念',
        body: '托管、README、演示路径、问题记录、使用限制。',
      },
      {
        id: 'deliverable',
        label: '交付物',
        body: '一个同学能自己打开并使用的东西——CLI、机器人、小应用或有文档的工作流——不需要你在旁边。',
      },
    ],
  },
]

export const practiceLoop = {
  eyebrow: '实践循环',
  title: '工作真正是如何推进的。',
  lede: '阶段只是地图，循环才是习惯。把它重复在每一件工作上——而不是当成一个课程模块。',
  steps: [
    {
      id: 'understand',
      label: '理解',
      statement: '说清用户是谁、约束是什么，以及「做完」长什么样。',
    },
    {
      id: 'build',
      label: '构建',
      statement: '做出最小的、可以在公开场合失败的那个版本。',
    },
    {
      id: 'test',
      label: '验证',
      statement: '试它。把它弄坏。写下模型或流水线错在哪里。',
    },
    {
      id: 'explain',
      label: '解释',
      statement: '向同伴说清它为什么成立——以及哪些地方绝不能信它。',
    },
    {
      id: 'ship',
      label: '交付上线',
      statement: '把它交到别人手里。然后针对他们做不到的部分，重新开始这个循环。',
    },
  ] satisfies PracticeLoopStep[],
}

export const aiCapstone = {
  eyebrow: '收官项目',
  title: '做出一个别人真能用的东西。',
  lede: '不是 prompt 收集册，也不是关于 Agent 的幻灯片。而是一件工具、一套工作流，或一个小系统——别人不需要你现场翻译就能自己上手。',
  note: '这是一次社区定向，不是证书。没有报名，没有进度条——只有你留下的作品。',
}

export function getAiStage(id: AiStageId): AiStage | undefined {
  return aiStages.find((stage) => stage.id === id)
}
