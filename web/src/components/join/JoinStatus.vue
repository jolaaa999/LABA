<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { joinStatus } from '../../content/join-page'

const titleLines = joinStatus.title.split('\n')
const ledeBlocks = joinStatus.lede.split('\n\n')
</script>

<template>
  <section class="status" aria-labelledby="status-title">
    <header class="status__header">
      <p class="status__eyebrow">{{ joinStatus.eyebrow }}</p>
      <h2 id="status-title" class="status__title">
        <span v-for="(line, i) in titleLines" :key="i" class="status__title-line">
          {{ line }}
        </span>
      </h2>
      <div class="status__lede">
        <p v-for="(block, i) in ledeBlocks" :key="i">{{ block }}</p>
      </div>
    </header>

    <ul class="status__ledger">
      <li
        v-for="item in joinStatus.items"
        :key="item.index"
        class="status__row"
        :class="{
          'status__row--muted': item.status !== 'available',
        }"
      >
        <span class="status__index">{{ item.index }}</span>
        <span class="status__label">
          <RouterLink v-if="item.href" class="status__link" :to="item.href">
            {{ item.label }}
          </RouterLink>
          <template v-else>{{ item.label }}</template>
        </span>
        <span class="status__state">{{ item.statusLabel }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.status {
  display: grid;
  gap: var(--space-7);
}

.status__eyebrow {
  margin: 0 0 var(--space-3);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.status__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(var(--text-2xl), 3vw, var(--text-3xl));
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  line-height: var(--leading-tight);
  color: var(--color-text);
}

.status__title-line {
  display: block;
}

.status__lede {
  margin-top: var(--space-4);
  max-width: 38rem;
  display: grid;
  gap: var(--space-3);
}

.status__lede p {
  margin: 0;
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

.status__ledger {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0;
}

.status__row {
  display: grid;
  grid-template-columns: 3.25rem minmax(0, 1fr) auto;
  gap: var(--space-4);
  align-items: baseline;
  padding-block: var(--space-4);
  border-top: 1px solid color-mix(in srgb, var(--color-line) 50%, transparent);
}

.status__row--muted .status__state {
  color: var(--color-text-secondary);
}

.status__index {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  color: var(--color-sky);
}

.status__label {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  text-transform: uppercase;
  color: var(--color-text);
}

.status__link {
  color: inherit;
  text-decoration: none;
}

.status__link:hover,
.status__link:focus-visible {
  color: var(--color-sky);
}

.status__link:focus-visible {
  outline: var(--border-focus);
  outline-offset: 4px;
}

.status__state {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-sky);
  white-space: nowrap;
}

@media (max-width: 560px) {
  .status__row {
    grid-template-columns: 2.5rem minmax(0, 1fr);
    gap: var(--space-2) var(--space-3);
  }

  .status__state {
    grid-column: 2;
    white-space: normal;
  }
}
</style>
