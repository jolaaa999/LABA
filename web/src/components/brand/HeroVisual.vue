<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { useMotionPreference } from '../../composables/useMotionPreference'

type NodeTier = 'primary' | 'secondary' | 'micro'

type NodeDef = {
  id: string
  x: number
  y: number
  r: number
  tier: NodeTier
}

type EdgeTier = 'primary' | 'secondary' | 'ambient'

type EdgeDef = {
  from: string
  to: string
  tier: EdgeTier
}

type CurveDef = {
  d: string
  tier: 'primary' | 'ambient'
}

/** Sparse intelligence field — weighted nodes, not a textbook grid. */
const nodes: NodeDef[] = [
  { id: 'n1', x: 18, y: 28, r: 2.6, tier: 'secondary' },
  { id: 'n2', x: 31, y: 16, r: 1.4, tier: 'micro' },
  { id: 'n3', x: 44, y: 32, r: 4.4, tier: 'primary' },
  { id: 'n4', x: 58, y: 20, r: 2.4, tier: 'secondary' },
  { id: 'n5', x: 71, y: 28, r: 2.8, tier: 'secondary' },
  { id: 'n6', x: 86, y: 16, r: 1.2, tier: 'micro' },
  { id: 'n7', x: 22, y: 50, r: 2.2, tier: 'secondary' },
  { id: 'n8', x: 38, y: 56, r: 4.0, tier: 'primary' },
  { id: 'n9', x: 54, y: 46, r: 1.5, tier: 'micro' },
  { id: 'n10', x: 67, y: 54, r: 2.6, tier: 'secondary' },
  { id: 'n11', x: 82, y: 44, r: 1.3, tier: 'micro' },
  { id: 'n12', x: 27, y: 74, r: 1.4, tier: 'micro' },
  { id: 'n13', x: 48, y: 70, r: 2.5, tier: 'secondary' },
  { id: 'n14', x: 63, y: 78, r: 1.1, tier: 'micro' },
  { id: 'n15', x: 78, y: 66, r: 4.2, tier: 'primary' },
  { id: 'n16', x: 12, y: 42, r: 1.3, tier: 'micro' },
  { id: 'n17', x: 92, y: 58, r: 1.2, tier: 'micro' },
  { id: 'n18', x: 50, y: 12, r: 1.1, tier: 'micro' },
]

const edges: EdgeDef[] = [
  { from: 'n3', to: 'n8', tier: 'primary' },
  { from: 'n8', to: 'n15', tier: 'primary' },
  { from: 'n3', to: 'n15', tier: 'primary' },
  { from: 'n1', to: 'n3', tier: 'secondary' },
  { from: 'n3', to: 'n4', tier: 'secondary' },
  { from: 'n4', to: 'n5', tier: 'secondary' },
  { from: 'n5', to: 'n10', tier: 'secondary' },
  { from: 'n7', to: 'n8', tier: 'secondary' },
  { from: 'n8', to: 'n13', tier: 'secondary' },
  { from: 'n10', to: 'n15', tier: 'secondary' },
  { from: 'n13', to: 'n15', tier: 'secondary' },
  { from: 'n1', to: 'n2', tier: 'ambient' },
  { from: 'n1', to: 'n7', tier: 'ambient' },
  { from: 'n2', to: 'n18', tier: 'ambient' },
  { from: 'n5', to: 'n6', tier: 'ambient' },
  { from: 'n7', to: 'n16', tier: 'ambient' },
  { from: 'n8', to: 'n9', tier: 'ambient' },
  { from: 'n9', to: 'n10', tier: 'ambient' },
  { from: 'n10', to: 'n11', tier: 'ambient' },
  { from: 'n12', to: 'n13', tier: 'ambient' },
  { from: 'n13', to: 'n14', tier: 'ambient' },
  { from: 'n15', to: 'n17', tier: 'ambient' },
]

