<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { researchLoop } from '../../content/explore-research'
import { useMotionPreference } from '../../composables/useMotionPreference'

const { prefersReducedMotion } = useMotionPreference()
const revealed = ref(false)
const focusId = ref<string | null>(null)

onMounted(() => {
  if (prefersReducedMotion.value) {
    revealed.value = true
    return
  }
  const el = document.getElementById('research-loop')
  if (!el || typeof IntersectionObserver === 'undefined') {
    revealed.value = true
    return
  }
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        revealed.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.2 },
  )
  observer.observe(el)
})
</script>

<template>
  <section
    id="research-loop"
    class="research-loop"
    :class="{ 'research-loop--revealed': revealed || prefersReducedMotion }"
    aria-labelledby="research-loop-title"
  >
    <header class="research-loop__header">
      <p class="research-loop__eyebrow">{{ researchLoop.eyebrow }}</p>
      <h2 id="research-loop-title" class="research-loop__title">
        {{ researchLoop.title }}
      </h2>
      <p class="research-loop__lede">{{ researchLoop.lede }}</p>
    </header>

    <ol class="research-loop__list">
      <li
        v-for="(step, index) in researchLoop.steps"
        :key="step.id"
        class="research-loop__item"
        :class="{ 'research-loop__item--focus': focusId === step.id }"
        @mouseenter="focusId = step.id"
        @mouseleave="focusId = null"
        @focusin="focusId = step.id"
        @focusout="focusId = null"
      >
        <p class="research-loop__meta">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <span aria-hidden="true">↓</span>
        </p>
        <h3 class="research-loop__label">{{ step.label }}</h3>
        <p class="research-loop__statement">{{ step.statement }}</p>
      </li>
    </ol>
    <p class="research-loop__return" aria-hidden="true">↺ New Question</p>
  </section>
</template>

<style scoped>
.research-loop {
  display: grid;
  gap: var(--space-8);
}

.research-loop__eyebrow {
  margin: 0 0 var(--space-3);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.research-loop__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(var(--text-2xl), 3vw, var(--text-3xl));
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
}

.research-loop__lede {
  margin: var(--space-4) 0 0;
  max-width: 38rem;
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

.research-loop__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0;
  opacity: 0.35;
  transform: translateY(0.5rem);
  transition:
    opacity 500ms var(--ease-out-soft),
    transform 500ms var(--ease-out-soft);
}

.research-loop--revealed .research-loop__list {
  opacity: 1;
  transform: none;
}

.research-loop__item {
  display: grid;
  grid-template-columns: 4.5rem minmax(0, 12rem) minmax(0, 1fr);
  gap: var(--space-4);
  align-items: baseline;
  padding-block: var(--space-4);
  border-top: 1px solid color-mix(in srgb, var(--color-line) 50%, transparent);
  transition: opacity 200ms var(--ease-out-soft);
}

.research-loop:has(.research-loop__item--focus)
  .research-loop__item:not(.research-loop__item--focus) {
  opacity: 0.55;
}

.research-loop__meta {
  margin: 0;
  display: inline-flex;
  gap: var(--space-2);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  color: var(--color-sky);
}

.research-loop__label {
  margin: 0;
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-text);
}

.research-loop__statement {
  margin: 0;
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

.research-loop__return {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

@media (max-width: 720px) {
  .research-loop__item {
    grid-template-columns: 1fr;
    gap: var(--space-2);
  }
}

@media (prefers-reduced-motion: reduce) {
  .research-loop__list {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .research-loop__item {
    transition: none;
  }
}
</style>
