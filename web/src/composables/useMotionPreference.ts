import { usePreferredReducedMotion } from '@vueuse/core'
import { computed } from 'vue'

/**
 * Centralized motion preference for Aurora Design System.
 * Prefer this over ad-hoc matchMedia in components.
 */
export function useMotionPreference() {
  const preferredMotion = usePreferredReducedMotion()

  const prefersReducedMotion = computed(() => preferredMotion.value === 'reduce')
  const motionEnabled = computed(() => !prefersReducedMotion.value)

  return {
    prefersReducedMotion,
    motionEnabled,
  }
}
