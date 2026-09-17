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
    class="dual-lens"
    :class="{ 'dual-lens--drawn': drawn || prefersReducedMotion }"
    aria-hidden="true"
  >
    <svg class="dual-lens__svg" viewBox="0 0 560 300" focusable="false">
      <!-- BUILD — straight / directional -->
      <path
        class="dual-lens__line dual-lens__line--build"
        d="M40 70 H200 L260 150"
        fill="none"
        stroke-width="1.6"
        pathLength="1"
      />
      <path
        class="dual-lens__line dual-lens__line--build-out"
        d="M300 150 H420 L500 90"
        fill="none"
        stroke-width="1.4"
        pathLength="1"
      />

      <!-- UNDERSTAND — curved / relational -->
      <path
        class="dual-lens__line dual-lens__line--understand"
        d="M40 230 C120 230 160 200 200 170 C230 150 250 150 260 150"
        fill="none"
        stroke-width="1.6"
        pathLength="1"
      />
      <path
        class="dual-lens__line dual-lens__line--understand-out"
        d="M300 150 C340 150 380 190 440 220 H520"
        fill="none"
        stroke-width="1.4"
        pathLength="1"
      />

      <!-- SHARED PRACTICE center -->
      <circle class="dual-lens__center" cx="280" cy="150" r="22" />
      <circle class="dual-lens__center-dot" cx="280" cy="150" r="4" />

      <text class="dual-lens__label dual-lens__label--build" x="40" y="58">BUILD</text>
      <text class="dual-lens__label dual-lens__label--understand" x="40" y="254">
        UNDERSTAND
      </text>
      <text class="dual-lens__label dual-lens__label--shared" x="280" y="126" text-anchor="middle">
        SHARED
      </text>
      <text class="dual-lens__label dual-lens__label--shared" x="280" y="140" text-anchor="middle">
        PRACTICE
      </text>
      <text class="dual-lens__label" x="500" y="78" text-anchor="end">WORK</text>
      <text class="dual-lens__label" x="520" y="244" text-anchor="end">EVIDENCE</text>
      <text class="dual-lens__label dual-lens__label--soft" x="460" y="168" text-anchor="middle">
        COMMUNITY
      </text>
    </svg>
  </div>
</template>

<style scoped>
.dual-lens {
  width: 100%;
  max-width: 32rem;
}

.dual-lens__svg {
  width: 100%;
  height: auto;
  display: block;
}

.dual-lens__line {
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke var(--duration-slow) var(--ease-out-soft);
}

.dual-lens__line--build,
.dual-lens__line--build-out {
  stroke: color-mix(in srgb, var(--color-sky) 55%, var(--color-mountain));
}

.dual-lens__line--understand,
.dual-lens__line--understand-out {
  stroke: color-mix(in srgb, var(--color-aurora) 50%, var(--color-mountain));
}

.dual-lens--drawn .dual-lens__line {
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 1100ms var(--ease-out-soft);
}

.dual-lens__center {
  fill: color-mix(in srgb, var(--color-frost) 55%, var(--color-snow));
  stroke: color-mix(in srgb, var(--color-sky) 45%, var(--color-line));
  stroke-width: 1.25;
}

.dual-lens__center-dot {
  fill: color-mix(in srgb, var(--color-aurora) 55%, var(--color-sky));
}

.dual-lens__label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  fill: var(--color-text-muted);
}

.dual-lens__label--build {
  fill: color-mix(in srgb, var(--color-sky) 70%, var(--color-text-muted));
}

.dual-lens__label--understand {
  fill: color-mix(in srgb, var(--color-mountain) 55%, var(--color-text-muted));
}

.dual-lens__label--shared {
  fill: var(--color-sky);
  font-size: 9px;
}

.dual-lens__label--soft {
  opacity: 0.75;
}

@media (prefers-reduced-motion: reduce) {
  .dual-lens__line {
    stroke-dasharray: none;
    stroke-dashoffset: 0;
    transition: none;
  }
}
</style>
