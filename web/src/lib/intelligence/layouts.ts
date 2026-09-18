import type { EdgeHierarchy, EdgeLayout, NodeLayout, SceneLayout } from './types'

function node(
  id: string,
  x: number,
  y: number,
  z: number,
  role: NodeLayout['role'],
  label: string,
  opts: Partial<Omit<NodeLayout, 'id' | 'position' | 'role' | 'label'>> = {},
): NodeLayout {
  return {
    id,
    position: { x, y, z },
    role,
    label,
    scale: opts.scale ?? (role === 'primary' ? 1.55 : 0.58),
    opacity: opts.opacity ?? (role === 'primary' ? 1 : 0.72),
    hotspot: opts.hotspot,
    microcopy: opts.microcopy,
  }
}

function edge(
  id: string,
  from: string,
  to: string,
  hierarchy: EdgeHierarchy,
  opacity = hierarchy === 'primary' ? 0.88 : 0.34,
): EdgeLayout {
  return {
    id,
    from,
    to,
    opacity,
    curved: true,
    kind: 'attention',
    hierarchy,
    weight: hierarchy === 'primary' ? 1 : 0.5,
  }
}

/** Two connected constellations: research/deep learning and AI Agent practice. */
export const NODE_IDS = ['n0', 'n1', 'n2', 'n3', 'n4', 's0', 's1', 's2', 's3', 's4', 's5', 's6', 's7'] as const

const constellationNodes: NodeLayout[] = [
  node('n0', -0.72, 0.02, 0.34, 'primary', '深度学习', {
    scale: 1.72,
    hotspot: true,
    microcopy: '走向模型、论文与科研的深水区。',
  }),
  node('n1', 0.72, 0.02, 0.34, 'primary', 'AI AGENT', {
    scale: 1.72,
    hotspot: true,
    microcopy: '把智能组织成能在工作中完成任务的系统。',
  }),
  // 深度学习星团
  node('n2', -1.18, 0.42, 0.06, 'secondary', 'NLP'),
  node('n3', -1.18, -0.4, 0.02, 'secondary', 'CNN'),
  node('s0', -0.72, 0.54, -0.04, 'secondary', 'Transformer'),
  node('s1', -0.32, 0.35, 0.0, 'secondary', '扩散模型'),
  node('s2', -0.38, -0.42, -0.06, 'secondary', '强化学习'),
  // AI Agent 星团
  node('n4', 1.18, 0.43, 0.06, 'secondary', 'Harness'),
  node('s3', 1.2, -0.4, 0.02, 'secondary', '上下文'),
  node('s4', 0.72, 0.54, -0.04, 'secondary', '工具调用'),
  node('s5', 0.32, 0.35, 0.0, 'secondary', 'RAG'),
  node('s6', 0.38, -0.42, -0.06, 'secondary', '工作流'),
  node('s7', 0.72, -0.55, -0.08, 'secondary', '评测'),
]

const constellationEdges: EdgeLayout[] = [
  // The single bright bridge makes the two paths visibly related.
  edge('e0', 'n0', 'n1', 'primary', 0.96),
  edge('e1', 'n0', 'n2', 'secondary'),
  edge('e2', 'n0', 'n3', 'secondary'),
  edge('e3', 'n0', 's0', 'secondary'),
  edge('e4', 'n0', 's1', 'secondary'),
  edge('e5', 'n0', 's2', 'secondary'),
  edge('e6', 'n1', 'n4', 'secondary'),
  edge('e7', 'n1', 's3', 'secondary'),
  edge('e8', 'n1', 's4', 'secondary'),
  edge('e9', 'n1', 's5', 'secondary'),
  edge('e10', 'n1', 's6', 'secondary'),
  edge('e11', 'n1', 's7', 'secondary'),
]

export const buildLayout: SceneLayout = { nodes: constellationNodes, edges: constellationEdges }
export const understandLayout: SceneLayout = { nodes: constellationNodes, edges: constellationEdges }

// Tighter arrangement preserves the two readable clusters on narrow screens.
const mobileNodes = constellationNodes.map((item) => ({
  ...item,
  position: {
    x: item.position.x * 0.82,
    y: item.position.y * 0.82,
    z: item.position.z,
  },
  scale: item.role === 'primary' ? 1.45 : 0.54,
}))

export const buildLayoutMobile: SceneLayout = { nodes: mobileNodes, edges: constellationEdges }
export const understandLayoutMobile: SceneLayout = { nodes: mobileNodes, edges: constellationEdges }

export function resolvePerformanceCounts(tier: 'high' | 'balanced' | 'reduced') {
  switch (tier) {
    case 'high':
      return { ambient: 58, secondaryVisible: 11, curveSegments: 16, idleStrength: 0.85 }
    case 'balanced':
      return { ambient: 36, secondaryVisible: 11, curveSegments: 12, idleStrength: 0.6 }
    case 'reduced':
      return { ambient: 18, secondaryVisible: 11, curveSegments: 8, idleStrength: 0.3 }
  }
}

export function layoutsForViewport(width: number) {
  const compact = width < 720
  return {
    compact,
    build: compact ? buildLayoutMobile : buildLayout,
    understand: compact ? understandLayoutMobile : understandLayout,
  }
}
