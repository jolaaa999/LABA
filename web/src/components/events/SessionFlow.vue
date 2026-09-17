<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { sessionFlow } from '../../content/events'
import { useMotionPreference } from '../../composables/useMotionPreference'

const { prefersReducedMotion } = useMotionPreference()
const revealed = ref(false)

onMounted(() => {
  if (prefersReducedMotion.value) {
    revealed.value = true
    return
  }
  const el = document.getElementById('session-flow')
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
    id="session-flow"
    class="session-flow"
    :class="{ 'session-flow--revealed': revealed || prefersReducedMotion }"
    aria-labelledby="session-flow-title"
  >
    <header class="session-flow__header">
      <p class="session-flow__eyebrow">{{ sessionFlow.eyebrow }}</p>
      <h2 id="session-flow-title" class="session-flow__title">
        {{ sessionFlow.title }}
      </h2>
    </header>

    <ol class="session-flow__steps">
      <li
        v-for="(step, index) in sessionFlow.steps"
        :key="step.id"
        class="session-flow__step"
      >
        <p class="session-flow__meta">
          <span>{{ step.index }}</span>
          <span v-if="index < sessionFlow.steps.length - 1" aria-hidden="true">→</span>
        </p>
        <h3 class="session-flow__label">{{ step.label }}</h3>
        <p class="session-flow__statement">{{ step.statement }}</p>
      </li>
    </ol>

    <div class="session-flow__rail" aria-hidden="true">
      <svg class="session-flow__svg" viewBox="0 0 720 48" focusable="false">
        <path
          class="session-flow__line"
          d="M20 24 H700"
          fill="none"
          stroke-width="1.5"
        />
        <circle
          v-for="i in 5"
          :key="i"
          class="session-flow__node"
          :cx="40 + (i - 1) * 160"
          cy="24"
          r="4"
        />
      </svg>
    </div>

    <p class="session-flow__closing">{{ sessionFlow.closing }}</p>
    <p class="session-flow__closing-detail">{{ sessionFlow.closingDetail }}</p>
  </section>
</template>

<style scoped>
.session-flow {
  display: grid;
  gap: var(--space-8);
}

.session-flow__eyebrow {
  margin: 0 0 var(--space-3);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.session-flow__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(var(--text-2xl), 3vw, var(--text-3xl));
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
}

.session-flow__steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: var(--space-4);
}

.session-flow__step {
  display: grid;
  gap: var(--space-3);
  padding-top: var(--space-4);
  border-top: 1px solid color-mix(in srgb, var(--color-line) 55%, transparent);
}

.session-flow__meta {
  margin: 0;
  display: inline-flex;
  gap: var(--space-2);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  color: var(--color-sky);
}

.session-flow__label {
  margin: 0;
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-text);
}

.session-flow__statement {
  margin: 0;
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
}

.session-flow__rail {
  margin-top: var(--space-2);
}

.session-flow__svg {
  width: 100%;
  height: auto;
  display: block;
  max-width: 40rem;
}

.session-flow__line {
  stroke: color-mix(in srgb, var(--color-sky) 45%, var(--color-line));
  stroke-linecap: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  path-length: 1;
}

.session-flow__node {
  fill: var(--color-snow);
  stroke: var(--color-sky);
  stroke-width: 1.25;
  opacity: 0.35;
}

.session-flow--revealed .session-flow__line {
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 800ms var(--ease-out-soft);
}

.session-flow--revealed .session-flow__node {
  opacity: 1;
  transition: opacity 500ms var(--ease-out-soft);
}

.session-flow__closing {
  margin: var(--space-2) 0 0;
  font-family: var(--font-display);
  font-size: clamp(var(--text-xl), 2.2vw, var(--text-2xl));
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
}

.session-flow__closing-detail {
  margin: var(--space-3) 0 0;
  max-width: 36rem;
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

@media (max-width: 1024px) {
  .session-flow__steps {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .session-flow__rail {
    display: none;
  }
}

@media (max-width: 720px) {
  .session-flow__steps {
    grid-template-columns: 1fr;
  }

  .session-flow__meta span:last-child {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .session-flow__line {
    stroke-dasharray: none;
    stroke-dashoffset: 0;
    transition: none;
  }

  .session-flow__node {
    opacity: 1;
    transition: none;
  }
}
</style>
