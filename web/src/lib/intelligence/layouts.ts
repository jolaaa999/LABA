import type { EdgeHierarchy, EdgeLayout, NodeLayout, SceneLayout } from './types'

function n(
  id: string,
  x: number,
  y: number,
  z: number,
  opts: Partial<Omit<NodeLayout, 'id' | 'position'>> & { role: NodeLayout['role'] },
): NodeLayout {
  return {
    id,
    position: { x, y, z },
    scale: opts.scale ?? (opts.role === 'primary' ? 1 : 0.55),
    opacity: opts.opacity ?? (opts.role === 'primary' ? 1 : 0.55),
    role: opts.role,
    label: opts.label,
    hotspot: opts.hotspot,
    microcopy: opts.microcopy,
  }
}

function e(
  id: string,
  from: string,
  to: string,
  opacity: number,
  opts: {
    curved?: boolean
    kind?: EdgeLayout['kind']
    hierarchy?: EdgeHierarchy
    weight?: number
  } = {},
): EdgeLayout {
  const hierarchy = opts.hierarchy ?? 'secondary'
  return {
    id,
    from,
    to,
    opacity,
    curved: opts.curved ?? false,
    kind: opts.kind ?? 'flow',
    hierarchy,
    weight: opts.weight ?? (hierarchy === 'primary' ? 1 : hierarchy === 'secondary' ? 0.55 : 0.28),
  }
}

/** Shared node IDs — same intelligence, different perspective. */
export const NODE_IDS = [
  'n0',
  'n1',
  'n2',
  'n3',
  'n4',
  's0',
  's1',
  's2',
  's3',
  's4',
  's5',
  's6',
  's7',
] as const

/**
 * Desktop BUILD — left→right directional field (~65–75% width span).
 * z: primary foreground/mid, secondary mid, ambient bg via particles.
 */
export const buildLayout: SceneLayout = {
  nodes: [
    n('n0', -1.28, 0.38, 0.36, {
      role: 'primary',
      label: 'TASK',
      scale: 1.12,
    }),
    n('n1', -0.62, 0.2, 0.3, {
      role: 'primary',
      label: 'PLAN',
      hotspot: true,
      microcopy: 'Turn intent into a workable path.',
      scale: 1.14,
    }),
    n('n2', 0.04, 0.02, 0.4, {
      role: 'primary',
      label: 'TOOL',
      hotspot: true,
      microcopy: 'Connect reasoning to action.',
      scale: 1.28,
    }),
    n('n3', 0.68, -0.28, 0.26, {
      role: 'primary',
      label: 'OBSERVE',
      scale: 1.1,
    }),
    n('n4', 1.3, 0.1, 0.32, {
      role: 'primary',
      label: 'RESULT',
      hotspot: true,
      microcopy: 'Close the loop with something usable.',
      scale: 1.16,
    }),
    // Local relations around key steps — not center-clustered
    n('s0', -0.92, -0.22, 0.04, { role: 'secondary', opacity: 0.45 }),
    n('s1', -0.32, -0.34, -0.04, { role: 'secondary', opacity: 0.42 }),
    n('s2', 0.28, 0.4, -0.06, { role: 'secondary', opacity: 0.4 }),
    n('s3', 0.92, 0.32, -0.02, { role: 'secondary', opacity: 0.42 }),
    n('s4', -1.18, -0.1, -0.16, { role: 'secondary', opacity: 0.35 }),
    n('s5', 0.46, -0.48, -0.12, { role: 'secondary', opacity: 0.38 }),
    n('s6', -0.48, 0.46, -0.1, { role: 'secondary', opacity: 0.36 }),
    n('s7', 1.08, -0.36, -0.08, { role: 'secondary', opacity: 0.36 }),
  ],
  edges: [
    e('e0', 'n0', 'n1', 0.72, { hierarchy: 'primary', weight: 1 }),
    e('e1', 'n1', 'n2', 0.82, { hierarchy: 'primary', weight: 1 }),
    e('e2', 'n2', 'n3', 0.72, { hierarchy: 'primary', weight: 0.95 }),
    e('e3', 'n3', 'n4', 0.78, { hierarchy: 'primary', weight: 1 }),
    e('e4', 'n1', 's0', 0.28, { curved: true, hierarchy: 'secondary', weight: 0.5 }),
    e('e5', 'n2', 's1', 0.26, { curved: true, hierarchy: 'secondary', weight: 0.5 }),
    e('e6', 'n2', 's2', 0.24, { curved: true, hierarchy: 'secondary', weight: 0.45 }),
    e('e7', 'n3', 's3', 0.22, { curved: true, hierarchy: 'secondary', weight: 0.45 }),
    e('e8', 'n0', 's4', 0.16, { curved: true, hierarchy: 'ambient', weight: 0.25 }),
    e('e9', 'n4', 's5', 0.16, { curved: true, hierarchy: 'ambient', weight: 0.25 }),
    e('e10', 's0', 's1', 0.12, { curved: true, hierarchy: 'ambient', weight: 0.2 }),
    e('e11', 's6', 'n1', 0.14, { curved: true, hierarchy: 'ambient', weight: 0.22 }),
    e('e12', 's7', 'n4', 0.14, { curved: true, hierarchy: 'ambient', weight: 0.22 }),
  ],
}

