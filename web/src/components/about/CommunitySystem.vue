<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

import { communitySystem } from '../../content/about'

const focusId = ref<string | null>(null)
</script>

<template>
  <section class="system" aria-labelledby="system-title">
    <header class="system__header">
      <p class="system__eyebrow">{{ communitySystem.eyebrow }}</p>
      <h2 id="system-title" class="system__title">
        <span class="system__title-line">这个网站是一张</span>
        <span class="system__title-line">实践的地图。</span>
      </h2>
      <p class="system__lede">{{ communitySystem.lede }}</p>
    </header>

    <!-- Decorative loop; meaning lives in the list below -->
    <div class="system__diagram" aria-hidden="true">
      <ol class="system__loop">
        <li
          v-for="(node, index) in communitySystem.nodes"
          :key="`diagram-${node.id}`"
          class="system__loop-item"
          :class="{ 'system__loop-item--focus': focusId === node.id }"
        >
          <span class="system__loop-label">{{ node.label }}</span>
          <span class="system__loop-route">{{ node.routeLabel }}</span>
          <span
            v-if="index < communitySystem.nodes.length - 1"
            class="system__loop-arrow"
          >
            ↓
          </span>
        </li>
        <li class="system__loop-return">↺</li>
      </ol>
    </div>

    <ul class="system__list">
      <li
        v-for="node in communitySystem.nodes"
        :key="node.id"
        class="system__item"
        :class="{ 'system__item--focus': focusId === node.id }"
        @mouseenter="focusId = node.id"
        @mouseleave="focusId = null"
      >
        <RouterLink class="system__link" :to="node.to">
          <span class="system__node">{{ node.label }}</span>
          <span class="system__route">{{ node.routeLabel }}</span>
          <span class="system__statement">{{ node.statement }}</span>
        </RouterLink>
      </li>
    </ul>

    <p class="system__roles">
      <span>{{ communitySystem.aboutRole }}</span>
      <span>{{ communitySystem.joinRole }}</span>
    </p>
  </section>
</template>

<style scoped>
.system {
  display: grid;
  gap: var(--space-7);
}

.system__eyebrow {
  margin: 0 0 var(--space-3);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.system__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(var(--text-2xl), 3vw, var(--text-3xl));
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  line-height: var(--leading-tight);
  color: var(--color-text);
}

.system__title-line {
  display: block;
}

.system__lede {
  margin: var(--space-4) 0 0;
  max-width: 36rem;
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

.system__diagram {
  max-width: 18rem;
  padding: var(--space-5) 0;
  border-left: 1px solid color-mix(in srgb, var(--color-line) 55%, transparent);
  padding-left: var(--space-5);
}

.system__loop {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--space-2);
}

.system__loop-item {
  display: grid;
  gap: 0.15rem;
  opacity: 0.72;
  transition: opacity var(--duration-normal) var(--ease-out-soft);
}

.system__loop-item--focus {
  opacity: 1;
}

.system__loop-label {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  text-transform: uppercase;
  color: var(--color-text);
}

.system__loop-route {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-sky);
}

.system__loop-arrow,
.system__loop-return {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.system__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0;
}

.system__item {
  border-top: 1px solid color-mix(in srgb, var(--color-line) 50%, transparent);
}

.system__link {
  display: grid;
  grid-template-columns: minmax(0, 8rem) minmax(0, 7rem) minmax(0, 1fr);
  gap: var(--space-4);
  align-items: baseline;
  padding-block: var(--space-5);
  color: inherit;
  text-decoration: none;
}

.system__link:focus-visible {
  outline: var(--border-focus);
  outline-offset: 4px;
}

.system__node {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-text);
}

.system__route {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-sky);
}

.system__statement {
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

.system__item--focus .system__node,
.system__link:hover .system__node,
.system__link:focus-visible .system__node {
  color: var(--color-sky);
}

.system__roles {
  margin: 0;
  display: grid;
  gap: var(--space-2);
  max-width: 40rem;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: var(--leading-relaxed);
}

@media (max-width: 720px) {
  .system__link {
    grid-template-columns: 1fr;
    gap: var(--space-2);
  }
}

@media (prefers-reduced-motion: reduce) {
  .system__loop-item {
    transition: none;
  }
}
</style>