/** Soft arcs — attention / flow suggestion, not a dense web. */
const curves: CurveDef[] = [
  { d: 'M 44 32 C 52 18, 70 18, 78 66', tier: 'primary' },
  { d: 'M 18 28 C 8 48, 20 68, 38 56', tier: 'ambient' },
  { d: 'M 38 56 C 58 62, 72 48, 78 66', tier: 'ambient' },
  { d: 'M 44 32 C 62 38, 70 48, 67 54', tier: 'primary' },
]

const nodeMap = Object.fromEntries(nodes.map((node) => [node.id, node]))

const root = ref<HTMLElement | null>(null)
const pointer = ref({ x: 62, y: 42 })
const { prefersReducedMotion } = useMotionPreference()

const nearPrimaryIds = computed(() => {
  if (prefersReducedMotion.value) return new Set<string>()
  const threshold = 18
  return new Set(
    nodes
      .filter((node) => node.tier === 'primary')
      .filter((node) => {
        const dx = node.x - pointer.value.x
        const dy = node.y - pointer.value.y
        return Math.hypot(dx, dy) < threshold
      })
      .map((node) => node.id),
  )
})

function setPointer(xPercent: number, yPercent: number): void {
  if (!root.value) return
  pointer.value = { x: xPercent, y: yPercent }
  root.value.style.setProperty('--pointer-x', `${xPercent}%`)
  root.value.style.setProperty('--pointer-y', `${yPercent}%`)
}

function onPointerMove(event: PointerEvent): void {
  if (prefersReducedMotion.value || !root.value) return
  const rect = root.value.getBoundingClientRect()
  if (rect.width === 0 || rect.height === 0) return
  const x = ((event.clientX - rect.left) / rect.width) * 100
  const y = ((event.clientY - rect.top) / rect.height) * 100
  setPointer(x, y)
}

function onPointerLeave(): void {
  if (prefersReducedMotion.value) return
  setPointer(62, 42)
}

onMounted(() => {
  setPointer(62, 42)
})
</script>

<template>
  <div
    ref="root"
    class="hero-visual"
    :class="{ 'hero-visual--static': prefersReducedMotion }"
    aria-hidden="true"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <div class="hero-visual__glow" />
    <svg
      class="hero-visual__svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      role="presentation"
      focusable="false"
    >
      <defs>
        <linearGradient id="hero-edge-flow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="var(--color-stream)" stop-opacity="0.15" />
          <stop offset="50%" stop-color="var(--color-sky)" stop-opacity="0.38" />
          <stop offset="100%" stop-color="var(--color-mountain)" stop-opacity="0.18" />
        </linearGradient>
        <radialGradient id="hero-node-primary" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="var(--color-aurora)" stop-opacity="0.88" />
          <stop offset="100%" stop-color="var(--color-sky)" stop-opacity="0.5" />
        </radialGradient>
        <radialGradient id="hero-node-secondary" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="var(--color-stream)" stop-opacity="0.7" />
          <stop offset="100%" stop-color="var(--color-glacier)" stop-opacity="0.28" />
        </radialGradient>
      </defs>

      <g class="hero-visual__curves">
        <path
          v-for="(curve, index) in curves"
          :key="`c-${index}`"
          :d="curve.d"
          class="hero-visual__curve"
          :class="`hero-visual__curve--${curve.tier}`"
          fill="none"
        />
      </g>

      <g class="hero-visual__edges">
        <line
          v-for="(edge, index) in edges"
          :key="`e-${index}`"
          :x1="nodeMap[edge.from].x"
          :y1="nodeMap[edge.from].y"
          :x2="nodeMap[edge.to].x"
          :y2="nodeMap[edge.to].y"
          class="hero-visual__edge"
          :class="`hero-visual__edge--${edge.tier}`"
        />
      </g>

      <g class="hero-visual__nodes">
        <circle
          v-for="node in nodes"
          :key="node.id"
          :cx="node.x"
          :cy="node.y"
          :r="node.r"
          class="hero-visual__node"
          :class="[
            `hero-visual__node--${node.tier}`,
            { 'hero-visual__node--near': nearPrimaryIds.has(node.id) },
          ]"
        />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.hero-visual {
  --pointer-x: 62%;
  --pointer-y: 42%;
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  max-width: 32rem;
  margin-inline: auto;
  isolation: isolate;
}

