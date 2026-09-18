<script setup lang="ts">
import { ref } from 'vue'

import CollaborationField from '../components/community/CollaborationField.vue'
import CommunityAskField from '../components/community/CommunityAskField.vue'
import CommunityClosing from '../components/community/CommunityClosing.vue'
import CommunityPageHero from '../components/community/CommunityPageHero.vue'
import CommunityPrinciples from '../components/community/CommunityPrinciples.vue'
import ContributionStream from '../components/community/ContributionStream.vue'
import PublicMemberRoster from '../components/community/PublicMemberRoster.vue'
import PageContainer from '../components/layout/PageContainer.vue'
import type { ContributionModeId } from '../types/member'

const activeMode = ref<ContributionModeId | null>(null)

function setActiveMode(id: ContributionModeId | null) {
  activeMode.value = id
}
</script>

<template>
  <main class="community-page">
    <PageContainer class="community-page__inner">
      <CommunityPageHero :active-mode="activeMode" />
      <ContributionStream
        :active-mode="activeMode"
        @focus="setActiveMode"
      />
      <CollaborationField />
      <CommunityAskField />
      <PublicMemberRoster />
      <CommunityPrinciples />
      <CommunityClosing />
    </PageContainer>
  </main>
</template>


<style scoped>
.community-page {
  padding-block: var(--space-12) var(--space-20);
  background: linear-gradient(
    180deg,
    var(--color-snow) 0%,
    color-mix(in srgb, var(--color-morning) 70%, var(--color-glacier)) 44%,
    color-mix(in srgb, var(--color-frost) 28%, var(--color-snow)) 100%
  );
}

.community-page__inner {
  display: grid;
  gap: var(--space-12);
}

@media (max-width: 720px) {
  .community-page {
    padding-block: var(--space-10) var(--space-16);
  }

  .community-page__inner {
    gap: var(--space-10);
  }
}
</style>
