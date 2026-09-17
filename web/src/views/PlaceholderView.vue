<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import PageContainer from '../components/layout/PageContainer.vue'
import SectionHeader from '../components/ui/SectionHeader.vue'

const route = useRoute()

const title = computed(() => {
  const metaTitle = route.meta.title
  return typeof metaTitle === 'string' ? metaTitle : '页面'
})

const description = computed(() => {
  const metaDescription = route.meta.description
  return typeof metaDescription === 'string'
    ? metaDescription
    : '该路由已接入全局外壳，内容将在后续阶段上线。'
})

const isExploreChild = computed(() => route.path.startsWith('/explore/'))

const note = computed(() =>
  isExploreChild.value
    ? '将在下一探索阶段上线。'
    : '布局、路由与品牌外壳已就绪，内容稍后上线。',
)
</script>

<template>
  <main class="placeholder-page">
    <PageContainer narrow>
      <SectionHeader
        eyebrow="敬请期待"
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
