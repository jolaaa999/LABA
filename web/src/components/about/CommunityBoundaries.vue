<script setup lang="ts">
import { communityBoundaries } from '../../content/about'
</script>

<template>
  <section class="boundaries" aria-labelledby="boundaries-title">
    <header class="boundaries__header">
      <p class="boundaries__eyebrow">{{ communityBoundaries.eyebrow }}</p>
      <h2 id="boundaries-title" class="boundaries__title">
        <span class="boundaries__title-line">有些事我们刻意</span>
        <span class="boundaries__title-line">不去优化。</span>
      </h2>
    </header>

    <ul class="boundaries__list">
      <li v-for="item in communityBoundaries.items" :key="item.id" class="boundaries__row">
        <p class="boundaries__not" aria-hidden="true">不</p>
        <div class="boundaries__body">
          <h3 class="boundaries__label">{{ item.label }}</h3>
          <p class="boundaries__statement">{{ item.statement }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.boundaries {
  display: grid;
  gap: var(--space-8);
}

.boundaries__eyebrow {
  margin: 0 0 var(--space-3);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.boundaries__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(var(--text-2xl), 3vw, var(--text-3xl));
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  line-height: var(--leading-tight);
  color: var(--color-text);
}

.boundaries__title-line {
  display: block;
}

.boundaries__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0;
}

.boundaries__row {
  display: grid;
  grid-template-columns: 4.5rem minmax(0, 1fr);
  gap: var(--space-4);
  align-items: start;
  padding-block: var(--space-5);
  border-top: 1px solid color-mix(in srgb, var(--color-line) 50%, transparent);
}

.boundaries__not {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.16em;
  color: var(--color-text-muted);
  text-decoration: line-through;
  text-decoration-thickness: 1px;
  text-decoration-color: color-mix(in srgb, var(--color-mountain) 35%, var(--color-line));
}

.boundaries__label {
  margin: 0 0 var(--space-2);
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  text-transform: uppercase;
  color: var(--color-text);
}

.boundaries__statement {
  margin: 0;
  max-width: 36rem;
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

@media (max-width: 480px) {
  .boundaries__row {
    grid-template-columns: 1fr;
    gap: var(--space-2);
  }
}
</style>
