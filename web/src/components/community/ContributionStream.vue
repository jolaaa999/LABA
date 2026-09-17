<script setup lang="ts">
import { contributionModes } from '../../content/community'
import type { ContributionModeId } from '../../types/member'

defineProps<{
  activeMode?: ContributionModeId | null
}>()

const emit = defineEmits<{
  focus: [id: ContributionModeId | null]
}>()
</script>

<template>
  <section class="contribution-stream" aria-labelledby="contribution-title">
    <header class="contribution-stream__header">
      <p class="contribution-stream__eyebrow">Ways We Contribute</p>
      <h2 id="contribution-title" class="contribution-stream__title">
        Ways we contribute.
      </h2>
      <p class="contribution-stream__lede">
        Not job titles — practices that keep the community moving.
      </p>
    </header>

    <ol class="contribution-stream__list">
      <li
        v-for="mode in contributionModes"
        :key="mode.id"
        class="contribution-entry"
        :class="{ 'contribution-entry--active': activeMode === mode.id }"
        @mouseenter="emit('focus', mode.id)"
        @mouseleave="emit('focus', null)"
      >
        <p class="contribution-entry__index">{{ mode.index }}</p>
        <div class="contribution-entry__main">
          <h3 class="contribution-entry__label">{{ mode.label }}</h3>
          <p class="contribution-entry__statement">{{ mode.statement }}</p>
        </div>
        <ul class="contribution-entry__related">
          <li v-for="item in mode.related" :key="item">{{ item }}</li>
        </ul>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.contribution-stream {
  display: grid;
  gap: var(--space-8);
}

.contribution-stream__eyebrow {
  margin: 0 0 var(--space-3);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.contribution-stream__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(var(--text-2xl), 3vw, var(--text-3xl));
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
}

.contribution-stream__lede {
  margin: var(--space-4) 0 0;
  max-width: 34rem;
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

.contribution-stream__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0;
  border-top: 1px solid color-mix(in srgb, var(--color-line) 55%, transparent);
}

.contribution-entry {
  display: grid;
  grid-template-columns: 2.75rem minmax(0, 1.2fr) minmax(0, 0.8fr);
  gap: var(--space-4) var(--space-8);
  align-items: start;
  padding-block: var(--space-5);
  border-bottom: 1px solid color-mix(in srgb, var(--color-line) 45%, transparent);
  transition: opacity var(--duration-normal) var(--ease-out-soft);
}

.contribution-stream:has(.contribution-entry--active)
  .contribution-entry:not(.contribution-entry--active) {
  opacity: 0.55;
}

.contribution-entry__index {
  margin: 0.25rem 0 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  color: var(--color-sky);
}

.contribution-entry__label {
  margin: 0;
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
  text-transform: uppercase;
}

.contribution-entry--active .contribution-entry__label {
  color: var(--color-mountain);
}

.contribution-entry__statement {
  margin: var(--space-2) 0 0;
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

.contribution-entry__related {
  list-style: none;
  margin: 0.2rem 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-3);
}

.contribution-entry__related li {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
}

@media (max-width: 900px) {
  .contribution-entry {
    grid-template-columns: 2.5rem minmax(0, 1fr);
  }

  .contribution-entry__related {
    grid-column: 2;
  }
}

@media (prefers-reduced-motion: reduce) {
  .contribution-entry {
    transition: none;
  }
}
</style>
