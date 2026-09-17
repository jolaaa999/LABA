<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { useMotionPreference } from '../../composables/useMotionPreference'

export type DirectionTone = 'build' | 'research'

withDefaults(
  defineProps<{
    index: string
    label: string
    title: string
    statement: string
    audience: string
    keywords: readonly string[]
    ctaLabel: string
    to: string
    tone?: DirectionTone
  }>(),
  {
    tone: 'build',
  },
)

const { prefersReducedMotion } = useMotionPreference()
</script>

<template>
  <RouterLink
    :to="to"
    class="direction-panel"
    :class="[
      `direction-panel--${tone}`,
      { 'direction-panel--static': prefersReducedMotion },
    ]"
  >
    <div class="direction-panel__texture" aria-hidden="true" />

    <div class="direction-panel__content">
      <div class="direction-panel__top">
        <span class="direction-panel__index">{{ index }}</span>
        <span class="direction-panel__label">{{ label }}</span>
      </div>

      <h3 class="direction-panel__title">{{ title }}</h3>
      <p class="direction-panel__statement">{{ statement }}</p>

      <p class="direction-panel__audience">
        <span class="direction-panel__audience-key">面向</span>
        {{ audience }}
      </p>

      <p class="direction-panel__keywords">
        <template v-for="(keyword, i) in keywords" :key="keyword">
          <span v-if="i > 0" class="direction-panel__dot" aria-hidden="true">·</span>
          <span>{{ keyword }}</span>
        </template>
      </p>

      <span class="direction-panel__cta">
        {{ ctaLabel }}
        <span class="direction-panel__cta-arrow" aria-hidden="true">↗</span>
      </span>
    </div>
  </RouterLink>
</template>

<style scoped>
.direction-panel {
  position: relative;
  display: block;
  padding: var(--space-8) var(--space-8);
  color: inherit;
  text-decoration: none;
  overflow: hidden;
  isolation: isolate;
  min-height: 22rem;
  background: transparent;
  transition: background-color var(--duration-normal) var(--ease-out-soft);
}

.direction-panel__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  height: 100%;
  transition: transform var(--duration-normal) var(--ease-out-soft);
}

.direction-panel__texture {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity var(--duration-normal) var(--ease-out-soft);
}

.direction-panel--build .direction-panel__texture {
  background:
    linear-gradient(
      160deg,
      color-mix(in srgb, var(--color-glacier) 28%, transparent) 0%,
      transparent 58%
    ),
    repeating-linear-gradient(
      90deg,
      transparent 0,
      transparent 26px,
      color-mix(in srgb, var(--color-mist) 50%, transparent) 26px,
      color-mix(in srgb, var(--color-mist) 50%, transparent) 27px
    );
  mask-image: linear-gradient(180deg, transparent 0%, black 35%, transparent 100%);
}

.direction-panel--research .direction-panel__texture {
  background:
    radial-gradient(
      48% 40% at 86% 16%,
      color-mix(in srgb, var(--color-frost) 70%, transparent) 0%,
      transparent 72%
    ),
    radial-gradient(
      1.5px 1.5px at 16% 30%,
      color-mix(in srgb, var(--color-stream) 45%, transparent) 0,
      transparent 100%
    ),
    radial-gradient(
      1.2px 1.2px at 70% 58%,
      color-mix(in srgb, var(--color-mountain) 24%, transparent) 0,
      transparent 100%
    ),
    radial-gradient(
      1px 1px at 42% 76%,
      color-mix(in srgb, var(--color-stream) 35%, transparent) 0,
      transparent 100%
    ),
    radial-gradient(
      1.1px 1.1px at 84% 42%,
      color-mix(in srgb, var(--color-glacier) 80%, transparent) 0,
      transparent 100%
    );
}

.direction-panel:hover,
.direction-panel:focus-visible {
  background: color-mix(in srgb, var(--color-morning) 55%, transparent);
}

.direction-panel--build:hover,
.direction-panel--build:focus-visible {
  background: color-mix(in srgb, var(--color-glacier) 22%, var(--color-snow));
}

.direction-panel--research:hover,
.direction-panel--research:focus-visible {
  background: color-mix(in srgb, var(--color-frost) 55%, var(--color-snow));
}

.direction-panel:hover .direction-panel__texture,
.direction-panel:focus-visible .direction-panel__texture {
  opacity: 0.7;
}

.direction-panel:not(.direction-panel--static):hover .direction-panel__content,
.direction-panel:not(.direction-panel--static):focus-visible .direction-panel__content {
  transform: translateY(-1px);
}

.direction-panel:focus-visible {
  outline: var(--border-focus);
  outline-offset: -2px;
}

.direction-panel__top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-4);
}

.direction-panel__index {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
}

.direction-panel__label {
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-mountain);
}

.direction-panel__title {
  margin-top: var(--space-2);
  font-family: var(--font-display);
  font-size: clamp(var(--text-2xl), 2.3vw, 2.35rem);
  font-weight: 600;
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
}

.direction-panel__statement {
  max-width: 28rem;
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
}

.direction-panel__audience {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  letter-spacing: 0.02em;
}

.direction-panel__audience-key {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-right: var(--space-2);
  color: color-mix(in srgb, var(--color-text-muted) 80%, var(--color-mountain));
}

.direction-panel__keywords {
  margin-top: var(--space-1);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  line-height: 1.6;
}

.direction-panel__dot {
  margin-inline: var(--space-2);
  color: color-mix(in srgb, var(--color-text-muted) 55%, transparent);
}

.direction-panel__cta {
  margin-top: auto;
  padding-top: var(--space-8);
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-mountain);
  letter-spacing: 0.02em;
  transition:
    color var(--duration-fast) var(--ease-out-soft),
    gap var(--duration-fast) var(--ease-out-soft);
}

.direction-panel__cta-arrow {
  transition: transform var(--duration-fast) var(--ease-out-soft);
}

.direction-panel:hover .direction-panel__cta,
.direction-panel:focus-visible .direction-panel__cta {
  color: var(--color-sky);
  gap: var(--space-3);
}

.direction-panel:hover .direction-panel__cta-arrow,
.direction-panel:focus-visible .direction-panel__cta-arrow {
  transform: translate(1px, -1px);
}

.direction-panel--static:hover .direction-panel__content,
.direction-panel--static:focus-visible .direction-panel__content {
  transform: none;
}

@media (max-width: 960px) {
  .direction-panel {
    min-height: 0;
    padding: var(--space-6) var(--space-5);
  }

  .direction-panel__cta {
    padding-top: var(--space-5);
  }
}
</style>
