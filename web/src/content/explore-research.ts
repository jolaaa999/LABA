/**
 * Explore Deep Learning — Research Field Guide (public orientation).
 * Evidence-driven path: Question → Understanding → Reproduction → Experiment → Evidence.
 * Not a course catalog, LMS, paper DB, or progress model.
 */

export type ResearchStageId =
  | 'foundations'
  | 'modeling'
  | 'reading'
  | 'reproduction'
  | 'experiment'
  | 'research'

export interface ResearchStage {
  id: ResearchStageId
  index: string
  shortLabel: string
  title: string
  statement: string
  question: string
  practice: string
  concepts?: string[]
  evidence: string
  failureSignals: string[]
}

export interface ResearchLoopStep {
  id: string
  label: string
  statement: string
}

export interface EvidenceLedgerItem {
  id: string
  index: string
  label: string
  statement: string
}

export const exploreResearchHero = {
  eyebrow: 'Deep Learning × Research',
  title: '学会理解模型——深到足以向它发问。',
  lede: '模型不是用来背的图。去读它的假设，去复现它的证据，只改一处，然后观察会发生什么。',
}

export const researchPathIntro = {
  eyebrow: '路径',
  title: '从模型 → 证据 → 问题。',
  lede: '科研定向的六个阶段。不是等级，也不是必须先通关才能思考的关卡。',
}

export const researchStages: ResearchStage[] = [
  {
    id: 'foundations',
    index: '01',
    shortLabel: '基础',
    title: '基础',
    statement:
      '有足够的熟练度，能自己写、跑、检查和调试一个小型训练循环——而不只是照着 notebook 走一遍。',
    question:
      '你能自己写、跑、检查和调试一个小型训练循环吗？',
    practice:
      '搭一个最小的数据集、模型、损失、优化器和训练/评估循环。盯住 shape、loss、梯度、设备和随机种子——不要只是照抄教程。',
    concepts: [
      'Python',
      'NumPy',
      'PyTorch',
      'Tensor',
      'Autograd',
      '数据集 / DataLoader',
      '训练循环',
      '损失',
      '优化器',
      'GPU 基础',
      '日志',
      '随机种子',
    ],
    evidence:
      '一份可复现的训练脚本，带配置、README、随机种子、指标输出和失败记录。',
    failureSignals: [
      '你只会在 notebook 里改单元格，没法干净地重跑一遍。',
      '报出 shape 错误，而你找不到它从哪来。',
      '你讲不清训练模式与评估模式的区别。',
    ],
  },
  {
    id: 'modeling',
    index: '02',
    shortLabel: '建模',
    title: '建模',
    statement:
      '从「模型能跑」走到「我能说出这种结构做了哪些假设」。',
    question:
      '这个架构在表征、交互或优化上做了哪些假设？',
    practice:
      '拿一个简单模型，只改一处结构选择——深度、归一化或注意力配置——再对比训练行为。这里只做定向，不要编造结果。',
    concepts: [
      '表征',
      '归纳偏置',
      'CNN 局部性',
      'Attention',
      'Transformer',
      'MLP / Embedding',
      '归一化',
      '正则化',
      '泛化',
    ],
    evidence:
      '一份简短笔记：你改动了哪个假设、你预期什么、以及你实际观察到了什么。',
    failureSignals: [
      '你说得出架构的名字，却说不出它们的归纳偏置。',
      '你一次改了好几个开关，然后把这个结果叫做「消融」。',
      '你把一张图当成理解，而没有跑过一次前向传播。',
    ],
  },
  {
    id: 'reading',
    index: '03',
    shortLabel: '精读',
    title: '读论文',
    statement:
      '学会梳理一篇论文的论证链条——而不是第一遍就逐句翻译。',
    question:
      '这篇论文的论证由哪些部分组成：问题、假设、方法、基线、实验、主张与局限？',
    practice:
      '在深抠公式之前，先写一页论文地图：问题、主张、方法、证据、局限。然后再回来看实现细节。',
    concepts: [
      '问题',
      '假设',
      '方法',
      '基线',
      '实验',
      '主张',
      '局限',
    ],
    evidence:
      '一份论文地图，别人不必逐行重开 PDF 就能拿它讨论这篇论文的主张。',
    failureSignals: [
      '你的第一遍只是把原文换了一种说法。',
      '你说不出这个主张所依赖的基线。',
      '你指不出哪个实验支撑哪条主张。',
    ],
  },
  {
    id: 'reproduction',
    index: '04',
    shortLabel: '复现',
    title: '复现',
    statement:
      '问题不是「代码跑起来了吗」，而是「你能把证据复现回来吗」。',
    question: '在一个固定且可检视的环境下，你能把证据重新得到吗？',
    practice:
      '挑一篇小论文或一个基线。搭一条可追溯的链路：论文 → 代码 → 配置 → 运行 → 指标 → 失败日志。SOTA 不是目标。',
    concepts: [
      '数据划分',
      '随机种子',
      '配置',
      '训练步数',
      '指标',
      '评估',
      '环境 / 版本',
      '检查点策略',
    ],
    evidence:
      '一份复现笔记，包含配置快照、环境、指标定义、运行日志和失败尝试——而不只是一个最终数字。',
    failureSignals: [
      '你只留下最好看的那次数字，把失败的运行删掉了。',
      '别人无法从你的笔记里还原出随机种子和配置。',
      '你把每一处不一致都归为「我代码写错了」，而忽略了论文本身的含糊、预处理、指标定义或算力预算。',
    ],
  },
  {
    id: 'experiment',
    index: '05',
    shortLabel: '实验',
    title: '实验',
    statement:
      '一次只改一处。清楚这一改动回答的是什么问题。数字更高并不自动等于证据更好。',
    question:
      '这个受控改动产生的证据，回答了你提出的问题吗？',
    practice:
      '提出一个小问题（稳定性、预处理、失败案例）。守住一个公平的基线。只改相关的那个变量。记录配置、结果、失败与局限——不要编造结论。',
    concepts: [
      '基线',
      '对照',
      '变量',
      '消融',
      '指标',
      '随机种子',
      '失败案例',
      '定性检查',
      '算力预算',
    ],
    evidence:
      '一份实验笔记，其中基线、变量、指标与局限都写得足够明确，同伴可以据此提出质疑。',
    failureSignals: [
      '你改了好几个因素，却仍然声称得到了干净的结论。',
      '基线不公平，或者根本没有写出来。',
      '指标和你提出的问题对不上。',
    ],
  },
  {
    id: 'research',
    index: '06',
    shortLabel: '科研',
    title: '科研',
    statement:
      '不是「发一篇论文」。而是提出一个值得验证的问题——并养成留下可被检视证据的习惯。',
    question: '哪个问题值得验证？公平的证据应该长什么样？',
    practice:
      '把整条链子拼起来：问题 → 假设 → 基线 → 实验 → 证据 → 解释 → 局限 → 下一个问题。这条路径不承诺论文、保研或奖项。',
    concepts: [
      '问题',
      '假设',
      '基线',
      '实验',
      '证据',
      '解释',
      '局限',
      '下一个问题',
    ],
    evidence:
      '一份科研笔记，另一个同学能读懂、能质疑，也能尝试接着做下去。',
    failureSignals: [
      '你没有基线、也没有可控实验，就直接跳到主张。',
      '你说不出这个结果没能证明什么。',
      '你把这条路径当成发表或保研的保证。',
    ],
  },
]

