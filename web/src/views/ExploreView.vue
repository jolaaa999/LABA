<script setup lang="ts">
import { computed, provide, ref } from 'vue'

import ExploreDirections from '../components/explore/ExploreDirections.vue'
import ExploreHero from '../components/explore/ExploreHero.vue'
import ExplorePathCta from '../components/explore/ExplorePathCta.vue'
import LearningMap from '../components/explore/LearningMap.vue'
import LearningPrinciples from '../components/explore/LearningPrinciples.vue'
import SharedFoundations from '../components/explore/SharedFoundations.vue'
import PageContainer from '../components/layout/PageContainer.vue'
import type { ExplorePathId } from '../content/explore'

const focusedPath = ref<ExplorePathId | null>(null)

function setFocusedPath(path: ExplorePathId | null) {
  focusedPath.value = path
}

provide('exploreFocusedPath', focusedPath)
provide('setExploreFocusedPath', setFocusedPath)

const pageClass = computed(() => ({
  'explore-page--build': focusedPath.value === 'build',
  'explore-page--understand': focusedPath.value === 'understand',
}))
</script>

<template>
  <main class="explore-page" :class="pageClass">
    <PageContainer class="explore-page__inner">
      <ExploreHero />
      <ExploreDirections />
      <LearningMap />
      <SharedFoundations />
      <LearningPrinciples />
      <ExplorePathCta />
    </PageContainer>
  </main>
</template>

<style scoped>
.explore-page {
  padding-block: var(--space-12) var(--space-20);
  background: linear-gradient(
    180deg,
    var(--color-snow) 0%,
    color-mix(in srgb, var(--color-morning) 70%, var(--color-glacier)) 38%,
    color-mix(in srgb, var(--color-frost) 45%, var(--color-snow)) 100%
  );
}

.explore-page__inner {
  display: grid;
  gap: var(--space-16);
}

@media (max-width: 720px) {
  .explore-page {
    padding-block: var(--space-10) var(--space-16);
  }

  .explore-page__inner {
    gap: var(--space-12);
  }
}
</style>
