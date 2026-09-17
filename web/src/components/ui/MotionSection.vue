<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import { ref, watchEffect } from 'vue'

import { useMotionPreference } from '../../composables/useMotionPreference'

withDefaults(
  defineProps<{
    as?: 'section' | 'div' | 'article'
    offsetY?: '12' | '16' | '20'
  }>(),
  {
    as: 'section',
    offsetY: '16',
  },
)

const root = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const { prefersReducedMotion } = useMotionPreference()

watchEffect(() => {
  if (prefersReducedMotion.value) {
    isVisible.value = true
  }
})

useIntersectionObserver(
  root,
  ([entry]) => {
    if (prefersReducedMotion.value) {
      isVisible.value = true
      return
    }
    if (entry?.isIntersecting) {
      isVisible.value = true
    }
  },
  {
    threshold: 0.15,
    rootMargin: '0px 0px -8% 0px',
  },
)
</script>

<template>
  <component
    :is="as"
    ref="root"
    class="motion-section"
    :class="{
      'motion-section--visible': isVisible,
      [`motion-section--y-${offsetY}`]: true,
    }"
  >
    <slot />
  </component>
</template>

<style scoped>
.motion-section {
  opacity: 0;
  transform: translateY(var(--motion-offset, 16px));
  transition:
    opacity var(--duration-slow) var(--ease-out-soft),
    transform var(--duration-slow) var(--ease-out-soft);
  will-change: opacity, transform;
}

.motion-section--y-12 {
  --motion-offset: 12px;
}

.motion-section--y-16 {
  --motion-offset: 16px;
}

.motion-section--y-20 {
  --motion-offset: 20px;
}

.motion-section--visible {
  opacity: 1;
  transform: translateY(0);
  will-change: auto;
}

@media (prefers-reduced-motion: reduce) {
  .motion-section {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
