import { useIntersectionObserver, useResizeObserver } from '@vueuse/core'
import { onBeforeUnmount, onMounted, ref, shallowRef, watch, type Ref } from 'vue'

import { buildLayout, understandLayout } from '../lib/intelligence/layouts'
import {
  createIntelligenceScene,
  resolvePerformanceTier,
} from '../lib/intelligence/IntelligenceScene'
import type {
  HotspotInfo,
  IntelligenceMode,
  IntelligenceSceneApi,
} from '../lib/intelligence/types'
import { useMotionPreference } from './useMotionPreference'

function labelsForMode(mode: IntelligenceMode): HotspotInfo[] {
  const source = mode === 'build' ? buildLayout : understandLayout
  return source.nodes
    .filter((n) => n.label)
    .map((n) => ({
      id: n.id,
      label: n.label!,
      microcopy: n.microcopy ?? '',
      mode,
    }))
}

export function useIntelligenceScene(canvasHost: Ref<HTMLElement | null>) {
  const { prefersReducedMotion } = useMotionPreference()
  const mode = ref<IntelligenceMode>('build')
  const useFallback = ref(false)
  const isSectionVisible = ref(false)
  const hasAwakened = ref(false)
  const hotspot = ref<HotspotInfo | null>(null)
  const labelPositions = ref<Record<string, { x: number; y: number }>>({})
  const primaryLabels = ref<HotspotInfo[]>(labelsForMode('build'))
  const sceneApi = shallowRef<IntelligenceSceneApi | null>(null)

  let labelRaf = 0

  function syncLabels() {
    const api = sceneApi.value
    if (!api) return
    const next: Record<string, { x: number; y: number }> = {}
    for (const item of api.getPrimaryLabels(mode.value)) {
      const projected = api.projectNode(item.id)
      if (projected) next[item.id] = projected
    }
    labelPositions.value = next
  }

  function scheduleLabelSync() {
    if (labelRaf) return
    labelRaf = requestAnimationFrame(() => {
      labelRaf = 0
      syncLabels()
      if (isSectionVisible.value && !useFallback.value) scheduleLabelSync()
    })
  }

  function mountScene() {
    const host = canvasHost.value
    if (!host || sceneApi.value || useFallback.value) return

    const api = createIntelligenceScene({
      tier: resolvePerformanceTier(),
      reducedMotion: prefersReducedMotion.value,
      onError() {
        useFallback.value = true
        api.dispose()
        sceneApi.value = null
      },
      onHotspotChange(next) {
        hotspot.value = next
      },
      onReady() {
        scheduleLabelSync()
      },
    })

    sceneApi.value = api
    api.mount(host)
    api.setMode(mode.value)
    api.setVisible(isSectionVisible.value)
    if (hasAwakened.value) api.setAwake(true)
  }

  function setMode(next: IntelligenceMode) {
    mode.value = next
    primaryLabels.value = labelsForMode(next)
    sceneApi.value?.setMode(next)
    hotspot.value = null
    syncLabels()
  }

  function onPointer(event: PointerEvent) {
    const host = canvasHost.value
    const api = sceneApi.value
    if (!host || !api || prefersReducedMotion.value) return
    const rect = host.getBoundingClientRect()
    if (rect.width < 1 || rect.height < 1) return
    const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1
    const ny = -(((event.clientY - rect.top) / rect.height) * 2 - 1)
    api.setPointer(nx, ny)
  }

  function onPointerLeave() {
    sceneApi.value?.setPointer(0, 0)
    hotspot.value = null
  }

  useIntersectionObserver(
    canvasHost,
    ([entry]) => {
      const visible = !!entry?.isIntersecting
      isSectionVisible.value = visible
      sceneApi.value?.setVisible(visible)
      if (visible && !hasAwakened.value) {
        hasAwakened.value = true
        sceneApi.value?.setAwake(true)
      }
      if (visible) scheduleLabelSync()
    },
    { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
  )

  useResizeObserver(canvasHost, (entries) => {
    const entry = entries[0]
    if (!entry || !sceneApi.value) return
    const { width, height } = entry.contentRect
    sceneApi.value.resize(width, height)
    syncLabels()
  })

  watch(prefersReducedMotion, (reduced) => {
    sceneApi.value?.setReducedMotion(reduced)
  })

  onMounted(() => {
    mountScene()
  })

  onBeforeUnmount(() => {
    if (labelRaf) cancelAnimationFrame(labelRaf)
    sceneApi.value?.dispose()
    sceneApi.value = null
  })

  return {
    mode,
    setMode,
    useFallback,
    isSectionVisible,
    hasAwakened,
    hotspot,
    labelPositions,
    primaryLabels,
    onPointer,
    onPointerLeave,
  }
}