/**
 * Desktop UNDERSTAND — three spatial clusters + experiment/output relation.
 * Fewer primary attention arcs; secondary/ambient much quieter.
 */
export const understandLayout: SceneLayout = {
  nodes: [
    n('n0', -1.15, 0.46, 0.32, {
      role: 'primary',
      label: 'TOKENS',
      scale: 1.1,
    }),
    n('n1', -0.05, 0.38, 0.38, {
      role: 'primary',
      label: 'ATTENTION',
      hotspot: true,
      microcopy: 'See which relationships matter.',
      scale: 1.26,
    }),
    n('n2', 0.95, 0.1, 0.34, {
      role: 'primary',
      label: 'REPRESENTATION',
      hotspot: true,
      microcopy: 'Hold meaning in a shared space.',
      scale: 1.22,
    }),
    n('n3', -0.28, -0.36, 0.24, {
      role: 'primary',
      label: 'EXPERIMENT',
      hotspot: true,
      microcopy: 'Test the idea against reality.',
      scale: 1.12,
    }),
    n('n4', 1.05, -0.4, 0.28, {
      role: 'primary',
      label: 'OUTPUT',
      scale: 1.1,
    }),
    // Cluster satellites
    n('s0', -1.32, 0.12, -0.06, { role: 'secondary', opacity: 0.4 }),
    n('s1', -0.78, 0.24, -0.02, { role: 'secondary', opacity: 0.42 }),
    n('s2', 0.28, 0.5, -0.04, { role: 'secondary', opacity: 0.38 }),
    n('s3', 0.52, 0.18, -0.08, { role: 'secondary', opacity: 0.4 }),
    n('s4', 1.18, 0.38, -0.1, { role: 'secondary', opacity: 0.36 }),
    n('s5', -0.55, -0.5, -0.14, { role: 'secondary', opacity: 0.36 }),
    n('s6', 0.55, -0.52, -0.12, { role: 'secondary', opacity: 0.36 }),
    n('s7', 0.22, -0.1, -0.2, { role: 'secondary', opacity: 0.32 }),
  ],
  edges: [
    // Primary attention spine — minimal crossings
    e('e0', 'n0', 'n1', 0.7, {
      curved: true,
      kind: 'attention',
      hierarchy: 'primary',
      weight: 1,
    }),
    e('e1', 'n1', 'n2', 0.78, {
      curved: true,
      kind: 'attention',
      hierarchy: 'primary',
      weight: 1,
    }),
    e('e2', 'n2', 'n4', 0.62, {
      curved: true,
      kind: 'attention',
      hierarchy: 'primary',
      weight: 0.9,
    }),
    e('e3', 'n1', 'n3', 0.58, {
      curved: true,
      kind: 'attention',
      hierarchy: 'primary',
      weight: 0.85,
    }),
    e('e4', 'n3', 'n4', 0.55, {
      curved: true,
      kind: 'attention',
      hierarchy: 'secondary',
      weight: 0.6,
    }),
    // Soft cluster ties
    e('e5', 'n0', 's0', 0.18, {
      curved: true,
      kind: 'attention',
      hierarchy: 'ambient',
      weight: 0.25,
    }),
    e('e6', 'n0', 's1', 0.2, {
      curved: true,
      kind: 'attention',
      hierarchy: 'ambient',
      weight: 0.28,
    }),
    e('e7', 'n1', 's2', 0.22, {
      curved: true,
      kind: 'attention',
      hierarchy: 'secondary',
      weight: 0.4,
    }),
    e('e8', 'n2', 's3', 0.2, {
      curved: true,
      kind: 'attention',
      hierarchy: 'secondary',
      weight: 0.38,
    }),
    e('e9', 'n2', 's4', 0.16, {
      curved: true,
      kind: 'attention',
      hierarchy: 'ambient',
      weight: 0.22,
    }),
    e('e10', 'n3', 's5', 0.16, {
      curved: true,
      kind: 'attention',
      hierarchy: 'ambient',
      weight: 0.22,
    }),
    e('e11', 'n4', 's6', 0.16, {
      curved: true,
      kind: 'attention',
      hierarchy: 'ambient',
      weight: 0.22,
    }),
    e('e12', 'n2', 's7', 0.14, {
      curved: true,
      kind: 'attention',
      hierarchy: 'ambient',
      weight: 0.2,
    }),
  ],
}

