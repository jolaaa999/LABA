import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * Minimal UI store for Phase 1 Pinia wiring.
 * Nav / toast / motion preference will be expanded in later phases.
 */
export const useUiStore = defineStore('ui', () => {
  const isReady = ref(true)

  return {
    isReady,
  }
})
