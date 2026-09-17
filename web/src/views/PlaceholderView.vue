<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import PageContainer from '../components/layout/PageContainer.vue'
import SectionHeader from '../components/ui/SectionHeader.vue'

const route = useRoute()

const title = computed(() => {
  const metaTitle = route.meta.title
  return typeof metaTitle === 'string' ? metaTitle : 'Page'
})

const description = computed(() => {
  const metaDescription = route.meta.description
  return typeof metaDescription === 'string'
    ? metaDescription
    : 'This route is wired for Global Shell. Content arrives in later phases.'
})

const isExploreChild = computed(() => route.path.startsWith('/explore/'))

const note = computed(() =>
  isExploreChild.value
    ? 'Coming in the next Explore phase.'
    : 'Layout, routing, and brand shell are active. Content arrives later.',
)
</script>

<template>
  <main class="placeholder-page">
    <PageContainer narrow>
      <SectionHeader
        eyebrow="Coming soon"
        :title="title"
        :description="description"
      />
      <p class="placeholder-page__note">{{ note }}</p>
    </PageContainer>
  </main>
</template>

<style scoped>
.placeholder-page {
  padding-block: var(--space-16) var(--space-20);
}

.placeholder-page__note {
  margin-top: var(--space-8);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}
</style>
