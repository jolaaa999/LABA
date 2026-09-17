<script setup lang="ts">
import { ref, watch } from 'vue'

import { useIntelligenceScene } from '../../../composables/useIntelligenceScene'
import type { IntelligenceMode } from '../../../lib/intelligence/types'
import IntelligenceFallback from './IntelligenceFallback.vue'

const props = defineProps<{
  mode: IntelligenceMode
}>()

const emit = defineEmits<{
  'update:hotspotLabel': [string | null]
  'update:hotspotCopy': [string | null]
}>()

const host = ref<HTMLElement | null>(null)
const {
  useFallback,
  hotspot,
  labelPositions,
  primaryLabels,
  onPointer,
  onPointerLeave,
  setMode,
} = useIntelligenceScene(host)

watch(
  () => props.mode,
  (next) => setMode(next),
  { immediate: true },
)

watch(
  hotspot,
  (next) => {
    emit('update:hotspotLabel', next?.label ?? null)
    emit('update:hotspotCopy', next?.microcopy ?? null)
  },
  { immediate: true },
)
</script>

<template>
  <div
    class="intel-canvas"
    @pointermove="onPointer"
    @pointerleave="onPointerLeave"
  >
    <div ref="host" class="intel-canvas__host" />

    <IntelligenceFallback v-if="useFallback" :mode="mode" />

    <div v-else class="intel-canvas__labels" aria-hidden="true">
      <span
        v-for="item in primaryLabels"
        :key="item.id"
        class="intel-canvas__label"
        :class="{
          'intel-canvas__label--hot': hotspot?.id === item.id,
          'intel-canvas__label--secondary': !item.microcopy,
        }"
        :style="
          labelPositions[item.id]
            ? {
                transform: `translate(-50%, -140%) translate(${labelPositions[item.id]!.x}px, ${labelPositions[item.id]!.y}px)`,
                opacity: 0.5 + (hotspot?.id === item.id ? 0.4 : 0),
              }
            : { opacity: 0 }
        "
      >
        {{ item.label }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.intel-canvas {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 20rem;
  isolation: isolate;
}

.intel-canvas__host {
  position: absolute;
  inset: 0;
}

.intel-canvas__host :deep(canvas) {
  width: 100% !important;
  height: 100% !important;
}

.intel-canvas__labels {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.intel-canvas__label {
  position: absolute;
  top: 0;
  left: 0;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-text-muted) 88%, var(--color-stream));
  white-space: nowrap;
  transition: opacity var(--duration-fast) var(--ease-out-soft), color var(--duration-fast) var(--ease-out-soft);
  will-change: transform, opacity;
}

.intel-canvas__label--hot {
  color: var(--color-mountain);
}

.intel-canvas__label--secondary {
  opacity: 0.45;
}

@media (max-width: 720px) {
  .intel-canvas {
    min-height: 16.5rem;
  }

  .intel-canvas__label {
    font-size: 0.6rem;
    letter-spacing: 0.1em;
  }
}

@media (prefers-reduced-motion: reduce) {
  .intel-canvas__label {
    transition: none;
  }
}
</style>
