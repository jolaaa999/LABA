<script setup lang="ts">
import { computed, provide, ref } from 'vue'

import ExploreAiCapstone from '../components/explore-ai/ExploreAiCapstone.vue'
import ExploreAiHero from '../components/explore-ai/ExploreAiHero.vue'
import ExploreAiLoop from '../components/explore-ai/ExploreAiLoop.vue'
import ExploreAiPath from '../components/explore-ai/ExploreAiPath.vue'
import ExploreAiStages from '../components/explore-ai/ExploreAiStages.vue'
import PageContainer from '../components/layout/PageContainer.vue'
import type { AiStageId } from '../content/explore-ai'

const focusedStage = ref<AiStageId | null>(null)

function setFocusedStage(id: AiStageId | null) {
  focusedStage.value = id
}

provide('aiFocusedStage', focusedStage)
provide('setAiFocusedStage', setFocusedStage)

const pageClass = computed(() =>
  focusedStage.value ? `explore-ai--${focusedStage.value}` : '',
)
</script>

<template>
  <main class="explore-ai" :class="pageClass">
    <PageContainer class="explore-ai__inner">
      <ExploreAiHero />
      <ExploreAiPath />
      <ExploreAiStages />
      <ExploreAiLoop />
      <ExploreAiCapstone />
    </PageContainer>
  </main>
</template>

<style scoped>
.explore-ai {
  padding-block: var(--space-12) var(--space-20);
  background: linear-gradient(
    180deg,
    var(--color-snow) 0%,
    color-mix(in srgb, var(--color-morning) 65%, var(--color-glacier)) 42%,
    color-mix(in srgb, var(--color-frost) 40%, var(--color-snow)) 100%
  );
}

.explore-ai__inner {
  display: grid;
  gap: var(--space-16);
}

@media (max-width: 720px) {
  .explore-ai {
    padding-block: var(--space-10) var(--space-16);
  }

  .explore-ai__inner {
    gap: var(--space-12);
  }
}
</style>
