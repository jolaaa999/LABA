import type { EdgeLayout, NodeLayout, SceneLayout } from './types'

type Topic = readonly [label: string, copy: string]

const researchTopics: Topic[] = [
  ['NLP', '语言理解、生成与文本建模。'], ['CNN', '从视觉特征开始理解深度网络。'],
  ['Transformer', '注意力机制与现代基础模型。'], ['扩散模型', '生成式建模与图像合成。'],
  ['强化学习', '通过反馈优化决策。'], ['LLM', '大语言模型的训练与对齐。'],
  ['多模态', '让文字、图像和声音共享表示。'], ['预训练', '从大规模数据获得通用能力。'],
  ['微调', '把基础模型适配具体任务。'], ['损失函数', '定义学习目标与优化方向。'],
  ['反向传播', '让误差沿网络回流。'], ['优化器', 'SGD、Adam 与训练稳定性。'],
  ['PyTorch', '研究实验的常用工具链。'], ['论文复现', '将想法变成可验证的实验。'],
  ['评测基准', '用一致的标准比较模型能力。'], ['模型架构', '探索网络结构与归纳偏置。'],
  ['数据工程', '构建可靠的数据集与数据管线。'], ['可解释性', '理解模型如何做出判断。'],
  ['模型压缩', '让模型更轻、更快地运行。'], ['AI for Science', '用模型推动科学发现。'],
]

const agentTopics: Topic[] = [
  ['Harness', '为 Agent 提供稳定的运行框架。'], ['上下文工程', '把正确的信息放进有限的上下文。'],
  ['工具调用', '连接搜索、代码、数据库与业务系统。'], ['RAG', '从外部知识中检索可靠事实。'],
  ['工作流', '让多步任务可控、可观测。'], ['评测', '衡量 Agent 是否真正完成任务。'],
  ['Prompt', '用清晰指令塑造行为边界。'], ['Memory', '保存跨轮任务所需的经验。'],
  ['规划', '把复杂目标拆解为可执行步骤。'], ['反思', '从执行结果中校正下一步。'],
  ['多智能体', '让不同角色协作解决问题。'], ['MCP', '以统一协议连接工具与上下文。'],
  ['Sandbox', '在安全环境中执行高风险动作。'], ['Guardrails', '控制输出、权限与安全边界。'],
  ['Observability', '追踪每一步决策和工具轨迹。'], ['Human-in-the-loop', '在关键节点引入人工判断。'],
  ['部署', '将原型转化为真实工作流。'], ['权限系统', '让 Agent 在正确范围内行动。'],
  ['成本优化', '在速度、效果与调用成本间平衡。'], ['产品设计', '围绕真实工作场景设计体验。'],
]

function node(id: string, x: number, y: number, z: number, role: NodeLayout['role'], label: string, microcopy: string, scale: number): NodeLayout {
  return { id, position: { x, y, z }, role, label, microcopy, hotspot: true, scale, opacity: role === 'primary' ? 1 : 0.75 }
}

function makeCluster(prefix: string, centerX: number, topics: Topic[]): { nodes: NodeLayout[]; edges: EdgeLayout[] } {
  const nodes: NodeLayout[] = []
  const edges: EdgeLayout[] = []
  topics.forEach(([label, copy], index) => {
    const angle = (index / topics.length) * Math.PI * 2 + (prefix === 'r' ? 0.25 : 0.7)
    const ring = index % 3
    const radius = 0.34 + ring * 0.16 + (index % 2) * 0.025
    const id = `${prefix}${index}`
    nodes.push(node(id, centerX + Math.cos(angle) * radius, Math.sin(angle) * radius * 0.82, -0.15 + ((index * 7) % 9) * 0.065, 'secondary', label, copy, 0.42 + (index % 4) * 0.055))
    edges.push({ id: `e-${id}`, from: prefix === 'r' ? 'research' : 'agent', to: id, opacity: 0.2 + (index % 3) * 0.04, curved: true, kind: 'attention', hierarchy: 'secondary', weight: 0.34 })
  })
  return { nodes, edges }
}

const research = makeCluster('r', -0.72, researchTopics)
const agent = makeCluster('a', 0.72, agentTopics)
const cores = [
  node('research', -0.72, 0, 0.38, 'primary', '深度学习', '走向模型、论文与科研的深水区。', 1.5),
  node('agent', 0.72, 0, 0.38, 'primary', 'AI Agent', '把智能组织成能在工作中完成任务的系统。', 1.5),
]
const bridge: EdgeLayout = { id: 'e-bridge', from: 'research', to: 'agent', opacity: 0.9, curved: true, kind: 'attention', hierarchy: 'primary', weight: 1 }

/** An explorable, dense dual constellation of research and applied-agent knowledge. */
export const buildLayout: SceneLayout = { nodes: [...cores, ...research.nodes, ...agent.nodes], edges: [bridge, ...research.edges, ...agent.edges] }
export const understandLayout = buildLayout
export const NODE_IDS = buildLayout.nodes.map((item) => item.id)

const mobileNodes = buildLayout.nodes.map((item) => ({ ...item, position: { x: item.position.x * 0.8, y: item.position.y * 0.82, z: item.position.z } }))
export const buildLayoutMobile: SceneLayout = { nodes: mobileNodes, edges: buildLayout.edges }
export const understandLayoutMobile = buildLayoutMobile

export function resolvePerformanceCounts(tier: 'high' | 'balanced' | 'reduced') {
  switch (tier) {
    case 'high': return { ambient: 120, secondaryVisible: 40, curveSegments: 10, idleStrength: 0.85 }
    case 'balanced': return { ambient: 72, secondaryVisible: 40, curveSegments: 8, idleStrength: 0.6 }
    case 'reduced': return { ambient: 36, secondaryVisible: 40, curveSegments: 6, idleStrength: 0.3 }
  }
}

export function layoutsForViewport(width: number) {
  const compact = width < 720
  return { compact, build: compact ? buildLayoutMobile : buildLayout, understand: compact ? understandLayoutMobile : understandLayout }
}
