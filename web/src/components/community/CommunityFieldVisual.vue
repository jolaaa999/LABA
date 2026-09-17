<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { useMotionPreference } from '../../composables/useMotionPreference'
import type { ContributionModeId } from '../../types/member'

const props = defineProps<{
  activeMode?: ContributionModeId | null
}>()

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

const modeClass = computed(() =>
  props.activeMode ? `community-field--${props.activeMode}` : '',
)
</script>

<template>
  <div
    class="community-field"
    :class="[{ 'community-field--drawn': drawn || prefersReducedMotion }, modeClass]"
    aria-hidden="true"
  >
    <svg class="community-field__svg" viewBox="0 0 520 280" focusable="false">
      <!-- connections -->
      <path
        class="community-field__line community-field__line--q"
        d="M260 36 L180 110"
        fill="none"
        stroke-width="1.2"
      />
      <path
        class="community-field__line community-field__line--q"
        d="M260 36 L340 110"
        fill="none"
        stroke-width="1.2"
      />
      <path
        class="community-field__line community-field__line--session"
        d="M180 110 L260 160"
        fill="none"
        stroke-width="1.2"
      />
      <path
        class="community-field__line community-field__line--session"
        d="M340 110 L260 160"
        fill="none"
        stroke-width="1.2"
      />
      <path
        class="community-field__line community-field__line--work"
        d="M260 160 L180 230"
        fill="none"
        stroke-width="1.35"
      />
      <path
        class="community-field__line community-field__line--work"
        d="M260 160 L340 230"
        fill="none"
        stroke-width="1.35"
      />
      <path
        class="community-field__line community-field__line--connect"
        d="M180 230 C220 250 300 250 340 230"
        fill="none"
        stroke-width="1"
      />

      <!-- QUESTION -->
      <circle class="community-field__node community-field__node--question" cx="260" cy="36" r="4.5" />
      <text class="community-field__label" x="260" y="22" text-anchor="middle">提问</text>

      <!-- PERSON -->
      <circle class="community-field__node community-field__node--person" cx="180" cy="110" r="7" />
      <circle class="community-field__node community-field__node--person" cx="340" cy="110" r="7" />
      <text class="community-field__label" x="140" y="114" text-anchor="end">成员</text>
      <text class="community-field__label" x="380" y="114">成员</text>

      <!-- SESSION -->
      <circle class="community-field__node community-field__node--session" cx="260" cy="160" r="3.5" />
      <text class="community-field__label" x="288" y="164">场次</text>

      <!-- WORK -->
      <rect
        class="community-field__work"
        x="168"
        y="218"
        width="24"
        height="24"
        transform="rotate(45 180 230)"
      />
      <rect
        class="community-field__work"
        x="328"
        y="218"
        width="24"
        height="24"
        transform="rotate(45 340 230)"
      />
      <text class="community-field__label" x="180" y="268" text-anchor="middle">作品</text>
      <text class="community-field__label" x="340" y="268" text-anchor="middle">作品</text>
    </svg>
  </div>
</template>

<style scoped>
.community-field {
  width: 100%;
  max-width: 30rem;
}

.community-field__svg {
  width: 100%;
  height: auto;
  display: block;
}

.community-field__line {
  stroke: color-mix(in srgb, var(--color-line) 60%, var(--color-mountain));
  stroke-linecap: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  path-length: 1;
  opacity: 0.7;
  transition:
    stroke var(--duration-normal) var(--ease-out-soft),
    opacity var(--duration-normal) var(--ease-out-soft);
}

.community-field--drawn .community-field__line {
  stroke-dashoffset: 0;
  transition:
    stroke-dashoffset 900ms var(--ease-out-soft),
    stroke var(--duration-normal) var(--ease-out-soft),
    opacity var(--duration-normal) var(--ease-out-soft);
}

.community-field__node {
  fill: var(--color-snow);
  stroke: color-mix(in srgb, var(--color-sky) 50%, var(--color-line));
  stroke-width: 1.25;
  transition:
    fill var(--duration-normal) var(--ease-out-soft),
    stroke var(--duration-normal) var(--ease-out-soft),
    opacity var(--duration-normal) var(--ease-out-soft);
}

.community-field__work {
  fill: var(--color-snow);
  stroke: color-mix(in srgb, var(--color-sky) 50%, var(--color-line));
  stroke-width: 1.25;
  transition:
    fill var(--duration-normal) var(--ease-out-soft),
    stroke var(--duration-normal) var(--ease-out-soft);
}

.community-field__label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  fill: var(--color-text-muted);
}

.community-field--build .community-field__line--work,
.community-field--build .community-field__work {
  stroke: var(--color-sky);
  opacity: 1;
}

.community-field--build .community-field__work {
  fill: color-mix(in srgb, var(--color-aurora) 40%, var(--color-snow));
}

.community-field--research .community-field__line--q,
.community-field--research .community-field__node--question,
.community-field--research .community-field__node--person {
  stroke: var(--color-sky);
  opacity: 1;
}

.community-field--research .community-field__node--question {
  fill: color-mix(in srgb, var(--color-aurora) 45%, var(--color-snow));
}

.community-field--explain .community-field__node--person,
.community-field--explain .community-field__line--session {
  stroke: var(--color-sky);
  opacity: 1;
}

.community-field--document .community-field__work,
.community-field--document .community-field__line--work {
  stroke: var(--color-sky);
  opacity: 1;
}

.community-field--connect .community-field__line--connect,
.community-field--connect .community-field__node--person {
  stroke: var(--color-sky);
  opacity: 1;
}

.community-field--connect .community-field__line--connect {
  stroke-width: 1.5;
}

@media (prefers-reduced-motion: reduce) {
  .community-field__line {
    stroke-dasharray: none;
    stroke-dashoffset: 0;
    transition: none;
  }
}
</style>
