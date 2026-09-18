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
  useFallback, hotspot, labelPositions, primaryLabels, onPointer, onPointerDown,
  onPointerMove, onPointerUp, onPointerLeave, clearSelection, setMode,
} = useIntelligenceScene(host)

const selected = computed(() => hotspot.value)
watch(() => props.mode, (next) => setMode(next), { immediate: true })
watch(hotspot, (next) => {
  emit('update:hotspotLabel', next?.label ?? null)
  emit('update:hotspotCopy', next?.microcopy ?? null)
}, { immediate: true })
</script>

<template>
  <div class="intel-canvas" @pointermove="onPointer" @pointerdown="onPointerDown" @pointermove.capture="onPointerMove" @pointerup="onPointerUp" @pointerleave="onPointerLeave">
    <div ref="host" class="intel-canvas__host" />
    <IntelligenceFallback v-if="useFallback" :mode="mode" />

    <div v-else class="intel-canvas__labels" aria-hidden="true">
      <span v-for="item in primaryLabels" :key="item.id" class="intel-canvas__core" :style="labelPositions[item.id] ? { transform: `translate(-50%, -170%) translate(${labelPositions[item.id]!.x}px, ${labelPositions[item.id]!.y}px)` } : { opacity: 0 }">{{ item.label }}</span>
    </div>

    <div v-if="selected" class="intel-canvas__detail" role="status">
      <button class="intel-canvas__close" type="button" aria-label="返回完整星图" @click="clearSelection">×</button>
      <p>知识节点</p><strong>{{ selected.label }}</strong><span>{{ selected.microcopy }}</span>
    </div>
    <p v-else class="intel-canvas__hint">拖动旋转星图 · 点击星点查看知识节点</p>
  </div>
</template>

<style scoped>
.intel-canvas { position: relative; width: 100%; height: 100%; min-height: 24rem; isolation: isolate; cursor: grab; overflow: hidden; background: radial-gradient(ellipse at 50% 50%, #123a43 0%, #08232c 43%, #05151d 100%); box-shadow: inset 0 0 5rem rgba(0, 0, 0, .42); }
.intel-canvas:active { cursor: grabbing; }
.intel-canvas__host { position: absolute; inset: 0; }
.intel-canvas__host :deep(canvas) { width: 100% !important; height: 100% !important; }
.intel-canvas__labels { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.intel-canvas__core { position: absolute; top: 0; left: 0; color: #c8fff0; font-family: var(--font-mono); font-size: .72rem; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; text-shadow: 0 0 12px #31d5ad; transition: opacity .25s ease; }
.intel-canvas__hint { position: absolute; left: 50%; bottom: 1rem; transform: translateX(-50%); margin: 0; color: rgba(201, 255, 240, .62); font-family: var(--font-mono); font-size: .64rem; letter-spacing: .08em; white-space: nowrap; pointer-events: none; }
.intel-canvas__detail { position: absolute; right: 1.25rem; top: 1.25rem; width: min(18rem, calc(100% - 2.5rem)); padding: 1rem 2.6rem 1rem 1rem; border: 1px solid color-mix(in srgb, var(--color-aurora) 45%, transparent); background: color-mix(in srgb, var(--color-snow) 80%, transparent); box-shadow: 0 10px 35px color-mix(in srgb, var(--color-mountain) 12%, transparent); backdrop-filter: blur(12px); }
.intel-canvas__detail p { margin: 0 0 .4rem; color: var(--color-mountain); font-family: var(--font-mono); font-size: .62rem; letter-spacing: .12em; text-transform: uppercase; }
.intel-canvas__detail strong { display: block; color: var(--color-text); font-family: var(--font-display); font-size: 1.25rem; }
.intel-canvas__detail span { display: block; margin-top: .45rem; color: var(--color-text-secondary); font-size: .82rem; line-height: 1.55; }
.intel-canvas__close { position: absolute; top: .5rem; right: .65rem; padding: .2rem; border: 0; background: transparent; color: var(--color-text-muted); font-size: 1.4rem; cursor: pointer; }
@media (max-width: 720px) { .intel-canvas { min-height: 20rem; } .intel-canvas__detail { top: .75rem; right: .75rem; } .intel-canvas__hint { font-size: .56rem; } }
</style>
