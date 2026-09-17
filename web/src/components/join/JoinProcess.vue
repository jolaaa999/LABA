<script setup lang="ts">
import { ref } from 'vue'

import { joinProcess } from '../../content/join-page'

const titleLines = joinProcess.title.split('\n')
const hoverId = ref<string | null>(null)

const order = ['orient', 'show-up', 'make-question', 'share'] as const
</script>

<template>
  <section class="process" aria-labelledby="process-title">
    <header class="process__header">
      <p class="process__eyebrow">{{ joinProcess.eyebrow }}</p>
      <h2 id="process-title" class="process__title">
        <span v-for="(line, i) in titleLines" :key="i" class="process__title-line">
          {{ line }}
        </span>
      </h2>
    </header>

    <div class="process__loop" aria-hidden="true">
      <div
        v-for="step in joinProcess.steps"
        :key="`loop-${step.id}`"
        class="process__loop-node"
        :class="{ 'process__loop-node--focus': hoverId === step.id }"
      >
        <span class="process__loop-label">{{ step.label }}</span>
      </div>
      <p class="process__loop-center">{{ joinProcess.centerLabel }}</p>
    </div>

    <ol class="process__list">
      <li
        v-for="step in joinProcess.steps"
        :key="step.id"
        class="process__item"
        :class="{ 'process__item--focus': hoverId === step.id }"
        @mouseenter="hoverId = step.id"
        @mouseleave="hoverId = null"
      >
        <span class="process__index">{{ step.index }}</span>
        <div class="process__body">
          <h3 class="process__label">{{ step.label }}</h3>
          <p class="process__description">{{ step.description }}</p>
        </div>
      </li>
    </ol>
    <!-- keep order referenced for future edge emphasis without tab hell -->
    <span class="process__order-ref" hidden>{{ order.join(',') }}</span>
  </section>
</template>

<style scoped>
.process {
  display: grid;
  gap: var(--space-7);
}

.process__eyebrow {
  margin: 0 0 var(--space-3);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.process__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(var(--text-2xl), 3vw, var(--text-3xl));
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  line-height: var(--leading-tight);
  color: var(--color-text);
}

.process__title-line {
  display: block;
}

.process__loop {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-4) var(--space-6);
  max-width: 28rem;
  padding: var(--space-5);
  border: 1px solid color-mix(in srgb, var(--color-line) 50%, transparent);
  position: relative;
}

.process__loop-center {
  grid-column: 1 / -1;
  margin: 0;
  text-align: center;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-sky);
}

.process__loop-node {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  opacity: 0.72;
  transition: opacity 320ms var(--ease-out-soft), color 320ms var(--ease-out-soft);
}

.process__loop-node:nth-child(1) {
  text-align: left;
}

.process__loop-node:nth-child(2) {
  text-align: right;
}

.process__loop-node:nth-child(3) {
  text-align: left;
}

.process__loop-node:nth-child(4) {
  text-align: right;
}

.process__loop-node--focus {
  opacity: 1;
  color: var(--color-sky);
}

.process__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0;
}

.process__item {
  display: grid;
  grid-template-columns: 3.5rem minmax(0, 1fr);
  gap: var(--space-4);
  padding-block: var(--space-5);
  border-top: 1px solid color-mix(in srgb, var(--color-line) 50%, transparent);
  transition: opacity 320ms var(--ease-out-soft);
}

.process:has(.process__item--focus) .process__item:not(.process__item--focus) {
  opacity: 0.58;
}

.process__index {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  color: var(--color-sky);
}

.process__label {
  margin: 0 0 var(--space-2);
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-text);
}

.process__description {
  margin: 0;
  max-width: 36rem;
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

@media (max-width: 720px) {
  .process__item {
    grid-template-columns: 1fr;
    gap: var(--space-2);
  }
}

@media (prefers-reduced-motion: reduce) {
  .process__loop-node,
  .process__item {
    transition: none;
  }
}
</style>
