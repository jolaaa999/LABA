<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { computed } from 'vue'

import { useMotionPreference } from '../../composables/useMotionPreference'
import {
  formatProjectMeta,
  formatProjectTech,
} from '../../content/projects'
import type { Project } from '../../types/project'
import ProjectVisual from './ProjectVisual.vue'

const props = withDefaults(
  defineProps<{
    project: Project
    variant?: 'featured' | 'secondary'
  }>(),
  {
    variant: 'secondary',
  },
)

const { prefersReducedMotion } = useMotionPreference()

const metaLine = computed(() => formatProjectMeta(props.project))
const techLine = computed(() => formatProjectTech(props.project))

/** Phase 5A: listing exists; Detail arrives in a later phase. */
const target = '/projects'
</script>

<template>
  <RouterLink
    :to="target"
    class="project-preview"
    :class="[
      `project-preview--${variant}`,
      { 'project-preview--static': prefersReducedMotion },
    ]"
  >
    <div class="project-preview__visual">
      <ProjectVisual :kind="project.visualKind" :featured="variant === 'featured'" />
    </div>

    <div class="project-preview__body">
      <p class="project-preview__meta">{{ metaLine }}</p>
      <h3 class="project-preview__title">{{ project.title }}</h3>
      <p class="project-preview__summary">{{ project.summary }}</p>
      <p class="project-preview__tech">{{ techLine }}</p>
      <span class="project-preview__cta">
        Explore project
        <span aria-hidden="true">↗</span>
      </span>
    </div>
  </RouterLink>
</template>

<style scoped>
.project-preview {
  display: grid;
  color: inherit;
  text-decoration: none;
  gap: var(--space-5);
}

.project-preview--featured {
  gap: var(--space-6);
  align-content: start;
}

.project-preview--secondary {
  gap: var(--space-4);
  padding-block: var(--space-2);
}

.project-preview__body {
  display: grid;
  gap: var(--space-3);
  transition: transform var(--duration-normal) var(--ease-out-soft);
}

.project-preview__visual {
  transition: transform var(--duration-normal) var(--ease-out-soft);
}

.project-preview:not(.project-preview--static):hover .project-preview__visual,
.project-preview:not(.project-preview--static):focus-visible .project-preview__visual {
  transform: translateY(-2px);
}

.project-preview:not(.project-preview--static):hover .project-preview__body,
.project-preview:not(.project-preview--static):focus-visible .project-preview__body {
  transform: translateY(-1px);
}

.project-preview:focus-visible {
  outline: var(--border-focus);
  outline-offset: 4px;
}

.project-preview__meta {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
}

.project-preview__title {
  font-family: var(--font-display);
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  line-height: var(--leading-tight);
  color: var(--color-text);
}

.project-preview--featured .project-preview__title {
  font-size: clamp(var(--text-2xl), 2.6vw, 2.5rem);
}

.project-preview--secondary .project-preview__title {
  font-size: var(--text-xl);
}

.project-preview__summary {
  max-width: 36rem;
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
}

.project-preview--secondary .project-preview__summary {
  font-size: var(--text-sm);
  max-width: 28rem;
}

.project-preview__tech {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
}

.project-preview__cta {
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

.project-preview:hover .project-preview__cta,
.project-preview:focus-visible .project-preview__cta {
  color: var(--color-sky);
  gap: var(--space-3);
}

@media (max-width: 960px) {
  .project-preview--featured .project-preview__title {
    font-size: var(--text-2xl);
  }
}
</style>
