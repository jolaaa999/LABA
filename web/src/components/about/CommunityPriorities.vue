<script setup lang="ts">
import { communityPriorities } from '../../content/about'
</script>

<template>
  <section class="priorities" aria-labelledby="priorities-title">
    <header class="priorities__header">
      <p class="priorities__eyebrow">{{ communityPriorities.eyebrow }}</p>
      <h2 id="priorities-title" class="priorities__title">
        <span class="priorities__title-line">Not more AI.</span>
        <span class="priorities__title-line">Better practice with AI.</span>
      </h2>
    </header>

    <ul class="priorities__matrix">
      <li v-for="item in communityPriorities.items" :key="item.id" class="priorities__cell">
        <p class="priorities__index">{{ item.index }}</p>
        <h3 class="priorities__label">{{ item.label }}</h3>
        <p class="priorities__statement">{{ item.statement }}</p>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.priorities {
  display: grid;
  gap: var(--space-8);
}

.priorities__eyebrow {
  margin: 0 0 var(--space-3);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.priorities__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(var(--text-2xl), 3vw, var(--text-3xl));
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  line-height: var(--leading-tight);
  color: var(--color-text);
}

.priorities__title-line {
  display: block;
}

.priorities__matrix {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0;
  border-top: 1px solid color-mix(in srgb, var(--color-line) 55%, transparent);
}

.priorities__cell {
  display: grid;
  gap: var(--space-3);
  padding: var(--space-6) var(--space-5) var(--space-6) 0;
  border-bottom: 1px solid color-mix(in srgb, var(--color-line) 45%, transparent);
}

.priorities__cell:nth-child(odd) {
  padding-right: var(--space-6);
  border-right: 1px solid color-mix(in srgb, var(--color-line) 45%, transparent);
}

.priorities__cell:nth-child(even) {
  padding-left: var(--space-6);
}

.priorities__index {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  color: var(--color-sky);
}

.priorities__label {
  margin: 0;
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  text-transform: uppercase;
  color: var(--color-text);
}

.priorities__statement {
  margin: 0;
  max-width: 28rem;
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

@media (max-width: 720px) {
  .priorities__matrix {
    grid-template-columns: 1fr;
  }

  .priorities__cell:nth-child(odd),
  .priorities__cell:nth-child(even) {
    padding-inline: 0;
    border-right: 0;
  }
}
</style>
