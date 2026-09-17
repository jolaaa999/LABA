<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import AuroraButton from '../components/ui/AuroraButton.vue'
import PageContainer from '../components/layout/PageContainer.vue'
import ProjectCaseStudy from '../components/project/ProjectCaseStudy.vue'
import ProjectDetailHero from '../components/project/ProjectDetailHero.vue'
import ProjectRelatedWork from '../components/project/ProjectRelatedWork.vue'
import {
  getProjectBySlug,
} from '../content/projects'
import { getCaseSectionPlan } from '../lib/projectCaseStudy'

const route = useRoute()
const slug = computed(() => String(route.params.slug ?? ''))
const project = computed(() => getProjectBySlug(slug.value))
const study = computed(() => project.value?.caseStudy)
const sections = computed(() =>
  project.value ? getCaseSectionPlan(project.value) : [],
)
</script>

<template>
  <main v-if="project" class="project-detail">
    <PageContainer class="project-detail__inner">
      <ProjectDetailHero
        :key="project.slug"
        :project="project"
        :sections="sections"
      />

      <ProjectCaseStudy
        v-if="study"
        :key="`study-${project.slug}`"
        :project="project"
        :study="study"
        :sections="sections"
      />

      <p v-else class="project-detail__empty">
        Case study content is not available for this entry yet.
      </p>

      <ProjectRelatedWork :current-slug="project.slug" />

      <footer class="project-detail__footer">
        <RouterLink v-slot="{ navigate }" to="/projects" custom>
          <AuroraButton variant="secondary" @click="navigate">
            Back to Work Archive
          </AuroraButton>
        </RouterLink>
        <RouterLink class="project-detail__home" to="/">
          Home
        </RouterLink>
      </footer>
    </PageContainer>
  </main>
</template>

<style scoped>
.project-detail {
  padding-block: var(--space-16) var(--space-20);
  background: linear-gradient(
    180deg,
    var(--color-snow) 0%,
    color-mix(in srgb, var(--color-morning) 55%, var(--color-snow)) 48%,
    color-mix(in srgb, var(--color-frost) 22%, var(--color-snow)) 100%
  );
}

.project-detail__inner {
  display: grid;
  gap: var(--space-12);
}

.project-detail__empty {
  margin: 0;
  color: var(--color-text-secondary);
}

.project-detail__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-4) var(--space-6);
  padding-top: var(--space-8);
  border-top: 1px solid color-mix(in srgb, var(--color-line) 50%, transparent);
}

.project-detail__home {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-mountain);
  text-decoration: none;
}

.project-detail__home:hover,
.project-detail__home:focus-visible {
  color: var(--color-sky);
}

.project-detail__home:focus-visible {
  outline: var(--border-focus);
  outline-offset: 4px;
}

@media (max-width: 720px) {
  .project-detail {
    padding-block: var(--space-12) var(--space-16);
  }

  .project-detail__inner {
    gap: var(--space-10);
  }
}
</style>