/** Mobile — smaller world, larger subject. Wider relative framing, fewer satellites. */
export const buildLayoutMobile: SceneLayout = {
  nodes: [
    n('n0', -0.88, 0.28, 0.34, { role: 'primary', label: 'TASK', scale: 1.22 }),
    n('n1', -0.4, 0.12, 0.3, {
      role: 'primary',
      label: 'PLAN',
      hotspot: true,
      microcopy: 'Turn intent into a workable path.',
      scale: 1.24,
    }),
    n('n2', 0.05, -0.02, 0.38, {
      role: 'primary',
      label: 'TOOL',
      hotspot: true,
      microcopy: 'Connect reasoning to action.',
      scale: 1.36,
    }),
    n('n3', 0.46, -0.2, 0.26, { role: 'primary', label: 'OBSERVE', scale: 1.2 }),
    n('n4', 0.88, 0.08, 0.32, {
      role: 'primary',
      label: 'RESULT',
      hotspot: true,
      microcopy: 'Close the loop with something usable.',
      scale: 1.24,
    }),
    n('s0', -0.64, -0.22, 0.0, { role: 'secondary', opacity: 0.4 }),
    n('s1', -0.12, -0.3, -0.04, { role: 'secondary', opacity: 0.38 }),
    n('s2', 0.28, 0.26, -0.06, { role: 'secondary', opacity: 0.36 }),
    n('s3', 0.64, 0.22, -0.02, { role: 'secondary', opacity: 0.36 }),
    n('s4', -0.82, -0.02, -0.14, { role: 'secondary', opacity: 0.3 }),
    n('s5', 0.3, -0.38, -0.1, { role: 'secondary', opacity: 0.3 }),
    n('s6', -0.26, 0.32, -0.08, { role: 'secondary', opacity: 0.28 }),
    n('s7', 0.74, -0.28, -0.06, { role: 'secondary', opacity: 0.28 }),
  ],
  edges: [
    e('e0', 'n0', 'n1', 0.75, { hierarchy: 'primary', weight: 1 }),
    e('e1', 'n1', 'n2', 0.82, { hierarchy: 'primary', weight: 1 }),
    e('e2', 'n2', 'n3', 0.72, { hierarchy: 'primary', weight: 0.95 }),
    e('e3', 'n3', 'n4', 0.78, { hierarchy: 'primary', weight: 1 }),
    e('e4', 'n1', 's0', 0.24, { curved: true, hierarchy: 'secondary', weight: 0.45 }),
    e('e5', 'n2', 's1', 0.22, { curved: true, hierarchy: 'secondary', weight: 0.42 }),
    e('e6', 'n2', 's2', 0.2, { curved: true, hierarchy: 'secondary', weight: 0.4 }),
    e('e7', 'n3', 's3', 0.2, { curved: true, hierarchy: 'secondary', weight: 0.4 }),
    e('e8', 'n0', 's4', 0.12, { curved: true, hierarchy: 'ambient', weight: 0.2 }),
    e('e9', 'n4', 's5', 0.12, { curved: true, hierarchy: 'ambient', weight: 0.2 }),
    e('e10', 's0', 's1', 0.1, { curved: true, hierarchy: 'ambient', weight: 0.18 }),
    e('e11', 's6', 'n1', 0.12, { curved: true, hierarchy: 'ambient', weight: 0.18 }),
    e('e12', 's7', 'n4', 0.12, { curved: true, hierarchy: 'ambient', weight: 0.18 }),
  ],
}

