<script setup lang="ts">
import { onBeforeUnmount, onMounted, provide, ref } from 'vue'

import EvidenceLedger from '../components/explore-research/EvidenceLedger.vue'
import ResearchCapstone from '../components/explore-research/ResearchCapstone.vue'
import ResearchHero from '../components/explore-research/ResearchHero.vue'
import ResearchLoop from '../components/explore-research/ResearchLoop.vue'
import ResearchSpine from '../components/explore-research/ResearchSpine.vue'
import ResearchStageJournal from '../components/explore-research/ResearchStageJournal.vue'
import PageContainer from '../components/layout/PageContainer.vue'
import {
  researchStages,
  type ResearchStageId,
} from '../content/explore-research'

const activeStage = ref<ResearchStageId | null>(researchStages[0]?.id ?? null)
const focusedStage = ref<ResearchStageId | null>(null)

function setFocusedStage(id: ResearchStageId | null) {
  focusedStage.value = id
}

provide('researchActiveStage', activeStage)
provide('researchFocusedStage', focusedStage)
provide('setResearchFocusedStage', setFocusedStage)

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (typeof IntersectionObserver === 'undefined') return

  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
      const top = visible[0]
      if (!top?.target.id) return
      const id = top.target.id as ResearchStageId
      if (researchStages.some((stage) => stage.id === id)) {
        activeStage.value = id
      }
    },
    {
      root: null,
      rootMargin: '-22% 0px -52% 0px',
      threshold: [0.1, 0.25, 0.45],
    },
  )

  researchStages.forEach((stage) => {
    const el = document.getElementById(stage.id)
    if (el) observer?.observe(el)
  })
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})
</script>

<template>
  <main class="explore-research">
    <PageContainer class="explore-research__inner">
      <ResearchHero />

      <div class="explore-research__layout">
        <aside class="explore-research__spine">
          <div class="explore-research__spine-sticky">
            <ResearchSpine />
          </div>
        </aside>
        <div class="explore-research__journal">
          <ResearchStageJournal />
        </div>
      </div>

      <ResearchLoop />
      <EvidenceLedger />
      <ResearchCapstone />
    </PageContainer>
  </main>
</template>

<style scoped>
.explore-research {
  padding-block: var(--space-12) var(--space-20);
  background: linear-gradient(
    180deg,
    var(--color-snow) 0%,
    color-mix(in srgb, var(--color-morning) 78%, var(--color-glacier)) 46%,
    color-mix(in srgb, var(--color-frost) 35%, var(--color-snow)) 100%
  );
}

.explore-research__inner {
  display: grid;
  gap: var(--space-16);
}

.explore-research__layout {
  display: grid;
  grid-template-columns: minmax(14rem, 0.28fr) minmax(0, 1fr);
  gap: var(--space-10) var(--space-12);
  align-items: start;
}

.explore-research__spine-sticky {
  position: sticky;
  top: var(--sticky-top);
}

@media (max-width: 1024px) {
  .explore-research__layout {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }

  .explore-research__spine-sticky {
    position: static;
  }
}

@media (max-width: 720px) {
  .explore-research {
    padding-block: var(--space-10) var(--space-16);
  }

  .explore-research__inner {
    gap: var(--space-12);
  }
}
</style>
