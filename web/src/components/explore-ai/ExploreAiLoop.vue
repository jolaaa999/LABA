<script setup lang="ts">
import { practiceLoop } from '../../content/explore-ai'
</script>

<template>
  <section class="ai-loop" aria-labelledby="ai-loop-title">
    <header class="ai-loop__header">
      <p class="ai-loop__eyebrow">{{ practiceLoop.eyebrow }}</p>
      <h2 id="ai-loop-title" class="ai-loop__title">{{ practiceLoop.title }}</h2>
      <p class="ai-loop__lede">{{ practiceLoop.lede }}</p>
    </header>

    <ol class="ai-loop__list">
      <li
        v-for="(step, index) in practiceLoop.steps"
        :key="step.id"
        class="ai-loop__item"
      >
        <p class="ai-loop__meta">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <span aria-hidden="true">↓</span>
        </p>
        <h3 class="ai-loop__label">{{ step.label }}</h3>
        <p class="ai-loop__statement">{{ step.statement }}</p>
      </li>
    </ol>
    <p class="ai-loop__return" aria-hidden="true">↺ 回到 Understand</p>
  </section>
</template>

<style scoped>
.ai-loop {
  display: grid;
  gap: var(--space-8);
}

.ai-loop__eyebrow {
  margin: 0 0 var(--space-3);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.ai-loop__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(var(--text-2xl), 3vw, var(--text-3xl));
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
}

.ai-loop__lede {
  margin: var(--space-4) 0 0;
  max-width: 36rem;
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

.ai-loop__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0;
}

.ai-loop__item {
  display: grid;
  grid-template-columns: 4.5rem minmax(0, 14rem) minmax(0, 1fr);
  gap: var(--space-4);
  align-items: baseline;
  padding-block: var(--space-5);
  border-top: 1px solid color-mix(in srgb, var(--color-line) 50%, transparent);
}

.ai-loop__meta {
  margin: 0;
  display: inline-flex;
  gap: var(--space-2);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  color: var(--color-sky);
}

.ai-loop__label {
  margin: 0;
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--color-text);
}

.ai-loop__statement {
  margin: 0;
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

.ai-loop__return {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

@media (max-width: 720px) {
  .ai-loop__item {
    grid-template-columns: 1fr;
    gap: var(--space-2);
  }
}
</style>