export const understandLayoutMobile: SceneLayout = {
  nodes: [
    n('n0', -0.88, 0.36, 0.32, { role: 'primary', label: 'TOKENS', scale: 1.2 }),
    n('n1', 0.0, 0.32, 0.38, {
      role: 'primary',
      label: 'ATTENTION',
      hotspot: true,
      microcopy: 'See which relationships matter.',
      scale: 1.34,
    }),
    n('n2', 0.82, 0.06, 0.34, {
      role: 'primary',
      label: 'REPRESENTATION',
      hotspot: true,
      microcopy: 'Hold meaning in a shared space.',
      scale: 1.28,
    }),
    n('n3', -0.28, -0.32, 0.24, {
      role: 'primary',
      label: 'EXPERIMENT',
      hotspot: true,
      microcopy: 'Test the idea against reality.',
      scale: 1.2,
    }),
    n('n4', 0.78, -0.36, 0.28, { role: 'primary', label: 'OUTPUT', scale: 1.18 }),
    n('s0', -0.98, 0.08, -0.04, { role: 'secondary', opacity: 0.36 }),
    n('s1', -0.52, 0.16, -0.02, { role: 'secondary', opacity: 0.38 }),
    n('s2', 0.3, 0.42, -0.04, { role: 'secondary', opacity: 0.34 }),
    n('s3', 0.46, 0.1, -0.06, { role: 'secondary', opacity: 0.36 }),
    n('s4', 0.95, 0.28, -0.08, { role: 'secondary', opacity: 0.3 }),
    n('s5', -0.52, -0.44, -0.1, { role: 'secondary', opacity: 0.3 }),
    n('s6', 0.4, -0.44, -0.08, { role: 'secondary', opacity: 0.3 }),
    n('s7', 0.12, -0.06, -0.16, { role: 'secondary', opacity: 0.28 }),
  ],
  edges: [
    e('e0', 'n0', 'n1', 0.72, {
      curved: true,
      kind: 'attention',
      hierarchy: 'primary',
      weight: 1,
    }),
    e('e1', 'n1', 'n2', 0.78, {
      curved: true,
      kind: 'attention',
      hierarchy: 'primary',
      weight: 1,
    }),
    e('e2', 'n2', 'n4', 0.6, {
      curved: true,
      kind: 'attention',
      hierarchy: 'primary',
      weight: 0.9,
    }),
    e('e3', 'n1', 'n3', 0.58, {
      curved: true,
      kind: 'attention',
      hierarchy: 'primary',
      weight: 0.85,
    }),
    e('e4', 'n3', 'n4', 0.5, {
      curved: true,
      kind: 'attention',
      hierarchy: 'secondary',
      weight: 0.55,
    }),
    e('e5', 'n0', 's0', 0.14, {
      curved: true,
      kind: 'attention',
      hierarchy: 'ambient',
      weight: 0.2,
    }),
    e('e6', 'n0', 's1', 0.16, {
      curved: true,
      kind: 'attention',
      hierarchy: 'ambient',
      weight: 0.22,
    }),
    e('e7', 'n1', 's2', 0.18, {
      curved: true,
      kind: 'attention',
      hierarchy: 'secondary',
      weight: 0.35,
    }),
    e('e8', 'n2', 's3', 0.16, {
      curved: true,
      kind: 'attention',
      hierarchy: 'secondary',
      weight: 0.32,
    }),
    e('e9', 'n2', 's4', 0.12, {
      curved: true,
      kind: 'attention',
      hierarchy: 'ambient',
      weight: 0.18,
    }),
    e('e10', 'n3', 's5', 0.12, {
      curved: true,
      kind: 'attention',
      hierarchy: 'ambient',
      weight: 0.18,
    }),
    e('e11', 'n4', 's6', 0.12, {
      curved: true,
      kind: 'attention',
      hierarchy: 'ambient',
      weight: 0.18,
    }),
    e('e12', 'n2', 's7', 0.1, {
      curved: true,
      kind: 'attention',
      hierarchy: 'ambient',
      weight: 0.16,
    }),
  ],
}

export function resolvePerformanceCounts(tier: 'high' | 'balanced' | 'reduced') {
  switch (tier) {
    case 'high':
      return { ambient: 58, secondaryVisible: 8, curveSegments: 16, idleStrength: 0.85 }
    case 'balanced':
      return { ambient: 36, secondaryVisible: 6, curveSegments: 12, idleStrength: 0.6 }
    case 'reduced':
      return { ambient: 18, secondaryVisible: 4, curveSegments: 8, idleStrength: 0.3 }
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
