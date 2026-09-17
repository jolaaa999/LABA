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
}>()

const metaLine = computed(() => formatProjectMeta(props.project))
const techLine = computed(() => formatProjectTech(props.project))
const detailTo = computed(() => `/projects/${props.project.slug}`)
</script>

<template>
  <aside class="archive-preview" aria-live="polite" aria-atomic="true">
    <p class="archive-preview__eyebrow">Preview</p>

    <div class="archive-preview__visual">
      <ProjectVisual :kind="project.visualKind" />
    </div>

    <p class="archive-preview__meta">{{ metaLine }}</p>
    <h3 class="archive-preview__title">{{ project.title }}</h3>
    <p class="archive-preview__summary">{{ project.summary }}</p>
    <p class="archive-preview__tech">{{ techLine }}</p>

    <p v-if="project.placeholder" class="archive-preview__dev">
      Dev placeholder · not a real deliverable
    </p>

    <RouterLink class="archive-preview__cta" :to="detailTo">
      Open entry
      <span aria-hidden="true">→</span>
    </RouterLink>
  </aside>
</template>

<style scoped>
.archive-preview {
  position: sticky;
  top: var(--sticky-top);
  display: grid;
  gap: var(--space-4);
  align-content: start;
  padding: var(--space-5) 0 var(--space-6);
}

.archive-preview__eyebrow {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.archive-preview__visual {
  margin-bottom: var(--space-1);
}

.archive-preview__meta {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
}

.archive-preview__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(var(--text-xl), 1.8vw, var(--text-2xl));
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  line-height: var(--leading-tight);
  color: var(--color-text);
}

.archive-preview__summary {
  margin: 0;
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
}

.archive-preview__tech {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
}

.archive-preview__dev {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.625rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-text-muted) 85%, transparent);
}

.archive-preview__cta {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-2);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-mountain);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out-soft);
}

.archive-preview__cta:hover,
.archive-preview__cta:focus-visible {
  color: var(--color-sky);
}

.archive-preview__cta:focus-visible {
  outline: var(--border-focus);
  outline-offset: 4px;
}

@media (prefers-reduced-motion: reduce) {
  .archive-preview__cta {
    transition: none;
  }
}
</style>
