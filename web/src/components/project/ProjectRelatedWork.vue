<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import { getRelatedProjects } from '../../content/projects'
import { getProjectArchiveKindLabel } from '../../types/project'

const props = defineProps<{
  currentSlug: string
}>()

const related = computed(() => getRelatedProjects(props.currentSlug, 2))

function indexLabel(index: number) {
  return String(index + 1).padStart(2, '0')
}

function kindLine(project: (typeof related.value)[number]) {
  return `${getProjectArchiveKindLabel(project.category).toUpperCase()} / ${project.year}`
}
</script>

<template>
  <section v-if="related.length" class="related-work" aria-labelledby="related-work-title">
    <header class="related-work__header">
      <p class="related-work__eyebrow">Continue Exploring</p>
      <h2 id="related-work-title" class="related-work__title">Related work</h2>
    </header>

    <div class="related-work__list">
      <RouterLink
        v-for="(project, index) in related"
        :key="project.slug"
        class="related-work__row"
        :to="`/projects/${project.slug}`"
      >
        <span class="related-work__index" aria-hidden="true">
          {{ indexLabel(index) }}
        </span>
        <span class="related-work__copy">
          <span class="related-work__name">{{ project.title }}</span>
          <span class="related-work__meta">{{ kindLine(project) }}</span>
        </span>
        <span class="related-work__arrow" aria-hidden="true">→</span>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.related-work {
  display: grid;
  gap: var(--space-6);
  padding-top: var(--space-4);
}

.related-work__header {
  display: grid;
  gap: var(--space-2);
}

.related-work__eyebrow {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.related-work__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(var(--text-xl), 2vw, var(--text-2xl));
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
}

.related-work__list {
  display: grid;
}

.related-work__row {
  display: grid;
  grid-template-columns: 2.5rem minmax(0, 1fr) auto;
  gap: var(--space-4);
  align-items: baseline;
  padding-block: var(--space-5);
  border-top: 1px solid color-mix(in srgb, var(--color-line) 55%, transparent);
  color: inherit;
  text-decoration: none;
  transition: background-color var(--duration-fast) var(--ease-out-soft);
}

.related-work__row:hover,
.related-work__row:focus-visible {
  background: color-mix(in srgb, var(--color-frost) 40%, transparent);
}

.related-work__row:focus-visible {
  outline: var(--border-focus);
  outline-offset: 2px;
}

.related-work__index {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  color: var(--color-text-muted);
}

.related-work__copy {
  display: grid;
  gap: var(--space-1);
  min-width: 0;
}

.related-work__name {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  color: var(--color-text);
}

.related-work__meta {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
}

.related-work__arrow {
  color: var(--color-mountain);
  font-weight: 600;
}

@media (max-width: 720px) {
  .related-work__row {
    grid-template-columns: 2rem minmax(0, 1fr) auto;
    gap: var(--space-3);
  }
}

@media (prefers-reduced-motion: reduce) {
  .related-work__row {
    transition: none;
  }
}
</style>