.hero-visual__glow {
  position: absolute;
  inset: 14% 16%;
  border-radius: 50%;
  background: radial-gradient(
    circle at var(--pointer-x) var(--pointer-y),
    color-mix(in srgb, var(--color-stream) 24%, transparent) 0%,
    color-mix(in srgb, var(--color-glacier) 16%, transparent) 46%,
    transparent 76%
  );
  opacity: 0.78;
  transform: translate3d(
    calc((var(--pointer-x) - 50%) * 0.03),
    calc((var(--pointer-y) - 50%) * 0.03),
    0
  );
  transition:
    opacity var(--duration-normal) var(--ease-out-soft),
    transform var(--duration-normal) var(--ease-out-soft);
  pointer-events: none;
  z-index: 0;
}

.hero-visual__svg {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: block;
  overflow: visible;
}

.hero-visual__curve {
  fill: none;
  stroke-linecap: round;
  pointer-events: none;
}

.hero-visual__curve--primary {
  stroke: url(#hero-edge-flow);
  stroke-width: 0.55;
  opacity: 0.42;
}

.hero-visual__curve--ambient {
  stroke: color-mix(in srgb, var(--color-mountain) 12%, var(--color-mist));
  stroke-width: 0.28;
  opacity: 0.28;
}

.hero-visual__edge {
  stroke-linecap: round;
  transition: opacity var(--duration-normal) var(--ease-out-soft);
}

.hero-visual__edge--primary {
  stroke: color-mix(in srgb, var(--color-sky) 42%, var(--color-mist));
  stroke-width: 0.55;
  opacity: 0.55;
}

.hero-visual__edge--secondary {
  stroke: color-mix(in srgb, var(--color-mountain) 22%, var(--color-mist));
  stroke-width: 0.34;
  opacity: 0.36;
}

.hero-visual__edge--ambient {
  stroke: color-mix(in srgb, var(--color-mountain) 10%, var(--color-mist));
  stroke-width: 0.22;
  opacity: 0.22;
}

.hero-visual:hover .hero-visual__edge--primary {
  opacity: 0.72;
}

.hero-visual__node {
  transition:
    opacity var(--duration-fast) var(--ease-out-soft),
    stroke var(--duration-fast) var(--ease-out-soft),
    stroke-width var(--duration-fast) var(--ease-out-soft);
  transform-box: fill-box;
  transform-origin: center;
}

.hero-visual__node--primary {
  fill: url(#hero-node-primary);
  stroke: color-mix(in srgb, var(--color-sky) 40%, transparent);
  stroke-width: 0.28;
  opacity: 0.92;
}

.hero-visual__node--secondary {
  fill: url(#hero-node-secondary);
  stroke: color-mix(in srgb, var(--color-stream) 28%, transparent);
  stroke-width: 0.2;
  opacity: 0.72;
}

.hero-visual__node--micro {
  fill: color-mix(in srgb, var(--color-glacier) 70%, var(--color-mist));
  stroke: none;
  opacity: 0.45;
}

.hero-visual__node--near {
  opacity: 1;
  stroke: color-mix(in srgb, var(--color-aurora) 55%, transparent);
  stroke-width: 0.4;
}

.hero-visual--static .hero-visual__glow {
  transition: none;
  transform: none;
}

.hero-visual--static .hero-visual__node--near {
  opacity: 0.92;
  stroke: color-mix(in srgb, var(--color-sky) 40%, transparent);
  stroke-width: 0.28;
}
</style>
