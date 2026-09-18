<script setup lang="ts">
import { computed, ref } from 'vue'

import JoinClosing from '../components/join/JoinClosing.vue'
import JoinEntryField from '../components/join/JoinEntryField.vue'
import JoinHero from '../components/join/JoinHero.vue'
import JoinPersonalizedEntry from '../components/join/JoinPersonalizedEntry.vue'
import JoinProcess from '../components/join/JoinProcess.vue'
import JoinRecruitPanel from '../components/join/JoinRecruitPanel.vue'
import JoinStatus from '../components/join/JoinStatus.vue'
import PageContainer from '../components/layout/PageContainer.vue'
import type { JoinDirectionId } from '../content/join-page'

const committedDirection = ref<JoinDirectionId | null>(null)
const focusedDirection = ref<JoinDirectionId | null>(null)

const effectiveDirection = computed(
  () => focusedDirection.value ?? committedDirection.value,
)

function setFocused(id: JoinDirectionId | null) {
  focusedDirection.value = id
}

function commitDirection(id: JoinDirectionId) {
  committedDirection.value = id
  focusedDirection.value = null
}
</script>

<template>
  <main class="join-page">
    <PageContainer class="join-page__inner">
      <JoinHero />
      <JoinEntryField
        :committed="committedDirection"
        :focused="focusedDirection"
        :effective="effectiveDirection"
        @focus="setFocused"
        @commit="commitDirection"
      />
      <JoinPersonalizedEntry :committed="committedDirection" />
      <JoinProcess />
      <JoinRecruitPanel />
      <JoinStatus />
      <JoinClosing />
    </PageContainer>
  </main>
</template>

<style scoped>
.join-page {
  padding-block: var(--space-12) var(--space-20);
  background: linear-gradient(
    180deg,
    var(--color-snow) 0%,
    color-mix(in srgb, var(--color-morning) 70%, var(--color-glacier)) 40%,
    color-mix(in srgb, var(--color-frost) 24%, var(--color-snow)) 100%
  );
}

.join-page__inner {
  display: grid;
  gap: var(--space-12);
}

@media (max-width: 720px) {
  .join-page {
    padding-block: var(--space-10) var(--space-16);
  }

  .join-page__inner {
    gap: var(--space-10);
  }
}
</style>
