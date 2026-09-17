<script setup lang="ts">
import { RouterLink } from 'vue-router'

import AuroraButton from '../components/ui/AuroraButton.vue'
import PageContainer from '../components/layout/PageContainer.vue'
import SectionHeader from '../components/ui/SectionHeader.vue'
</script>

<template>
  <main class="not-found">
    <PageContainer narrow>
      <SectionHeader
        eyebrow="404"
        title="Page not found"
        description="This path is outside the current site map. Head back to Home and continue exploring."
      />
      <div class="not-found__action">
        <RouterLink v-slot="{ navigate }" to="/" custom>
          <AuroraButton variant="primary" @click="navigate">
            Back Home
          </AuroraButton>
        </RouterLink>
      </div>
    </PageContainer>
  </main>
</template>

<style scoped>
.not-found {
  padding-block: var(--space-16) var(--space-24);
}

.not-found__action {
  margin-top: var(--space-8);
}
</style>
