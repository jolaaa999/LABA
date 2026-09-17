<script setup lang="ts">
import { computed } from 'vue'

import type { Project } from '../../types/project'
import ProjectPreview from './ProjectPreview.vue'

const props = defineProps<{
  projects: Project[]
}>()

const featured = computed(() => props.projects[0])
const secondary = computed(() => props.projects.slice(1, 3))
</script>

<template>
  <div v-if="featured" class="project-showcase">
    <div class="project-showcase__featured">
      <p class="project-showcase__index">作品 01 / 精选</p>
      <ProjectPreview :project="featured" variant="featured" />
    </div>

    <div class="project-showcase__secondary">
      <article
        v-for="(project, index) in secondary"
        :key="project.slug"
        class="project-showcase__secondary-item"
      >
        <p class="project-showcase__index">
          作品 {{ String(index + 2).padStart(2, '0') }}
        </p>
        <ProjectPreview :project="project" variant="secondary" />
      </article>
    </div>
  </div>
</template>

<style scoped>
.project-showcase {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.9fr);
  gap: var(--space-10) var(--space-8);
  align-items: start;
}

.project-showcase__index {
  margin-bottom: var(--space-4);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.project-showcase__secondary {
  display: grid;
  gap: var(--space-8);
  padding-top: var(--space-2);
}

.project-showcase__secondary-item {
  padding-top: var(--space-2);
  border-top: var(--border-subtle);
}

.project-showcase__secondary-item:first-child {
  border-top: none;
  padding-top: 0;
}

@media (max-width: 960px) {
  .project-showcase {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }

  .project-showcase__secondary {
    gap: var(--space-6);
  }

  .project-showcase__secondary-item {
    border-top: var(--border-subtle);
    padding-top: var(--space-6);
  }

  .project-showcase__secondary-item:first-child {
    border-top: var(--border-subtle);
    padding-top: var(--space-6);
  }
}
</style>
