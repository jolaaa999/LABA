<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import {
  formatProjectMeta,
  formatProjectTech,
} from '../../content/projects'
import type { Project } from '../../types/project'
import ProjectVisual from './ProjectVisual.vue'

const props = defineProps<{
  project: Project
  indexLabel?: string
}>()

const metaLine = computed(() => formatProjectMeta(props.project))
const techLine = computed(() => formatProjectTech(props.project))
const detailTo = computed(() => `/projects/${props.project.slug}`)
</script>

<template>
  <RouterLink :to="detailTo" class="archive-featured">
    <header class="archive-featured__header">
      <p class="archive-featured__eyebrow">
        {{ indexLabel ?? '精选' }}
      </p>
      <p v-if="project.placeholder" class="archive-featured__dev">
        开发占位 · 非真实交付物
      </p>
    </header>

    <div class="archive-featured__stage">
      <div class="archive-featured__visual">
        <ProjectVisual :kind="project.visualKind" featured />
      </div>

      <div class="archive-featured__body">
        <p class="archive-featured__meta">{{ metaLine }}</p>
        <h2 class="archive-featured__title">{{ project.title }}</h2>
        <p class="archive-featured__summary">{{ project.summary }}</p>
        <p class="archive-featured__tech">{{ techLine }}</p>
        <span class="archive-featured__cta">
          进入
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.archive-featured {
  display: grid;
  gap: var(--space-6);
  color: inherit;
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition: background-color var(--duration-fast) var(--ease-out-soft);
}

.archive-featured:focus-visible {
  outline: var(--border-focus);
  outline-offset: 6px;
}

.archive-featured:hover .archive-featured__cta,
.archive-featured:focus-visible .archive-featured__cta {
  color: var(--color-sky);
  gap: var(--space-3);
}

.archive-featured__header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-3);
}

.archive-featured__eyebrow {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.archive-featured__dev {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.625rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-text-muted) 88%, transparent);
}

.archive-featured__stage {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
  gap: var(--space-8) var(--space-10);
  align-items: center;
}

.archive-featured__body {
  display: grid;
  gap: var(--space-4);
  align-content: start;
}

.archive-featured__meta {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
}

.archive-featured__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(var(--text-2xl), 3vw, var(--text-4xl));
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  line-height: var(--leading-tight);
  color: var(--color-text);
}

.archive-featured__summary {
  margin: 0;
  max-width: 34rem;
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
}

.archive-featured__tech {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
}

.archive-featured__cta {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-1);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-mountain);
  transition:
    color var(--duration-fast) var(--ease-out-soft),
    gap var(--duration-fast) var(--ease-out-soft);
}

@media (max-width: 900px) {
  .archive-featured__stage {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
}

@media (prefers-reduced-motion: reduce) {
  .archive-featured,
  .archive-featured__cta {
    transition: none;
  }
}
</style>