export const researchLoop = {
  eyebrow: '科研循环',
  title: '科研不是一条直线。',
  lede: '证据可能否定想法，失败可能改写问题。阶段只是给你定向，循环才是工作真正的推进方式。',
  steps: [
    {
      id: 'question',
      label: '问题',
      statement: '说清你想弄明白什么——窄到可以验证。',
    },
    {
      id: 'hypothesis',
      label: '假设',
      statement: '写下如果这个想法成立，你预期会看到什么。',
    },
    {
      id: 'reproduce',
      label: '复现',
      statement: '在动手改造之前，先复现出一个你信得过的基线。',
    },
    {
      id: 'experiment',
      label: '实验',
      statement: '在公平的对照下，只改一个相关的变量。',
    },
    {
      id: 'inspect',
      label: '检视',
      statement: '去看曲线、失败与边界情况——不要只看均值。',
    },
    {
      id: 'explain',
      label: '解释',
      statement: '说清证据支撑了什么，又支撑不了什么。',
    },
    {
      id: 'new-question',
      label: '新问题',
      statement: '让结果改写下一个问题——然后回到起点。',
    },
  ] satisfies ResearchLoopStep[],
}

export const evidenceLedger = {
  eyebrow: '什么才算证据？',
  title: '证据要可被检视——而不只是好看。',
  lede: '这个社区里一个有用的习惯：留下别人能核查、能质疑、也能接着做的工作。',
  items: [
    {
      id: 'config',
      index: '01',
      label: '配置',
      statement: '别人能确切知道你改了什么吗？',
    },
    {
      id: 'metric',
      index: '02',
      label: '指标',
      statement: '这个指标回答了你的问题吗？',
    },
    {
      id: 'failure',
      index: '03',
      label: '失败',
      statement: '哪些例子和平均值相矛盾？',
    },
    {
      id: 'limitation',
      index: '04',
      label: '局限',
      statement: '这个实验没能证明什么？',
    },
  ] satisfies EvidenceLedgerItem[],
}

export const researchCapstone = {
  eyebrow: '收官项目',
  title: '提出一个值得验证的问题。',
  lede: '不是「写一篇论文」。而是设计一个小问题、一个公平的基线、一次受控实验，并留下别人可以检视的证据。',
  note: '一份科研笔记可以包含：问题、假设、基线、实验、证据、失败案例、局限、下一个问题。这只是一次定向——不是证书。',
}

export function getResearchStage(id: ResearchStageId): ResearchStage | undefined {
  return researchStages.find((stage) => stage.id === id)
}
