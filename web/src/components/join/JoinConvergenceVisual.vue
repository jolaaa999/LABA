<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { useMotionPreference } from '../../composables/useMotionPreference'

const { prefersReducedMotion } = useMotionPreference()
const drawn = ref(false)

onMounted(() => {
  if (prefersReducedMotion.value) {
    drawn.value = true
    return
  }
  requestAnimationFrame(() => {
    drawn.value = true
  })
})
</script>

<template>
  <div
    class="convergence"
    :class="{ 'convergence--drawn': drawn || prefersReducedMotion }"
    aria-hidden="true"
  >
    <svg class="convergence__svg" viewBox="0 0 520 280" focusable="false">
      <path
        class="convergence__line convergence__line--you"
        d="M40 140 H170"
        fill="none"
        stroke-width="1.5"
        pathLength="1"
      />
      <path
        class="convergence__line convergence__line--practice"
        d="M250 140 H400"
        fill="none"
        stroke-width="1.5"
        pathLength="1"
      />
      <path
        class="convergence__line convergence__line--build"
        d="M200 48 L210 120"
        fill="none"
        stroke-width="1.4"
        pathLength="1"
      />
      <path
        class="convergence__line convergence__line--research"
        d="M200 232 C190 190 200 160 210 140"
        fill="none"
        stroke-width="1.4"
        pathLength="1"
      />
      <path
        class="convergence__line convergence__line--hybrid"
        d="M210 118 C248 98 248 182 210 162"
        fill="none"
        stroke-width="1.2"
        pathLength="1"
      />

      <circle class="convergence__node convergence__node--you" cx="40" cy="140" r="5" />
      <circle class="convergence__node convergence__node--entry" cx="210" cy="140" r="18" />
      <circle class="convergence__node convergence__node--entry-dot" cx="210" cy="140" r="4" />
      <circle class="convergence__node convergence__node--practice" cx="400" cy="140" r="6" />

      <text class="convergence__label" x="40" y="124">YOU</text>
      <text class="convergence__label convergence__label--entry" x="210" y="126" text-anchor="middle">
        ENTRY
      </text>
      <text class="convergence__label" x="400" y="124" text-anchor="middle">PRACTICE</text>
      <text class="convergence__label convergence__label--build" x="200" y="36" text-anchor="middle">
        BUILD
      </text>
      <text
        class="convergence__label convergence__label--research"
        x="200"
        y="256"
        text-anchor="middle"
      >
        RESEARCH
      </text>
      <text class="convergence__label convergence__label--hybrid" x="268" y="148">HYBRID ↺</text>
    </svg>
  </div>
</template>

<style scoped>
.convergence {
  width: 100%;
  max-width: 28rem;
}

.convergence__svg {
  width: 100%;
  height: auto;
  display: block;
}

.convergence__line {
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke var(--duration-slow) var(--ease-out-soft);
}

.convergence__line--you,
.convergence__line--practice {
  stroke: color-mix(in srgb, var(--color-sky) 50%, var(--color-mountain));
}

.convergence__line--build {
  stroke: color-mix(in srgb, var(--color-sky) 60%, var(--color-line));
}

.convergence__line--research {
  stroke: color-mix(in srgb, var(--color-aurora) 45%, var(--color-mountain));
}

.convergence__line--hybrid {
  stroke: color-mix(in srgb, var(--color-mountain) 40%, var(--color-line));
  opacity: 0.85;
}

.convergence--drawn .convergence__line {
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 1000ms var(--ease-out-soft);
}

.convergence__node--you,
.convergence__node--practice {
  fill: color-mix(in srgb, var(--color-sky) 55%, var(--color-mountain));
}

.convergence__node--entry {
  fill: color-mix(in srgb, var(--color-frost) 60%, var(--color-snow));
  stroke: color-mix(in srgb, var(--color-sky) 50%, var(--color-line));
  stroke-width: 1.25;
}

.convergence__node--entry-dot {
  fill: color-mix(in srgb, var(--color-aurora) 55%, var(--color-sky));
}

.convergence__label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  fill: var(--color-text-muted);
}

.convergence__label--entry {
  fill: var(--color-sky);
  font-size: 9px;
}

.convergence__label--build {
  fill: color-mix(in srgb, var(--color-sky) 70%, var(--color-text-muted));
}

.convergence__label--research {
  fill: color-mix(in srgb, var(--color-mountain) 55%, var(--color-text-muted));
}

.convergence__label--hybrid {
  fill: var(--color-text-muted);
  font-size: 9px;
}

@media (prefers-reduced-motion: reduce) {
  .convergence__line {
    stroke-dasharray: none;
    stroke-dashoffset: 0;
    transition: none;
  }
}
</style>
