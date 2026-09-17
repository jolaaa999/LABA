<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { eventFormats } from '../../content/events'
import { useMotionPreference } from '../../composables/useMotionPreference'

const props = defineProps<{
  activeId?: string | null
}>()

const emit = defineEmits<{
  focus: [id: string | null]
}>()

const { prefersReducedMotion } = useMotionPreference()
const drawn = ref(false)
const pointerT = ref(0.5)

const nodes = computed(() =>
  eventFormats.map((format, index) => ({
    id: format.id,
    label: format.label.toUpperCase(),
    x: 80 + index * 140,
    y: 72,
  })),
)

onMounted(() => {
  if (prefersReducedMotion.value) {
    drawn.value = true
    return
  }
  requestAnimationFrame(() => {
    drawn.value = true
  })
})

function onMove(event: PointerEvent) {
  const target = event.currentTarget as HTMLElement | null
  if (!target) return
  const rect = target.getBoundingClientRect()
  if (rect.width <= 0) return
  pointerT.value = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
}

function onLeave() {
  pointerT.value = 0.5
  emit('focus', null)
}

const glowX = computed(() => 40 + pointerT.value * 520)
</script>

<template>
  <div
    class="pulse-visual"
    :class="{
      'pulse-visual--drawn': drawn || prefersReducedMotion,
      [`pulse-visual--${activeId}`]: activeId,
    }"
    aria-hidden="true"
    @pointermove="onMove"
    @pointerleave="onLeave"
  >
    <svg class="pulse-visual__svg" viewBox="0 0 600 140" focusable="false">
      <path
        class="pulse-visual__rail"
        d="M24 72 H576"
        fill="none"
        stroke-width="1.5"
      />
      <path
        class="pulse-visual__wave"
        d="M24 72 C80 48 120 96 180 72 S280 40 340 72 S440 110 500 72 S540 50 576 72"
        fill="none"
        stroke-width="1.25"
      />
      <circle
        class="pulse-visual__glow"
        :cx="glowX"
        cy="72"
        r="18"
      />
      <g v-for="node in nodes" :key="node.id">
        <circle
          class="pulse-visual__node"
          :class="{
            'pulse-visual__node--active': activeId === node.id,
          }"
          :cx="node.x"
          :cy="node.y"
          r="5"
          @pointerenter="emit('focus', node.id)"
        />
        <text
          class="pulse-visual__label"
          :class="{ 'pulse-visual__label--active': activeId === node.id }"
          :x="node.x"
          :y="node.y + 28"
          text-anchor="middle"
        >
          {{ node.label }}
        </text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.pulse-visual {
  width: 100%;
  max-width: 36rem;
}

.pulse-visual__svg {
  width: 100%;
  height: auto;
  display: block;
}

.pulse-visual__rail,
.pulse-visual__wave {
  stroke: color-mix(in srgb, var(--color-line) 55%, var(--color-mountain));
  stroke-linecap: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  path-length: 1;
  transition:
    stroke var(--duration-normal) var(--ease-out-soft),
    opacity var(--duration-normal) var(--ease-out-soft);
}

.pulse-visual__wave {
  stroke: color-mix(in srgb, var(--color-sky) 45%, var(--color-line));
  opacity: 0.85;
}

.pulse-visual--drawn .pulse-visual__rail,
.pulse-visual--drawn .pulse-visual__wave {
  stroke-dashoffset: 0;
  transition:
    stroke-dashoffset 900ms var(--ease-out-soft),
    stroke var(--duration-normal) var(--ease-out-soft),
    opacity var(--duration-normal) var(--ease-out-soft);
}

.pulse-visual__glow {
  fill: color-mix(in srgb, var(--color-aurora) 22%, transparent);
  pointer-events: none;
  transition: cx 120ms linear;
}

.pulse-visual__node {
  fill: var(--color-snow);
  stroke: color-mix(in srgb, var(--color-sky) 55%, var(--color-line));
  stroke-width: 1.35;
  transition:
    fill var(--duration-normal) var(--ease-out-soft),
    stroke var(--duration-normal) var(--ease-out-soft),
    filter var(--duration-normal) var(--ease-out-soft);
}

.pulse-visual__node--active {
  fill: color-mix(in srgb, var(--color-aurora) 55%, var(--color-snow));
  stroke: var(--color-sky);
  filter: drop-shadow(0 0 6px color-mix(in srgb, var(--color-aurora) 45%, transparent));
}

.pulse-visual__label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  fill: var(--color-text-muted);
  transition:
    fill var(--duration-normal) var(--ease-out-soft),
    opacity var(--duration-normal) var(--ease-out-soft);
}

.pulse-visual__label--active {
  fill: var(--color-sky);
}

@media (prefers-reduced-motion: reduce) {
  .pulse-visual__rail,
  .pulse-visual__wave {
    stroke-dasharray: none;
    stroke-dashoffset: 0;
    transition: none;
  }

  .pulse-visual__glow {
    transition: none;
  }
}
</style>
