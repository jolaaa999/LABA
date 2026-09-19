<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { useIntelligenceScene } from '../../../composables/useIntelligenceScene'
import type { IntelligenceMode } from '../../../lib/intelligence/types'
import IntelligenceFallback from './IntelligenceFallback.vue'

const props = defineProps<{ mode: IntelligenceMode }>()
const emit = defineEmits<{
  'update:hotspotLabel': [string | null]
  'update:hotspotCopy': [string | null]
}>()

const host = ref<HTMLElement | null>(null)
const {
  useFallback,
  hotspot,
  labelPositions,
  onPointer,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerLeave,
  setMode,
} = useIntelligenceScene(host)

const selected = computed(() => hotspot.value)

watch(() => props.mode, (next) => setMode(next), { immediate: true })
watch(hotspot, (next) => {
  emit('update:hotspotLabel', next?.label ?? null)
  emit('update:hotspotCopy', next?.microcopy ?? null)
}, { immediate: true })
</script>

<template>
  <div
    class="intel-canvas"
    @pointermove="onPointer"
    @pointerdown="onPointerDown"
    @pointermove.capture="onPointerMove"
    @pointerup="onPointerUp"
    @pointerleave="onPointerLeave"
  >
    <div ref="host" class="intel-canvas__host" />
    <IntelligenceFallback v-if="useFallback" :mode="mode" />

    <div v-else class="intel-canvas__labels" aria-hidden="true">
      <span
        v-if="selected && labelPositions[selected.id]"
        class="intel-canvas__label intel-canvas__label--selected"
        :style="{
          transform: `translate(-50%, -145%) translate(${labelPositions[selected.id]!.x}px, ${labelPositions[selected.id]!.y}px)`,
        }"
      >{{ selected.label }}</span>
    </div>

    <p v-if="!selected" class="intel-canvas__hint">拖动旋转星图 · 点击星点查看知识节点</p>
  </div>
</template>

<style scoped>
.intel-canvas {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 24rem;
  isolation: isolate;
  overflow: hidden;
  cursor: grab;
  background: radial-gradient(ellipse at 50% 50%, #123a43 0%, #08232c 43%, #05151d 100%);
  box-shadow: inset 0 0 5rem rgba(0, 0, 0, .42);
  mask-image: radial-gradient(ellipse at center, #000 48%, rgba(0, 0, 0, .86) 72%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse at center, #000 48%, rgba(0, 0, 0, .86) 72%, transparent 100%);
}

.intel-canvas:active { cursor: grabbing; }
.intel-canvas__host { position: absolute; inset: 0; }
.intel-canvas__host :deep(canvas) { width: 100% !important; height: 100% !important; }
.intel-canvas__labels { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.intel-canvas__label { position: absolute; top: 0; left: 0; color: #c8fff0; font-family: var(--font-mono); font-size: .72rem; font-weight: 700; letter-spacing: .13em; text-shadow: 0 0 12px #31d5ad; white-space: nowrap; }
.intel-canvas__label--selected { color: #f0fff9; font-size: .9rem; text-shadow: 0 0 8px #47e6ba, 0 0 24px #20b58e; animation: selected-label-in .32s ease-out both; }
.intel-canvas__hint { position: absolute; left: 50%; bottom: 1rem; transform: translateX(-50%); margin: 0; color: rgba(201, 255, 240, .62); font-family: var(--font-mono); font-size: .64rem; letter-spacing: .08em; white-space: nowrap; pointer-events: none; }

@keyframes selected-label-in { from { opacity: 0; } to { opacity: 1; } }

@media (max-width: 720px) {
  .intel-canvas { min-height: 20rem; }
  .intel-canvas__hint { font-size: .56rem; }
  .intel-canvas__label--selected { font-size: .82rem; }
}
</style>
